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
  const ZONES = [
    { key: "piscinas", label: "Piscinas" },
    { key: "exteriores", label: "Exteriores" },
    { key: "playa", label: "Playa" },
    { key: "restaurantes", label: "Restaurantes" }
  ];

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
      <div class="spread media-spread">
        <div class="media-header">
          <div>
            <small>RECORRIDO VIRTUAL</small>
            <h1>Exploración 360°</h1>
          </div>
        </div>

        <div class="media-content">
          <div class="media-selector">
            <label for="media360Filter">Hotel:</label>
            <select id="media360Filter">
              <option value="all">Todo el complejo</option>
              ${PLAYA_PARAISO_HOTELS.map((hotel) => `<option value="${hotel}">${hotel}</option>`).join("")}
            </select>
          </div>

          <div class="media-grid" id="media360Grid"></div>
        </div>
      </div>
    `;
  }

  function render360Cards() {
    const container = document.getElementById("media360Grid");
    if (!container) return;

    const filter = document.getElementById("media360Filter")?.value || "all";
    const hotels = filter === "all" ? PLAYA_PARAISO_HOTELS : [filter];

    const cards = hotels.map((hotel) => {
      const zoneButtons = ZONES.map((zone) => `
        <button type="button" class="media-zone-button" data-360-hotel="${hotel}" data-360-zone="${zone.key}" data-360-label="${zone.label}">
          ${zone.label}
        </button>
      `).join("");

      const image = hotel.includes("JOIA") ? "src/JOIA1.jpg" : hotel.includes("Lindo") ? "src/ParaisoLindo1.jpg" : hotel.includes("Maya") ? "src/paraisoMaya 1.jpg" : hotel.includes("Beach") ? "src/paraisoBeach1.jpg" : "src/ParaisoDelMar 1.jpg";

      return `
        <article class="media-card media-card-gallery">
          ${RI.img(image, {
            cls: "media-card-image",
            alt: `${hotel} · exploración 360°`,
            sizes: "(max-width:620px) 92vw, (max-width:900px) 46vw, 32vw"
          })}
          <div class="media-card-content">
            <h3>${hotel}</h3>
            <p>Complejo Playa Paraíso · Riviera Maya</p>
            <div class="media-zone-list">${zoneButtons}</div>
          </div>
        </article>
      `;
    }).join("");

    container.innerHTML = cards || `<div class="media-empty">No hay recorridos 360° para este filtro.</div>`;

    container.querySelectorAll("[data-360-zone]").forEach((button) => {
      button.addEventListener("click", () => {
        const hotelName = button.dataset["360Hotel"];
        const zoneKey = button.dataset["360Zone"];
        const label = button.dataset["360Label"];
        openPublicPanorama(hotelName, zoneKey, label);
      });
    });
  }

  function wire360() {
    const filter = document.getElementById("media360Filter");
    if (filter && filter.dataset.bound !== "true") {
      filter.dataset.bound = "true";
      filter.addEventListener("change", render360Cards);
    }
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
