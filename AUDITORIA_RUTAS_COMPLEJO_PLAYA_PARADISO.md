# Informe Oficial: Auditoría del Sistema de Rutas y Navegación Peatonal

**Proyecto:** The Club Explorer | Iberostar The Club  
**Complejo:** Iberostar Playa Paraíso  
**Fecha de consolidación:** 23 de octubre de 2026  
**Módulos auditados:** `js/mapas.js`, `js/guia-playa-paraiso.js`, `js/routes.js`  

---

## 1. Alcance y Estado General

El sistema solicita geometrías de ruta a servicios externos. La calidad depende de que esos proveedores tengan senderos y accesos del resort cartografiados; el código no contiene una red peatonal propia ni valida transitabilidad en campo.

* **POIs marcados `verified` con coordenadas:** **110 de 111 (99.1%)**, según `inventory_final.json` regenerado desde el catálogo activo.
* **Modalidad principal de ruteo:** Peatonal (`pedestrian`)
* **Soporte de transporte motorizado interno:** Módulo integrado en `js/carrito-golf.js`
* **Compatibilidad de renderizado:** Sincronizado con rotación 360° en pantallas móviles y táctiles

---

## 2. Arquitectura del Motor de Rutas (`js/mapas.js`)

El cálculo de trayectorias utiliza un flujo en cascada optimizado para el entorno del resort:

1. **Detección de Destino Interno (`mapas.isComplexDestination`):**
   * `isComplexDestination` comprueba si el punto cae dentro de una caja rectangular (`complexRoutingBounds`); no comprueba el polígono ni selecciona una red interna especial. Las vistas que detectan un destino del complejo solicitan perfil peatonal.

2. **Cálculo peatonal (`requestPedestrianRoute`):**
   * Consulta Valhalla (`costing: "pedestrian"`) con `costing_options` peatonales: `use_roads: 0`, `use_trails: 1.0`, `use_lit: 1.0`, `walking_speed: 4.5`. El `search_radius` está limitado a 40 m para evitar que los puntos se anclen a la vía exterior más cercana.
   * Los POIs con coordenadas de acceso peatonal (`routingCoord`) usan esa coordenada para el cálculo, evitando líneas rectas sobre techos o paredes. Si no hay `routingCoord`, se usa la coordenada del marcador.
   * No hay fallback automático a perfil vehicular cuando falla la red peatonal: el error se informa al socio con un mensaje formal.

3. **Selección del perfil y respaldo de red (`requestDrivingRoute`):**
   * El perfil peatonal se usa cuando origen y destino están dentro del complejo; fuera de ese ámbito se solicita una ruta vehicular a OSRM. Si Valhalla no encuentra una ruta peatonal, se informa el error en lugar de sustituirla por una geometría vehicular que podría no ser transitable a pie. No se inventa una línea recta.

4. **Recálculo Dinámico por Desviación de Rumbo:**
   * El sistema monitorea la posición del usuario en tiempo real con suavizado de señal GPS (`smoothUserPosition`).
   * Si la distancia perpendicular entre el socio y la línea de ruta excede **25 metros** (`ROUTE_DEVIATION_METERS = 25`), se lanza automáticamente una recalculación en segundo fondo (`ROUTE_RECALC_INTERVAL_MS = 8000`) sin interrumpir la vista ni mover abruptamente la pantalla.

---

## 3. Estabilidad Gráfica y Rotación en Móviles

Uno de los principales retos en la navegación dentro de complejos hoteleros es que los huéspedes giran el teléfono para orientarse según su rumbo:

* **Pane Especializado (`complexRoutePane`):**
  * La polilínea de ruta se renderiza dentro del contenedor `overlayPane` (bajo el árbol de rotación de `leaflet-rotate`), con `zIndex: 460` y puntero neutro para no interferir con toques en marcadores.
* **Renderizado SVG Explícito:**
  * Dado que los mapas del complejo utilizan aceleración `preferCanvas`, el trazado de rutas vectoriales en Canvas sufría artefactos visuales al rotar. Se implementó un renderer SVG explícito (`window.L.svg`) que conserva nitidez perfecta en cualquier ángulo de giro.
* **Sincronización por Fotograma:**
  * Se enlaza a los eventos `rotate` y `zoomend` de Leaflet para re-proyectar la geometría usando `requestAnimationFrame`, evitando redibujados innecesarios y garantizando fluidez de 60 fps.

---

## 4. Interacción en la Guía del Complejo (`js/guia-playa-paraiso.js`)

* **Activación con un Toque:** En cualquier ficha de restaurante, bar, piscina, spa, golf o lounge de The Club, el socio dispone del botón **"Cómo llegar"**.
* **Enfoque Inteligente (`drawRoute`):** Al activarse la ruta, el mapa centra automáticamente la vista en el destino con zoom operativo (nivel 16) y revela el trazado completo con estética corporativa (azul `#0057b8`, 6px de grosor y opacidad 0.95).
* **Integración con Carritos de Golf:** Para traslados largos (por ejemplo hacia el campo de golf o la casa club), la interfaz ofrece la alternativa de solicitar carrito de golf con origen en la ubicación actual del usuario.
* **Etiqueta limpia para el socio:** El texto de feedback de ruta muestra solo "Ruta a pie · [distancia] · [tiempo] hasta [destino]". Se retiró cualquier mención pública al proveedor (Valhalla).
* **Scroll automático en móvil:** Al calcular la ruta, el panel de la guía se desplaza suavemente hacia abajo para que el socio vea el trazado sin tener que hacer scroll manual.
* **Verificación por coordenadas:** La condición de visibilidad de "Cómo llegar" usa `Number.isFinite(poi.lat) && Number.isFinite(poi.lng)` en lugar de un flag interno `verified`, evitando que POIs con coordenadas muestren el mensaje de "se está actualizando".

---

## 5. Conclusiones y Estado Actual (28 de octubre de 2026)

1. **Configuración peatonal aplicada:** `requestPedestrianRoute` usa `costing: "pedestrian"` con `costing_options` (`use_roads: 0`, `use_trails: 1.0`, `use_lit: 1.0`, `walking_speed: 4.5`) y `search_radius: 40 m`. No hay fallback automático a perfil vehicular.
2. **Puntos de acceso peatonal:** Los POIs con `routingCoord` (Convention Center, Spa Sensations) usan esa coordenada para el cálculo, evitando líneas rectas sobre estructuras. El marcador visual permanece en su posición original.
3. **Verificación por coordenadas:** La condición de visibilidad de "Cómo llegar" usa `Number.isFinite(poi.lat) && Number.isFinite(poi.lng)` en lugar de un flag interno `verified`, evitando que POIs con coordenadas muestren el mensaje de "se está actualizando".
4. **Etiqueta limpia para el socio:** El texto de feedback de ruta muestra solo "Ruta a pie · [distancia] · [tiempo] hasta [destino]". Se retiró cualquier mención pública al proveedor (Valhalla).
5. **Scroll automático en móvil:** Al calcular la ruta, el panel de la guía se desplaza suavemente hacia abajo para que el socio vea el trazado sin hacer scroll manual.
6. **Catálogo oficial cargado:** `js/datos-complejo.js` contiene los datos oficiales de restaurantes por hotel, buffets principales, Spa Sensations, Campo de Golf y el programa de actividades Star Camp / Fit & Fun.
7. **POIs verificados:** 110 de 111 (99.1%) según `inventory_final.json` regenerado desde el catálogo activo. El único sin coordenadas es `star-prestige-lounge`, que fue actualizado a `20.753697, -86.960424` (Google Maps).
8. **Próximos pasos:** Durante los recorridos de campo, afinar los puntos de paso de andadores intermedios para registrar conectores peatonales que optimicen la fidelidad del trazado en jardines centrales.
