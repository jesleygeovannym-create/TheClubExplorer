const WEATHER_API_KEY = "7c43033903b5f178db5657dd856c87a0";

const weatherIconPaths = {
  clear: `<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
  clouds: `<path d="M7 17a4 4 0 0 1-.4-8 5.6 5.6 0 0 1 10.7.8A3.7 3.7 0 0 1 17.5 17H7z"/>`,
  rain: `<path d="M7 14a4 4 0 0 1-.4-8A5.6 5.6 0 0 1 17.3 7a3.7 3.7 0 0 1 .2 7H7z"/><path d="M7.5 17l-1 3M12 17l-1 3M16.5 17l-1 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
  thunderstorm: `<path d="M7 13a4 4 0 0 1-.4-8A5.6 5.6 0 0 1 17.3 6a3.7 3.7 0 0 1 .2 7H7z"/><path d="M13 14l-4 5h3l-1 4 5-6h-3l1-3z"/>`,
  snow: `<path d="M7 13a4 4 0 0 1-.4-8A5.6 5.6 0 0 1 17.3 6a3.7 3.7 0 0 1 .2 7H7z"/><circle cx="8" cy="18" r="1"/><circle cx="12" cy="19.5" r="1"/><circle cx="16" cy="18" r="1"/>`,
  mist: `<path d="M7 13a4 4 0 0 1-.4-8A5.6 5.6 0 0 1 17.3 6a3.7 3.7 0 0 1 .2 7H7z"/><path d="M5 17h14M7 20h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>`
};
weatherIconPaths.default = weatherIconPaths.clouds;

const weatherLabels = {
  clear: "Despejado",
  clouds: "Nublado",
  rain: "Lluvia",
  thunderstorm: "Tormenta",
  snow: "Nieve",
  mist: "Neblina",
  default: "Clima no disponible"
};

const weatherLabelsEn = {
  clear: "Clear",
  clouds: "Cloudy",
  rain: "Rain",
  thunderstorm: "Storm",
  snow: "Snow",
  mist: "Mist",
  default: "Weather not available"
};

function weatherConditionKey(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("thunderstorm")) return "thunderstorm";
  if (text.includes("snow")) return "snow";
  if (text.includes("rain") || text.includes("drizzle")) return "rain";
  if (text.includes("cloud")) return "clouds";
  if (text.includes("clear") || text.includes("sun")) return "clear";
  if (/mist|fog|haze|smoke|dust|sand/.test(text)) return "mist";
  return "default";
}

function weatherIconSvg(condition, size = 16) {
  const key = weatherConditionKey(condition);
  return `<svg class="weather-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${weatherIconPaths[key] || weatherIconPaths.default}</svg>`;
}

function currentWeatherLang() {
  return window.RevistaDigital?.i18n?.getLang?.() === "en" ? "en" : "es";
}

function weatherLabel(condition, description, lang = currentWeatherLang()) {
  const labels = lang === "en" ? weatherLabelsEn : weatherLabels;
  return labels[weatherConditionKey(condition || description)] || labels.default;
}

function weatherEndpoint(city, lang = currentWeatherLang()) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=${lang}&appid=${WEATHER_API_KEY}`;
}

async function getWeatherForCity(city) {
  const lang = currentWeatherLang();
  try {
    const response = await fetch(weatherEndpoint(city, lang));
    if (!response.ok) return null;
    const data = await response.json();
    const condition = data.weather?.[0]?.main || "";
    const description = data.weather?.[0]?.description || "";
    return {
      city: data.name,
      condition,
      description,
      label: weatherLabel(condition, description, lang),
      lang
    };
  } catch (error) {
    console.error("Error clima ciudad:", error);
    return null;
  }
}

window.RevistaDigital = window.RevistaDigital || {};
window.RevistaDigital.weather = {
  getForCity: getWeatherForCity,
  icon: weatherIconSvg,
  label: weatherLabel
};

function paintWeatherBadge(badge, data) {
  const lang = data?.lang || currentWeatherLang();
  const fallback = lang === "en" ? weatherLabelsEn.default : weatherLabels.default;
  const icon = window.RevistaDigital.weather.icon(data?.condition || "clouds", 15);
  badge.innerHTML = icon;
  const text = document.createElement("span");
  text.textContent = data?.label || fallback;
  badge.appendChild(text);
  badge.title = data ? `${data.description} · ${data.city}` : fallback;
}

async function refreshWeatherCards() {
  const badges = document.querySelectorAll(".weather-live[data-weather-city]");
  for (const badge of badges) {
    if (badge.dataset.weatherLoaded === "true") continue;
    const city = badge.getAttribute("data-weather-city");
    if (!city || !window.RevistaDigital?.weather?.getForCity) continue;
    try {
      const data = await window.RevistaDigital.weather.getForCity(city);
      paintWeatherBadge(badge, data);
    } catch (error) {
      paintWeatherBadge(badge, null);
    }
    badge.dataset.weatherLoaded = "true";
  }
}

function observeWeatherCards() {
  const observer = new MutationObserver((mutations) => {
    let shouldRefresh = false;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches?.(".weather-live[data-weather-city]")) shouldRefresh = true;
        if (node.querySelectorAll?.(".weather-live[data-weather-city]").length) shouldRefresh = true;
      }
    }
    if (shouldRefresh) refreshWeatherCards();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    refreshWeatherCards();
    observeWeatherCards();
  });
} else {
  refreshWeatherCards();
  observeWeatherCards();
}
