// Datos operativos del complejo Playa Paraíso (Iberostar The Club)
// ------------------------------------------------------------------
// Horarios, cartas, tratamientos, paquetes y actividades del día.
// Están listos para funcionar en la web; cuando lleguen los datos reales
// del complejo basta con sustituir el contenido de este archivo.
//
// Claves de horario disponibles:
//   breakfast  desayuno   lunch  comida   dinner  cena   late  barra nocturna
// ------------------------------------------------------------------
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  const datos = window.RevistaDigital.datosComplejo || {};

  // --- Horarios por tipo de servicio -------------------------------------
  const HORARIOS = {
    buffet: {
      breakfast: "07:00 - 11:30",
      lunch: "12:30 - 15:30",
      dinner: "18:30 - 22:00"
    },
    especialidad: {
      lunch: "13:00 - 16:00",
      dinner: "18:30 - 23:00"
    },
    solo_cena: {
      dinner: "18:30 - 23:00"
    },
    cafeteria: {
      breakfast: "07:00 - 11:00",
      lunch: "12:00 - 16:00",
      late: "16:00 - 23:00"
    },
    bar: {
      lunch: "11:00 - 17:00",
      late: "17:00 - 01:00"
    },
    bar_cierre_temprano: {
      lunch: "10:00 - 18:00"
    },
    heladeria: {
      lunch: "11:00 - 22:00"
    },
    spa: {
      hours: "09:00 - 19:00"
    },
    golf: {
      hours: "07:00 - 18:00"
    },
    piscina: {
      hours: "07:00 - 22:00"
    }
  };

  // --- Tipo de servicio por restaurante -----------------------------------
  // tipo: buffet | especialidad | solo_cena | cafeteria
  // cocina: texto mostrado en la ficha
  // carta: menú resumido
  const RESTAURANTES = {
    hashiru: {
      tipo: "solo_cena",
      cocina: "Japonesa",
      carta: "Sushi y sashimi · Udon y ramen · Teppanyaki · Yakitori · Mochi de helado"
    },
    "la-dorada": {
      tipo: "especialidad",
      cocina: "Mediterránea",
      carta: "Hummus y pitá · Ensalada de falafel · Lubina a la espalda · Couscous de verduras · Baklava"
    },
    rodizio: {
      tipo: "especialidad",
      cocina: "Brasileña · Rodizio de carnes",
      carta: "Churrasco de ojo de bife · Costillar de cerdo · Picanha · Saladas brasileiras · Farofa · Pudín de pan"
    },
    "el-mercado": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Zona de entradas frías · Parrilla · Cocina caliente · Panadería · Postres · Selección de jugos"
    },
    "la-plaza": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Estación de cocina china · Taquería · Pasta y pizza · Parrilla · Ensaladas · Postres"
    },
    "la-hacienda": {
      tipo: "especialidad",
      cocina: "Mexicana",
      carta: "Tacos de birria · Enchiladas mole · Carnitas de cerdo · Sopa de tortilla · Churros con cajeta"
    },
    trattoria: {
      tipo: "especialidad",
      cocina: "Italiana",
      carta: "Carpaccio de bresa · Risotto funghi · Lasaña a la boloñesa · Pizza napolitana · Tiramisú"
    },
    "el-puerto": {
      tipo: "especialidad",
      cocina: "Mariscos y pescado",
      carta: "Ceviche de camarón · Tostada de ostión · Pulpo a la parrilla · Pescado zarzuela · Arroz con mariscos"
    },
    "beach-grill": {
      tipo: "especialidad",
      cocina: "Grill de playa",
      carta: "Camarón al ajillo · Ribs de cerdo glaseados · Hamburguesa gourmet · Brochetas mixtas · Ensalada de la casa"
    },
    burgers: {
      tipo: "cafeteria",
      cocina: "Hamburguesas y cortes",
      carta: "Hamburguesa clásica · Cheeseburger · Hamburguesa de pulled pork · Nuggets · Papas · Milkshake"
    },
    "antojitos-tacos": {
      tipo: "cafeteria",
      cocina: "Antojitos mexicanos",
      carta: "Tacos al pastor · Tacos de cochinita · Quesadillas · Elote · Churros · Agua de horchata"
    },
    crepes: {
      tipo: "cafeteria",
      cocina: "Crepas y helados",
      carta: "Crepa de Nutella con fresa · Crepa de pollo con bechamel · Waffles con Chantilly · Helados artesanales · Smoothies"
    },
    "el-museo": {
      tipo: "especialidad",
      cocina: "Gourmet",
      carta: "Foie de pato · Tataki de atún · Ravioli de langosta · Filete de res con puré · Cóctel del chef"
    },
    jambalaya: {
      tipo: "solo_cena",
      cocina: "Cajún y criolla",
      carta: "Gumbo de camarón · Jambalaya de pollo · Etouffé de crawfish · Pechuga con andouille · Bananas Foster"
    },
    "la-pagoda": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Cocina asiática · Wok · Sushi bar · Parrilla · Dim sum · Postres"
    },
    "el-fogon-steak": {
      tipo: "solo_cena",
      cocina: "Steak house",
      carta: "Tbone 600 g · Ribeye 400 g · Filete de bistec a la parrilla · Champiñones al ajillo · Café y té"
    },
    "el-fogon-italiano": {
      tipo: "solo_cena",
      cocina: "Italiana",
      carta: "Bruschetta de tomate · Burrata y prosciutto · Lasaña de carne · Saltimbocca · Vino tinto de la casa"
    },
    "coco-buffet": {
      tipo: "buffet",
      cocina: "Snack buffet",
      carta: "Sándwiches y wraps · Pizza en rebanadas · Helados · Smoothies de fruta · Café y té"
    },
    "el-rancho": {
      tipo: "solo_cena",
      cocina: "Steak house y parrilla",
      carta: "Parrillada para compartir · Ribs de res · Pechuga rellena · Costillar · Flan de la casa"
    },
    "la-geisha": {
      tipo: "solo_cena",
      cocina: "Japonesa",
      carta: "Udon y soba · Sushi de temporada · Tempura · Gyozas · Helado de matcha"
    },
    letoile: {
      tipo: "solo_cena",
      cocina: "Gourmet francesa",
      carta: "Ensalada de temporada · Foie · Filete de ternera con vino tinto · Lubina con verduras · Soufflé de chocolate"
    },
    "la-marina": {
      tipo: "buffet",
      cocina: "Mediterránea y buffet",
      carta: "Mesa de entrantes fríos · Parrilla mediterránea · Paella · Pastelería · Helados"
    },
    "el-tapatio": {
      tipo: "buffet",
      cocina: "Mexicana y buffet",
      carta: "Taquería · Comal y plancha · Cocina mexicana caliente · Salsas y guarniciones · Postres mexicanos"
    },
    venecia: {
      tipo: "especialidad",
      cocina: "Italiana",
      carta: "Caprese · Spaghetti a la boloñesa · Risotto milanesa · Filete a la marsala · Panna cotta"
    },
    bellavista: {
      tipo: "buffet",
      cocina: "Buffet con vista al mar",
      carta: "Desayuno buffet · Comida buffet · Parrilla · Estación de sushi · Postres"
    },
    latelier: {
      tipo: "solo_cena",
      cocina: "Gourmet de autor",
      carta: "Menú de temporada · Ensalada de la casa · Risotto de andouille · Course de pescado · Postre de la casa"
    },
    tonis: {
      tipo: "solo_cena",
      cocina: "Surf & turf",
      carta: "Carpaccio de atún · Steak de atún con costillar · Ribeye · Costillas de cerdo · Salsa de la casa"
    },
    haiku: {
      tipo: "solo_cena",
      cocina: "Japonesa de autor",
      carta: "Sushi omakase de temporada · Ramen de miso · Black cod · Gyozas de cerdo · Matcha"
    },
    "la-brisa": {
      tipo: "solo_cena",
      cocina: "Raw bar y grill",
      carta: "Ostras y almejas · Ceviche · Tartar de atún · Pulpo a la parrilla · Pescado a la brasa"
    },
    "baby-kitchen": {
      tipo: "cafeteria",
      cocina: "Cocina para bebés y niños",
      carta: "Puré de frutas y verduras · Papillas · Mini hamburguesas · Espaguetis · Leche y batidos"
    }
  };

  // --- Bares ---------------------------------------------------------------
  const BARES = {
    "sports-bar-corner": { tipo: "bar", cocina: "Sports bar", carta: "Antojitos · Hamburguesas · Wings · Cerveza · Snacks" },
    // "heladeria-el-puente" consolidado: es el mismo lugar que "bar-el-puente"
    // "heladeria-el-mirador" consolidado: es el mismo lugar que "lobby-bar-el-mirador" (JOIA)
    "star-rock-cafe": { tipo: "bar_cierre_temprano", cocina: "Café y repostería", carta: "Café de especialidad · Repostería · Bagels · Smoothies" },
    "pool-bar-las-olas": { tipo: "bar", cocina: "Bar de piscina", carta: "Cócteles · Bucket de cerveza · Botellade agua · Snacks" },
    "lobby-bar-kukulkan": { tipo: "bar", cocina: "Lobby bar", carta: "Coctelería de autor · Whisky · Aperitivos" },
    "music-bar-rhapsody": { tipo: "bar", cocina: "Music bar", carta: "Coctelería · Cervezas de autor · Snacks · Música en vivo" },
    "lobby-bar-el-mirador": { tipo: "bar", cocina: "Lobby bar", carta: "Coctelería · Vinos tintos · Tabla de quesos" },
    "aqua-bar-la-sirenita": { tipo: "bar", cocina: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks" },
    "health-bar-spa": { tipo: "bar_cierre_temprano", cocina: "Health bar", carta: "Bowls · Zumos prensados · Ensaladas · Infusiones" },
    "aqua-bar-la-perla": { tipo: "bar", cocina: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks" },
    "bar-teatro": { tipo: "bar", cocina: "Bar de teatro", carta: "Aperitivos · Coctelería · Cervezas · Antes de la función" },
    "lobby-bar-la-fuente": { tipo: "bar", cocina: "Lobby bar", carta: "Coctelería de temporada · Aperitivos" },
    "aqua-bar-las-olas": { tipo: "bar", cocina: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks" },
    "lobby-bar-la-cula": { tipo: "bar", cocina: "Lobby bar", carta: "Coctelería de autor · Highballs" },
    "aqua-bar-las-rocas": { tipo: "bar", cocina: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks" },
    "lobby-bar-acuario": { tipo: "bar", cocina: "Lobby bar", carta: "Coctelería · Vinos · Aperitivos" },
    "cigar-bar": { tipo: "bar_cierre_temprano", cocina: "Cigar bar", carta: "Cigarros premium · Whisky y ron añejo · Quesos · Café" }
  };

  // --- Spa, golf y otros servicios ----------------------------------------
  const SERVICIOS = {
    spa: {
      hours: "09:00 - 19:00",
      treatments: "Masaje relajante 60 min · Masaje deportivo 45 min · Tratamiento facial 75 min · Envoltura de algas 90 min · Manicura y pedicura · Servicio para parejas",
      packages: "Paquete Maya Renewal (2 h con desayuno) · Paquete Escape de medio día · Paquete Relax para dos"
    },
    "massage-palapa": {
      hours: "09:00 - 18:00",
      treatments: "Masaje de pies 30 min · Masaje relajante 60 min · Masaje tailandés 90 min",
      packages: "Paquete Palapa para dos · Paquete de Spa de 60 minutos"
    },
    "golf-club-house": {
      hours: "07:00 - 18:00",
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor"
    },
    golf: {
      hours: "07:00 - 18:00",
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor"
    },
    piscina: {
      hours: "07:00 - 22:00"
    }
  };

  // --- Actividades del día -------------------------------------------------
  // poiId: al tocar la actividad se selecciona ese lugar en el mapa.
  const ACTIVIDADES = [
    { hora: "07:00", nombre: "Amanecer en la playa", lugar: "Playa principal", poiId: "playa-mar-caribe" },
    { hora: "07:30", nombre: "Yoga al amanecer", lugar: "Piscina tranquila", poiId: "quiet-pool" },
    { hora: "09:00", nombre: "Desayuno buffet", lugar: "El Mercado", poiId: "el-mercado" },
    { hora: "09:30", nombre: "Aqua gym", lugar: "Piscina de actividades", poiId: "activities-pool" },
    { hora: "10:00", nombre: "Club de kayak", lugar: "Playa principal", poiId: "playa-mar-caribe" },
    { hora: "10:30", nombre: "Clase de cocina mexicana", lugar: "La Hacienda", poiId: "la-hacienda" },
    { hora: "11:00", nombre: "Torneo de tenis", lugar: "Tenis", poiId: "tennis" },
    { hora: "12:00", nombre: "Happy hour en el bar de la piscina", lugar: "Pool Bar Las Olas", poiId: "pool-bar-las-olas" },
    { hora: "12:30", nombre: "Comida buffet", lugar: "La Plaza", poiId: "la-plaza" },
    { hora: "14:00", nombre: "Introducción al buceo", lugar: "Centro de buceo", poiId: "diving-center" },
    { hora: "15:00", nombre: "Torneo de golf", lugar: "Golf Club House", poiId: "golf-club-house" },
    { hora: "16:00", nombre: "Snorkel en el arrecife", lugar: "Playa principal", poiId: "playa-mar-caribe" },
    { hora: "16:30", nombre: "Masaje de pies", lugar: "Palapas de masajes", poiId: "massage-palapa" },
    { hora: "17:00", nombre: "Star Camp: taller de manualidades", lugar: "Star Camp", poiId: "starcamp" },
    { hora: "18:00", nombre: "Circuito de campo de tiro", lugar: "Campo de tiro", poiId: "shooting-area" },
    { hora: "18:30", nombre: "Cena en restaurante de especialidad", lugar: "La Dorada", poiId: "la-dorada" },
    { hora: "20:00", nombre: "Show en vivo", lugar: "Teatro Music Hall", poiId: "teatro-music-hall" },
    { hora: "21:00", nombre: "Noche de música", lugar: "Music Bar Rhapsody", poiId: "music-bar-rhapsody" },
    { hora: "22:30", nombre: "Fiesta en la piscina", lugar: "Aqua Bar La Sirenita", poiId: "aqua-bar-la-sirenita" }
  ];

  datos.HORARIOS = HORARIOS;
  datos.RESTAURANTES = RESTAURANTES;
  datos.BARES = BARES;
  datos.SERVICIOS = SERVICIOS;
  datos.ACTIVIDADES = ACTIVIDADES;
  window.RevistaDigital.datosComplejo = datos;
})();
