(function () {
  window.RevistaDigital = window.RevistaDigital || {};
  const pannellum360 = window.RevistaDigital.pannellum360 || {};

  /* Prueba de Exploración 360°: solo los hoteles de Playa Paraíso. */
  const PLAYA_PARISO_HOTELS = [
    "Iberostar Paraíso del Mar",
    "Iberostar Paraíso Maya",
    "Iberostar Paraíso Lindo",
    "Iberostar Paraíso Beach",
    "Iberostar Paraíso JOIA"
  ];

  const ZONES = [
    { key: "restaurantes", label: "Restaurantes", blurb: "Ambientes gastronómicos del hotel." },
    { key: "exteriores", label: "Exteriores", blurb: "Jardines y áreas al aire libre." },
    { key: "playa", label: "Playas", blurb: "La franja de arena y el mar Caribe." },
    { key: "piscinas", label: "Piscinas", blurb: "Piscinas y zonas de sol." }
  ];

  const RESTAURANTES_PARAISO = {
    "Iberostar Paraíso del Mar": [
      ["La Plaza", "Buffet principal"],
      ["La Hacienda", "Cocina mexicana"],
      ["El Colonial", "Cocina francesa"],
      ["Hashiru", "Teppanyaki / Sushi"],
      ["El Rodizio", "Brasileño"],
      ["La Dorada", "Mediterránea"],
      ["Smoke House", "Cortes texanos ahumados"],
      ["Trattoria El Faro", "Cocina italiana"],
      ["El Puerto", "Buffet / Brasería"]
    ],
    "Iberostar Paraíso Maya": [
      ["La Geisha", "Teppanyaki"],
      ["L'Etoile", "Cocina francesa"],
      ["La Marina", "Marisquería"],
      ["Under the Sea American Grill", "Grill/Brasserie"],
      ["Olivetti", "Italiana"],
      ["Lemon & Spices", "Cocina griega"],
      ["El Rancho", "Steak House"],
      ["La Pagoda", "Buffet principal"],
      ["El Museo", "Cocina italiana"],
      ["El Tapatío", "Cocina mexicana"]
    ],
    "Iberostar Paraíso Lindo": [
      ["Under the Sea American Grill", "Grill/Brasserie"],
      ["Lemon & Spices", "Cocina griega"],
      ["Olivetti", "Italiana"],
      ["La Pagoda", "Buffet principal"],
      ["El Rancho", "Steak House"],
      ["El Tapatío", "Cocina mexicana"],
      ["El Museo", "Cocina italiana"],
      ["Hashiru", "Teppanyaki"],
      ["El Colonial", "Cocina francesa"],
      ["La Geisha", "Teppanyaki"]
    ],
    "Iberostar Paraíso Beach": [
      ["La Plaza", "Buffet principal"],
      ["El Colonial", "Cocina francesa"],
      ["La Hacienda", "Cocina mexicana"],
      ["Hashiru", "Teppanyaki"],
      ["Smoke House", "Cortes ahumados"],
      ["El Rodizio", "Brasileño"],
      ["La Dorada", "Mediterránea"],
      ["El Puerto", "Buffet"],
      ["El Mercado", "Buffet"],
      ["Trattoria El Faro", "Italiana"]
    ],
    "Iberostar Paraíso JOIA": [
      ["Legado", "Cocina mexicana/brasserie"],
      ["L'Atelier", "Alta cocina"],
      ["Venecia", "Cocina italiana"],
      ["Haiku", "Cocina asiática"],
      ["Ember Steak House", "Steak House"],
      ["Bella Vista", "Buffet"]
    ]
  };

  const VIEW = {
    playa: { yaw: 0, pitch: -6, hfov: 100 },
    piscinas: { yaw: 0, pitch: -12, hfov: 90 },
    restaurantes: { yaw: 0, pitch: -4, hfov: 78 },
    exteriores: { yaw: 60, pitch: -6, hfov: 92 }
  };

  const PALETTES = {
    playa: { skyTop: "#2e6fb4", skyBottom: "#cfe8f6", groundTop: "#0e6f8c", groundBottom: "#2bb3cc" },
    piscinas: { skyTop: "#2a86b8", skyBottom: "#d9eef3", groundTop: "#17b7c8", groundBottom: "#5fdfe6" },
    restaurantes: { skyTop: "#20394d", skyBottom: "#d9a05f", groundTop: "#8a5434", groundBottom: "#4a2d1c" },
    exteriores: { skyTop: "#6bb1dd", skyBottom: "#e2f3da", groundTop: "#457c3c", groundBottom: "#82b169" }
  };

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function paletteFor(zoneKey) {
    return PALETTES[zoneKey] || PALETTES.exteriores;
  }

  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ---------- decoración por zona ---------- */

  function drawSea(ctx, W, H, horizon) {
    const sandY = H * 0.78;
    ctx.fillStyle = "#e7d3a0";
    ctx.fillRect(0, sandY, W, H - sandY);
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = Math.max(2, H * 0.010);
    for (let x = -40; x < W + 40; x += 90) {
      ctx.beginPath();
      ctx.ellipse(x, sandY, 70, H * 0.016, 0, Math.PI * 0.95, Math.PI * 1.05);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = Math.max(2, H * 0.007);
    for (let i = 1; i <= 3; i++) {
      const yy = horizon + (sandY - horizon) * (i / 4);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 16) {
        const y = yy + Math.sin(x * 0.02 + i) * H * 0.012;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function drawPool(ctx, W, H, horizon) {
    const deckY = H * 0.82;
    ctx.fillStyle = "#d9e2d2";
    ctx.fillRect(0, deckY, W, H - deckY);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    for (let i = 0; i < 4; i++) {
      const x = W * (0.42 + i * 0.05);
      ctx.fillRect(x - 2, horizon + H * 0.02, 4, deckY - horizon - H * 0.02);
    }
    [0.2, 0.5, 0.8].forEach((k) => {
      const x = W * k;
      const y = deckY + H * 0.02;
      ctx.fillStyle = "#c2b894";
      ctx.fillRect(x - W * 0.045, y - H * 0.012, W * 0.09, H * 0.012);
      ctx.fillStyle = "#f0e6c8";
      ctx.fillRect(x - W * 0.045, y, W * 0.09, H * 0.028);
    });
  }

  function drawDining(ctx, W, H, horizon) {
    [-120, -60, 0, 60, 120].forEach((yaw) => {
      const x = W * (0.5 + yaw / 360);
      const y = horizon + H * 0.12;
      ctx.fillStyle = "rgba(20,12,6,0.85)";
      ctx.beginPath();
      ctx.ellipse(x, y, W * 0.055, H * 0.030, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,214,130,0.9)";
      ctx.beginPath();
      ctx.arc(x, y - H * 0.012, Math.max(3, H * 0.010), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(70,40,26,0.9)";
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(x + side * W * 0.075, y + H * 0.02, Math.max(4, H * 0.014), 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }

  function drawGarden(ctx, W, H, horizon) {
    ctx.fillStyle = "#cdb280";
    ctx.beginPath();
    ctx.moveTo(W / 2 - W * 0.05, horizon);
    ctx.lineTo(W / 2 + W * 0.05, horizon);
    ctx.lineTo(W * 0.68, H);
    ctx.lineTo(W * 0.32, H);
    ctx.closePath();
    ctx.fill();
    [0.12, 0.30, 0.70, 0.88].forEach((k) => {
      const x = W * k;
      const y = horizon + H * 0.10;
      ctx.strokeStyle = "#5d3a24";
      ctx.lineWidth = Math.max(4, H * 0.016);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + W * 0.02, y + H * 0.12, x + W * 0.045, y + H * 0.24);
      ctx.stroke();
      ctx.fillStyle = "#1f5c33";
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2 + 0.4;
        const len = H * 0.085;
        const side = i % 2 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
          x + Math.cos(ang) * len * 0.5,
          y + Math.sin(ang) * len * 0.4 - H * 0.01,
          x + Math.cos(ang) * len,
          y + Math.sin(ang) * len * 0.55 - H * 0.02
        );
        ctx.quadraticCurveTo(
          x + Math.cos(ang) * len * 0.5 + side * H * 0.02,
          y + Math.sin(ang) * len * 0.4 - H * 0.012,
          x,
          y
        );
        ctx.fill();
      }
    });
  }

  /* ---------- generación del equirectangular 2:1 ---------- */

  function buildPanorama(hotelName, zoneKey, label, width, height) {
    const W = width || 2048;
    const H = height || 1024;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const pal = paletteFor(zoneKey);
    const horizon = H * 0.5;

    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, pal.skyTop);
    sky.addColorStop(1, pal.skyBottom);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, horizon);

    const sunX = W * 0.25;
    const sunY = H * 0.34;
    const sunR = Math.min(W, H) * 0.42;
    const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR);
    glow.addColorStop(0, "rgba(255,250,220,0.95)");
    glow.addColorStop(0.25, "rgba(255,238,170,0.55)");
    glow.addColorStop(1, "rgba(255,238,170,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(sunX - sunR, sunY - sunR, sunR * 2, sunR * 2);

    const ground = ctx.createLinearGradient(0, horizon, 0, H);
    ground.addColorStop(0, pal.groundTop);
    ground.addColorStop(1, pal.groundBottom);
    ctx.fillStyle = ground;
    ctx.fillRect(0, horizon, W, H - horizon);

    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = Math.max(2, H * 0.006);
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(W, horizon);
    ctx.stroke();

    if (zoneKey === "playa") drawSea(ctx, W, H, horizon);
    else if (zoneKey === "piscinas") drawPool(ctx, W, H, horizon);
    else if (zoneKey === "restaurantes") drawDining(ctx, W, H, horizon);
    else drawGarden(ctx, W, H, horizon);

    const bw = Math.min(W * 0.62, 1500);
    const bh = H * 0.16;
    ctx.fillStyle = "rgba(7,14,26,0.38)";
    roundRect(ctx, (W - bw) / 2, H * 0.315, bw, bh, 40);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${Math.round(H * 0.066)}px 'EB Garamond', Georgia, serif`;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 18;
    ctx.fillText(String(label || zoneKey).toUpperCase(), W / 2, H * 0.40);
    ctx.shadowBlur = 0;

    ctx.font = `500 ${Math.round(H * 0.028)}px Arial, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText("Playa Paraíso · " + hotelName, W / 2, H * 0.47);

    return canvas;
  }

  function buildPreview(hotelName, zoneKey, label) {
    return buildPanorama(hotelName, zoneKey, label, 512, 256).toDataURL("image/jpeg", 0.72);
  }

  /* ---------- librería Pannellum (carga bajo demanda) ---------- */

  let pannellumReady = null;

  function libUrl() {
    const base = (document.querySelector("base") && document.querySelector("base").href) || document.baseURI;
    return new URL("libs/pannellum/", base).href;
  }

  function ensurePannellum() {
    if (pannellumReady) return pannellumReady;
    pannellumReady = new Promise((resolve, reject) => {
      function ensureScript() {
        if (typeof window.pannellum !== "undefined" && window.pannellum) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = libUrl() + "pannellum.js";
        script.dataset.pannellum = "1";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Pannellum no se pudo cargar"));
        document.head.appendChild(script);
      }
      if (document.querySelector('link[data-pannellum-css]')) {
        ensureScript();
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = libUrl() + "pannellum.css";
      link.dataset.pannellumCss = "1";
      link.onload = ensureScript;
      link.onerror = () => reject(new Error("CSS de Pannellum no se pudo cargar"));
      document.head.appendChild(link);
    });
    return pannellumReady;
  }

  /* ---------- visor ---------- */

  // Normaliza un texto para comparar etiquetas de 360° con nombres de POI.
  function normalizeText(value) {
    return String(value == null ? "" : value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  // Busca el id del POI del mapa que corresponde a una zona/etiqueta del 360°.
  // Devuelve "" si no hay correspondencia (el botón no se muestra en ese caso).
  function resolvePoiForPano(zoneKey, label) {
    const gp = window.RevistaDigital && window.RevistaDigital.guiapa;
    const pois = gp && gp.POIS;
    if (!Array.isArray(pois) || !pois.length) return "";
    const target = normalizeText(label);
    if (!target) return "";
    const zone = normalizeText(zoneKey);
    let fallbackId = "";
    for (const poi of pois) {
      const name = normalizeText(poi.name);
      if (!name) continue;
      if (name === target) {
        if (!zone || normalizeText(poi.category) === zone || zone === "restaurantes") return poi.id;
        if (!fallbackId) fallbackId = poi.id;
      } else if (!fallbackId && name.indexOf(target) >= 0) {
        fallbackId = poi.id;
      }
    }
    return fallbackId;
  }

  function findRestaurantPoi(label) {
    const target = normalizeText(label);
    const pois = window.RevistaDigital?.guiapa?.POIS || [];
    const restaurants = pois.filter((poi) => normalizeText(poi.category) === "restaurante");
    const exact = restaurants.find((poi) => normalizeText(poi.name) === target);
    if (exact) return exact;
    return restaurants
      .filter((poi) => {
        const name = normalizeText(poi.name);
        return name && (target.includes(name) || name.includes(target));
      })
      .sort((first, second) =>
        Math.abs(normalizeText(first.name).length - target.length) -
        Math.abs(normalizeText(second.name).length - target.length)
      )[0] || null;
  }

  function getRestaurantDetails(hotelName, label) {
    const hotelRestaurant = (pannellum360.getRestaurantes?.(hotelName) || [])
      .find(([name]) => normalizeText(name) === normalizeText(label));
    const poi = findRestaurantPoi(label);
    return {
      name: hotelRestaurant?.[0] || label || "Restaurante",
      cuisine: poi?.cuisine || hotelRestaurant?.[1] || "",
      hours: poi?.hours || "",
      menu: poi?.menu || ""
    };
  }

  function openRestaurantMenuOverlay(hotelName, label) {
    const details = getRestaurantDetails(hotelName, label);
    const overlay = document.createElement("div");
    overlay.className = "pano-360-action-overlay pano-360-menu-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `Menú de ${details.name}`);
    const menuMarkup = details.menu
      ? `<ul class="pano-360-action-list pano-360-menu-list">${details.menu.split(/\s*[·•]\s*/).filter(Boolean).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : '<p class="pano-360-action-note">La carta digital de este restaurante aún no está disponible. Consulta en el hotel.</p>';
    overlay.innerHTML = `
      <div class="pano-360-action-panel pano-360-menu-panel">
        <div class="pano-360-action-header pano-360-menu-header">
          <strong>${escapeHtml(details.name)}</strong>
          <button type="button" class="pano-360-action-close" aria-label="Cerrar menú">×</button>
        </div>
        <div class="pano-360-action-content pano-360-menu-content">
          <p class="pano-360-action-kicker">EXPERIENCIA GASTRONÓMICA</p>
          <h3>${escapeHtml(details.name)}</h3>
          <p class="pano-360-menu-hotel">${escapeHtml(hotelName)}</p>
          ${details.cuisine ? `<p class="pano-360-action-copy pano-360-menu-cuisine">${escapeHtml(details.cuisine)}</p>` : ""}
          ${details.hours ? `<p class="pano-360-menu-hours"><span>Horario de servicio</span><strong>${escapeHtml(details.hours)}</strong></p>` : ""}
          <div class="pano-360-menu-divider"><span>La carta</span></div>
          ${menuMarkup}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const close = () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
    overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
    overlay.querySelector(".pano-360-action-close")?.addEventListener("click", close);
  }

  function openRestaurantMap(hotelName, label, closePanorama) {
    const guide = window.RevistaDigital?.guiapa;
    const routes = window.RevistaDigital?.routes;
    const hotelRoute = routes?.findHotelPortalRoute?.(hotelName);
    const restaurantPoi = findRestaurantPoi(label);
    const hasRestaurantCoordinates = restaurantPoi?.verified === true &&
      Number.isFinite(restaurantPoi.lat) && Number.isFinite(restaurantPoi.lng);
    const hotelPoi = guide?.poiForHotel?.(hotelName);
    const destination = hasRestaurantCoordinates ? restaurantPoi : hotelPoi;
    const notice = hasRestaurantCoordinates
      ? ""
      : `No hay ubicación interior verificada para ${label}; la ruta se traza hasta ${hotelName}.`;

    if (!hotelRoute || typeof routes.navigate !== "function" || !destination ||
        typeof guide?.queueRouteToPoi !== "function" ||
        !guide.queueRouteToPoi(destination.id, notice)) {
      console.warn(`No se pudo preparar el mapa o la ruta para ${label} en ${hotelName}.`);
      window.alert("No fue posible preparar el mapa y la ruta para este restaurante.");
      return;
    }

    closePanorama();
    routes.navigate(hotelRoute);
  }

  function openReservationOverlay(hotelName, label) {
    const overlay = document.createElement("div");
    overlay.className = "pano-360-action-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = `
      <div class="pano-360-action-panel pano-360-booking-panel">
        <div class="pano-360-action-header">
          <strong>Reservar</strong>
          <button type="button" class="pano-360-action-close" aria-label="Cerrar reserva">×</button>
        </div>
        <div class="pano-360-action-content">
          <p class="pano-360-action-kicker">RESERVA ${escapeHtml((label || "restaurante").toUpperCase())}</p>
          <h3>${escapeHtml(label || "Restaurante")}</h3>
          <form class="pano-360-booking-form">
            <label><span>Fecha</span><input type="date" name="date" required /></label>
            <label><span>Hora</span><input type="time" name="time" required /></label>
            <label><span>Personas</span><input type="number" name="guests" min="1" max="12" value="2" required /></label>
            <label><span>Nombre</span><input type="text" name="name" placeholder="Tu nombre" required /></label>
            <label><span>Habitación</span><input type="text" name="room" placeholder="Ej. 1204" /></label>
            <button type="submit" class="pano-360-booking-submit">Enviar solicitud</button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const close = () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
    overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
    overlay.querySelector(".pano-360-action-close")?.addEventListener("click", close);
    const form = overlay.querySelector(".pano-360-booking-form");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const panel = overlay.querySelector(".pano-360-action-content");
      if (!panel) return;
      panel.innerHTML = `
        <p class="pano-360-action-kicker">SOLICITUD ENVIADA</p>
        <h3>${escapeHtml(label || "Restaurante")}</h3>
        <p class="pano-360-action-copy">Tu reserva para ${escapeHtml(label || "este restaurante")} ha quedado registrada.</p>
        <p class="pano-360-action-note">La confirmación se realiza en recepción del hotel.</p>
      `;
    });
  }

  pannellum360.open = function (hotelName, zoneKey, label) {
    ensurePannellum().then(() => {
      const view = VIEW[zoneKey] || VIEW.exteriores;
      const url = buildPanorama(hotelName, zoneKey, label, 2048, 1024).toDataURL("image/jpeg", 0.85);

      // Botón "Ver en el mapa": solo aparece si existe una guía del hotel y un
      // punto del mapa que corresponda a esta zona/etiqueta. Conecta el
      // recorrido 360° con la guía interactiva sin tocar su lógica.
      const poiTarget = resolvePoiForPano(zoneKey, label);
      const isRestaurantView = String(zoneKey || "").toLowerCase() === "restaurantes" || normalizeText(label).includes("restaurante");
      const mapButton = !isRestaurantView && poiTarget
        ? '<button type="button" class="pano-360-map" data-poi="' + escapeHtml(poiTarget) + '">Ver en el mapa</button>'
        : "";
      const restaurantActions = isRestaurantView ?
        '<button type="button" class="pano-360-menu">Ver menú</button>' +
        '<button type="button" class="pano-360-map">Ver en el mapa</button>' +
        '<button type="button" class="pano-360-book">Reservar</button>' :
        "";

      const modal = document.createElement("div");
      modal.className = "pano-360-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML =
        '<div class="pano-360-bar">' +
          "<strong>" + escapeHtml(label) + " · " + escapeHtml(hotelName) + "</strong>" +
          '<span class="pano-360-bar-actions">' + mapButton + restaurantActions +
          '<button type="button" class="pano-360-close" aria-label="Cerrar recorrido">×</button>' +
          "</span>" +
        "</div>" +
        '<div class="pano-360-stage"><div id="pano360Stage"></div></div>';

      document.body.appendChild(modal);
      document.body.classList.add("pano-360-open");

      let viewer = null;

      function closeModal() {
        try {
          if (viewer && typeof viewer.destroy === "function") viewer.destroy();
        } catch (error) {
          /* noop */
        }
        if (modal.parentNode) modal.parentNode.removeChild(modal);
        document.body.classList.remove("pano-360-open");
        document.removeEventListener("keydown", onKey);
      }

      function onKey(event) {
        if (event.key === "Escape") closeModal();
      }

      try {
        const panoElement = document.getElementById("pano360Stage");
        if (!panoElement) {
          closeModal();
          return;
        }
        viewer = window.pannellum.viewer("pano360Stage", {
          type: "equirectangular",
          panorama: url,
          autoLoad: true,
          autoRotate: -2,
          compass: true,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          yaw: view.yaw,
          pitch: view.pitch,
          hfov: view.hfov,
          minPitch: -85,
          maxPitch: 85
        });
      } catch (error) {
        console.warn("Pannellum360:", error);
        closeModal();
        return;
      }

      document.addEventListener("keydown", onKey);
      modal.querySelector(".pano-360-close").addEventListener("click", closeModal);
      const mapBtn = modal.querySelector(".pano-360-map");
      if (mapBtn) {
        mapBtn.addEventListener("click", () => {
          if (isRestaurantView) {
            openRestaurantMap(hotelName, label, closeModal);
            return;
          }
          const poiId = mapBtn.getAttribute("data-poi");
          closeModal();
          const gp = window.RevistaDigital && window.RevistaDigital.guiapa;
          if (!poiId || !gp || typeof gp.selectPoi !== "function") return;
          const guideMount = document.getElementById("guideExplorer") ||
            document.querySelector("[data-hotel-guide]");
          if (guideMount && typeof guideMount.scrollIntoView === "function") {
            try { guideMount.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { /* ignore */ }
          }
          gp.selectPoi(poiId);
        });
      }
      const menuBtn = modal.querySelector(".pano-360-menu");
      if (menuBtn) {
        menuBtn.addEventListener("click", () => {
          openRestaurantMenuOverlay(hotelName, label);
        });
      }
      const bookingBtn = modal.querySelector(".pano-360-book");
      if (bookingBtn) {
        bookingBtn.addEventListener("click", () => {
          openReservationOverlay(hotelName, label);
        });
      }
      modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
      });
    }).catch((error) => {
      console.warn("No se pudo abrir el recorrido 360°:", error);
    });
  };

  /* ---------- sección en la ficha del hotel ---------- */

  pannellum360.isPlayaParaiso = function (hotelName) {
    return PLAYA_PARISO_HOTELS.indexOf(hotelName) >= 0;
  };

  pannellum360.getRestaurantes = function (hotelName) {
    return RESTAURANTES_PARAISO[hotelName] || [];
  };

  /* Datos por restaurante para construir fichas visuales: nombre, cocina,
     imagen de vista previa y disponibilidad de recorrido 360°. Solo los
     hoteles del complejo Playa Paraíso tienen recorrido 360° hoy. */
  pannellum360.getRestaurantFicheData = function (hotelName) {
    if (!pannellum360.isPlayaParaiso(hotelName)) return [];
    return pannellum360.getRestaurantes(hotelName).map(([name, cuisine]) => ({
      name,
      cuisine: cuisine || "Restaurante",
      image: buildPreview(hotelName, "restaurantes", name),
      has360: true
    }));
  };

  pannellum360.getZoneMenuOptions = function (hotelName, zoneKey) {
    const normalized = String(zoneKey || "").toLowerCase();
    if (normalized === "restaurantes") {
      const restaurants = pannellum360.getRestaurantes(hotelName);
      if (restaurants.length) {
        return restaurants.map(([name, cuisine]) => ({
          label: name,
          subtitle: cuisine || "Restaurante",
          zoneKey: "restaurantes",
          hotelName
        }));
      }
      return [{ label: "Restaurante principal", subtitle: "Gastronomía del hotel", zoneKey: "restaurantes", hotelName }];
    }
    const presets = {
      piscinas: [
        { label: "Piscina principal", subtitle: "Área de descanso", zoneKey: "piscinas", hotelName },
        { label: "Piscina infantil", subtitle: "Zona familiar", zoneKey: "piscinas", hotelName },
        { label: "Piscina de olas", subtitle: "Ambiente de relajación", zoneKey: "piscinas", hotelName }
      ],
      playa: [
        { label: "Playa principal", subtitle: "Arena y mar", zoneKey: "playa", hotelName },
        { label: "Hamacas", subtitle: "Zona de descanso", zoneKey: "playa", hotelName },
        { label: "Vista del mar", subtitle: "Costa del hotel", zoneKey: "playa", hotelName }
      ],
      exteriores: [
        { label: "Exteriores del hotel", subtitle: "Jardines y entorno", zoneKey: "exteriores", hotelName },
        { label: "Senderos", subtitle: "Zonas verdes", zoneKey: "exteriores", hotelName },
        { label: "Entrada y lobby", subtitle: "Recepción del resort", zoneKey: "exteriores", hotelName }
      ]
    };
    return presets[normalized] || [{ label: "Vista del hotel", subtitle: "Exploración 360°", zoneKey: normalized || "exteriores", hotelName }];
  };

  pannellum360.openZoneMenu = function (hotelName, zoneKey, label) {
    const items = pannellum360.getZoneMenuOptions(hotelName, zoneKey);
    if (!items.length) return false;

    const existing = document.querySelector(".pano-360-floating-menu");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    const overlay = document.createElement("div");
    overlay.className = "pano-360-floating-menu";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `${label || "Exploración 360°"}`);
    overlay.innerHTML = `
      <div class="pano-360-floating-panel">
        <div class="pano-360-floating-header">
          <strong>${escapeHtml(label || "Exploración 360°")}</strong>
          <button type="button" class="pano-360-floating-close" aria-label="Cerrar menú">×</button>
        </div>
        <div class="pano-360-floating-list">
          ${items.map((item) => {
            const preview = buildPreview(item.hotelName || hotelName, item.zoneKey || zoneKey, item.label);
            return `
              <button type="button" class="pano-360-floating-option" data-hotel="${escapeHtml(item.hotelName || hotelName)}" data-zone="${escapeHtml(item.zoneKey || zoneKey)}" data-label="${escapeHtml(item.label)}">
                <span class="pano-360-floating-thumb"><img src="${preview}" alt="${escapeHtml(item.label)}" loading="lazy" decoding="async" /></span>
                <span class="pano-360-floating-copy"><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.subtitle)}</small></span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.classList.add("pano-360-open");

    const close = () => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.classList.remove("pano-360-open");
    };

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });
    overlay.querySelector(".pano-360-floating-close")?.addEventListener("click", close);
    overlay.querySelectorAll(".pano-360-floating-option").forEach((button) => {
      button.addEventListener("click", () => {
        const optionHotel = button.dataset.hotel;
        const optionZone = button.dataset.zone;
        const optionLabel = button.dataset.label;
        close();
        if (optionHotel && optionZone && optionLabel) {
          pannellum360.open(optionHotel, optionZone, optionLabel);
        }
      });
    });

    return true;
  };

  pannellum360.renderRestaurantCards = function (hotelName) {
    if (!pannellum360.isPlayaParaiso(hotelName)) return "";
    const restaurants = pannellum360.getRestaurantes(hotelName);
    if (!restaurants.length) return "";
    const cards = restaurants.map(([name, cuisine]) => {
      const preview = buildPreview(hotelName, "restaurantes", name);
      return `
        <button type="button" class="pano-360-ficha pano-360-ficha-restaurante" data-hotel="${escapeHtml(hotelName)}" data-zone="restaurantes" data-label="${escapeHtml(name)}">
          <span class="pano-360-ficha-media">
            <img src="${preview}" alt="Recorrido 360° de ${escapeHtml(name)} en ${escapeHtml(hotelName)}" loading="lazy" decoding="async" />
            <b>360°</b>
          </span>
          <span class="pano-360-ficha-copy">
            <strong>${escapeHtml(name)}</strong>
            <small>${escapeHtml(cuisine)}</small>
          </span>
        </button>
      `;
    }).join("");

    return `
      <p class="pano-360-restaurant-heading">Recorrido virtual de cada restaurante</p>
      <div class="pano-360-list pano-360-list-restaurantes">
        ${cards}
      </div>
    `;
  };

  pannellum360.renderSection = function (hotelName) {
    if (!pannellum360.isPlayaParaiso(hotelName)) return "";
    const cards = ZONES.map((zone) => {
      const preview = buildPreview(hotelName, zone.key, zone.label);
      return `
        <button type="button" class="pano-360-ficha" data-hotel="${escapeHtml(hotelName)}" data-zone="${zone.key}" data-label="${escapeHtml(zone.label)}">
          <span class="pano-360-ficha-media">
            <img src="${preview}" alt="Vista 360° de ${escapeHtml(zone.label)} en ${escapeHtml(hotelName)}" loading="lazy" decoding="async" />
            <b>360°</b>
          </span>
          <span class="pano-360-ficha-copy">
            <strong>${escapeHtml(zone.label)}</strong>
            <small>${escapeHtml(zone.blurb)}</small>
          </span>
        </button>
      `;
    }).join("");

    const restaurantPanel = pannellum360.renderRestaurantCards(hotelName)
      ? `\n        <div class="pano-360-restaurantes-panel" id="hotel-restaurantes-360">\n          ${pannellum360.renderRestaurantCards(hotelName)}\n        </div>`
      : "";

    return `
      <section class="hotel-360-section">
        <div class="hotel-360-heading">
          <small>RECORRIDO VIRTUAL</small>
          <h2>Exploración 360°</h2>
          <p>Asómate a ${escapeHtml(hotelName)}: restaurantes, exteriores, playa y piscinas en panorámica 360°.</p>
        </div>
        <div class="pano-360-list">
          ${cards}
        </div>
        ${restaurantPanel}
      </section>
    `;
  };

  window.pannellum360Open = pannellum360.open;
  window.RevistaDigital.pannellum360 = pannellum360;
})();
