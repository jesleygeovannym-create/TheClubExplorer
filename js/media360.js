(function () {
  window.RevistaDigital = window.RevistaDigital || {};
  const media360 = window.RevistaDigital.media360 || {};
  const PLAYA_PARAISO_HOTELS = [
    "Iberostar Paraíso del Mar",
    "Iberostar Paraíso Maya",
    "Iberostar Paraíso Lindo",
    "Iberostar Paraíso Beach",
    "Iberostar Paraíso JOIA"
  ];
  const ZONE_ICONS = {
    piscinas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5c1.8 0 1.8 1.3 3.6 1.3s1.8-1.3 3.6-1.3 1.8 1.3 3.6 1.3 1.8-1.3 3.6-1.3 1.8 1.3 3.6 1.3"/><path d="M3 13.5c1.8 0 1.8 1.3 3.6 1.3s1.8-1.3 3.6-1.3 1.8 1.3 3.6 1.3 1.8-1.3 3.6-1.3 1.8 1.3 3.6 1.3"/><path d="M3 18.5c1.8 0 1.8 1.3 3.6 1.3s1.8-1.3 3.6-1.3 1.8 1.3 3.6 1.3 1.8-1.3 3.6-1.3 1.8 1.3 3.6 1.3"/></svg>',
    exteriores: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-7"/><path d="M12 14c-3.4 0-5.5-2.1-5.5-5.5C10 8.5 12 10.6 12 14Z"/><path d="M12 14c3.4 0 5.5-2.1 5.5-5.5C14 8.5 12 10.6 12 14Z"/><path d="M8 21h8"/></svg>',
    playa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"/><path d="M4 10a8 8 0 0 1 16 0Z"/><path d="M4 10h16"/></svg>',
    restaurantes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3v7"/><path d="M5 3v4a2 2 0 0 0 4 0V3"/><path d="M7 10v11"/><path d="M17 3v18"/><path d="M17 3c-2 0-3 1.8-3 4v4h3"/></svg>'
  };
  const ZONES = [
    { key: "piscinas", label: "Piscinas", description: "Albercas y zonas de descanso", icon: ZONE_ICONS.piscinas },
    { key: "exteriores", label: "Exteriores", description: "Jardines y arquitectura", icon: ZONE_ICONS.exteriores },
    { key: "playa", label: "Playa", description: "Arena y mar Caribe", icon: ZONE_ICONS.playa },
    { key: "restaurantes", label: "Restaurantes", description: "Gastronomía y ambientes", icon: ZONE_ICONS.restaurantes }
  ];
  const CHEVRON_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  const OPEN_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';

  let selectedHotel = PLAYA_PARAISO_HOTELS[0];

  function getHotelImage(hotel) {
    if (hotel.includes("JOIA")) return "src/JOIA1.jpg";
    if (hotel.includes("Lindo")) return "src/ParaisoLindo1.jpg";
    if (hotel.includes("Maya")) return "src/paraisoMaya 1.jpg";
    if (hotel.includes("Beach")) return "src/paraisoBeach1.jpg";
    return "src/ParaisoDelMar 1.jpg";
  }

  function openPublicPanorama(hotelName, zoneKey, label) {
    const pannellum = window.RevistaDigital.pannellum360;
    if (pannellum?.openZoneMenu) {
      const options = pannellum.getZoneMenuOptions?.(hotelName, zoneKey) || [];
      if (options.length > 1) {
        pannellum.openZoneMenu(hotelName, zoneKey, label);
        return;
      }
    }
    if (pannellum?.open) {
      pannellum.open(hotelName, zoneKey, label);
      return;
    }

    alert(`${hotelName} · ${label}: la vista 360° está disponible en la galería del complejo.`);
  }

  function render360() {
    return `
      <div class="spread media-spread media360-spread">
        <div class="media360-content">
          <header class="media360-hero">
            <div class="media360-heading">
              <span class="media360-kicker">Recorrido virtual</span>
              <h1>Explora Playa Paraíso en 360°</h1>
              <p class="media360-hero-copy">Cinco hoteles, cuatro zonas y una vista inmersiva. Elige un hotel y abre su recorrido.</p>
            </div>
            <div class="media360-hint" aria-hidden="true">
              <span class="media360-orbit">360°</span>
              <span class="media360-hint-copy">
                <strong>Arrastra para mirar</strong>
                <small>5 hoteles · 20 vistas inmersivas</small>
              </span>
            </div>
          </header>

          <div class="media360-layout" id="media360Grid">
            <aside class="media360-hotels">
              <div class="media360-hotels-head">
                <span class="media360-label">1. Elige tu hotel</span>
                <span class="media360-count">5 hoteles</span>
              </div>
              <div class="media360-hotel-list" id="media360HotelList"></div>
              <span class="media360-swipe-hint">Desliza para ver todos los hoteles</span>
            </aside>
            <section class="media360-stage" id="media360Stage" aria-live="polite"></section>
          </div>
        </div>
      </div>
    `;
  }

  function renderHotelList(list) {
    list.innerHTML = PLAYA_PARAISO_HOTELS.map((hotel) => `
      <button type="button" class="media360-hotel" data-360-select="${hotel}" aria-pressed="${hotel === selectedHotel}" aria-label="Ver ${hotel} en 360°">
        <span class="media360-hotel-thumb">
          ${RI.img(getHotelImage(hotel), { cls: "media360-hotel-img", alt: "", sizes: "64px" })}
        </span>
        <span class="media360-hotel-copy">
          <span class="media360-hotel-name">${hotel}</span>
          <span class="media360-hotel-zones">4 zonas 360°</span>
        </span>
        <span class="media360-hotel-arrow" aria-hidden="true">${CHEVRON_ICON}</span>
      </button>
    `).join("");
  }

  function renderStage(stage) {
    const hotel = selectedHotel;
    const hotelNumber = String(PLAYA_PARAISO_HOTELS.indexOf(hotel) + 1).padStart(2, "0");
    const totalHotels = String(PLAYA_PARAISO_HOTELS.length).padStart(2, "0");

    const zoneButtons = ZONES.map((zone) => `
      <button type="button" class="media-zone-button media360-zone" data-360-hotel="${hotel}" data-360-zone="${zone.key}" data-360-label="${zone.label}" aria-label="Abrir ${zone.label} de ${hotel} en 360°">
        <span class="media360-zone-icon" aria-hidden="true">${zone.icon}</span>
        <span class="media360-zone-copy">
          <strong>${zone.label}</strong>
          <small>${zone.description}</small>
        </span>
        <span class="media360-zone-arrow" aria-hidden="true">${OPEN_ICON}</span>
      </button>
    `).join("");

    stage.innerHTML = `
      <article class="media360-stage-card">
        <div class="media360-stage-media">
          ${RI.img(getHotelImage(hotel), {
            cls: "media360-stage-img",
            alt: `${hotel} · vista 360°`,
            sizes: "(max-width:900px) 92vw, 42vw",
            priority: true
          })}
          <span class="media360-stage-badge">Vista inmersiva</span>
          <span class="media360-stage-index">${hotelNumber} / ${totalHotels}</span>
        </div>
        <div class="media360-stage-body">
          <div>
            <span class="media360-stage-kicker">2. Elige una zona</span>
            <h2>${hotel}</h2>
            <p class="media360-stage-hotel-meta">Complejo Playa Paraíso · Riviera Maya</p>
          </div>
          <p class="media360-stage-desc">Selecciona una zona para abrir el recorrido y mover la vista con el dedo o el mouse.</p>
          <div class="media360-zone-grid">${zoneButtons}</div>
        </div>
      </article>
    `;
  }

  function render360Cards() {
    const list = document.getElementById("media360HotelList");
    const stage = document.getElementById("media360Stage");
    if (!list || !stage) return;

    if (!PLAYA_PARAISO_HOTELS.includes(selectedHotel)) {
      selectedHotel = PLAYA_PARAISO_HOTELS[0];
    }

    if (list.dataset.rendered !== "true") {
      renderHotelList(list);
      list.dataset.rendered = "true";
      list.addEventListener("click", (event) => {
        const button = event.target.closest("[data-360-select]");
        if (!button) return;
        const hotel = button.dataset["360Select"];
        if (!hotel || hotel === selectedHotel) return;
        selectedHotel = hotel;
        list.querySelectorAll("[data-360-select]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item.dataset["360Select"] === selectedHotel));
        });
        renderStage(stage);
      });
    } else {
      list.querySelectorAll("[data-360-select]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item.dataset["360Select"] === selectedHotel));
      });
    }

    if (stage.dataset.bound !== "true") {
      stage.dataset.bound = "true";
      stage.addEventListener("click", (event) => {
        const button = event.target.closest("[data-360-zone]");
        if (!button) return;
        openPublicPanorama(
          button.dataset["360Hotel"],
          button.dataset["360Zone"],
          button.dataset["360Label"]
        );
      });
    }

    renderStage(stage);
  }

  function wire360() {
    render360Cards();

    const currentRoute = window.RevistaDigital.appContext?.route || document.body.dataset.currentRoute;
    if (currentRoute !== "/360") return;
    let pendingSelection = null;
    try {
      const storedSelection = window.sessionStorage.getItem("club360RestaurantSelection");
      if (storedSelection) {
        window.sessionStorage.removeItem("club360RestaurantSelection");
        pendingSelection = JSON.parse(storedSelection);
      }
    } catch (error) {
      console.warn("No se pudo recuperar el restaurante para la exploración 360°.", error);
      return;
    }
    if (pendingSelection?.hotelName && pendingSelection?.label) {
      window.RevistaDigital.pannellum360?.open?.(
        pendingSelection.hotelName,
        "restaurantes",
        pendingSelection.label
      );
    }
  }

  function reset360Form() {}
  async function edit360() {}
  async function delete360() {}

  media360.render = render360;
  media360.renderCards = render360Cards;
  media360.edit = edit360;
  media360.delete = delete360;
  media360.resetForm = reset360Form;
  media360.wire = wire360;

  window.render360 = window.render360 || render360;
  window.render360Cards = window.render360Cards || render360Cards;
  window.edit360 = window.edit360 || edit360;
  window.delete360 = window.delete360 || delete360;
  window.reset360Form = window.reset360Form || reset360Form;
  window.wire360 = window.wire360 || wire360;

  window.RevistaDigital.media360 = media360;
})();
