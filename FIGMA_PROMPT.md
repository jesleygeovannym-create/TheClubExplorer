# PROMPT PARA FIGMA — “The Club Explorer” (Iberostar)

## Instrucciones generales para Figma
Crea un archivo de diseño en Figma (Desktop + Mobile) para el proyecto web **“The Club Explorer”** de **Iberostar The Club**.  
El sitio es una experiencia híbrida:
1. **Modo Revista (legacy)**: una “revista digital” paginada por spreads (portada, menús por país/complejo, fichas de hotel, restaurantes, 360°, videos, etc.).
2. **Modo Portal (moderno)**: web app responsive con home de destinos/hoteles, fichas de hotel profesionales, mapas, guías del complejo, restaurantes y buscador.

Diseña ambas experiencias con **fidelidad visual** a la implementación existente: colores cálidos, tipografía serif elegante, fotografía de resort a pantalla completa, detalles dorados.  
No inventes una marca nueva: usa el logo de Iberostar The Club (archivo `branding/IB_THE_CLUB_VV_POS_RGB.*`) y la paleta definida.

---

## 1. Identidad de marca

- **Marca:** Iberostar The Club
- **Producto:** The Club Explorer
- **Tono:** editorial, premium, cálido, viajes y hospitalidad.
- **Idiomas:** Español (principal) e Inglés; textos con i18n (ES/EN). Diseña con textos en español y deja espacio para inglés (más largo).
- **Logo:** `branding/IB_THE_CLUB_VV_POS_RGB.png` (y variantes webp). Se usa en header, portada y pantallas de carga.

---

## 2. Design tokens (colores)

Variables CSS (`:root`):

| Token | Hex | Uso |
|---|---|---|
| `--brown` | `#090403` | Fondo del marco de revista, botones nav |
| `--cream` / `--paper` | `#f5f0e7` | Fondo principal papel |
| `--paper-alt` | `#fbf8f1` | Paneles claros |
| `--paper-warm` | `#f0e8d8` | Fondos cálidos |
| `--border` | `#d9c9ae` | Bordes suaves |
| `--ink` | `#2c2a26` | Texto principal oscuro |
| `--navy` | `#002855` | Acento azul (links/CTA) |
| `--navy-soft` | `#40362e` | Texto secundario cálido |
| `--green` | `#090403` | (alias oscuro) |
| `--green-deep` | `#40362e` | Texto/énfasis |
| `--gold` | `#B9A385` | Acento dorado (dots activos, highlights) |
| `--gold-deep` | `#8A7758` | Dorado profundo |
| `--panel` | `#fbf8f1` | Tarjetas/paneles |
| `--muted` | `#8a7c6e` | Texto muted |
| `--line` | `rgba(64,54,46,.1)` | Separadores |
| `--white` | `#ffffff` | Blanco |
| `--success` | `#2e8b57` | Éxito/estados |

Gradientes frecuentes:
- Hero/magazine: `linear-gradient(180deg, rgba(255,255,255,.04) 42%, rgba(59,44,31,.35))`
- Back spread: `linear-gradient(rgba(4,24,39,.62), rgba(4,24,39,.62))`
- Fondos de tarjetas: `linear-gradient(180deg, var(--paper-alt), var(--paper))`

## 3. Tipografía

- **Display (serif):** `Adobe Garamond Pro` (Typekit) / fallback `EB Garamond` (Google Fonts). Usado en títulos, cuerpo editorial, revista.
  - Pesos: 400, 500, 600, 700.
- **UI (sans):** `Echoes Sans` (Typekit) con fallbacks `Segoe UI Symbol, Apple Symbols, Noto Sans Symbols, system-ui`. Usado en botones, chips, labels, navegación.
- **Body:** `Arial, sans-serif`.

En Figma, si no tienes Adobe Garamond Pro, usa **EB Garamond** (Google Fonts) como equivalente cercano y **Inter** para UI.

Tamaños clave:
- Portal hero h1: `clamp(30px, 8.4vw, 40px)` (desktop), `24px` (mobile ≤620).
- Hotel portal hero h1: `clamp(25px, 6.8vw, 31px)`.
- Section titles: 20–24px.
- Body: 13–15px.
- Kicker/labels: 10–11px, uppercase, letter-spacing 0.16–0.18em.

---

## 4. Layout y breakpoints

- **Contenedor revista (desktop):** `.magazine-stage` width `min(1440px, calc(100vw - 28px))`, centrado, margin top 18–35px, padding 24px, fondo `--brown` (#090403), border-radius/shadow.
- **Spread (página):** min-height `calc(100vh - 210px)`, sombra `0 18px 38px rgba(64,54,46,.14)`.
- **Portal (moderno):** ancho completo, padding horizontal `clamp(18px,5vw,76px)`, fondo `--paper`.

Breakpoints principales:
- `1440` (max stage)
- `900` (ajustes)
- `850` (mobile nav, spreads verticales)
- `768` (bottom sheet mapas)
- `700` (spreads)
- `620` (mobile global)
- `460` (grids a 1 columna)

Responsive:
- Mobile nav aparece ≤850px (hamburger + overlay).
- Portal hero pasa a 1 columna ≤620px.
- Tarjetas de país/hotel se reorganizan en grid responsive.

---

## 5. Estructura de navegación (header)

Header fijo/estático `.site-header`:
- Izquierda: logo Iberostar The Club + texto “Destinos” (link a home).
- Centro/derecha (desktop): menú Destinos (dropdown: México, Jamaica, Rep. Dominicana, Brasil), botón “Usar mi ubicación”, botón “🔍 Buscar”, toggle idioma “🌐 EN”, menú Explorar (Transporte, Videos, 360°, Restaurantes, Iberostar Playa Paraíso).
- Mobile: hamburger (3 líneas) abre panel lateral `.site-nav` con overlay.

Estados: hover en links, activo según ruta, dropdown con caret ▾.

## 6. Pantallas a diseñar (inventario)

### A. Language Gate (modal inicial)
- Overlay full-screen.
- Card centrada `.language-gate-card`, fondo papel.
- Kicker “THE CLUB EXPLORER”, título “Elija su idioma”, subtítulo sugerencia según dispositivo.
- Opciones de idioma (radiogroup), botón “Continuar”, nota “Después podrá cambiarlo desde el menú.”

### B. Home Portal (moderno)
- `.portal-app`
- Hero `.portal-hero`: imagen full-bleed + overlay, kicker “IBEROSTAR THE CLUB”, h1 “Encuentre su próximo destino”, subtítulo “Viaje a su manera”, CTA “Conozca Iberostar Playa Paraíso →”, stats (países, destinos, hoteles).
- Sección “Destinos y hoteles”: grid de `.portal-country-card` (país + # hoteles + lista hasta 4 hoteles + “Ver todos”).

### C. Página de país/destino
- Portal nav (breadcrumb/back).
- Hero con imagen del país, kicker, título, intro.
- Grid de hoteles (`.destination-card` con imagen, eyebrow “HOTEL”, nombre, descripción, CTA “Explorar →”).
- Mapa general opcional.

### D. Ficha de hotel (portal moderno)
Bloques:
1. Hero imagen (`.hotel-portal-hero`) con badge de marca (JOIA/Selection/Waves), título, subtítulo, acciones (Ver mapa, Solicitar transporte).
2. Intro/descripción + stats panel.
3. Tabs: Descripción, Habitaciones, Gastronomía, Actividades, Mapa, Guía del complejo (si aplica).
4. Galería (grid de imágenes con lightbox).
5. Mapa del hotel/complejo (Leaflet) + lista de POIs.
6. Sección de zonas (`.hotel-zone-strip` con imágenes).
7. Restaurantes del hotel (cards con menú).
8. Experiencias 360° (cards que abren visor).
9. Videos (embeds).
10. Transporte (carrito de golf): card con CTA “Solicitar transporte”.
11. Complejo Playa Paraíso: mapa interactivo con guía superpuesta (solo 5 hoteles).

### E. Modo Revista — Portada (cover-spread)
- Dos columnas: izquierda logo + título “Playa Paraíso” + subtítulo “RIVIERA MAYA · MÉXICO” + footer “IBEROSTAR THE CLUB · THE CLUB EXPLORER 2026 · EDICIÓN ESPECIAL”.
- Derecha imagen full-bleed + overlay con “EN ESTE NÚMERO” y bullets (5 Hoteles, Mapas Interactivos, Gastronomía, Spa/Bienestar).

### F. Menú por país (country-menu-spread)
- Header con línea decorativa, título del país, lista de hoteles/destinos en grid.

### G. Página de complejo (complex-spread)
- Header, introducción, grid de hoteles del complejo, mapas.

### H. Ficha de hotel (hotel-spread / hotel-detail-spread)
- Modo revista: spread con imagen izquierda/derecha, datos, amenities, mapa pequeño.
- Modo detalle (portal dentro de revista): hero, tabs, galería, mapa, acciones.

### I. Menú de restaurantes (restaurant-menu-spread)
- Historia del restaurante, menú por categorías, galería de platos, CTA.

### J. Hub 360° (media-spread / pano-hub-spread)
- Grid de tarjetas de contenido 360° con thumbnail, título, CTA “Ver 360°”.

### K. Videos (media-spread)
- Grid/lista de videos con thumbnail, título, duración, reproductor.

### L. Workspace / Admin (workspace-spread)
- Panel administrativo: auth bar (login), formularios/listas. Estilo utilitario con `--font-ui`.

### M. Back spread (contacto)
- Cita/quote con imagen de fondo + datos de contacto + botón “RESERVAR AHORA”.

### N. Modal de búsqueda y filtros
- Overlay con container.
- Header: input “Buscar por hotel, destino, categoría...”, botón cerrar.
- Filtros: chips por Marca (Todos, JOIA & Grand, Selection, Waves) y País (Todos, México, Jamaica, Rep. Dominicana, Brasil).
- Meta bar: “X hoteles encontrados” + “ESC para salir”.
- Lista de resultados (cards compactas).

### O. Aviso de ubicación (location-welcome)
- Modal centrado, fondo blur, card con bienvenida y acciones.

### P. Mapas
- Mapa general de hoteles (Leaflet) con marcadores y popups “Ver ficha →”.
- Mapa por hotel/complejo con POIs.
- Mobile: bottom sheet estilo Uber (lista de rutas + mapa a pantalla completa).

---

## 7. Componentes reutilizables (crear como components en Figma)

- **Header / Nav** (desktop + mobile).
- **Logo Iberostar**.
- **Botones:** `.cta-button`, `.portal-hero-link`, `.portal-map-btn`, `.hotel-transport-cta`, `.back-reserve`, `.guide-route-cancel`, `.search-filter-chip`, `.search-trigger-btn`, `.lang-toggle-btn`.
- **Cards:** `.destination-card`, `.portal-country-card`, `.portal-hotel-link`, `.restaurant-menu-card`, `.media card`, `.search result card`.
- **Hero:** `.portal-hero`, `.portal-destination-hero`, `.hotel-portal-hero`, `.hotel-detail-header`.
- **Chips/Tags:** marca (JOIA/Selection/Waves), stats (`.portal-hero-stats span`).
- **Tabs** de ficha de hotel.
- **Galería** (grid + lightbox).
- **Mapa** (placeholder con estilo + marcadores).
- **Pager** (dots + flechas nav).
- **Modal** (search, language gate, location welcome).
- **Form fields** (workspace).
- **Toast/Status** (`.location-status`).

## 8. Imagery y estilo visual

- Fotografía de resort de alta calidad, cálida, saturada (saturate 1.08, contrast 1.05).
- Bordes redondeados: 14–18px en tarjetas/hero; 24px en botones pill.
- Sombras suaves cálidas: `0 18px 38px rgba(64,54,46,.08-.14)`.
- Fondos de papel (cream) en portal; marco marrón oscuro en revista.
- Iconos simples (emoji 🔍 🌐 para búsqueda/idioma en UI).

---

## 9. Interacciones y animaciones (para prototipo)

- **Page turn:** animación `pageTurn .7s cubic-bezier(.2,.75,.25,1)` al cambiar de spread.
- **Swipe horizontal** en mobile para cambiar de página (solo si gesto horizontal >60px).
- **Fade-in** de elementos (`.portal-hero > div > *`, cards) vía animations.js.
- **Hover:** botones con transición de borde/color; tarjetas con elevación.
- **Tabs:** cambio de panel sin recarga.
- **Galería:** lightbox.
- **Mapas:** zoom, pan, popups, marcadores.
- **Búsqueda:** modal con filtros chips (toggle active), resultados dinámicos, ESC para cerrar.
- **Idioma:** toggle ES/EN, gate inicial.

---

## 10. Accesibilidad

- Roles ARIA en modales (`role="dialog"`, `aria-modal`), nav (`aria-label`), botones con `aria-label`.
- Focus visible en controles.
- Contraste suficiente sobre imágenes (overlays).
- Navegación por teclado en modales y menús.

---

## 11. Entregables esperados en Figma

1. **Página “Tokens”**: colores, tipografía, espaciados, radios, sombras.
2. **Página “Components”**: todos los componentes reutilizables con variantes (desktop/mobile, estados).
3. **Página “Portal – Desktop”**: Home, País, Ficha Hotel, Mapas, Búsqueda.
4. **Página “Portal – Mobile”**: equivalentes responsive.
5. **Página “Magazine – Desktop”**: Cover, Country Menu, Complex, Hotel, Restaurant Menu, 360 Hub, Videos, Back.
6. **Página “Modals”**: Language Gate, Search, Location Welcome.
7. **Prototipo** con flujos: Home → País → Hotel → Galería/Mapa/360; búsqueda; cambio de idioma; page turn en revista.

Usa nombres de capas en español y mantén auto-layout para que el diseño sea implementable.
