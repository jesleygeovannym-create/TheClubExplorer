# HISTORIAL DE ACTUALIZACIONES Y AMPLIACIÓN — COMPLEJO PLAYA PARAÍSO
Última actualización: 2026-10-23
Documento maestro de referencia: `AUDITORIA_COORDENADAS_COMPLEJO_PLAYA_PARADISO.md`

> **Nota de estado:** `inventory_final.json` se regeneró desde el catálogo activo: 111 registros, 110 marcados como verificados (99.1%) y 1 pendiente de coordenadas (0.9%). `verified` refleja los datos del código, no una nueva validación independiente en terreno.

## Resumen de Consolidación Activa (2026-10-23)
- **Catálogo activo:** 111 instalaciones.
- **Marcados verificados con coordenadas:** 110.
- **Pendientes restantes (1):** `star-prestige-lounge`.

## Actualización de implementación (2026-10-22)

Esta ampliación se contrasta con `js/guia-playa-paraiso.js`, que refleja los cambios actuales de la guía. El conteo de inventario anterior corresponde a un corte previo y no debe tomarse como estado actual: `inventory_final.json` y el listado pendiente de abajo contienen estados obsoletos.

### Ubicaciones ya implementadas en la guía
- **Coco Bar (`cocobar`):** coordenadas actuales `20.756290,-86.959046`, `source:"Google Maps"`, `verified:true`. Esto reemplaza los registros históricos de `inventory_final.json` (`20.7631,-86.9618`) y de la actualización previa de esta auditoría (`20.756434560304122,-86.9589709211595`).
- **THE CLUB (`theclub`):** la guía asigna `20.7598333,-86.9652778` desde `OSM_COORDS` y lo marca `verified:true`, con feature `THE CLUB`. El registro antiguo sin coordenadas ya no representa la implementación actual.
- **Restaurantes añadidos/verificados por Google Maps:** Beach Grill (`20.7578219,-86.9582285`), El Fogón Steak House (`20.756879,-86.959677`), El Fogón Italiano (`20.757161,-86.959936`), Coco Buffet (`20.756466,-86.958965`), El Colonial (`20.7609943,-86.963447`) y Trattoria by El Faro (`20.7589509,-86.9583723`). Todos se registran con `verified:true`.
- **Head Concierge (`head-concierge`):** `20.759753,-86.965457`, `source:"Google Maps"`, `verified:true`.
- **Star Prestige Beach Club (`star-prestige-beach-club`):** asociado a Iberostar Paraíso JOIA, `20.756829,-86.958688`, `source:"Google Maps"`, `verified:true`.
- **Fit & Fun Playa Paraíso (`fit-fun-playa-paraiso`):** `20.7603125,-86.9645625`, `source:"Google Maps"`, `verified:true`.
- **Buffet La Marina (`buffet-la-marina`):** `20.757842,-86.963819`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Buffet El Tapatío (`buffet-el-tapatio`):** `20.756848,-86.960399`, `hotelId:"Iberostar Paraíso Maya"`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22 (hotel: Paraíso Maya); sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Consolidación El Mirador (2026-10-22):** el usuario confirmó que **Heladería El Mirador y Lobby Bar El Mirador son el mismo lugar**. Se mantuvo `lobby-bar-el-mirador` con sus coordenadas (`20.756335,-86.962712`, hotelId JOIA) y nombre; se eliminó el POI `heladeria-el-mirador` de la guía. Referencias huérfanas en `js/datos-complejo.js` (detalles de carta) e `inventory_final.json` quedan sin efecto y se limpiarán al regenerar el catalogo.
- **Verificaciones bares (2026-10-22):** `lobby-bar-acuario` ("Lobby Bar Acuario") = `20.7595512,-86.963491`, `sports-bar-corner` ("Sports Bar Corner") = `20.7596764,-86.9634133` y `bar-teatro` ("Bar Teatro") = `20.759376,-86.962659`, los tres `source:"Google Maps"`, `verified:true`, confirmados por el usuario y **todos asignados al hotel Iberostar Paraíso Lindo**. También quedó aclarado que **Pool Bar "Las Olas" y Aqua Bar "Las Olas" son lugares distintos** (ambos conservados como POIs separados) y que el buscador anterior azul ("Beach Bar / Bar de playa", genérico sin coordenadas) no tiene doble registro.
- **Bar Teatro (`bar-teatro`):** `20.759376,-86.962659`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Beach Bar (`beach-bar`):** `20.757856,-86.958359`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; ya no es el punto genérico de plano sin coordenadas que era.
- **Consolidación El Puente (2026-10-22):** el usuario confirmó que **Heladería El Puente y Bar El Puente son el mismo lugar**. Se eliminó el POI `heladeria-el-puente` y su detalle de carta; quedó `bar-el-puente` con su coordenada de `OSM_COORDS` (`20.7586198,-86.9590972`) y la descripción ampliada ("incluye la heladería").
- **Pool Bar Las Olas (`pool-bar-las-olas`):** `20.757897,-86.961767`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22 (corrección de la primera cifra que envió, `20.757435,-86.961388`); sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía. Conserva su identidad de POI separado respecto a Aqua Bar "Las Olas".
- **Corrección Bar El Puente / Aqua Bar Las Olas (2026-10-22):** el punto de la playa que el catálogo traía como `bar-el-puente` vía `OSM_COORDS` (`20.7586198,-86.9590972`) **en realidad es el Aqua Bar "Las Olas"**: se reasignó como coords de `aqua-bar-las-olas` (`source:"OpenStreetMap"`, `verified:true`) y su fila de `OSM_COORDS` se eliminó. El Bar El Puente real quedó con `20.757172,-86.960979` (`source:"Google Maps"`, `verified:true`, incluye la heladería consolidada).
- **Consolidación Kukulkán / Star Café Maya (2026-10-22):** el usuario confirmó que el punto registrado como `starcafe-maya` (`20.7575018,-86.9645296`) en realidad es el **Lobby Bar "Kukulkán"**. Se eliminó `starcafe-maya` y `lobby-bar-kukulkan` quedó con esas coordenadas, `hotelId:"Iberostar Paraíso Maya"`, `source:"Google Maps"`, `verified:true`.
- **Music Bar Rhapsody (`music-bar-rhapsody`):** `20.756312,-86.962411`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía. Hotel pendiente de confirmar (zona JOIA, junto al lobby-bar-el-mirador).
- **Aqua Bar La Sirenita (`aqua-bar-la-sirenita`):** `20.754775,-86.960108`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía. Hotel pendiente de confirmar (zona Grand Paraíso/JOIA).
- **PENDIENTE — La Cúpula Bar / Star Rock Café (2026-10-22):** el usuario identificó que el punto de `star-rock-cafe` (asignado por `OSM_COORDS` como `20.7618856,-86.9627721`) en realidad es el **"La Cupula Bar"** (`20.7621251,-86.9630263`, place `0x8f4e610050ca7fa5:0x369f138ff1252b80`). **No se aplicó ningún cambio** a petición del usuario; queda registrado para cuando ordene el ajuste.
- **Cascada y jacuzzi (`waterfall-jacuzzi`):** `20.759539,-86.960991`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Piscina tranquila (`quiet-pool`):** `20.759600,-86.960224`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Piscina de actividades (`activities-pool`):** `20.759267,-86.959714`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Jacuzzi (`jacuzzi`):** `20.757415,-86.960793`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Piscina privada (`private-pool`):** `20.756499,-86.960229`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Piscina cubierta (`indoor-pool`):** `20.756076,-86.961331`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía (zona junto al spa-joia).
- **Piscina principal (`main-pool`):** `20.754701,-86.960497`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía (zona Grand Paraíso).
- **Teatro Music Hall (`teatro-music-hall`):** `20.7591882,-86.9627312`, `source:"Google Maps"`, `verified:true`. Coordenada de Google Maps ("Theater Paraíso Lindo-Maya", place `0x8f4e61005f5eb77d:0x50665cfa02c20d1`) proporcionada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía.
- **Teatro Mar-Playa (antes "Casino") (2026-10-22):** el usuario confirmó que el punto que el plano etiquetaba "Casino" es en realidad el **"Teatro Mar-Playa"** (`20.7608353,-86.9625428`, place `0x8f4e6100099b7827:0xd7d0b35592b80108`). Se sustituyó la entrada `casino` por `teatro-mar-playa` (`category:"entretenimiento"`, `source:"Google Maps"`, `verified:true`).
- **Health Bar SPA (`health-bar-spa`):** `20.756025,-86.961423`, `source:"Google Maps"`, `verified:true`. Coordenada confirmada por el usuario el 2026-10-22; sustituye la entrada de plano sin coordenadas (`verified:false`) que tenía. Hotel pendiente de confirmar (zona coincide con el sector JOIA: spa-joia/fit-fun-joia).
- **Restaurant La Marina (`la-marina`):** `20.7577902,-86.9640737`, `source:"Google Maps"`, `verified:true`. Ubicación de Google Maps del "Restaurant La Marina" proporcionada por el usuario el 2026-10-22 (place `0x8f4e6134896ed84f:0x19a130465789f386`); sustituye la asignación de `OSM_COORDS` (`20.7578746,-86.9638876`), cuya fila se eliminó al quedar la coordenada propia en el POI.

Estos estados describen lo implementado en el código; las fuentes Google Maps se consignan según el propio registro y no implican una nueva verificación independiente durante esta actualización. El listado histórico de pendientes que sigue abajo queda supersedido. Pendiente: regenerar `inventory_final.json` y el listado/conteo completo desde el catálogo activo para reemplazarlo.

### Recuento del catálogo activo (actualizado 2026-10-23)

Conteo actualizado ejecutando `node scripts/generate_inventory.js` sobre el catálogo activo en `js/guia-playa-paraiso.js` y aplicando las asignaciones de `OSM_COORDS`: **110 registros marcados verificados con coordenadas y 1 pendiente de coordenadas**, de **111 registros** en total (incluye los 5 hoteles). No hay registros activos con coordenadas pero sin verificar. Este resultado reemplaza los recuentos históricos de 96/18 y 111/3.

Pendientes de coordenadas:

- Star Prestige Lounge

`Mar Caribe` tiene coordenadas y es una etiqueta de área, no un punto de instalación. Este recuento refleja los datos implementados en el catálogo, no una validación externa nueva. La lista extensa que sigue corresponde solo al corte histórico de 2026-10-15; la lista actual de pendientes está arriba.

## POIs pendientes del corte anterior (50; lista obsoleta)

El siguiente listado conserva el detalle histórico del corte del 2026-10-15. No usarlo como lista actual: al menos Coco Bar, THE CLUB, Head Concierge y Star Prestige Beach Club ya aparecen implementados como verificados en la guía activa. El inventario actual se encuentra regenerado en `inventory_final.json`.

### cocobar [Pendiente de ubicación]
- Cat: bar | Nombre: Coco Bar
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### theclub [Pendiente de coordenadas]
- Cat: club | Nombre: THE CLUB
- OSM hits: Lucy's Miniclub(20.75898,-86.96002); Clubhouse(20.75909,-86.95903); Golf Clubhouse(20.75863,-86.96586)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### beach-grill [Pendiente de coordenadas]
- Cat: restaurante | Nombre: Beach Grill
- OSM hits: Beach Buffet(20.75653,-86.95888); Under the Sea American Grill(20.75687,-86.95974)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### el-fogon-steak [Pendiente de coordenadas]
- Cat: restaurante | Nombre: El FogÃ³n (Steak House)
- OSM hits: Clubhouse(20.75909,-86.95903); Golf Clubhouse(20.75863,-86.96586)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### el-fogon-italiano [No verificable]
- Cat: restaurante | Nombre: El FogÃ³n (Italiano)
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### coco-buffet [Pendiente de coordenadas]
- Cat: restaurante | Nombre: Coco Buffet
- OSM hits: Beach Buffet(20.75653,-86.95888)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### latelier [Pendiente de coordenadas]
- Cat: restaurante | Nombre: L'Atelier
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### baby-kitchen [Pendiente de coordenadas]
- Cat: servicio | Nombre: Baby Kitchen
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### sports-bar-corner [Pendiente de coordenadas]
- Cat: bar | Nombre: Sports Bar Corner
- OSM hits: Sports Pool(20.75808,-86.96185)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### heladeria-el-puente [Pendiente de coordenadas]
- Cat: bar | Nombre: HeladerÃ­a El Puente
- OSM hits: El Puente(20.75866,-86.95905); El Puente(20.75716,-86.96097)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### heladeria-el-mirador [Pendiente de coordenadas]
- Cat: bar | Nombre: HeladerÃ­a El Mirador
- OSM hits: Mirador(20.75637,-86.96279)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### star-rock-cafe [Pendiente de coordenadas]
- Cat: bar | Nombre: Star Rock CafÃ©
- OSM hits: Iberostar Paraiso Lindo(20.75956,-86.96382); Star Hamburgers(20.75982,-86.96630); Iberostar Playa Paraiso Resort(20.75789,-86.96134); Star Market(20.75746,-86.96137); Star Camp(20.76071,-86.96471)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### pool-bar-las-olas [Pendiente de coordenadas]
- Cat: bar | Nombre: Pool Bar Las Olas
- OSM hits: Vitolas(20.75932,-86.96569); Wave Pool(20.75780,-86.96153); Sports Pool(20.75808,-86.96185); Las Olas(20.75785,-86.96176)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### lobby-bar-kukulkan [Pendiente de coordenadas]
- Cat: bar | Nombre: Lobby Bar KukulkÃ¡n
- OSM hits: La Cupula Lobby Bar(20.76221,-86.96293)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### music-bar-rhapsody [No verificable]
- Cat: bar | Nombre: Music Bar Rhapsody
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### lobby-bar-el-mirador [Pendiente de coordenadas]
- Cat: bar | Nombre: Lobby Bar El Mirador
- OSM hits: La Cupula Lobby Bar(20.76221,-86.96293); Mirador(20.75637,-86.96279)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### aqua-bar-la-sirenita [No verificable]
- Cat: bar | Nombre: Aqua Bar La Sirenita
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### health-bar-spa [Pendiente de coordenadas]
- Cat: bar | Nombre: Health Bar SPA
- OSM hits: Spa(20.76027,-86.96628)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### bar-teatro [Pendiente de coordenadas]
- Cat: bar | Nombre: Bar Teatro
- OSM hits: El Teatro(20.76083,-86.96248)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### aqua-bar-las-olas [Pendiente de coordenadas]
- Cat: bar | Nombre: Aqua Bar Las Olas
- OSM hits: Vitolas(20.75932,-86.96569); Las Olas(20.75785,-86.96176)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### lobby-bar-acuario [Pendiente de coordenadas]
- Cat: bar | Nombre: Lobby Bar Acuario
- OSM hits: La Cupula Lobby Bar(20.76221,-86.96293)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### waterfall-jacuzzi [Pendiente de coordenadas]
- Cat: piscina | Nombre: Cascada y jacuzzi
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### quiet-pool [Pendiente de coordenadas]
- Cat: piscina | Nombre: Piscina tranquila
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### activities-pool [Pendiente de coordenadas]
- Cat: piscina | Nombre: Piscina de actividades
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### jacuzzi [Pendiente de coordenadas]
- Cat: piscina | Nombre: Jacuzzi
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### private-pool [Pendiente de coordenadas]
- Cat: piscina | Nombre: Piscina privada
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### indoor-pool [Pendiente de coordenadas]
- Cat: piscina | Nombre: Piscina cubierta
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### main-pool [Pendiente de coordenadas]
- Cat: piscina | Nombre: Piscina principal
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### massage-palapa [Pendiente de coordenadas]
- Cat: spa | Nombre: Palapas de masajes
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### tennis [No verificable]
- Cat: deportes | Nombre: Tenis
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### shooting-area [Pendiente de coordenadas]
- Cat: deportes | Nombre: Campo de tiro
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### teatro-music-hall [Pendiente de coordenadas]
- Cat: entretenimiento | Nombre: Teatro Music Hall
- OSM hits: El Teatro(20.76083,-86.96248)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### teatro-coliseo [Pendiente de coordenadas]
- Cat: entretenimiento | Nombre: Teatro Coliseo
- OSM hits: El Teatro(20.76083,-86.96248)
- En plano PDF: No | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### casino [Pendiente de coordenadas]
- Cat: entretenimiento | Nombre: Casino
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### shopping-mall [Pendiente de coordenadas]
- Cat: comer | Nombre: Centro comercial
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### pool-shop [Pendiente de coordenadas]
- Cat: comer | Nombre: Tienda de piscina
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### meeting-room [Pendiente de coordenadas]
- Cat: servicio | Nombre: Sala de juntas
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### agencies-phones [Retirado del catálogo activo 2026-10-23]
- Cat: servicio | Nombre: Agencias y telÃ©fonos
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### billiards-library [Actualizado 2026-10-23: coordenadas proporcionadas]
- Cat: servicio | Nombre: Internet, billar, biblioteca
- Coordenadas: 20.760721, -86.963638 (`verified: true` en el catálogo)
- OSM hits: (ninguno identificado en la auditoría original)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: La coordenada fue proporcionada para este POI y añadida al catálogo. No fue verificada de forma independiente en OSM o extraída del plano; el análisis original de fuentes se conserva como histórico.

### medical-center [No verificable]
- Cat: servicio | Nombre: Centro mÃ©dico
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### drugstore [Pendiente de coordenadas]
- Cat: servicio | Nombre: Farmacia
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### preview-gallery [Pendiente de coordenadas]
- Cat: servicio | Nombre: Preview Gallery
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### head-concierge [Pendiente de coordenadas]
- Cat: servicio | Nombre: Head Concierge
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### star-prestige-lounge [Pendiente de coordenadas]
- Cat: servicio | Nombre: Star Prestige Lounge
- OSM hits: Iberostar Paraiso Lindo(20.75956,-86.96382); Star Hamburgers(20.75982,-86.96630); Iberostar Playa Paraiso Resort(20.75789,-86.96134); Star Market(20.75746,-86.96137); Star Camp(20.76071,-86.96471)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### star-prestige-beach-club [Pendiente de coordenadas]
- Cat: servicio | Nombre: Star Prestige Beach Club
- OSM hits: Iberostar Paraiso Lindo(20.75956,-86.96382); Beach Buffet(20.75653,-86.95888); Star Hamburgers(20.75982,-86.96630); Iberostar Playa Paraiso Resort(20.75789,-86.96134); Lucy's Miniclub(20.75898,-86.96002); Clubhouse(20.75909,-86.95903); Star Market(20.75746,-86.96137); Golf Clubhouse(20.75863,-86.96586); Star Camp(20.76071,-86.96471)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.

### guest-service [No verificable]
- Cat: servicio | Nombre: Relaciones pÃºblicas
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### courtesy-room [No verificable]
- Cat: servicio | Nombre: Duchas de cortesÃ­a
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### paraiso-express-stop [Retirado del catálogo activo 2026-10-23]
- Cat: servicio | Nombre: ParaÃ­so Express Stop
- OSM hits: (ninguno)
- En plano PDF: No | Certidumbre: ninguna
- Evaluación: No identificado en OSM ni en el plano oficial extraído. Fuente de ubicación desconocida.

### village-villas [Retirado del catálogo activo 2026-10-23]
- Cat: servicio | Nombre: Village / Villas
- OSM hits: (ninguno)
- En plano PDF: Si | Certidumbre: baja
- Evaluación: Mencionado en el plano oficial (PDF), pero no identificado en el OSM del bbox. Coordenadas no extraíbles del PDF.

### star-friends-desk [Pendiente de coordenadas]
- Cat: kids | Nombre: Star Friends Desk
- OSM hits: Iberostar Paraiso Lindo(20.75956,-86.96382); Star Hamburgers(20.75982,-86.96630); Iberostar Playa Paraiso Resort(20.75789,-86.96134); Star Market(20.75746,-86.96137); Star Camp(20.76071,-86.96471)
- En plano PDF: Si | Certidumbre: media
- Evaluación: Coincidencia OSM cercana (nombre similar). Posible ubicación aproximada, pero no suficiente para marcar como Verificado sin confirmar con plano detallado.
