# Informe Oficial: Auditoría y Catálogo de Coordenadas — Complejo Iberostar Playa Paraíso

**Proyecto:** The Club Explorer | Iberostar The Club  
**Fecha de consolidación:** 23 de octubre de 2026  
**Entorno de referencia:** Rama `main` (Repositorio: `TheClubExplorer/Iberostar`)  
**Archivo fuente del catálogo:** `js/guia-playa-paraiso.js` e `inventory_final.json`  

---

## 1. Resumen Ejecutivo

El presente informe consolida el estado vigente y auditado de la totalidad de puntos de interés (POIs), instalaciones, zonas exclusivas para socios y rutas dentro del complejo **Iberostar Playa Paraíso**. 

A diferencia del corte preliminar del 15 de octubre de 2026, el catálogo activo contiene 111 registros. La etiqueta `verified` registra el estado declarado en el código; por sí sola no demuestra verificación independiente en sitio ni conexión con una ruta peatonal:

* **Total de registros en catálogo:** **111**
* **Registros marcados `verified` con coordenadas:** **110 (99.1%)**
* **Pendientes de coordenadas:** **1 (0.9%)**
* **Pendientes de ubicación / conflictivos:** **0 (0.0%)**

Los 110 registros marcados como verificados tienen coordenadas y caen dentro de los límites rectangulares usados por `inventory_final.json`. Ese cálculo es una caja envolvente, no una prueba punto-en-polígono del perímetro oficial ni una validación de accesos peatonales.

---

## 2. Puntos Clave Auditados y Consolidados

Los siguientes registros y coordenadas están declarados por el catálogo y las notas del proyecto. Esta revisión no vuelve a comprobarlos en sitio ni valida que el punto corresponda a una entrada transitable:

1. **Coco Bar (`cocobar`):**
   * **Estado en catálogo:** `verified: true`
   * **Coordenadas:** `20.756290, -86.959046`
   * **Nota:** El catálogo reemplazó una coordenada histórica por esta. Esta revisión no valida de forma independiente el punto ni la entrada peatonal.

2. **THE CLUB (`theclub`):**
   * **Estado en catálogo:** `verified: true`
   * **Coordenadas:** `20.7598333, -86.9652778`
   * **Identidad:** Representa el Lounge y punto neurálgico de atención para socios de The Club, destacado con marcador diamante giratorio y ficha con branding oficial.

3. **Zonas Star Prestige:**
   * **Star Prestige Beach Club (`star-prestige-beach-club`):** `20.756829, -86.958688` (Iberostar Paraíso JOIA) — **Verificado**.
   * **Star Prestige Paraíso Maya (`star-prestige-maya`):** `20.757650, -86.964755` — **Verificado**.
   * **Star Prestige JOIA (`star-prestige-joia`):** `20.756156, -86.962287` — **Verificado**.

4. **Concierge:**
   * **Head Concierge (`head-concierge`):** `20.759753, -86.965457` — **Verificado**.
   * **Concierge Paraíso Lindo (`concierge-lindo`):** `20.759481, -86.963898` — **Verificado**.
   * **Concierge JOIA (`concierge-joia`):** `20.756125, -86.962989` — **Verificado**.
   * **Concierge Grand Paraíso (`concierge-grand-paraiso`):** `20.753724, -86.960434` — **Verificado**.

5. **Consolidaciones y Limpieza de Duplicados:**
   * **El Mirador:** Consolidado como `lobby-bar-el-mirador` (`20.756335, -86.962712`, JOIA), unificando la heladería y lobby bar en una sola entidad.
   * **El Puente:** Consolidado como `bar-el-puente` (`20.757172, -86.960979`), unificando bar y heladería. El punto de playa se reasignó correctamente a `aqua-bar-las-olas` (`20.7586198, -86.9590972`).
   * **Teatros:** `teatro-music-hall` (`20.7591882, -86.9627312`), `teatro-coliseo` (`20.756739, -86.962693`) y `teatro-mar-playa` (`20.7608353, -86.9625428`, antes clasificado erróneamente como casino en el plano histórico).

---

## 3. Distribución por Categoría

| Categoría (`category`) | Total en Catálogo | Marcados verificados | Pendientes |
| :--- | :---: | :---: | :---: |
| Hoteles (`hotel`) | 5 | 5 | 0 |
| Restaurantes (`restaurante`) | 33 | 33 | 0 |
| Bares (`bar`) | 20 | 20 | 0 |
| Piscinas (`piscina`) | 11 | 11 | 0 |
| Servicios (`servicio`) | 6 | 6 | 0 |
| Deportes (`deportes`) | 6 | 6 | 0 |
| Spa (`spa`) | 4 | 4 | 0 |
| Entretenimiento (`entretenimiento`) | 4 | 4 | 0 |
| Comercios (`comer`) | 4 | 4 | 0 |
| Concierge (`concierge`) | 4 | 4 | 0 |
| Star Prestige (`starprestige`) | 4 | 3 | 1 |
| Golf (`golf`) | 2 | 2 | 0 |
| Convenciones (`conv`) | 2 | 2 | 0 |
| Kids (`kids`) | 2 | 2 | 0 |
| Club (`club`) | 2 | 2 | 0 |
| Discoteca (`discoteca`) | 1 | 1 | 0 |
| Playa (`playa`) | 1 | 1 | 0 |
| **TOTAL** | **111** | **110 (99.1%)** | **1 (0.9%)** |

---

## 4. Detalle del Punto Pendiente

Queda 1 instalación sin coordenadas en el catálogo:

1. **`star-prestige-lounge` (Star Prestige Lounge):** Salón interior del área Star Prestige (pendiente de geolocalización fina en el edificio).

---

## 5. Auditoría del Motor de Navegación y Rutas

* **Cálculo Peatonal:** `mapas.computeRoute` intenta Valhalla (`costing: "pedestrian"`) y, si falla, solicita geometría a OSRM (`driving`). No existe una red peatonal local en el repositorio; OSRM puede seguir calles o caminos vehiculares y no garantiza senderos interiores.
* **Recálculo Automático por Desviación:** El sistema evalúa continuamente la posición GPS suavizada del socio mediante `smoothUserPosition`. Si la desviación respecto a la ruta activa excede **25 metros** (`ROUTE_DEVIATION_METERS = 25`), la ruta se recalcula de forma transparente sin bloquear la vista.
* **Estabilidad Visual y Rotación:** Las polilíneas de ruta se proyectan en un pane dedicado (`complexRoutePane`, z-index 460) utilizando renderizado SVG explícito. Se vincula al evento `rotate` y `zoomend` de Leaflet Rotate, evitando deformaciones gráficas al rotar el mapa con dos dedos en dispositivos móviles.

---

## 6. Sincronización de Archivos del Proyecto

El estado expuesto en esta auditoría se encuentra reflejado sincrónicamente en:
* `js/guia-playa-paraiso.js` (Lógica y catálogo maestro de POIs)
* `inventory_final.json` (Matriz de datos estructurada con estados y flags de bounds)
* `js/mapas.js` (Motor de navegación y cálculo)
* `js/carrito-golf.js` (Simulación de traslados a POIs verificados)
* `js/datos-complejo.js` (Menús, horarios, tratamientos y actividades asociadas a los POIs)
