/* mobile-map-uber.js
   Mejora progresiva (solo <=768px): convierte la guía del complejo Playa Paraíso
   en un Bottom Sheet estilo Uber con gesto de arrastre, tarjeta de acción para
   el POI seleccionado y FAB para recentrar el mapa.
   No modifica escritorio ni la lógica existente de mapas/rutas. */
(function () {
  "use strict";

  const MQ = window.matchMedia("(max-width: 768px)");

  function isMobile() {
    try { return MQ.matches; } catch (e) { return window.innerWidth <= 768; }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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

  let dragging = false;
  let startY = 0;
  let baseOffset = 0;
  let currentOffset = 0;

  function collapsedPeek() { return 118; }

  function collapsedOffset(panel) {
    return Math.max(0, (panel ? panel.offsetHeight : 0) - collapsedPeek());
  }

  function ensureElements() {
    if (!isMobile()) return;
    const wrap = getWrap();
    const panel = getPanel();
    if (!wrap || !panel) return;

    if (!panel.classList.contains("uber-sheet")) {
      panel.classList.add("uber-sheet", "uber-collapsed");
      panel.setAttribute("data-uber-sheet", "1");
    }
    // Sincronizar estado del wrap con el sheet (el CSS/JS previo solo tocaba el panel).
    if (!wrap.classList.contains("uber-collapsed") && !wrap.classList.contains("uber-expanded")) {
      wrap.classList.add("uber-collapsed");
    }
    if (!panel.classList.contains("uber-collapsed") && !panel.classList.contains("uber-expanded")) {
      panel.classList.add("uber-collapsed");
    }

    if (!wrap.hasAttribute("data-uber-sync")) {
      wrap.setAttribute("data-uber-sync", "1");
      panel.addEventListener("guide:toggle", function (e) {
        const collapsed = !!(e && e.detail && e.detail.collapsed);
        if (collapsed) {
          wrap.classList.remove("uber-expanded");
          wrap.classList.add("uber-collapsed");
          panel.classList.remove("uber-expanded");
          panel.classList.add("uber-collapsed");
        } else if (!wrap.classList.contains("uber-expanded") && !wrap.classList.contains("uber-collapsed")) {
          wrap.classList.add("uber-collapsed");
          panel.classList.add("uber-collapsed");
        }
      });
      panel.addEventListener("guide:expand", function (e) {
        const expanded = !!(e && e.detail && e.detail.expanded);
        if (expanded) {
          wrap.classList.remove("uber-collapsed");
          wrap.classList.add("uber-expanded");
          panel.classList.remove("uber-collapsed");
          panel.classList.add("uber-expanded");
        } else {
          wrap.classList.remove("uber-expanded");
          wrap.classList.add("uber-collapsed");
          panel.classList.remove("uber-expanded");
          panel.classList.add("uber-collapsed");
        }
      });
}

    if (!wrap.querySelector(".uber-sheet-handle")) {
      const handle = document.createElement("div");
      handle.className = "uber-sheet-handle";
      handle.innerHTML =
        '<span class="uber-sheet-pill" aria-hidden="true"></span>' +
        '<div class="uber-sheet-collapsed-bar">¿A dónde vas en el complejo?</div>';
      panel.insertBefore(handle, panel.firstChild);

      handle.addEventListener("click", function () {
        if (!isMobile()) return;
        const w = getWrap();
        if (!w) return;
        if (w.classList.contains("uber-collapsed") || panel.classList.contains("uber-collapsed")) {
          w.classList.remove("uber-collapsed");
          w.classList.add("uber-expanded");
          panel.classList.remove("uber-collapsed");
          panel.classList.add("uber-expanded");
        }
      });

      attachDrag(handle, panel, wrap);
    }

    if (!wrap.querySelector(".uber-recenter-fab")) {
      const fab = document.createElement("button");
      fab.type = "button";
      fab.className = "uber-recenter-fab";
      fab.setAttribute("aria-label", "Recentrar mapa");
      fab.innerHTML = "&#9678;";
      wrap.appendChild(fab);
      fab.addEventListener("click", function () {
        recenterMap();
      });
    }

    if (!wrap.querySelector(".uber-poi-card")) {
      const card = document.createElement("div");
      card.className = "uber-poi-card";
      card.hidden = true;
      card.setAttribute("role", "region");
      card.setAttribute("aria-label", "Lugar seleccionado");
      wrap.appendChild(card);
    }

    hookGuide();
  }

  function attachDrag(handle, panel, wrap) {
    handle.addEventListener("touchstart", function (e) {
      if (!isMobile() || !e.touches || !e.touches.length) return;
      dragging = true;
      startY = e.touches[0].clientY;
      baseOffset = wrap.classList.contains("uber-expanded") ? 0 : collapsedOffset(panel);
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
      const threshold = co * 0.45;
      if (currentOffset < threshold) {
        wrap.classList.remove("uber-collapsed");
        wrap.classList.add("uber-expanded");
        panel.classList.remove("uber-collapsed");
        panel.classList.add("uber-expanded");
      } else {
        wrap.classList.remove("uber-expanded");
        wrap.classList.add("uber-collapsed");
        panel.classList.remove("uber-expanded");
        panel.classList.add("uber-collapsed");
      }
      panel.style.transform = "";
    });
  }

  function recenterMap() {
    const map = getMap();
    if (!map) return;
    try {
      map.setView([20.75805, -86.96645], 16.2, { animate: true });
    } catch (e) {
      try { map.setView([20.75805, -86.96645], 16); } catch (err) { /* ignore */ }
    }
    try { if (typeof map.invalidateSize === "function") map.invalidateSize(); } catch (e) { /* ignore */ }
  }

  function findPoiByName(name) {
    const gp = window.RevistaDigital && window.RevistaDigital.guiapa;
    if (!gp || !Array.isArray(gp.POIS) || !name) return null;
    return gp.POIS.find(function (p) { return p && p.name === name; }) || null;
  }

  function requestTransport(poi) {
    if (!poi) return;
    try {
      sessionStorage.setItem("destino_solicitado", JSON.stringify({
        nombre: poi.name,
        lat: poi.lat,
        lng: poi.lng
      }));
    } catch (e) { /* ignore */ }
    try { sessionStorage.setItem("auto_fullscreen_transporte", "true"); } catch (e) { /* ignore */ }
    const routes = window.RevistaDigital && window.RevistaDigital.routes;
    if (routes && typeof routes.navigate === "function") {
      try { routes.navigate("/carrito-golf"); return; } catch (e) { /* ignore */ }
    }
    window.location.href = "/carrito-golf";
  }

  function updatePoiCard() {
    if (!isMobile()) return;
    const wrap = getWrap();
    if (!wrap) return;
    const card = wrap.querySelector(".uber-poi-card");
    if (!card) return;

    const titleEl = document.querySelector("#guideMobileActionsTitle") ||
      document.querySelector(".guide-mobile-actions-title");
    const name = titleEl ? String(titleEl.textContent || "").trim() : "";
    const mobilePanel = document.querySelector("#guideMobileActions");
    const visible = !!(mobilePanel && !mobilePanel.hidden);

    if (!visible || !name) {
      card.hidden = true;
      card.innerHTML = "";
      return;
    }

    const poi = findPoiByName(name);
    const hours = (poi && (poi.hours || poi.horario)) ? (poi.hours || poi.horario) : "Consultar horario";
    let walk = "A pie: —";
    const pos = window.RevistaDigital && window.RevistaDigital.state ? window.RevistaDigital.state.currentPosition : null;
    if (pos && poi && Number.isFinite(Number(poi.lat)) && Number.isFinite(Number(poi.lng)) &&
        Number.isFinite(Number(pos.latitude)) && Number.isFinite(Number(pos.longitude))) {
      const dist = haversine(Number(pos.latitude), Number(pos.longitude), Number(poi.lat), Number(poi.lng));
      const mins = Math.max(1, Math.round(dist / 80));
      walk = "Aprox. " + mins + " min a pie";
    }

    card.innerHTML =
      '<div class="uber-poi-card-head">' +
        '<strong>' + escapeHtml(name) + '</strong>' +
        '<span class="uber-poi-card-hours">' + escapeHtml(hours) + '</span>' +
      '</div>' +
      '<div class="uber-poi-card-meta">' + escapeHtml(walk) + '</div>' +
      '<button type="button" class="uber-poi-card-btn" data-uber-transport>Solicitar transporte</button>';

    card.hidden = false;

    const btn = card.querySelector("[data-uber-transport]");
    if (btn) {
      btn.addEventListener("click", function () {
        requestTransport(poi);
      });
    }
  }

  let hooked = false;
  function hookGuide() {
    if (hooked) return;
    const gp = window.RevistaDigital && window.RevistaDigital.guiapa;
    if (!gp || typeof gp.selectPoi !== "function") return;
    if (gp.__uberHooked) { hooked = true; return; }
    const original = gp.selectPoi;
    gp.selectPoi = function () {
      const result = original.apply(this, arguments);
      try { setTimeout(updatePoiCard, 60); } catch (e) { /* ignore */ }
      return result;
    };
    gp.__uberHooked = true;
    hooked = true;

    const mobilePanel = document.querySelector("#guideMobileActions");
    if (mobilePanel && typeof MutationObserver === "function") {
      try {
        const obs = new MutationObserver(function () { setTimeout(updatePoiCard, 60); });
        obs.observe(mobilePanel, { attributes: true, attributeFilter: ["hidden"], childList: true, subtree: true });
      } catch (e) { /* ignore */ }
    }
  }

  function boot() {
    if (!isMobile()) return;
    ensureElements();
    let tries = 0;
    const timer = setInterval(function () {
      if (!isMobile()) { clearInterval(timer); return; }
      ensureElements();
      hookGuide();
      tries += 1;
      if (tries > 40) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  try {
    MQ.addEventListener("change", function () {
      if (isMobile()) boot();
    });
  } catch (e) {
    try { MQ.addListener(boot); } catch (err) { /* ignore */ }
  }
})();
