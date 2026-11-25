(function () {
  window.RevistaDigital = window.RevistaDigital || {};

  const translations = {
    es: {
      siteTitle: "Iberostar | Destinos y hoteles",
      brandDestinations: "Destinos",
      continue: "Continuar",
      gateNote: "Después podrá cambiarlo desde el menú.",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      closeSearch: "Cerrar búsqueda",
      navDestinos: "Destinos",
      navMexico: "México",
      navJamaica: "Jamaica",
      navDominican: "República Dominicana",
      navBrazil: "Brasil",
      navLocation: "Usar mi ubicación",
      navExplore: "Explorar",
      navSearch: "Buscar",

      menuWorldMap: "Mapamundi",
      menuWorldMapD3: "Planisferio Interactivo (D3)",
      menuComplexMap: "Mapa del complejo Playa Paraíso",
      menuWorkspace: "Workspace",
      menuVideos: "Videos",
      menu360: "Contenido 360°",
      menuRestaurants: "Restaurantes",
      menuComplex: "Iberostar Playa Paraíso",
      menuGuia: "Guía interactiva",
      menuTransport: "Transporte",

      prevPage: "Página anterior",
      nextPage: "Página siguiente",
      home: "Inicio",
      viewHotel: "Ver ficha",
      viewDetails: "Ver detalles",
      back: "Volver",
      close: "Cerrar",
      searchPlaceholder: "Buscar por hotel, destino, categoría...",
      allFilters: "Todos",
      resultsCount: "hoteles encontrados",
      noResults: "No se encontraron hoteles.",
      exploreSection: "Explora secciones y servicios",
      rooms: "Habitaciones",
      pools: "Piscinas",
      restaurants: "Restaurantes",
      experiences: "Experiencias",
      locationStatusInitial: 'Use "Usar mi ubicación" para encontrar el hotel cercano o calcular una ruta.',
      mapTouchActivate: "Toque para mover el mapa",
      mapTouchLock: "Bloquear mapa",
      mapFullscreen: "Pantalla completa",
      mapExitFullscreen: "Salir del mapa",
      guideExpand: "Ampliar",
      guideExitExpand: "Volver",
      d3WorldMapNotice: "Explore la distribución global de la cadena Iberostar en nuestro mapa mundial interactivo.",
      openD3WorldMap: "Abrir Planisferio Interactivo",
      searchHotelsHeading: "Explorar catálogo de hoteles",
      searchFilterBrand: "Marca:",
      searchFilterCountry: "País:",
      cancelRoute: "Cancelar ruta",
      bookTable: "Reservar mesa",
      searchClose: "Cerrar búsqueda",
      searchExit: "ESC para salir",
      hotelIndustry: "Hotelería",
      previousCountry: "Ver país anterior",
      nextCountry: "Ver siguiente país",
      carouselRegion: "Carrusel de imágenes",
      carousel: "carrusel",
      carouselSelectImage: "Seleccionar imagen",
      carouselShowImage1: "Mostrar imagen 1",
      carouselShowImage2: "Mostrar imagen 2",
      carouselShowImage3: "Mostrar imagen 3",
      carouselShowImage4: "Mostrar imagen 4",
      carouselShowImage5: "Mostrar imagen 5",
      carouselShowImage6: "Mostrar imagen 6",
      languageGateTitle: "Elija su idioma",
      languageGateCountry: "Sugerencia según el idioma de su dispositivo",
      languageGateNote: "Después podrá cambiarlo desde el menú.",
      navBackToDestinations: "Volver a destinos",
      navBackToHome: "Volver al inicio",
      sectionContenido360: "Contenido 360°",
      sectionVideos: "Videos",
      sectionWorkspace: "Workspace",
      sectionMapaHoteles: "Mapa general de hoteles",
      areaAdministrativa: "Área administrativa",
      adminEmail: "Email",
      adminPassword: "Contraseña",
      adminEntrar: "",

      breakfast: "Desayuno",
      lunch: "Comida",
      dinner: "Cena",
      late: "Barra nocturna",
      hours: "Horario",
      spa: "Spa",
      golf: "Golf",
      piscina: "Piscina",
      cafeteria: "Cafetería",
      bar: "Bar",
      especialidad: "Especialidad",
      solo_cena: "Solo cena",
      buffet: "Buffet",
      buffet_marina: "La Marina",
      vestimenta: "Vestimenta",
      dressCode: "Código de vestimenta",
      reservas: "Reservas",
      reservation: "Reservación",
      especialidades: "Especialidades",
      signatureDishes: "Platos especiales",
      carta: "Carta",
      menu: "Menú",
      horario: "Horario",
      horarioTexto: "Horario",
      hotel: "Hotel",
      tipo: "Tipo",
      cocina: "Cocina",
      cuisine: "Cocina",
      cartaEn: "Carta",
      footerLead: "Pensado para brindar el mejor trato, servicios personalizados y un tratamiento extraordinario alrededor de cualquiera de nuestros múltiples destinos alrededor del mundo.",
      footerNote: "Nuestro principal objetivo es hacer de cada experiencia un viaje único, un recuerdo inolvidable, una estancia inigualable.",
      footerLegal: "Nota legal",
      footerPrivacy: "Política de privacidad",
      footerLinksLabel: "Enlaces de interés"
    },

    en: {
      siteTitle: "Iberostar | Destinations and hotels",
      brandDestinations: "Destinations",
      continue: "Continue",
      gateNote: "You can change it from the menu later.",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      closeSearch: "Close search",
      navDestinos: "Destinations",
      navMexico: "Mexico",
      navJamaica: "Jamaica",
      navDominican: "Dominican Republic",
      navBrazil: "Brazil",
      navLocation: "Use my location",
      navExplore: "Explore",
      navSearch: "Search",

      menuWorldMap: "World Map",
      menuWorldMapD3: "Interactive D3 Globe",
      menuComplexMap: "Complex Map",
      menuWorkspace: "Workspace",
      menuVideos: "Videos",
      menu360: "360° Content",
      menuRestaurants: "Restaurants",
      menuComplex: "Iberostar Playa Paraíso",
      menuGuia: "Interactive Guide",
      menuTransport: "Transportation",

      prevPage: "Previous page",
      nextPage: "Next page",
      home: "Home",
      viewHotel: "View hotel sheet",
      viewDetails: "View details",
      back: "Back",
      close: "Close",
      searchPlaceholder: "Search by hotel, destination, category...",
      allFilters: "All",
      resultsCount: "hotels found",
      noResults: "No hotels found.",
      exploreSection: "Explore sections and services",
      rooms: "Rooms",
      pools: "Pools",
      restaurants: "Restaurants",
      experiences: "Experiences",
      locationStatusInitial: 'Use "Use my location" to find the nearby hotel or calculate a route.',
      mapTouchActivate: "Touch to move the map",
      mapTouchLock: "Lock map",
      mapFullscreen: "Fullscreen",
      mapExitFullscreen: "Exit fullscreen",
      guideExpand: "Expand",
      guideExitExpand: "Exit expand",
      d3WorldMapNotice: "Explore the global distribution of the Iberostar chain on our interactive world map.",
      openD3WorldMap: "Open Interactive D3 Globe",
      searchHotelsHeading: "Explore hotel catalog",
      searchFilterBrand: "Brand:",
      searchFilterCountry: "Country:",
      cancelRoute: "Cancel route",
      bookTable: "Book a table",
      searchClose: "Close search",
      searchExit: "ESC to exit",
      hotelIndustry: "Hospitality",
      previousCountry: "View previous country",
      nextCountry: "View next country",
      carouselRegion: "Image carousel",
      carousel: "carousel",
      carouselSelectImage: "Select image",
      carouselShowImage1: "Show image 1",
      carouselShowImage2: "Show image 2",
      carouselShowImage3: "Show image 3",
      carouselShowImage4: "Show image 4",
      carouselShowImage5: "Show image 5",
      carouselShowImage6: "Show image 6",
      languageGateTitle: "Choose your language",
      languageGateCountry: "Suggestion based on your device's language",
      languageGateNote: "You can change it from the menu later.",
      navBackToDestinations: "Back to destinations",
      navBackToHome: "Back to home",
      sectionContenido360: "360° Content",
      sectionVideos: "Videos",
      sectionWorkspace: "Workspace",
      sectionMapaHoteles: "Hotel map",
      areaAdministrativa: "Administrative area",
      adminEmail: "Email",
      adminPassword: "Password",
      adminEntrer: "Enter",
      cargar: "Load",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      late: "Bar",
      hours: "Hours",
      spa: "Spa",
      golf: "Golf",
      piscina: "Pool",
      cafeteria: "Cafeteria",
      bar: "Bar",
      especialidad: "Specialty",
      solo_cena: "Dinner only",
      buffet: "Buffet",
      buffet_marina: "La Marina",
      vestimenta: "Dress code",
      dressCode: "Dress code",
      reservas: "Reservations",
      reservation: "Reservation",
      especialidades: "Specialties",
      signatureDishes: "Signature dishes",
      carta: "Menu",
      menu: "Menu",
      horario: "Hours",
      horarioTexto: "Hours",
      hotel: "Hotel",
      tipo: "Type",
      cocina: "Cuisine",
      cuisine: "Cuisine",
      cartaEn: "Menu",

      // Specific translations for the user's requested items
      hotelMayaDescription: "Iberostar Selection Paraíso Maya luxury resort",
      complexMap: "Complex Map",
      transportation: "Transportation",
      ubicarme: "Locate Me",
      dondeVasEnComplejo: "Where are you going in the complex?",
      pideTuCarrito: "Request your cart",
      tuNombre: "Your name",
      tuUbicacion: "Your location",
      tuDestino: "Your destination",
      // Categories
      bars: "Bars",
      beach: "Beach",
      shopping: "Shopping",
      kids: "Kids",
      conventions: "Conventions",
      discotheque: "Discotheque",
      activitiesInstruction: "Select activities to explore",
      // Additional common terms
      seeMore: "See more",
      closeModal: "Close modal",
      loading: "Loading",
      error: "Error",
      footerLead: "Designed to provide the best service, personalized attention and an extraordinary experience in any of our many destinations around the world.",
      footerNote: "Our main goal is to make every experience a unique journey, an unforgettable memory, an incomparable stay.",
      footerLegal: "Legal notice",
      footerPrivacy: "Privacy policy",
      footerLinksLabel: "Links of interest"
    }
  };

  let currentLang = "es";
  try { currentLang = localStorage.getItem("revista_lang") || "es"; } catch (e) { currentLang = "es"; }
  if (!translations[currentLang]) currentLang = "es";

  function t(key, defaultVal = "") {
    return translations[currentLang]?.[key] || defaultVal || key;
  }

  function getLang() {
    return currentLang;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = t(key);
      if (text) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const text = t(key);
      if (text) el.setAttribute("aria-label", text);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = t(key);
      if (text) el.placeholder = text;
    });

    document.querySelectorAll("[data-i18n-roledescription]").forEach((el) => {
      const key = el.getAttribute("data-i18n-roledescription");
      const text = t(key);
      if (text) el.setAttribute("aria-roledescription", text);
    });

    const langToggleBtn = document.getElementById("langToggleBtn");
    if (langToggleBtn) {
      langToggleBtn.textContent = currentLang === "es" ? "🌐 EN" : "🌐 ES";
      langToggleBtn.setAttribute("title", currentLang === "es" ? "Switch to English" : "Cambiar a Español");
    }

    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: currentLang } }));
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    try { localStorage.setItem("revista_lang", lang); } catch (e) { /* ignore */ }
    applyTranslations();
  }

  function toggleLanguage() {
    setLanguage(currentLang === "es" ? "en" : "es");
  }

  function wireLanguageToggle() {
    const langToggleBtn = document.getElementById("langToggleBtn");
    if (!langToggleBtn || langToggleBtn.dataset.i18nWired === "true") return;
    langToggleBtn.dataset.i18nWired = "true";
    langToggleBtn.addEventListener("click", toggleLanguage);
  }

  wireLanguageToggle();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else {
    applyTranslations();
  }

  window.RevistaDigital.i18n = {
    t,
    getLang,
    setLanguage,
    toggleLanguage,
    applyTranslations,
    translations
  };
})();
