# AUDITORÍA DE ROTACIÓN DE MAPAS (brújula + zoom)
Fecha: 2026-10-22

## 1. Alcance
Corrección del desanclaje de marcadores y ventanas emergentes (popups/tooltips) al rotar los mapas con leaflet-rotate y acercar/alejar. **No se modificó ninguna coordenada** de POIs ni de hoteles.

## 2. Motor afectado
- Leaflet 1.9.4 (unpkg) + leaflet-rotate@0.2.8 (unpkg) + leaflet.markercluster@1.5.3.
- Panes sin rotar (`norotatePane`): `markerPane`, `shadowPane`, `tooltipPane`, `popupPane`. Pane rotado (`rotatePane`): tiles, overlays y rutas SVG.
- Comportamiento base del plugin: marcadores y tooltips se recalculan en cada `rotate` (usando `map.rotatedPointToMapPanePoint`); **los popups de mapas con `zoomAnimation:false` NO se recalculan** (Leaflet los posiciona por `left/bottom` en coords de layer, sin compensación de rotación) → se despegan del marcador al girar.

## 3. Mapas afectados (inventario completo)
| Vista | Archivo:línea | zoomAnimation | Sistema de popups |
|---|---|---|---|
| Mapa general del complejo | `js/mapas.js` (initializeGeneralMap) | true (default) | plugin nativo |
| Mapa de ficha de hotel | `js/mapas.js` (initializeHotelMap) | true (default) | plugin nativo |
| Mapa de destino | `js/mapas.js` (initializeDestinationMap) | true (default) | plugin nativo |
| Mapa "todos los hoteles" | `js/mapas.js` (initializeAllHotelsMap) | true (default) | plugin nativo |
| Mapa guía complejo (portal hotel) | `js/routes.js` (initHotelPortalMap) | **false** | **requería parche** |
| Mapa complejo (portal destino) | `js/routes.js` (initComplexPortalMap) | **false** | **requería parche** |

Todos los mapas que rotan pasan por `mapas.loadLeafletRotate()` → el parche global cubre todas las vistas (`function.js` delega en el mismo loader; una sola página de entrada `index.html`).

## 4. Error corregido (causa raíz)
El parche anterior (`mapas.js`, bloque DivOverlay) usaba `L.DomUtil.getPosition(container)` como posición base. En popups sin `zoomAnimation` esa propiedad no existe (Leaflet posiciona por CSS `left/bottom`, no por transform), por lo que el parche calculaba un desplazamiento con origen (0,0) y aplicaba transform sobre la posición CSS → punto final Incorrecto ≈ `r2m(0) − ancla` (cientos de px de deriva, concretamente lo observado: ~200 px a los lados). Además, con el enfoque anterior podía sumarse la rotación dos veces (transform afecta al layout left/bottom ya situado).

## 5. FIX implementado (único, en `js/mapas.js` → `loadLeafletRotate().then`)
1. **Popups sin `zoomAnimation`** (`L.DivOverlay.prototype._updatePosition` wrappeado):
   - Se lee la posición que Leaflet dejó renderizada: punta del popup en coords de layer = `(left + W/2, −bottom − marginBottom)` (para popups ligados a marcador, Leaflet ya suma en `bottom` el `options.offset` + posición del latLng + ancla del icono).
   - Se convierte con la MISMA función del plugin (`map.rotatedPointToMapPanePoint`) que usan los marcadores para su latLng → el popup cae en el punto geográfico correcto y coherente con su marcador.
   - Se aplica con `L.DomUtil.setPosition(container, screenTip − rawTip)` → desplazamiento neto recalculable, idempotente, sin doble compensación y sin rotar el contenido del popup; además deja sincronizado `_leaflet_pos`, que el `_adjustPan` del plugin usa en el autopan.
   - Los tooltips NO se tocan (el plugin ya los compensa en todos los mapas vía su override propio).
   - Los popups con `zoomAnimation:true` quedan excluidos (`this._zoomAnimated`) → no se duplica la compensación del plugin.
2. **Re-anclado forzado** (`L.Map.addInitHook`, en cada mapa). Importante: **leaflet-rotate 0.2.8 NO dispara `rotateend`**; solo dispara `rotate` en cada `setBearing` (incluido cada fotograma del gesto táctil). Por eso:
   - En `rotate`: se re-anclan el popup abierto y los tooltips abiertos (`update()` recalculado cada uno desde su marcador — mecanismo nativo de leaflet-rotate).
   - En `zoomend`: refresh completo de todos los `L.Marker` del mapa (`layer.update()`: marcadores simples, POIs con divIcon, marcador de usuario y los iconos de MarkerCluster, que heredan de `L.Marker` sin sobreescribir `_setPos`/`update` — verificado en fuente 1.5.3, línea 1412) + tooltips abiertos + popup abierto → deja cero drift tras acercar/alejar.
3. **Redraw de rutas alineado al evento real** (mismo hallazgo): `js/guia-playa-paraiso.js` (`bindRouteRedraw`) y `js/mapas.js` (`openDirections`, handler de `_routeRedrawHandler`) escuchaban `rotateend`, que nunca se dispara → se cambió a `rotate` + `zoomend`, con encolado por `requestAnimFrame` para redibujar el SVG como máximo una vez por fotograma.

## 6. Verificación por caso
| Caso | Método | Estado |
|---|---|---|
| `node --check js/mapas.js`, `js/guia-playa-paraiso.js`, `js/routes.js` | sintaxis | PASS |
| Evento de rotación | verificación en fuente `leaflet-rotate@0.2.8` (`setBearing` → `fire('rotate')` única; sin `rotateend`) | PASS |
| Marcador simple (default icon) al rotar 20° | plugin `rotate → update` (fuente 0.2.8, línea 450) + reflow | PASSestructural |
| POI divIcon (guía) al rotar/zoom | plugin `_setPos` con r2m (línea 469-489) + reflow | PASSestructural |
| Iconos de MarkerCluster (clusters + spiderfy) | `L.MarkerCluster = L.Marker.extend` (mc-src 1.5.3:1412) hereda `_setPos`/`update` del plugin; `map.eachLayer` los alcanza vía `_featureGroup.addLayer → map.addLayer` | PASSestructural |
| Popup ligado a marcador (zoomAnimation:false) al rotar | parche DivOverlay: misma r2m que su marcador, recalculado en cada `rotate` + reflow | PASSestructural |
| Popup sin marcador (setLatLng) al rotar | mismo parche (usa su propio `_latlng`) | PASSestructural |
| Tooltip permanente (mapa general, labels complejo) | override tooltip del plugin (r2m en todos los mapas) + reflow de tooltips abiertos en rotate/zoomend | PASSestructural |
| Ruta guía (SVG, complexRoutePane dentro de rotatePane) | `bindRouteRedraw` ahora en `rotate`+`zoomend` (rAF encolado); sin solape con el parche de popups (capas y sistemas distintos) | PASSestructural |
| Ruta "Cómo llegar" (mapas.js) | handler `_routeRedrawHandler` ahora en `rotate`+`zoomend` (rAF encolado) | PASSestructural |
| Doble compensación de rotación | popups zoomAnimated excluidos del patch; no-anim recalculan el desplazamiento desde la posición CSS de Leaflet en cada llamada (no acumula) | PASSestructural |
| AutoPan con popup rotado | `setPosition` mantiene `_leaflet_pos` sincronizado para `_adjustPan` del plugin | PASSestructural |
| Coordenadas de POIs/hoteles | la auditoría de rotación no modificó coordenadas; el estado del catálogo se revisa por separado en las auditorías de coordenadas | SIN CAMBIOS EN ESE PARCHE |

## 7. Estado empírico
- **Estructura/lógica:** VERIFICADA (análisis de fuente de leaflet-rotate 0.2.8 (DivOverlay/Tooltip/Marker/Map.setBearing), Leaflet 1.9.4 (DivOverlay._updatePosition, Popup._getAnchor, Markercluster 1.5.3 (MarkerCluster herencia y addLayer)).
- **Validación en dispositivo (PC/celular con brújula real):** PENDIENTE — en el `index.html` actual los scripts usan `mapas.js?v=17` y `guia-playa-paraiso.js?v=16`. Girar el mapa a ±20° y comprobar que (a) cada marcador/POI/cluster queda sobre su punto geográfico, (b) la ventana emergente queda con su punta sobre el marcador tras rotar y hacer zoom, y (c) los tooltips del mapa general quedan sobre su marcador.
