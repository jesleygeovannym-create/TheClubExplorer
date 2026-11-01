// Guía interactiva del complejo Iberostar Playa Paraíso
// Catálogo verificado a partir del plano oficial + páginas oficiales
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  window.RevistaDigital.guiapa = window.RevistaDigital.guiapa || {};

  const CATEGORIES = {
    hotel: { icon: "building", color: "#0057b8" },
    club: { icon: "star", color: "#b8860b" },
    starprestige: { icon: "star", color: "#0057b8" },
    concierge: { icon: "concierge-bell", color: "#0b3d66" },
    restaurante: { icon: "utensils", color: "#d4af37" },
    bar: { icon: "cocktail", color: "#5f9ea0" },
    piscina: { icon: "swimming", color: "#1e90ff" },
    spa: { icon: "spa", color: "#8a2be2" },
    golf: { icon: "golf-ball", color: "#2e8b57" },
    playa: { icon: "umbrella-beach", color: "#f0e68c" },
    comer: { icon: "shopping-bag", color: "#cd853f" },
    deportes: { icon: "dumbbell", color: "#708090" },
    entretenimiento: { icon: "music", color: "#ff69b4" },
    servicio: { icon: "info", color: "#808080" },
    wellness: { icon: "spa", color: "#8a2be2" },
    kids: { icon: "child", color: "#ffb6c1" },
    conv: { icon: "building", color: "#a9a9a9" },
    discoteca: { icon: "music", color: "#ff1493" }
  };

  // Catálogo base alineado con lo verificado (se expandirá con coordenadas OSM)
  const POIS = [
    // Hoteles (reutilizarán hotelCoordinates existentes; marcados como verified si coords conocidas)
    {
      id: "del-mar",
      name: "Iberostar Waves Paraíso del Mar",
      category: "hotel",
      hotelId: "Iberostar Paraíso del Mar",
      lat: 20.7612389,
      lng: -86.9640931,
      description: "Hotel familiar",
      source: "official",
      verified: true
    },
    {
      id: "beach",
      name: "Iberostar Waves Paraíso Beach",
      category: "hotel",
      hotelId: "Iberostar Paraíso Beach",
      lat: 20.7584,
      lng: -86.9585,
      description: "Hotel familiar",
      source: "official",
      verified: true
    },
    {
      id: "lindo",
      name: "Iberostar Selection Paraíso Lindo",
      category: "hotel",
      hotelId: "Iberostar Paraíso Lindo",
      lat: 20.7596096,
      lng: -86.9639649,
      description: "Hotel Selection",
      source: "official",
      verified: true
    },
    {
      id: "maya",
      name: "Iberostar Selection Paraíso Maya",
      category: "hotel",
      hotelId: "Iberostar Paraíso Maya",
      lat: 20.7578835,
      lng: -86.9648766,
      description: "Hotel Selection",
      source: "official",
      verified: true
    },
    {
      id: "joia",
      name: "JOIA Paraíso by Iberostar",
      category: "hotel",
      hotelId: "Iberostar Paraíso JOIA",
      lat: 20.7563073,
      lng: -86.9629786,
      description: "Solo adultos (5*)",
      source: "official",
      verified: true
    }
  ];

  POIS.push({"id":"golf","name":"Iberostar Playa Paraíso Golf Club","category":"golf","lat":20.75946,"lng":-86.96714,"description":"Campo 18 hoyos"},
    {"id":"convention","name":"Centro de Convenciones","category":"conv","lat":20.76143,"lng":-86.96538,"description":"Centro de convenciones del complejo"},
    {"id":"spa","name":"Spa Sensations","category":"spa","lat":20.76032,"lng":-86.96629,"description":"Spa del complejo"},
    {"id":"starcamp","name":"Star Camp","category":"kids","lat":20.76071,"lng":-86.96471,"description":"Star Camp"},
    {"id":"galaxy","name":"Discoteca Galaxy","category":"discoteca","lat":20.75955,"lng":-86.966,"description":"Discoteca del complejo (+18)"},
    // Coco Bar: coordenada verificada manualmente (Google Maps).
    {"id":"cocobar","name":"Coco Bar","category":"bar","lat":20.756290,"lng":-86.959046,"description":"Coco Bar"},
    {"id":"starcafe","name":"Star Café","category":"bar","lat":20.7585,"lng":-86.963,"description":"Star Café"});
  POIS.push({"id":"theclub","name":"THE CLUB","category":"club","description":"Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.","hours":"08:00 - 22:00","amenities":"Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas"},
    {"id":"playa-mar-caribe","name":"Mar Caribe","category":"playa","description":"Mar Caribe / Caribbean Sea"});
  POIS.push(
    {"id":"hashiru","name":"Hashiru","category":"restaurante","description":"Restaurante japonés"},
    {"id":"la-dorada","name":"La Dorada","category":"restaurante","description":"Restaurante mediterráneo"},
    {"id":"rodizio","name":"Rodizio","category":"restaurante","description":"Restaurante de especialidad brasileño"},
    {"id":"el-mercado","name":"El Mercado","category":"restaurante","description":"Restaurante buffet"},
    {"id":"la-plaza","name":"La Plaza","category":"restaurante","description":"Restaurante buffet"},
    {"id":"la-hacienda","name":"La Hacienda","category":"restaurante","description":"Restaurante mexicano"},
    {"id":"el-puerto","name":"El Puerto","category":"restaurante","description":"Restaurante de especialidad"},
    {"id":"beach-grill","name":"Beach Grill","category":"restaurante","lat":20.7578219,"lng":-86.9582285,"description":"Grill de playa"},
    {"id":"burgers","name":"Burgers","category":"restaurante","description":"Hamburguesas"},
    {"id":"antojitos-tacos","name":"Antojitos / Tacos","category":"restaurante","description":"Antojitos / Tacos"},
    {"id":"crepes","name":"Crepes & Ice Cream","category":"restaurante","description":"Crepas y helados"},
    {"id":"el-museo","name":"El Museo","category":"restaurante","description":"Restaurante gourmet"},
    {"id":"jambalaya","name":"Jambalaya","category":"restaurante","description":"Restaurante cajún"},
    {"id":"la-pagoda","name":"La Pagoda","category":"restaurante","description":"Restaurante buffet"},
    {"id":"el-fogon-steak","name":"El Fogón (Steak House)","category":"restaurante","lat":20.756879,"lng":-86.959677,"description":"Steak house"},
    {"id":"el-fogon-italiano","name":"El Fogón (Italiano)","category":"restaurante","lat":20.757161,"lng":-86.959936,"description":"Restaurante italiano"},
    {"id":"coco-buffet","name":"Coco Beach Snack Bar","category":"restaurante","lat":20.756466,"lng":-86.958965,"description":"Snack bar de playa"},
    {"id":"el-rancho","name":"El Rancho","category":"restaurante","description":"Steak house"},
    {"id":"la-geisha","name":"La Geisha","category":"restaurante","description":"Restaurante japonés"},
    {"id":"letoile","name":"L'Etoile","category":"restaurante","description":"Cocina francesa"},
    {"id":"la-marina","name":"La Marina","category":"restaurante","lat":20.7577902,"lng":-86.9640737,"description":"Restaurante mediterráneo"},
    {"id":"el-tapatio","name":"El Tapatío","category":"restaurante","description":"Restaurante mexicano / buffet"},
    {"id":"venecia","name":"Venecia","category":"restaurante","description":"Restaurante italiano"},
    {"id":"bellavista","name":"Bellavista","category":"restaurante","description":"Restaurante buffet"},
    {"id":"latelier","name":"L'Atelier","category":"restaurante","description":"Restaurante gourmet"},

    {"id":"haiku","name":"Haiku","category":"restaurante","description":"Restaurante japonés"},
    {"id":"la-brisa","name":"La Brisa Beach Bar","category":"bar","hotelId":"Iberostar Paraíso JOIA","description":"Bar de playa"},
    {"id":"baby-kitchen","name":"Baby Kitchen","category":"servicio","lat":20.758029,"lng":-86.963437,"description":"Cocina para bebés"});
  POIS.push(
    {"id":"sports-bar-corner","name":"Sports Bar Corner","category":"bar","hotelId":"Iberostar Paraíso Lindo","lat":20.7596764,"lng":-86.9634133,"description":"Sports bar"},
    // "Heladería El Puente" y "Bar El Puente" son el mismo lugar; quedó un único
    // POI ("bar-el-puente", en 20.757172,-86.960979). El punto de la playa que
    // antes se etiquetó como "Bar El Puente" en realidad es Aqua Bar Las Olas.
    // "Heladería El Mirador" y "Lobby Bar El Mirador" también son el mismo
    // lugar; quedó un único POI ("lobby-bar-el-mirador") con las coords de Google Maps.
    {"id":"star-rock-cafe","name":"Star Rock Café","category":"bar","description":"Star Rock Café"},
    {"id":"pool-bar-las-olas","name":"Pool Bar Las Olas","category":"bar","lat":20.757897,"lng":-86.961767,"description":"Bar de piscina"},
    {"id":"lobby-bar-kukulkan","name":"Lobby Bar Kukulkán","category":"bar","hotelId":"Iberostar Paraíso Maya","lat":20.7575018,"lng":-86.9645296,"description":"Lobby bar"},
    {"id":"music-bar-rhapsody","name":"Music Bar Rhapsody","category":"bar","lat":20.756312,"lng":-86.962411,"description":"Music bar"},
    {"id":"lobby-bar-el-mirador","name":"Lobby Bar El Mirador","category":"bar","hotelId":"Iberostar Paraíso JOIA","lat":20.756335,"lng":-86.962712,"description":"Lobby bar"},
    {"id":"aqua-bar-la-sirenita","name":"Aqua Bar La Sirenita","category":"bar","lat":20.754775,"lng":-86.960108,"description":"Aqua bar"},
    {"id":"health-bar-spa","name":"Health Bar SPA","category":"bar","lat":20.756025,"lng":-86.961423,"description":"Health bar"},
    {"id":"aqua-bar-la-perla","name":"Aqua Bar La Perla","category":"bar","description":"Aqua bar"},
    {"id":"bar-teatro","name":"Bar Teatro","category":"bar","hotelId":"Iberostar Paraíso Lindo","lat":20.759376,"lng":-86.962659,"description":"Bar de teatro"},
    {"id":"lobby-bar-la-fuente","name":"Lobby Bar La Fuente","category":"bar","description":"Lobby bar"},
    {"id":"aqua-bar-las-olas","name":"Aqua Bar Las Olas","category":"bar","lat":20.7586198,"lng":-86.9590972,"description":"Aqua bar (zona de playa)"},
    {"id":"lobby-bar-la-cula","name":"Lobby Bar La Cúpula","category":"bar","description":"Lobby bar"},
    {"id":"aqua-bar-las-rocas","name":"Aqua Bar Las Rocas","category":"bar","description":"Aqua bar"},
    {"id":"lobby-bar-acuario","name":"Lobby Bar Acuario","category":"bar","hotelId":"Iberostar Paraíso Lindo","lat":20.7595512,"lng":-86.963491,"description":"Lobby bar"},
    {"id":"cigar-bar","name":"Cigar Bar","category":"bar","description":"Cigar bar"});
  POIS.push(
    {"id":"waterfall-jacuzzi","name":"Cascada y jacuzzi","category":"piscina","lat":20.759539,"lng":-86.960991,"description":"Water fall & jacuzzi"},
    {"id":"quiet-pool","name":"Piscina tranquila","category":"piscina","lat":20.759600,"lng":-86.960224,"description":"Quiet pool"},
    {"id":"activities-pool","name":"Piscina de actividades","category":"piscina","lat":20.759267,"lng":-86.959714,"description":"Activities pool"},
    {"id":"lazy-river","name":"Río lento","category":"piscina","description":"Lazy river"},
    {"id":"sports-pool","name":"Piscina deportiva","category":"piscina","description":"Sports pool"},
    {"id":"wave-pool","name":"Piscina de olas","category":"piscina","description":"Wave pool"},
    {"id":"jacuzzi","name":"Jacuzzi","category":"piscina","lat":20.757415,"lng":-86.960793,"description":"Jacuzzi"},
    {"id":"private-pool","name":"Piscina privada","category":"piscina","lat":20.756499,"lng":-86.960229,"description":"Private pool"},
    {"id":"indoor-pool","name":"Piscina cubierta","category":"piscina","lat":20.756076,"lng":-86.961331,"description":"Indoor pool"},
    {"id":"main-pool","name":"Piscina principal","category":"piscina","lat":20.754701,"lng":-86.960497,"description":"Main pool"},
    {"id":"mini-water-playground","name":"Mini parque acuático","category":"piscina","description":"Mini water playground"},
    {"id":"massage-palapa","name":"Palapas de masajes","category":"spa","lat":20.758252,"lng":-86.957775,"description":"Massage palapa"});
  POIS.push(
    {"id":"tennis","name":"Tenis","category":"deportes","lat":20.760289,"lng":-86.964375,"description":"Tennis"},
    {"id":"shooting-area","name":"Campo de tiro","category":"deportes","lat":20.761933,"lng":-86.962473,"description":"Shooting area"},
    {"id":"diving-center","name":"Centro de buceo","category":"deportes","description":"Diving center"},
    {"id":"golf-club-house","name":"Golf Club House","category":"golf","description":"Golf club house"},
    {"id":"teatro-music-hall","name":"Teatro Music Hall","category":"entretenimiento","lat":20.7591882,"lng":-86.9627312,"description":"Teatro"},
    {"id":"teatro-coliseo","name":"Teatro Coliseo","category":"entretenimiento","hotelId":"Iberostar Paraíso JOIA","lat":20.756739,"lng":-86.962693,"description":"Teatro"},
    {"id":"games-room","name":"Sala de juegos","category":"entretenimiento","description":"Games room"},
    // El "Casino" del plano es en realidad el "Teatro Mar-Playa" (Google Maps)
    {"id":"teatro-mar-playa","name":"Teatro Mar-Playa","category":"entretenimiento","lat":20.7608353,"lng":-86.9625428,"description":"Teatro"},
    {"id":"shopping-mall","name":"Centro comercial","category":"comer","lat":20.759933,"lng":-86.965830,"description":"Shopping mall"},
    {"id":"starmarket","name":"Starmarket","category":"comer","description":"Starmarket"},
    {"id":"shop-tienda","name":"Shop / Tienda","category":"comer","lat":20.762215,"lng":-86.963121,"description":"Shop / Tienda"},
    {"id":"pool-shop","name":"Tienda de piscina","category":"comer","lat":20.758561,"lng":-86.959673,"description":"Pool shop"},
    {"id":"meeting-room","name":"Sala de juntas","category":"conv","lat":20.760629,"lng":-86.963838,"description":"Sala de juntas"},
    {"id":"billiards-library","name":"Internet, billar, biblioteca","category":"servicio","lat":20.760721,"lng":-86.963638,"description":"Billiards, library"},
    {"id":"medical-center","name":"Centro médico","category":"servicio","lat":20.759144,"lng":-86.964771,"description":"Medical center"},
    {"id":"drugstore","name":"Farmacia","category":"servicio","lat":20.759826,"lng":-86.965208,"description":"Drugstore"},
    {"id":"preview-gallery","name":"Preview Gallery","category":"club","lat":20.757715,"lng":-86.964923,"description":"Preview Gallery (The Club)"},
    {"id":"head-concierge","name":"Head Concierge","category":"concierge","lat":20.759753,"lng":-86.965457,"description":"Head Concierge"},
    {"id":"star-prestige-lounge","name":"Star Prestige Lounge","category":"starprestige","hotelId":null,"lat":20.753697,"lng":-86.960424,"description":"Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas"},
    {"id":"star-prestige-beach-club","name":"Star Prestige Beach Club","category":"starprestige","hotelId":"Iberostar Paraíso JOIA","lat":20.756829,"lng":-86.958688,"description":"Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas"},
    {"id":"courtesy-room","name":"Duchas de cortesía","category":"servicio","lat":20.758045,"lng":-86.964554,"description":"Courtesy room"},
    {"id":"wedding-chapel","name":"Capilla de bodas","category":"servicio","description":"Wedding chapel"},
    {"id":"star-friends-desk","name":"Star Friends Desk","category":"kids","lat":20.755117,"lng":-86.961373,"description":"Star Friends Desk"},
    // --- Nuevos POIs del plano oficial no existentes en catálogo previo ---
    {"id":"beach-bar","name":"Beach Bar / Bar de playa","category":"bar","lat":20.757856,"lng":-86.958359,"description":"Bar de playa"},
    {"id":"bar-el-puente","name":"Bar El Puente","category":"bar","lat":20.757172,"lng":-86.960979,"description":"Bar El Puente (incluye la heladería)"},
    {"id":"buffet-la-marina","name":"Buffet La Marina","category":"restaurante","lat":20.757842,"lng":-86.963819,"description":"Buffet restaurante La Marina"},
    {"id":"buffet-el-tapatio","name":"Buffet El Tapatío","category":"restaurante","hotelId":"Iberostar Paraíso Maya","lat":20.756848,"lng":-86.960399,"description":"Buffet restaurante El Tapatío"});
    // Eliminados a petición del usuario (2026-10-22): "surprise-gf", "surprise-2f" y "shushi"
    // (Restaurant Surprise, planta baja y 2º nivel, y Restaurant Shushi, sin coordenadas verificadas).

  // Instalaciones por hotel con coordenadas confirmadas manualmente
  // (recorrido del complejo + enlaces de Google Maps).
  POIS.push(
    {"id":"concierge-lindo","name":"Concierge Paraíso Lindo","category":"concierge","hotelId":"Iberostar Paraíso Lindo","lat":20.759481,"lng":-86.963898,"description":"Concierge del hotel"},
    {"id":"star-prestige-maya","name":"Star Prestige Paraíso Maya","category":"starprestige","hotelId":"Iberostar Paraíso Maya","lat":20.757650,"lng":-86.964755,"description":"Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas"},
    // "Star Café Maya" era en realidad el Lobby Bar Kukulkán (mismo punto); se
    // consolidó con sus coordenadas verificadas en "lobby-bar-kukulkan".
    {"id":"spa-joia","name":"Spa JOIA","category":"spa","hotelId":"Iberostar Paraíso JOIA","lat":20.755878,"lng":-86.961372,"description":"Spa del hotel JOIA"},
    {"id":"fit-fun-joia","name":"Fit & Fun JOIA","category":"deportes","hotelId":"Iberostar Paraíso JOIA","lat":20.7560274,"lng":-86.9611985,"description":"Gimnasio Fit & Fun"},
    {"id":"concierge-joia","name":"Concierge JOIA","category":"concierge","hotelId":"Iberostar Paraíso JOIA","lat":20.756125,"lng":-86.962989,"description":"Concierge del hotel JOIA"},
    {"id":"legado","name":"Legado","category":"restaurante","hotelId":"Iberostar Paraíso JOIA","lat":20.754923,"lng":-86.961316,"description":"Restaurante mexicano"},
    {"id":"star-prestige-joia","name":"Star Prestige JOIA","category":"starprestige","hotelId":"Iberostar Paraíso JOIA","lat":20.756156,"lng":-86.962287,"description":"Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas"},
    {"id":"concierge-grand-paraiso","name":"Concierge Grand Paraíso (Edificio 71)","category":"concierge","hotelId":"Iberostar Paraíso JOIA","lat":20.753724,"lng":-86.960434,"description":"Concierge de Grand Paraíso"},
    {"id":"spa-grand-paraiso","name":"Spa Grand Paraíso","category":"spa","hotelId":"Iberostar Paraíso JOIA","lat":20.753233,"lng":-86.960193,"description":"Spa de Grand Paraíso"},
    {"id":"fit-fun-grand-paraiso","name":"Fit & Fun Grand Paraíso","category":"deportes","hotelId":"Iberostar Paraíso JOIA","lat":20.757618,"lng":-86.958517,"description":"Gimnasio Fit & Fun de Grand Paraíso"},
    {"id":"fit-fun-playa-paraiso","name":"Fit & Fun Playa Paraíso","category":"deportes","lat":20.7603125,"lng":-86.9645625,"description":"Gimnasio Fit & Fun en la zona de playa"},
    {"id":"el-colonial","name":"El Colonial","category":"restaurante","lat":20.7609943,"lng":-86.963447,"description":"Restaurant"},
    {"id":"trattoria","name":"Trattoria","category":"restaurante","lat":20.7589509,"lng":-86.9583723,"description":"Trattoria by El Faro"}
  );

  // Coordenadas confirmadas con OpenStreetMap. Cada fila es
  // [id, lat, lng, nombre del elemento OSM]. Solo se incluyen elementos que
  // caen DENTRO del polígono del complejo (OSM way 138147423) y FUERA del
  // resort vecino Vidanta (OSM way 289799188). La procedencia queda en
  // source:"osm".
  var OSM_COORDS = [
    ["hashiru", 20.7606093, -86.9637212, "El Hashiru"],
    ["la-dorada", 20.76156, -86.9631079, "La Dorada"],
    ["rodizio", 20.76112, -86.9634612, "El Rodizio"],
    ["el-mercado", 20.7612549, -86.9626755, "El Mercado"],
    ["la-plaza", 20.7608481, -86.9629956, "La Plaza"],
    ["la-hacienda", 20.7614866, -86.9629864, "La Hacienda"],
    ["el-puerto", 20.7578601, -86.9591398, "El Puerto"],
    ["el-museo", 20.7589083, -86.9636421, "El Museo"],
    ["jambalaya", 20.7589371, -86.9634247, "Jambalaya"],
    ["la-pagoda", 20.7587578, -86.9632596, "Pagoda"],
    ["el-rancho", 20.7580548, -86.964155, "El Rancho"],
    ["la-geisha", 20.7572267, -86.9646975, "La Geisha"],
    ["letoile", 20.7570704, -86.9644942, "L'Etoile"],
    ["el-tapatio", 20.7567139, -86.960329, "El Tapatío"],
    ["venecia", 20.755841, -86.9626532, "Venecia"],
    ["bellavista", 20.7549173, -86.9612041, "Bella Vista"],
    ["tonis", 20.7549562, -86.9611689, "Tony’s"],
    ["haiku", 20.755212, -86.9610284, "Haiku"],
    ["la-brisa", 20.7546463, -86.9597269, "La Brisa"],
    ["burgers", 20.7598217, -86.9663036, "Star Hamburgers"],
    ["antojitos-tacos", 20.7604457, -86.9658435, "Tacos"],
    ["crepes", 20.7599822, -86.965172, "Crepes"],
    ["aqua-bar-la-perla", 20.7595721, -86.9600368, "La Perla"],
    ["aqua-bar-las-rocas", 20.7571518, -86.9604151, "Las Rocas"],
    ["lobby-bar-la-fuente", 20.7609293, -86.9639926, "La Fuente"],
    ["lobby-bar-la-cula", 20.762207, -86.9629327, "La Cupula Lobby Bar"],
    ["cigar-bar", 20.7593191, -86.9656938, "Vitolas"],
    ["sports-pool", 20.7580558, -86.9618529, "Sports Pool"],
    ["wave-pool", 20.7578053, -86.9615154, "Wave Pool"],
    ["lazy-river", 20.7582757, -86.9622815, "Lazy River"],
    ["mini-water-playground", 20.758176, -86.9631163, "Kids Waterpark"],
    ["wedding-chapel", 20.7605645, -86.9618901, "Wedding Chapel"],
    ["starmarket", 20.7574499, -86.9613521, "Star Market"],
    ["games-room", 20.759771, -86.9662607, "Video Games Room"],
    ["golf-club-house", 20.7586073, -86.9658668, "Golf Clubhouse"],
    ["diving-center", 20.7588638, -86.9575332, "Dressel Divers"],
    ["latelier", 20.7551676, -86.9609817, "L'Atelier"],
    ["star-rock-cafe", 20.7618856, -86.9627721, "Star Rock Café"],
    ["theclub", 20.7598333, -86.9652778, "THE CLUB"]
  ];
  OSM_COORDS.forEach(function (row) {
    for (var i = 0; i < POIS.length; i += 1) {
      if (POIS[i].id === row[0]) {
        POIS[i].lat = row[1];
        POIS[i].lng = row[2];
        POIS[i].verified = true;
        POIS[i].source = "osm";
        POIS[i].osmFeature = row[3];
        break;
      }
    }
  });

  // "Mar Caribe" no es una instalación: es un área geográfica (el mar). Se
  // representa como ETIQUETA de área, no como POI con ruta. El ancla es el
  // punto medio del borde marítimo (este) del polígono del complejo, no una
  // ubicación inventada.
  (function markCaribbeanArea() {
    for (var i = 0; i < POIS.length; i += 1) {
      if (POIS[i].id === "playa-mar-caribe") {
        POIS[i].kind = "area";
        POIS[i].lat = 20.7585536;
        POIS[i].lng = -86.9574892;
        POIS[i].verified = true;
        POIS[i].source = "plano";
        break;
      }
    }
  })();

  // --- Datos operativos: horarios, cartas, tratamientos y paquetes -------
  // Se leen del módulo de datos del complejo (js/datos-complejo.js). Cada POI
  // recibe sus horarios según el tipo de servicio y su carta o lista de
  // tratamientos, listos para mostrarse en la ficha.
  (function applyOperationalData() {
    var datos = window.RevistaDigital.datosComplejo || {};
    var horarios = datos.HORARIOS || {};
    var servicios = datos.SERVICIOS || {};
    var catalogo = {};
    var key;

    for (key in (datos.RESTAURANTES || {})) catalogo[key] = datos.RESTAURANTES[key];
    for (key in (datos.BARES || {})) catalogo[key] = datos.BARES[key];
    for (key in (datos.SERVICIOS || {})) catalogo[key] = datos.SERVICIOS[key];

    function formato(horario) {
      if (!horario) return "";
      var partes = [];
      if (horario.breakfast) partes.push("Desayuno " + horario.breakfast);
      if (horario.lunch) partes.push("Comida " + horario.lunch);
      if (horario.dinner) partes.push("Cena " + horario.dinner);
      if (horario.late) partes.push("Bar " + horario.late);
      if (horario.hours) partes.push(horario.hours);
      return partes.join(" · ");
    }

    for (var i = 0; i < POIS.length; i += 1) {
      var poi = POIS[i];
      var entry = catalogo[poi.id];
      if (!entry) {
        // Spa y golf genéricos del complejo.
        if (poi.category === "spa") entry = servicios.spa;
        else if (poi.category === "golf") entry = servicios.golf;
        else if (poi.category === "piscina") entry = servicios.piscina;
      }
      if (!entry) continue;

      var tipo = entry.tipo;
      var horario = entry.horario || (tipo ? horarios[tipo] : null);
      if (horario) {
        poi.hours = (typeof horario === "string") ? horario : formato(horario);
        if (horario.breakfast) poi.breakfast = horario.breakfast;
        if (horario.lunch) poi.lunch = horario.lunch;
        if (horario.dinner) poi.dinner = horario.dinner;
        if (horario.late) poi.late = horario.late;
        if (horario.hours) poi.hours = horario.hours;
      }
      // Servicios con horario propio (spa, golf, piscinas): se respeta el
      // que viene en el catálogo de datos.
      if (entry.horarioTexto) poi.hours = entry.horarioTexto;
      if (!poi.hours && entry.hours) poi.hours = entry.hours;
      if (entry.cocina || entry.cuisine) poi.cuisine = entry.cocina || entry.cuisine;
      if (entry.carta) poi.menu = entry.carta;
      if (entry.treatments) poi.treatments = entry.treatments;
      if (entry.packages) poi.packages = entry.packages;
      if (entry.teeTimes) poi.teeTimes = entry.teeTimes;
       if (entry.amenities || entry.amenidades) poi.amenities = entry.amenities || entry.amenidades;
       if (entry.services || entry.servicios) poi.services = entry.services || entry.servicios;
       if (entry.description || entry.descripcion) poi.description = entry.description || entry.descripcion;
  // Vestimenta / codigo de vestimenta.
  if (entry.vestimenta || entry.dressCode) {
    poi.vestimenta = entry.vestimenta || entry.dressCode;
    poi.dressCode = entry.dressCode || entry.vestimenta;
  }
  // Requerimiento de reserva.
  if (entry.reservation !== undefined) poi.reservation = entry.reservation;
  if (entry.reservas !== undefined) poi.reservas = entry.reservas;
  if (poi.reservation === undefined && poi.reservas !== undefined) poi.reservation = poi.reservas;
  if (poi.reservas === undefined && poi.reservation !== undefined) poi.reservas = poi.reservation;
  // Especialidades / platillos insignia / cocteles.
  if (entry.especialidades || entry.especialidad) poi.especialidades = entry.especialidades || entry.especialidad;
  if (entry.signatureDishes || entry.platillosInsignia) {
    poi.signatureDishes = entry.signatureDishes || entry.platillosInsignia;
    poi.platillosInsignia = entry.platillosInsignia || entry.signatureDishes;
  }
  if (entry.cocteles || entry.cocktails || entry.bebidas) poi.cocteles = entry.cocteles || entry.cocktails || entry.bebidas;
  if (entry.menu) poi.menu = entry.menu;
  // Hotel / ubicacion de referencia.
  if (entry.hotel) {
    poi.hotel = entry.hotel;
    if (!poi.hotelId) poi.hotelId = entry.hotel;
  }
    }
  })();

  window.RevistaDigital.guiapa.POIS = POIS;
  window.RevistaDigital.guiapa.CATEGORIES = CATEGORIES;
  window.RevistaDigital.guiapa.ACTIVIDADES = (window.RevistaDigital.datosComplejo || {}).ACTIVIDADES || [];
  window.RevistaDigital.guiapa.ACTIVIDADES_OFICIAL = (window.RevistaDigital.datosComplejo || {}).ACTIVIDADES_OFICIAL === true;
  window.RevistaDigital.guiapa.ACTIVIDADES_NOTA = (window.RevistaDigital.datosComplejo || {}).ACTIVIDADES_NOTA || "";
})();

// Minimal helpers for portal integration
(function () {
  var gp = window.RevistaDigital.guiapa || {};
  gp.createDivIcon = function (color) {
    var size = 30;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="' + color + '" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>';
    return (window.L && window.L.divIcon) ? window.L.divIcon({ html: '<div style="background-image:url(data:image/svg+xml;base64,' + btoa(svg) + ');width:' + size + 'px;height:' + size + 'px;background-size:contain;"></div>', className: 'gp-divicon', iconSize: [size, size], iconAnchor: [size/2, size/2], popupAnchor: [0, -size/2] }) : null;
  };
  // Marcador animado para los POIs de THE CLUB: halo dorado/azul pulsante.
  gp.createClubDivIcon = function (color) {
    var size = 30;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="' + color + '" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>';
    if (!(window.L && window.L.divIcon)) return null;
    var core = '<div class="gp-club-core" style="background-image:url(data:image/svg+xml;base64,' + btoa(svg) + ');width:' + size + 'px;height:' + size + 'px;background-size:contain;"></div>';
    return window.L.divIcon({
      html: '<div class="gp-club-wrap"><span class="gp-club-pulse"></span><span class="gp-club-pulse gp-club-pulse--late"></span>' + core + '</div>',
      className: 'gp-divicon gp-club-divicon',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2]
    });
  };
  // Marcador animado para los POIs de Star Prestige: anillo dorado giratorio
  // tipo diamante alrededor del marcador.
  gp.createPrestigeDivIcon = function (color) {
    var size = 30;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="' + color + '" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>';
    if (!(window.L && window.L.divIcon)) return null;
    var core = '<div class="gp-sp-core" style="background-image:url(data:image/svg+xml;base64,' + btoa(svg) + ');width:' + size + 'px;height:' + size + 'px;background-size:contain;"></div>';
    return window.L.divIcon({
      html: '<div class="gp-sp-wrap"><span class="gp-sp-ring"></span><span class="gp-sp-ring gp-sp-ring--wide"></span>' + core + '</div>',
      className: 'gp-divicon gp-sp-divicon',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2]
    });
  };
  // Marcador discreto para los POIs de Concierge: halo sutil que respira.
  gp.createConciergeDivIcon = function (color) {
    var size = 30;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="' + color + '" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>';
    if (!(window.L && window.L.divIcon)) return null;
    var core = '<div class="gp-con-core" style="background-image:url(data:image/svg+xml;base64,' + btoa(svg) + ');width:' + size + 'px;height:' + size + 'px;background-size:contain;"></div>';
    return window.L.divIcon({
      html: '<div class="gp-con-wrap">' + core + '</div>',
      className: 'gp-divicon gp-con-divicon',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2]
    });
  };
  var POI_GALLERY_HOTELS = [
    {
      name: "Iberostar Paraíso del Mar",
      slug: "iberostar-paraiso-del-mar",
      folder: "paraiso-del-mar",
      images: ["PMA_GAST_0015", "PMA_GAST_0024", "PMA_GAST_0060", "PMA_GAST_0065", "PMA_GAST_0072"]
    },
    {
      name: "Iberostar Paraíso Maya",
      slug: "iberostar-paraiso-maya",
      folder: "paraiso-maya",
      images: ["PMY_GAST_0231", "PMY_GAST_0235", "PMY_GAST_0262", "PMY_GAST_0270", "PMY_GAST_0296"]
    },
    {
      name: "Iberostar Paraíso Lindo",
      slug: "iberostar-paraiso-lindo",
      folder: "paraiso-lindo",
      restaurantFolder: "Restaurante",
      images: ["PLI_GAST_0043", "PLI_GAST_0085", "PLI_GAST_0089", "PLI_GAST_0098", "PLI_GAST_0105"]
    },
    {
      name: "Iberostar Paraíso Beach",
      slug: "iberostar-paraiso-beach",
      folder: "paraiso-beach",
      images: ["PBE_GAST_0048", "PBE_GAST_0049", "PBE_GAST_0053", "PBE_GAST_0059", "PBE_GAST_0061"]
    },
    {
      name: "Iberostar Paraíso JOIA",
      slug: "iberostar-paraiso-joia",
      folder: "paraiso-JOIA",
      images: ["GHP_GAST_0097", "GHP_GAST_0102", "GHP_GAST_0103", "GHP_GAST_0166", "GHP_GAST_0191"]
    }
  ];
  var GOLF_GALLERY_IMAGES = [
    "src/Golf-Playa-Paraiso/PGC_GOLF_0015.webp",
    "src/Golf-Playa-Paraiso/PGC_GOLF_0026.webp",
    "src/Golf-Playa-Paraiso/PGC_GOLF_0032.webp",
    "src/Golf-Playa-Paraiso/PGC_GOLF_0073.webp"
  ];

  function popupEscape(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character];
    });
  }

  function poiGalleryHotel(poi) {
    var direct = POI_GALLERY_HOTELS.find(function (hotel) { return hotel.name === poi.hotelId; });
    if (direct) return direct;
    var hotelSlug = document.body && document.body.dataset.hotelSlug;
    var pageHotel = POI_GALLERY_HOTELS.find(function (hotel) { return hotel.slug === hotelSlug; });
    if (pageHotel && (!Number.isFinite(poi.lat) || !Number.isFinite(poi.lng))) return pageHotel;

    var hotelCoordinates = window.RevistaDigital.state && window.RevistaDigital.state.hotelCoordinates;
    if (!Number.isFinite(poi.lat) || !Number.isFinite(poi.lng) || !hotelCoordinates) return pageHotel || null;
    var closest = null;
    var closestDistance = Infinity;
    POI_GALLERY_HOTELS.forEach(function (hotel) {
      var coordinates = hotelCoordinates[hotel.name];
      if (!Array.isArray(coordinates)) return;
      var latitudeDelta = poi.lat - coordinates[0];
      var longitudeDelta = (poi.lng - coordinates[1]) * Math.cos(poi.lat * Math.PI / 180);
      var distance = latitudeDelta * latitudeDelta + longitudeDelta * longitudeDelta;
      if (distance < closestDistance) {
        closest = hotel;
        closestDistance = distance;
      }
    });
    return closest || pageHotel || null;
  }

  function poiPopupMarkup(poi) {
    var name = popupEscape(poi.name);
    var description = popupEscape(poi.description || "");
    var isRestaurant = poi.category === "restaurante";
    var isGolf = poi.category === "golf";
    var hotel = isRestaurant ? poiGalleryHotel(poi) : null;
    var images = isGolf
      ? GOLF_GALLERY_IMAGES
      : (isRestaurant
        ? (hotel?.images || []).map(function (image) {
            return "src/" + hotel.folder + "/" + (hotel.restaurantFolder || "restaurante") + "/" + image + "-640.webp";
          })
        : []);
    var has360 = isRestaurant && hotel && window.RevistaDigital.pannellum360?.isPlayaParaiso?.(hotel.name);
    var slides = images.map(function (image, index) {
      return '<div class="gp-map-carousel-slide' + (index === 0 ? ' is-active' : '') + '" data-map-slide aria-hidden="' + (index === 0 ? 'false' : 'true') + '">' +
        '<img src="' + popupEscape(image) + '" alt="' + name + ' · imagen ' + (index + 1) + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '" decoding="async" />' +
        '</div>';
    });
    if (has360) {
      slides.push('<div class="gp-map-carousel-slide gp-map-carousel-360" data-map-slide aria-hidden="true">' +
        '<strong>¿Desea ver más de ' + name + '?</strong>' +
        '<span>Explore este restaurante en 360° en ' + popupEscape(hotel.name) + '.</span>' +
        '<button type="button" class="gp-map-carousel-360-link" data-poi-360-hotel="' + popupEscape(hotel.name) + '" data-poi-360-label="' + name + '">Ver exploración 360°</button>' +
        '</div>');
    }
    var carousel = images.length
      ? '<div class="gp-map-carousel" data-map-carousel>' +
          '<div class="gp-map-carousel-slides">' + slides.join("") + '</div>' +
          '<div class="gp-map-carousel-controls">' +
            '<button type="button" data-map-carousel-step="-1" aria-label="Imagen anterior">‹</button>' +
            '<span data-map-carousel-count>1 / ' + slides.length + '</span>' +
            '<button type="button" data-map-carousel-step="1" aria-label="Imagen siguiente">›</button>' +
          '</div>' +
        '</div>'
      : "";
    var cartButton = (isRestaurant || isGolf)
      ? '<button type="button" class="gp-map-cart guide-cart" data-id="' + popupEscape(poi.id) + '" data-cat="' + popupEscape(poi.category) + '">Solicitar carrito</button>'
      : "";
    return '<div class="gp-map-poi-popup"><strong class="gp-map-poi-title">' + name + '</strong>' +
      (description ? '<small class="gp-map-poi-description">' + description + '</small>' : '') +
      carousel +
      '<button type="button" class="gp-dir" data-lat="' + poi.lat + '" data-lng="' + poi.lng + '" data-name="' + name + '">Cómo llegar</button>' +
      cartButton +
      '</div>';
  }

  function initializePoiPopup(popupElement) {
    if (!popupElement) return;
    var carousel = popupElement.querySelector("[data-map-carousel]");
    if (carousel) {
      var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-map-slide]"));
      var count = carousel.querySelector("[data-map-carousel-count]");
      if (carousel.dataset.initialized !== "true") {
        carousel.dataset.initialized = "true";
        carousel.__currentSlide = 0;
        carousel.__showSlide = function (index) {
          carousel.__currentSlide = (index + slides.length) % slides.length;
          slides.forEach(function (slide, slideIndex) {
            var active = slideIndex === carousel.__currentSlide;
            slide.classList.toggle("is-active", active);
            slide.setAttribute("aria-hidden", String(!active));
          });
          if (count) count.textContent = (carousel.__currentSlide + 1) + " / " + slides.length;
        };
        carousel.querySelectorAll("[data-map-carousel-step]").forEach(function (button) {
          button.addEventListener("click", function () {
            carousel.__showSlide(carousel.__currentSlide + Number(button.dataset.mapCarouselStep || 0));
          });
        });
      }
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion && slides.length > 1 && !carousel.__autoPlay) {
        carousel.__autoPlay = window.setInterval(function () {
          carousel.__showSlide(carousel.__currentSlide + 1);
        }, 3500);
      }
      carousel.__showSlide(carousel.__currentSlide);
    }
    var cartButton = popupElement.querySelector(".gp-map-cart");
    if (cartButton && cartButton.dataset.bound !== "true") {
      cartButton.dataset.bound = "true";
      cartButton.addEventListener("click", function () {
        window.RevistaDigital.guiapa?.requestCartForPoi?.(cartButton.dataset.id);
      });
    }
    var panoramaButton = popupElement.querySelector("[data-poi-360-hotel]");
    if (panoramaButton && panoramaButton.dataset.bound !== "true") {
      panoramaButton.dataset.bound = "true";
      panoramaButton.addEventListener("click", function () {
        try {
          window.sessionStorage.setItem("club360RestaurantSelection", JSON.stringify({
            hotelName: panoramaButton.getAttribute("data-poi-360-hotel"),
            label: panoramaButton.getAttribute("data-poi-360-label")
          }));
        } catch (error) {
          console.warn("No se pudo guardar el restaurante para la exploración 360°.", error);
          return;
        }
        var routes = window.RevistaDigital.routes;
        if (routes && typeof routes.navigate === "function") {
          routes.navigate("/360");
        } else {
          var baseHref = document.querySelector("base")?.href || window.location.href;
          window.location.assign(new URL("360", baseHref).href);
        }
      });
    }
  }

  gp.addPoiLayer = function (map, filterHotelId, options) {
    if (!map || !window.L) return null;
    var L = window.L;
    // Agrupación de marcadores (Leaflet.markercluster) cuando el plugin está
    // disponible: evita amontonar los POIs al abrir el complejo. Al acercar el
    // zoom los puntos se separan y siguen siendo seleccionables (popup/ruta).
    var clustered = typeof L.markerClusterGroup === "function";
    var clusterOptions = {
      maxClusterRadius: 55,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      // A partir del zoom de selección los puntos se muestran sueltos para
      // poder abrir su popup y calcular la ruta individualmente.
      disableClusteringAtZoom: 16,
      removeOutsideVisibleBounds: true
    };
    if (options && typeof options.disableClusteringAtZoom === "number") {
      clusterOptions.disableClusteringAtZoom = options.disableClusteringAtZoom;
    }
    var layer = clustered
      ? L.markerClusterGroup(clusterOptions)
      : (L.featureGroup ? L.featureGroup() : L.layerGroup());
    // Las etiquetas de área (p. ej. "Mar Caribe") no se agrupan: deben verse
    // siempre como rótulo del mapa.
    var labels = L.featureGroup ? L.featureGroup() : L.layerGroup();
    (gp.POIS || []).forEach(function (p) {
      if (p.category === "hotel") return;
      if (p.external === true) return;
      if (filterHotelId && p.hotelId && p.hotelId !== filterHotelId) return;
      if (p.lat == null || p.lng == null) return;
      if (p.kind === "area") {
        var labelHtml = '<span style="display:inline-block;transform:translate(-50%,-50%);white-space:nowrap;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#0b3d66;background:rgba(255,255,255,.72);border:1px solid rgba(11,61,102,.35);border-radius:999px;padding:2px 10px;">' + (p.name || "") + "</span>";
        var areaIcon = window.L.divIcon ? window.L.divIcon({ className: "gp-area-label", html: labelHtml, iconSize: [0, 0], iconAnchor: [0, 0] }) : null;
        var areaMarker = window.L.marker([p.lat, p.lng], areaIcon ? { icon: areaIcon } : {});
        areaMarker.bindPopup("<strong>" + (p.name || "") + "</strong><br><small>" + (p.description || "") + "</small>");
        gp.registerMarker(p.id, areaMarker);
        areaMarker.addTo(labels);
        return;
      }
      var cat = gp.CATEGORIES[p.category] || gp.CATEGORIES.servicio;
      // Animaciones intercambiadas a petición: THE CLUB usa los anillos
      // diamante giratorios y Star Prestige los halos pulsantes.
      var icon = p.category === "club"
        ? gp.createPrestigeDivIcon(cat.color)
        : p.category === "starprestige"
          ? gp.createClubDivIcon(cat.color)
          : p.category === "concierge"
            ? gp.createConciergeDivIcon(cat.color)
            : gp.createDivIcon(cat.color);
      var m = window.L.marker([p.lat, p.lng], icon ? { icon: icon } : {});
      var popupOptions;
      if (p.category === "restaurante" || p.category === "golf") {
        popupOptions = { className: "gp-map-poi-pop", minWidth: 230, maxWidth: 280 };
        m.bindPopup(poiPopupMarkup(p), popupOptions);
        m.on("popupopen", function (event) {
          initializePoiPopup(event.popup.getElement());
        });
        m.on("popupclose", function (event) {
          var popupElement = event.popup.getElement();
          var carousel = popupElement && popupElement.querySelector("[data-map-carousel]");
          if (carousel && carousel.__autoPlay) {
            window.clearInterval(carousel.__autoPlay);
            carousel.__autoPlay = null;
          }
        });
      } else {
        var name = p.name || "";
        var dirButton = '<button type="button" class="gp-dir" data-lat="' + p.lat + '" data-lng="' + p.lng + '" data-name="' + name.replace(/"/g,'&quot;') + '">Cómo llegar</button>';
        var popup;
        if (p.category === "club") {
          popup = '<div class="gp-club-popup">'
            + '<div class="gp-club-popup-badge"><img class="gp-club-popup-logo" src="branding/IB_THE_CLUB_VV_POS_RGB-320.webp" alt="" /></div>'
            + '<h3 class="gp-club-popup-name">' + name + '</h3>'
            + (p.hours ? '<p class="gp-club-popup-hours">' + p.hours + '</p>' : '')
            + dirButton
            + '</div>';
          popupOptions = { className: 'gp-club-pop', minWidth: 190, maxWidth: 230 };
        } else if (p.category === "starprestige") {
          popup = '<div class="gp-sp-popup">'
            + '<div class="gp-sp-popup-badge"><span class="gp-sp-popup-star">✦</span>STAR PRESTIGE</div>'
            + '<h3 class="gp-sp-popup-name">' + name + '</h3>'
            + (p.description ? '<p class="gp-sp-popup-desc">' + p.description + '</p>' : '')
            + (p.hours ? '<p class="gp-sp-popup-hours">' + p.hours + '</p>' : '')
            + dirButton
            + '</div>';
          popupOptions = { className: 'gp-sp-pop', minWidth: 220, maxWidth: 260 };
        } else {
          popup = '<strong>' + name + '</strong><br><small>' + (p.description||'') + '</small><br>' + dirButton;
        }
        m.bindPopup(popup, popupOptions);
      }
      gp.registerMarker(p.id, m);
      m.addTo(layer);
    });
    layer.addTo(map);
    try {
      if (labels.getLayers().length) labels.addTo(map);
    } catch (e) { /* ignore label layer errors */ }
    gp._poiLayer = layer;
    return layer;
  };
  window.RevistaDigital.guiapa = gp;
})();

// Explorador de POIs: leyenda, filtros, buscador, listado y selección en el mapa
(function () {
  "use strict";
  var gp = window.RevistaDigital.guiapa || (window.RevistaDigital.guiapa = {});

  gp._markers = gp._markers || {};

  // Mapa (instancia Leaflet) en el que el usuario centró un destino a mano.
  // La detección automática de ubicación no reencuadra ese mapa.
  gp._userFocusedMap = gp._userFocusedMap || null;

  // Contorno real del complejo Iberostar Playa Paraíso (polígono de la vía
  // OpenStreetMap way/138147423 «Iberostar Playa Paraiso Resort», consultada
  // vía API de OSM). Se usa para la máscara: deja visible solo el complejo y
  // oculta todo lo de alrededor.
  gp.COMPLEX_RING = [
    [20.7588947, -86.9573717],
    [20.7578714, -86.9577242],
    [20.7571566, -86.9581953],
    [20.7565668, -86.9584419],
    [20.7559920, -86.9586080],
    [20.7531065, -86.9598838],
    [20.7536903, -86.9625296],
    [20.7546786, -86.9619698],
    [20.7552285, -86.9627738],
    [20.7572551, -86.9657832],
    [20.7581078, -86.9669205],
    [20.7600693, -86.9697573],
    [20.7648525, -86.9660585],
    [20.7615495, -86.9612170],
    [20.7601367, -86.9591462],
    [20.7600436, -86.9590196],
    [20.7588947, -86.9573717]
  ];

  // Dibuja una máscara opaca sobre el mapa: cubre TODO el mundo salvo el
  // contorno del complejo (agujero), de modo que alrededor "no existe nada".
  // El borde se difumina con un trazo ancho semitransparente.
  gp.addComplexMask = function (map, options) {
    if (!map || !window.L || !gp.COMPLEX_RING || gp.COMPLEX_RING.length < 3) return null;
    if (map._complexMaskApplied) return gp._complexMask || null;
    var L = window.L;
    var opts = options || {};
    var color = opts.color || "#f5f0e7"; // tono del sitio (--paper)
    var ring = gp.COMPLEX_RING;
    // Renderizador SVG explícito: el mapa usa preferCanvas, pero necesitamos
    // SVG para poder difuminar el borde con CSS (filter: blur).
    var renderer = (typeof L.svg === "function") ? L.svg({ padding: 0.5 }) : null;
    // Anillo exterior que rodea el mundo; el contorno del complejo se añade
    // como agujero (Leaflet dibuja los anillos consecutivos con relleno
    // alternado tipo even-odd).
    var world = [
      [85, -180],
      [85, 180],
      [-85, 180],
      [-85, -180]
    ];
    var maskOpts = {
      stroke: false,
      fill: true,
      fillColor: color,
      fillOpacity: 1,
      interactive: false,
      className: "complex-mask-hole"
    };
    if (renderer) maskOpts.renderer = renderer;
    var mask = L.polygon([world, ring], maskOpts).addTo(map);
    // Borde difuminado: trazo ancho y semitransparente a lo largo del contorno.
    var featherOpts = {
      stroke: true,
      color: color,
      weight: opts.featherWeight || 26,
      opacity: 0.55,
      fill: false,
      interactive: false,
      className: "complex-mask-feather"
    };
    if (renderer) featherOpts.renderer = renderer;
    var feather = L.polygon(ring, featherOpts).addTo(map);
    // Segundo trazo más tenue para suavizar aún más la transición.
    var featherSoftOpts = {
      stroke: true,
      color: color,
      weight: (opts.featherWeight || 26) * 2.4,
      opacity: 0.18,
      fill: false,
      interactive: false,
      className: "complex-mask-feather-soft"
    };
    if (renderer) featherSoftOpts.renderer = renderer;
    var featherSoft = L.polygon(ring, featherSoftOpts).addTo(map);
    gp._complexMask = { mask: mask, feather: feather, featherSoft: featherSoft };
    map._complexMaskApplied = true;
    if (!map._maskInteractionHook) {
      map._maskInteractionHook = true;
      var maskContainer = map.getContainer();
      map.on("zoomstart rotatestart", function () {
        try { maskContainer.classList.add("map-interacting"); } catch (e) { /* ignore */ }
      });
      map.on("zoomend rotateend moveend", function () {
        try { maskContainer.classList.remove("map-interacting"); } catch (e) { /* ignore */ }
      });
    }
    return gp._complexMask;
  };

  gp.removeComplexMask = function () {
    var g = gp._complexMask;
    if (!g) return;
    try {
      [g.mask, g.feather, g.featherSoft].forEach(function (layer) {
        if (layer && g.mask && g.mask._map) g.mask._map.removeLayer(layer);
      });
    } catch (e) { /* ignore */ }
    gp._complexMask = null;
  };

  gp.registerMarker = function (id, marker) {
    if (id && marker) gp._markers[id] = marker;
  };

  gp.bindMap = function (map) {
    if (!map) return;
    gp._map = map;
    const pendingRoute = gp._pendingRouteRequest;
    if (!pendingRoute) return;
    gp._pendingRouteRequest = null;
    window.setTimeout(function () {
      if (gp._map !== map) return;
      gp._routeNotice = pendingRoute.notice || "";
      selectPoi(pendingRoute.id);
      routeToPoi(pendingRoute.id);
      renderRouteStatus();
    }, 0);
  };

  gp.queueRouteToPoi = function (id, notice) {
    if (!findPoi(id)) return false;
    gp._pendingRouteRequest = { id: id, notice: notice || "" };
    return true;
  };

  gp.poiForHotel = function (hotelName) {
    var pois = gp.POIS || [];
    for (var i = 0; i < pois.length; i += 1) {
      var poi = pois[i];
      if (poi.category === "hotel" && (poi.hotelId === hotelName || poi.name === hotelName)) return poi;
    }
    return null;
  };

  var CATEGORY_LABELS = {
    hotel: "Hoteles",
    club: "THE CLUB",
    starprestige: "Star Prestige",
    concierge: "Concierge",
    restaurante: "Restaurantes",
    bar: "Bares",
    piscina: "Piscinas",
    spa: "Spa",
    golf: "Golf",
    playa: "Playa",
    comer: "Compras",
    deportes: "Deportes",
    entretenimiento: "Entretenimiento",
    servicio: "Servicios",
    wellness: "Wellness",
    kids: "Niños",
    conv: "Convenciones",
    discoteca: "Discoteca"
  };

  function normalize(value) {
    return String(value == null ? "" : value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function categoryLabel(cat) {
    return CATEGORY_LABELS[cat] || cat || "Lugar";
  }

  function categoryColor(cat) {
    var entry = (gp.CATEGORIES || {})[cat];
    return (entry && entry.color) || "#808080";
  }

  function findPoi(id) {
    var pois = gp.POIS || [];
    for (var i = 0; i < pois.length; i += 1) {
      if (pois[i].id === id) return pois[i];
    }
    return null;
  }

  function canMap(poi) {
    return !!(poi && Number.isFinite(poi.lat) && Number.isFinite(poi.lng) && poi.lat != null && poi.lng != null);
  }

  function markerFor(poi) {
    if (!poi || !gp._markers) return null;
    var keys = [poi.id, poi.hotelId, poi.name];
    for (var i = 0; i < keys.length; i += 1) {
      if (keys[i] && gp._markers[keys[i]]) return gp._markers[keys[i]];
    }
    return null;
  }

  // --- Zona visible del mapa cuando hay un panel superpuesto --------------
  // La guía se dibuja encima del mapa del complejo. Para que un lugar
  // seleccionado no quede escondido bajo el panel, se calcula la diferencia
  // entre el centro del mapa y el centro de la parte libre.
  function visibleOffset(map) {
    var panel = document.querySelector("[data-guide-overlay]");
    if (!panel || !map || typeof map.getContainer !== "function") return null;
    if (panel.getAttribute("data-guide-collapsed") === "1") return null;
    var mapRect = map.getContainer().getBoundingClientRect();
    var panelRect = panel.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height || !panelRect.width) return null;
    // El panel solo desplaza la vista si se solapa con el mapa.
    var overlaps = panelRect.left < mapRect.right - 4 && panelRect.right > mapRect.left + 4 &&
      panelRect.top < mapRect.bottom - 4 && panelRect.bottom > mapRect.top + 4;
    if (!overlaps) return null;
    var free = {
      left: mapRect.left,
      right: mapRect.right,
      top: mapRect.top,
      bottom: mapRect.bottom
    };
    // Margen de 30 px: el panel se apoya con 14 px de separación.
    var margin = 30;
    var coversLeft = panelRect.left - mapRect.left < margin;
    var coversRight = mapRect.right - panelRect.right < margin;
    var coversTop = panelRect.top - mapRect.top < margin;
    var coversBottom = mapRect.bottom - panelRect.bottom < margin;
    if (coversLeft && coversRight) {
      // Hoja superior o inferior a todo el ancho.
      if (coversBottom) free.bottom = Math.min(free.bottom, panelRect.top);
      else if (coversTop) free.top = Math.max(free.top, panelRect.bottom);
    } else if (coversTop && coversBottom) {
      // Panel lateral a todo el alto.
      if (coversLeft) free.left = Math.max(free.left, panelRect.right);
      else if (coversRight) free.right = Math.min(free.right, panelRect.left);
    } else {
      if (coversLeft) free.left = Math.max(free.left, panelRect.right);
      else if (coversRight) free.right = Math.min(free.right, panelRect.left);
      if (coversTop) free.top = Math.max(free.top, panelRect.bottom);
      else if (coversBottom) free.bottom = Math.min(free.bottom, panelRect.top);
    }
    var dx = (free.left + free.right) / 2 - (mapRect.left + mapRect.right) / 2;
    var dy = (free.top + free.bottom) / 2 - (mapRect.top + mapRect.bottom) / 2;
    if (!dx && !dy) return null;
    return { x: dx, y: dy };
  }

  // Centra una coordenada en la parte visible del mapa (fuera del panel).
  function focusOn(map, latlng, zoom) {
    if (!map || typeof map.setView !== "function") return;
    var offset = visibleOffset(map);
    if (!offset || !window.L) {
      map.setView(latlng, zoom, { animate: false });
      return;
    }
    try {
      // El desplazamiento se calcula en píxeles de pantalla, pero
      // map.project/unproject viven en el plano SIN rotar. Con la brújula
      // activa (bearing ≠ 0) hay que rotarlo al revés para que el lugar siga
      // quedando en la zona libre (no detrás del panel).
      var offsetRotado = window.L.point(offset.x, offset.y);
      var probeBase = null;
      if (map._rotate && typeof map.rotatedPointToMapPanePoint === "function" && typeof map.getBearing === "function" && Math.abs(map.getBearing()) > 0.01) {
        probeBase = map.rotatedPointToMapPanePoint(window.L.point(0, 0));
        var ex = map.rotatedPointToMapPanePoint(window.L.point(1000, 0)).subtract(probeBase);
        var ey = map.rotatedPointToMapPanePoint(window.L.point(0, 1000)).subtract(probeBase);
        offsetRotado = window.L.point(
          (ex.x * offsetRotado.x + ex.y * offsetRotado.y) / 1000000,
          (ey.x * offsetRotado.x + ey.y * offsetRotado.y) / 1000000
        );
      }
      var projected = map.project(window.L.latLng(latlng), zoom);
      var shifted = map.unproject(projected.subtract(offsetRotado), zoom);
      map.setView(shifted, zoom, { animate: false });
    } catch (e) {
      map.setView(latlng, zoom, { animate: false });
    }
  }

  // Si el mapa queda fuera de la pantalla (móvil), se trae a la vista.
  function revealMap(map) {
    if (!map || typeof map.getContainer !== "function") return;
    var rect = map.getContainer().getBoundingClientRect();
    var visible = rect.bottom > 90 && rect.top < window.innerHeight - 20;
    if (visible) return;
    try {
      map.getContainer().scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) { /* ignore */ }
  }

  gp.visibleOffset = visibleOffset;
  gp.focusOn = focusOn;
  gp.revealMap = revealMap;

  function includedPois() {
    return (gp.POIS || []).filter(function (p) { return p && p.external !== true; });
  }

  function presentCategories() {
    var seen = {};
    includedPois().forEach(function (p) { seen[p.category] = (seen[p.category] || 0) + 1; });
    var ordered = Object.keys(gp.CATEGORIES || {});
    var result = [];
    ordered.forEach(function (cat) { if (seen[cat]) result.push({ key: cat, count: seen[cat] }); });
    Object.keys(seen).forEach(function (cat) {
      if (ordered.indexOf(cat) === -1) result.push({ key: cat, count: seen[cat] });
    });
    return result;
  }

  function queryPois(options) {
    options = options || {};
    var filter = options.filter || "all";
    var query = normalize(options.query || "");
    return includedPois().filter(function (p) {
      if (filter !== "all" && p.category !== filter) return false;
      if (query) {
        var haystack = normalize([p.name, p.description, p.hotelId, categoryLabel(p.category)].join(" "));
        if (haystack.indexOf(query) === -1) return false;
      }
      return true;
    });
  }

  var state = { mount: null, filter: "all", query: "", selectedId: null, legendMount: null };

  function categoryChips() {
    var chips = ['<button type="button" class="guide-chip is-active" data-guide-filter="all" aria-pressed="true">Todos <span>' + includedPois().length + "</span></button>"];
    presentCategories().forEach(function (entry) {
      chips.push('<button type="button" class="guide-chip" data-guide-filter="' + escapeHtml(entry.key) + '" aria-pressed="false"><span class="guide-chip-dot" style="background:' + categoryColor(entry.key) + '"></span>' + escapeHtml(categoryLabel(entry.key)) + " <span>" + entry.count + "</span></button>");
    });
    return chips.join("");
  }

  function legendMarkup() {
    var items = presentCategories().map(function (entry) {
      return '<li><span class="guide-dot" style="background:' + categoryColor(entry.key) + '"></span>' + escapeHtml(categoryLabel(entry.key)) + " <em>" + entry.count + "</em></li>";
    }).join("");
    return '<h3 class="guide-legend-title">Leyenda de categorías</h3><ul class="guide-legend-list">' + items + '</ul><p class="guide-legend-note"><span class="guide-dot guide-dot--pending"></span>Pendiente de verificación (sin ubicación confirmada)</p>';
  }

  function renderLegend() {
    var legend = state.legendMount || (state.mount && state.mount.querySelector("#guideLegend"));
    if (legend) legend.innerHTML = legendMarkup();
  }
  function renderList() {
    if (!state.mount) return;
    var list = state.mount.querySelector("#guideList");
    var count = state.mount.querySelector("#guideCount");
    if (!list) return;
    var pois = queryPois(state);
    if (count) count.textContent = pois.length + " de " + includedPois().length + " lugares";
    if (!pois.length) {
      list.innerHTML = '<li class="guide-empty">Ajuste la búsqueda para ver más lugares.</li>';
      return;
    }
    list.innerHTML = pois.map(function (p) {
      var active = p.id === state.selectedId ? " is-active" : "";
      var meta = escapeHtml(categoryLabel(p.category)) + (p.hotelId ? " · " + escapeHtml(p.hotelId) : "");
      return '<li class="guide-item' + active + '" data-id="' + escapeHtml(p.id) + '" tabindex="0" role="button">' +
        '<span class="guide-dot" style="background:' + categoryColor(p.category) + '"></span>' +
        '<span class="guide-item-body"><span class="guide-item-name">' + escapeHtml(p.name) + '</span><span class="guide-item-meta">' + meta + "</span></span>" +
        "</li>";
    }).join("");
  }

  gp._route = { status: "idle", targetId: null, targetName: null, info: null, line: null, abort: null, recalcAbort: null, recalcAt: 0, recalcToken: 0 };

  function removeRouteLine() {
    if (gp._route.line) {
      try { gp._route.line.remove(); } catch (e) { /* ignore */ }
      gp._route.line = null;
    }
    var shared = window.RevistaDigital && window.RevistaDigital.state;
    if (shared && shared.routeLine) {
      try { shared.routeLine.remove(); } catch (e) { /* ignore */ }
      shared.routeLine = null;
    }
  }

  function cancelRoute(silent) {
    if (gp._route.abort) {
      try { gp._route.abort.abort(); } catch (e) { /* ignore */ }
      gp._route.abort = null;
    }
    if (gp._route.recalcAbort) {
      try { gp._route.recalcAbort.abort(); } catch (e) { /* ignore */ }
      gp._route.recalcAbort = null;
    }
    gp._route.recalcAt = 0;
    gp._route.recalcToken += 1;
    removeRouteLine();
    gp._route.status = "idle";
    gp._route.targetId = null;
    gp._route.targetName = null;
    gp._route.info = null;
    if (!silent) gp._routeNotice = "";
    if (!silent) renderRouteStatus();
  }

  function formatRouteInfo(result) {
    var mode = result.profile === "pedestrian" ? "a pie" : (result.profile === "driving" ? "en coche" : (result.profile || "ruta"));
    var provider = result.provider === "valhalla" ? "Valhalla" : (result.provider === "osrm" ? "OSRM" : "");
    var parts = [mode + (provider ? " (" + provider + ")" : "")];
    if (result.distance) parts.push((result.distance / 1000).toFixed(1) + " km");
    if (result.duration) parts.push(Math.round(result.duration / 60) + " min");
    return parts.join(" · ");
  }

  function bindRouteRedraw(map) {
    if (gp._redrawMap === map) return;
    if (gp._redrawMap && gp._redrawHandler) {
      try { gp._redrawMap.off("rotate zoomend", gp._redrawHandler); } catch (e) { /* ignore */ }
    }
    // leaflet-rotate 0.2.8 no dispara 'rotateend': solo 'rotate' por cada
    // setBearing (cada fotograma del gesto táctil). Se encola un redraw por
    // fotograma de animación para no recalcar el SVG más de una vez por frame.
    gp._redrawHandler = function () {
      if (gp._redrawQueued) return;
      gp._redrawQueued = true;
      (window.L && window.L.Util ? window.L.Util.requestAnimFrame : window.requestAnimationFrame)(function () {
        gp._redrawQueued = false;
        var line = gp._route && gp._route.line;
        if (line && map.hasLayer(line)) {
          try { line.redraw(); } catch (e) { /* ignore */ }
        }
      });
    };
    gp._redrawMap = map;
    map.on("rotate zoomend", gp._redrawHandler);
  }

  function drawRoute(origin, poi, result, options) {
    var shared = window.RevistaDigital && window.RevistaDigital.state;
    var map = gp._map || (shared && shared.activeMap);
    if (!map || !window.L) return;
    removeRouteLine();
    var coordinates = [[origin.latitude, origin.longitude]].concat(result.coordinates, [[poi.lat, poi.lng]]);
    // El pane debe vivir DENTRO de overlayPane (que a su vez está dentro del
    // rotatePane de leaflet-rotate): si se crea suelto queda en mapPane y no
    // rota junto con los tiles, desajustando la ruta al girar.
    var routePane = map.getPane("complexRoutePane") || map.createPane("complexRoutePane", map.getPane("overlayPane"));
    routePane.style.zIndex = "460";
    routePane.style.pointerEvents = "none";
    // Renderizador SVG explícito: los mapas de la guía usan preferCanvas y el
    // renderer de canvas es inestable al rotar/hacer zoom con leaflet-rotate.
    var lineOptions = {
      color: "#0057b8",
      weight: 6,
      opacity: 0.95,
      pane: "complexRoutePane"
    };
    if (typeof window.L.svg === "function") {
      lineOptions.renderer = window.L.svg({ pane: "complexRoutePane", padding: 0.5 });
    }
    gp._route.line = window.L.polyline(coordinates, lineOptions).addTo(map);
    bindRouteRedraw(map);
    if (shared) shared.routeLine = gp._route.line;
    // Si había una ruta de "Cómo llegar" del mapa de hotel, se deja de
    // rastrear para que no se recalcule por encima de esta.
    if (window.RevistaDigital && window.RevistaDigital.mapas) {
      window.RevistaDigital.mapas._directionsRoute = null;
    }
    // En una recalculación automática no se mueve la vista para no interrumpir
    // al usuario que está caminando.
    if (options && options.keepView) return;
    try {
      // En móvil, con la guía colapsada, encuadramos toda la ruta para que
      // el trazado quede visible en el área despejada del mapa.
      if (isMobileGuide()) {
        map.stop();
        var routeLine = gp._route.line;
        if (routeLine && typeof routeLine.getBounds === "function") {
          var routeBounds = routeLine.getBounds();
          if (routeBounds && typeof routeBounds.isValid === "function" && routeBounds.isValid()) {
            map.fitBounds(routeBounds, { padding: [60, 20] });
          }
        }
        gp._userFocusedMap = map;
        revealMap(map);
        return;
      }
      // Prioriza el destino con un zoom cercano en lugar de alejar el mapa para
      // encuadrar toda la ruta; el usuario puede alejar con los controles.
      map.stop();
      var focusZoom = Math.max(map.getZoom() || 16, 16);
      focusOn(map, [poi.lat, poi.lng], focusZoom);
      gp._userFocusedMap = map;
      revealMap(map);
    } catch (e) { /* ignore */ }
  }

  // --- Recalculación automática al desviarse ------------------------------
  // Distancia mínima (metros) entre el usuario y la línea de ruta para
  // considerar que se ha salido del camino.
  var ROUTE_DEVIATION_METERS = 25;
  // Tiempo mínimo entre recalculaciones (ms) para no saturar el servicio.
  var ROUTE_RECALC_INTERVAL_MS = 8000;

  function segmentDistanceMeters(point, start, end) {
    var rad = Math.PI / 180;
    var cos = Math.cos(((point.lat + start.lat + end.lat) / 3) * rad);
    var ax = start.lng * cos, ay = start.lat;
    var bx = end.lng * cos, by = end.lat;
    var px = point.lng * cos, py = point.lat;
    var dx = bx - ax, dy = by - ay;
    var lengthSquared = dx * dx + dy * dy;
    var t = lengthSquared ? ((px - ax) * dx + (py - ay) * dy) / lengthSquared : 0;
    t = Math.max(0, Math.min(1, t));
    var offsetX = (px - (ax + t * dx)) * rad;
    var offsetY = (py - (ay + t * dy)) * rad;
    return Math.sqrt(offsetX * offsetX + offsetY * offsetY) * 6371000;
  }

  function deviationFromRouteMeters(point) {
    var line = gp._route.line;
    if (!line || typeof line.getLatLngs !== "function") return 0;
    var coordinates = line.getLatLngs() || [];
    if (coordinates.length < 2) return 0;
    var minimum = Infinity;
    for (var i = 0; i < coordinates.length - 1; i += 1) {
      var distance = segmentDistanceMeters(point, coordinates[i], coordinates[i + 1]);
      if (distance < minimum) minimum = distance;
    }
    return minimum;
  }

  function maybeRecalculateRoute(coords) {
    if (!coords || coords.latitude == null || coords.longitude == null) return;
    var route = gp._route;
    if (!route || route.status !== "ready" || !route.targetId) return;

    var now = Date.now();
    if (route.recalcAt && now - route.recalcAt < ROUTE_RECALC_INTERVAL_MS) return;
    if (deviationFromRouteMeters({ lat: coords.latitude, lng: coords.longitude }) < ROUTE_DEVIATION_METERS) return;

    var poi = findPoi(route.targetId);
    if (!poi || !canMap(poi)) return;
    var engine = window.RevistaDigital && window.RevistaDigital.mapas;
    if (!engine || typeof engine.computeRoute !== "function") return;

    route.recalcAt = now;
    if (route.recalcAbort) {
      try { route.recalcAbort.abort(); } catch (e) { /* ignore */ }
    }
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    route.recalcAbort = controller;
    var token = ++route.recalcToken;
    var preferRoute = typeof engine.getPreferredRouteProfile === "function"
      ? engine.getPreferredRouteProfile([coords.latitude, coords.longitude], [poi.lat, poi.lng])
      : (typeof engine.isComplexDestination === "function" && engine.isComplexDestination([poi.lat, poi.lng])
        ? "pedestrian"
        : "driving");

    engine.computeRoute({
      origin: [coords.latitude, coords.longitude],
      destination: [poi.lat, poi.lng],
      prefer: preferRoute,
      signal: controller ? controller.signal : undefined
    }).then(function (result) {
      // Si la ruta se canceló o se pidió otro destino mientras se calculaba,
      // se descarta el resultado.
      if (route !== gp._route || route.targetId !== poi.id || route.recalcToken !== token) return;
      route.recalcAbort = null;
      drawRoute(coords, poi, result, { keepView: true });
      route.info = formatRouteInfo(result);
      renderRouteStatus(true);
    }).catch(function (error) {
      if (error && error.name === "AbortError") return;
      if (route !== gp._route || route.recalcToken !== token) return;
      // En una recalculación silenciosa se conserva la ruta anterior si falla.
      route.recalcAbort = null;
    });
  }

  gp.onUserPositionUpdate = maybeRecalculateRoute;

  function renderRouteStatus(skipReveal) {
    if (!state.mount) return;
    var box = state.mount.querySelector("#guideRouteBox");
    if (box) {
      var route = gp._route;
      var notice = gp._routeNotice
        ? '<p class="guide-route-status">' + escapeHtml(gp._routeNotice) + "</p>"
        : "";
      if (!route || route.status === "idle") {
        box.innerHTML = notice;
      } else {
        var name = escapeHtml(route.targetName || "el destino");
        var html = "";
        if (route.status === "locating") {
          html = '<p class="guide-route-status is-loading">' + escapeHtml(route.info || "Obteniendo su ubicación…") + "</p>";
        } else if (route.status === "calculating") {
          html = '<p class="guide-route-status is-loading">Calculando ruta a ' + name + "…</p>";
        } else if (route.status === "ready") {
          html = '<p class="guide-route-status is-ready">Ruta ' + escapeHtml(route.info || "") + " hasta " + name + ".</p>";
        } else {
          html = '<p class="guide-route-status is-error">' + escapeHtml(route.info || "Intente calcular la ruta de nuevo.") + "</p>";
        }
        html += '<button type="button" class="guide-route-cancel">Cancelar ruta</button>';
        box.innerHTML = notice + html;
        if (!skipReveal) revealFeedback(box);
        // El estado de ruta cambia la altura del menú flotante: lo recolocamos.
        if (isMobileGuide() && state.mobilePoi) positionMobileActions(state.mobilePoi);
      }
    }
    renderMobileRouteStatus();
  }

  // Lleva el bloque de ruta/reserva a la vista (queda sticky arriba del panel).
  // En móvil el estado de ruta vive en el menú flotante: desplazamos su caja
  // de ruta para que sea visible y recolocamos el menú al cambiar su altura.
  function revealFeedback(node) {
    if (!node) return;
    // Se desplaza el panel de la guía (también en móvil) para que la caja de
    // ruta/reserva quede visible. El menú flotante móvil se recoloca aparte.
    var target = node.closest ? node.closest(".guide-detail-feedback") : null;
    target = target || node;
    try {
      target.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } catch (e) { /* ignore */ }
  }

  function setRouteStatus(status, id, name, info) {
    gp._route.status = status;
    gp._route.targetId = id;
    gp._route.targetName = name;
    gp._route.info = info || null;
    renderRouteStatus();
  }

  function routeToPoi(id) {
    var poi = findPoi(id);
    if (!poi) return;
    // En móvil, al trazar una ruta salimos de la vista ampliada de la guía
    // para que el mapa y la ruta trazada queden visibles.
    if (isMobileGuide()) {
      try {
        var r = window.RevistaDigital && window.RevistaDigital.routes;
        if (r && typeof r.setGuidePanelOpen === "function") { r.setGuidePanelOpen(false); }
        else if (r && typeof r.setGuidePanelExpanded === "function") { r.setGuidePanelExpanded(false); }
      } catch (e) { /* ignore */ }
      if (state.mobilePoi && typeof positionMobileActions === "function") {
        try { positionMobileActions(state.mobilePoi); } catch (e) { /* ignore */ }
      }
    }
    if (poi.kind === "area") {
      setRouteStatus("error", id, poi.name, "Seleccione un punto de acceso del complejo para calcular la ruta.");
      return;
    }
    if (!canMap(poi)) {
      setRouteStatus("error", id, poi.name, "Estamos actualizando la ubicación de este lugar.");
      return;
    }
    var shared = window.RevistaDigital && window.RevistaDigital.state;
    var position = shared && shared.currentPosition;
    cancelRoute(true);
    gp._route.targetId = id;
    gp._route.targetName = poi.name;
    if (!position || position.latitude == null || position.longitude == null) {
      setRouteStatus("locating", id, poi.name, "Necesitamos su ubicación para calcular la ruta.");
      try {
        if (typeof window.requestCurrentLocation === "function") window.requestCurrentLocation();
      } catch (e) { /* ignore */ }
      return;
    }
    var engine = window.RevistaDigital && window.RevistaDigital.mapas;
    if (!engine || typeof engine.computeRoute !== "function") {
      setRouteStatus("error", id, poi.name, "Estamos actualizando el servicio de rutas. Intente de nuevo.");
      return;
    }
    // En móvil abrimos el mapa a pantalla completa para ver el trazado completo.
    if (isMobileGuide() && !(document.body && document.body.classList.contains("map-fullscreen-open"))) {
      try {
        var fsMap = window.RevistaDigital && window.RevistaDigital.state && window.RevistaDigital.state.activeMap;
        var fsContainer = fsMap && typeof fsMap.getContainer === "function" ? fsMap.getContainer() : null;
        var fsButton = fsContainer && fsContainer.querySelector(".map-touch-fullscreen");
        if (fsButton) fsButton.click();
      } catch (e) { /* ignore */ }
    }
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    gp._route.abort = controller;
    setRouteStatus("calculating", id, poi.name, null);
    var preferRoute = typeof engine.getPreferredRouteProfile === "function"
      ? engine.getPreferredRouteProfile([position.latitude, position.longitude], [poi.lat, poi.lng])
      : (typeof engine.isComplexDestination === "function" && engine.isComplexDestination([poi.lat, poi.lng])
        ? "pedestrian"
        : "driving");
    engine.computeRoute({
      origin: [position.latitude, position.longitude],
      destination: [poi.lat, poi.lng],
      prefer: preferRoute,
      signal: controller ? controller.signal : undefined
    }).then(function (result) {
      if (gp._route.targetId !== id) return;
      drawRoute(position, poi, result);
      setRouteStatus("ready", id, poi.name, formatRouteInfo(result));
    }).catch(function (error) {
      if (error && error.name === "AbortError") return;
      if (gp._route.targetId !== id) return;
      setRouteStatus("error", id, poi.name, "Seleccione otro destino para calcular la ruta.");
    });
  }

  gp.routeToPoi = routeToPoi;
  gp.cancelRoute = function () { cancelRoute(false); };

  // Menú flotante de acciones para móvil: sale sobre el mapa al tocar un punto
  // y ofrece "Cómo llegar", reserva/carrito y "Ver en el mapa" sin tener que
  // desplazarse hasta la ficha. El estado de la ruta (distancia y tiempo, como
  // en un navegador) se muestra aquí mismo.
  function renderMobileActions(poi) {
    if (!state.mount) return;
    state.mobilePoi = poi || null;
    var panel = mobileActionsRoot("#guideMobileActions");
    if (!panel) return;
    var titleEl = mobileActionsRoot("#guideMobileActionsTitle");
    var body = mobileActionsRoot("#guideMobileActionsBody");
    if (!body) return;
    if (!poi) {
      panel.hidden = true;
      body.innerHTML = "";
      if (titleEl) titleEl.textContent = "";
      return;
    }
    var verified = Number.isFinite(poi.lat) && Number.isFinite(poi.lng);
    var isArea = poi.kind === "area";
    var cat = poi.category;
    var btns = "";
    if (isArea) {
      btns += '<button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button>';
    } else if (verified) {
      btns += '<button type="button" class="guide-route" data-id="' + escapeHtml(poi.id) + '">Cómo llegar</button>';
      btns += '<button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button>';
      if (cat === "restaurante" || cat === "spa" || cat === "golf") {
        var label = cat === "restaurante" ? "Reservar" : (cat === "spa" ? "Reservar cita" : "Reservar tee time");
        btns += '<button type="button" class="guide-book" data-id="' + escapeHtml(poi.id) + '" data-cat="' + cat + '">' + label + "</button>";
        if (cat === "golf" || cat === "restaurante") {
          btns += '<button type="button" class="guide-cart" data-id="' + escapeHtml(poi.id) + '" data-cat="' + cat + '">Solicitar carrito</button>';
        }
      }
    } else {
      btns += '<span class="guide-mobile-actions-note">Información en actualización; la ruta estará disponible pronto.</span>';
      if (cat === "restaurante" || cat === "spa" || cat === "golf") {
        var l2 = cat === "restaurante" ? "Reservar" : (cat === "spa" ? "Reservar cita" : "Reservar tee time");
        btns += '<button type="button" class="guide-book" data-id="' + escapeHtml(poi.id) + '" data-cat="' + cat + '">' + l2 + "</button>";
        if (cat === "golf" || cat === "restaurante") {
          btns += '<button type="button" class="guide-cart" data-id="' + escapeHtml(poi.id) + '" data-cat="' + cat + '">Solicitar carrito</button>';
        }
      }
    }
    if (titleEl) titleEl.textContent = poi.name || "";
    body.innerHTML = mobilePoiInfoHtml(poi) +
      '<div class="guide-mobile-actions-buttons">' + btns + "</div>" +
      '<div class="guide-route-box" id="guideMobileRouteBox" role="status" aria-live="polite"></div>' +
      '<div class="guide-book-box" id="guideMobileBookBox"></div>';
    panel.hidden = false;
    positionMobileActions(poi);
    renderMobileRouteStatus();
  }

  // Coloca el menú flotante pegado justo ENCIMA del panel de la guía (el que
  // está abajo), con el mismo ancho, para no tapar el mapa ni el marcador.
  function positionMobileActions(poi) {
    var panel = mobileActionsRoot("#guideMobileActions");
    if (!panel || panel.hidden) return;
    var wrap = panel.offsetParent;
    if (!wrap) return;
    var guidePanel = wrap.querySelector(".hotel-guide-panel") ||
      document.querySelector(".hotel-guide-panel");
    if (!guidePanel) return;
    var wrapRect = wrap.getBoundingClientRect();
    var gpRect = guidePanel.getBoundingClientRect();
    var margin = 8; // separación entre el menú y el panel
    // Mismo ancho y misma alineación horizontal que el panel de la guía.
    var left = (gpRect.left - wrapRect.left);
    var width = gpRect.width;
    // Anclado justo ENCIMA del borde superior del panel (por su borde inferior),
    // así al crecer se extiende hacia arriba y nunca lo tapa ni se sale: el
    // overflow interno hace scroll si hace falta.
    var bottom = (wrapRect.bottom - gpRect.top) + margin;
    var maxH = (gpRect.top - wrapRect.top) - margin - 6;
    panel.style.left = Math.round(left) + "px";
    panel.style.width = Math.round(width) + "px";
    panel.style.maxWidth = "calc(100% - 16px)";
    panel.style.top = "auto";
    panel.style.bottom = Math.round(bottom) + "px";
    panel.style.maxHeight = Math.max(120, Math.round(maxH)) + "px";
    panel.style.right = "auto";
    panel.classList.remove("is-below");
    panel.style.setProperty("--gma-arrow-x", "-9999px");
  }

  function renderMobileRouteStatus() {
    var box = mobileActionsRoot("#guideMobileRouteBox");
    if (!box) return;
    var route = gp._route;
    var notice = gp._routeNotice
      ? '<p class="guide-route-status">' + escapeHtml(gp._routeNotice) + "</p>"
      : "";
    if (!route || route.status === "idle") {
      box.innerHTML = notice;
      if (isMobileGuide()) {
        try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
        positionMobileActions(state.mobilePoi);
      }
      return;
    }
    var name = escapeHtml(route.targetName || "el destino");
    var html = "";
    if (route.status === "locating") {
      html = '<p class="guide-route-status is-loading">' + escapeHtml(route.info || "Obteniendo su ubicación…") + "</p>";
    } else if (route.status === "calculating") {
      html = '<p class="guide-route-status is-loading">Calculando ruta a ' + name + "…</p>";
    } else if (route.status === "ready") {
      html = '<p class="guide-route-status is-ready">Ruta ' + escapeHtml(route.info || "") + " hasta " + name + ".</p>";
    } else {
      html = '<p class="guide-route-status is-error">' + escapeHtml(route.info || "Intente calcular la ruta de nuevo.") + "</p>";
    }
    html += '<button type="button" class="guide-route-cancel">Cancelar ruta</button>';
    box.innerHTML = notice + html;
    // El estado de ruta cambia la altura del menú: lo recolocamos sobre el panel.
    if (isMobileGuide()) {
      try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
      positionMobileActions(state.mobilePoi);
    }
  }

  function renderDetail(poi) {
    if (!state.mount) return;
    var detail = state.mount.querySelector("#guideDetail");
    if (!detail) return;
    if (!poi) {
      detail.innerHTML = '<p class="guide-detail-empty">Seleccione un lugar de la lista para ver su información.</p>';
      renderMobileActions(null);
      return;
    }
    var verified = Number.isFinite(poi.lat) && Number.isFinite(poi.lng);
    var zone = (poi.hotelId || poi.hotel)
      ? '<p class="guide-detail-row"><strong>Hotel</strong> ' + escapeHtml(poi.hotelId || poi.hotel) + "</p>"
      : (poi.zone ? '<p class="guide-detail-row"><strong>Zona</strong> ' + escapeHtml(poi.zone) + "</p>" : "");
    var isArea = poi.kind === "area";
    var actions;
    // Botones de reserva: disponibles en toda ficha de restaurante, spa o
    // golf, estén o no verificados todavía. Quedan colocados y listos para
    // conectarse cuando se disponga del contacto.
    var bookingActions = (function(){
      var cat = poi.category;
      if (cat === "restaurante" || cat === "spa" || cat === "golf") {
        var label = cat === "restaurante" ? "Reservar" : (cat === "spa" ? "Reservar cita" : "Reservar tee time");
        var html = '<button type="button" class="guide-book" data-id="' + escapeHtml(poi.id) + '" data-cat="' + cat + '">' + label + "</button>";
        if (cat === "golf" || cat === "restaurante") {
          html += '<button type="button" class="guide-cart" data-id="' + escapeHtml(poi.id) + '" data-cat="' + cat + '">Solicitar carrito</button>';
        }
        return html;
      }
      return "";
    })();
    if (isArea) {
      actions = '<p class="guide-detail-desc">Se representa como <strong>área/etiqueta</strong> en el mapa: no es una instalación con ruta.</p>' +
        '<div class="guide-detail-actions"><button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button></div>';
    } else if (verified) {
      actions = '<div class="guide-detail-actions">' +
        '<button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button>' +
        '<button type="button" class="guide-route" data-id="' + escapeHtml(poi.id) + '">Cómo llegar</button>' +
        bookingActions +
        "</div>";
    } else {
      actions = '<p class="guide-pending-note">La información de este lugar se está actualizando; en breve estará disponible en el mapa y con ruta.</p>' +
        (bookingActions ? '<div class="guide-detail-actions">' + bookingActions + "</div>" : "");
    }
    var extraInfo = "";
    // Desglose de horarios por servicio (desayuno / comida / cena / bar).
    var scheduleRows = "";
    if (poi.breakfast) scheduleRows += '<p class="guide-detail-row"><strong>Desayuno</strong> ' + escapeHtml(poi.breakfast) + "</p>";
    if (poi.lunch) scheduleRows += '<p class="guide-detail-row"><strong>Comida</strong> ' + escapeHtml(poi.lunch) + "</p>";
    if (poi.dinner) scheduleRows += '<p class="guide-detail-row"><strong>Cena</strong> ' + escapeHtml(poi.dinner) + "</p>";
    if (poi.late) scheduleRows += '<p class="guide-detail-row"><strong>Bar</strong> ' + escapeHtml(poi.late) + "</p>";

    if (poi.category === "restaurante") {
      var hours = poi.hours || "Consultar horario en la app de Iberostar";
      var cuisine = poi.cuisine || "Consultar en la app de Iberostar";
      extraInfo = '<div class="guide-extra-info">' +
        (scheduleRows ? "" : '<p class="guide-detail-row"><strong>Horario</strong> ' + escapeHtml(hours) + "</p>") +
        scheduleRows +
        '<p class="guide-detail-row"><strong>Cocina</strong> ' + escapeHtml(cuisine) + "</p>" +
        (poi.menu ? '<p class="guide-detail-row"><strong>Menú</strong> ' + escapeHtml(poi.menu) + "</p>" : "") +
        "</div>";
    } else if (poi.category === "spa") {
      var spaHours = poi.hours || "Consultar horario en la app de Iberostar";
      var treatments = poi.treatments || "Consulte los tratamientos disponibles en la app de Iberostar.";
      extraInfo = '<div class="guide-extra-info">' +
        '<p class="guide-detail-row"><strong>Horario</strong> ' + escapeHtml(spaHours) + "</p>" +
        '<p class="guide-detail-row"><strong>Tratamientos</strong> ' + escapeHtml(treatments) + "</p>" +
        (poi.packages ? '<p class="guide-detail-row"><strong>Paquetes</strong> ' + escapeHtml(poi.packages) + "</p>" : "") +
        "</div>";
    } else if (poi.category === "golf") {
      var golfHours = poi.hours || "Consultar horario en la app de Iberostar";
      var golfPackages = poi.packages || "Consulte los paquetes en la app de Iberostar.";
      extraInfo = '<div class="guide-extra-info">' +
        '<p class="guide-detail-row"><strong>Horario</strong> ' + escapeHtml(golfHours) + "</p>" +
        (poi.teeTimes ? '<p class="guide-detail-row"><strong>Tee times</strong> ' + escapeHtml(poi.teeTimes) + "</p>" : "") +
        '<p class="guide-detail-row"><strong>Paquetes</strong> ' + escapeHtml(golfPackages) + "</p>" +
        "</div>";
    } else if (poi.category === "bar") {
      extraInfo = '<div class="guide-extra-info">' +
        (scheduleRows ? "" : '<p class="guide-detail-row"><strong>Horario</strong> ' + escapeHtml(poi.hours || "Consultar horario en la app de Iberostar") + "</p>") +
        scheduleRows +
        (poi.cuisine ? '<p class="guide-detail-row"><strong>Concepto</strong> ' + escapeHtml(poi.cuisine) + "</p>" : "") +
        (poi.menu ? '<p class="guide-detail-row"><strong>Carta</strong> ' + escapeHtml(poi.menu) + "</p>" : "") +
        "</div>";
    } else if (poi.category === "club" || poi.category === "starprestige") {
      var memberAmenities = Array.isArray(poi.amenities) ? poi.amenities.join(", ") : (poi.amenities || "");
      var memberServices = Array.isArray(poi.services) ? poi.services.join(", ") : (poi.services || "");
      extraInfo = '<div class="guide-extra-info">' +
        (poi.hours ? '<p class="guide-detail-row"><strong>Horario</strong> ' + escapeHtml(poi.hours) + "</p>" : "") +
        (memberAmenities ? '<p class="guide-detail-row"><strong>Amenidades</strong> ' + escapeHtml(memberAmenities) + "</p>" : "") +
        (memberServices ? '<p class="guide-detail-row"><strong>Servicios incluidos</strong> ' + escapeHtml(memberServices) + "</p>" : "") +
        "</div>";
    } else if (poi.hours || poi.menu || poi.packages) {
      extraInfo = '<div class="guide-extra-info">' +
        (poi.hours ? '<p class="guide-detail-row"><strong>Horario</strong> ' + escapeHtml(poi.hours) + "</p>" : "") +
        (poi.cuisine ? '<p class="guide-detail-row"><strong>Concepto</strong> ' + escapeHtml(poi.cuisine) + "</p>" : "") +
        (poi.menu ? '<p class="guide-detail-row"><strong>Carta</strong> ' + escapeHtml(poi.menu) + "</p>" : "") +
        (poi.packages ? '<p class="guide-detail-row"><strong>Paquetes</strong> ' + escapeHtml(poi.packages) + "</p>" : "") +
        "</div>";
    }
    detail.innerHTML =
      '<div class="guide-detail-feedback">' +
        '<div class="guide-route-box" id="guideRouteBox" role="status" aria-live="polite"></div>' +
        '<div class="guide-book-box" id="guideBookBox"></div>' +
      '</div>' +
      '<span class="guide-dot guide-dot--lg" style="background:' + categoryColor(poi.category) + '"></span>' +
      '<h3 class="guide-detail-title">' + escapeHtml(poi.name) + "</h3>" +
      '<p class="guide-detail-cat">' + escapeHtml(categoryLabel(poi.category)) + ((poi.hotelId || poi.hotel || poi.zone) ? ' · ' + escapeHtml(poi.hotelId || poi.hotel || poi.zone) : '') + "</p>" +
      (poi.description ? '<p class="guide-detail-desc">' + escapeHtml(poi.description) + "</p>" : "") +
      zone +
      extraInfo +
      poiCommonInfoHtml(poi) +
      actions;
    renderRouteStatus();
    renderMobileActions(poi);
    // En escritorio, llevamos la ficha a la vista (queda arriba de la lista).
    // En móvil no hace falta desplazarse: las acciones salen en el menú flotante.
    if (!isMobileGuide()) revealDetail(detail);
  }

  // ¿Estamos en el ancho donde la guía usa el panel estrecho con menú flotante?
  function isMobileGuide() {
    try {
      return window.matchMedia("(max-width: 850px)").matches;
    } catch (e) {
      return window.innerWidth <= 850;
    }
  }

  // El menú flotante se reubica fuera del mount (sobre el mapa), así que hay
  // que buscarlo en el propio mount o, si no está, en el documento.
  function mobileActionsRoot(selector) {
    if (state.mount) {
      var el = state.mount.querySelector(selector);
      if (el) return el;
    }
    return document.querySelector(selector);
  }

  function revealDetail(detail) {
    if (!detail) return;
    try {
      detail.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } catch (e) { /* ignore */ }
  }

  // Pantallas de reserva y de solicitud de carrito. Quedan preparadas para
  // conectarse al sistema de reservas; por ahora capturan la solicitud y
  // avisan que se confirmará en recepción.
  function renderBookingPanel(poi, kind) {
    // En móvil el formulario vive en el menú flotante; en escritorio, en la ficha.
    var box = isMobileGuide() ? mobileActionsRoot("#guideMobileBookBox") : (state.mount && state.mount.querySelector("#guideBookBox"));
    if (!box || !poi) return;
    var isCart = kind === "cart";
    var title = isCart
      ? "Solicitud de carrito de golf"
      : (poi.category === "restaurante" ? "Reservar mesa" : (poi.category === "spa" ? "Reservar cita" : "Reservar tee time"));
    var fields = isCart
      ? '<p class="guide-book-note">El carrito le recogerá en su ubicación actual. Active la ubicación del dispositivo para compartir el punto exacto.</p>'
      : '<label class="guide-book-field"><span>Fecha</span><input type="date" name="fecha" id="guideBookDate" required /></label>' +
        '<label class="guide-book-field"><span>Hora</span><input type="time" name="hora" id="guideBookTime" required /></label>' +
        '<label class="guide-book-field"><span>Personas</span><input type="number" name="personas" id="guideBookGuests" min="1" max="20" value="2" required /></label>';
    box.innerHTML = '<form class="guide-book-form" id="guideBookForm">' +
      '<h4 class="guide-book-title">' + escapeHtml(title) + "</h4>" +
      '<p class="guide-book-place">' + escapeHtml(poi.name) + "</p>" +
      fields +
      '<label class="guide-book-field"><span>Nombre</span><input type="text" name="nombre" id="guideBookName" required /></label>' +
      '<label class="guide-book-field"><span>Habitación</span><input type="text" name="habitacion" id="guideBookRoom" placeholder="Ej. 1204" /></label>' +
      '<label class="guide-book-field"><span>Notas</span><textarea name="notas" id="guideBookNotes" rows="2"></textarea></label>' +
      '<div class="guide-book-actions">' +
        '<button type="submit" class="guide-book-submit">Enviar solicitud</button>' +
        '<button type="button" class="guide-book-cancel" data-guide-book-cancel="1">Cancelar</button>' +
      "</div>" +
          '<p class="guide-book-note">Su solicitud se registra en el sistema. La confirmación se realiza en recepción del hotel.</p>' +
    "</form>";
    var form = box.querySelector("#guideBookForm");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var tracker = window.RevistaDigital && window.RevistaDigital.carritoGolf;
        if (isCart && tracker && typeof tracker.request === "function") {
          var destination = null;
          if (Number.isFinite(Number(poi.lat)) && Number.isFinite(Number(poi.lng))) {
            destination = { id: poi.id, name: poi.name, lat: Number(poi.lat), lng: Number(poi.lng) };
          } else if (poi.hotelId && window.RevistaDigital.guiapa?.poiForHotel) {
            var hotelPoi = window.RevistaDigital.guiapa.poiForHotel(poi.hotelId);
            if (hotelPoi && Number.isFinite(Number(hotelPoi.lat)) && Number.isFinite(Number(hotelPoi.lng))) {
              destination = { id: hotelPoi.id, name: hotelPoi.name, lat: Number(hotelPoi.lat), lng: Number(hotelPoi.lng) };
            }
          }
          var request = tracker.request({
            guest: form.querySelector("#guideBookName")?.value || "",
            room: form.querySelector("#guideBookRoom")?.value || "",
            notes: form.querySelector("#guideBookNotes")?.value || "",
            destination: destination,
            source: "guide-map"
          });
          if (request) {
            box.innerHTML = '<div class="guide-book-done guide-book-done--cart">' +
              '<h4 class="guide-book-title">Se solicitó el transporte</h4>' +
              '<p>Buscando un carrito para recogerte en ' + escapeHtml(request.pickup.label) +
              ' y llevarte a ' + escapeHtml(request.destination?.name || poi.name) + '.</p>' +
              '<button type="button" class="guide-cart-track" data-guide-cart-track="1">Ver el transporte →</button>' +
            '</div>';
            box.querySelector("[data-guide-cart-track]")?.addEventListener("click", function () {
              try { if (document.fullscreenElement) document.exitFullscreen().catch(function () {}); } catch (e) {}
              try {
                ["is-fullscreen","map-fullscreen","modal-open","no-scroll","fullscreen-active","pnlm-fullscreen","map-fullscreen-open","pnlm-fullscreen-open"].forEach(function (cls) {
                  document.body.classList.remove(cls);
                  document.documentElement.classList.remove(cls);
                  document.querySelectorAll("*").forEach(function (el) { try { el.classList.remove(cls); } catch (e) {} });
                });
                // reset inline styles aplicados por fullscreen en contenedores de mapa
                document.querySelectorAll(".map-container,.mapbox-map,.guide-map-wrap,[class*='map'], .leaflet-container").forEach(function (el) {
                  try { el.style.position = ""; el.style.top = ""; el.style.left = ""; el.style.width = ""; el.style.height = ""; el.style.zIndex = ""; el.style.maxHeight = ""; } catch (e) {}
                });
                document.body.style.overflow = "";
                document.documentElement.style.overflow = "";
              } catch (e) {}
              try { document.querySelectorAll('.modal, .popup, .leaflet-popup, [role="dialog"]').forEach(function (el) { try { el.remove(); } catch (e) {} }); } catch (e) {}
              try {
                document.querySelectorAll('.guide-book-done, #guideBookBox, #guideMobileBookBox, .hotel-transport-banner, [class*="transport-banner"]').forEach(function(el){ try{ el.innerHTML = ''; }catch(e){} try{ el.remove(); }catch(e){} });
              } catch (e) {}
              try { sessionStorage.setItem('auto_fullscreen_transporte', 'true'); } catch (e) {}
              tracker.openPage(document.body.dataset.hotelSlug || "");
            });
            revealFeedback(box);
            if (isMobileGuide()) {
              try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
              if (state.mobilePoi) positionMobileActions(state.mobilePoi);
            }
            return;
          }
        }
        box.innerHTML = '<div class="guide-book-done">' +
          '<h4 class="guide-book-title">Solicitud enviada</h4>' +
          '<p>Registramos su ' + escapeHtml(title.toLowerCase()) + " para " + escapeHtml(poi.name) + ".</p>" +
          '<p>Recepción del hotel le confirmará la hora y el punto de encuentro.</p>' +
        "</div>";
      });
    }
    var cancel = box.querySelector("[data-guide-book-cancel]");
    if (cancel) {
      cancel.addEventListener("click", function () { box.innerHTML = ""; });
    }
    revealFeedback(box);
    // En móvil, llevamos también a la vista la caja de reserva del menú flotante.
    if (isMobileGuide()) {
      try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
    }
    // El formulario cambia la altura del menú: lo recolocamos sobre el panel.
    if (isMobileGuide()) positionMobileActions(state.mobilePoi);
  }

  function selectPoi(id, opts) {
    var poi = findPoi(id);
    if (!poi) return;
    opts = opts || {};
    state.selectedId = id;
    renderList();
    renderDetail(poi);
    if (!canMap(poi)) return;
    var map = gp._map;
    if (!map || typeof map.setView !== "function") return;
    var target = [poi.lat, poi.lng];
    // El zoom de selección debe alcanzar disableClusteringAtZoom para que el
    // punto quede suelto y su popup pueda abrirse individualmente.
    var disableAt = (gp._poiLayer && gp._poiLayer.options && typeof gp._poiLayer.options.disableClusteringAtZoom === "number")
      ? gp._poiLayer.options.disableClusteringAtZoom
      : 16;
    // Se usa exactamente el nivel en que se desagrupan los marcadores
    // (disableClusteringAtZoom), acotado al zoom máximo del mapa. Agrupar y
    // desagrupar de forma predecible evita que el punto quede dentro de un
    // grupo y su popup no pueda abrirse.
    var mapMaxZoom = (typeof map.getMaxZoom === "function") ? map.getMaxZoom() : disableAt;
    var targetZoom = Math.min(mapMaxZoom, Math.max(16, disableAt));
    var marker = markerFor(poi);
    try {
      map.stop();
      focusOn(map, target, targetZoom);
      gp._userFocusedMap = map;
      if (marker && typeof marker.openPopup === "function") marker.openPopup();
      // No desplazar la página si ya estamos viendo el mapa (p. ej. al usar el
      // menú flotante móvil); solo se trae a la vista cuando está fuera.
      if (!opts.noScroll) revealMap(map);
    } catch (e) { /* ignore map errors */ }
  }

  // --- Actividades del día -------------------------------------------------
  // Se renderizan desde los datos del complejo. Cada actividad es
  // funcional: al tocarla se selecciona el lugar en el mapa y se abre su
  // ficha con horarios y reservas.
  function renderActivities() {
    var list = (state.mount && state.mount.querySelector("#guideActivitiesList")) ||
      document.getElementById("guideActivitiesList");
    if (!list) return;
    var actividades = gp.ACTIVIDADES || [];
    if (!actividades.length) {
      list.innerHTML = '<li class="guide-activity-empty">No hay actividades programadas para hoy.</li>';
      return;
    }
    list.innerHTML = actividades.map(function (item, index) {
      var poi = item.poiId ? findPoi(item.poiId) : null;
      var can = poi && canMap(poi);
      return '<li class="guide-activity-item' + (can ? " is-linked" : "") + '"' +
        (can ? ' data-activity-id="' + escapeHtml(item.poiId) + '" tabindex="0" role="button"' : "") + ">" +
        '<span class="guide-activity-time">' + escapeHtml(item.hora) + "</span>" +
        '<span class="guide-activity-name">' + escapeHtml(item.nombre) + "</span>" +
        '<span class="guide-activity-location">' + escapeHtml(item.lugar || "") + "</span>" +
        "</li>";
    }).join("");
  }

  function activateActivity(poiId) {
    if (!poiId) return;
    var poi = findPoi(poiId);
    if (!poi) return;
    selectPoi(poiId);
    var box = (state.mount && state.mount.querySelector("#guideActivities")) ||
      document.getElementById("guideActivities");
    if (box && typeof box.scrollIntoView === "function") {
      try { box.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) { /* ignore */ }
    }
  }

  // --- Límites de los lugares del complejo --------------------------------
  // Recuadro que abarca los lugares verificados con coordenadas. Sirve para
  // encuadrar el mapa sobre lo que realmente se puede visitar.
  gp.getFocusBounds = function () {
    var south = Infinity, west = Infinity, north = -Infinity, east = -Infinity;
    (gp.POIS || []).forEach(function (poi) {
      if (!poi || poi.lat == null || poi.lng == null) return;
      if (!(Number.isFinite(poi.lat) && Number.isFinite(poi.lng))) return;
      south = Math.min(south, poi.lat);
      north = Math.max(north, poi.lat);
      west = Math.min(west, poi.lng);
      east = Math.max(east, poi.lng);
    });
    if (!isFinite(south)) return null;
    return [[south, west], [north, east]];
  };

function mobilePoiInfoHtml(poi) {
  if (!poi) return "";
  var rows = [];
  var location = poi.hotel || poi.hotelId || poi.zone || "";
  if (poi.hours) rows.push(["Horario", poi.hours]);
  if (poi.cuisine) rows.push([poi.category === "restaurante" ? "Cocina" : "Concepto", poi.cuisine]);
  if (poi.menu) rows.push([poi.category === "bar" ? "Carta" : "Menú", poi.menu]);
  var specialties = "";
  if (poi.especialidades) specialties = String(poi.especialidades);
  else if (Array.isArray(poi.signatureDishes)) specialties = poi.signatureDishes.join(", ");
  else if (poi.signatureDishes) specialties = String(poi.signatureDishes);
  else if (Array.isArray(poi.platillosInsignia)) specialties = poi.platillosInsignia.join(", ");
  else if (poi.platillosInsignia) specialties = String(poi.platillosInsignia);
  if (specialties && specialties !== poi.menu) rows.push(["Especialidades", specialties]);
  var cocteles = poi.cocteles || poi.cocktails || poi.bebidas || poi.coctelesInsignia;
  if (cocteles) rows.push(["Cócteles", Array.isArray(cocteles) ? cocteles.join(", ") : String(cocteles)]);
  if (poi.treatments) rows.push(["Tratamientos", poi.treatments]);
  if (poi.packages) rows.push(["Paquetes", poi.packages]);
  if (poi.teeTimes) rows.push(["Tee times", poi.teeTimes]);
  var amenities = Array.isArray(poi.amenities) ? poi.amenities.join(", ") : (poi.amenities ? String(poi.amenities) : "");
  if (amenities) rows.push(["Amenidades", amenities]);
  var services = Array.isArray(poi.services) ? poi.services.join(", ") : (poi.services ? String(poi.services) : "");
  if (services) rows.push(["Servicios", services]);
  var dress = poi.dressCode || poi.vestimenta;
  if (dress) rows.push(["Código de vestimenta", dress]);
  var r = (poi.reservation !== undefined ? poi.reservation : poi.reservas);
  var reservationText = "";
  if (r !== undefined && r !== null && r !== "") reservationText = (typeof r === "boolean") ? (r ? "Recomendada" : "No requerida") : String(r);
  if (reservationText) rows.push(["Reservas", reservationText]);
  if (poi.description) rows.push(["Descripción", poi.description]);
  if (!rows.length) return "";
  var html = '<div class="guide-mobile-actions-info">';
  html += '<p class="guide-mobile-actions-cat">' + escapeHtml(categoryLabel(poi.category)) + (location ? ' · ' + escapeHtml(location) : '') + '</p>';
  html += rows.map(function (row) { return '<p class="guide-detail-row"><strong>' + escapeHtml(row[0]) + '</strong> ' + escapeHtml(row[1]) + '</p>'; }).join("");
  html += '</div>';
  return html;
}

function poiCommonInfoHtml(poi) {
  if (!poi) return "";
  var rows = [];
  var specialties = "";
  if (poi.especialidades) specialties = String(poi.especialidades);
  else if (Array.isArray(poi.signatureDishes)) specialties = poi.signatureDishes.join(", ");
  else if (poi.signatureDishes) specialties = String(poi.signatureDishes);
  else if (Array.isArray(poi.platillosInsignia)) specialties = poi.platillosInsignia.join(", ");
  else if (poi.platillosInsignia) specialties = String(poi.platillosInsignia);
  if (specialties && specialties !== poi.menu) rows.push(["Especialidades", specialties]);
  var cocteles = poi.cocteles || poi.cocktails || poi.bebidas || poi.coctelesInsignia;
  if (cocteles) rows.push(["Cócteles", Array.isArray(cocteles) ? cocteles.join(", ") : String(cocteles)]);
  var dress = poi.dressCode || poi.vestimenta;
  if (dress) rows.push(["Código de vestimenta", dress]);
  var r = (poi.reservation !== undefined ? poi.reservation : poi.reservas);
  var reservationText = "";
  if (r !== undefined && r !== null && r !== "") reservationText = (typeof r === "boolean") ? (r ? "Recomendada" : "No requerida") : String(r);
  if (reservationText) rows.push(["Reservas", reservationText]);
  if (!rows.length) return "";
  return '<div class="guide-extra-info guide-common-info">' + rows.map(function (row) {
    return '<p class="guide-detail-row"><strong>' + escapeHtml(row[0]) + '</strong> ' + escapeHtml(row[1]) + '</p>';
  }).join("") + '</div>';
}

  gp.renderExplorer = function (mount, options) {
    if (!mount) return null;
    var opts = options || {};
    state.mount = mount;
    state.filter = "all";
    state.query = "";
    state.selectedId = null;
    state.legendMount = opts.legendMount || null;
    // Modo panel: la guía se dibuja sobre el mapa (una sola columna) y la
    // leyenda se muestra aparte, debajo del mapa.
    var panelMode = !!opts.panel;
    var searchField = '<label class="guide-search"><span aria-hidden="true">\uD83D\uDD0D</span>' +
      '<input id="guideSearchInput" type="search" placeholder="Buscar restaurante, bar, piscina…" aria-label="Buscar lugar por nombre" autocomplete="off" />' +
      "</label>";
    var head = panelMode
      ? ""
      : '<div class="guide-explorer-head">' +
          '<div class="guide-explorer-title">' +
            '<p class="portal-kicker">GUÍA INTERACTIVA · THE CLUB</p>' +
            "<h2>Explore los lugares del complejo</h2>" +
            "<p>Busque por nombre o filtre por categoría. Seleccione un lugar verificado para verlo en el mapa.</p>" +
          "</div>" +
          searchField +
        "</div>";
    mount.innerHTML = '<div class="guide-explorer' + (panelMode ? " guide-explorer--panel" : "") + '">' +
      head +
      (panelMode ? searchField : "") +
      (panelMode ? '<div class="guide-mobile-actions" id="guideMobileActions" hidden role="region" aria-label="Acciones del lugar seleccionado">' +
          '<div class="guide-mobile-actions-head">' +
            '<span class="guide-mobile-actions-title" id="guideMobileActionsTitle"></span>' +
            '<button type="button" class="guide-mobile-actions-close" id="guideMobileActionsClose" aria-label="Cerrar acciones">×</button>' +
          '</div>' +
          '<div class="guide-mobile-actions-body" id="guideMobileActionsBody"></div>' +
        '</div>' : "") +
      '<div class="guide-filters" id="guideFilters" role="group" aria-label="Filtrar por categoría">' + categoryChips() + "</div>" +
      '<div class="guide-layout">' +
        '<div class="guide-panel guide-list-panel">' +
          '<div class="guide-list-head"><span id="guideCount"></span></div>' +
          '<ul class="guide-list" id="guideList"></ul>' +
        "</div>" +
        '<aside class="guide-panel guide-side">' +
          '<div class="guide-detail" id="guideDetail"></div>' +
          (panelMode ? "" : '<div class="guide-legend" id="guideLegend"></div>') +
        "</aside>" +
      "</div>" +
      '<div class="guide-activities" id="guideActivities">' +
        '<div class="guide-activities-head">' +
          "<h3>Actividades del día</h3>" +
          "<p>" + (gp.ACTIVIDADES_OFICIAL === true
            ? "Toque una actividad para ver el lugar en el mapa y reservar."
            : (gp.ACTIVIDADES_NOTA ? gp.ACTIVIDADES_NOTA + " " : "") + "Horarios ilustrativos (no oficiales). Toque una actividad para ver el lugar en el mapa y reservar.") + "</p>" +
        "</div>" +
        '<ul class="guide-activities-list" id="guideActivitiesList"></ul>' +
      "</div>" +
    "</div>";

    var input = mount.querySelector("#guideSearchInput");
    if (input) {
      input.addEventListener("input", function () {
        state.query = input.value;
        renderList();
      });
    }

    // En modo panel, subimos el menú flotante al contenedor del mapa para que
    // se ancle a la parte superior del mapa (no al panel inferior).
    var mobileActions = mount.querySelector("#guideMobileActions");
    if (mobileActions) {
      var mapWrap = mount.closest(".hotel-complex-map-wrap") || mount.parentNode;
      if (mapWrap) mapWrap.appendChild(mobileActions);
    }

    // En modo panel, las "Actividades del día" se muestran debajo del mapa (no
    // dentro del cuadro de la guía interactiva). Se mueve el bloque al
    // contenedor del mapa, después de la leyenda, y se le añade su propio
    // listener delegado porque sale del listener del mount.
    var activities = mount.querySelector("#guideActivities");
    if (panelMode && activities) {
      var stage = mount.closest(".hotel-complex-stage") || null;
      if (stage) {
        var legendEl = stage.querySelector("#hotelGuideLegend");
        if (legendEl && legendEl.parentNode === stage) {
          stage.insertBefore(activities, legendEl.nextSibling);
        } else {
          stage.appendChild(activities);
        }
      } else {
        var wrapFallback = mount.closest(".hotel-complex-map-wrap");
        if (wrapFallback && wrapFallback.parentNode) {
          wrapFallback.parentNode.insertBefore(activities, wrapFallback.nextSibling);
        }
      }
      activities.classList.add("guide-activities--below-map");
      activities.addEventListener("click", function (event) {
        handleGuideClick(event, activities);
      });
    }

    mount.addEventListener("click", function (event) {
      handleGuideClick(event, mount);
    });
    // El menú flotante móvil se reubica fuera del mount para anclarse al mapa;
    // necesita su propio listener delegado.
    if (mobileActions) mobileActions.addEventListener("click", function (event) {
      handleGuideClick(event, mount);
    });

    function handleGuideClick(event, mount) {
      if (event.target.closest("#guideMobileActionsClose")) {
        var mpanel = mobileActionsRoot("#guideMobileActions");
        if (mpanel) mpanel.hidden = true;
        return;
      }
      var activity = event.target.closest("[data-activity-id]");
      if (activity) {
        activateActivity(activity.getAttribute("data-activity-id"));
        return;
      }
      var chip = event.target.closest("[data-guide-filter]");
      if (chip) {
        state.filter = chip.getAttribute("data-guide-filter") || "all";
        mount.querySelectorAll("[data-guide-filter]").forEach(function (el) {
          var isActive = el === chip;
          el.classList.toggle("is-active", isActive);
          el.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        renderList();
        return;
      }
      var cancel = event.target.closest(".guide-route-cancel");
      if (cancel) {
        gp.cancelRoute();
        return;
      }
      var route = event.target.closest(".guide-route");
      if (route) {
        routeToPoi(route.getAttribute("data-id"));
        return;
      }
      var focus = event.target.closest(".guide-focus");
      if (focus) {
        // En móvil ya se ve el mapa: no desplazamos la página al centrar el punto.
        selectPoi(focus.getAttribute("data-id"), { noScroll: isMobileGuide() });
        return;
      }
      var book = event.target.closest(".guide-book");
      if (book) {
        var bookPoi = findPoi(book.getAttribute("data-id"));
        if (bookPoi) {
          if (state.selectedId !== bookPoi.id) selectPoi(bookPoi.id);
          renderBookingPanel(bookPoi, "booking");
        }
        return;
      }
      var cart = event.target.closest(".guide-cart");
      if (cart) {
        var cartPoi = findPoi(cart.getAttribute("data-id"));
        if (cartPoi) {
          if (state.selectedId !== cartPoi.id) selectPoi(cartPoi.id);
          renderBookingPanel(cartPoi, "cart");
        }
        return;
      }
      var item = event.target.closest(".guide-item");
      if (item) selectPoi(item.getAttribute("data-id"));
    }

    mount.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var activity = event.target.closest("[data-activity-id]");
      if (activity) {
        event.preventDefault();
        activateActivity(activity.getAttribute("data-activity-id"));
        return;
      }
      var item = event.target.closest(".guide-item");
      if (item) {
        event.preventDefault();
        selectPoi(item.getAttribute("data-id"));
      }
    });

    renderLegend();
    renderList();
    renderActivities();
    renderDetail(null);
    return { selectPoi: selectPoi, queryPois: queryPois };
  };

  gp.selectPoi = selectPoi;
  gp.requestCartForPoi = function (id) {
    var poi = findPoi(id);
    if (!poi || (poi.category !== "restaurante" && poi.category !== "golf")) return false;
    selectPoi(id, { noScroll: isMobileGuide() });
    renderBookingPanel(poi, "cart");
    return true;
  };
  gp.queryPois = queryPois;
  gp.canMapPoi = canMap;
  gp.renderCategoryLegend = function (mount) {
    if (!mount) return false;
    mount.innerHTML = legendMarkup();
    return true;
  };
})();

