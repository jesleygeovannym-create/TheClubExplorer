(function () {
  window.RevistaDigital = window.RevistaDigital || {};
  const pannellum360 = window.RevistaDigital.pannellum360 || {};

  /* Prueba de Exploración 360°: solo los hoteles de Playa Paraíso. */
  const PLAYA_PARISO_HOTELS = [
    "Iberostar Selection Paraíso del Mar",
    "Iberostar Selection Paraíso Maya",
    "Iberostar Waves Paraíso Lindo",
    "Iberostar Waves Paraíso Beach",
    "JOIA Paraíso by Iberostar"
  ];

  const ZONES = [
    { key: "restaurantes", label: "Restaurantes", blurb: "Ambientes gastronómicos del hotel." },
    { key: "bares", label: "Bares", blurb: "Bares y coctelería del complejo." },
    { key: "exteriores", label: "Exteriores", blurb: "Jardines y áreas al aire libre." },
    { key: "playa", label: "Playas", blurb: "La franja de arena y el mar Caribe." },
    { key: "piscinas", label: "Piscinas", blurb: "Piscinas y zonas de sol." }
  ];

const RESTAURANTES_PARAISO = {
    "Iberostar Selection Paraíso del Mar": [
      ["La Dorada", "Mediterránea"],
      ["El Mercado", "Buffet"],
      ["Rodizio", "Brasileño"],
      ["Trattoria by El Faro", "Cocina italiana"]
    ],
    "Iberostar Selection Paraíso Maya": [
      ["El Rancho", "Steak House"],
      ["El Museo", "Cocina italiana"],
      ["La Geisha", "Japonesa", "", "Desayuno cerrado · Comida cerrada · Cena 18:30 - 21:30 h · Lunes a Domingo · Acceso sujeto a disponibilidad de reservación"],
      ["L'Etoile", "Cocina francesa", "", "Desayuno cerrado · Comida cerrada · Cena 18:30 - 22:00 h · Lunes a Domingo · Acceso sujeto a disponibilidad de reservación"],
      ["The Olivetti", "Cocina italiana"],
      ["American Seafood Grill Under the Sea", "Cocina de mariscos"],
      ["La Marina", "Restaurante de Mariscos · Buffet Mediterráneo", "", "Desayuno cerrado · Comida (Buffet) 12:00 - 16:00 h · Cena (Mariscos a la carta) 18:30 - 22:00 h · Lunes a Domingo"]
    ],
    "Iberostar Waves Paraíso Lindo": [
      ["La Pagoda", "Buffet internacional"],
      ["El Tapatío", "Cocina mexicana"],
      ["Lemon & Spices", "Internacional / Mediterráneo"]
    ],
    "Iberostar Waves Paraíso Beach": [
      ["Hashiro", "Teppanyaki / Sushi"],
      ["El Puerto", "Buffet / Brasería"],
      ["La Hacienda", "Cocina mexicana"],
      ["El Colonial", "Cocina francesa"],
      ["La Plaza", "Buffet principal"]
    ],
    "JOIA Paraíso by Iberostar": [
      ["Legado", "Cocina mexicana/brasserie"],
      ["L'Atelier", "Alta cocina"],
      ["Venecia", "Cocina italiana"],
      ["Haiku", "Cocina asiática"],
      ["Bellavista", "Buffet"]
    ]
  };

  const BARES_PARAISO = {
    "Iberostar Selection Paraíso del Mar": [
      ["Star Café", "Coffee Shop & Snacks", "", "Horario continuo (24 horas) · Lunes a Domingo · Desayuno rápido, comida ligera, cena o antojos de madrugada sin interrupción"],
      ["Pool Bar Las Olas", "Bar de piscina (Swim-up)"],
      ["Aqua Bar La Perla", "Bar de piscina"],
      ["Bar La Fuente", "Lobby bar"],
      ["El Kiosko Bar", "Bar de playa"],
      ["Beach Bar / Bar de playa", "Bar de playa"],
      ["Coco Bar", "Bar de alberca y playa"],
      ["Bar Galaxy Nightclub", "Discoteca"]
    ],
    "Iberostar Selection Paraíso Maya": [
      ["Lobby Bar Kukulkán", "Lobby bar"],
      ["Coco Bar", "Bar de alberca y playa"],
      ["Aqua Bar La Sirenita", "Aqua bar"],
      ["Health Bar SPA", "Health bar"],
      ["Aqua Bar Las Rocas", "Aqua bar"],
      ["Music Bar Rhapsody", "Music bar"],
      ["Bar El Puente", "Pool bar"]
    ],
    "Iberostar Waves Paraíso Lindo": [
      ["Star Café Lindo", "Coffee Shop & Snacks", "", "Horario continuo (24 horas) · Lunes a Domingo · Desayuno rápido, comida ligera, cena o antojos de madrugada sin interrupción"],
      ["Sports Bar Corner", "Sports bar"],
      ["Bar Teatro", "Bar de teatro"],
      ["Lobby Bar Acuario", "Lobby bar"],
      ["Bar El Puente", "Pool bar"]
    ],
    "JOIA Paraíso by Iberostar": [
      ["Lobby Bar El Mirador", "Lobby bar"],
      ["Ember Steak House / La Brisa", "Ember (Steak House): 18:30 – 22:00 h · Casual Elegante · Reserva recomendada. Cortes premium a la parrilla (Ribeye, New York, Filet Mignon, Arrachera) con salsas y guarniciones clásicas. La Brisa: 11:30 – 16:00 h · Casual de playa · Sin reserva. Almuerzo frente al mar (buffet y a la carta) con mariscos frescos, ceviches, parrilla al momento (pesca del día, hamburguesas), tacos, pizzas y postres tropicales."],
      ["The Grand Cellar / Wine Cellar", "Experiencia de Cata de Vinos y Maridaje"],
      ["Star Cafe JOIA", "Coffee Shop & Snacks"],
      ["Lobby Café Iberostar Selection Paraíso Maya", "Coffee Shop & Snacks"]
    ],
    "Iberostar Waves Paraíso Beach": [
      ["Star Rock Café", "Bar temático"],
      ["Pool Bar Las Olas", "Bar de piscina (Swim-up)"],
      ["Aqua Bar La Perla", "Bar de piscina"],
      ["Bar La Fuente", "Lobby bar"],
      ["El Kiosko Bar", "Bar de playa"],
      ["Beach Bar / Bar de playa", "Bar de playa"],
      ["Coco Bar", "Bar de alberca y playa"],
      ["Bar Galaxy Nightclub", "Discoteca"]
    ]
  };

  const VIEW = {
    playa: { yaw: 0, pitch: -6, hfov: 100 },
    piscinas: { yaw: 0, pitch: -12, hfov: 90 },
    restaurantes: { yaw: 0, pitch: -4, hfov: 78 },
    exteriores: { yaw: 60, pitch: -6, hfov: 92 },
    bares: { yaw: 0, pitch: -4, hfov: 80 }
  };

  const PALETTES = {
    playa: { skyTop: "#2e6fb4", skyBottom: "#cfe8f6", groundTop: "#0e6f8c", groundBottom: "#2bb3cc" },
    piscinas: { skyTop: "#2a86b8", skyBottom: "#d9eef3", groundTop: "#17b7c8", groundBottom: "#5fdfe6" },
    restaurantes: { skyTop: "#20394d", skyBottom: "#d9a05f", groundTop: "#8a5434", groundBottom: "#4a2d1c" },
    exteriores: { skyTop: "#6bb1dd", skyBottom: "#e2f3da", groundTop: "#457c3c", groundBottom: "#82b169" },
    bares: { skyTop: "#1a1a2e", skyBottom: "#d4a843", groundTop: "#2d1b4e", groundBottom: "#16213e" }
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

  // Normaliza un nombre de hotel para comparar con/sin marca comercial.
  // Quita prefijos de marca (iberostar, selection, waves, by) y devuelve
  // tokens ordenados alfabéticamente, sin tildes ni puntuación.
  function normalizeHotelName(value) {
    if (!value) return "";
    var text = normalizeText(value);
    if (!text) return "";
    var tokens = text.split(/\s+/).filter(function (token) {
      return token !== "iberostar" &&
             token !== "selection" &&
             token !== "waves" &&
             token !== "by";
    });
    tokens.sort();
    return tokens.join(" ");
  }

  /* Devuelve el nombre canónico exacto de uno de los 5 hoteles de Playa Paraíso
     o "" si no pertenece al complejo. Acepta variantes con/sin marca comercial. */
  function canonicalHotelNameValue(value) {
    var target = normalizeHotelName(value);
    if (!target) return "";
    var found = PLAYA_PARISO_HOTELS.find(function (name) {
      return normalizeHotelName(name) === target;
    });
    return found || "";
  }

  /* Mapa de nombre normalizado -> clave real para búsquedas rápidas en
     RESTAURANTES_PARAISO, BARES_PARAISO y HOTEL_POOL_IDS. Evita fallos
     cuando hotelName llega con variantes de marca comercial. */
  var HOTEL_KEY_MAP = {};
  PLAYA_PARISO_HOTELS.forEach(function (name) {
    HOTEL_KEY_MAP[normalizeHotelName(name)] = name;
  });

  function resolveHotelKey(hotelName) {
    var key = canonicalHotelNameValue(hotelName);
    return key || hotelName;
  }

  function findGuidePoiById(id) {
    var pois = window.RevistaDigital?.guiapa?.POIS;
    if (!Array.isArray(pois)) return null;
    return pois.find(function (poi) { return String(poi.id) === String(id); }) || null;
  }

  const HOTEL_POOL_IDS = {
    "Iberostar Selection Paraíso del Mar": ["activities-pool", "quiet-pool", "waterfall-jacuzzi"],
    "Iberostar Waves Paraíso Beach": ["activities-pool", "quiet-pool", "waterfall-jacuzzi"],
    "Iberostar Waves Paraíso Lindo": ["wave-pool", "lazy-river", "mini-water-playground", "sports-pool", "jacuzzi"],
    "Iberostar Selection Paraíso Maya": ["wave-pool", "lazy-river", "mini-water-playground", "sports-pool", "jacuzzi"],
    "JOIA Paraíso by Iberostar": ["main-pool", "private-pool", "indoor-pool"]
  };

  const POOL_SUBTITLES = {
    "waterfall-jacuzzi": "Cascada y zona de descanso",
    "quiet-pool": "Zona de descanso",
    "activities-pool": "Actividades acuáticas",
    "lazy-river": "Río lento",
    "sports-pool": "Deportes acuáticos",
    "wave-pool": "Olas artificiales",
    jacuzzi: "Zona de hidromasaje",
    "private-pool": "Zona exclusiva",
    "indoor-pool": "Spa y bienestar",
    "main-pool": "Zona de descanso",
    "mini-water-playground": "Parque acuático infantil"
  };

  function getPoolPois() {
    const pois = window.RevistaDigital?.guiapa?.POIS;
    if (!Array.isArray(pois)) return [];
    return pois.filter((poi) => {
      return poi &&
        normalizeText(poi.category) === "piscina" &&
        poi.lat != null && poi.lng != null &&
        Number.isFinite(Number(poi.lat)) && Number.isFinite(Number(poi.lng));
    });
  }

  function getHotelAnchor(hotelName) {
    const pois = window.RevistaDigital?.guiapa?.POIS;
    if (!Array.isArray(pois)) return null;
    const target = normalizeText(hotelName);
    const hotel = pois.find((poi) => {
      if (!poi || normalizeText(poi.category) !== "hotel") return false;
      if (poi.lat == null || poi.lng == null) return false;
      const names = [poi.hotelId, poi.name].map(normalizeText);
      return names.indexOf(target) >= 0 || names.some((value) => value && value.includes(target));
    });
    if (!hotel) return null;
    return { lat: Number(hotel.lat), lng: Number(hotel.lng) };
  }

  function getHotelPoolPois(hotelName) {
    const pools = getPoolPois();
    if (!pools.length) return [];
    const byId = new Map(pools.map((poi) => [poi.id, poi]));
    const key = resolveHotelKey(hotelName);
    const selected = (HOTEL_POOL_IDS[key] || HOTEL_POOL_IDS[hotelName] || [])
      .map((id) => byId.get(id))
      .filter(Boolean);
    if (selected.length) return selected;
    const anchor = getHotelAnchor(hotelName);
    if (!anchor) return pools.slice(0, 4);
    const cosLat = Math.cos((anchor.lat * Math.PI) / 180);
    return pools
      .map((poi) => {
        const dLat = Number(poi.lat) - anchor.lat;
        const dLng = (Number(poi.lng) - anchor.lng) * cosLat;
        return { poi, distance: dLat * dLat + dLng * dLng };
      })
      .sort((first, second) => first.distance - second.distance)
      .slice(0, 4)
      .map((entry) => entry.poi);
  }

  const BAR_FALLBACK_COORDS = {
    "Iberostar Selection Paraíso del Mar": [
      { id: "starcafe", name: "Star Café", lat: 20.7618856, lng: -86.9627721, description: "Coffee Shop & Snacks · Horario continuo (24 horas)" },
      { id: "pool-bar-las-olas", name: "Pool Bar Las Olas", lat: 20.757897, lng: -86.961767, description: "Bar de piscina (Swim-up)" },
      { id: "aqua-bar-la-perla", name: "Aqua Bar La Perla", lat: 20.7589509, lng: -86.9583723, description: "Bar de piscina" },
      { id: "bar-la-fuente", name: "Bar La Fuente", lat: 20.7612389, lng: -86.9640931, description: "Lobby bar" },
      { id: "bar-el-kiosko", name: "El Kiosko Bar", lat: 20.757810, lng: -86.958304, description: "Bar de playa" },
      { id: "beach-bar", name: "Beach Bar / Bar de playa", lat: 20.757856, lng: -86.958359, description: "Bar de playa" },
      { id: "cocobar", name: "Coco Bar", lat: 20.756290, lng: -86.959046, description: "Bar de alberca y playa" },
      { id: "bar-galaxy-nightclub", name: "Bar Galaxy Nightclub", lat: 20.75955, lng: -86.966, description: "Discoteca" }
    ],
    "Iberostar Selection Paraíso Maya": [
      { id: "lobby-bar-kukulkan", name: "Lobby Bar Kukulkán", lat: 20.7575018, lng: -86.9645296, description: "Lobby bar" },
      { id: "cocobar", name: "Coco Bar", lat: 20.756290, lng: -86.959046, description: "Bar de alberca y playa" },
      { id: "aqua-bar-la-sirenita", name: "Aqua Bar La Sirenita", lat: 20.754775, lng: -86.960108, description: "Aqua bar" },
      { id: "health-bar-spa", name: "Health Bar SPA", lat: 20.756025, lng: -86.961423, description: "Health bar" },
      { id: "aqua-bar-las-rocas", name: "Aqua Bar Las Rocas", lat: 20.755, lng: -86.962, description: "Aqua bar" },
      { id: "music-bar-rhapsody", name: "Music Bar Rhapsody", lat: 20.756312, lng: -86.962411, description: "Music bar" },
      { id: "bar-el-puente", name: "Bar El Puente", lat: 20.757166, lng: -86.960961, description: "Pool bar" }
    ],
    "Iberostar Waves Paraíso Lindo": [
      { id: "star-rock-cafe-lindo", name: "Star Café Lindo", lat: 20.760072, lng: -86.965257, description: "Coffee Shop & Snacks · Horario continuo (24 horas)" },
      { id: "sports-bar-corner", name: "Sports Bar Corner", lat: 20.7596764, lng: -86.9634133, description: "Sports bar" },
      { id: "bar-teatro", name: "Bar Teatro", lat: 20.759376, lng: -86.962659, description: "Bar de teatro" },
      { id: "lobby-bar-acuario", name: "Lobby Bar Acuario", lat: 20.7595512, lng: -86.963491, description: "Lobby bar" },
      { id: "bar-el-puente", name: "Bar El Puente", lat: 20.757166, lng: -86.960961, description: "Pool bar" }
    ],
    "JOIA Paraíso by Iberostar": [
      { id: "lobby-bar-el-mirador", name: "Lobby Bar El Mirador", lat: 20.756335, lng: -86.962712, description: "Lobby bar" },
      { id: "la-brisa", name: "Ember Steak House / La Brisa", lat: 20.7546463, lng: -86.9597269, description: "Ember (Steak House): 18:30 – 22:00 h · Casual Elegante · Reserva recomendada. Cortes premium a la parrilla (Ribeye, New York, Filet Mignon, Arrachera) con salsas y guarniciones clásicas. La Brisa: 11:30 – 16:00 h · Casual de playa · Sin reserva. Almuerzo frente al mar (buffet y a la carta) con mariscos frescos, ceviches, parrilla al momento (pesca del día, hamburguesas), tacos, pizzas y postres tropicales." },
      { id: "punta-sal-ceviche", name: "Punta Sal Ceviche & Beach Bar", lat: 20.754750, lng: -86.959584, description: "Ceviche & Beach Bar" },
      { id: "grand-cellar", name: "The Grand Cellar / Wine Cellar", lat: 20.756344, lng: -86.962658, description: "Experiencia de Cata de Vinos y Maridaje" },
      { id: "joia-cafe", name: "Café de JOIA", lat: 20.756068, lng: -86.962852, description: "Coffee Shop & Snacks" },
      { id: "paraiso-maya-cafe", name: "Lobby Café Iberostar Selection Paraíso Maya", lat: 20.757492, lng: -86.964523, description: "Coffee Shop & Snacks" }
    ],
    "Iberostar Waves Paraíso Beach": [
      { id: "starcafe", name: "Star Rock Café", lat: 20.7618856, lng: -86.9627721, description: "Bar temático" },
      { id: "pool-bar-las-olas", name: "Pool Bar Las Olas", lat: 20.757897, lng: -86.961767, description: "Bar de piscina (Swim-up)" },
      { id: "aqua-bar-la-perla", name: "Aqua Bar La Perla", lat: 20.7589509, lng: -86.9583723, description: "Bar de piscina" },
      { id: "bar-la-fuente", name: "Bar La Fuente", lat: 20.7584, lng: -86.9585, description: "Lobby bar" },
      { id: "bar-el-kiosko", name: "El Kiosko Bar", lat: 20.757810, lng: -86.958304, description: "Bar de playa" },
      { id: "beach-bar", name: "Beach Bar / Bar de playa", lat: 20.757856, lng: -86.958359, description: "Bar de playa" },
      { id: "cocobar", name: "Coco Bar", lat: 20.756290, lng: -86.959046, description: "Bar de alberca y playa" },
      { id: "bar-galaxy-nightclub", name: "Bar Galaxy Nightclub", lat: 20.75955, lng: -86.966, description: "Discoteca" }
    ]
  };

  function getHotelBarPois(hotelName) {
    const gp = window.RevistaDigital && window.RevistaDigital.guiapa;
    const pois = gp && gp.POIS;
    if (!Array.isArray(pois) || !pois.length) {
      // Fallback estático si POIS no está listo
      var barKey = resolveHotelKey(hotelName);
      return (BAR_FALLBACK_COORDS[barKey] || BAR_FALLBACK_COORDS[hotelName] || []).map((b) => ({ ...b, category: "bar" }));
    }
    const bars = pois.filter((poi) => normalizeText(poi.category) === "bar");
    if (!bars.length) return [];
    const byId = new Map(bars.map((poi) => [poi.id, poi]));
    var barKey = resolveHotelKey(hotelName);
    const hotelBars = (BARES_PARAISO[barKey] || BARES_PARAISO[hotelName] || [])
      .map(([name]) => {
        const target = normalizeText(name);
        return bars.find((poi) => normalizeText(poi.name) === target) || byId.get(target);
      })
      .filter(Boolean);
    if (hotelBars.length) return hotelBars;
    const anchor = getHotelAnchor(hotelName);
    if (!anchor) return bars.slice(0, 6);
    const cosLat = Math.cos((anchor.lat * Math.PI) / 180);
    return bars
      .map((poi) => {
        const dLat = Number(poi.lat) - anchor.lat;
        const dLng = (Number(poi.lng) - anchor.lng) * cosLat;
        return { poi, distance: dLat * dLat + dLng * dLng };
      })
      .sort((first, second) => first.distance - second.distance)
      .slice(0, 6)
      .map((entry) => entry.poi);
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
        if (!zone || normalizeText(poi.category) === zone || zone === "restaurantes" || zone === "bares") return poi.id;
        if (!fallbackId) fallbackId = poi.id;
      } else if (!fallbackId && name.indexOf(target) >= 0) {
        fallbackId = poi.id;
      }
    }
    return fallbackId;
  }

  function findRestaurantPoi(label, hotelName) {
    const target = normalizeText(label);
    const pois = window.RevistaDigital?.guiapa?.POIS || [];
    const restaurants = pois.filter((poi) => {
      const cat = normalizeText(poi.category);
      return cat === "restaurante" || cat === "bar";
    });
    // Primero intenta coincidencia exacta dentro del mismo hotel (si se conoce)
    if (hotelName) {
      const exactHotel = restaurants.find((poi) =>
        normalizeText(poi.name) === target &&
        (normalizeText(poi.hotelId || poi.hotel || "") === normalizeText(hotelName)
         || normalizeText(poi.hotelId || poi.hotel || "") === resolveHotelKey(hotelName))
      );
      if (exactHotel) return exactHotel;
    }
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
    const hotelBar = (pannellum360.getBares?.(hotelName) || [])
      .find(([name]) => normalizeText(name) === normalizeText(label));
    const hotelEntry = hotelRestaurant || hotelBar;
    const poi = findRestaurantPoi(label);
    // Usar menús resumidos definidos en datos-complejo.js
    const menuSummarized = {
      "El Museo": "Entrantes: Antipasto, crema pomodoro y ensalada arúgula-pera. Pastas: Risotto negro, gnocchis gorgonzola, penne arrabbiata y ravioles trufados. Fuertes: Ossobuco con polenta, filete al Chianti y robalo a la plancha. Postres: Cannoli, tiramisú y torta de chocolate con gelato.",
      "Lemon & Spices": "Entrantes: Mezze con hummus/pita, ensalada griega y crema de espárragos. Fuertes: Pescado al limón, cordero al romero, pollo confitado y cuscús vegetal. Postres: Mousse de limón flameado, tarta de higos y tartaleta de manzana."
    };
    const menu = menuSummarized[label] || (poi?.menu || hotelEntry?.[2] || "");
    return {
      name: hotelEntry?.[0] || label || "Restaurante",
      cuisine: poi?.cuisine || hotelEntry?.[1] || "",
      hours: poi?.hours || hotelEntry?.[3] || "",
      menu: menu
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
      : '<p class="pano-360-action-note">Consulte la carta digital en el hotel.</p>';
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
    // findHotelPortalRoute y poiForHotel buscan en estructuras que pueden
    // usar nombres sin marca comercial; probar primero con el hotelName
    // original y, si falla, con el nombre canónico resuelto.
    var canonicalKey = resolveHotelKey(hotelName);
    var hotelRoute = routes?.findHotelPortalRoute?.(hotelName)
      || routes?.findHotelPortalRoute?.(canonicalKey);
    const restaurantPoi = findRestaurantPoi(label, hotelName);
    const hasRestaurantCoordinates = restaurantPoi?.verified === true &&
      Number.isFinite(restaurantPoi.lat) && Number.isFinite(restaurantPoi.lng);
    var hotelPoi = guide?.poiForHotel?.(hotelName);
    if (!hotelPoi && canonicalKey !== hotelName) {
      hotelPoi = guide?.poiForHotel?.(canonicalKey);
    }
    const hotelHasCoordinates = hotelPoi &&
      Number.isFinite(hotelPoi.lat) && Number.isFinite(hotelPoi.lng);
    const destination = hasRestaurantCoordinates ? restaurantPoi
      : (hotelHasCoordinates ? hotelPoi : null);
    const notice = hasRestaurantCoordinates
      ? ""
      : hotelHasCoordinates
        ? `No hay ubicación interior verificada para ${label}; la ruta se traza hasta ${hotelName}.`
        : `No hay ubicación verificada para ${label} ni para ${hotelName}.`;

    if (!destination || typeof routes.navigate !== "function" ||
        typeof guide?.queueRouteToPoi !== "function" ||
        !guide.queueRouteToPoi(destination.id, notice)) {
      console.warn(`No se pudo preparar el mapa o la ruta para ${label} en ${hotelName}.`);
      window.alert("No fue posible preparar el mapa y la ruta para este restaurante.");
      return;
    }

    closePanorama();
    // Solo navegar si hay una ruta de hotel diferente a la actual; si ya
    // estamos en el mapa del complejo, quedarse en la misma página y centrar
    // el mapa en el restaurante.
    var currentPath = window.location.pathname || "/";
    if (hotelRoute && hotelRoute !== currentPath) {
      routes.navigate(hotelRoute);
    } else {
      guide._routeNotice = notice;
      guide.selectPoi(destination.id);
      if (typeof guide.routeToPoi === "function") guide.routeToPoi(destination.id);
      delete guide._pendingRouteRequest;
    }
    // Limpieza agresiva DESPUÉS de navegar al mapa: en móvil puede quedar el
    // backdrop del 360, la clase body.pano-360-open (overflow: hidden) o la
    // tarjeta flotante de la guía sobre el mapa, bloqueando gestos táctiles.
    setTimeout(function () {
      // Remover clase de modo abierto del 360
      document.body.classList.remove("pano-360-open");
      // Restaurar scroll del body si quedó bloqueado
      document.body.style.removeProperty("overflow");
      // Eliminar cualquier elemento del 360 que quede en el DOM
      document.querySelectorAll(
        ".pano-360-modal, .pano-360-action-overlay, .pano-360-floating-menu, " +
        ".pano-360-floating-panel"
      ).forEach(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      // Colapsar la tarjeta flotante de la guía móvil
      guide?.renderMobileActions?.(null);
      // Forzar ocultar el panel directamente en el DOM
      var panel = document.getElementById("guideMobileActions");
      if (panel) {
        panel.setAttribute("hidden", "");
      }
    }, 0);
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
              <label><span>Nombre</span><input type="text" name="name" placeholder="Su nombre" required /></label>
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
            <p class="pano-360-action-copy">Su reserva para ${escapeHtml(label || "este restaurante")} ha quedado registrada.</p>
        <p class="pano-360-action-note">La confirmación se realiza en recepción del hotel.</p>
      `;
    });
  }

  pannellum360.open = function (hotelName, zoneKey, label, requestedPoiId) {
    try {
      window.sessionStorage.setItem("club360LastViewed", JSON.stringify({
        hotelName: hotelName,
        zoneKey: zoneKey,
        label: label,
        poiId: requestedPoiId || ""
      }));
    } catch (error) { /* noop */ }
    ensurePannellum().then(() => {
      var canonicalHotel = canonicalHotelNameValue(hotelName) || hotelName;

      var zoneAliases = {
        restaurante: "restaurantes",
        bar: "bares",
        exterior: "exteriores",
        pool: "piscinas"
      };
      var normalizedZoneKey = normalizeText(zoneKey || "");
      var requestedZone = zoneAliases[normalizedZoneKey] || normalizedZoneKey;

      // Si llega un poiId, derivar la zona de su categoría (antes del zoneKey)
      var requestedPoi = requestedPoiId ? findGuidePoiById(requestedPoiId) : null;
      var poiCategory = requestedPoi ? normalizeText(requestedPoi.category) : "";
      var derivedZone = "";
      if (poiCategory === "restaurante") derivedZone = "restaurantes";
      else if (poiCategory === "bar" || poiCategory === "discoteca") derivedZone = "bares";

      var resolvedZone = VIEW[requestedZone] ? requestedZone : (derivedZone || "exteriores");
      var view = VIEW[resolvedZone];
      var url = buildPanorama(canonicalHotel, resolvedZone, label, 2048, 1024).toDataURL("image/jpeg", 0.85);

      // Botón "Ver en el mapa": solo aparece si existe una guía del hotel y un
      // punto del mapa que corresponda a esta zona/etiqueta.
      var poiTarget = requestedPoiId || resolvePoiForPano(resolvedZone, label);
      var isRestaurantView = resolvedZone === "restaurantes" || resolvedZone === "bares";
      var mapButton = !isRestaurantView && poiTarget
        ? '<button type="button" class="pano-360-map" data-poi="' + escapeHtml(poiTarget) + '">Ver en el mapa</button>'
        : "";
      var restaurantActions = isRestaurantView ?
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
          "<strong>" + escapeHtml(label) + " · " + escapeHtml(canonicalHotel) + "</strong>" +
          '<span class="pano-360-bar-actions">' + mapButton + restaurantActions +
          '<button type="button" class="pano-360-close" aria-label="Cerrar recorrido">×</button>' +
          "</span>" +
        "</div>" +
        '<div class="pano-360-stage"><div id="pano360Stage"></div></div>';

      document.body.appendChild(modal);
      modal.offsetHeight;
      document.body.classList.add("pano-360-open");

      let viewer = null;

      function closeModal() {
        try {
          if (viewer && typeof viewer.destroy === "function") viewer.destroy();
        } catch (error) { /* noop */ }
        viewer = null;
        // Eliminar cualquier modal o overlay del 360 que quede en el DOM
        document.querySelectorAll(".pano-360-modal, .pano-360-action-overlay").forEach(function (el) {
          if (el.parentNode) el.parentNode.removeChild(el);
        });
        // Limpiar contenedor del viewer si queda
        var stage = document.getElementById("pano360Stage");
        if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
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
          openRestaurantMenuOverlay(canonicalHotel, label);
        });
      }
      const bookingBtn = modal.querySelector(".pano-360-book");
      if (bookingBtn) {
        bookingBtn.addEventListener("click", () => {
          openReservationOverlay(canonicalHotel, label);
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
    return Boolean(canonicalHotelNameValue(hotelName));
  };

  pannellum360.canonicalHotelName = function (hotelName) {
    return canonicalHotelNameValue(hotelName);
  };

  pannellum360.getRestaurantes = function (hotelName) {
    var key = resolveHotelKey(hotelName);
    return RESTAURANTES_PARAISO[key] || RESTAURANTES_PARAISO[hotelName] || [];
  };

  pannellum360.getBares = function (hotelName) {
    var key = resolveHotelKey(hotelName);
    return BARES_PARAISO[key] || BARES_PARAISO[hotelName] || [];
  };

  /* Datos por restaurante para construir fichas visuales: nombre, cocina,
     imagen de vista previa y disponibilidad de recorrido 360°. Solo los
     hoteles del complejo Playa Paraíso tienen recorrido 360° hoy. */
  pannellum360.getRestaurantFicheData = function (hotelName) {
    if (!pannellum360.isPlayaParaiso(hotelName)) return [];
    return pannellum360.getRestaurantes(hotelName).map(([name, cuisine, , hours]) => ({
      name,
      cuisine: cuisine || "Restaurante",
      hours: hours || getRestaurantDetails(hotelName, name).hours,
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
    if (normalized === "piscinas") {
      const pools = getHotelPoolPois(hotelName);
      if (pools.length) {
        return pools.map((poi) => ({
          label: poi.name,
          subtitle: POOL_SUBTITLES[poi.id] || poi.description || "Piscina del complejo",
          zoneKey: "piscinas",
          hotelName
        }));
      }
    }
    if (normalized === "bares") {
      const bars = getHotelBarPois(hotelName);
      if (bars.length) {
        return bars.map((poi) => ({
          label: poi.name,
          subtitle: poi.description || "Bar del complejo",
          zoneKey: "bares",
          hotelName
        }));
      }
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
      ],
      bares: [
        { label: "Lobby Bar", subtitle: "Coctelería de autor", zoneKey: "bares", hotelName },
        { label: "Pool Bar", subtitle: "Bebidas en la piscina", zoneKey: "bares", hotelName },
        { label: "Beach Bar", subtitle: "Cócteles frente al mar", zoneKey: "bares", hotelName }
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
                <span class="pano-360-floating-thumb"><img src="${preview}" alt="${escapeHtml(item.label)}" width="84" height="64" loading="lazy" decoding="async" /></span>
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
    const cards = restaurants.map(([name, cuisine, , hours]) => {
      const preview = buildPreview(hotelName, "restaurantes", name);
      const serviceHours = hours || getRestaurantDetails(hotelName, name).hours;
      return `
        <button type="button" class="pano-360-ficha pano-360-ficha-restaurante" data-hotel="${escapeHtml(hotelName)}" data-zone="restaurantes" data-label="${escapeHtml(name)}">
          <span class="pano-360-ficha-media">
            <img src="${preview}" alt="Recorrido 360° de ${escapeHtml(name)} en ${escapeHtml(hotelName)}" width="640" height="320" loading="lazy" decoding="async" />
            <b>360°</b>
          </span>
          <span class="pano-360-ficha-copy">
            <strong>${escapeHtml(name)}</strong>
            <small>${escapeHtml(cuisine)}</small>
            ${serviceHours ? `<small class="restaurant-menu-hours">${escapeHtml(serviceHours)}</small>` : ""}
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
            <img src="${preview}" alt="Vista 360° de ${escapeHtml(zone.label)} en ${escapeHtml(hotelName)}" width="640" height="320" loading="lazy" decoding="async" />
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
          <p>Asómese a ${escapeHtml(hotelName)}: restaurantes, exteriores, playa y piscinas en panorámica 360°.</p>
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