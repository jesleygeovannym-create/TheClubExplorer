(function () {
  "use strict";

  if (document.documentElement.dataset.languageGate !== "pending") return;

  var i18n = window.RevistaDigital && window.RevistaDigital.i18n;
  var gate = document.getElementById("languageGate");
  var choices = document.getElementById("languageGateOptions");
  var continueButton = document.getElementById("languageGateContinue");
  var title = document.getElementById("languageGateTitle");
  var countryLine = document.getElementById("languageGateCountry");
  if (!i18n || !gate || !choices || !continueButton) return;

  var languages = {
    es: { name: "Español", native: "Continuar en español" },
    en: { name: "English", native: "Continue in English" }
  };
  var available = Object.keys(i18n.translations);
  if (!available.length) return;

  var browserLocales = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || ""];
  var browserLanguage = browserLocales.map(function (locale) {
    return String(locale).toLowerCase().split(/[-_]/)[0];
  }).find(function (code) { return available.indexOf(code) >= 0; });
  var savedLanguage = null;
  try { savedLanguage = localStorage.getItem("revista_lang"); } catch (e) { savedLanguage = null; }
  var selected = available.indexOf(savedLanguage) >= 0
    ? savedLanguage
    : (browserLanguage || i18n.getLang() || available[0]);
  var copy = {
    es: {
      title: "Elija su idioma",
      country: "País o región sugerido por su dispositivo:",
      unknownCountry: "Detección automática",
      continue: "Continuar",
      note: "Después podrá cambiarlo desde el menú."
    },
    en: {
      title: "Choose your language",
      country: "Country or region suggested by your device:",
      unknownCountry: "Not available",
      continue: "Continue",
      note: "You can change it later from the menu."
    }
  };

  function getRegionName() {
    var region = "";
    browserLocales.some(function (locale) {
      var parts = String(locale || "").replace(/_/g, "-").split("-");
      region = parts.find(function (part) { return /^[A-Za-z]{2}$/.test(part) || /^\d{3}$/.test(part); }) || "";
      return Boolean(region);
    });
    if (!region || !window.Intl || !Intl.DisplayNames) return "";
    try {
      return new Intl.DisplayNames([selected], { type: "region" }).of(region.toUpperCase()) || "";
    } catch (error) {
      return "";
    }
  }

  function render() {
    var strings = copy[selected] || copy.es;
    var regionName = getRegionName();
    title.textContent = strings.title;
    countryLine.textContent = strings.country + " " + (regionName || strings.unknownCountry);
    continueButton.textContent = strings.continue;
    var note = gate.querySelector(".language-gate-note");
    if (note) note.textContent = strings.note;
    choices.replaceChildren();

    available.forEach(function (code) {
      var langLabel = languages[code] || {
        name: (window.Intl && Intl.DisplayNames ? new Intl.DisplayNames([code], { type: "language" }).of(code) : code),
        native: code
      };
      var button = document.createElement("button");
      button.type = "button";
      button.className = "language-gate-option";
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", code === selected ? "true" : "false");
      button.setAttribute("lang", code);
      button.innerHTML = '<span class="language-gate-option-mark" aria-hidden="true">✓</span>' +
        '<span class="language-gate-option-copy"><strong></strong><small></small></span>';
      button.querySelector("strong").textContent = langLabel.name;
      button.querySelector("small").textContent = langLabel.native;
      button.addEventListener("click", function () {
        selected = code;
        render();
        var selectedButton = choices.querySelector('[aria-checked="true"]');
        if (selectedButton) selectedButton.focus();
      });
      button.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        var currentIndex = available.indexOf(code);
        var step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
        selected = available[(currentIndex + step + available.length) % available.length];
        render();
        choices.querySelector('[aria-checked="true"]')?.focus();
      });
      choices.appendChild(button);
    });
  }

  render();
  choices.querySelector('[aria-checked="true"]')?.focus();

  gate.addEventListener("keydown", function (event) {
    if (event.key !== "Tab") return;
    var focusable = Array.prototype.slice.call(gate.querySelectorAll("button:not(:disabled)"));
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
  });

  continueButton.addEventListener("click", function () {
    continueButton.disabled = true;
    i18n.setLanguage(selected);
    gate.classList.add("is-leaving");
    window.setTimeout(function () {
      document.documentElement.removeAttribute("data-language-gate");
      gate.remove();
      window.dispatchEvent(new Event("languagegate:complete"));
    }, 320);
  });
})();