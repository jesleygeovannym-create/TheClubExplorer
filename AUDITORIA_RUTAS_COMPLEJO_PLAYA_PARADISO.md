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
   * Consulta Valhalla (`costing: "pedestrian"`) y dibuja la geometría devuelta por el proveedor, con los puntos de origen y destino añadidos por la interfaz. No hay cálculo de accesos ni grafo peatonal local.

3. **Selección del perfil y respaldo de red (`requestDrivingRoute`):**
   * El perfil peatonal se usa cuando origen y destino están dentro del complejo; fuera de ese ámbito se solicita una ruta vehicular a OSRM. Si Valhalla no encuentra una ruta peatonal, se informa el error en lugar de sustituirla por una geometría vehicular que podría no ser transitable a pie. No se inventa una línea recta.

4. **Recálculo Dinámico por Desviación de Rumbo:**
   * El sistema monitorea la posición del usuario en tiempo real con suavizado de señal GPS (`smoothUserPosition`).
   * Si la distancia perpendicular entre el socio y la línea de ruta excede **25 metros** (`ROUTE_DEVIATION_METERS = 25`), se lanza automáticamente una recalculación en segundo plano (`ROUTE_RECALC_INTERVAL_MS = 8000`) sin interrumpir la vista ni mover abruptamente la pantalla.

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

---

## 5. Conclusiones y Próximos Pasos

1. Los POIs con `verified: true` y coordenadas admiten solicitud a los proveedores; eso no garantiza que se encuentre un camino peatonal transitable hasta el establecimiento.
2. El catálogo activo contiene 110 registros verificados y 1 sin coordenadas: `star-prestige-lounge`.
3. Se recomienda, durante los recorridos de campo previos al 28 de octubre, afinar los puntos de paso de andadores intermedios para registrar conectores peatonales que optimicen aún más la fidelidad del trazado en jardines centrales.
