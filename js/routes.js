(function () {
  window.RevistaDigital = window.RevistaDigital || {};
  const routes = window.RevistaDigital.routes || {};
  const state = () => window.RevistaDigital.state;
  const getDestinationCatalog = () => window.RevistaDigital.hoteles?.getDestinationCatalog?.() || window.RevistaDigital.catalog?.byCountry || {};
  let activeHotelPortalMap = null;

  // Hoteles de Playa Paraíso que muestran el explorador de lugares del
  // complejo (actividades, reservas, fichas) en su ficha.
  const PLAYA_PARAISO_GUIDE_HOTELS = new Set([
    "iberostar-paraiso-del-mar",
    "iberostar-paraiso-beach",
    "iberostar-paraiso-maya",
    "iberostar-paraiso-lindo",
    "iberostar-paraiso-joia"
  ]);

  function slugify(value = "") {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "hotel";
  }

  function getProjectBasePath() {
    const baseHref = document.querySelector("base")?.href || window.location.href;
    return new URL(baseHref, window.location.href).pathname.replace(/\/+$/, "");
  }

  function href(path = "/") {
    const routePath = `/${String(path || "/").replace(/^\/+|\/+$/g, "")}`.replace(/^\/$/, "/");
    const projectBasePath = getProjectBasePath();
    return routePath === "/" ? `${projectBasePath}/` : `${projectBasePath}${routePath}`;
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function getAppRoute(pathname = window.location.pathname) {
    const projectBasePath = getProjectBasePath();
    if (projectBasePath && (pathname === projectBasePath || pathname.startsWith(`${projectBasePath}/`))) {
      pathname = pathname.slice(projectBasePath.length) || "/";
    }
    return pathname.replace(/\/index\.html$/i, "").replace(/\/+$/, "") || "/";
  }

  function syncBookRoute() {
    const page = state().pages?.[state().currentIndex ?? 0];
    let nextPath = "/";

    if (state().activeRestaurantMenuIndex !== null && state().activeRestaurantMenuIndex !== undefined) {
      const restaurantHotel = state().pages?.[state().activeRestaurantMenuIndex];
      if (restaurantHotel?.type === "hotel") {
        nextPath = `/restaurantes/${slugify(restaurantHotel.name)}`;
      }
    } else if (state().activeHotelDetail) {
      const countryKey = state().activeHotelDetail.countryKey;
      const hotel = state().hotelCountryMenus?.[countryKey]?.hotels?.[state().activeHotelDetail.hotelIndex];
      if (hotel) {
        nextPath = `/hoteles/${countryKey}/${slugify(hotel.name)}`;
      }
    } else if (page?.type === "country-menu") {
      nextPath = `/hoteles/${page.country}`;
    } else if (page?.type === "media360") {
      nextPath = "/360";
    } else if (page?.type === "videos") {
      nextPath = "/videos";
    }

    const projectBasePath = getProjectBasePath();
    const targetPath = nextPath === "/" ? `${projectBasePath}/` : `${projectBasePath}${nextPath}`;
    const currentPath = window.location.pathname || "/";
    if (currentPath !== targetPath) {
      window.history.pushState(
        {
          currentIndex: state().currentIndex,
          activeHotelDetail: state().activeHotelDetail,
          returnPageIndex: state().returnPageIndex,
          activeRestaurantMenuIndex: state().activeRestaurantMenuIndex
        },
        "",
        targetPath
      );
    }
  }

  function resolveInitialRoute() {
    const route = getAppRoute();
    const parts = route.split("/").filter(Boolean);

    if (parts[0] === "hoteles" && parts[1]) {
      return parts[1];
    }

    if (parts[0] === "restaurantes" && parts[1]) {
      return parts[1];
    }

    return "";
  }

  function getCurrentRoute() {
    return getAppRoute();
  }

  function refreshCurrentAppContext(pathname = window.location.pathname) {
    const target = resolveRouteTarget(pathname);
    const routeContext = target?.context || getRouteContext(pathname);

    window.RevistaDigital.appContext = {
      ...target,
      route: getAppRoute(pathname),
      countrySlug: routeContext.country || target.countrySlug || null,
      destinationSlug: routeContext.destination || target.destinationSlug || null,
      hotelSlug: routeContext.hotel || target.hotelSlug || null,
      kind: routeContext.kind || target.kind || "default"
    };

    document.body.dataset.countrySlug = routeContext.country || target.countrySlug || "";
    document.body.dataset.destinationSlug = routeContext.destination || target.destinationSlug || "";
    document.body.dataset.hotelSlug = routeContext.hotel || target.hotelSlug || "";
    document.body.dataset.routeKind = routeContext.kind || target.kind || "default";

    const routeLabels = {
      "/": "Inicio",
      "/workspace": "Workspace",
      "/360": "360°",
      "/videos": "Videos"
    };

    const currentLabel = routeLabels[getAppRoute(pathname)] ||
      (routeContext.country ? routeContext.country : "Destino");

    document.body.dataset.currentRouteLabel = currentLabel;
    document.body.dataset.currentRoute = getAppRoute(pathname);

    return window.RevistaDigital.appContext;
  }

  function getBreadcrumbs(pathname = window.location.pathname) {
    const target = resolveRouteTarget(pathname);
    const context = target.context || getRouteContext(pathname);
    const breadcrumbs = [];

    if (context.country) {
      breadcrumbs.push({
        label: context.country,
        route: `/${context.country}`
      });
    }

    if (context.destination) {
      breadcrumbs.push({
        label: context.destination,
        route: context.country ? `/${context.country}/${context.destination}` : `/${context.destination}`
      });
    }

    if (context.hotel) {
      breadcrumbs.push({
        label: context.hotel,
        route: context.country && context.destination ? `/${context.country}/${context.destination}/${context.hotel}` : `/${context.hotel}`
      });
    }

    if (!breadcrumbs.length) {
      breadcrumbs.push({ label: "Inicio", route: "/" });
    }

    return breadcrumbs;
  }

  function computeTopNavState(pathname = window.location.pathname) {
    const breadcrumbs = getBreadcrumbs(pathname);
    const current = breadcrumbs[breadcrumbs.length - 1] || { label: "Inicio", route: "/" };
    const previous = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null;

    return {
      current,
      previous,
      breadcrumbs,
      label: current.label,
      route: current.route,
      hasPrevious: Boolean(previous)
    };
  }

  /* Componente compartido de navegación de las páginas del portal (#appView).
     getPortalNavModel calcula, de forma centralizada y a partir de la ruta, el
     destino de regreso (explícito, nunca history.back). portalNav pinta un único
     botón de regreso; las migas de pan duplicadas se retiraron a propósito. */
  function getPortalNavModel(route = getAppRoute()) {
    const home = { label: "Inicio", route: "/" };

    if (!route || route === "/") return { back: null, trail: [] };

    if (route === "/complejo-playa-paraiso") {
      return {
        back: { label: "Volver a destinos", route: "/" },
        trail: [home, { label: "El Complejo" }]
      };
    }

    if (route === "/carrito-golf") {
      const cartReturnRoute = window.history.state?.cartReturnRoute;
      const returnParts = typeof cartReturnRoute === "string"
        ? cartReturnRoute.split("/").filter(Boolean)
        : [];
      const catalog = getDestinationCatalog() || {};
      const destination = catalog.mexico?.destinations?.find((item) => item.slug === "riviera-maya");
      const hotel = returnParts.length === 3 && returnParts[0] === "mexico" && returnParts[1] === "riviera-maya"
        ? destination?.hotels?.find((item) => item.slug === returnParts[2] && PLAYA_PARAISO_GUIDE_HOTELS.has(item.slug))
        : null;
      if (hotel) {
        return {
          back: { label: `Volver a ${hotel.name}`, route: `/mexico/riviera-maya/${hotel.slug}` },
          trail: [{ label: "México", route: "/mexico" }, { label: "Riviera Maya", route: "/mexico/riviera-maya" }, { label: hotel.name }]
        };
      }
      return {
        back: { label: "Volver a Riviera Maya", route: "/mexico/riviera-maya" },
        trail: [{ label: "México", route: "/mexico" }, { label: "Riviera Maya" }]
      };
    }

    const parts = route.split("/").filter(Boolean);

    if (parts[0] === "restaurantes") {
      const api = window.RevistaDigital.restaurantes;
      const restaurantes = { label: "Restaurantes", route: "/restaurantes" };
      if (parts.length >= 2 && typeof api?.getRestaurantHotel === "function") {
        const hotelMatch = api.getRestaurantHotel(parts[1]);
        if (hotelMatch) {
          const countryRoute = `/restaurantes/${hotelMatch.country.slug}`;
          return {
            back: { label: `Volver a restaurantes de ${hotelMatch.country.name}`, route: countryRoute },
            trail: [
              restaurantes,
              { label: hotelMatch.country.name, route: countryRoute },
              { label: hotelMatch.hotel.name }
            ]
          };
        }
      }
      if (parts.length >= 2 && typeof api?.getCountryDirectory === "function") {
        const country = api.getCountryDirectory(parts[1]);
        if (country) {
          return {
            back: { label: "Volver a restaurantes", route: "/restaurantes" },
            trail: [restaurantes, { label: country.name }]
          };
        }
      }
      return {
        back: { label: "Volver al inicio", route: "/" },
        trail: [home, restaurantes]
      };
    }

    const catalog = getDestinationCatalog() || {};
    const countryData = catalog[parts[0]];
    if (!countryData) {
      const sectionLabels = {
        "/360": "Contenido 360°",
        "/videos": "Videos",
        "/workspace": "Workspace",
        "/mapa-hoteles": "Mapa general de hoteles"
      };
      if (sectionLabels[route]) {
        return {
          back: { label: "Volver al inicio", route: "/" },
          trail: [home, { label: sectionLabels[route] }]
        };
      }
      return { back: null, trail: [] };
    }
    const countryRoute = `/${parts[0]}`;
    const countryCrumb = { label: countryData.name, route: countryRoute };

    if (parts.length === 1) {
      return {
        back: { label: "Volver a destinos", route: "/" },
        trail: [home, { label: countryData.name }]
      };
    }

    const destination = (countryData.destinations || []).find((item) => item.slug === parts[1]);
    if (parts.length === 2) {
      return {
        back: { label: `Volver a ${countryData.name}`, route: countryRoute },
        trail: destination ? [countryCrumb, { label: destination.name }] : [home, countryCrumb]
      };
    }

    const hotel = destination
      ? (destination.hotels || []).find((item) => item.slug === parts[2] || slugify(item.name) === parts[2])
      : null;
    const destinationRoute = destination ? `${countryRoute}/${destination.slug}` : countryRoute;
    return {
      back: {
        label: `Volver a ${destination ? destination.name : countryData.name}`,
        route: destination ? `${countryRoute}/${destination.slug}` : countryRoute
      },
      trail: [
        { label: countryData.name, route: countryRoute },
        { label: destination ? destination.name : parts[1], route: destinationRoute },
        { label: hotel ? hotel.name : parts[2] }
      ]
    };
  }

  function portalNav(model) {
    const back = model && model.back;
    if (!back || !back.route) return "";
    return `<div class="portal-nav"><a class="portal-nav-back" href="${href(back.route)}" data-app-route="${back.route}"><span class="portal-nav-back-icon" aria-hidden="true">←</span><span class="portal-nav-back-label">${escapeHtml(back.label)}</span></a></div>`;
  }

  function resolveRouteTarget(pathname = window.location.pathname) {
    const context = getRouteContext(pathname);
    const routeIndex = window.RevistaDigital?.routeIndex || window.RevistaDigital?.hoteles?.getRouteIndex?.() || [];
    const match = routeIndex.find((entry) => {
      if (context.country && entry.type === "country" && entry.slug === context.country) return true;
      if (context.country && context.destination && entry.type === "destination" && entry.countrySlug === context.country && entry.slug === context.destination) return true;
      if (context.country && context.destination && context.hotel && entry.type === "hotel" && entry.countrySlug === context.country && entry.destinationSlug === context.destination && entry.slug === context.hotel) return true;
      return false;
    });

    return {
      route: getAppRoute(pathname),
      context,
      match: match || null,
      countrySlug: context.country || match?.countrySlug || null,
      destinationSlug: context.destination || match?.destinationSlug || null,
      hotelSlug: context.hotel || match?.slug || null,
      kind: context.kind
    };
  }

  function getRouteContext(pathname = window.location.pathname) {
    const route = getAppRoute(pathname);
    const parts = route.split("/").filter(Boolean);
    const context = {
      route,
      kind: "default",
      country: null,
      destination: null,
      hotel: null,
      segments: parts
    };

    const directCountryKeys = Object.keys(getDestinationCatalog() || {});
    const directCountryMatch = parts[0] && directCountryKeys.includes(parts[0]);

    if (parts[0] === "hoteles") {
      context.kind = "legacy-country";
      if (parts[1]) context.country = parts[1];
      if (parts[2]) context.destination = parts[2];
      if (parts[3]) context.hotel = parts[3];
      return context;
    }

    if (parts[0] === "restaurantes") {
      context.kind = "restaurant";
      if (parts[1]) context.hotel = parts[1];
      return context;
    }

    if (directCountryMatch) {
      context.kind = "country";
      context.country = parts[0];
      if (parts[1]) context.destination = parts[1];
      if (parts[2]) context.hotel = parts[2];
      return context;
    }

    if (parts[0] && ["360", "videos", "complejo-playa-paraiso"].includes(parts[0])) {
      context.kind = "section";
      context.destination = parts[0];
      return context;
    }

    if (parts.length >= 2 && parts[0] && !parts[2]) {
      const countrySlug = parts[0];
      if (directCountryKeys.includes(countrySlug)) {
        context.kind = "destination";
        context.country = countrySlug;
        context.destination = parts[1];
      }
    }

    return context;
  }

  function renderCards(records, getPath, type) {
    var eyebrow = type === "hotel" ? "HOTEL" : type === "country" ? "PAÍS" : "DESTINO";
    var cta = type === "hotel" ? "Explorar →" : type === "country" ? "Ver destinos →" : "Explorar →";
    return records.map((item) => `<a class="destination-card ${type}" href="${escapeHtml(href(getPath(item)))}" data-app-route="${escapeHtml(getPath(item))}">
      ${RI.img(item.image || "src/JOIA2.jpg", { alt: "", sizes: "(max-width:600px) 92vw, (max-width:850px) 46vw, 40vw" })}<span class="destination-card-copy"><small>${eyebrow}</small><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.description || item.tagline || "Descubra el hotel y sus experiencias.")}</span><b>${cta}</b></span></a>`).join("");
  }
  function findHotelPortalRoute(hotelName) {
    const targetSlug = slugify(hotelName);
    const catalog = getDestinationCatalog();
    for (const [countrySlug, country] of Object.entries(catalog || {})) {
      for (const destination of country.destinations || []) {
        const hotel = (destination.hotels || []).find((item) => item.slug === targetSlug || slugify(item.name) === targetSlug);
        if (hotel) return `/${countrySlug}/${destination.slug}/${hotel.slug}`;
      }
    }
    return null;
  }

  function portalHotelPoints(hotels) {
    return (hotels || [])
      .map((hotel) => ({ name: hotel.name, slug: hotel.slug, coordinates: state()?.hotelCoordinates?.[hotel.name] }))
      .filter((item) => Array.isArray(item.coordinates));
  }

  function portalRegionBounds(L, hotels) {
    const points = portalHotelPoints(hotels).map((item) => item.coordinates);
    if (!points.length) return null;
    let bounds = L.latLngBounds(points);
    const degenerate = Math.abs(bounds.getNorth() - bounds.getSouth()) < 1e-9 &&
      Math.abs(bounds.getEast() - bounds.getWest()) < 1e-9;
    if (degenerate) {
      const [lat, lng] = points[0];
      bounds = L.latLngBounds([lat - 0.15, lng - 0.15], [lat + 0.15, lng + 0.15]);
    }
    return bounds.pad(0.2);
  }

  // Encuadre visual SOLO para el mapa del complejo: abarca los hoteles y los
  // POIs verificados del complejo (áreas comunes, playa). No participa en la
  // decisión del perfil de ruta (eso vive en mapas.isComplexDestination).
  function portalComplexViewBounds(L, hotelPoints, poiLayer) {
    const points = (hotelPoints || []).map((item) => item.coordinates).filter((coords) => Array.isArray(coords));
    if (!points.length) return null;
    const bounds = L.latLngBounds(points);
    try {
      const poiBounds = poiLayer && typeof poiLayer.getBounds === "function" ? poiLayer.getBounds() : null;
      if (poiBounds && typeof poiBounds.isValid === "function" && poiBounds.isValid()) bounds.extend(poiBounds);
    } catch (e) { /* ignore */ }
    return bounds.pad(0.05);
  }

  function portalMapActions(hotels = [], fallback = null) {
    const points = portalHotelPoints(hotels);
    const targets = points.length
      ? points
      : (Array.isArray(fallback?.coordinates) && fallback.coordinates.length === 2
        ? [{ name: fallback.name || "", coordinates: fallback.coordinates }]
        : []);
    const directions = targets.length
      ? `<button type="button" class="portal-map-btn portal-directions" data-directions-hotels="${escapeHtml(JSON.stringify(targets.map((item) => [item.name, item.coordinates[0], item.coordinates[1]])))}">Cómo llegar</button>`
      : "";
    return `<div class="portal-map-actions">
        <button type="button" class="portal-map-btn portal-locate">📍 Ubicarme</button>
        ${directions}
      </div>`;
  }

  function getCartHotels() {
    const catalog = getDestinationCatalog() || {};
    const hotels = [];
    Object.entries(catalog).forEach(([countrySlug, country]) => {
      (country.destinations || []).forEach((destination) => {
        (destination.hotels || []).forEach((hotel) => {
          if (!PLAYA_PARAISO_GUIDE_HOTELS.has(hotel.slug)) return;
          const coordinates = state()?.hotelCoordinates?.[hotel.name];
          if (!Array.isArray(coordinates) || coordinates.length !== 2) return;
          hotels.push({
            slug: hotel.slug,
            name: hotel.name,
            coordinates,
            countrySlug,
            destinationSlug: destination.slug
          });
        });
      });
    });
    return hotels;
  }

  function getPreferredCartHotel(hotels) {
    const cartReturnRoute = window.history.state?.cartReturnRoute;
    const returnParts = typeof cartReturnRoute === "string"
      ? cartReturnRoute.split("/").filter(Boolean)
      : [];
    if (returnParts.length === 3 && returnParts[0] === "mexico" && returnParts[1] === "riviera-maya") {
      const returnHotel = hotels.find((hotel) => hotel.slug === returnParts[2]);
      if (returnHotel) return returnHotel;
    }
    let slug = "";
    try { slug = sessionStorage.getItem("clubCartHotel") || ""; } catch (error) { slug = ""; }
    return hotels.find((hotel) => hotel.slug === slug) || hotels[0];
  }

  function renderCartPortal(route, view) {
    const hotels = getCartHotels();
    if (!hotels.length) return false;
    const selected = getPreferredCartHotel(hotels);
    try { sessionStorage.setItem("clubCartHotel", selected.slug); } catch (error) { /* ignore */ }
    const options = hotels.map((hotel) => `<option value="${escapeHtml(hotel.slug)}"${hotel.slug === selected.slug ? " selected" : ""}>${escapeHtml(hotel.name)}</option>`).join("");
    document.body.dataset.appMode = "portal";
    document.body.dataset.routeManaged = "true";
    view.innerHTML = `<main class="portal-page cart-page">
      ${portalNav(getPortalNavModel(route))}
      <section class="portal-destination-hero cart-page-hero">
        ${RI.img("src/paraiso-del-mar/banner/ParaisoDelMar.jpg", {
          alt: "",
          priority: true,
          sizes: "(max-width:600px) 100vw, 45vw"
        })}
        <div>
          <p class="portal-kicker">MOVILIDAD · THE CLUB</p>
          <h1>Carrito de golf</h1>
          <p>Solicite un carrito, siga cómo llega hasta su ubicación exacta y le lleva al destino que elija.</p>
          <div class="cart-page-location">
            <span class="cart-location-status" data-cart-location-status>Active su ubicación para mostrar exactamente dónde está.</span>
            <button type="button" class="cart-locate-btn" data-cart-locate>Usar mi ubicación</button>
          </div>
        </div>
      </section>
      <section class="hotel-portal-section hotel-cart-section cart-page-section" id="hotel-carrito">
        <div class="cart-page-toolbar">
          <label class="cart-page-hotel-field">
            <span>Hotel del complejo</span>
            <select data-cart-hotel-select>${options}</select>
          </label>
          <p class="cart-page-hotel-note">El carrito sale desde su posiciÃ³n actual, le recoge donde estÃ¡ y le lleva a su destino.</p>
          <button type="button" class="cart-back-to-trip" data-cart-back-to-trip>Volver al viaje</button>
        </div>
        <div class="hotel-cart-tracker" data-cart-tracker>
          <div class="hotel-cart-panel">
            <div class="hotel-cart-status" data-cart-status></div>
            <form class="hotel-cart-form" data-cart-form>
              <p class="hotel-cart-form-note">El carrito le recoge en su ubicación y le lleva al destino que elija.</p>
              <div class="hotel-cart-row">
                <label class="hotel-cart-field"><span>Nombre</span>
                  <input type="text" name="nombre" autocomplete="name" placeholder="Su nombre" />
                </label>
                <label class="hotel-cart-field"><span>Habitación</span>
                  <input type="text" name="habitacion" inputmode="numeric" placeholder="Ej. 1204" />
                </label>
              </div>
              <label class="hotel-cart-field"><span>Destino</span>
                <select name="destino" data-cart-destination></select>
              </label>
              <label class="hotel-cart-field"><span>Notas</span>
                <textarea name="notas" rows="2" placeholder="Personas, equipaje o referencia del punto"></textarea>
              </label>
              <button type="submit" class="hotel-cart-submit">Solicitar carrito</button>
              <p class="hotel-cart-form-note">Servicio simulado: verá cómo el carrito le recoge y le lleva a su destino.</p>
            </form>
            <div class="hotel-cart-nearby" data-cart-nearby></div>
          </div>
          <div class="hotel-cart-map-wrap">
            <div id="cartTrackingMap" class="hotel-cart-map" role="application" aria-label="Mapa de seguimiento del carrito de golf"></div>
            <button type="button" class="cart-map-exit" data-cart-map-exit hidden>Salir del mapa</button>
            <div class="hotel-cart-eta" data-cart-eta hidden></div>
          </div>
        </div>
      </section>
    </main>`;

    const select = view.querySelector("[data-cart-hotel-select]");
    const cart = window.RevistaDigital.carritoGolf;
    const initCart = (hotel) => {
      if (cart && typeof cart.init === "function") {
        try {
          cart.init(view, hotel);
        } catch (error) {
          console.warn("No se pudo iniciar el seguimiento del carrito de golf.", error);
        }
      }
    };
    initCart(selected);
    if (select) {
      select.addEventListener("change", () => {
        const hotel = hotels.find((item) => item.slug === select.value) || hotels[0];
        try { sessionStorage.setItem("clubCartHotel", hotel.slug); } catch (error) { /* ignore */ }
        initCart(hotel);
      });
    }
    return true;
  }

  function renderPortal(route) {
    const view = document.getElementById("appView");
    if (!view) return false;
    if (route === "/carrito-golf" && renderCartPortal(route, view)) return true;
    const catalog = getDestinationCatalog();
    if (route === "/complejo-playa-paraiso") {
      const complexEntry = Object.entries(catalog || {})
        .flatMap(([countrySlug, country]) => (country.destinations || []).map((destination) => ({ countrySlug, country, destination })))
        .find((entry) => entry.destination.complex);
      if (complexEntry) {
        const { countrySlug, destination } = complexEntry;
        const complexHotels = (destination.hotels || []).filter((hotel) => hotel.complex !== false);
        const complexPage = (state()?.pages || []).find((page) => page?.type === "complex") || {};
        document.body.dataset.appMode = "portal";
        document.body.dataset.routeManaged = "true";
        const complexCards = renderCards(complexHotels, (hotel) => `/${countrySlug}/${destination.slug}/${hotel.slug}`, "hotel");
        view.innerHTML = `<main class="portal-page">
          ${portalNav(getPortalNavModel(route))}
          <section class="portal-destination-hero portal-complex-hero">
            ${RI.img(destination.image || "src/paraiso-del-mar/banner/ParaisoDelMar.jpg", {
              alt: "",
              priority: true,
              sizes: "(max-width:600px) 100vw, 45vw"
            })}
            <div>
              <p class="portal-kicker">${escapeHtml(complexPage.kicker || `EL COMPLEJO · ${destination.name.toUpperCase()}`)}</p>
              <h1>${escapeHtml(complexPage.title || destination.name)}</h1>
              <p>${escapeHtml(complexPage.intro || destination.description || "")}</p>
            </div>
          </section>
          <section class="portal-map-section">
            <div>
              <p class="portal-kicker">UBICACIÓN</p>
              <h2>Mapa del complejo</h2>
              <p>Los hoteles de ${escapeHtml(destination.name)} en un solo mapa. Use “Ubicarme” para situarte y “Cómo llegar” para trazar la ruta.</p>
            </div>
            <div class="portal-map-frame">
              <div class="portal-destination-map portal-complex-map" id="complexPortalMap" role="application" aria-label="Mapa del complejo ${escapeHtml(destination.name)}"></div>
              <div class="hotel-complex-legend guide-legend" id="complexPortalLegend"></div>
              ${portalMapActions(complexHotels)}
            </div>
          </section>
          <section class="portal-section">
            <div class="portal-section-heading">
              <div>
                <p class="portal-kicker">NUESTROS HOTELES</p>
                <h2>Los complejos</h2>
              </div>
              <a href="${href(`/${countrySlug}/${destination.slug}`)}" data-app-route="/${countrySlug}/${destination.slug}">Ver ${escapeHtml(destination.name)}</a>
            </div>
            <div class="destination-grid portal-complex-grid">${complexCards}</div>
          </section>
        </main>`;
        const complexMap = view.querySelector("#complexPortalMap");
        const complexLegend = view.querySelector("#complexPortalLegend");
        window.RevistaDigital.guiapa?.renderCategoryLegend?.(complexLegend);
        if (complexMap) initComplexPortalMap(complexMap, countrySlug, destination);
        return true;
      }
    }
    if (route === "/restaurantes" || route.startsWith("/restaurantes/")) {
      if (renderRestaurantPortal(route, view)) return true;
    }

    const parts = route.split("/").filter(Boolean);
    const country = parts[0];
    const countryData = catalog[country];
    const isHome = !parts.length;
    if (isHome || (countryData && parts.length === 1)) {
      document.body.dataset.appMode = "portal";
      document.body.dataset.routeManaged = "true";
      const countryCards = Object.entries(catalog).map(([key, item]) => ({ name: item.name, image: item.image, description: `${item.destinations.length} destinos · ${(item.destinations || []).reduce((sum, destination) => sum + (destination.hotels ? destination.hotels.length : 0), 0)} hoteles para explorar.`, route: `/${key}`, destinations: item.destinations.length, hotels: (item.destinations || []).reduce((sum, destination) => sum + (destination.hotels ? destination.hotels.length : 0), 0) }));
      const totalDestinations = countryCards.reduce((sum, item) => sum + item.destinations, 0);
      const totalHotels = countryCards.reduce((sum, item) => sum + item.hotels, 0);
      let heading = "Encuentre su próximo destino";
      let intro = "Explore hoteles y destinos Iberostar. Elija un país para comenzar.";
      let cards = renderCards(countryCards, (item) => item.route, "country");
      let breadcrumb = "IBEROSTAR · DESTINOS";
      let countryMapMarkup = "";
      let countryHotels = [];
      if (!isHome) {
        heading = countryData.name; intro = `Descubra los destinos de ${countryData.name}.`;
        breadcrumb = `DESTINOS · ${countryData.name.toUpperCase()}`;
        cards = renderCards(countryData.destinations, (item) => `/${country}/${item.slug}`, "destination");
        countryHotels = countryData.destinations.flatMap((destination) => destination.hotels.map((hotel) => ({
          ...hotel,
          countrySlug: country,
          countryName: countryData.name,
          destinationSlug: destination.slug,
          destinationName: destination.name
        }))).filter((hotel) => Array.isArray(state()?.hotelCoordinates?.[hotel.name]));
        if (countryHotels.length) {
          countryMapMarkup = `<section class="portal-map-section"><div><p class="portal-kicker">UBICACIÓN</p><h2>Mapa de ${escapeHtml(countryData.name)}</h2><p>Explore los hoteles disponibles en los destinos de ${escapeHtml(countryData.name)}.</p></div><div class="portal-map-frame"><div class="portal-destination-map" id="countryMap" role="application" aria-label="Mapa de hoteles en ${escapeHtml(countryData.name)}"></div>${portalMapActions(countryHotels)}</div></section>`;
        }
      }
      view.innerHTML = `<main class="portal-page">${!isHome ? portalNav(getPortalNavModel(route)) : ""}<section class="portal-hero"><div><p class="portal-kicker">${breadcrumb}</p><h1>${heading}</h1><p>${intro}</p>${!isHome ? "" : `<a class="portal-hero-link" href="${href("/mexico/riviera-maya")}" data-app-route="/mexico/riviera-maya">Conozca Iberostar Playa Paraíso <span>→</span></a><div class="portal-hero-stats" aria-label="Resumen de destinos"><span><strong>${Object.keys(catalog).length}</strong> países</span><span><strong>${totalDestinations}</strong> destinos</span><span><strong>${totalHotels}</strong> hoteles</span></div>`}</div>${RI.img(isHome ? "src/paraiso-del-mar/banner/ParaisoDelMar.jpg" : countryData.image, {
          alt: "Paisaje de destino",
          priority: true,
          sizes: "(max-width:600px) 100vw, 45vw"
        })}</section>${countryMapMarkup}<section class="portal-section"><div class="portal-section-heading"><div><p class="portal-kicker">${isHome ? "NUESTROS PAÍSES" : "DESTINOS"}</p><h2>${isHome ? "Viaje a su manera" : "Elija dónde hospedarse"}</h2></div>${!isHome ? `<a href="${href("/")}" data-app-route="/">Todos los países</a>` : ""}</div>${isHome ? `<div class="portal-country-chips" aria-label="Acceso rápido a países">${countryCards.map((item) => `<a class="portal-country-chip" href="${escapeHtml(href(item.route))}" data-app-route="${escapeHtml(item.route)}">${escapeHtml(item.name)}<span>${item.destinations}</span></a>`).join("")}</div>` : ""}<div class="destination-grid portal-card-carousel">${cards}</div></section></main>`;
      const countryMap = view.querySelector("#countryMap");
      if (countryMap) {
        window.RevistaDigital.mapas?.initializeAllHotelsMap(countryMap, countryHotels, { countrySlug: country });
      }
      return true;
    }
    if (countryData && parts.length === 2) {
      const destination = countryData.destinations.find((item) => item.slug === parts[1]);
      if (!destination) return false;
      const hotels = destination.hotels;
      if (!hotels.length) return false;
      const hasDestinationMap = hotels.some((hotel) => Array.isArray(state()?.hotelCoordinates?.[hotel.name]))
        || Array.isArray(destination.mapCenter);
      document.body.dataset.appMode = "portal";
      document.body.dataset.routeManaged = "true";
      const mapDescription = destination.mapNotice || "Seleccione un marcador para abrir la ficha del hotel.";
      view.innerHTML = `<main class="portal-page">${portalNav(getPortalNavModel(route))}<section class="portal-destination-hero">${RI.img(destination.image, {
          alt: "",
          priority: true,
          sizes: "(max-width:600px) 100vw, 45vw"
        })}<div><p class="portal-kicker">${escapeHtml(countryData.name).toUpperCase()} · DESTINO</p><h1>${escapeHtml(destination.name)}</h1><p>${escapeHtml(destination.description)}</p>${destination.complex ? `<a class="portal-hero-link" href="${href("/mexico/riviera-maya")}" data-app-route="/mexico/riviera-maya">Ver el complejo Playa Paraíso →</a>` : ""}</div></section><section class="portal-section"><div class="portal-section-heading"><div><p class="portal-kicker">ALOJAMIENTOS</p><h2>Hoteles en ${escapeHtml(destination.name)}</h2></div></div><div class="destination-grid destination-grid--hotels portal-card-carousel">${renderCards(hotels, (hotel) => `/${country}/${destination.slug}/${hotel.slug}`, "hotel")}</div></section></main>`;
      const mapElement = view.querySelector("#destinationMap");
      if (mapElement) window.RevistaDigital.mapas?.initializeDestinationMap(mapElement, { countrySlug: country, destination });
      return true;
    }
    if (countryData && parts.length === 3) {
      const destination = countryData.destinations.find((item) => item.slug === parts[1]);
      if (!destination) return false;
      const hotel = destination.hotels.find((item) => item.slug === parts[2])
        || destination.hotels.find((item) => slugify(item.name) === parts[2]);
      if (!hotel) return false;
      document.body.dataset.appMode = "portal";
      document.body.dataset.routeManaged = "true";
      document.body.dataset.returnRoute = `/${country}/${destination.slug}`;
      view.innerHTML = renderHotelPortal({ countrySlug: country, countryData, destination, hotel });
      initHotelPortalMap(view, hotel, destination, countryData, country);
      const hotelGuideMount = view.querySelector("#guideExplorer");
      if (hotelGuideMount && window.RevistaDigital.guiapa && typeof window.RevistaDigital.guiapa.renderExplorer === "function") {
        window.RevistaDigital.guiapa.renderExplorer(hotelGuideMount, {
          panel: PLAYA_PARAISO_GUIDE_HOTELS.has(hotel.slug),
          legendMount: view.querySelector("#hotelGuideLegend")
        });
      }
      view.querySelectorAll(".pano-360-ficha").forEach((ficha) => {
        ficha.addEventListener("click", () => {
          if (!window.RevistaDigital.pannellum360?.open) return;
          window.RevistaDigital.pannellum360.open(
            ficha.dataset.hotel,
            ficha.dataset.zone,
            ficha.dataset.label
          );
        });
      });
      return true;
    }
    return false;
  }
  function restaurantHotelCardMarkup(hotel) {
    const chips = hotel.restaurants.slice(0, 4)
      .map(([name]) => `<span class="restaurant-chip">${escapeHtml(name)}</span>`).join("");
    const extra = hotel.restaurants.length > 4
      ? `<span class="restaurant-chip restaurant-chip-more">+${hotel.restaurants.length - 4}</span>` : "";
    const meta = hotel.restaurants.length
      ? `<div class="restaurant-chip-row">${chips}${extra}</div>`
      : `<span class="restaurant-count-note">Sin restaurantes registrados</span>`;
    return `<a class="destination-card restaurant-hotel-card" href="${href(hotel.route)}" data-app-route="${hotel.route}">
      ${RI.img(hotel.image, { alt: "", sizes: "(max-width:600px) 92vw, (max-width:850px) 46vw, 40vw" })}
      <span class="destination-card-copy">
        <small>${escapeHtml(hotel.destinationName).toUpperCase()}</small>
        <strong>${escapeHtml(hotel.name)}</strong>
        ${meta}
        <b>Ver carta →</b>
      </span>
    </a>`;
  }

  function restaurantCountryGroupsMarkup(groups) {
    if (!groups.length) return `<p class="restaurant-count-note">Todavía no hay restaurantes registrados para este país.</p>`;
    return `<div class="restaurant-country-list">${groups.map((group) => `<article class="restaurant-group">
      <header class="restaurant-group-head">
        <div><small>${escapeHtml(group.destinationName).toUpperCase()}</small><a href="${href(group.hotelRoute)}" data-app-route="${group.hotelRoute}">${escapeHtml(group.hotelName)}</a></div>
        <span>${group.restaurants.length} ${group.restaurants.length === 1 ? "restaurante" : "restaurantes"}</span>
      </header>
      <ul class="restaurant-rows">${group.restaurants.map(([name, cuisine]) => `<li><a href="${href(group.hotelRoute)}" data-app-route="${group.hotelRoute}">${escapeHtml(name)}</a><em>${escapeHtml(cuisine || "Cocina de autor")}</em></li>`).join("")}</ul>
    </article>`).join("")}</div>`;
  }

  function renderRestaurantPortal(route, view) {
    const api = window.RevistaDigital.restaurantes;
    if (!api?.getDirectory) return false;
    const parts = route.split("/").filter(Boolean);
    if (parts[0] !== "restaurantes") return false;

    document.body.dataset.appMode = "portal";
    document.body.dataset.routeManaged = "true";

    if (parts.length === 1) {
      const countries = api.getDirectory();
      if (!countries.length) return false;
      const cards = countries.map((country) => {
        const hotelWord = country.hotels.length === 1 ? "hotel" : "hoteles";
        const restaurantWord = country.restaurantCount === 1 ? "restaurante" : "restaurantes";
        return `<a class="destination-card restaurant-country-card" href="${href(`/restaurantes/${country.slug}`)}" data-app-route="/restaurantes/${country.slug}">
        ${RI.img(country.image, { alt: "", sizes: "(max-width:600px) 92vw, (max-width:850px) 46vw, 40vw" })}
        <span class="destination-card-copy"><small>RESTAURANTES</small><strong>${escapeHtml(country.name)}</strong><span>${country.hotels.length} ${hotelWord} · ${country.restaurantCount} ${restaurantWord}</span><b>Ver carta →</b></span>
      </a>`;
      }).join("");
      view.innerHTML = `<main class="portal-page">
        ${portalNav(getPortalNavModel(route))}
        <section class="portal-hero">
          <div><p class="portal-kicker">RESTAURANTES</p><h1>Sabores de nuestros destinos</h1><p>Elija un país para descubrir la carta de restaurantes de cada hotel.</p></div>
          ${RI.img("src/paraiso-del-mar/banner/ParaisoDelMar.jpg", {
            alt: "",
            priority: true,
            sizes: "(max-width:600px) 100vw, 45vw"
          })}
        </section>
        <section class="portal-section">
          <div class="portal-section-heading"><div><p class="portal-kicker">NUESTROS PAÍSES</p><h2>Cartas por país</h2></div></div>
          <div class="destination-grid">${cards}</div>
        </section>
      </main>`;
      return true;
    }

    if (parts.length === 2 && typeof api.getRestaurantHotel === "function") {
      const hotelMatch = api.getRestaurantHotel(parts[1]);
      if (hotelMatch) {
        const countryRoute = `/restaurantes/${hotelMatch.country.slug}`;
        document.body.dataset.returnRoute = countryRoute;
        view.innerHTML = restaurantFichePageMarkup({
          country: hotelMatch.country,
          hotel: hotelMatch.hotel,
          breadcrumbCountryRoute: countryRoute
        });
        wirePanoFiches(view);
        return true;
      }
    }

    const country = api.getCountryDirectory(parts[1]);
    if (!country) return false;
    const groups = api.getCountryRestaurantGroups(country.slug);

    if (parts.length === 2) {
      document.body.dataset.returnRoute = "/restaurantes";
      const hotelWord = country.hotels.length === 1 ? "hotel" : "hoteles";
      const restaurantWord = country.restaurantCount === 1 ? "restaurante" : "restaurantes";
      view.innerHTML = `<main class="portal-page">
        ${portalNav(getPortalNavModel(route))}
        <section class="portal-destination-hero">
          ${RI.img(country.image, {
            alt: "",
            priority: true,
            sizes: "(max-width:600px) 100vw, 45vw"
          })}
          <div><p class="portal-kicker">GASTRONOMÍA · ${escapeHtml(country.name).toUpperCase()}</p><h1>Restaurantes en ${escapeHtml(country.name)}</h1><p>${country.hotels.length} ${hotelWord} y ${country.restaurantCount} ${restaurantWord}. Elija un hotel para ver su carta.</p></div>
        </section>
        <section class="portal-section">
          <div class="portal-section-heading"><div><p class="portal-kicker">HOTELES Y SUS RESTAURANTES</p><h2>Elija un hotel</h2></div></div>
          <div class="destination-grid">${country.hotels.map(restaurantHotelCardMarkup).join("")}</div>
        </section>
        <section class="portal-section">
          <div class="portal-section-heading"><div><p class="portal-kicker">TODAS LAS CARTAS</p><h2>Todos los restaurantes de ${escapeHtml(country.name)}</h2></div></div>
          ${restaurantCountryGroupsMarkup(groups)}
        </section>
      </main>`;
      return true;
    }

    if (parts.length === 3) {
      const hotel = country.hotels.find((item) => item.slug === parts[2]);
      if (!hotel) return false;
      document.body.dataset.returnRoute = `/restaurantes/${country.slug}`;
      view.innerHTML = restaurantFichePageMarkup({
        country,
        hotel,
        breadcrumbCountryRoute: `/restaurantes/${country.slug}`
      });
      wirePanoFiches(view);
      return true;
    }
    return false;
  }

  /* Página de fichas visuales de un hotel dentro del apartado /restaurantes.
     Reutiliza renderRestaurantFiches: imagen y recorrido 360° solo si existen. */
  function restaurantFichePageMarkup({ country, hotel, breadcrumbCountryRoute }) {
    const api = window.RevistaDigital.restaurantes;
    const count = Array.isArray(hotel.restaurants) ? hotel.restaurants.length : 0;
    const countWord = count === 1 ? "restaurante" : "restaurantes";
    const fiches = api.renderRestaurantFiches(hotel.name, {
      hotelLabel: hotel.name,
      countryLabel: country.name
    });
    const heroImage = hotel.image || "src/paraiso-del-mar/banner/ParaisoDelMar.jpg";
    return `<main class="portal-page">
      ${portalNav(getPortalNavModel(`/restaurantes/${hotel.slug}`))}
      <section class="portal-destination-hero">
        ${RI.img(heroImage, {
          alt: "",
          priority: true,
          sizes: "(max-width:600px) 100vw, 45vw"
        })}
        <div><p class="portal-kicker">${escapeHtml(country.name).toUpperCase()} · ${escapeHtml(hotel.destinationName).toUpperCase()}</p><h1>${escapeHtml(hotel.name)}</h1><p>${count} ${countWord} para descubrir durante su estancia.</p><a class="portal-hero-link" href="${href(hotel.hotelRoute)}" data-app-route="${hotel.hotelRoute}">Ver la ficha del hotel →</a></div>
      </section>
      <section class="portal-section">
        <div class="portal-section-heading"><div><p class="portal-kicker">LA CARTA</p><h2>Restaurantes de ${escapeHtml(hotel.name)}</h2></div><span class="restaurant-count-note">${count} ${count === 1 ? "opción" : "opciones"}</span></div>
        ${fiches || `<p class="restaurant-count-note">Sin cartas registradas para este hotel.</p>`}
      </section>
      <section class="portal-section">
        <div class="portal-section-heading"><div><p class="portal-kicker">MÁS CARTAS</p><h2>Más restaurantes de ${escapeHtml(country.name)}</h2></div></div>
        <p class="restaurant-count-note"><a href="${href(breadcrumbCountryRoute)}" data-app-route="${breadcrumbCountryRoute}">Ver todos los restaurantes de ${escapeHtml(country.name)} →</a></p>
      </section>
    </main>`;
  }

  function wirePanoFiches(root) {
    root.querySelectorAll(".pano-360-ficha[data-hotel]").forEach((ficha) => {
      ficha.addEventListener("click", () => {
        if (!window.RevistaDigital.pannellum360) return;
        const hotel = ficha.dataset.hotel;
        const zone = ficha.dataset.zone;
        const label = ficha.dataset.label;
        if (!hotel || !zone || !label) return;
        const pannellum = window.RevistaDigital.pannellum360;
        const isRestaurantFiche = ficha.classList.contains("pano-360-ficha-restaurante");
        if (!isRestaurantFiche && typeof pannellum.openZoneMenu === "function") {
          const options = pannellum.getZoneMenuOptions?.(hotel, zone) || [];
          if (options.length > 1) {
            pannellum.openZoneMenu(hotel, zone, label);
            return;
          }
        }
        if (typeof pannellum.open === "function") {
          pannellum.open(hotel, zone, label);
        }
      });
    });
  }
  function hotelImageCard(alt, src) {
    return `<figure class="hotel-portal-card">${RI.img(src, {
      alt: alt,
      sizes: "(max-width:640px) 92vw, (max-width:1050px) 46vw, 32vw"
    })}</figure>`;
  }
  function renderHotelPortal(context) {
    const { countrySlug, countryData, destination, hotel } = context;
    const stateData = state() || {};
    const page = hotel.pageIndex != null && Array.isArray(stateData.pages)
      ? stateData.pages[hotel.pageIndex]
      : null;
    const media = stateData.hotelMediaCatalog?.[hotel.name] || {};
    const content = window.RevistaDigital.hotelContent?.[hotel.name] || null;
    const officialGalleries = window.RevistaDigital.officialHotelGalleries || {};
    const stemOf = (image) => (image || "").match(/^src\/official-hotels\/([^/]+)\.jpg$/)?.[1] || null;
    const menuHotel = (stateData.hotelCountryMenus ? Object.values(stateData.hotelCountryMenus) : [])
      .flatMap((country) => country?.hotels || [])
      .find((item) => item.name === hotel.name) || null;
    const official = [
      hotel.slug,
      hotel.slug?.startsWith("iberostar-") ? hotel.slug.slice("iberostar-".length) : null,
      stemOf(hotel.image),
      stemOf(menuHotel?.image),
      stemOf(content?.image)
    ].filter(Boolean).map((stem) => officialGalleries[stem]).find((gallery) => gallery) || null;
    const coordinates = stateData.hotelCoordinates?.[hotel.name];
    const hasCoordinates = Array.isArray(coordinates);

    const heroImage = hotel.image || content?.image || destination.image || countryData.image || "src/paraiso-del-mar/banner/ParaisoDelMar.jpg";
    const displayName = hotel.name;
    const intro = hotel.description || page?.intro || content?.description || destination.description || "";
    const tagline = hotel.tagline || content?.tagline || "";
    const plainIntro = intro.replace(/\s+/g, " ").trim();
    const firstSentence = (plainIntro.match(/^.*?[.!?](?=\s|$)/) || [plainIntro])[0];
    const teaser = tagline || firstSentence;
    const locationLine = `${destination.name}, ${countryData.name}`;
    const fullAddress = page?.location || locationLine;
    const destinationRoute = `/${countrySlug}/${destination.slug}`;
    const hotelRoute = `${destinationRoute}/${hotel.slug}`;

    const pools = (media.piscinas?.length ? media.piscinas : (official?.piscinas || []));
    const dining = (media.restaurante?.length ? media.restaurante : (official?.restaurante || []));
    const experiences = official?.experiencias || [];
    const bannerImages = Array.isArray(media.banner) && media.banner.length ? media.banner : [];
    const services = (content?.tabs?.servicios?.keyPoints?.length
      ? content.tabs.servicios.keyPoints
      : (Array.isArray(page?.benefits) ? page.benefits : []));
    const restaurantMarkup = "";
    const hasDiningSection = false;

    // El orden de los enlaces sigue el orden de las secciones en la página.
    const hasComplexGuide = PLAYA_PARAISO_GUIDE_HOTELS.has(hotel.slug);
    const navItems = [];
    if (hasCoordinates) navItems.push(["ubicacion", hasComplexGuide ? "Mapa del complejo" : "Ubicación"]);
    if (hasComplexGuide) navItems.push(["guia", "Lugares del complejo"]);
    if (hasComplexGuide) navItems.push(["transporte", "Transporte"]);
    if (services.length) navItems.push(["servicios", "Servicios"]);

    const heroMarkup = `
        <section class="hotel-portal-hero">
          ${RI.img(heroImage, {
            cls: "hotel-portal-hero-bg",
            alt: displayName,
            priority: true,
            sizes: "100vw"
          })}
          <div class="hotel-portal-hero-scrim"></div>
          <div class="hotel-portal-hero-content">
            <p class="portal-kicker">${escapeHtml(countryData.name).toUpperCase()} · ${escapeHtml(destination.name).toUpperCase()}</p>
            <h1>${escapeHtml(displayName)}</h1>
            <p class="hotel-portal-hero-location">${escapeHtml(locationLine)}</p>
            ${teaser ? `<p class="hotel-portal-hero-desc">${escapeHtml(teaser)}</p>` : ""}
            <a class="hotel-portal-hero-cta" href="${href(hotelRoute)}#hotel-ubicacion">Descubrir el hotel ↓</a>
          </div>
        </section>`;

    const servicesMarkup = services.length ? `
        <section class="hotel-portal-section" id="hotel-servicios">
          <div class="hotel-portal-section-head">
            <p class="portal-kicker">SERVICIOS</p>
            <h2>Servicios y comodidades</h2>
            <p>Lo que le espera durante su estancia.</p>
          </div>
          <ul class="hotel-portal-services">${services.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>` : "";

    const zoneCandidates = [
      { label: "Piscina", images: pools },
      { label: "Restaurante", images: dining },
      { label: "Experiencias", images: experiences },
      { label: "Exterior", images: bannerImages }
    ];
    const zones = zoneCandidates
      .filter((zone) => Array.isArray(zone.images) && zone.images.length)
      .map((zone) => ({ label: zone.label, image: zone.images[0] }));
    const zoneButtons = zones.map((zone, index) => `<button type="button" class="hotel-zone${index === 0 ? " is-active" : ""}" data-zone="${escapeHtml(zone.label)}" data-hotel="${escapeHtml(displayName)}" data-lat="${hasCoordinates ? coordinates[0] : ""}" data-lng="${hasCoordinates ? coordinates[1] : ""}">
              ${RI.img(zone.image, {
                alt: zone.label,
                sizes: "(max-width:599px) 45vw, (max-width:899px) 30vw, 22vw"
              })}
              <span>${escapeHtml(zone.label)}</span>
            </button>`).join("");

    const zonePanelMarkup = `
            <aside class="hotel-zone-panel${hasComplexGuide ? " hotel-zone-panel--wide" : ""}" aria-label="Zonas del hotel">
              <p class="portal-kicker">EXPLORE EL HOTEL</p>
              <p class="hotel-zone-hint">Toque una imagen para ver de qué parte del hotel es y trazar cómo llegar.</p>
              ${zoneButtons ? `<div class="hotel-zone-strip">${zoneButtons}</div>` : ""}
              <div class="hotel-zone-status" data-zone-status>
                <span>Está viendo: <strong data-zone-name>${escapeHtml(zones[0]?.label || "el hotel")}</strong></span>
                <button type="button" class="portal-map-btn portal-directions" data-directions="${escapeHtml(displayName)}" data-lat="${coordinates[0]}" data-lng="${coordinates[1]}">Cómo llegar</button>
              </div>
            </aside>`;
    const restaurantRouteMarkup = `
            <aside class="hotel-zone-panel hotel-zone-panel--wide hotel-restaurant-route" aria-label="Ruta a restaurantes">
              <p class="portal-kicker">RESTAURANTES</p>
              <p class="hotel-zone-hint">Consulte los restaurantes de ${escapeHtml(displayName)} y descubra sus experiencias.</p>
              <a class="portal-map-btn" href="${href(`/restaurantes/${hotel.slug}`)}" data-app-route="/restaurantes/${escapeHtml(hotel.slug)}">Ver restaurantes</a>
            </aside>`;
    const hotelExploreMarkup = hasComplexGuide ? restaurantRouteMarkup : zonePanelMarkup;
    const transportMarkup = hasComplexGuide ? `
        <section class="hotel-portal-section hotel-transport-section" id="hotel-transporte">
          <div class="hotel-transport-card">
            <div class="hotel-transport-copy">
              <p class="portal-kicker">TRANSPORTE</p>
              <h2>¿Desea llegar más rápido a su destino?</h2>
              <p>¡Solicite el transporte más cercano ahora!</p>
            </div>
            <a class="hotel-transport-cta" href="#" data-app-route="/carrito-golf">Solicitar transporte</a>
          </div>
        </section>` : "";

    const mapMarkup = hasCoordinates ? (hasComplexGuide ? `
        <section class="hotel-portal-section" id="hotel-ubicacion">
          <div class="hotel-portal-section-head">
            <p class="portal-kicker">UBICACIÓN</p>
            <h2>Mapa del complejo</h2>
            <p>${escapeHtml(fullAddress)}</p>
          </div>
          <div class="hotel-complex-stage" id="hotel-guia">
            <div class="hotel-complex-actions">${portalMapActions([hotel])}</div>
            <div class="hotel-complex-map-wrap" data-guide-wrap>
              <div id="hotelPortalMap" class="hotel-portal-map hotel-portal-map--complex" role="application" aria-label="Mapa de ${escapeHtml(displayName)}"></div>
              <button type="button" class="hotel-guide-open" data-guide-toggle aria-expanded="false" aria-controls="hotelGuidePanel">Mostrar guía</button>
              <aside class="hotel-guide-panel" id="hotelGuidePanel" data-guide-overlay aria-label="Lugares del complejo, rutas y reservas">
                <div class="hotel-guide-panel-head">
                  <p class="portal-kicker">GUÍA INTERACTIVA · THE CLUB</p>
                  <div class="hotel-guide-panel-actions">
                    <button type="button" class="hotel-guide-expand" data-guide-expand data-i18n="guideExpand" data-i18n-aria="guideExpand" aria-expanded="false" aria-controls="hotelGuidePanel">Ampliar</button>
                    <button type="button" class="hotel-guide-close" data-guide-toggle aria-expanded="true" aria-controls="hotelGuidePanel">Ocultar</button>
                  </div>
                </div>
                <div id="guideExplorer" class="guide-explorer-mount"></div>
              </aside>
            </div>
            <div class="hotel-complex-legend guide-legend" id="hotelGuideLegend"></div>
          </div>
          ${hotelExploreMarkup}
        </section>` : `
        <section class="hotel-portal-section" id="hotel-ubicacion">
          <div class="hotel-portal-section-head">
            <p class="portal-kicker">UBICACIÓN</p>
            <h2>Dónde estamos</h2>
            <p>${escapeHtml(fullAddress)}</p>
          </div>
          <div class="hotel-portal-location">
            <div class="hotel-portal-map-wrap">
              ${portalMapActions([hotel])}
              <div id="hotelPortalMap" class="hotel-portal-map" role="application" aria-label="Mapa de ${escapeHtml(displayName)}"></div>
            </div>
            ${zonePanelMarkup}
          </div>
        </section>`) : "";
    const guideMarkup = "";

    return `
      <main class="portal-page">
        ${portalNav(getPortalNavModel(hotelRoute))}

        ${heroMarkup}

        <nav class="hotel-portal-nav" aria-label="Secciones del hotel">
          ${navItems.map(([id, label]) => `<a href="${href(hotelRoute)}#hotel-${id}">${label}</a>`).join("")}
        </nav>

        ${mapMarkup}
        ${transportMarkup}
        ${guideMarkup}
        ${servicesMarkup}
      </main>
    `;
  }
  // Recalcula el tamaño del mapa cuando su contenedor cambia de tamaño o se
  // muestra (p. ej. al cambiar de vista), evitando mapas en blanco o descentrados.
  function trackMapResize(map, element) {
    if (!map || !element) return;
    const invalidate = () => { try { map.invalidateSize(); } catch (e) { /* ignore */ } };
    try {
      if (typeof ResizeObserver === "function") {
        if (element._gpResizeObserver) element._gpResizeObserver.disconnect();
        const observer = new ResizeObserver(invalidate);
        observer.observe(element);
        element._gpResizeObserver = observer;
      }
    } catch (e) { /* ignore observer errors */ }
    setTimeout(invalidate, 0);
  }

  // Zona del mapa que deja libre el panel de la guía. Se usa como relleno
  // asimétrico al encuadrar, para que el complejo quede a la vista y no
  // debajo del panel.
  function guidePanelLayout(L, element) {
    const panel = document.querySelector("[data-guide-overlay]");
    const mapRect = element?.getBoundingClientRect?.();
    if (!panel || !mapRect || !mapRect.width) return null;
    const panelRect = panel.getBoundingClientRect();
    const symmetric = {
      paddingTopLeft: L.point(16, 16),
      paddingBottomRight: L.point(16, 16)
    };
    if (panel.getAttribute("data-guide-collapsed") === "1") return symmetric;
    const overlaps = panelRect.left < mapRect.right - 4 && panelRect.right > mapRect.left + 4 &&
      panelRect.top < mapRect.bottom - 4 && panelRect.bottom > mapRect.top + 4;
    if (!overlaps) return symmetric;
    const margin = 30;
    const coversLeft = panelRect.left - mapRect.left < margin;
    const coversRight = mapRect.right - panelRect.right < margin;
    const coversBottom = mapRect.bottom - panelRect.bottom < margin;
    if (coversLeft && coversRight) {
      // Hoja inferior (móvil): se reserva el alto que ocupa.
      const height = Math.round(panelRect.height);
      return {
        paddingTopLeft: L.point(16, 16),
        paddingBottomRight: L.point(16, height + 16)
      };
    }
    // Panel lateral (escritorio): se reserva el ancho que ocupa.
    const width = Math.round(panelRect.width);
    if (coversLeft) {
      return {
        paddingTopLeft: L.point(width + 28, 16),
        paddingBottomRight: L.point(0, 16)
      };
    }
    if (coversRight) {
      return {
        paddingTopLeft: L.point(0, 16),
        paddingBottomRight: L.point(width + 28, 16)
      };
    }
    return symmetric;
  }

  function initHotelPortalMap(view, hotel, destination, countryData, countrySlug) {
    const element = view?.querySelector("#hotelPortalMap");
    const coordinates = state()?.hotelCoordinates?.[hotel.name];
    const mapas = window.RevistaDigital.mapas;
    if (!element || !Array.isArray(coordinates) || !mapas?.loadLeaflet) return;

    if (activeHotelPortalMap) {
      try { activeHotelPortalMap.remove(); } catch (error) { /* ignore */ }
      activeHotelPortalMap = null;
    }

    const build = typeof mapas.loadMarkerCluster === "function" ? mapas.loadMarkerCluster() : mapas.loadLeaflet();
    build.then((L) => {
      const map = L.map(element, {
        scrollWheelZoom: true,
        preferCanvas: true,
        zoomAnimation: false,
        rotate: true,
        bearing: 0,
        touchRotate: true,
        rotateControl: { closeOnZeroBearing: false, position: "bottomright" }
      });
      if (typeof mapas.attachTouchScrollGuard === "function") mapas.attachTouchScrollGuard(map, element);
      activeHotelPortalMap = map;
      window.RevistaDigital.state.activeMap = map;
      window.RevistaDigital.state.userMarker = null;
      window.RevistaDigital.state.routeLine = null;
      const rdState = state();
      const hasComplexGuide = PLAYA_PARAISO_GUIDE_HOTELS.has(hotel.slug);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors"
      }).addTo(map);
      // El panel de la guía ocupa la izquierda: los controles de zoom se
      // colocan a la derecha para que sigan siendo accesibles.
      if (map.zoomControl) {
        map.zoomControl.remove();
        L.control.zoom({ position: "topright" }).addTo(map);
      }
      if (hasComplexGuide) {
        const complexHotelPoints = portalHotelPoints(
          (destination.hotels || []).filter((item) => item.complex !== false)
        );
        complexHotelPoints.forEach((item) => {
          const hotelSlug = item.slug || slugify(item.name);
          const hotelRoute = `/${countrySlug}/${destination.slug}/${hotelSlug}`;
          const marker = L.marker(item.coordinates)
            .addTo(map)
            .bindPopup(`<strong>${escapeHtml(item.name)}</strong><br><small>${escapeHtml(destination.name)}, ${escapeHtml(countryData.name)}</small><br><a href="${href(hotelRoute)}" data-app-route="${hotelRoute}">Ver ficha →</a>`);
          if (item.name === hotel.name) marker.openPopup();
          const guideHotel = window.RevistaDigital.guiapa?.poiForHotel?.(item.name);
          if (guideHotel) window.RevistaDigital.guiapa.registerMarker(guideHotel.id, marker);
          window.RevistaDigital.guiapa?.registerMarker?.(item.name, marker);
        });
      } else {
        L.marker(coordinates)
          .addTo(map)
          .bindPopup(`<strong>${escapeHtml(hotel.name)}</strong><br><small>${escapeHtml(destination.name)}, ${escapeHtml(countryData.name)}</small>`)
          .openPopup();
      }
      const position = state()?.currentPosition;
      if (position && Number.isFinite(position.latitude) && Number.isFinite(position.longitude)) {
        const size = 28;
        const personSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + size + '" height="' + size + '"><circle cx="12" cy="8" r="4" fill="#d4af37"/><path d="M12 14c-4.41 0-8 2.59-8 6h16c0-3.41-3.59-6-8-6z" fill="#d4af37"/></svg>';
        const pulseSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="18" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"><animate attributeName="r" from="18" to="32" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite"/></circle></svg>';
        const html = '<div class="user-marker-wrap" style="position:relative;width:' + size + 'px;height:' + size + 'px;display:flex;align-items:center;justify-content:center;"><div class="user-marker-pulse" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:72px;height:72px;pointer-events:none;">' + pulseSvg + '</div><div class="user-marker-icon" style="position:relative;z-index:1;line-height:0;">' + personSvg + '</div></div>';
        state().userMarker = L.marker([position.latitude, position.longitude], {
          icon: L.divIcon({ className: "user-marker-div", html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
        }).addTo(map).bindTooltip("Su ubicación actual");
      }
      // Encuadre y límites de navegación: en las fichas de Playa Paraíso con
      // explorador se muestra el complejo completo (para que el socio pueda
      // ver y recorrer todos los lugares); en el resto, un buffer alrededor
      // de las coordenadas reales del hotel (~330 m).
      const hotelInset = 0.003;
      const hotelPerimeter = L.latLngBounds(
        [coordinates[0] - hotelInset, coordinates[1] - hotelInset],
        [coordinates[0] + hotelInset, coordinates[1] + hotelInset]
      );
      const complexPerimeter = (rdState && rdState.complexPerimeter) ? L.latLngBounds(rdState.complexPerimeter) : null;
      const complexBounds = (rdState && rdState.complexBounds) ? L.latLngBounds(rdState.complexBounds) : null;
      const framingPerimeter = (hasComplexGuide && complexPerimeter) ? complexPerimeter : hotelPerimeter;
      const framingNav = (hasComplexGuide && complexBounds) ? complexBounds : (hasComplexGuide && complexPerimeter ? complexPerimeter : hotelPerimeter);

      // En las fichas con guía el mapa ocupa todo el ancho de la sección y
      // se encuadra sobre el núcleo de lugares verificados (restaurantes,
      // bares, piscinas, hoteles): así el complejo se ve con más detalle y
      // el zoom numérico sube. El perímetro real sigue siendo el límite de
      // navegación, de modo que el usuario puede alejarse y ver el resort
      // entero. Además se deja libre la franja que cubre el panel de la guía.
      const focusBounds = hasComplexGuide
        ? (window.RevistaDigital.guiapa?.getFocusBounds?.() || null)
        : null;
      const frameOptions = hasComplexGuide ? {
        perimeter: framingPerimeter,
        navBounds: framingNav,
        focusBounds: focusBounds || framingPerimeter,
        minZoomBounds: framingPerimeter,
        // Los tiles OSM llegan nativos hasta 19: se permite un nivel de
        // zoom más que el límite previo (18) en los complejos con guía.
        maxZoom: hasComplexGuide ? 19 : 18
      } : { perimeter: framingPerimeter, navBounds: framingNav };
      const applyFraming = () => {
        const options = { ...frameOptions };
        const panel = guidePanelLayout(L, element);
        if (panel) {
          options.paddingTopLeft = panel.paddingTopLeft;
          options.paddingBottomRight = panel.paddingBottomRight;
        }
        if (window.RevistaDigital && typeof window.RevistaDigital.setupComplexMapFraming === "function") {
          window.RevistaDigital.setupComplexMapFraming(map, L, options);
        } else {
          map.setMinZoom(map.getBoundsZoom(options.perimeter));
          map.setMaxZoom(hasComplexGuide ? 19 : 18);
          map.fitBounds(options.perimeter, { animate: false });
          trackMapResize(map, element);
        }
      };
      applyFraming();
      // Al plegar o desplegar el panel, el mapa vuelve a encuadrar el
      // complejo en el espacio que queda libre.
      if (hasComplexGuide) {
        const panel = document.querySelector("[data-guide-overlay]");
        if (panel) {
          panel.addEventListener("guide:toggle", () => {
            window.setTimeout(applyFraming, 220);
          });
        }
      }

      // Máscara del complejo: en las fichas de Playa Paraíso ocultamos todo lo
      // que rodea al resort (Vidanta, calles, etc.) dejando visible solo el
      // contorno del complejo, con borde difuminado.
      if (hasComplexGuide && window.RevistaDigital.guiapa && typeof window.RevistaDigital.guiapa.addComplexMask === "function") {
        try { window.RevistaDigital.guiapa.addComplexMask(map); } catch (e) {}
      }

      try {
        if (hotel.complex !== false && window.RevistaDigital.guiapa && typeof window.RevistaDigital.guiapa.addPoiLayer === "function") {
          window.RevistaDigital.guiapa.addPoiLayer(map, hasComplexGuide ? null : hotel.name);
        }
      } catch (e) {}
      // El explorador de la ficha usa este mapa para "Ver en el mapa" y las
      // rutas a pie, así que queda enlazado al módulo de la guía.
      try {
        if (window.RevistaDigital.guiapa && typeof window.RevistaDigital.guiapa.bindMap === "function") {
          window.RevistaDigital.guiapa.bindMap(map);
        }
      } catch (e) {}
    }).catch((error) => console.warn("No se pudo cargar el mapa del hotel.", error));
  }
  function initComplexPortalMap(element, countrySlug, destination) {
    const mapas = window.RevistaDigital.mapas;
    const hotels = portalHotelPoints((destination.hotels || []).filter((hotel) => hotel.complex !== false));
    if (!element || !hotels.length || !mapas?.loadLeaflet) return;

    const build = typeof mapas.loadMarkerCluster === "function" ? mapas.loadMarkerCluster() : mapas.loadLeaflet();
    build.then((L) => {
      const map = L.map(element, {
        scrollWheelZoom: true,
        preferCanvas: true,
        zoomAnimation: false,
        rotate: true,
        bearing: 0,
        touchRotate: true,
        rotateControl: { closeOnZeroBearing: false, position: "bottomright" }
      });
      if (typeof mapas.attachTouchScrollGuard === "function") mapas.attachTouchScrollGuard(map, element);
      window.RevistaDigital.state.activeMap = map;
      window.RevistaDigital.state.userMarker = null;
      window.RevistaDigital.state.routeLine = null;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors"
      }).addTo(map);
    hotels.forEach((item) => {
      const hotelSlug = item.slug || slugify(item.name);
      const route = `/${countrySlug}/${destination.slug}/${hotelSlug}`;
      const hotelMarker = L.marker(item.coordinates)
        .addTo(map)
        .bindPopup(`<strong>${escapeHtml(item.name)}</strong><br><a href="${href(route)}" data-app-route="${route}">Ver ficha →</a>`);
      try {
        const guideHotel = window.RevistaDigital.guiapa?.poiForHotel?.(item.name);
        const hotelId = guideHotel ? guideHotel.id : ("hotel:" + hotelSlug);
        window.RevistaDigital.guiapa?.registerMarker?.(hotelId, hotelMarker);
        // Aseguramos que el marcador también quede accesible por nombre/slug
        window.RevistaDigital.guiapa?.registerMarker?.(item.name, hotelMarker);
      } catch (e) { /* ignore guide marker registry errors */ }
    });
    // Renderiza los POIs antes del encuadre para incluirlos en los límites
    // y evitar que el mapa abra fuera del complejo.
    const guide = window.RevistaDigital.guiapa;
    if (guide && typeof guide.addPoiLayer === "function") {
      try {
        if (guide._poiLayer && typeof guide._poiLayer.remove === "function") guide._poiLayer.remove();
        guide.addPoiLayer(map, null, { disableClusteringAtZoom: 17 });
      } catch (error) {
        console.warn("No se pudieron mostrar los lugares del complejo.", error);
      }
    }
    // Máscara del complejo: oculta todo lo que rodea al resort dejando
    // visible solo el complejo, con borde difuminado (igual que en las fichas).
    if (guide && typeof guide.addComplexMask === "function") {
      try { guide.addComplexMask(map); } catch (error) {
        console.warn("No se pudo aplicar la máscara del complejo.", error);
      }
    }
    // Encuadre y límites de navegación del complejo Playa Paraíso
    const regionBounds = portalComplexViewBounds(L, hotels, guide?._poiLayer);
    const rdState = window.RevistaDigital && window.RevistaDigital.state;
    const perimeter = (rdState && rdState.complexPerimeter) ? L.latLngBounds(rdState.complexPerimeter) : regionBounds;
    const navBounds = (rdState && rdState.complexBounds) ? L.latLngBounds(rdState.complexBounds) : (regionBounds ? regionBounds.pad(0.05) : null);
    if (perimeter && window.RevistaDigital && typeof window.RevistaDigital.setupComplexMapFraming === "function") {
      window.RevistaDigital.setupComplexMapFraming(map, L, { perimeter, navBounds });
    } else if (regionBounds) {
      map.setMinZoom(map.getBoundsZoom(regionBounds));
      map.setMaxZoom(18);
      map.fitBounds(regionBounds, { animate: false });
    } else {
      map.setView(hotels[0].coordinates, 13);
    }
    const position = state()?.currentPosition;
    if (position) {
        const size = 28;
        const personSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + size + '" height="' + size + '"><circle cx="12" cy="8" r="4" fill="#d4af37"/><path d="M12 14c-4.41 0-8 2.59-8 6h16c0-3.41-3.59-6-8-6z" fill="#d4af37"/></svg>';
        const pulseSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72"><circle cx="36" cy="36" r="18" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"><animate attributeName="r" from="18" to="32" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite"/></circle></svg>';
        const html = '<div class="user-marker-wrap" style="position:relative;width:' + size + 'px;height:' + size + 'px;display:flex;align-items:center;justify-content:center;"><div class="user-marker-pulse" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:72px;height:72px;pointer-events:none;">' + pulseSvg + '</div><div class="user-marker-icon" style="position:relative;z-index:1;line-height:0;">' + personSvg + '</div></div>';
        state().userMarker = L.marker([position.latitude, position.longitude], {
          icon: L.divIcon({ className: "user-marker-div", html: html, iconSize: [size, size], iconAnchor: [size/2, size/2] })
        }).addTo(map).bindTooltip("Su ubicación actual");
    }
    try {
      if (window.RevistaDigital.guiapa && typeof window.RevistaDigital.guiapa.bindMap === "function") {
        window.RevistaDigital.guiapa.bindMap(map);
      }
    } catch (error) {
      console.warn("No se pudo activar la guía del complejo en el mapa.", error);
    }
    }).catch((error) => console.warn("No se pudo cargar el mapa del complejo.", error));
  }
  function navigate(path) {
    const target = href(path);
    const isRestaurantRoute = path.startsWith("/restaurantes/");
    const restaurantReturnRoute = isRestaurantRoute
      ? (document.body.dataset.restaurantReturnRoute || getCurrentRoute())
      : null;
    if (restaurantReturnRoute) document.body.dataset.restaurantReturnRoute = restaurantReturnRoute;
    if (window.location.pathname !== target) {
      const cartReturnRoute = path === "/carrito-golf" ? getCurrentRoute() : null;
      history.pushState({ appRoute: path, restaurantReturnRoute, cartReturnRoute }, "", target);
    }
    handleRouteChange(path);
    window.RevistaDigital.siteTour?.onRouteChange?.(getCurrentRoute());
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-app-route]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(link.dataset.appRoute || "/");
  });

  let portalZoneMarker = null;
  async function handleZoneClick(zone) {
    const panel = zone.closest(".hotel-zone-panel");
    if (panel) panel.querySelectorAll(".hotel-zone").forEach((button) => button.classList.toggle("is-active", button === zone));
    const label = zone.dataset.zone || "";
    const hotelName = zone.dataset.hotel || "";
    const status = panel?.querySelector("[data-zone-status]");
    if (status) {
      const nameElement = status.querySelector("[data-zone-name]");
      if (nameElement) nameElement.textContent = label;
      status.hidden = false;
    }
    const coordinates = zone.dataset.lat && zone.dataset.lng
      ? [parseFloat(zone.dataset.lat), parseFloat(zone.dataset.lng)]
      : null;
    const map = state()?.activeMap;
    const mapas = window.RevistaDigital.mapas;
    if (!coordinates || !map || !mapas?.loadLeaflet) return;
    try {
      const L = await mapas.loadLeaflet();
      if (!portalZoneMarker) {
        portalZoneMarker = L.marker(coordinates).addTo(map);
      } else {
        portalZoneMarker.setLatLng(coordinates);
      }
      portalZoneMarker.bindPopup(`<strong>${escapeHtml(label)}</strong><br><small>${escapeHtml(hotelName)}</small>`);
      portalZoneMarker.openPopup();
      map.setView(coordinates, Math.max(map.getZoom(), 16));
    } catch (error) {
      console.warn("No se pudo mostrar la zona en el mapa.", error);
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".portal-locate")) {
      window.requestCurrentLocation?.();
      return;
    }
    const directionsButton = event.target.closest(".portal-directions");
    if (directionsButton) {
      let name = directionsButton.dataset.directions || "";
      let coordinates = directionsButton.dataset.lat && directionsButton.dataset.lng
        ? [parseFloat(directionsButton.dataset.lat), parseFloat(directionsButton.dataset.lng)]
        : null;
      const rawList = directionsButton.dataset.directionsHotels;
      if (rawList) {
        try {
          const list = JSON.parse(rawList);
          if (Array.isArray(list) && list.length) {
            const position = state()?.currentPosition;
            let pick = list[0];
            if (position) {
              pick = list.reduce((best, item) => {
                const bestDistance = Math.abs(best[1] - position.latitude) + Math.abs(best[2] - position.longitude);
                const distance = Math.abs(item[1] - position.latitude) + Math.abs(item[2] - position.longitude);
                return distance < bestDistance ? item : best;
              }, list[0]);
            }
            name = pick[0];
            coordinates = [pick[1], pick[2]];
          }
        } catch (error) {
          console.warn("No se pudieron leer los destinos del mapa.", error);
        }
      }
      if (name || coordinates) window.RevistaDigital?.mapas?.openDirections?.(name, coordinates);
      return;
    }
    const gpdir = event.target.closest(".gp-dir");
    if (gpdir) {
      const lat = parseFloat(gpdir.dataset.lat);
      const lng = parseFloat(gpdir.dataset.lng);
      const nm = gpdir.dataset.name || "POI";
      if (!isNaN(lat) && !isNaN(lng)) {
        try { window.RevistaDigital?.mapas?.openDirections?.(nm, [lat, lng]); } catch (e) {}
      }
      return;
    }
    const zone = event.target.closest(".hotel-zone");
    if (zone) handleZoneClick(zone);
  });

  // Panel de la guía sobre el mapa: plegar y desplegar.
  function setGuidePanelOpen(open) {
    const wrap = document.querySelector("[data-guide-wrap]");
    const panel = wrap?.querySelector("[data-guide-overlay]");
    if (!wrap || !panel) return;
    const collapsed = !open;
    if (collapsed) {
      panel.setAttribute("data-guide-collapsed", "1");
      wrap.classList.add("is-guide-collapsed");
      wrap.classList.remove("is-guide-expanded");
      updateGuideExpandButton(wrap, false);
    } else {
      panel.removeAttribute("data-guide-collapsed");
      wrap.classList.remove("is-guide-collapsed");
    }
    wrap.querySelectorAll("[data-guide-toggle]").forEach((button) => {
      button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    });
    panel.dispatchEvent(new CustomEvent("guide:toggle", { detail: { collapsed } }));
  }

  function updateGuideExpandButton(wrap, expanded) {
    const button = wrap?.querySelector("[data-guide-expand]");
    if (!button) return;
    const next = Boolean(expanded);
    button.setAttribute("aria-expanded", next ? "true" : "false");
    const key = next ? "guideExitExpand" : "guideExpand";
    const fallback = next ? "Volver" : "Ampliar";
    const text = (window.RevistaDigital?.i18n?.t?.(key, fallback) || fallback);
    button.setAttribute("data-i18n", key);
    button.setAttribute("data-i18n-aria", key);
    button.setAttribute("aria-label", text);
    button.textContent = text;
  }

  function setGuidePanelExpanded(expanded) {
    const wrap = document.querySelector("[data-guide-wrap]");
    if (!wrap) return;
    const next = Boolean(expanded);
    if (next) setGuidePanelOpen(true);
    wrap.classList.toggle("is-guide-expanded", next);
    document.body.classList.toggle("guide-expanded-open", next);
    updateGuideExpandButton(wrap, next);
    const panel = wrap.querySelector("[data-guide-overlay]");
    if (panel) panel.dispatchEvent(new CustomEvent("guide:expand", { detail: { expanded: next } }));
  }

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-guide-toggle]");
    if (!toggle) return;
    const wrap = toggle.closest("[data-guide-wrap]");
    const panel = wrap?.querySelector("[data-guide-overlay]");
    if (!wrap || !panel) return;
    const isCollapsed = panel.getAttribute("data-guide-collapsed") === "1";
    // Si el panel estaba plegado se despliega y viceversa.
    setGuidePanelOpen(isCollapsed);
  });
  document.addEventListener("click", (event) => {
    const expand = event.target.closest("[data-guide-expand]");
    if (!expand) return;
    const wrap = expand.closest("[data-guide-wrap]");
    if (!wrap) return;
    const expanded = wrap.classList.contains("is-guide-expanded");
    setGuidePanelExpanded(!expanded);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const wrap = document.querySelector("[data-guide-wrap]");
    if (wrap?.classList.contains("is-guide-expanded")) setGuidePanelExpanded(false);
  });

  function scrollToAppHash(behavior) {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    let targetId = hash.slice(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Keep the raw id when the hash contains malformed percent escapes.
    }
    const target = document.getElementById(targetId);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: behavior || (reduce ? "auto" : "smooth"), block: "start" });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("data-app-route") || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const raw = (link.getAttribute("href") || "").trim();
    if (!raw || raw === "#" || raw.startsWith("#!")) return;
    let hash = "";
    if (raw.startsWith("#")) {
      hash = raw;
    } else {
      let resolved;
      try {
        resolved = new URL(link.href);
      } catch {
        return;
      }
      if (!resolved.hash || resolved.pathname !== window.location.pathname || resolved.search !== window.location.search) return;
      hash = resolved.hash;
    }
    event.preventDefault();
    let targetId = hash.slice(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Keep the raw id when the hash contains malformed percent escapes.
    }
    if (!targetId || !document.getElementById(targetId)) return;
    const url = new URL(window.location.href);
    url.hash = hash;
    window.history.replaceState(window.history.state, "", url.href);
    // El enlace "Lugares del complejo" abre además el panel de la guía.
    if (targetId === "hotel-guia") setGuidePanelOpen(true);
    scrollToAppHash();
    window.RevistaDigital.siteTour?.onRouteChange?.(getCurrentRoute() + "#" + targetId);
  });

  function initializeRouteHandler() {
    window.addEventListener("popstate", (event) => {
      const route = getCurrentRoute();
      if (route.startsWith("/restaurantes/") && event.state?.restaurantReturnRoute) {
        document.body.dataset.restaurantReturnRoute = event.state.restaurantReturnRoute;
      }
      handleRouteChange(route);
      window.RevistaDigital.siteTour?.onRouteChange?.(getCurrentRoute());
    });
  }

  function restoreCurrentRoute() {
    handleRouteChange();
    window.RevistaDigital.siteTour?.onRouteChange?.(getCurrentRoute());
  }

  function handleRouteChange(route = getCurrentRoute()) {
      route = route.startsWith("/") ? route : `/${route}`;
      const legacyRouteAliases = {
        "/brasil/brasil": "/brasil/praia-do-forte",
        "/brasil/manaus": "/brasil/amazon",
        "/brasil/manaus/iberostar-heritage-grand-amazon": "/brasil/amazon/iberostar-heritage-grand-amazon",
        "/brasil/praia-do-forte/iberostar-waves-bahia": "/brasil/bahia/iberostar-waves-bahia",
        "/brasil/brasil/iberostar-waves-bahia": "/brasil/bahia/iberostar-waves-bahia",
        "/brasil/brasil/iberostar-heritage-grand-amazon": "/brasil/amazon/iberostar-heritage-grand-amazon",
        "/jamaica/rose-hall/joia-rose-hall-by-iberostar": "/jamaica/rose-hall/joia-rose-hall",
        "/guia-playa-paraiso": "/mexico/riviera-maya",
        "/complejo-playa-paraiso": "/mexico/riviera-maya"
      };
      if (legacyRouteAliases[route]) {
        const canonicalRoute = legacyRouteAliases[route];
        history.replaceState(history.state, "", href(canonicalRoute));
        return handleRouteChange(canonicalRoute);
      }
      if (route === "/") {
        document.body.dataset.routeManaged = "true";
        document.body.dataset.appMode = "portal";
      }
      window.RevistaDigital.routeContext = getRouteContext(route);
      window.RevistaDigital.routeTarget = resolveRouteTarget(route);
      refreshCurrentAppContext(route);
      if (!route.startsWith("/restaurantes/")) delete document.body.dataset.restaurantReturnRoute;

      // AISLAMIENTO DE VISTAS AL ENTRAR/SALIR DE /carrito-golf
      if (route === "/carrito-golf") {
        try {
          // Ocultar cualquier mapa/guía anterior que pueda seguir montado
          document.querySelectorAll(
            ".hotel-complex-stage, #hotel-guia, .guide-explorer, .guide-explorer-mount, #guideExplorer, " +
            ".hotel-portal-map, .portal-complex-map, .map-container, .mapbox-map, .leaflet-container, " +
            ".hotel-complex-map-wrap"
          ).forEach((el) => {
            if (!el) return;
            if (el.id === "cartTrackingMap" || el.closest("#hotel-carrito") || el.closest(".cart-page")) return;
            el.style.setProperty("display", "none", "important");
            el.setAttribute("data-route-hidden", "carrito-golf");
          });

          // Intentar desmontar instancias activas
          const gp = window.RevistaDigital.guiapa;
          if (gp) {
            try { if (typeof gp.teardown === "function") gp.teardown(); } catch (e) {}
            try { if (typeof gp.destroyMap === "function") gp.destroyMap(); } catch (e) {}
            try { if (gp._map && typeof gp._map.remove === "function") { gp._map.remove(); gp._map = null; } } catch (e) {}
            try { if (gp.map && typeof gp.map.remove === "function") { gp.map.remove(); gp.map = null; } } catch (e) {}
          }
          const mapas = window.RevistaDigital.mapas;
          if (mapas) {
            try { if (typeof mapas.destroyActiveMap === "function") mapas.destroyActiveMap(); } catch (e) {}
            try { if (mapas.activeMap && typeof mapas.activeMap.remove === "function") { mapas.activeMap.remove(); mapas.activeMap = null; } } catch (e) {}
            try { if (mapas._map && typeof mapas._map.remove === "function") { mapas._map.remove(); mapas._map = null; } } catch (e) {}
          }

          // Limpiar banners/residuos de solicitud de transporte
          document.querySelectorAll(".guide-book-done, #guideBookBox, #guideMobileBookBox, .guide-book-confirm, .hotel-transport-banner, [class*='transport-banner']").forEach((el) => {
            try { el.innerHTML = ""; } catch (e) {}
            try { el.remove(); } catch (e) {}
          });
        } catch (e) { /* ignore */ }
      } else {
        try {
          document.querySelectorAll('[data-route-hidden="carrito-golf"]').forEach((el) => {
            try {
              el.style.removeProperty("display");
              el.removeAttribute("data-route-hidden");
            } catch (e) {}
          });
        } catch (e) {}
      }

      if (renderPortal(route)) {
        state().activeRestaurantMenuIndex = null;
        state().activeHotelDetail = null;
        state().returnPageIndex = null;
        const position = state()?.currentPosition;
        if (position && document.body.dataset.locationRequested === "true") {
          window.RevistaDigital.mapas?.renderLocationStatus?.(position);
        }
        if (window.location.hash) scrollToAppHash("auto");
        return;
      }
      document.body.dataset.routeManaged = "false";
      document.body.dataset.appMode = "legacy";
      const view = document.getElementById("appView");
      if (view) view.innerHTML = "";
      const hierarchicalParts = route.split("/").filter(Boolean);
      if (hierarchicalParts.length === 3 && getDestinationCatalog()[hierarchicalParts[0]]) {
        const [countrySlug, destinationSlug, hotelSlug] = hierarchicalParts;
        const countryDestinations = getDestinationCatalog()[countrySlug]?.destinations || [];
        let destination = countryDestinations.find((item) => item.slug === destinationSlug);
        let hotel = destination?.hotels.find((item) => item.slug === hotelSlug);
        if (!hotel) {
          const match = countryDestinations.map((item) => ({ destination: item, hotel: item.hotels.find((record) => record.slug === hotelSlug) })).find((item) => item.hotel);
          destination = match?.destination || destination;
          hotel = match?.hotel || null;
        }
        const targetIndex = hotel?.source === "page" ? hotel.pageIndex : -1;
        const menuDetail = hotel?.source === "menu"
          ? {
              countryKey: hotel.countryMenuKey,
              hotelIndex: hotel.hotelIndex,
              activeTab: "habitaciones",
              galleryIndex: 0,
              ...(hotel.tabOverrides ? { tabOverrides: hotel.tabOverrides } : {}),
              ...(hotel.aliasOf ? { displayName: hotel.name, tagline: hotel.tagline, description: hotel.description } : {})
            }
          : null;
        if (targetIndex >= 0 || menuDetail) {
          const canonicalRoute = destination && hotel ? `/${countrySlug}/${destination.slug}/${hotel.slug}` : "";
          if (canonicalRoute && canonicalRoute !== route) {
            history.replaceState(history.state, "", href(canonicalRoute));
            return handleRouteChange(canonicalRoute);
          }
          document.body.dataset.appMode = "hotel";
          document.body.dataset.routeManaged = "true";
          document.body.dataset.returnRoute = `/${countrySlug}/${destination.slug}`;
          state().activeRestaurantMenuIndex = null;
          state().activeHotelDetail = menuDetail;
          state().returnPageIndex = targetIndex >= 0 ? targetIndex : 0;
          state().currentIndex = targetIndex >= 0 ? targetIndex : 0;
          window.renderPage?.();
          return;
        }
      }
      const restaurantMenuMatch = route.match(/^\/restaurantes\/([^/]+)$/);
      const hotelMatch = route.match(/^\/hoteles\/([^/]+)\/([^/]+)$/);
      const countryMatch = route.match(/^\/hoteles\/([^/]+)$/);

      if (restaurantMenuMatch) {
        document.body.dataset.restaurantReturnRoute ||= "/";
        const targetIndex = state().pages?.findIndex((page) =>
          page.type === "hotel" && slugify(page.name) === restaurantMenuMatch[1]
        ) ?? -1;

        if (targetIndex >= 0) {
          state().activeRestaurantMenuIndex = targetIndex;
          state().activeHotelDetail = null;
          state().returnPageIndex = null;
          state().currentIndex = targetIndex;
          if (typeof window.renderPage === "function") {
            window.renderPage();
          }
          return;
        }

        const restaurantHotel = Object.values(getDestinationCatalog())
          .flatMap((country) => country.destinations)
          .flatMap((destination) => destination.hotels.map((hotel) => ({ hotel, destination })))
          .find(({ hotel }) => hotel.source === "menu" && (
            hotel.slug === restaurantMenuMatch[1] || slugify(hotel.name) === restaurantMenuMatch[1]
          ));

        if (restaurantHotel) {
          const { hotel, destination } = restaurantHotel;
          const restaurantReturnRoute = document.body.dataset.restaurantReturnRoute || "/";
          document.body.dataset.appMode = "hotel";
          document.body.dataset.routeManaged = "true";
          state().activeRestaurantMenuIndex = null;
          state().activeHotelDetail = {
            countryKey: hotel.countryMenuKey,
            hotelIndex: hotel.hotelIndex,
            activeTab: "restaurante",
            galleryIndex: 0,
            ...(hotel.aliasOf ? {
              displayName: hotel.name,
              tagline: hotel.tagline,
              description: hotel.description,
              ...(hotel.tabOverrides ? { tabOverrides: hotel.tabOverrides } : {})
            } : {})
          };
          state().returnPageIndex = 0;
          state().currentIndex = 0;
          document.body.dataset.returnRoute = restaurantReturnRoute !== "/"
            ? restaurantReturnRoute
            : `/${hotel.countryMenuKey}/${destination.slug}`;
          window.renderPage?.();
          return;
        }
      }

      if (hotelMatch) {
        const countryKey = hotelMatch[1];
        const hotelName = hotelMatch[2];
        const country = state().hotelCountryMenus?.[countryKey];
        const hotelIndex = country?.hotels?.findIndex((hotel) => slugify(hotel.name) === hotelName) ?? -1;

        if (country && hotelIndex >= 0) {
          const portalRoute = findHotelPortalRoute(country.hotels[hotelIndex].name);
          if (portalRoute) {
            history.replaceState(history.state, "", href(portalRoute));
            return handleRouteChange(portalRoute);
          }
          state().activeRestaurantMenuIndex = null;
          state().activeHotelDetail = { countryKey, hotelIndex, activeTab: "habitaciones", galleryIndex: 0 };
          state().returnPageIndex = state().pages?.findIndex((page) =>
            (page.type === "country-menu" && page.country === countryKey) ||
            (page.type === "hotel" && page.country === "mexico" && countryKey === "mexico")
          ) ?? 0;
          state().currentIndex = state().returnPageIndex >= 0 ? state().returnPageIndex : 0;
          if (typeof window.renderPage === "function") {
            window.renderPage();
          }
          return;
        }

        if (country) {
          const countryPageIndex = state().pages?.findIndex((page) =>
            (page.type === "country-menu" && page.country === countryKey) ||
            (page.type === "hotel" && page.country === "mexico" && countryKey === "mexico")
          ) ?? -1;

          if (countryPageIndex >= 0) {
            state().activeRestaurantMenuIndex = null;
            state().activeHotelDetail = null;
            state().returnPageIndex = null;
            state().currentIndex = countryPageIndex;
            if (typeof window.renderPage === "function") {
              window.renderPage();
            }
            return;
          }
        }
      }

      if (countryMatch) {
        const countryKey = countryMatch[1];
        const targetIndex = state().pages?.findIndex((page) =>
          (page.type === "country-menu" && page.country === countryKey) ||
          (page.type === "hotel" && page.country === "mexico" && countryKey === "mexico")
        ) ?? -1;

        if (targetIndex >= 0) {
          state().activeRestaurantMenuIndex = null;
          state().activeHotelDetail = null;
          state().returnPageIndex = null;
          state().currentIndex = targetIndex;
          if (typeof window.renderPage === "function") {
            window.renderPage();
          }
          return;
        }
      }

      const pageTypeByRoute = {
        "/complejo-playa-paraiso": "complex",
        "/360": "media360",
        "/videos": "videos"
      };
      const pageType = pageTypeByRoute[route];

      if (pageType) {
        const targetIndex = state().pages?.findIndex((page) => page.type === pageType) ?? -1;

        if (targetIndex >= 0) {
          state().activeRestaurantMenuIndex = null;
          state().activeHotelDetail = null;
          state().returnPageIndex = null;
          state().currentIndex = targetIndex;
          if (typeof window.renderPage === "function") {
            window.renderPage();
          }
          return;
        }
      }

      state().activeRestaurantMenuIndex = null;
      state().activeHotelDetail = null;
      state().returnPageIndex = null;
      state().currentIndex = 0;
      if (typeof window.renderPage === "function") {
        window.renderPage();
      }
  }

  routes.setGuidePanelOpen = setGuidePanelOpen;
  routes.setGuidePanelExpanded = setGuidePanelExpanded;
  routes.slugify = slugify;
  routes.syncBookRoute = syncBookRoute;
  routes.resolveInitialRoute = resolveInitialRoute;
  routes.initializeRouteHandler = initializeRouteHandler;
  routes.restoreCurrentRoute = restoreCurrentRoute;
  routes.navigate = navigate;
  routes.renderPortal = renderPortal;
  routes.renderHotelPortal = renderHotelPortal;
  routes.findHotelPortalRoute = findHotelPortalRoute;
  routes.getRouteContext = getRouteContext;
  routes.resolveRouteTarget = resolveRouteTarget;
  routes.refreshCurrentAppContext = refreshCurrentAppContext;
  routes.getBreadcrumbs = getBreadcrumbs;
  routes.computeTopNavState = computeTopNavState;
  routes.getPortalNavModel = getPortalNavModel;
  routes.portalNav = portalNav;
  routes.getCurrentLabel = function (pathname = window.location.pathname) {
    return computeTopNavState(pathname).label || "Inicio";
  };

  window.slugify = window.slugify || slugify;
  window.syncBookRoute = window.syncBookRoute || syncBookRoute;
  window.resolveInitialRoute = window.resolveInitialRoute || resolveInitialRoute;
  window.RevistaDigital.routes = routes;
  window.RevistaDigital.routeContext = getRouteContext();
  window.RevistaDigital.routeTarget = resolveRouteTarget();
  refreshCurrentAppContext();
  window.RevistaDigital.breadcrumbs = getBreadcrumbs();
  window.RevistaDigital.topNav = computeTopNavState();

  if (document.readyState !== "loading") {
    initializeRouteHandler();
  } else {
    document.addEventListener("DOMContentLoaded", initializeRouteHandler);
  }

  // Límites de zoom y desplazamiento para el mapa del carrito de golf.
  // Se aplican desde routes.js (sin tocar carrito-golf.js) cuando el mapa
  // de Leaflet termina de inicializar, para que el socio no pueda alejarse
  // del complejo ni zoom excesivo.
  (function constrainCartMap() {
    const COMPLEX_BOUNDS = [
      [20.7525065, -86.9710573],
      [20.7654525, -86.9560717]
    ];
    let applied = false;

    function applyBounds() {
      if (applied) return;
      const cg = window.RevistaDigital && window.RevistaDigital.carritoGolf;
      if (!cg || !cg._map || !window.L) return;
      try {
        const map = cg._map;
        map.setMaxBounds(COMPLEX_BOUNDS);
        map.setMaxBoundsViscosity(1.0);
        map.setMinZoom(map.getBoundsZoom(window.L.latLngBounds(COMPLEX_BOUNDS)));
        map.setMaxZoom(19);
        const guide = window.RevistaDigital && window.RevistaDigital.guiapa;
        if (guide && typeof guide.addComplexMask === "function") guide.addComplexMask(map);
      } catch (e) { /* ignore */ }
      applied = true;
    }

    function watchContainer() {
      const host = document.getElementById("cartTrackingMap");
      if (!host) return;
      const observer = new MutationObserver(function () {
        applyBounds();
      });
      observer.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
      // Reintentar por si el mapa se crea justo después de conectar el observador.
      const retry = setInterval(function () {
        applyBounds();
        if (applied) clearInterval(retry);
      }, 500);
      setTimeout(function () { clearInterval(retry); }, 8000);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", watchContainer);
    } else {
      watchContainer();
    }
  })();
})();