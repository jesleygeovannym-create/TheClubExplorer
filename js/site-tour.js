(function () {
  "use strict";

  window.RevistaDigital = window.RevistaDigital || {};

  var DISABLED_KEY = "clubSiteTourDisabled";
  var ROUTE_KEY_PREFIX = "clubSiteTourRouteSeen:";
  var STORY_DURATION_MS = 4000;
  var overviewSlides = [
    {
      scene: "destinations",
      eyebrow: "THE CLUB EXPLORER · DESTINOS",
      title: "Tu próxima historia comienza aquí",
      description: "Un viaje para descubrir destinos, hoteles y experiencias.",
      preview: "/"
    },
    {
      scene: "destinations",
      eyebrow: "PLANISFERIO INTERACTIVO",
      title: "Empieza explorando el mundo",
      description: "Acércate a cada región y encuentra tu próximo destino.",
      preview: "world-map"
    },
    {
      scene: "hotel",
      eyebrow: "HOTELES POR PAÍS",
      title: "Encuentra tu próximo lugar para hospedarte",
      description: "Cada país abre la puerta a hoteles y destinos distintos.",
      preview: "/",
      treatment: "hotels"
    },
    {
      scene: "restaurants",
      eyebrow: "RESTAURANTES POR PAÍS",
      title: "Un mundo de sabores por descubrir",
      description: "Conoce algunos de los restaurantes que puedes encontrar en cada país.",
      preview: "/",
      treatment: "restaurants"
    },
    {
      scene: "transport",
      eyebrow: "TRANSPORTE",
      title: "Pide tu carrito y mira cómo llega",
      description: "Escribe tus datos, elige un destino y mira cómo viene el carrito por ti.",
      preview: "/carrito-golf",
      treatment: "transport",
      duration: 30000
    },
    {
      scene: "panorama",
      eyebrow: "EXPERIENCIAS 360°",
      title: "Y mira el destino desde otra perspectiva",
      description: "Las fichas muestran imágenes reales de los hoteles que puedes explorar en 360°.",
      preview: "/360",
      treatment: "panorama",
      duration: 6000
    }
  ];

  var sectionSlides = [
    {
      section: "hotel-ubicacion",
      scene: "destinations",
      eyebrow: "MAPA DEL COMPLEJO",
      title: "Ubica hoteles y lugares",
      description: "Usa el mapa para orientarte, abrir marcadores y consultar cómo llegar a un punto."
    },
    {
      section: "hotel-guia",
      scene: "hotel",
      eyebrow: "LUGARES DEL COMPLEJO",
      title: "Explora los puntos del mapa",
      description: "Abre la guía para descubrir restaurantes, golf y otros lugares; desde sus marcadores puedes pedir carrito."
    },
    {
      section: "hotel-transporte",
      scene: "transport",
      eyebrow: "TRANSPORTE",
      title: "Solicita un carrito cercano",
      description: "El hotel ya está seleccionado. Abre el transporte para indicar tu destino y seguir el carrito en el mapa.",
      action: "Solicitar transporte",
      route: "/carrito-golf"
    },
    {
      section: "hotel-servicios",
      scene: "explore",
      eyebrow: "SERVICIOS DEL HOTEL",
      title: "Consulta lo que ofrece",
      description: "Revisa los servicios y comodidades disponibles en este hotel."
    }
  ];

  var routeSlides = [
    {
      match: function (route) { return route === "/"; },
      scene: "destinations",
      eyebrow: "INICIO",
      title: "Explora y elige tu destino",
      description: "Selecciona un país para ver sus destinos y hoteles, o usa el menú Explorar para acceder a las demás secciones."
    },
    {
      match: function (route) { return route === "/carrito-golf"; },
      scene: "transport",
      eyebrow: "TRANSPORTE",
      title: "Solicita un carrito",
      description: "Selecciona el hotel, activa tu ubicación, elige el destino y envía la solicitud para seguir el carrito en el mapa."
    },
    {
      match: function (route) { return route === "/360"; },
      scene: "panorama",
      eyebrow: "CONTENIDO 360°",
      title: "Explora en 360°",
      description: "Filtra por hotel y selecciona una zona o restaurante para abrir su recorrido virtual."
    },
    {
      match: function (route) { return route === "/workspace"; },
      scene: "explore",
      eyebrow: "WORKSPACE",
      title: "Tu espacio de trabajo",
      description: "Aquí encuentras las herramientas y el contenido de trabajo disponibles dentro de la experiencia."
    },
    {
      match: function (route) { return route === "/videos"; },
      scene: "videos",
      eyebrow: "VIDEOS",
      title: "Mira el destino en movimiento",
      description: "Explora los videos disponibles y conoce mejor los hoteles y sus experiencias."
    },
    {
      match: function (route) { return route === "/restaurantes" || route.indexOf("/restaurantes/") === 0; },
      scene: "restaurants",
      eyebrow: "RESTAURANTES",
      title: "Encuentra tu próxima mesa",
      description: "Explora el directorio, elige un hotel y consulta sus opciones y detalles gastronómicos."
    },
    {
      match: function (route) { return /^\/mexico\/riviera-maya\/[^/]+$/.test(route); },
      scene: "hotel",
      eyebrow: "FICHA DEL HOTEL",
      title: "Todo lo que necesitas para explorar",
      description: "Consulta el mapa y los lugares del complejo, revisa restaurantes y abre la sección Transporte para solicitar un carrito."
    },
    {
      match: function (route) { return route === "/mexico/riviera-maya"; },
      scene: "hotel",
      eyebrow: "RIVIERA MAYA",
      title: "Elige entre los hoteles del complejo",
      description: "Explora las fichas de los hoteles de Playa Paraíso para consultar mapas, restaurantes, transporte y más."
    },
    {
      match: function (route) { return /^\/[^/]+\/[^/]+$/.test(route); },
      scene: "destinations",
      eyebrow: "DESTINO",
      title: "Descubre los hoteles disponibles",
      description: "Explora el destino, consulta su ubicación y selecciona un hotel para conocer más detalles."
    },
    {
      match: function (route) { return /^\/[^/]+$/.test(route) && !/^\/(mapa-hoteles|restaurantes)$/.test(route); },
      scene: "destinations",
      eyebrow: "DESTINOS",
      title: "Explora los alojamientos",
      description: "Selecciona un destino para ver sus hoteles y abrir la ficha de cada uno."
    }
  ];

  var overlay = null;
  var currentSlides = [];
  var currentIndex = 0;
  var overviewMode = false;
  var routeTourReady = false;
  var previewSceneToken = 0;
  var locationServicesPending = false;
  var autoAdvanceTimer = null;
  var autoAdvanceProgress = null;
  var slideTransitionTimer = null;
  var previousFocus = null;
  var mediaReduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

  function storageGet(storage, key) {
    try {
      return storage.getItem(key);
    } catch (error) {
      console.warn("No se pudo leer la preferencia de la guía del sitio.", error);
      return null;
    }
  }

  function storageSet(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch (error) {
      console.warn("No se pudo guardar la preferencia de la guía del sitio.", error);
    }
  }

  function currentRoute() {
    var route = window.RevistaDigital.appContext?.route ||
      document.body.dataset.currentRoute ||
      window.location.pathname.replace(/\/+$/, "") ||
      "/";
    return window.location.hash ? route + window.location.hash : route;
  }

  function placeContextForRoute(route) {
    var path = String(route || "").split("#")[0];
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return null;
    var catalog = window.RevistaDigital.hoteles?.getDestinationCatalog?.() || {};
    var country = catalog[parts[0]];
    if (!country) return null;
    var destination = parts[1] && (country.destinations || []).find(function (item) { return item.slug === parts[1]; });
    var hotel = parts[2] && destination && (destination.hotels || []).find(function (item) { return item.slug === parts[2]; });
    if (parts[2] && !hotel) {
      (country.destinations || []).some(function (item) {
        hotel = (item.hotels || []).find(function (record) { return record.slug === parts[2]; });
        if (hotel) destination = item;
        return !!hotel;
      });
    }
    var countryName = country.name || parts[0];
    var destinationName = destination?.name || "";
    var hotelName = hotel?.name || "";
    return {
      route: path,
      countryName: countryName,
      destinationName: destinationName,
      hotelName: hotelName,
      placeName: hotelName || destinationName || countryName
    };
  }

  function buildIntroSlides(route, routeSlide) {
    var slides = overviewSlides.slice();
    if (!routeSlide) return slides;
    var placeContext = placeContextForRoute(route);
    if (placeContext) {
      var welcomeDescription = placeContext.hotelName
        ? "Te damos la bienvenida a " + placeContext.hotelName + ", en " + placeContext.destinationName + "."
        : placeContext.destinationName
          ? "Descubre " + placeContext.destinationName + " y sus alojamientos en " + placeContext.countryName + "."
          : "Explora los destinos y alojamientos de " + placeContext.countryName + ".";
      slides.push({
        scene: "hotel",
        eyebrow: "BIENVENIDO A " + placeContext.countryName.toLocaleUpperCase("es"),
        title: "Bienvenido a " + placeContext.placeName,
        description: welcomeDescription,
        treatment: "welcome",
        duration: 4100
      });
      slides.push(Object.assign({}, routeSlide, { preview: placeContext.route }));
      return slides;
    }
    var routePath = String(route || "/").split("#")[0] || "/";
    slides.push(Object.assign({}, routeSlide, { preview: routePath }));
    return slides;
  }

  function findRouteSlide(route) {
    var separatorIndex = route.indexOf("#");
    if (separatorIndex >= 0) {
      var pathname = route.slice(0, separatorIndex);
      var section = route.slice(separatorIndex + 1);
      if (/^\/mexico\/riviera-maya\/[^/]+$/.test(pathname)) {
        return sectionSlides.find(function (slide) { return slide.section === section; }) || null;
      }
      route = pathname;
    }
    return routeSlides.find(function (slide) { return slide.match(route); }) || null;
  }

  function sceneMarkup(scene) {
    var scenes = {
      destinations: '<span class="site-tour-orbit site-tour-orbit--one"></span><span class="site-tour-orbit site-tour-orbit--two"></span><span class="site-tour-object site-tour-object--globe" aria-hidden="true">◎</span><span class="site-tour-object site-tour-object--pin" aria-hidden="true">⌖</span><span class="site-tour-object site-tour-object--star" aria-hidden="true">✦</span>',
      hotel: '<span class="site-tour-object site-tour-object--hotel" aria-hidden="true"><i></i><i></i><i></i><b></b></span><span class="site-tour-object site-tour-object--pin" aria-hidden="true">⌖</span><span class="site-tour-orbit site-tour-orbit--one"></span>',
      restaurants: '<span class="site-tour-object site-tour-object--plate" aria-hidden="true"><i></i><b></b></span><span class="site-tour-object site-tour-object--fork" aria-hidden="true">✣</span><span class="site-tour-orbit site-tour-orbit--two"></span>',
      transport: '<span class="site-tour-object site-tour-object--cart" aria-hidden="true"><i></i><b></b><em></em><strong></strong></span><span class="site-tour-object site-tour-object--route" aria-hidden="true">⌁</span><span class="site-tour-orbit site-tour-orbit--one"></span>',
      panorama: '<span class="site-tour-object site-tour-object--sphere" aria-hidden="true"><i></i><b></b></span><span class="site-tour-object site-tour-object--spark" aria-hidden="true">✦</span><span class="site-tour-orbit site-tour-orbit--two"></span>',
      explore: '<span class="site-tour-object site-tour-object--window" aria-hidden="true"><i></i><i></i><i></i></span><span class="site-tour-object site-tour-object--play" aria-hidden="true">▶</span><span class="site-tour-orbit site-tour-orbit--one"></span>',
      videos: '<span class="site-tour-object site-tour-object--screen" aria-hidden="true"><i></i></span><span class="site-tour-object site-tour-object--play" aria-hidden="true">▶</span><span class="site-tour-orbit site-tour-orbit--two"></span>'
    };
    return '<div class="site-tour-scene site-tour-scene--' + scene + '" aria-hidden="true">' +
      '<div class="site-tour-scene-floor"></div>' + (scenes[scene] || scenes.destinations) + '</div>';
  }

  function storyPreviewMarkup() {
    return '<div class="site-tour-preview-window">' +
      '<iframe class="site-tour-live-preview" title="Vista previa de The Club Explorer" tabindex="-1"></iframe>' +
      '<span class="site-tour-preview-wash" aria-hidden="true"></span>' +
      '<div class="site-tour-transport-steps" aria-hidden="true">' +
        '<span style="--transport-step-index:0">1 · Escribes tus datos y eliges destino</span>' +
        '<span style="--transport-step-index:1">2 · Solicitas el carrito; viene por ti</span>' +
        '<span style="--transport-step-index:2">3 · Te lleva a tu destino</span>' +
      '</div>' +
    '</div>';
  }

  function countryStoryItems(frame, countrySlug, treatment) {
    var source = frame.contentWindow?.RevistaDigital;
    if (!source) return [];
    if (treatment === "hotels") {
      var catalog = source.hoteles?.getDestinationCatalog?.() || {};
      var country = catalog[countrySlug];
      return (country?.destinations || []).flatMap(function (destination) {
        return destination.hotels || [];
      }).map(function (hotel) { return hotel.name; }).filter(Boolean);
    }
    var directory = source.restaurantes?.getDirectory?.() || [];
    var countryDirectory = directory.find(function (item) { return item.slug === countrySlug; });
    return (countryDirectory?.hotels || []).flatMap(function (hotel) {
      return hotel.restaurants || [];
    }).map(function (restaurant) { return Array.isArray(restaurant) ? restaurant[0] : restaurant.name; }).filter(Boolean);
  }

  function decorateCountryCards(frame, treatment) {
    var doc = frame.contentDocument;
    var links = Array.prototype.slice.call(doc.querySelectorAll(".destination-card.country"));
    links.forEach(function (card) {
      card.querySelector(".site-tour-country-names")?.remove();
      var href = card.getAttribute("href") || "";
      var countrySlug = href.split("/").filter(Boolean).pop();
      if (!countrySlug) return;
      var names = countryStoryItems(frame, countrySlug, treatment);
      var label = doc.createElement("span");
      label.className = "site-tour-country-names";
      var heading = doc.createElement("strong");
      heading.textContent = treatment === "hotels" ? "HOTELES" : "RESTAURANTES";
      label.appendChild(heading);
      names.slice(0, 4).forEach(function (name, index) {
        var item = doc.createElement("span");
        item.textContent = name;
        item.style.setProperty("--story-name-index", index);
        label.appendChild(item);
      });
      if (names.length > 4) {
        var remainder = doc.createElement("small");
        remainder.textContent = "+ " + (names.length - 4) + " más";
        label.appendChild(remainder);
      }
      card.appendChild(label);
    });
  }

  function installPreviewStyles(frame) {
    var doc = frame.contentDocument;
    if (!doc || doc.querySelector("#site-tour-preview-styles")) return;
    var style = doc.createElement("style");
    style.id = "site-tour-preview-styles";
    style.textContent = [
      "html,body{width:100%;min-height:100%;margin:0!important;overflow:hidden!important}",
      "body[data-site-tour-preview-scene=\"hotels\"],body[data-site-tour-preview-scene=\"restaurants\"]{display:block!important;background:#f5f0e7!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] #siteHeader,body[data-site-tour-preview-scene=\"restaurants\"] #siteHeader,body[data-site-tour-preview-scene=\"hotels\"] .portal-hero,body[data-site-tour-preview-scene=\"restaurants\"] .portal-hero,body[data-site-tour-preview-scene=\"hotels\"] .portal-nav,body[data-site-tour-preview-scene=\"restaurants\"] .portal-nav{display:none!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .portal-page,body[data-site-tour-preview-scene=\"restaurants\"] .portal-page{min-height:100vh!important;padding:3vh 3vw!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .portal-section,body[data-site-tour-preview-scene=\"restaurants\"] .portal-section{margin:0!important;padding:2vh 0!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .portal-section-heading,body[data-site-tour-preview-scene=\"restaurants\"] .portal-section-heading{justify-content:center!important;margin:0 0 2vh!important;text-align:center!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .destination-grid,body[data-site-tour-preview-scene=\"restaurants\"] .destination-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:1.4vw!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .destination-card.country,body[data-site-tour-preview-scene=\"restaurants\"] .destination-card.country{position:relative!important;height:76vh!important;min-height:0!important;overflow:hidden!important;border-radius:16px!important;box-shadow:0 18px 40px #0904032b!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .destination-card.country>picture,body[data-site-tour-preview-scene=\"restaurants\"] .destination-card.country>picture,body[data-site-tour-preview-scene=\"hotels\"] .destination-card.country>img,body[data-site-tour-preview-scene=\"restaurants\"] .destination-card.country>img{width:100%!important;height:100%!important;object-fit:cover!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .destination-card.country .destination-card-copy,body[data-site-tour-preview-scene=\"restaurants\"] .destination-card.country .destination-card-copy{position:absolute!important;inset:auto 0 0!important;z-index:2!important;padding:52px 16px 16px!important;background:linear-gradient(transparent,#09111be8)!important;color:white!important}",
      "body[data-site-tour-preview-scene=\"hotels\"] .destination-card.country .destination-card-copy strong,body[data-site-tour-preview-scene=\"restaurants\"] .destination-card.country .destination-card-copy strong{color:white!important;font-size:clamp(20px,2.4vw,34px)!important}",
      ".site-tour-country-names{position:absolute;z-index:4;inset:18px 12px auto;padding:13px 14px 11px;border:1px solid #fff9;border-radius:12px;background:#09111bc9;color:white;backdrop-filter:blur(8px);font:600 clamp(10px,1vw,14px)/1.35 Arial,sans-serif;letter-spacing:.02em;box-shadow:0 8px 22px #0004;pointer-events:none}",
      ".site-tour-country-names>strong{display:block;margin-bottom:7px;color:#e9cf8c;font-size:.72em;letter-spacing:.2em}",
      ".site-tour-country-names>span{display:block;opacity:0;animation:siteTourCountryNameIn 3.6s ease-in-out infinite;animation-delay:calc(var(--story-name-index)*.72s);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".site-tour-country-names>small{display:block;margin-top:4px;color:#e9cf8c;font-size:.75em}",
      "@keyframes siteTourCountryNameIn{0%,15%{opacity:0;transform:translateY(5px)}24%,75%{opacity:1;transform:translateY(0)}88%,100%{opacity:0;transform:translateY(-4px)}}",
      "body[data-site-tour-preview-scene=\"transport\"]{display:block!important;overflow:hidden!important}",
      "body[data-site-tour-preview-scene=\"transport\"] #siteHeader,body[data-site-tour-preview-scene=\"transport\"] .portal-nav,body[data-site-tour-preview-scene=\"transport\"] .cart-page-hero,body[data-site-tour-preview-scene=\"transport\"] .cart-page-toolbar,body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-eta{display:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .app-view,body[data-site-tour-preview-scene=\"transport\"] .cart-page,body[data-site-tour-preview-scene=\"transport\"] .cart-page-section{display:block!important;width:100%!important;height:100dvh!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-tracker{position:fixed!important;inset:0!important;display:grid!important;grid-template-columns:minmax(290px,360px) minmax(0,1fr)!important;gap:14px!important;width:100%!important;height:100dvh!important;min-height:0!important;margin:0!important;padding:16px!important;overflow:hidden!important;align-items:stretch!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-panel{display:flex!important;position:relative!important;inset:auto!important;z-index:1200!important;width:auto!important;max-height:100%!important;overflow:auto!important;gap:12px!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-status,body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-form,body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-nearby{flex:0 0 auto!important;width:100%!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-nearby{display:block!important;padding:16px!important;border:1px solid #e6dbc8!important;border-radius:16px!important;background:#fffdf8!important;box-shadow:0 12px 28px #40362e10!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-panel:has(.hotel-cart-form:not([hidden])) .hotel-cart-nearby{display:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-map-wrap{position:relative!important;inset:auto!important;width:100%!important;height:100%!important;min-height:0!important;margin:0!important;padding:0!important;border:1px solid #d9c9ae!important;border-radius:16px!important;background:#e8e2d6!important;box-shadow:0 16px 36px #40362e1a!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-map{width:100%!important;height:100%!important;min-height:0!important;border:0!important;border-radius:16px!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-form{display:grid!important;grid-template-columns:minmax(0,1fr)!important;position:static!important;gap:9px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-form[hidden]{display:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-status:has(.cart-status-card.is-idle){display:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .site-tour-demo-focus{outline:2px solid #c7a95e!important;box-shadow:0 0 0 4px #c7a95e55!important;transition:box-shadow .2s ease!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-form-note{margin:0!important;color:#74664f!important;font-size:12px!important;line-height:1.45!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-field{display:grid!important;gap:5px!important;margin:0!important;color:#40362e!important;font-size:11px!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-field input,body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-field select,body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-field textarea{width:100%!important;min-height:38px!important;padding:9px 10px!important;border:1px solid #d9c9ae!important;border-radius:8px!important;background:white!important;font-size:12px!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-row{display:grid!important;grid-template-columns:1fr 1fr!important;gap:9px!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-submit{min-height:42px!important;border:0!important;border-radius:999px!important;background:#8f7332!important;color:white!important;font-weight:700!important;box-shadow:0 6px 18px #8f733255!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-form:has([hidden]){display:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-status{display:block!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}",
      "body[data-site-tour-preview-scene=\"transport\"] .cart-status-card{padding:18px!important;border-radius:16px!important;background:linear-gradient(160deg,#f4fcf7,#e8f5ee)!important;box-shadow:0 12px 28px #40362e12!important}",
      "body[data-site-tour-preview-scene=\"panorama\"]{display:block!important;min-height:100dvh!important;background:radial-gradient(ellipse at 50% 45%,#263c48 0%,#15232c 48%,#0b1218 100%)!important;overflow:hidden!important}",
      "body[data-site-tour-preview-scene=\"panorama\"] #siteHeader,body[data-site-tour-preview-scene=\"panorama\"] .portal-nav,body[data-site-tour-preview-scene=\"panorama\"] .media-header,body[data-site-tour-preview-scene=\"panorama\"] .media-selector,body[data-site-tour-preview-scene=\"panorama\"] .cart-page-hero,body[data-site-tour-preview-scene=\"panorama\"] .cart-page-toolbar,body[data-site-tour-preview-scene=\"panorama\"] .cart-page-location,body[data-site-tour-preview-scene=\"panorama\"] .leaflet-control-container,body[data-site-tour-preview-scene=\"panorama\"] .leaflet-control-zoom,body[data-site-tour-preview-scene=\"panorama\"] .leaflet-control-rotate{display:none!important}",
      "body[data-site-tour-preview-scene=\"panorama\"] .media-spread,body[data-site-tour-preview-scene=\"panorama\"] .magazine-stage,body[data-site-tour-preview-scene=\"panorama\"] #bookShell,body[data-site-tour-preview-scene=\"panorama\"] .pager,body[data-site-tour-preview-scene=\"panorama\"] #locationStatus{display:none!important}",
      "body[data-site-tour-preview-scene=\"panorama\"] .app-view,body[data-site-tour-preview-scene=\"panorama\"] .cart-page,body[data-site-tour-preview-scene=\"panorama\"] .cart-page-section,body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-tracker,body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-map-wrap,body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-map{display:none!important}",
      "body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-panel,body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-status,body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-nearby,body[data-site-tour-preview-scene=\"panorama\"] .hotel-cart-eta{display:none!important}",
      ".site-tour-360-floating{position:fixed!important;inset:0!important;z-index:20000!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:clamp(10px,2vw,28px)!important;padding:12vh 4vw 10vh!important;perspective:1200px!important;background:radial-gradient(ellipse at 50% 48%,#31526380,transparent 70%)!important;pointer-events:none!important;animation:siteTour360StageIn .7s ease-out both!important}",
      ".site-tour-360-floating .pano-360-ficha{flex:1 1 0!important;width:min(22vw,260px)!important;max-width:260px!important;min-width:0!important;overflow:hidden!important;border:1px solid #fff8!important;border-radius:18px!important;background:#fffdf2!important;box-shadow:0 22px 55px #0008!important;animation:siteTour360CardIn .85s cubic-bezier(.16,1,.3,1) both,siteTour360Float 4.2s ease-in-out infinite!important;animation-delay:calc(var(--story-card-index)*.12s),calc(var(--story-card-index)*-.72s)!important;pointer-events:none!important}",
      ".site-tour-360-floating .pano-360-ficha:nth-child(odd){rotate:-3deg!important}",
      ".site-tour-360-floating .pano-360-ficha:nth-child(even){rotate:3deg!important;animation-duration:.85s,4.8s!important}",
      ".site-tour-360-floating .pano-360-ficha-media{height:clamp(130px,25vh,250px)!important;overflow:hidden!important}",
      ".site-tour-360-floating .pano-360-ficha-media img{width:100%!important;height:100%!important;aspect-ratio:auto!important;object-fit:cover!important}",
      ".site-tour-360-floating .pano-360-ficha-copy{padding:14px 16px 16px!important}",
      ".site-tour-360-floating .pano-360-ficha-copy strong{color:#273b43!important;font-size:clamp(15px,1.5vw,22px)!important}",
      ".site-tour-360-floating .pano-360-ficha-copy small{font-size:clamp(10px,.9vw,13px)!important}",
      "@keyframes siteTour360StageIn{from{opacity:0}to{opacity:1}}",
      "@keyframes siteTour360CardIn{0%{opacity:0;translate:0 34px;scale:.92;filter:blur(5px)}70%{opacity:1;translate:0 -3px;scale:1.015;filter:blur(0)}100%{opacity:1;translate:0 0;scale:1;filter:blur(0)}}",
      "@keyframes siteTour360Float{0%,100%{transform:translateY(8px) translateZ(0)}50%{transform:translateY(-13px) translateZ(28px)}}",
      "@media(max-width:700px){body[data-site-tour-preview-scene=\"hotels\"] .destination-grid,body[data-site-tour-preview-scene=\"restaurants\"] .destination-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}body[data-site-tour-preview-scene=\"hotels\"] .destination-card.country,body[data-site-tour-preview-scene=\"restaurants\"] .destination-card.country{height:39vh!important}body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-tracker{grid-template-columns:minmax(0,1fr)!important;gap:0!important;padding:10px!important}body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-map-wrap{position:absolute!important;inset:0!important;z-index:0!important;height:100%!important;border:0!important;border-radius:0!important}body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-panel{position:relative!important;z-index:1200!important;width:min(100%,380px)!important;max-height:25dvh!important;overflow:hidden!important;gap:0!important}body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-status{flex:0 0 auto!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card{padding:10px 12px!important;border-radius:12px!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card h3{margin-bottom:5px!important;font-size:18px!important;line-height:1.2!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card p{margin-bottom:5px!important;font-size:12px!important;line-height:1.35!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card .cart-eta-big{margin:7px 0 4px!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card .cart-eta-big span{font-size:28px!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card .cart-progress{height:6px!important;margin:7px 0!important}body[data-site-tour-preview-scene=\"transport\"] .cart-status-card .cart-cancel{min-height:32px!important;padding:6px 12px!important;font-size:12px!important}body[data-site-tour-preview-scene=\"transport\"] .hotel-cart-nearby{display:none!important}.site-tour-360-floating{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;padding:11vh 5vw 5vh!important}.site-tour-360-floating .pano-360-ficha{width:100%!important;max-width:none!important}.site-tour-360-floating .pano-360-ficha-media{height:18vh!important}.site-tour-360-floating .pano-360-ficha-copy{padding:9px 10px 11px!important}.site-tour-360-floating .pano-360-ficha-copy strong{font-size:15px!important}}",
      "@media(prefers-reduced-motion:reduce){.site-tour-360-floating,.site-tour-360-floating .pano-360-ficha{animation:none!important}}"
    ].join("");
    doc.head.appendChild(style);
  }

  function refreshTransportPreviewMap(frame) {
    if (!frame || frame.dataset.previewMode !== "app") return;
    [80, 260, 700].forEach(function (delay) {
      window.setTimeout(function () {
        try {
          var cart = frame.contentWindow?.RevistaDigital?.carritoGolf;
          if (typeof cart?.refreshMapLayout === "function") cart.refreshMapLayout();
        } catch (error) {
          // El iframe puede estar cambiando de ruta mientras se ajusta el mapa.
        }
      }, delay);
    });
  }

  function resetTransportPreview(frame) {
    try {
      var doc = frame?.contentDocument;
      var cart = frame?.contentWindow?.RevistaDigital?.carritoGolf;
      var form = doc?.querySelector("[data-cart-form]");
      if (form) {
        delete form.dataset.storySubmitted;
        form.querySelectorAll(".site-tour-demo-focus").forEach(function (field) {
          field.classList.remove("site-tour-demo-focus");
        });
      }
      if (cart && doc?.documentElement?.dataset.tourPreview === "true") {
        cart._position = null;
        cart._locationState = "idle";
        cart.cancel?.();
        cart.refreshMapLayout?.();
      }
    } catch (error) {
      // El iframe puede estar cerrándose o cambiando de ruta.
    }
  }

  function prepareLongTransportDemo(cart, form) {
    if (!cart || !form || form.dataset.storySubmitted ||
        document.documentElement.dataset.tourPreview !== "true") return;
    var destinations = cart.getDestinations?.().filter(function (item) {
      return Number.isFinite(item.lat) && Number.isFinite(item.lng);
    }) || [];
    var hotelCoordinates = Array.isArray(cart._context?.coordinates)
      ? cart._context.coordinates
      : [20.7592, -86.9630];
    if (destinations.length < 2) return;
    function distanceSquared(first, second) {
      var latitudeScale = Math.cos(((first.lat + second.lat) / 2) * Math.PI / 180);
      var latitude = first.lat - second.lat;
      var longitude = (first.lng - second.lng) * latitudeScale;
      return latitude * latitude + longitude * longitude;
    }
    var hotelPoint = { lat: hotelCoordinates[0], lng: hotelCoordinates[1] };
    var pickup = destinations.reduce(function (farthest, item) {
      return distanceSquared(item, hotelPoint) > distanceSquared(farthest, hotelPoint) ? item : farthest;
    }, destinations[0]);
    var destination = destinations.reduce(function (farthest, item) {
      return item.id !== pickup.id && distanceSquared(item, pickup) > distanceSquared(farthest, pickup)
        ? item
        : farthest;
    }, destinations.find(function (item) { return item.id !== pickup.id; }) || destinations[0]);
    if (pickup.id === destination.id) return;
    cart._position = { latitude: pickup.lat, longitude: pickup.lng, accuracy: null };
    return destination;
  }

  function runTransportFormDemo(frame, slide, form, destination, token) {
    if (!form || form.dataset.storySubmitted) return;
    var name = form.querySelector("[name='nombre']");
    var room = form.querySelector("[name='habitacion']");
    var select = form.querySelector("[data-cart-destination]");
    if (!name || !room || !select) return;
    name.value = "";
    room.value = "";
    function isCurrent() {
      var previewBody = frame.contentDocument?.body;
      return token === previewSceneToken && overlay &&
        previewBody?.dataset.siteTourPreviewScene === "transport";
    }
    function wait(milliseconds) {
      return new Promise(function (resolve) { window.setTimeout(resolve, milliseconds); });
    }
    async function typeValue(field, value) {
      field.classList.add("site-tour-demo-focus");
      for (var index = 1; index <= value.length; index += 1) {
        if (!isCurrent()) return false;
        field.value = value.slice(0, index);
        try { field.dispatchEvent(new frame.contentWindow.Event("input", { bubbles: true })); } catch (error) { /* visual demo still works */ }
        await wait(100);
      }
      field.classList.remove("site-tour-demo-focus");
      return isCurrent();
    }
    async function play() {
      await wait(1000);
      if (!await typeValue(name, "Alex")) return;
      await wait(180);
      if (!await typeValue(room, "204")) return;
      await wait(220);
      if (!isCurrent()) return;
      select.classList.add("site-tour-demo-focus");
      if (destination?.id) select.value = destination.id;
      if (!select.value && select.options.length) select.selectedIndex = 0;
      try { select.dispatchEvent(new frame.contentWindow.Event("change", { bubbles: true })); } catch (error) { /* selection is already visible */ }
      await wait(700);
      select.classList.remove("site-tour-demo-focus");
      if (!isCurrent() || form.hidden) return;
      var cart = frame.contentWindow.RevistaDigital?.carritoGolf;
      if (typeof cart?.request === "function") {
        frame.contentDocument.documentElement.dataset.tourPreview = "true";
        cart.request({
          guest: name.value,
          room: room.value,
          destinationId: select.value,
          source: "section",
          tourDemo: true
        });
      } else if (typeof form.requestSubmit === "function") {
        form.requestSubmit();
      }
    }
    form.dataset.storySubmitted = "true";
    play();
    return true;
  }

  function startTransportDemoWhenReady(frame, slide, token, attempt) {
    var attemptNumber = attempt || 0;
    var previewBody = frame?.contentDocument?.body;
    if (!previewBody || token !== previewSceneToken || !overlay ||
        previewBody.dataset.siteTourPreviewScene !== "transport") return;
    frame.contentDocument.documentElement.dataset.tourPreview = "true";
    var form = frame.contentDocument.querySelector("[data-cart-form]");
    var cart = frame.contentWindow.RevistaDigital?.carritoGolf;
    var request = cart && cart._context && cart._requests
      ? cart._requests[cart._context.slug]
      : null;
    if (form && !form.dataset.storySubmitted && !request) {
      var destination = cart ? prepareLongTransportDemo(cart, form) : null;
      if (!destination && cart) {
        var knownDestinations = cart.getDestinations?.() || [];
        destination = knownDestinations.find(function (item) { return item.id === form.querySelector("[data-cart-destination]")?.value; }) || knownDestinations[0] || null;
      }
      if (destination || form.querySelector("[data-cart-destination]")?.options.length) {
        if (runTransportFormDemo(frame, slide, form, destination, token)) {
          waitForTransportDemoToFinish(frame, slide, token);
          return;
        }
      }
    }
    if (attemptNumber < 80) {
      window.setTimeout(function () {
        startTransportDemoWhenReady(frame, slide, token, attemptNumber + 1);
      }, 250);
    }
  }

  function waitForTransportDemoToFinish(frame, slide, token) {
    function check() {
      if (token !== previewSceneToken || !overlay || !overviewMode ||
          currentSlides[currentIndex] !== slide) return;
      var cart = frame.contentWindow?.RevistaDigital?.carritoGolf;
      var request = cart && cart._context && cart._requests
        ? cart._requests[cart._context.slug]
        : null;
      if (request?.tourDemo && request.status === "completed") {
        window.setTimeout(function () {
          if (token !== previewSceneToken || !overlay || !overviewMode ||
              currentSlides[currentIndex] !== slide) return;
          currentIndex = Math.min(currentIndex + 1, currentSlides.length - 1);
          renderSlide();
        }, 800);
        return;
      }
      window.setTimeout(check, 250);
    }
    window.setTimeout(check, 250);
  }

  function decorateLivePreview(frame, slide) {
    if (!frame || !slide || slide.preview === "world-map" || frame.dataset.previewMode !== "app") return;
    if (!overlay || !overviewMode || currentSlides[currentIndex] !== slide) return;
    try {
      var doc = frame.contentDocument;
      if (!doc?.body) return;
      installPreviewStyles(frame);
      doc.body.dataset.siteTourPreviewScene = slide.treatment || "";
      if (slide.treatment !== "panorama") {
        doc.querySelector(".site-tour-360-floating")?.remove();
        delete doc.body.dataset.siteTour360Ready;
        delete doc.body.dataset.siteTour360Preparing;
      }
      if (slide.treatment === "hotels" || slide.treatment === "restaurants") {
        decorateCountryCards(frame, slide.treatment);
      }
      if (slide.treatment === "transport") {
        refreshTransportPreviewMap(frame);
        startTransportDemoWhenReady(frame, slide, previewSceneToken);
      }
      if (slide.treatment === "panorama") {
        var panoramaToken = String(previewSceneToken);
        if (doc.body.dataset.siteTour360Ready === panoramaToken ||
            doc.body.dataset.siteTour360Preparing === panoramaToken) return;
        var panoramaApi = frame.contentWindow.RevistaDigital?.pannellum360;
        var section = doc.createElement("div");
        section.innerHTML = panoramaApi?.renderSection?.("Iberostar Paraíso del Mar") || "";
        var zoneOrder = ["piscinas", "exteriores", "playa", "restaurantes"];
        var cards = Array.prototype.slice.call(section.querySelectorAll(".pano-360-list > .pano-360-ficha"))
          .sort(function (first, second) {
            return zoneOrder.indexOf(first.dataset.zone) - zoneOrder.indexOf(second.dataset.zone);
          }).slice(0, 4);
        var floatingCards = doc.createElement("div");
        floatingCards.className = "site-tour-360-floating";
        cards.forEach(function (card, index) {
          card.style.setProperty("--story-card-index", index);
          var image = card.querySelector(".pano-360-ficha-media img");
          if (image) {
            image.loading = "eager";
            image.decoding = "sync";
          }
          if (card.dataset.zone === "playa") {
            var label = card.querySelector(".pano-360-ficha-copy strong");
            if (label) label.textContent = "Playa";
          }
          floatingCards.appendChild(card);
        });
        if (cards.length === 4) {
          doc.querySelector(".site-tour-360-floating")?.remove();
          doc.body.appendChild(floatingCards);
          doc.body.dataset.siteTour360Ready = panoramaToken;
          delete doc.body.dataset.siteTour360Preparing;
        } else {
          console.warn("No se pudieron preparar las cuatro fichas de la vista 360°.");
        }
      }
    } catch (error) {
      console.warn("No se pudo preparar la vista real para la historia del sitio.", error);
    }
  }

  function updateStoryPreview(slide) {
    var frame = overlay?.querySelector(".site-tour-live-preview");
    if (!frame) return;
    var sceneToken = ++previewSceneToken;
    var previewWindow = frame.parentElement;
    var previousScene = previewWindow.dataset.storyScene;
    if (previousScene === "transport" && slide.treatment !== "transport") {
      resetTransportPreview(frame);
    }
    previewWindow.classList.remove("is-cutting");
    previewWindow.dataset.storyScene = slide.treatment || "";
    if (slide.treatment === "panorama") {
      try {
        var panoramaDoc = frame.contentDocument;
        if (panoramaDoc?.body) {
          installPreviewStyles(frame);
          panoramaDoc.body.dataset.siteTourPreviewScene = "panorama";
        }
      } catch (error) { /* iframe may be navigating */ }
    }
    var transportSteps = previewWindow.querySelector(".site-tour-transport-steps");
    transportSteps?.classList.remove("is-active");
    if (slide.treatment === "transport" && transportSteps) {
      void transportSteps.offsetWidth;
      transportSteps.classList.add("is-active");
    }
    void previewWindow.offsetWidth;
    previewWindow.classList.add("is-cutting");

    if (frame.dataset.previewMode === "app" && slide.treatment !== "panorama") {
      try {
        var previewDoc = frame.contentDocument;
        previewDoc?.querySelector(".site-tour-360-floating")?.remove();
        if (previewDoc?.body) {
          delete previewDoc.body.dataset.siteTour360Ready;
          delete previewDoc.body.dataset.siteTour360Preparing;
        }
      } catch (error) { /* iframe may be navigating */ }
    }

    function decorateIfCurrent() {
      if (sceneToken !== previewSceneToken || !overlay || !overviewMode || currentSlides[currentIndex] !== slide) return;
      decorateLivePreview(frame, slide);
    }

    if (slide.preview === "world-map") {
      if (frame.dataset.previewMode !== "world-map") {
        frame.dataset.previewMode = "world-map";
        frame.src = new URL("mapa-mundi/index2.html?v=2", document.baseURI).href;
      }
      return;
    }

    if (slide.treatment === "welcome") return;

    var previewWindowRef = frame.contentWindow;
    var previewRoutes = previewWindowRef?.RevistaDigital?.routes;
    if (slide.treatment === "panorama") {
      if (frame.dataset.previewMode === "app") {
        if (typeof previewRoutes?.navigate === "function") {
          window.setTimeout(decorateIfCurrent, 80);
          window.setTimeout(decorateIfCurrent, 260);
          window.setTimeout(decorateIfCurrent, 600);
        } else {
          frame.onload = decorateIfCurrent;
        }
        return;
      }
      var panoramaUrl = new URL("./", document.baseURI);
      panoramaUrl.searchParams.set("route-entry", "/carrito-golf");
      panoramaUrl.searchParams.set("tour-preview", "1");
      frame.dataset.previewMode = "app";
      frame.dataset.storyTreatment = "panorama";
      frame.onload = decorateIfCurrent;
      if (frame.src !== panoramaUrl.href) frame.src = panoramaUrl.href;
      return;
    }
    if (frame.dataset.previewMode === "app" && typeof previewRoutes?.navigate === "function") {
      previewRoutes.navigate(slide.preview);
      window.setTimeout(decorateIfCurrent, 120);
      window.setTimeout(decorateIfCurrent, 450);
      window.setTimeout(decorateIfCurrent, 900);
      if (slide.treatment === "transport") {
        window.setTimeout(decorateIfCurrent, 1400);
        window.setTimeout(decorateIfCurrent, 2200);
      }
      return;
    }

    var previewUrl = new URL("./", document.baseURI);
    previewUrl.searchParams.set("route-entry", slide.preview);
    previewUrl.searchParams.set("tour-preview", "1");
    frame.dataset.previewMode = "app";
    frame.dataset.storyTreatment = slide.treatment || "";
    frame.onload = decorateIfCurrent;
    if (frame.src !== previewUrl.href) frame.src = previewUrl.href;
  }

  function clearAutoAdvance() {
    if (autoAdvanceTimer) window.clearTimeout(autoAdvanceTimer);
    if (autoAdvanceProgress) window.clearTimeout(autoAdvanceProgress);
    if (slideTransitionTimer) window.clearTimeout(slideTransitionTimer);
    autoAdvanceTimer = null;
    autoAdvanceProgress = null;
    slideTransitionTimer = null;
  }

  function advanceSlide() {
    if (!overlay || !currentSlides.length) return;
    if (currentIndex >= currentSlides.length - 1) {
      closeTour();
      return;
    }
    if (slideTransitionTimer) return;
    var slide = currentSlides[currentIndex];
    var content = overlay.querySelector(".site-tour-content");
    if (slide.treatment === "welcome" && !mediaReduceMotion?.matches && content) {
      content.classList.remove("is-entering");
      content.classList.add("is-leaving");
      slideTransitionTimer = window.setTimeout(function () {
        slideTransitionTimer = null;
        if (!overlay || currentSlides[currentIndex] !== slide) return;
        currentIndex += 1;
        renderSlide();
      }, 460);
      return;
    }
    currentIndex += 1;
    renderSlide();
  }

  function closeTour() {
    clearAutoAdvance();
    if (!overlay) return;
    var closingPreview = overlay.querySelector(".site-tour-live-preview");
    if (closingPreview?.parentElement.dataset.storyScene === "transport") {
      resetTransportPreview(closingPreview);
    }
    if (overlay.querySelector("[data-tour-disable]")?.checked) {
      storageSet(window.localStorage, DISABLED_KEY, "true");
    }
    overlay.classList.remove("is-visible");
    document.body.classList.remove("site-tour-open");
    var closingOverlay = overlay;
    overlay = null;
    window.setTimeout(function () {
      if (closingOverlay.parentNode) closingOverlay.parentNode.removeChild(closingOverlay);
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
      previousFocus = null;
      if (locationServicesPending) {
        locationServicesPending = false;
        window.RevistaDigital.startLocationServices?.();
      }
    }, mediaReduceMotion?.matches ? 0 : 360);
  }

  function renderSlide() {
    if (!overlay || !currentSlides.length) return;
    var slide = currentSlides[currentIndex];
    var pageTranslations = window.RevistaDigital && window.RevistaDigital.pageTranslations;
    var translate = function (value) {
      return pageTranslations && typeof pageTranslations.translateText === "function"
        ? pageTranslations.translateText(value)
        : value;
    };
    var scene = overlay.querySelector(".site-tour-scene");
    var content = overlay.querySelector(".site-tour-content");
    var eyebrow = overlay.querySelector(".site-tour-eyebrow");
    var title = overlay.querySelector(".site-tour-title");
    var description = overlay.querySelector(".site-tour-description");
    var action = overlay.querySelector(".site-tour-action");
    var counter = overlay.querySelector(".site-tour-counter");
    var dots = overlay.querySelector(".site-tour-dots");
    var progress = overlay.querySelector(".site-tour-progress span");

    if (overviewMode) {
      updateStoryPreview(slide);
    } else {
      scene.outerHTML = sceneMarkup(slide.scene);
    }
    eyebrow.textContent = translate(slide.eyebrow);
    content.classList.toggle("is-welcome", slide.treatment === "welcome");
    content.classList.toggle("is-detected-location", slide.treatment === "detected-location");
    if (slide.treatment === "welcome") {
      title.replaceChildren();
      var welcomeLetters = Array.from(translate(slide.title));
      welcomeLetters.forEach(function (character, index) {
        if (character === " ") {
          title.appendChild(document.createTextNode(" "));
          return;
        }
        var letter = document.createElement("span");
        letter.className = "site-tour-welcome-letter";
        letter.style.setProperty("--welcome-letter-index", index);
        letter.style.setProperty("--welcome-letter-total", welcomeLetters.length);
        letter.textContent = character;
        title.appendChild(letter);
      });
    } else {
      title.textContent = translate(slide.title);
    }
    description.textContent = translate(slide.description);
    content.classList.remove("is-entering", "is-leaving");
    void content.offsetWidth;
    content.classList.add("is-entering");
    counter.textContent = currentSlides.length > 1
      ? (currentIndex + 1) + " / " + currentSlides.length
      : translate("GUÍA DE ESTA SECCIÓN");
    dots.innerHTML = currentSlides.length > 1
      ? currentSlides.map(function (_, index) {
          return '<button type="button" class="site-tour-dot' + (index === currentIndex ? " is-active" : "") +
            '" data-tour-index="' + index + '" aria-label="Ir al paso ' + (index + 1) +
            '" aria-current="' + (index === currentIndex ? "step" : "false") + '"></button>';
        }).join("")
      : "";

    if (slide.route) {
      action.hidden = false;
      action.textContent = translate(slide.action || "Ir a esta sección");
      action.dataset.route = slide.route;
    } else {
      action.hidden = true;
      action.removeAttribute("data-route");
    }

    progress.style.width = "100%";
    progress.style.transform = "scaleX(" + (overviewMode && currentSlides.length > 1 ? (currentIndex + 1) / currentSlides.length : 1) + ")";
    progress.style.transition = "transform " + (slide.duration || STORY_DURATION_MS) + "ms linear";
    overlay.querySelector(".site-tour-previous").disabled = currentIndex === 0;
    overlay.querySelector(".site-tour-next").textContent = currentIndex === currentSlides.length - 1 ? "Terminar" : "Siguiente";
    clearAutoAdvance();

    if (overviewMode && currentSlides.length > 1 && !mediaReduceMotion?.matches) {
      autoAdvanceProgress = window.setTimeout(function () {
        var bar = overlay?.querySelector(".site-tour-progress span");
        if (bar) bar.classList.add("is-running");
      }, 20);
      var slideDuration = slide.duration || STORY_DURATION_MS;
      var exitLead = slide.treatment === "welcome" && !mediaReduceMotion?.matches ? 460 : 0;
      autoAdvanceTimer = window.setTimeout(function () {
        autoAdvanceTimer = null;
        advanceSlide();
      }, Math.max(0, slideDuration - exitLead));
    }
  }

  function buildOverlay(isOverview) {
    var node = document.createElement("section");
    node.className = "site-tour-overlay" + (isOverview ? " site-tour-overlay--story" : "");
    node.setAttribute("role", "dialog");
    node.setAttribute("aria-modal", "true");
    node.setAttribute("aria-label", "Guía interactiva del sitio");
    node.innerHTML =
      '<div class="site-tour-backdrop" data-tour-close></div>' +
      '<div class="site-tour-panel">' +
        '<button type="button" class="site-tour-close" data-tour-close aria-label="Cerrar guía">×</button>' +
        '<div class="site-tour-card">' +
          '<div class="site-tour-visual">' + (isOverview ? storyPreviewMarkup() : sceneMarkup("destinations")) + '</div>' +
          '<div class="site-tour-content">' +
            '<p class="site-tour-eyebrow"></p>' +
            '<h2 class="site-tour-title"></h2>' +
            '<p class="site-tour-description"></p>' +
            '<div class="site-tour-progress" aria-hidden="true"><span></span></div>' +
            '<div class="site-tour-footer">' +
              '<span class="site-tour-counter"></span>' +
              '<div class="site-tour-controls">' +
                '<button type="button" class="site-tour-text-button" data-tour-close>Omitir</button>' +
                '<button type="button" class="site-tour-previous" aria-label="Paso anterior">←</button>' +
                '<button type="button" class="site-tour-next">Siguiente</button>' +
              '</div>' +
            '</div>' +
            (isOverview ? "" : '<label class="site-tour-preference"><input type="checkbox" data-tour-disable /> No volver a mostrar automáticamente</label>') +
            '<button type="button" class="site-tour-action" hidden></button>' +
            '<div class="site-tour-dots" aria-label="Pasos de la guía"></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    node.addEventListener("click", function (event) {
      var closeTarget = event.target.closest("[data-tour-close]");
      if (closeTarget) {
        closeTour();
        return;
      }
      if (event.target.closest(".site-tour-previous")) {
        if (currentIndex > 0) {
          currentIndex -= 1;
          renderSlide();
        }
        return;
      }
      if (event.target.closest(".site-tour-next")) {
        advanceSlide();
        return;
      }
      var dot = event.target.closest("[data-tour-index]");
      if (dot) {
        currentIndex = Number(dot.dataset.tourIndex);
        renderSlide();
        return;
      }
      var routeButton = event.target.closest(".site-tour-action[data-route]");
      if (routeButton) {
        var routes = window.RevistaDigital.routes;
        closeTour();
        if (routes && typeof routes.navigate === "function") routes.navigate(routeButton.dataset.route);
      }
    });

    var panel = node.querySelector(".site-tour-panel");
    if (!isOverview) {
      panel.addEventListener("mouseenter", clearAutoAdvance);
      panel.addEventListener("mouseleave", renderSlide);
    }
    return node;
  }

  function showTour(slides, isOverview) {
    if (!slides || !slides.length || overlay) return false;
    overviewMode = isOverview;
    currentSlides = slides;
    currentIndex = 0;
    previousFocus = document.activeElement;
    overlay = buildOverlay(isOverview);
    document.body.appendChild(overlay);
    document.body.classList.add("site-tour-open");
    renderSlide();
    window.requestAnimationFrame(function () {
      if (!overlay) return;
      overlay.classList.add("is-visible");
      overlay.querySelector(".site-tour-close").focus();
    });
    return true;
  }

  function routeSeenKey(route) {
    return ROUTE_KEY_PREFIX + encodeURIComponent(route);
  }

  function onRouteChange(route) {
    if (document.documentElement.dataset.tourPreview === "true" ||
        !routeTourReady || overlay || storageGet(window.localStorage, DISABLED_KEY) === "true") return;
    var slide = findRouteSlide(route);
    if (!slide) return;
    var key = routeSeenKey(route);
    if (storageGet(window.sessionStorage, key) === "true") return;
    storageSet(window.sessionStorage, key, "true");
    window.setTimeout(function () {
      if (routeTourReady && currentRoute() === route && !overlay) showTour([slide], false);
    }, 480);
  }

  function afterLogo() {
    routeTourReady = true;
    if (document.documentElement.dataset.tourPreview === "true") return;
    var route = currentRoute();
    var routeSlide = route === "/" ? null : findRouteSlide(route);
    var slides = buildIntroSlides(route, routeSlide);
    var introShown = showTour(slides, true);
    locationServicesPending = introShown;
    if (!introShown) window.RevistaDigital.startLocationServices?.();
  }

  document.addEventListener("keydown", function (event) {
    if (!overlay) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeTour();
    } else if (event.key === "ArrowRight" && currentIndex < currentSlides.length - 1) {
      advanceSlide();
    } else if (event.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex -= 1;
      renderSlide();
    } else if (event.key === "Tab") {
      var focusable = Array.prototype.slice.call(overlay.querySelectorAll("button:not([disabled]), input:not([disabled])"))
        .filter(function (element) { return !element.hidden; });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-site-tour-open]")) return;
    event.preventDefault();
    tour.open();
    document.querySelector(".site-tools[open]")?.removeAttribute("open");
  });

  window.addEventListener("languagechange", function () {
    if (overlay) renderSlide();
  });

  var tour = window.RevistaDigital.siteTour || {};
  tour.afterLogo = afterLogo;
  tour.onRouteChange = onRouteChange;
  tour.open = function () {
    if (overlay) return false;
    storageSet(window.localStorage, DISABLED_KEY, "false");
    var route = currentRoute();
    var slide = route === "/" ? null : findRouteSlide(route);
    return showTour(slide ? overviewSlides.concat(slide) : overviewSlides, true);
  };
  window.RevistaDigital.siteTour = tour;
})();
