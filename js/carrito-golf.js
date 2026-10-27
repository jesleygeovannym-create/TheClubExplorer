// Simulación de reserva y seguimiento de carritos dentro del complejo (estilo Uber).
// No hay backend de carritos: las posiciones, la aceptación y el ETA son
// simulados en el navegador para mostrar el flujo completo al huésped.
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  var cg = window.RevistaDigital.carritoGolf = window.RevistaDigital.carritoGolf || {};

  var SPEED_MPS = 4.2;        // velocidad media estimada del carrito
  var DETOUR_FACTOR = 1.35;   // rodeo por los caminos del complejo
  var TIME_SCALE = 8;         // aceleración de la simulación
  var TICK_MS = 200;
  var ACCEPT_MIN_MS = 1200;
  var ACCEPT_MAX_MS = 2600;
  var ROUTE_MIN_MS = 9000;
  var ROUTE_MAX_MS = 90000;

  var CART_FLEET = [
    { id: "C1", name: "Carrito 01", base: [20.76110, -86.96450] },
    { id: "C2", name: "Carrito 02", base: [20.75862, -86.95892] },
    { id: "C3", name: "Carrito 03", base: [20.75863, -86.96586] },
    { id: "C4", name: "Carrito 04", base: [20.75638, -86.96298] },
    { id: "C5", name: "Carrito 05", base: [20.75790, -86.96490] },
    { id: "C6", name: "Carrito 06", base: [20.76143, -86.96538] }
  ];

  var FALLBACK_DESTINATIONS = [
    { id: "golf", name: "Iberostar Playa Paraíso Golf Club", category: "golf", lat: 20.75946, lng: -86.96714 },
    { id: "golf-club-house", name: "Golf Club House", category: "golf", lat: 20.7586073, lng: -86.9658668 }
  ];

  var CART_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M3 6h9l2 6h5a1 1 0 0 1 1 1v2h-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M3 6v8a2 2 0 0 0 2 2h9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
    '<circle cx="7" cy="18" r="2" fill="currentColor"/>' +
    '<circle cx="17" cy="18" r="2" fill="currentColor"/>' +
    '</svg>';

  cg._context = null;
  cg._carts = {};
  cg._requests = {};
  cg._timers = {};
  cg._map = null;
  cg._L = null;
  cg._mapToken = 0;
  cg._mapPromise = null;
  cg._markers = {};
  cg._pickupMarker = null;
  cg._routeLine = null;
  cg._destinationMarker = null;
  cg._accuracyCircle = null;
  cg._fitKey = null;
  cg._destinations = null;
  cg._position = null;
  cg._watchId = null;
  cg._locationState = "idle";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function appState() {
    return window.RevistaDigital.state || {};
  }

  function currentPosition() {
    var position = cg._position || appState().currentPosition;
    if (position && Number.isFinite(position.latitude) && Number.isFinite(position.longitude)) {
      return [position.latitude, position.longitude];
    }
    return null;
  }

  function currentAccuracy() {
    var position = cg._position || appState().currentPosition;
    return position && Number.isFinite(position.accuracy) ? position.accuracy : null;
  }

  function resolveHotelContext(slug) {
    if (!slug) return null;
    var hoteles = window.RevistaDigital.hoteles;
    var catalog = hoteles && typeof hoteles.getDestinationCatalog === "function"
      ? hoteles.getDestinationCatalog()
      : (window.RevistaDigital.catalog && window.RevistaDigital.catalog.byCountry) || {};
    var found = null;
    Object.keys(catalog || {}).some(function (countrySlug) {
      var country = catalog[countrySlug] || {};
      return (country.destinations || []).some(function (destination) {
        return (destination.hotels || []).some(function (hotel) {
          if (hotel.slug !== slug) return false;
          found = {
            slug: hotel.slug,
            name: hotel.name,
            coordinates: appState().hotelCoordinates ? appState().hotelCoordinates[hotel.name] : null
          };
          return true;
        });
      });
    });
    if (!found) return null;
    return found;
  }

  function ensureContext() {
    if (cg._context && cg._context.slug) return cg._context;
    var slug = (document.body.dataset.hotelSlug || (window.RevistaDigital.appContext || {}).hotelSlug || "").trim();
    var context = resolveHotelContext(slug);
    if (context) cg._context = context;
    return cg._context || null;
  }

  function contextSlug() {
    var context = ensureContext();
    return context && context.slug ? context.slug : "";
  }

  function getTransportDestinations() {
    if (cg._destinations) return cg._destinations;
    var pois = (window.RevistaDigital.guiapa && window.RevistaDigital.guiapa.POIS) || [];
    var list = [];
    var seen = {};
    pois.forEach(function (poi) {
      if (!poi || (poi.category !== "golf" && poi.category !== "restaurante")) return;
      if (!Number.isFinite(poi.lat) || !Number.isFinite(poi.lng)) return;
      if (seen[poi.id]) return;
      seen[poi.id] = true;
      list.push({
        id: poi.id,
        name: poi.name,
        category: poi.category,
        lat: poi.lat,
        lng: poi.lng
      });
    });
    list.sort(function (a, b) {
      if (a.category !== b.category) return a.category === "golf" ? -1 : 1;
      return String(a.name).localeCompare(String(b.name));
    });
    cg._destinations = list.length ? list : FALLBACK_DESTINATIONS.slice();
    return cg._destinations;
  }

  function findDestination(id) {
    var destinations = getTransportDestinations();
    for (var i = 0; i < destinations.length; i += 1) {
      if (destinations[i].id === id) return destinations[i];
    }
    return null;
  }

  function normalizeDestination(value) {
    if (!value) return null;
    var lat = Number(value.lat);
    var lng = Number(value.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return {
      id: value.id || "golf",
      name: value.name || "Destino",
      lat: lat,
      lng: lng
    };
  }

  function currentDestination() {
    var select = document.querySelector("[data-cart-destination]");
    return (select && findDestination(select.value)) || getTransportDestinations()[0] || null;
  }

  cg.getDestinations = function () {
    return getTransportDestinations().map(function (destination) {
      return { id: destination.id, name: destination.name, category: destination.category || "golf", lat: destination.lat, lng: destination.lng };
    });
  };

  function haversine(a, b) {
    var radius = 6371000;
    var rad = Math.PI / 180;
    var dLat = (b[0] - a[0]) * rad;
    var dLng = (b[1] - a[1]) * rad;
    var lat1 = a[0] * rad;
    var lat2 = b[0] * rad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * radius * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function distanceLabel(meters) {
    if (!Number.isFinite(meters)) return "—";
    if (meters < 1000) return Math.max(10, Math.round(meters / 10) * 10) + " m";
    return (meters / 1000).toFixed(1) + " km";
  }

  function etaLabel(seconds) {
    var value = Math.max(0, Number(seconds) || 0);
    if (value <= 20) return "Ahora";
    if (value <= 45) return "Llegando";
    return Math.max(1, Math.ceil(value / 60)) + " min";
  }

  function etaPhrase(seconds) {
    var value = Math.max(0, Number(seconds) || 0);
    if (value <= 20) return "Ahora";
    if (value <= 45) return "Llegando";
    return "Llega en " + Math.max(1, Math.ceil(value / 60)) + " min";
  }

  function getCarts() {
    var slug = contextSlug();
    if (!slug) return [];
    if (!cg._carts[slug]) {
      cg._carts[slug] = CART_FLEET.map(function (cart) {
        return {
          id: cart.id,
          name: cart.name,
          home: cart.base.slice(),
          lat: cart.base[0],
          lng: cart.base[1],
          status: "libre"
        };
      });
    }
    return cg._carts[slug];
  }

  function findCart(id, slug) {
    var carts = slug ? (cg._carts[slug] || []) : getCarts();
    for (var i = 0; i < carts.length; i += 1) {
      if (carts[i].id === id) return carts[i];
    }
    return null;
  }

  function activeRequest() {
    var slug = contextSlug();
    return slug ? cg._requests[slug] || null : null;
  }

  function userLocation() {
    var context = cg._context || {};
    var coordinates = Array.isArray(context.coordinates) ? context.coordinates : [20.7592, -86.9630];
    var current = currentPosition();
    if (current) {
      return {
        key: "gps",
        label: "Tu ubicación actual",
        lat: current[0],
        lng: current[1],
        accuracy: currentAccuracy()
      };
    }
    return {
      key: "hotel",
      label: context.name ? "Ubicación de " + context.name : "Tu hotel",
      lat: coordinates[0],
      lng: coordinates[1],
      accuracy: null
    };
  }

  function renderLocationUI() {
    var position = cg._position || appState().currentPosition;
    var nodes = document.querySelectorAll("[data-cart-location-status]");
    var buttons = document.querySelectorAll("[data-cart-locate]");
    if (!nodes.length && !buttons.length) return;
    var text;
    if (position) {
      text = "Ubicación GPS activa";
      if (Number.isFinite(position.accuracy)) text += " · precisión ±" + Math.round(position.accuracy) + " m";
    } else if (cg._locationState === "requesting") {
      text = "Obteniendo tu ubicación exacta…";
    } else if (cg._locationState === "denied") {
      text = "Ubicación desactivada: actívala para que el carrito llegue a tu posición exacta.";
    } else if (cg._locationState === "unavailable") {
      text = "Este navegador no puede obtener tu ubicación exacta.";
    } else {
      text = "Activa tu ubicación para mostrar exactamente dónde estás.";
    }
    nodes.forEach(function (node) {
      node.textContent = text;
      node.classList.toggle("is-active", Boolean(position));
    });
    buttons.forEach(function (button) { button.hidden = Boolean(position); });
  }

  function applyPosition(position) {
    if (!position ||
        !Number.isFinite(position.latitude) ||
        !Number.isFinite(position.longitude)) return;
    var firstFix = !cg._position;
    cg._position = {
      latitude: position.latitude,
      longitude: position.longitude,
      accuracy: Number.isFinite(position.accuracy) ? position.accuracy : null
    };
    cg._locationState = "granted";
    try { window.RevistaDigital.state.currentPosition = cg._position; } catch (error) { /* ignore */ }
    var request = activeRequest();
    if (request) {
      request.pickup = {
        key: "gps",
        label: "Tu ubicación actual",
        lat: position.latitude,
        lng: position.longitude,
        accuracy: cg._position.accuracy
      };
      request.to = [position.latitude, position.longitude];
    }
    if (firstFix) cg._fitKey = null;
    render();
    syncMap();
    renderLocationUI();
  }

  function startWatch() {
    if (cg._watchId != null || !navigator.geolocation) return;
    cg._locationState = "requesting";
    renderLocationUI();
    try {
      cg._watchId = navigator.geolocation.watchPosition(function (position) {
        applyPosition(position.coords);
      }, function (error) {
        cg._locationState = error && error.code === 1 ? "denied" : "unavailable";
        if (cg._watchId != null) {
          try { navigator.geolocation.clearWatch(cg._watchId); } catch (inner) { /* ignore */ }
          cg._watchId = null;
        }
        renderLocationUI();
        render();
      }, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      });
    } catch (error) {
      cg._locationState = "unavailable";
      cg._watchId = null;
      renderLocationUI();
    }
  }

  function startLocationTracking() {
    // Las vistas previas de la guía usan el carrito como demostración dentro
    // de un iframe. No deben iniciar rastreo GPS ni mostrar un permiso.
    if (document.documentElement.dataset.tourPreview === "true") return;
    if (cg._watchId != null) return;
    if (!navigator.geolocation) {
      cg._locationState = "unavailable";
      renderLocationUI();
      return;
    }
    if (navigator.permissions && typeof navigator.permissions.query === "function") {
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (cg._watchId != null) return;
        if (result.state === "denied") {
          cg._locationState = "denied";
          renderLocationUI();
          return;
        }
        startWatch();
      }).catch(startWatch);
    } else {
      startWatch();
    }
  }

  function stopLocationTracking() {
    if (cg._watchId == null) return;
    try { navigator.geolocation.clearWatch(cg._watchId); } catch (error) { /* ignore */ }
    cg._watchId = null;
  }

  cg.requestLocation = function () {
    if (cg._position && cg._watchId != null) {
      renderLocationUI();
      return;
    }
    startLocationTracking();
  };

  cg.getLocation = function () {
    return cg._position ? {
      latitude: cg._position.latitude,
      longitude: cg._position.longitude,
      accuracy: cg._position.accuracy
    } : null;
  };

  cg.setPreferredHotel = function (value) {
    var slug = typeof value === "string" ? value : (value && value.slug) || "";
    if (!slug) return;
    try { sessionStorage.setItem("clubCartHotel", slug); } catch (error) { /* ignore */ }
  };

  cg.openPage = function (value) {
    cg.setPreferredHotel(value);
    var routes = window.RevistaDigital.routes;
    if (routes && typeof routes.navigate === "function") {
      routes.navigate("/carrito-golf");
    } else {
      window.location.href = "/carrito-golf";
    }
    return true;
  };

  function clearTimers(slug) {
    var request = cg._requests[slug];
    if (request && request.routeAbort) {
      try { request.routeAbort.abort(); } catch (error) { /* ignore */ }
      request.routeAbort = null;
    }
    var timers = cg._timers[slug];
    if (!timers) return;
    if (timers.accept) window.clearTimeout(timers.accept);
    if (timers.ride) window.clearTimeout(timers.ride);
    if (timers.tick) window.clearInterval(timers.tick);
    cg._timers[slug] = null;
  }

  function normalizeRouteCoordinates(origin, destination, coordinates) {
    var list = [];
    function push(point) {
      if (!point) return;
      var lat = Number(point[0]);
      var lng = Number(point[1]);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      var last = list[list.length - 1];
      if (last && Math.abs(last[0] - lat) < 1e-9 && Math.abs(last[1] - lng) < 1e-9) return;
      list.push([lat, lng]);
    }
    push(origin);
    (Array.isArray(coordinates) ? coordinates : []).forEach(push);
    push(destination);
    return list;
  }

  function polylineLength(coordinates) {
    var total = 0;
    for (var i = 0; i < coordinates.length - 1; i += 1) {
      total += haversine(coordinates[i], coordinates[i + 1]);
    }
    return total;
  }

  function pointAlongRoute(coordinates, t) {
    if (!coordinates || !coordinates.length) return null;
    if (coordinates.length === 1) return coordinates[0].slice();
    var total = polylineLength(coordinates);
    if (!total) return coordinates[0].slice();
    var target = total * Math.max(0, Math.min(1, t));
    for (var i = 0; i < coordinates.length - 1; i += 1) {
      var length = haversine(coordinates[i], coordinates[i + 1]);
      if (target <= length) {
        var ratio = length ? target / length : 0;
        return [
          coordinates[i][0] + (coordinates[i + 1][0] - coordinates[i][0]) * ratio,
          coordinates[i][1] + (coordinates[i + 1][1] - coordinates[i][1]) * ratio
        ];
      }
      target -= length;
    }
    return coordinates[coordinates.length - 1].slice();
  }

  function isAbortError(error) {
    return !!error && (error.name === "AbortError" || error.code === 20);
  }

  function isCurrentRoute(slug, requestId, token) {
    var request = cg._requests[slug];
    return !!request && request.id === requestId && request.routeToken === token;
  }

  // --- Solicitud -----------------------------------------------------------

  cg.request = function (options) {
    options = options || {};
    var context = ensureContext();
    if (!context || !context.slug) return null;
    var slug = context.slug;
    clearTimers(slug);
    cg.requestLocation();
    var pickup = userLocation();
    var destination = normalizeDestination(options.destination) ||
      findDestination(options.destinationId) ||
      currentDestination() ||
      getTransportDestinations()[0] ||
      null;
    var carts = getCarts();
    carts.forEach(function (cart) {
      cart.status = "libre";
      cart.lat = cart.home[0];
      cart.lng = cart.home[1];
    });
    var request = {
      id: "CG-" + Math.floor(1000 + Math.random() * 9000),
      slug: slug,
      hotelName: context.name || "",
      pickup: pickup,
      destination: destination,
      guest: String(options.guest || "").trim(),
      room: String(options.room || "").trim(),
      notes: String(options.notes || "").trim(),
      source: options.source || "section",
      status: "searching",
      createdAt: Date.now(),
      cartId: null,
      cartName: null,
      from: null,
      to: [pickup.lat, pickup.lng],
      etaSeconds: null,
      remainingSeconds: null,
      progress: 0
    };
    request.tourDemo = options.tourDemo === true &&
      document.documentElement.dataset.tourPreview === "true";
    cg._requests[slug] = request;
    render();
    syncMap();
    cg._timers[slug] = cg._timers[slug] || {};
    cg._timers[slug].accept = window.setTimeout(function () {
      acceptRequest(slug, request.id);
    }, request.tourDemo ? 350 : ACCEPT_MIN_MS + Math.random() * (ACCEPT_MAX_MS - ACCEPT_MIN_MS));
    return request;
  };

  function acceptRequest(slug, requestId) {
    var request = cg._requests[slug];
    if (!request || request.id !== requestId || request.status !== "searching") return;
    var carts = cg._carts[slug] || [];
    var nearest = null;
    var best = Infinity;
    carts.forEach(function (cart) {
      if (cart.status !== "libre") return;
      var distance = haversine([cart.lat, cart.lng], [request.pickup.lat, request.pickup.lng]);
      if (distance < best) {
        best = distance;
        nearest = cart;
      }
    });
    if (!nearest) nearest = carts[0];
    if (!nearest) return;
    nearest.status = "en_camino";
    request.status = "assigned";
    request.cartId = nearest.id;
    request.cartName = nearest.name;
    request.from = [nearest.lat, nearest.lng];
    request.to = [request.pickup.lat, request.pickup.lng];
    request.distance = Math.round(best * DETOUR_FACTOR);
    request.etaSeconds = Math.max(35, Math.round(request.distance / SPEED_MPS));
    request.remainingSeconds = request.etaSeconds;
    request.progress = 0;
    request.routeCoordinates = null;
    request.routeStatus = "loading";
    if (contextSlug() === slug) {
      render();
      syncMap();
    }
    loadRoute(slug, request.id, "pickup");
  }

  function scheduleRide(slug, requestId) {
    var timers = cg._timers[slug] = cg._timers[slug] || {};
    if (timers.ride) window.clearTimeout(timers.ride);
    timers.ride = window.setTimeout(function () {
      timers.ride = null;
      startRide(slug, requestId);
    }, activeRequest()?.tourDemo ? 350 : 1500);
  }

  function startRide(slug, requestId) {
    var request = cg._requests[slug];
    if (!request || request.id !== requestId || request.status !== "pickup" || !request.destination) return;
    var from = [request.pickup.lat, request.pickup.lng];
    var to = [request.destination.lat, request.destination.lng];
    var distance = haversine(from, to) * DETOUR_FACTOR;
    request.status = "riding";
    request.from = from;
    request.to = to;
    request.distance = Math.round(distance);
    request.etaSeconds = Math.max(45, Math.round(distance / SPEED_MPS));
    request.remainingSeconds = request.etaSeconds;
    request.progress = 0;
    request.routeCoordinates = null;
    request.routeStatus = "loading";
    if (contextSlug() === slug) {
      render();
      syncMap();
    }
    loadRoute(slug, request.id, "ride");
  }

  function startTick(slug, requestId) {
    var timers = cg._timers[slug] = cg._timers[slug] || {};
    if (timers.tick) window.clearInterval(timers.tick);
    timers.tick = window.setInterval(function () {
      var request = cg._requests[slug];
      if (!request || request.id !== requestId ||
          (request.status !== "assigned" && request.status !== "riding")) {
        window.clearInterval(timers.tick);
        timers.tick = null;
        return;
      }
      var phase = request.status;
      var t = Math.max(0, Math.min(1, (Date.now() - request.startedAt) / request.durationMs));
      var routeCoordinates = request.routeCoordinates || [request.from, request.to];
      var position = pointAlongRoute(routeCoordinates, t) || request.from;
      request.progress = t;
      request.cartLat = position[0];
      request.cartLng = position[1];
      request.remainingSeconds = Math.max(0, request.etaSeconds * (1 - t));
      var cart = findCart(request.cartId, request.slug);
      if (cart) {
        cart.lat = position[0];
        cart.lng = position[1];
      }
      if (contextSlug() === slug) {
        updateLive(request);
        updateMapProgress(request);
      }
      if (t >= 1) {
        window.clearInterval(timers.tick);
        timers.tick = null;
        request.progress = 1;
        request.remainingSeconds = 0;
        if (phase === "riding") {
          request.status = "completed";
          if (cart) cart.status = "en destino";
          if (contextSlug() === slug) {
            render();
            syncMap();
          }
        } else if (request.destination) {
          request.status = "pickup";
          if (cart) cart.status = "contigo";
          if (contextSlug() === slug) {
            render();
            syncMap();
          }
          scheduleRide(slug, request.id);
        } else {
          request.status = "arrived";
          if (cart) cart.status = "llegó";
          if (contextSlug() === slug) {
            render();
            syncMap();
          }
        }
      }
    }, TICK_MS);
  }

  function loadRoute(slug, requestId, leg) {
    var request = cg._requests[slug];
    if (!request || request.id !== requestId) return;
    var origin = leg === "ride"
      ? [request.pickup.lat, request.pickup.lng]
      : request.from;
    var destination = leg === "ride" && request.destination
      ? [request.destination.lat, request.destination.lng]
      : [request.pickup.lat, request.pickup.lng];
    if (!origin || !destination) return;

    var token = (request.routeToken || 0) + 1;
    request.routeToken = token;
    request.routeStatus = "loading";
    request.routeCoordinates = null;
    request.routeProvider = "";
    request.routeProfile = "";
    request.routeAccess = false;
    request.routeDirect = false;
    if (request.routeAbort) {
      try { request.routeAbort.abort(); } catch (error) { /* ignore */ }
    }
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    request.routeAbort = controller;

    if (contextSlug() === slug) {
      render();
      syncMap();
    }

    var engine = window.RevistaDigital && window.RevistaDigital.mapas;
    var promise = engine && typeof engine.computeRoute === "function"
      ? engine.computeRoute({
          origin: origin,
          destination: destination,
          signal: controller ? controller.signal : undefined
        })
      : Promise.reject(new Error("Motor de rutas no disponible."));

    promise.then(function (result) {
      if (!isCurrentRoute(slug, requestId, token)) return;
      var coordinates = normalizeRouteCoordinates(origin, destination, result && result.coordinates);
      if (coordinates.length < 3) throw new Error("La ruta no tiene geometría suficiente.");
      applyRoute(slug, requestId, leg, coordinates, result);
    }).catch(function (error) {
      if (isAbortError(error)) return;
      if (!isCurrentRoute(slug, requestId, token)) return;
      applyFallbackRoute(slug, requestId, leg, origin, destination);
    });
  }

  function applyRoute(slug, requestId, leg, coordinates, result) {
    var request = cg._requests[slug];
    if (!request || request.id !== requestId) return;
    var distance = result && typeof result.distance === "number" && result.distance > 0
      ? result.distance
      : polylineLength(coordinates);
    var duration = result && typeof result.duration === "number" && result.duration > 0
      ? result.duration
      : distance / SPEED_MPS;
    request.routeStatus = "ready";
    request.routeProvider = result && result.provider ? result.provider : "";
    request.routeProfile = result && result.profile ? result.profile : "";
    request.routeAccess = !!(result && result.access);
    request.routeDirect = !!(result && result.direct);
    request.routeCoordinates = coordinates;
    request.routeAbort = null;
    request.distance = Math.round(distance);
    request.etaSeconds = Math.max(leg === "ride" ? 45 : 35, Math.round(duration));
    request.remainingSeconds = request.etaSeconds;
    request.progress = 0;
    request.startedAt = Date.now();
    request.durationMs = request.tourDemo
      ? (leg === "ride" ? 4400 : 2000)
      : Math.max(ROUTE_MIN_MS, Math.min(ROUTE_MAX_MS, (request.etaSeconds * 1000) / TIME_SCALE));
    if (contextSlug() === slug) {
      render();
      syncMap();
    }
    startTick(slug, request.id);
  }

  function applyFallbackRoute(slug, requestId, leg, origin, destination) {
    var request = cg._requests[slug];
    if (!request || request.id !== requestId) return;
    var coordinates = normalizeRouteCoordinates(origin, destination, []);
    var distance = haversine(origin, destination) * DETOUR_FACTOR;
    request.routeStatus = "fallback";
    request.routeProvider = "";
    request.routeProfile = "";
    request.routeAccess = false;
    request.routeDirect = false;
    request.routeCoordinates = coordinates;
    request.routeAbort = null;
    request.distance = Math.round(distance);
    request.etaSeconds = Math.max(leg === "ride" ? 45 : 35, Math.round(distance / SPEED_MPS));
    request.remainingSeconds = request.etaSeconds;
    request.progress = 0;
    request.startedAt = Date.now();
    request.durationMs = Math.max(ROUTE_MIN_MS, Math.min(ROUTE_MAX_MS, (request.etaSeconds * 1000) / TIME_SCALE));
    if (contextSlug() === slug) {
      render();
      syncMap();
    }
    startTick(slug, request.id);
  }

  cg.cancel = function () {
    var slug = contextSlug();
    if (!slug) return;
    clearTimers(slug);
    var carts = cg._carts[slug] || [];
    carts.forEach(function (cart) {
      cart.status = "libre";
      cart.lat = cart.home[0];
      cart.lng = cart.home[1];
    });
    delete cg._requests[slug];
    render();
    syncMap();
  };

  cg.getRequest = function () {
    return activeRequest();
  };

  cg.gotoSection = function () {
    if (document.getElementById("hotel-carrito")) {
      var section = document.getElementById("hotel-carrito");
      if (cg._map) {
        try { cg._map.invalidateSize(); } catch (e) { /* ignore */ }
      }
      try {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (e) {
        try { section.scrollIntoView(); } catch (inner) { /* ignore */ }
      }
      return true;
    }
    return cg.openPage();
  };

  // --- Map -----------------------------------------------------------------

  function destroyMap() {
    cg._mapToken += 1;
    if (cg._map) {
      try { cg._map.remove(); } catch (e) { /* ignore */ }
    }
    cg._map = null;
    cg._L = null;
    cg._mapPromise = null;
    cg._markers = {};
    cg._pickupMarker = null;
    cg._destinationMarker = null;
    cg._routeLine = null;
    cg._accuracyCircle = null;
    cg._fitKey = null;
  }

  function syncAccuracyCircle(pickup) {
    if (!cg._map || !cg._L) return;
    var accuracy = pickup && Number.isFinite(pickup.accuracy) ? pickup.accuracy : null;
    if (!accuracy) {
      if (cg._accuracyCircle) {
        try { cg._map.removeLayer(cg._accuracyCircle); } catch (error) { /* ignore */ }
        cg._accuracyCircle = null;
      }
      return;
    }
    if (!cg._accuracyCircle) {
      cg._accuracyCircle = cg._L.circle([pickup.lat, pickup.lng], {
        radius: Math.max(8, accuracy),
        color: "#d4af37",
        weight: 1,
        fillColor: "#d4af37",
        fillOpacity: 0.12
      }).addTo(cg._map);
    } else {
      cg._accuracyCircle.setLatLng([pickup.lat, pickup.lng]);
      cg._accuracyCircle.setRadius(Math.max(8, accuracy));
    }
  }

  function cartIcon(assigned) {
    return cg._L.divIcon({
      className: "cart-map-marker" + (assigned ? " is-assigned" : ""),
      html: '<span class="cart-map-pin">' + CART_SVG + "</span>",
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
  }

  function pickupIcon() {
    return cg._L.divIcon({
      className: "cart-pickup-marker",
      html: '<span class="cart-pickup-pin">Tú</span>',
      iconSize: [78, 30],
      iconAnchor: [39, 15]
    });
  }

  function destinationIcon() {
    return cg._L.divIcon({
      className: "cart-destination-marker",
      html: '<span class="cart-destination-pin"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M6 21V4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M6 4l10 3-10 3z" fill="currentColor"/>' +
        '</svg></span>',
      iconSize: [34, 34],
      iconAnchor: [17, 32]
    });
  }

  function syncDestinationMarker(destination) {
    if (!cg._map || !cg._L) return;
    if (!destination) {
      if (cg._destinationMarker) {
        try { cg._map.removeLayer(cg._destinationMarker); } catch (error) { /* ignore */ }
        cg._destinationMarker = null;
      }
      return;
    }
    if (!cg._destinationMarker) {
      cg._destinationMarker = cg._L.marker([destination.lat, destination.lng], {
        icon: destinationIcon(),
        zIndexOffset: 400
      }).addTo(cg._map).bindTooltip(destination.name);
    } else {
      cg._destinationMarker.setLatLng([destination.lat, destination.lng]);
      cg._destinationMarker.setTooltipContent(destination.name);
    }
  }

  function buildMap() {
    var host = document.getElementById("cartTrackingMap");
    if (!host) return;
    if (!window.RevistaDigital.mapas || typeof window.RevistaDigital.mapas.loadLeaflet !== "function") return;
    var token = ++cg._mapToken;
    cg._mapPromise = window.RevistaDigital.mapas.loadLeaflet().then(function (L) {
      if (token !== cg._mapToken) return null;
      var current = document.getElementById("cartTrackingMap");
      if (!current) return null;
      var context = cg._context || {};
      var center = currentPosition() || (Array.isArray(context.coordinates) ? context.coordinates : [20.7592, -86.9630]);
      var map = L.map(current, {
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: true
      }).setView(center, 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors"
      }).addTo(map);
      cg._map = map;
      cg._L = L;
      cg._markers = {};
      getCarts().forEach(function (cart) {
        var marker = L.marker([cart.lat, cart.lng], {
          icon: cartIcon(false),
          zIndexOffset: 200
        }).addTo(map);
        cg._markers[cart.id] = marker;
      });
      var request = activeRequest();
      var pickup = request ? request.pickup : userLocation();
      cg._pickupMarker = L.marker([pickup.lat, pickup.lng], {
        icon: pickupIcon(),
        zIndexOffset: 500
      }).addTo(map).bindTooltip("Tu ubicación exacta");
      syncAccuracyCircle(pickup);
      cg._fitKey = null;
      syncMap();
      try { map.invalidateSize(); } catch (e) { /* ignore */ }
      return map;
    }).catch(function (error) {
      console.warn("No se pudo cargar el mapa del carrito.", error);
      return null;
    });
  }

  function syncMap() {
    if (!cg._map || !cg._L) return;
    var request = activeRequest();
    var pickup = request ? request.pickup : userLocation();
    if (cg._pickupMarker) cg._pickupMarker.setLatLng([pickup.lat, pickup.lng]);
    syncAccuracyCircle(pickup);
    getCarts().forEach(function (cart) {
      var marker = cg._markers[cart.id];
      if (!marker) return;
      marker.setLatLng([cart.lat, cart.lng]);
      marker.setIcon(cartIcon(!!(request && request.cartId === cart.id)));
    });
    var assigned = request && request.cartId ? findCart(request.cartId, request.slug) : null;
    var destination = request ? request.destination : currentDestination();
    syncDestinationMarker(destination);
    var line = null;
    var dashed = false;
    if (request && request.routeStatus === "loading") {
      line = null;
    } else if (request && request.routeCoordinates &&
        (request.status === "assigned" || request.status === "riding" ||
         request.status === "pickup" || request.status === "completed")) {
      line = request.routeCoordinates;
      dashed = request.routeStatus === "fallback";
    } else if (assigned && request.status === "assigned") {
      line = [[assigned.lat, assigned.lng], [pickup.lat, pickup.lng]];
      dashed = true;
    } else if (assigned && request.status === "riding" && destination) {
      line = [[assigned.lat, assigned.lng], [destination.lat, destination.lng]];
      dashed = true;
    } else if (request && request.status === "pickup" && destination) {
      line = [[pickup.lat, pickup.lng], [destination.lat, destination.lng]];
      dashed = true;
    } else if (request && request.status === "completed" && destination) {
      line = [[pickup.lat, pickup.lng], [destination.lat, destination.lng]];
      dashed = true;
    }
    if (line) {
      if (!cg._routeLine) {
        cg._routeLine = cg._L.polyline(line, {
          color: dashed ? "#8a7c6e" : "#2e8b57",
          weight: dashed ? 4 : 5,
          dashArray: dashed ? "6 8" : "",
          opacity: dashed ? 0.75 : 0.95
        }).addTo(cg._map);
      } else {
        cg._routeLine.setLatLngs(line);
        cg._routeLine.setStyle({
          color: dashed ? "#8a7c6e" : "#2e8b57",
          weight: dashed ? 4 : 5,
          dashArray: dashed ? "6 8" : "",
          opacity: dashed ? 0.75 : 0.95
        });
      }
    } else if (cg._routeLine) {
      try { cg._map.removeLayer(cg._routeLine); } catch (e) { /* ignore */ }
      cg._routeLine = null;
    }
    updateMapEta(request);
    var fitKey = (cg._context ? cg._context.slug : "") + ":" + (request ? request.id : "idle") +
      ":" + (destination ? destination.id : "none") + ":" + (request ? request.status || "" : "idle") +
      ":" + (request ? request.routeStatus || "" : "idle");
    if (cg._fitKey !== fitKey) {
      cg._fitKey = fitKey;
      var points;
      if (request && request.tourDemo) {
        points = request.routeCoordinates ? request.routeCoordinates.slice() : [];
        var activeTarget = request.status === "riding" && destination
          ? [destination.lat, destination.lng]
          : [pickup.lat, pickup.lng];
        if (assigned) points.push([assigned.lat, assigned.lng]);
        points.push(activeTarget);
        if (request.from) points.push(request.from);
      } else {
        points = getCarts().map(function (cart) { return [cart.lat, cart.lng]; });
        points.push([pickup.lat, pickup.lng]);
        if (destination) points.push([destination.lat, destination.lng]);
        if (request && request.routeCoordinates) points = points.concat(request.routeCoordinates);
      }
      try {
        cg._map.fitBounds(cg._L.latLngBounds(points).pad(request && request.tourDemo ? 0.2 : 0.28), { animate: false });
      } catch (e) { /* ignore */ }
    }
  }

  cg.refreshMapLayout = function () {
    if (!cg._map) return;
    try { cg._map.invalidateSize({ pan: false, animate: false }); } catch (error) { /* ignore */ }
    cg._fitKey = null;
    syncMap();
  };

  function updateMapProgress(request) {
    if (!cg._map || !cg._L || !request) return;
    if (request.status !== "assigned" && request.status !== "riding") return;
    if (!cg._context || request.slug !== cg._context.slug) return;
    var cart = findCart(request.cartId, request.slug);
    if (!cart) return;
    var target = request.status === "riding" && request.destination
      ? [request.destination.lat, request.destination.lng]
      : [request.pickup.lat, request.pickup.lng];
    var marker = cg._markers[cart.id];
    if (marker) marker.setLatLng([cart.lat, cart.lng]);
    if (cg._routeLine && request.routeStatus === "fallback") {
      cg._routeLine.setLatLngs([[cart.lat, cart.lng], target]);
    }
    updateMapEta(request);
  }

  function routeMeta(request) {
    if (request.routeStatus === "fallback") return " · ruta aproximada";
    if (request.routeDirect) return " · ruta interna directa";
    if (request.routeAccess) return " · acceso directo";
    return " · ruta por calles";
  }

  function updateMapEta(request) {
    var el = document.querySelector("[data-cart-eta]");
    if (!el) return;
    if (request && cg._context && request.slug !== cg._context.slug) return;
    if (!request) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }
    el.hidden = false;
    if (request.status === "searching") {
      el.innerHTML = "<strong>Buscando carrito…</strong><span>Calculando el más cercano</span>";
    } else if (request.status === "assigned") {
      if (request.routeStatus === "loading") {
        el.innerHTML = "<strong>" + escapeHtml(request.cartName) + "</strong><span>Trazando la ruta por las calles…</span>";
      } else {
        el.innerHTML = "<strong>" + escapeHtml(request.cartName) + "</strong><span>" +
          escapeHtml(etaPhrase(request.remainingSeconds)) +
          routeMeta(request) + "</span>";
      }
    } else if (request.status === "pickup") {
      el.innerHTML = "<strong>Carrito en tu ubicación</strong><span>Te lleva a " +
        escapeHtml(request.destination ? request.destination.name : "tu destino") + "</span>";
    } else if (request.status === "riding") {
      if (request.routeStatus === "loading") {
        el.innerHTML = "<strong>En camino a " +
          escapeHtml(request.destination ? request.destination.name : "tu destino") +
          "</strong><span>Trazando la ruta por las calles…</span>";
      } else {
        el.innerHTML = "<strong>En camino a " +
          escapeHtml(request.destination ? request.destination.name : "tu destino") + "</strong><span>" +
          escapeHtml(etaPhrase(request.remainingSeconds)) +
          routeMeta(request) + "</span>";
      }
    } else if (request.status === "completed") {
      el.innerHTML = "<strong>Llegaste a " +
        escapeHtml(request.destination ? request.destination.name : "tu destino") + "</strong><span>Disfruta tu visita</span>";
    } else if (request.status === "arrived") {
      el.innerHTML = "<strong>Carrito en tu ubicación</strong><span>" + escapeHtml(request.pickup.label) + "</span>";
    }
  }

  // --- Renderizado ---------------------------------------------------------

  function statusMarkup(request) {
    if (!request) {
      return '<div class="cart-status-card is-idle">' +
        '<span class="cart-status-glyph">' + CART_SVG + "</span>" +
        '<div><p class="cart-status-kicker">SIN SOLICITUD ACTIVA</p>' +
        "<h3>¿Necesitas moverte por el complejo?</h3>" +
        "<p>Solicita un carrito y verás en el mapa el más cercano viniendo hacia tu ubicación, con el tiempo estimado de llegada.</p>" +
        "</div></div>";
    }
    var destinationName = request.destination ? request.destination.name : "tu destino";
    if (request.status === "searching") {
      return '<div class="cart-status-card is-searching">' +
        '<p class="cart-status-kicker">SE SOLICITÓ EL CARRITO</p>' +
        "<h3>Buscando el carrito más cercano…</h3>" +
        "<p>El carrito va hacia <strong>" + escapeHtml(request.pickup.label) + "</strong> y después te lleva a <strong>" +
        escapeHtml(destinationName) + "</strong>. Te avisaremos en cuanto uno acepte la solicitud.</p>" +
        '<span class="cart-searching-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<button type="button" class="cart-cancel" data-cart-cancel>Cancelar solicitud</button>' +
        "</div>";
    }
    if (request.status === "assigned") {
      if (request.routeStatus === "loading") {
        return '<div class="cart-status-card is-assigned">' +
          '<p class="cart-status-kicker">SOLICITUD ACEPTADA</p>' +
          "<h3>" + escapeHtml(request.cartName) + " va a por ti</h3>" +
          "<p>Trazando la ruta por las calles del complejo hasta <strong>" +
          escapeHtml(request.pickup.label) + "</strong>.</p>" +
          '<span class="cart-searching-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) +
          (request.guest ? " · " + escapeHtml(request.guest) : "") + "</p>" +
          '<button type="button" class="cart-cancel" data-cart-cancel>Cancelar solicitud</button>' +
          "</div>";
      }
      return '<div class="cart-status-card is-assigned">' +
        '<p class="cart-status-kicker">SOLICITUD ACEPTADA</p>' +
        "<h3>" + escapeHtml(request.cartName) + " va a por ti</h3>" +
        "<p>Va hacia <strong>" + escapeHtml(request.pickup.label) + "</strong>. Después te llevará a <strong>" +
        escapeHtml(destinationName) + "</strong>.</p>" +
        '<div class="cart-eta-big"><span data-cart-live-eta>' + escapeHtml(etaLabel(request.remainingSeconds)) +
        "</span><small>tiempo estimado</small></div>" +
        '<div class="cart-progress" role="progressbar" aria-label="Progreso del carrito"><span data-cart-progress style="width:' +
        Math.round((request.progress || 0) * 100) + '%"></span></div>' +
        '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) +
        (request.guest ? " · " + escapeHtml(request.guest) : "") +
        routeMeta(request) + "</p>" +
        '<button type="button" class="cart-cancel" data-cart-cancel>Cancelar solicitud</button>' +
        "</div>";
    }
    if (request.status === "pickup") {
      return '<div class="cart-status-card is-arrived">' +
        '<p class="cart-status-kicker">CARRITO EN TU UBICACIÓN</p>' +
        "<h3>" + escapeHtml(request.cartName) + " ya llegó</h3>" +
        "<p>Ya está contigo en <strong>" + escapeHtml(request.pickup.label) + "</strong>. En un momento arranca hacia <strong>" +
        escapeHtml(destinationName) + "</strong>.</p>" +
        '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) + "</p>" +
        '<button type="button" class="cart-cancel" data-cart-cancel>Cancelar viaje</button>' +
        "</div>";
    }
    if (request.status === "riding") {
      if (request.routeStatus === "loading") {
        return '<div class="cart-status-card is-assigned">' +
          '<p class="cart-status-kicker">EN RUTA A TU DESTINO</p>' +
          "<h3>Te llevamos a " + escapeHtml(destinationName) + "</h3>" +
          "<p>Trazando la ruta por las calles del complejo desde <strong>" +
          escapeHtml(request.pickup.label) + "</strong>.</p>" +
          '<span class="cart-searching-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) + "</p>" +
          '<button type="button" class="cart-cancel" data-cart-cancel>Cancelar viaje</button>' +
          "</div>";
      }
      return '<div class="cart-status-card is-assigned">' +
        '<p class="cart-status-kicker">EN RUTA A TU DESTINO</p>' +
        "<h3>Te llevamos a " + escapeHtml(destinationName) + "</h3>" +
        "<p>Recogida en <strong>" + escapeHtml(request.pickup.label) + "</strong>.</p>" +
        '<div class="cart-eta-big"><span data-cart-live-eta>' + escapeHtml(etaLabel(request.remainingSeconds)) +
        "</span><small>tiempo estimado</small></div>" +
        '<div class="cart-progress" role="progressbar" aria-label="Progreso del viaje"><span data-cart-progress style="width:' +
        Math.round((request.progress || 0) * 100) + '%"></span></div>' +
        '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) +
        (request.distance ? " · " + escapeHtml(String(request.distance)) + " m" : "") +
        routeMeta(request) + "</p>" +
        '<button type="button" class="cart-cancel" data-cart-cancel>Cancelar viaje</button>' +
        "</div>";
    }
    if (request.status === "completed") {
      return '<div class="cart-status-card is-arrived">' +
        '<p class="cart-status-kicker">LLEGASTE A TU DESTINO</p>' +
        "<h3>" + escapeHtml(destinationName) + "</h3>" +
        "<p>El carrito te dejó en tu destino. Que disfrutes tu visita.</p>" +
        '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) +
        (request.guest ? " · " + escapeHtml(request.guest) : "") + "</p>" +
        '<button type="button" class="cart-cancel" data-cart-cancel>Pedir otro carrito</button>' +
        "</div>";
    }
    return '<div class="cart-status-card is-arrived">' +
      '<p class="cart-status-kicker">CARRITO EN TU UBICACIÓN</p>' +
      "<h3>" + escapeHtml(request.cartName) + " ya llegó</h3>" +
      "<p>Ya está contigo en <strong>" + escapeHtml(request.pickup.label) + "</strong>.</p>" +
      '<p class="cart-status-meta">Solicitud ' + escapeHtml(request.id) + "</p>" +
      '<button type="button" class="cart-cancel" data-cart-cancel>Hacer otra solicitud</button>' +
      "</div>";
  }

  function nearbyMarkup(request) {
    var carts = getCarts();
    if (!carts.length) return "";
    var pickup = request ? request.pickup : userLocation();
    var sorted = carts.slice().sort(function (a, b) {
      return haversine([a.lat, a.lng], [pickup.lat, pickup.lng]) -
        haversine([b.lat, b.lng], [pickup.lat, pickup.lng]);
    });
    var free = carts.filter(function (cart) { return cart.status === "libre"; }).length;
    var items = sorted.slice(0, 4).map(function (cart) {
      var distance = haversine([cart.lat, cart.lng], [pickup.lat, pickup.lng]);
      var assigned = !!(request && request.cartId === cart.id);
      var label = assigned
        ? (request.status === "completed" ? "En destino"
          : request.status === "riding" ? "En ruta"
          : request.status === "pickup" || request.status === "arrived" ? "Contigo"
          : "En camino")
        : "Disponible";
      return '<li class="cart-nearby-item' + (assigned ? " is-assigned" : "") + '">' +
        '<span class="cart-nearby-name">' + escapeHtml(cart.name) + "</span>" +
        '<span class="cart-nearby-meta">' + escapeHtml(distanceLabel(distance)) + " · " + escapeHtml(label) + "</span>" +
        "</li>";
    }).join("");
    return '<div class="cart-nearby-head"><h3>Carritos cerca de ti</h3><span>' +
      escapeHtml(free) + (free === 1 ? " disponible" : " disponibles") + "</span></div>" +
      '<ul class="cart-nearby-list">' + items + "</ul>" +
      '<p class="cart-nearby-note">Posiciones y tiempos simulados para mostrar el servicio.</p>';
  }

  function syncDestinationOptions(section) {
    var select = section.querySelector("[data-cart-destination]");
    if (!select) return;
    var destinations = getTransportDestinations();
    var current = select.value;
    var groups = [
      { label: "Golf", items: destinations.filter(function (item) { return item.category === "golf"; }) },
      { label: "Restaurantes", items: destinations.filter(function (item) { return item.category === "restaurante"; }) }
    ];
    select.innerHTML = groups.filter(function (group) {
      return group.items.length > 0;
    }).map(function (group) {
      return '<optgroup label="' + group.label + '">' +
        group.items.map(function (destination) {
          return '<option value="' + escapeHtml(destination.id) + '">' +
            escapeHtml(destination.name) + "</option>";
        }).join("") +
        "</optgroup>";
    }).join("");
    if (current && findDestination(current)) {
      select.value = current;
    } else if (destinations[0]) {
      select.value = destinations[0].id;
    }
  }

  function render() {
    var section = document.getElementById("hotel-carrito");
    if (!section) return;
    var request = activeRequest();
    var form = section.querySelector("[data-cart-form]");
    var status = section.querySelector("[data-cart-status]");
    var nearby = section.querySelector("[data-cart-nearby]");
    syncDestinationOptions(section);
    if (form) form.hidden = !!request;
    if (status) status.innerHTML = statusMarkup(request);
    if (nearby) nearby.innerHTML = nearbyMarkup(request);
    updateMapEta(request);
    renderLocationUI();
  }

  function updateLive(request) {
    if (!cg._context || request.slug !== cg._context.slug) return;
    var eta = document.querySelector("[data-cart-live-eta]");
    if (eta) eta.textContent = etaLabel(request.remainingSeconds);
    var progress = document.querySelector("[data-cart-progress]");
    if (progress) progress.style.width = Math.round((request.progress || 0) * 100) + "%";
  }

  function onFormSubmit(event) {
    var form = event.target.closest("[data-cart-form]");
    if (!form) return;
    event.preventDefault();
    if (activeRequest()) return;
    var guest = form.querySelector("[name='nombre']");
    var room = form.querySelector("[name='habitacion']");
    var notes = form.querySelector("[name='notas']");
    var destination = form.querySelector("[data-cart-destination]");
    cg.request({
      guest: guest ? guest.value : "",
      room: room ? room.value : "",
      notes: notes ? notes.value : "",
      destinationId: destination ? destination.value : "",
      source: "section",
      tourDemo: document.documentElement.dataset.tourPreview === "true"
    });
  }

  function onSectionClick(event) {
    if (event.target.closest("[data-cart-locate]")) {
      cg.requestLocation();
      return;
    }
    if (event.target.closest("[data-cart-cancel]")) cg.cancel();
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-cart-hotel]");
    if (trigger) cg.setPreferredHotel(trigger.getAttribute("data-cart-hotel"));
  }, true);

  document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-cart-locate]")) return;
    event.preventDefault();
    cg.requestLocation();
  });

  cg.init = function (root, context) {
    var section = root && typeof root.querySelector === "function"
      ? root.querySelector("#hotel-carrito")
      : document.getElementById("hotel-carrito");
    if (!section) return false;
    cg._context = {
      slug: context && context.slug ? context.slug : "",
      name: context && context.name ? context.name : "",
      coordinates: context && Array.isArray(context.coordinates) ? context.coordinates : null
    };
    if (!cg._context.slug) return false;
    cg.setPreferredHotel(cg._context.slug);
    destroyMap();
    if (!section.getAttribute("data-cart-bound")) {
      section.setAttribute("data-cart-bound", "1");
      section.addEventListener("submit", onFormSubmit);
      section.addEventListener("click", onSectionClick);
      section.addEventListener("change", function (event) {
        if (event.target.closest("[data-cart-destination]")) syncMap();
      });
    }
    startLocationTracking();
    render();
    buildMap();
    return true;
  };

  cg.teardown = function () {
    stopLocationTracking();
    destroyMap();
    cg._context = null;
  };
})();
