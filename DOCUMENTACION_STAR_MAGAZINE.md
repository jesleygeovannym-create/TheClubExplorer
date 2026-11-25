# I B E R O S T A R  T H E  C L U B

## The Club Explorer: Manual de Usuario y Documentación Técnica de la Aplicación Web

**Versión 1.2** (manual ampliado y reestructurado)  
**Enfoque:** Riviera Maya (México) — Complejo Iberostar Playa Paraíso

---

**COMUNICACIONES THE CLUB**  
Auxiliar de Diseño Gráfico y Redes Sociales  
Nombre del jefe inmediato: **Irais Salinas Melgarejo**  
Puesto del jefe inmediato: **Gerente de Comunicaciones**  
Teléfono y extensión: **984 877 2800**

---

**Fecha:** 2026-11-18  
**Versión del documento:** 1.2  
**Producto:** The Club Explorer  
**Alcance:** Complejo Iberostar Playa Paraíso (Riviera Maya)

> **Importante:** Este repositorio es público. **No incluyas claves, tokens ni credenciales** en este documento ni en el código. Las credenciales se gestionan por separado.

---

## Índice

1. [Qué es The Club Explorer](#1-qué-es-the-club-explorer)
2. [Arquitectura mínima](#2-arquitectura-mínima)
3. [Estructura de carpetas (relevante)](#3-estructura-de-carpetas-relevante)
4. [Datos del complejo (POIs)](#4-datos-del-complejo-pois)
   - 4.0 [Coordenadas de los 24 restaurantes del complejo](#40-coordenadas-de-los-24-restaurantes-del-complejo)
   - 4.1 [Actualizar un POI (restaurante, bar, servicio, etc.)](#41-actualizar-un-poi-restaurante-bar-servicio-etc)
   - 4.2 [Añadir un POI nuevo](#42-añadir-un-poi-nuevo)
   - 4.3 [Cambiar categoría/color de un grupo](#43-cambiar-categoría-color-de-un-grupo)
5. [Horarios, cartas y datos de restaurante](#5-horarios-cartas-y-datos-de-restaurante)
6. [Descripciones de hoteles (vista Riviera Maya)](#6-descripciones-de-hoteles-vista-riviera-maya)
7. [Traducciones (ES/EN)](#7-traducciones-es/en)
8. [Workspace (Admin: experiencias y videos)](#8-workspace-admin-experiencias-y-videos)
9. [Carrito de golf](#9-carrito-de-golf)
10. [Clima (badges y widget)](#10-clima-badges-y-widget)
11. [Mapa y ruteo “Cómo llegar”](#11-mapa-y-ruteo-cómo-llegar)
12. [Exploración 360°](#12-exploración-360°)
13. [Despliegue y verificación](#13-despliegue-y-verificación)
14. [Problemas frecuentes y solución rápida](#14-problemas-frecuentes-y-solución-rápida)
15. [Rotación de credenciales (cuando proceda)](#15-rotación-de-credenciales-cuando-proceda)
16. [Contacto / Escalación](#16-contacto--escalación)

---

## 1. Qué es The Club Explorer

Herramienta interna para que el socio/colaborador se ubique, navegue y resuelva dentro del complejo Playa Paraíso:

- **Mapa interactivo** del complejo con POIs verificados (restaurantes, bares, piscinas, spas, deportes, servicios).
- **Guía de categorías** con filtro y búsqueda.
- **Rutas “Cómo llegar”** (peatonal dentro del complejo, vehicular fuera).
- **Exploración 360°** de zonas y restaurantes.
- **Solicitud de carrito de golf** con seguimiento.
- **Clima** contextual por zona.
- **Área de administración (Workspace)** para editar experiencias y videos.

**No es** una revista digital para huéspedes ni un catálogo público.

---

## 2. Arquitectura mínima

| Capa | Tecnología | Qué hace |
|------|------------|----------|
| Frontend | HTML/CSS/JS vanilla (ES6+) | SPA con enrutado cliente (`js/routes.js`) |
| Mapa 2D | Leaflet + OSM tiles | Mapa base, marcadores, clusters, rotación |
| Mapa 3D (opcional) | Mapbox GL JS | Vista embebida con ruteo Directions |
| Ruteo | Valhalla (peatonal) / OSRM (vehicular) / Mapbox Directions | Cálculo de rutas |
| 360° | Pannellum | Visor panorámico |
| Backend | Supabase (PostgreSQL + Auth + Storage) | Workspace (experiencias), Videos, media |
| Clima | OpenWeatherMap | Widget y badges por ciudad |
| Despliegue | GitHub Pages (sitio estático) | `main` branch → Pages |

**Namespaces globales:** `window.RevistaDigital` (`state`, `routes`, `mapas`, `guiapa`, `pannellum360`, `hoteles`, `restaurantes`, `weather`, `i18n`).

---

## 2.1 APIs externas usadas (referencia rápida)

| Servicio | Qué hace | Archivo / Línea | Nota |
|----------|----------|-----------------|------|
| **OpenWeatherMap** | Clima actual + badges por ciudad | `js/weather.js:5` | Key rotar periódicamente |
| **Leaflet** | Mapa 2D base (OSM tiles) | `js/mapas.js` (carga dinámica `loadLeaflet`) | Librería local en `/libs/leaflet/` |
| **Leaflet.markercluster** | Clusters de marcadores | `js/mapas.js` (`loadMarkerCluster`) | Librería local en `/libs/leaflet.markercluster/` |
| **Leaflet.RotatedMarker** | Rotación de marcadores | `js/mapas.js` (`loadLeafletRotate`) | Librería local en `/libs/Leaflet.RotatedMarker/` |
| **Valhalla** | Ruteo peatonal (dentro complejo) | `js/mapas.js` (~línea 1100) | `https://valhalla1.openstreetmap.de/route` |
| **OSRM** | Ruteo vehicular (fuera) | `js/mapas.js` (~línea 1150) | `https://router.project-osrm.org/` |
| **Mapbox GL JS** | Mapa 3D opcional + Directions | `mapbox/mapbox-guia-playa-paraiso.html` | Token en el HTML (no commitear) |
| **Mapbox Directions API** | Rutas en vista Mapbox | `mapbox/mapbox-guia-playa-paraiso.html` | `api.mapbox.com/directions/v5/...` |
| **Pannellum** | Visor 360° panorámicas | `js/pannellum-360.js` | Librería local en `/libs/pannellum/` |
| **Supabase (PostgreSQL + Auth + Storage)** | Backend: Workspace, Videos, media | `function.js` (cliente), `js/workspace.js`, `js/videos.js` | URL/anon key en `function.js` |
| **OpenStreetMap (tiles)** | Capa base del mapa Leaflet | `js/mapas.js:1540` | `https://{s}.tile.openstreetmap.org/...` |
| **Geolocation API (navegador)** | Ubicación usuario (carrito, mapa) | `js/mapas.js:996` (`requestCurrentLocation`) | Requiere HTTPS |

> **Google Maps API:** Código de carga (`loadGoogleMaps`) **eliminado** (key vacía, no se usaba). Mapas usan Leaflet + OSM.

---

## 3. Estructura de carpetas (relevante)

```
/js
  routes.js          # Enrutado + render de vistas
  mapas.js           # Leaflet, geolocalización, ruteo
  guia-playa-paraiso.js  # POIs, filtros, leyenda, acciones móviles
  pannellum-360.js   # Visor 360°, enlace a mapa
  weather.js         # OpenWeatherMap, badges
  i18n.js + page-translations.js  # Traducciones ES/EN
  hoteles.js         # Catálogo + páginas de hotel
  function.js        # Estado global, páginas, menús, coords
  carrito-golf.js    # Solicitud + tracking
  workspace.js / videos.js  # Admin (requiere auth)
/supabase
  setup.sql          # Tablas, buckets, RLS base
  security.sql       # Endurecimiento (admins, políticas estrictas)
/src                 # Imágenes, logos, assets optimizados
/libs                # Leaflet, MarkerCluster, Rotate, Pannellum (locales)
```

---

## 4. Datos del complejo (POIs)

**Archivo:** `js/guia-playa-paraiso.js` (array `POIS` + `CATEGORIES`)

Cada POI tiene:
```js
{
  id: "hashiru",
  name: "Hashiro",
  category: "restaurante",      // clave en CATEGORIES
  lat: 20.7606093, lng: -86.9637212,
  hotelId: "Iberostar Waves Paraíso Beach", // opcional
  verified: true,               // coordenadas validadas
  description: "...",
  // ... campos extra: horario, carta, dressCode, etc.
}
```

**Categorías principales:** `restaurante`, `bar`, `snacks`, `piscina`, `spa`, `deportes`, `kids`, `concierge`, `starprestige`, `golf`, `conv`, `servicio`, `entretenimiento`, `comer`.

> **Nota de alcance:** Quetzal y Tucán están en **Playacar** (otro destino en `js/hoteles.js`), **no** en Playa Paraíso. No aparecen en los POIs del complejo.

### 4.0. Coordenadas de los 24 restaurantes del complejo

Todos con `category: "restaurante"`, `verified: true` y coordenadas confirmadas.

| # | ID | Nombre | Hotel | Latitud | Longitud |
|---|----|--------|-------|---------|----------|
| 1 | `hashiru` | Hashiro | Iberostar Waves Paraíso Beach | 20.7606093 | -86.9637212 |
| 2 | `la-dorada` | La Dorada | Iberostar Selection Paraíso del Mar | 20.76156 | -86.9631079 |
| 3 | `rodizio` | Rodizio | Iberostar Selection Paraíso del Mar | 20.76112 | -86.9634612 |
| 4 | `el-mercado` | El Mercado | Iberostar Selection Paraíso del Mar | 20.7612549 | -86.9626755 |
| 5 | `la-plaza` | La Plaza | Iberostar Waves Paraíso Beach | 20.7608481 | -86.9629956 |
| 6 | `la-hacienda` | La Hacienda | Iberostar Waves Paraíso Beach | 20.7614866 | -86.9629864 |
| 7 | `el-puerto` | El Puerto | Iberostar Waves Paraíso Beach | 20.7578601 | -86.9591398 |
| 8 | `el-museo` | El Museo | Iberostar Waves Paraíso Lindo | 20.7589083 | -86.9636421 |
| 9 | `la-pagoda` | La Pagoda | Iberostar Waves Paraíso Lindo | 20.7587578 | -86.9632596 |
| 10 | `el-rancho` | El Rancho (Steak House) | Iberostar Selection Paraíso Maya | 20.7580548 | -86.964155 |
| 11 | `la-geisha` | La Geisha | Iberostar Selection Paraíso Maya | 20.7572267 | -86.9646975 |
| 12 | `letoile` | L'Etoile | Iberostar Selection Paraíso Maya | 20.7570704 | -86.9644942 |
| 13 | `el-tapatio` | El Tapatío | Iberostar Waves Paraíso Lindo | 20.7567139 | -86.960329 |
| 14 | `venecia` | Venecia | JOIA Paraíso by Iberostar | 20.755841 | -86.9626532 |
| 15 | `bellavista` | Bellavista | JOIA Paraíso by Iberostar | 20.7549173 | -86.9612041 |
| 16 | `latelier` | L'Atelier | JOIA Paraíso by Iberostar | 20.7551676 | -86.9609817 |
| 17 | `haiku` | Haiku | JOIA Paraíso by Iberostar | 20.755212 | -86.9610284 |
| 18 | `olivetti` | The Olivetti | Iberostar Selection Paraíso Maya | 20.7567218 | -86.9604135 |
| 19 | `lemon-spices` | Lemon & Spices | Iberostar Waves Paraíso Lindo | 20.7589371 | -86.9634247 |
| 20 | `under-the-sea` | American Seafood Grill Under the Sea | Iberostar Selection Paraíso Maya | 20.75687 | -86.95974 |
| 21 | `buffet-la-marina` | Buffet La Marina | Iberostar Selection Paraíso Maya | 20.757842 | -86.963819 |
| 22 | `legado` | Legado | JOIA Paraíso by Iberostar | 20.754923 | -86.961316 |
| 23 | `el-colonial` | El Colonial | Iberostar Waves Paraíso Beach | 20.7609943 | -86.963447 |
| 24 | `trattoria` | Trattoria by El Faro | Iberostar Selection Paraíso del Mar | 20.7589509 | -86.9583723 |

---

### 4.1 Actualizar un POI (restaurante, bar, servicio, etc.)

1. Abre `js/guia-playa-paraiso.js`.
2. Busca el POI por `id` en el array `POIS`.
3. Modifica los campos necesarios (`name`, `lat`, `lng`, `category`, `hotelId`, `verified`, `description`, `horario`, `carta`, etc.).
4. Si cambias coordenadas, pon `verified: true` solo cuando estés seguro (Google Maps / OSM).
5. Guarda y prueba en local (`npx serve .` → `/mexico/riviera-maya` → guía).
6. Commit: `git add js/guia-playa-paraiso.js && git commit -m "Actualiza POI: <id> - <motivo>" && git push`.

### 4.2 Añadir un POI nuevo

1. Añade el objeto al final de `POIS` con `id` único.
2. Usa una `category` existente en `CATEGORIES` (o añade una allí con su color/label).
3. Incluye `lat`, `lng`, `verified: true`, `hotelId` si corresponde.
4. Prueba filtro, leyenda y “Cómo llegar”.

### 4.3 Cambiar categoría/color de un grupo

Edita `CATEGORIES` en `js/guia-playa-paraiso.js`:
```js
const CATEGORIES = {
  restaurante: { label: "Restaurantes", color: "#83786f" },
  bar: { label: "Bares", color: "#b9a385" },
  // ...
};
```

---

## 5. Horarios, cartas y datos de restaurante

**Archivo:** `js/datos-complejo.js` (objeto `RESTAURANTES_PARAISO` o similar) y campos dentro de cada POI (`horario`, `carta`, `dressCode`, `tipo`, `cocina`, `especialidades`).

Para cambiar un horario o carta:
1. Busca el POI en `js/guia-playa-paraiso.js` (campo `horario`, `carta`, etc.) **y** en `js/datos-complejo.js` si hay ficha extendida.
2. Actualiza ambos lados para consistencia.
3. Commit y push.

---

## 6. Descripciones de hoteles (vista Riviera Maya)

**Archivo:** `function.js` → array `pages` (tipo `"hotel"`), campo `intro`.

Los 5 hoteles del complejo:
- `Iberostar Paraíso del Mar` (Waves)
- `Iberostar Paraíso Maya` (Selection)
- `Iberostar Paraíso Lindo` (Selection)
- `Iberostar Paraíso Beach` (Waves)
- `Iberostar Paraíso JOIA` (JOIA, solo adultos)

Para cambiar el texto: edita `intro` en la página correspondiente, commit y push.

---

## 7. Traducciones (ES/EN)

**Archivos:** `js/i18n.js` (diccionario base) + `js/page-translations.js` (frases largas).

- Claves UI: `js/i18n.js` → objeto `translations.es` / `translations.en`.
- Frases de página: `js/page-translations.js` (clave = texto ES, valor = EN).
- Para añadir texto: pon la clave en ES en el HTML con `data-i18n="clave"` y añade la entrada en `i18n.js` o `page-translations.js`.
- El selector de idioma persiste en `localStorage`.

---

## 8. Workspace (Admin: experiencias y videos)

**Acceso:** requiere autenticación Supabase (rol `authenticated` + políticas RLS).

**Archivos:** `js/workspace.js`, `js/videos.js`, `function.js` (cliente Supabase).

**Tablas (Supabase):**
- `public.workspace` — experiencias (`hotel`, `title`, `text`, `product`, `image`, `created_at`).
- `public.videos` — fragmentos ≤ 35 s (`hotel`, `title`, `video`, `mime_type`, `start`, `end`, `created_at`).

**Buckets Storage:**
- `workspace-images` (10 MB, imágenes).
- `videos` (100 MB, video/mp4, webm, quicktime).

**Dar de alta a un editor:**
1. En Supabase Dashboard → Authentication → Add user (email/password).
2. El usuario entra en `/workspace` o `/videos` y hace login.
3. Las políticas RLS (`supabase/security.sql`) restringen escritura a usuarios autenticados; lectura es pública.

**Si falla el login/guardado:**
- Revisa consola: error 401/403 → revisa RLS en Supabase.
- Error de bucket → verifica políticas de Storage y MIME types permitidos.
- CORS → confirmar que el site URL está en Supabase → Auth → URL Configuration.

---

## 9. Carrito de golf

**Archivo:** `js/carrito-golf.js`.

- Solicitud desde `/carrito-golf` o botón en ficha de hotel/POI.
- Guarda hotel/origen/destino en `sessionStorage` (`clubCartHotel`, `clubCartOrigin`, `clubCartDestination`).
- Tracking en tiempo real usa Geolocation API + Leaflet.
- Si no solicita/ubica: revisa permisos de geolocalización en navegador y HTTPS (requerido para `navigator.geolocation`).

---

## 10. Clima (badges y widget)

**Archivo:** `js/weather.js` + `function.js` (mapeo `WEATHER_CITY_BY_COUNTRY` / `PORTAL_WEATHER_CITY_BY_COUNTRY`).

- API: OpenWeatherMap `/data/2.5/weather` (key en `js/weather.js:5` — **rotar periódicamente**).
- Ciudades por defecto: Cancún, Montego Bay, Punta Cana, Salvador.
- Badges en UI: elementos con `data-weather-city` + clase `weather-badge weather-live`.
- Actualización automática via `MutationObserver` (`refreshWeatherCards`, `observeWeatherCards`).

---

## 11. Mapa y ruteo “Cómo llegar”

**Archivos:** `js/mapas.js` (Leaflet) + `mapbox/mapbox-guia-playa-paraiso.html` (Mapbox).

- **Peatonal (dentro del complejo):** Valhalla `https://valhalla1.openstreetmap.de/route` (`costing: pedestrian`).
- **Vehicular (fuera):** OSRM `https://router.project-osrm.org/route/v1/driving/...`.
- **Mapbox Directions:** `https://api.mapbox.com/directions/v5/mapbox/{profile}/...` (token en `mapbox/mapbox-guia-playa-paraiso.html`).

**Si la ruta no sale:**
- Consola → error de fetch → revisa conectividad / CORS del proveedor.
- Coordenadas inválidas → verifica `lat`/`lng` del POI destino (`verified: true`).
- Fallback automático: Valhalla → OSRM → Mapbox según disponibilidad.

---

## 12. Exploración 360°

**Archivos:** `js/pannellum-360.js` (visor) + `js/media360.js` (IndexedDB local).

- Panoramas en `/360/` (equirectangulares).
- Enlace desde guía/POI → `openRestaurantMap()` / `selectPoi()`.
- Al cerrar 360°, limpieza de overlays (`pano-360-open`, `guide-expanded-open`) para no bloquear táctil en mapa.

---

## 13. Despliegue y verificación

```bash
# Local
npx serve .          # o Live Server en VS Code
# Abre http://127.0.0.1:5500/mexico/riviera-maya
```

**Push a producción:**
```bash
git add .
git commit -m "Descripción clara del cambio"
git push origin main
# GitHub Pages publica automáticamente desde main
```

**Checklist post-push:**
- [ ] Carga de logos/recursos en `src/` (sin 404).
- [ ] Mapa Leaflet + tiles OSM + Marcadores + Clusters.
- [ ] Ruteo “Cómo llegar” (peatonal y vehicular).
- [ ] Badges de clima (`.weather-badge`).
- [ ] Workspace/Videos (login + guardado).
- [ ] Carrito de golf (solicitud + tracking).
- [ ] 360° (apertura/cierre sin bloquear mapa).

---

## 14. Problemas frecuentes y solución rápida

| Síntoma | Causa probable | Acción |
|---------|----------------|--------|
| Mapa no responde a touch en móvil | Capa `.guide-mobile-actions[hidden]` con `z-index` alto | Ver `style.css`: `.guide-mobile-actions[hidden] { display: none !important; }` |
| Leyenda muestra “Pendiente de verificación” siempre | Texto hardcodeado en `legendMarkup()` | Ya corregido: solo aparece si hay POIs sin `verified: true` o sin coords en la vista actual |
| Ruteo falla en peatonal | Valhalla caído / CORS | Fallback a OSRM/Mapbox automático; revisa consola |
| Login Workspace da 403 | RLS no permite escritura | Supabase → Table Editor → Policies → `workspace`/`videos` → `INSERT` para `authenticated` |
| Imágenes 404 en Pages | Asset no commiteado | `git add src/… && git commit && git push` |
| Clima no carga | Key OpenWeatherMap inválida/agotada | Rotar key en `js/weather.js:5` y `WEATHER_API_KEY` |
| 360° bloquea mapa al cerrar | Clases residuales `pano-360-open` / `guide-expanded-open` | `pannellum-360.js:closeModal()` y `close()` ya limpian `document.body.classList.remove(...)` |

---

## 15. Rotación de credenciales (cuando proceda)

> **No pongas claves en este manual ni en el repo.**

Cuando toques rotar:
1. **Supabase:** Dashboard → Settings → API → Regenerate `anon`/`publishable` key → actualiza `function.js` (`SUPABASE_KEY`) y `index.html` (SDK carga dinámica si usas env).
2. **Mapbox:** Account → Access tokens → Create/rotate → actualiza `mapbox/mapbox-guia-playa-paraiso.html` (`mapboxgl.accessToken`).
3. **OpenWeatherMap:** Account → API keys → Regenerate → actualiza `js/weather.js` (`WEATHER_API_KEY`).
4. Commit sin exponer la key antigua en el diff (usa `git commit --amend` o historia limpia si se filtró).

---

## 16. Contacto / Escalación

- **Desarrollo / código:** revisar `git log --oneline -20` y Issues del repo.
- **Supabase/Backend:** Dashboard del proyecto Supabase.
- **Mapbox/Clima:** consolas de cada proveedor.
- **Urgencias de producción:** revertir último commit (`git revert HEAD && git push`) mientras se diagnose.

---

**Fin del manual operativo.**