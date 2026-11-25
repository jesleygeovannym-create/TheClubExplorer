/* mobile-map-uber.js
   Mejora progresiva (solo <=768px): convierte la guía del complejo Playa Paraíso
   en un Bottom Sheet estilo Uber/Didi con una sola lista y una sola tarjeta de
   acciones para el lugar seleccionado. No modifica escritorio ni la lógica nativa. */
(function () {
  "use strict";

  const MQ = window.matchMedia("(max-width: 768px)");
  const ACTION_CLASSES = {
    route: "guide-route",
    focus: "guide-focus",
    book: "guide-book",
    cart: "guide-cart",
    pano: "guide-pano360"
  };
  const CATEGORY_LABELS = {
    es: {
      hotel: "Hoteles", club: "THE CLUB", starprestige: "Star Prestige",
      concierge: "Concierge", restaurante: "Restaurantes", snacks: "Snacks",
      bar: "Bares", piscina: "Piscinas", spa: "Spa", golf: "Golf",
      playa: "Playa", comer: "Compras", deportes: "Deportes",
      entretenimiento: "Entretenimiento", servicio: "Servicios",
      wellness: "Wellness", kids: "Niños", conv: "Convenciones",
      discoteca: "Discoteca"
    },
    en: {
      hotel: "Hotels", club: "THE CLUB", starprestige: "Star Prestige",
      concierge: "Concierge", restaurante: "Restaurants", snacks: "Snacks",
      bar: "Bars", piscina: "Pools", spa: "Spa", golf: "Golf",
      playa: "Beach", comer: "Shopping", deportes: "Sports",
      entretenimiento: "Entertainment", servicio: "Services",
      wellness: "Wellness", kids: "Kids", conv: "Conventions",
      discoteca: "Nightclub"
    }
  };

  let dragging = false;
  let startY = 0;
  let baseOffset = 0;
  let currentOffset = 0;
  let selectedId = null;
  let dismissedId = null;
  let hooked = false;
  let booted = false;
  let bootTimer = null;
  let domObserver = null;
  let lastWrap = null;
  let selectionHooked = false;

  function isMobile() {
    try { return MQ.matches; } catch (e) { return window.innerWidth <= 768; }
  }

  function getGp() {
    try { return window.RevistaDigital && window.RevistaDigital.guiapa || null; } catch (e) { return null; }
  }

  function getRoutes() {
    try { return window.RevistaDigital && window.RevistaDigital.routes || null; } catch (e) { return null; }
  }

  function getEn() {
    try { return window.RevistaDigital.i18n.getLang() === "en"; } catch (e) { return false; }
  }

  function t(es, en) {
    return getEn() ? en : es;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cleanText(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function getWrap() {
    return document.querySelector(".hotel-complex-map-wrap[data-guide-wrap]");
  }

  function getPanel() {
    return document.querySelector(".hotel-guide-panel[data-guide-overlay]");
  }

  function getMap() {
    try { return window.RevistaDigital && window.RevistaDigital.state ? window.RevistaDigital.state.activeMap : null; } catch (e) { return null; }
  }

  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const toRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * toRad;
    const dLng = (lng2 - lng1) * toRad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function collapsedPeek() { return 118; }

  function collapsedOffset(panel) {
    return Math.max(0, (panel ? panel.offsetHeight : 0) - collapsedPeek());
  }

  function findPoi(id) {
    const gp = getGp();
    if (!gp || !Array.isArray(gp.POIS) || !id) return null;
    return gp.POIS.find(function (p) { return p && p.id === id; }) || null;
  }

  function findPoiByName(name) {
    const gp = getGp();
    if (!gp || !Array.isArray(gp.POIS) || !name) return null;
    return gp.POIS.find(function (p) { return p && p.name === name; }) || null;
  }

  function poiName(poi) {
    const gp = getGp();
    if (poi && typeof gp?.poiNameText === "function") return gp.poiNameText(poi);
    return poi ? poi.name : "";
  }

  function poiDescription(poi) {
    const gp = getGp();
    if (poi && typeof gp?.poiDescriptionText === "function") return gp.poiDescriptionText(poi);
    return poi ? poi.description : "";
  }

  function categoryText(poi) {
    if (!poi) return "";
    const labels = getEn() ? CATEGORY_LABELS.en : CATEGORY_LABELS.es;
    return labels[poi.category] || poi.category || "";
  }

  function hasCoords(poi) {
    return !!(poi && Number.isFinite(Number(poi.lat)) && Number.isFinite(Number(poi.lng)));
  }

  function distanceText(poi) {
    if (!hasCoords(poi)) return t("Ubicación pendiente", "Location pending");
    let pos = null;
    try {
      const state = window.RevistaDigital && window.RevistaDigital.state;
      pos = state ? state.currentPosition : null;
    } catch (e) { pos = null; }
    if (!pos || !Number.isFinite(Number(pos.latitude)) || !Number.isFinite(Number(pos.longitude))) {
      return t("Ruta disponible", "Route available");
    }
    const dist = haversine(Number(pos.latitude), Number(pos.longitude), Number(poi.lat), Number(poi.lng));
    const mins = Math.max(1, Math.round(dist / 80));
    return t("Aprox. ", "Approx. ") + mins + " " + t("min a pie", "min walk");
  }

  function setGuideClasses(expanded) {
    const wrap = getWrap();
    const panel = getPanel();
    if (!wrap || !panel) return;
    wrap.classList.toggle("uber-expanded", expanded);
    wrap.classList.toggle("uber-collapsed", !expanded);
    panel.classList.toggle("uber-expanded", expanded);
    panel.classList.toggle("uber-collapsed", !expanded);
    updateCollapsedBar(findPoi(selectedId));
  }

  function setOpen(expanded, focusSearch) {
    const wrap = getWrap();
    const panel = getPanel();
    if (!wrap || !panel) return;
    const routes = getRoutes();
    if (routes && typeof routes.setGuidePanelOpen === "function") {
      routes.setGuidePanelOpen(expanded);
    } else {
      if (expanded) panel.removeAttribute("data-guide-collapsed");
      else panel.setAttribute("data-guide-collapsed", "1");
      wrap.classList.toggle("is-guide-collapsed", !expanded);
      wrap.classList.toggle("is-guide-expanded", expanded);
      const toggle = wrap.querySelector("[data-guide-toggle]");
      if (toggle) toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      panel.dispatchEvent(new CustomEvent("guide:toggle", { detail: { collapsed: !expanded } }));
    }
    setGuideClasses(expanded);
    if (focusSearch && expanded) {
      setTimeout(function () {
        const input = document.querySelector("#guideSearchInput");
        if (!input) return;
        try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
        try { input.select(); } catch (e) { /* ignore */ }
      }, 90);
    }
  }

  function focusSearchInput() {
    setOpen(true, true);
  }

  function updateCollapsedBar(poi) {
    const text = document.querySelector(".uber-sheet-search-text");
    const btn = document.querySelector(".uber-sheet-search");
    if (!text) return;
    if (poi && selectedId === poi.id && dismissedId !== poi.id) {
      text.textContent = poiName(poi) + " · " + t("ver ruta", "view route");
    } else {
      text.textContent = t("Buscar restaurantes, piscinas, spas…", "Search restaurants, pools, spas…");
    }
    if (btn) btn.setAttribute("aria-label", text.textContent);
  }

  function attachDrag(handle, panel) {
    handle.addEventListener("touchstart", function (e) {
      if (!isMobile() || !e.touches || !e.touches.length) return;
      dragging = true;
      startY = e.touches[0].clientY;
      baseOffset = panel.classList.contains("uber-expanded") ? 0 : collapsedOffset(panel);
      currentOffset = baseOffset;
      panel.style.transition = "none";
    }, { passive: true });

    window.addEventListener("touchmove", function (e) {
      if (!dragging || !e.touches || !e.touches.length) return;
      const dy = e.touches[0].clientY - startY;
      currentOffset = Math.min(collapsedOffset(panel), Math.max(0, baseOffset + dy));
      panel.style.transform = "translateY(" + currentOffset + "px)";
      try { e.preventDefault(); } catch (err) { /* ignore */ }
    }, { passive: false });

    window.addEventListener("touchend", function () {
      if (!dragging) return;
      dragging = false;
      panel.style.transition = "";
      const co = collapsedOffset(panel);
      setOpen(currentOffset < co * 0.45, false);
      panel.style.transform = "";
    });
  }

  function recenterMap() {
    const map = getMap();
    if (!map) return;
    let center = [20.75805, -86.96645];
    let zoom = 16.2;
    let pos = null;
    try {
      const state = window.RevistaDigital && window.RevistaDigital.state;
      pos = state ? state.currentPosition : null;
    } catch (e) { pos = null; }
    if (pos && Number.isFinite(Number(pos.latitude)) && Number.isFinite(Number(pos.longitude))) {
      center = [Number(pos.latitude), Number(pos.longitude)];
      zoom = 17;
    }
    try {
      map.setView(center, zoom, { animate: true });
    } catch (e) {
      try { map.setView(center, 16); } catch (err) { /* ignore */ }
    }
    try { if (typeof map.invalidateSize === "function") map.invalidateSize(); } catch (e) { /* ignore */ }
  }

  function requestTransport(poi) {
    if (!poi || !hasCoords(poi)) return;
    try {
      sessionStorage.setItem("destino_solicitado", JSON.stringify({
        nombre: poi.name,
        lat: Number(poi.lat),
        lng: Number(poi.lng)
      }));
    } catch (e) { /* ignore */ }
    try { sessionStorage.setItem("auto_fullscreen_transporte", "true"); } catch (e) { /* ignore */ }
    const routes = getRoutes();
    if (routes && typeof routes.navigate === "function") {
      try { routes.navigate("/carrito-golf"); return; } catch (e) { /* ignore */ }
    }
    window.location.href = "/carrito-golf";
  }

  function findSourceButton(id, action) {
    const detail = document.querySelector("#guideDetail");
    const cls = ACTION_CLASSES[action];
    if (!detail || !cls) return null;
    const buttons = detail.querySelectorAll("button." + cls);
    return Array.prototype.find.call(buttons, function (btn) {
      return (btn.getAttribute("data-id") || btn.dataset.id || "") === id;
    }) || null;
  }

  function buildActions(poi) {
    if (!poi) return { primary: null, secondary: [] };
    const id = poi.id;
    const actions = [];
    Object.keys(ACTION_CLASSES).forEach(function (key) {
      const btn = findSourceButton(id, key);
      if (btn) actions.push({ key: key, label: cleanText(btn.textContent), btn: btn });
    });
    const hasCart = actions.some(function (a) { return a.key === "cart"; });
    if (!hasCart && hasCoords(poi)) {
      actions.push({
        key: "transport",
        label: t("Pedir transporte", "Request transport"),
        btn: null
      });
    }
    const rank = { route: 0, focus: 1, book: 2, cart: 3, pano: 4, transport: 5 };
    actions.sort(function (a, b) { return (rank[a.key] || 9) - (rank[b.key] || 9); });
    const seen = {};
    const unique = actions.filter(function (a) {
      if (seen[a.key]) return false;
      seen[a.key] = true;
      return true;
    });
    const primary = unique.find(function (a) { return a.key === "route"; }) ||
      unique.find(function (a) { return a.key === "focus"; }) ||
      unique.find(function (a) { return a.key === "book"; }) ||
      unique[0] || null;
    const secondary = unique.filter(function (a) { return a !== primary; }).slice(0, 3);
    return { primary: primary, secondary: secondary };
  }

  function actionHtml(action, primary) {
    if (!action) return "";
    return '<button type="button" class="uber-action' + (primary ? " uber-action--primary" : " uber-action--secondary") +
      '" data-uber-action="' + escapeHtml(action.key) + '" data-id="' + escapeHtml(selectedId || "") + '">' +
      escapeHtml(action.label) + "</button>";
  }

  function updateStatus() {
    const wrap = getWrap();
    if (!wrap) return;
    const card = wrap.querySelector(".uber-poi-card");
    const status = card ? card.querySelector("[data-uber-status]") : null;
    if (!status) return;
    const sources = [
      document.querySelector("#guideRouteBox .guide-route-status"),
      document.querySelector("#guideMobileRouteBox .guide-route-status"),
      document.querySelector("#gpRouteBar .gp-route-bar-label"),
      document.querySelector(".guide-book-box")
    ];
    let text = "";
    sources.some(function (node) {
      const value = cleanText(node && node.textContent);
      if (!value) return false;
      text = value;
      return true;
    });
    if (text) {
      status.hidden = false;
      status.textContent = text;
    } else {
      status.hidden = true;
      status.textContent = "";
    }
  }

  function renderUberCard(poi) {
    if (!isMobile()) return;
    const wrap = getWrap();
    if (!wrap) return;
    const card = wrap.querySelector(".uber-poi-card");
    if (!card) return;
    if (!poi || dismissedId === poi.id) {
      card.hidden = true;
      card.innerHTML = "";
      return;
    }

    selectedId = poi.id;
    const name = poiName(poi);
    const hotel = poi.hotelId || poi.hotel || poi.zone || "";
    const cat = categoryText(poi);
    const subtitleParts = [cat, hotel, distanceText(poi)].filter(Boolean);
    const hours = poi.horarioTexto || poi.hours || poi.horario || "";
    const desc = poiDescription(poi);
    const infoParts = [];
    if (desc) infoParts.push(desc);
    if (hours) infoParts.push(t("Horario: ", "Hours: ") + hours);
    const actions = buildActions(poi);
    let buttons = "";
    if (actions.primary) buttons += actionHtml(actions.primary, true);
    actions.secondary.forEach(function (a) { buttons += actionHtml(a, false); });
    if (!buttons) buttons = '<p class="uber-action-empty">' + t("Información en actualización.", "Information is being updated.") + "</p>";

    card.innerHTML =
      '<div class="uber-poi-card-top">' +
        '<span class="uber-poi-card-kicker">' + t("LUGAR SELECCIONADO", "SELECTED PLACE") + "</span>" +
        '<button type="button" class="uber-poi-card-close" data-uber-close aria-label="' + t("Cerrar tarjeta", "Close card") + '">×</button>' +
      "</div>" +
      '<strong class="uber-poi-card-title">' + escapeHtml(name) + "</strong>" +
      '<div class="uber-poi-card-sub">' + escapeHtml(subtitleParts.join(" · ")) + "</div>" +
      (infoParts.length ? '<p class="uber-poi-card-info">' + escapeHtml(infoParts.join(" · ")) + "</p>" : "") +
      '<div class="uber-poi-card-actions">' + buttons + "</div>" +
      '<div class="uber-poi-card-status" data-uber-status hidden></div>';
    card.hidden = false;
    updateCollapsedBar(poi);
  }

  function renderUberById(id) {
    if (!isMobile()) return;
    if (!id) {
      renderUberCard(null);
      return;
    }
    const poi = findPoi(id);
    if (!poi) {
      renderUberCard(null);
      return;
    }
    renderUberCard(poi);
  }

  function bindCard(card) {
    if (!card || card.dataset.uberBound === "1") return;
    card.dataset.uberBound = "1";
    card.addEventListener("click", function (e) {
      if (e.target.closest("[data-uber-close]")) {
        dismissedId = selectedId;
        card.hidden = true;
        updateCollapsedBar(null);
        return;
      }
      const btn = e.target.closest("[data-uber-action]");
      if (!btn) return;
      const id = btn.getAttribute("data-id") || selectedId;
      const action = btn.getAttribute("data-uber-action");
      const poi = findPoi(id);
      if (!poi) return;
      if (action === "transport") {
        requestTransport(poi);
      } else {
        const source = findSourceButton(id, action);
        if (source) source.click();
      }
      setTimeout(updateStatus, 180);
      setTimeout(updateStatus, 700);
    });
  }

  function hookSelectionEvents() {
    if (selectionHooked) return;
    selectionHooked = true;
    const selectFrom = function (item) {
      const id = item.getAttribute("data-id") || item.getAttribute("data-activity-id");
      if (!id) return;
      dismissedId = null;
      setTimeout(function () { renderUberById(id); }, 70);
    };
    document.addEventListener("click", function (e) {
      const item = e.target.closest("#guideList .guide-item, #guideActivitiesList [data-activity-id]");
      if (item) {
        selectFrom(item);
        return;
      }
      if (e.target.closest("[data-guide-filter]")) {
        selectedId = null;
        dismissedId = null;
        const card = getWrap()?.querySelector(".uber-poi-card");
        if (card) {
          card.hidden = true;
          card.innerHTML = "";
        }
        updateCollapsedBar(null);
      }
    }, true);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = e.target.closest("#guideList .guide-item");
      if (item) selectFrom(item);
    }, true);
  }

  function hookGuide() {
    const gp = getGp();
    if (!gp || typeof gp.selectPoi !== "function") return;
    if (gp.__uberV3Hooked || hooked) return;
    const original = gp.selectPoi;
    gp.selectPoi = function () {
      const args = Array.prototype.slice.call(arguments);
      dismissedId = null;
      const result = original.apply(this, args);
      const raw = args[0];
      const id = typeof raw === "string" ? raw : (raw && raw.id ? raw.id : null);
      setTimeout(function () { renderUberById(id); }, 40);
      return result;
    };
    gp.__uberV3Hooked = true;
    hooked = true;

    const mobilePanel = document.querySelector("#guideMobileActions");
    if (mobilePanel && typeof MutationObserver === "function") {
      try {
        const obs = new MutationObserver(function () {
          if (!isMobile()) return;
          if (mobilePanel.hidden) {
            const card = getWrap()?.querySelector(".uber-poi-card");
            if (card) card.hidden = true;
          } else if (selectedId) {
            renderUberById(selectedId);
          }
        });
        obs.observe(mobilePanel, { attributes: true, attributeFilter: ["hidden"], childList: true, subtree: true });
      } catch (e) { /* ignore */ }
    }

    const detail = document.querySelector("#guideDetail");
    if (detail && typeof MutationObserver === "function") {
      try {
        new MutationObserver(function () {
          if (isMobile() && selectedId) setTimeout(function () { renderUberById(selectedId); }, 60);
        }).observe(detail, { childList: true, subtree: true });
      } catch (e) { /* ignore */ }
    }
  }

  function ensureElements() {
    if (!isMobile()) return;
    const wrap = getWrap();
    const panel = getPanel();
    if (!wrap || !panel) return;

    if (wrap !== lastWrap) {
      lastWrap = wrap;
      selectedId = null;
      dismissedId = null;
    }

    if (!panel.classList.contains("uber-sheet")) {
      panel.classList.add("uber-sheet", "uber-collapsed");
      panel.setAttribute("data-uber-sheet", "3");
      wrap.classList.add("uber-collapsed");
    }

    if (!wrap.hasAttribute("data-uber-sync")) {
      wrap.setAttribute("data-uber-sync", "3");
      panel.addEventListener("guide:toggle", function (e) {
        setGuideClasses(!(e && e.detail && e.detail.collapsed));
      });
      panel.addEventListener("guide:expand", function (e) {
        setGuideClasses(!!(e && e.detail && e.detail.expanded));
      });
    }

    if (!wrap.querySelector(".uber-sheet-handle")) {
      const handle = document.createElement("div");
      handle.className = "uber-sheet-handle";
      handle.innerHTML =
        '<span class="uber-sheet-pill" aria-hidden="true"></span>' +
        '<button type="button" class="uber-sheet-search" data-uber-open>' +
          '<span class="uber-sheet-search-icon" aria-hidden="true">⌕</span>' +
          '<span class="uber-sheet-search-text">' + escapeHtml(t("Buscar restaurantes, piscinas, spas…", "Search restaurants, pools, spas…")) + "</span>" +
          '<span class="uber-sheet-search-hint">' + escapeHtml(t("Ver guía", "View guide")) + "</span>" +
        "</button>";
      panel.insertBefore(handle, panel.firstChild);
      const searchBtn = handle.querySelector("[data-uber-open]");
      if (searchBtn) searchBtn.addEventListener("click", focusSearchInput);
      attachDrag(handle, panel);
    }

    if (!wrap.querySelector(".uber-recenter-fab")) {
      const fab = document.createElement("button");
      fab.type = "button";
      fab.className = "uber-recenter-fab";
      fab.setAttribute("aria-label", t("Recentrar mapa", "Recenter map"));
      fab.innerHTML = "&#9678;";
      wrap.appendChild(fab);
      fab.addEventListener("click", recenterMap);
    }

    let card = wrap.querySelector(".uber-poi-card");
    if (!card) {
      card = document.createElement("div");
      card.className = "uber-poi-card";
      card.hidden = true;
      card.setAttribute("role", "region");
      card.setAttribute("aria-label", t("Lugar seleccionado", "Selected place"));
      wrap.appendChild(card);
    }
    bindCard(card);
    updateCollapsedBar(findPoi(selectedId));
    hookSelectionEvents();
    hookGuide();
  }

  function boot() {
    if (!isMobile()) return;
    if (booted) return;
    booted = true;
    ensureElements();
    if (!domObserver && typeof MutationObserver === "function") {
      domObserver = new MutationObserver(function () {
        if (!isMobile()) return;
        const wrap = getWrap();
        if (!wrap) return;
        if (wrap !== lastWrap || !wrap.querySelector(".uber-sheet-handle") || !wrap.querySelector(".uber-poi-card")) {
          ensureElements();
          hookGuide();
        }
      });
      if (document.body) {
        domObserver.observe(document.body, { childList: true, subtree: true });
      }
    }
    let tries = 0;
    bootTimer = setInterval(function () {
      if (!isMobile()) {
        clearInterval(bootTimer);
        return;
      }
      ensureElements();
      hookGuide();
      tries += 1;
      if (tries > 60) clearInterval(bootTimer);
    }, 250);
  }

  window.addEventListener("languagechange", function () {
    setTimeout(function () {
      updateCollapsedBar(findPoi(selectedId));
      if (selectedId) renderUberById(selectedId);
      const fab = document.querySelector(".uber-recenter-fab");
      if (fab) fab.setAttribute("aria-label", t("Recentrar mapa", "Recenter map"));
    }, 150);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  try {
    MQ.addEventListener("change", function () {
      if (isMobile()) {
        booted = false;
        boot();
      }
    });
  } catch (e) {
    try { MQ.addListener(boot); } catch (err) { /* ignore */ }
  }
})();
