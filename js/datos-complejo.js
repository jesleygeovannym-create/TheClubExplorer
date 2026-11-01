// Datos operativos del complejo Playa Paraíso (Iberostar The Club)
// ------------------------------------------------------------------
// Fuente única de datos oficiales: cartas, horarios, tratamientos,
// paquetes y actividades del día. Actualizado con la información
// verificada del complejo.
//
// Claves de horario disponibles:
//   breakfast  desayuno   lunch  comida   dinner  cena   late  barra nocturna
// ------------------------------------------------------------------
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  const datos = window.RevistaDigital.datosComplejo || {};

  // --- Horarios por tipo de servicio (oficiales) ----------------------------
  const HORARIOS = {
    buffet: {
      breakfast: "07:00 - 10:30",
      lunch: "12:30 - 15:30",
      dinner: "18:30 - 22:00"
    },
    buffet_marina: {
      breakfast: "07:00 - 10:30",
      lunch: "13:00 - 15:00",
      dinner: "18:30 - 22:00"
    },
    especialidad: {
      dinner: "18:30 - 22:00"
    },
    solo_cena: {
      dinner: "18:00 - 22:00"
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
      hours: "08:00 - 20:00"
    },
    golf: {
      hours: "07:00 - atardecer"
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
    "el-colonial": {
      tipo: "especialidad",
      cocina: "Gourmet / Francesa",
      carta: "Bisque de bogavante al coñac · Magret de pato con reducción de frutos rojos · Solomillo de res al vino tinto · Crème brûlée tradicional",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      reservas: true,
      especialidades: "Bisque de bogavante al coñac, magret de pato con reducción de frutos rojos, solomillo de res al vino tinto y crème brûlée tradicional",
      hotel: "Iberostar Paraíso del Mar"
    },
    hashiru: {
      tipo: "solo_cena",
      cocina: "Japonesa & Teppanyaki",
      carta: "Sushi y sashimi · Teppanyaki en vivo · Arroz yakimeshi · Helado frito en tempura",
      horario: "18:00 - 22:00 h",
      vestimenta: "Casual elegante",
      reservas: true,
      especialidades: "Selección de sushi y sashimi, mesas de teppanyaki en vivo (solomillo, pollo teriyaki y camarones), arroz yakimeshi y helado frito en tempura"
    },
    "la-dorada": {
      tipo: "especialidad",
      cocina: "Pescados y Mariscos Mediterráneos",
      carta: "Lubina a la sal marina · Cazuela de mariscos al azafrán · Pulpo a la parrilla sobre puré trufado · Tarta templada de limón",
      horario: "18:30 - 22:00 h",
      vestimenta: "Casual elegante",
      reservas: true,
      especialidades: "Lubina a la sal marina, cazuela de mariscos al azafrán, pulpo a la parrilla sobre puré trufado y tarta tibia de limón"
    },
    rodizio: {
      tipo: "especialidad",
      cocina: "Churrasquería Brasileña",
      carta: "Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas) · Piña asada con canela · Buffet de guarniciones frías y calientes",
      horario: "18:30 - 22:00 h",
      vestimenta: "Casual elegante",
      reservas: true,
      especialidades: "Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas), piña asada con canela y buffet de guarniciones frías y calientes",
      hotel: "Iberostar Paraíso Beach"
    },
    "el-mercado": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Estaciones internacionales · Noces temáticas (española, mexicana, asiática e italiana) · Barra fría · Panadería artesanal · Opciones saludables",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      hotel: "Iberostar Paraíso del Mar"
    },
    "la-plaza": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Estaciones internacionales · Noces temáticas (española, mexicana, asiática e italiana) · Barra fría · Panadería artesanal · Opciones saludables",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      hotel: "Iberostar Paraíso Beach"
    },
    "la-hacienda": {
      tipo: "especialidad",
      cocina: "Tradicional Mexicana",
      carta: "Sopa azteca con queso y aguacate · Cochinita pibil en hoja de plátano · Pollo en mole poblano · Churros tradicionales con cajeta",
      horario: "18:30 - 22:00 h",
      vestimenta: "Casual elegante",
      reservas: true,
      especialidades: "Sopa azteca con queso y aguacate, cochinita pibil en hoja de plátano, pollo en mole poblano y churros tradicionales con cajeta",
      hotel: "Iberostar Paraíso del Mar"
    },
    trattoria: {
      id: "trattoria",
      name: "Trattoria / El Fogón",
      tipo: "especialidad",
      cocina: "Italiana Tradicional & Pizzería",
      cuisine: "Italiana Tradicional & Pizzería",
      carta: "Pizza artesanal al horno de piedra · Lasaña boloñesa al gratín · Linguini ai frutti di mare · Panna cotta de frutos rojos",
      horario: "18:00 - 22:00 h",
      hours: "18:00 - 22:00 h",
      horarioTexto: "18:00 - 22:00 h",
      vestimenta: "Casual elegante",
      dressCode: "Casual elegante",
      reservas: true,
      reservation: true,
      especialidades: "Pizza artesanal al horno de piedra, Lasaña boloñesa al gratín, Linguini ai frutti di mare y Panna cotta de frutos rojos",
      signatureDishes: [
        "Pizza artesanal al horno de piedra",
        "Lasaña boloñesa al gratín",
        "Linguini ai frutti di mare",
        "Panna cotta de frutos rojos"
      ],
      hotel: "Iberostar Waves Paraíso Beach"
    },
    "el-puerto": {
      tipo: "especialidad",
      cocina: "Mariscos y pescados",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Ceviche · Pulpo a la parrilla · Pescado a la veracruzana · Camarones al ajillo · Paella"
    },
    "beach-grill": {
      tipo: "cafeteria",
      cocina: "Grill y snacks",
      dressCode: "Casual",
      reservation: "No requerida",
      hours: "12:00 - 16:00 · 16:00 - 23:00",
      horarioTexto: "Comida 12:00 - 16:00 h · Tarde 16:00 - 23:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Hamburguesas · Hot dogs · Nachos · Ensaladas · Helados"
    },
    burgers: {
      tipo: "cafeteria",
      cocina: "Hamburguesas gourmet",
      dressCode: "Casual",
      reservation: "No requerida",
      hours: "11:00 - 17:00",
      horarioTexto: "11:00 - 17:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Hamburguesa clásica · Hamburguesa de pollo · Hamburguesa vegetariana · Papas fritas · Malteadas"
    },
    "antojitos-tacos": {
      tipo: "cafeteria",
      cocina: "Antojitos mexicanos",
      dressCode: "Casual",
      reservation: "No requerida",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Tacos · Quesadillas · Nachos · Elotes · Churros"
    },
    crepes: {
      tipo: "cafeteria",
      cocina: "Crepas dulces y saladas",
      dressCode: "Casual",
      reservation: "No requerida",
      hours: "11:00 - 22:00",
      horarioTexto: "11:00 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Crepa de Nutella · Crepa de fresa · Crepa de jamón y queso · Waffles · Helados"
    },
    "el-museo": {
      tipo: "especialidad",
      cocina: "Cocina Gourmet",
      carta: "Carpaccio de res con parmesano y rúcula · Filete mignon a las tres pimientas · Lomo de salmón confitado · Fondente de chocolate con helado de vainilla",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      reservas: true,
      especialidades: "Carpaccio de res con parmesano y rúcula, filete mignon a las tres pimientas, lomo de salmón confitado y fondente de chocolate con helado de vainilla",
      hotel: "Iberostar Paraíso Lindo"
    },
    jambalaya: {
      tipo: "solo_cena",
      cocina: "Criolla y Cajún",
      carta: "Arroz jambalaya con mariscos · Costillas glaseadas estilo cajún · Gumbo tradicional · Tarta de nuez pecana",
      horario: "18:00 - 22:00 h",
      vestimenta: "Casual elegante",
      reservas: true,
      especialidades: "Arroz jambalaya con mariscos, costillas glaseadas estilo cajún, gumbo tradicional y tarta de nuez pecana",
      hotel: "Iberostar Paraíso Lindo"
    },
    "la-pagoda": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Estaciones internacionales · Noces temáticas (española, mexicana, asiática e italiana) · Barra fría · Panadería artesanal · Opciones saludables",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      hotel: "Iberostar Paraíso Maya"
    },
    "el-fogon-steak": {
      tipo: "especialidad",
      cocina: "Steakhouse",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Ribeye · New York strip · Filete mignon · Costillas BBQ · Papas al horno"
    },
    "el-fogon-italiano": {
      tipo: "especialidad",
      cocina: "Cocina italiana",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Pizza · Pasta · Risotto · Osso buco · Tiramisú"
    },
    "coco-buffet": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      dressCode: "Casual",
      reservation: "No requerida",
      hours: "07:00 - 10:30 · 12:30 - 15:30 · 18:30 - 22:00",
      horarioTexto: "Desayuno 07:00 - 10:30 h · Comida 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Buffet de desayuno · Comida internacional · Estación de tacos · Grill · Postres"
    },
    "el-rancho": {
      tipo: "especialidad",
      cocina: "Cocina mexicana",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Tacos al pastor · Mole · Cochinita pibil · Quesadillas · Flan"
    },
    "la-geisha": {
      tipo: "especialidad",
      cocina: "Cocina japonesa",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura"
    },
    letoile: {
      tipo: "especialidad",
      cocina: "Cocina francesa",
      dressCode: "Formal",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Grand Paraíso",
      carta: "Foie gras · Magret de pato · Bouillabaisse · Crème brûlée · Vinos franceses"
    },
    "la-marina": {
      tipo: "buffet_marina",
      cocina: "Restaurante Buffet Mediterráneo",
      carta: "Estaciones de cocina en vivo · Paella mediterránea · Pescados frescos del día a la plancha · Barra variada de ensaladas orgánicas",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 13:00 - 15:00 h · Cena 18:30 - 22:00 h",
      vestimenta: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina en vivo, paella mediterránea, pescados frescos del día a la plancha y barra variada de ensaladas orgánicas",
      hotel: "Iberostar Paraíso Maya"
    },
    "el-tapatio": {
      id: "el-tapatio",
      name: "El Tapatío",
      tipo: "especialidad",
      cocina: "Tradicional de Jalisco y el Bajío",
      cuisine: "Tradicional de Jalisco y el Bajío",
      carta: "Tacos de arrachera al comal · Pozole blanco tradicional con guarnición · Enchiladas potosinas artesanales · Buñuelos con miel de piloncillo",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Casual elegante",
      dressCode: "Casual elegante",
      reservas: true,
      reservation: true,
      especialidades: "Tacos de arrachera al comal, Pozole blanco tradicional con guarnición, Enchiladas potosinas artesanales y Buñuelos con miel de piloncillo",
      signatureDishes: [
        "Tacos de arrachera al comal",
        "Pozole blanco tradicional con guarnición",
        "Enchiladas potosinas artesanales",
        "Buñuelos con miel de piloncillo"
      ],
      hotel: "Iberostar Selection Paraíso Maya"
    },
    venecia: {
      tipo: "especialidad",
      cocina: "Italiana Tradicional",
      carta: "Ossobuco alla milanese · Risotto con boletus y aceite de trufa blanca · Raviolis artesanales de ricotta y espinacas · Tiramisú clásico",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      reservas: true,
      especialidades: "Ossobuco alla milanese, risotto con boletus y aceite de trufa blanca, raviolis artesanales de ricotta y espinacas, y tiramisú clásico",
      hotel: "JOIA Paraíso by Iberostar"
    },
    bellavista: {
      tipo: "buffet",
      cocina: "Buffet internacional",
      carta: "Estaciones internacionales · Noces temáticas (española, mexicana, asiática e italiana) · Barra fría · Panadería artesanal · Opciones saludables",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      hotel: "JOIA Paraíso by Iberostar"
    },
    latelier: {
      id: "latelier",
      name: "L'Atelier",
      tipo: "especialidad",
      cocina: "Alta Cocina Francesa de Autor",
      cuisine: "Alta Cocina Francesa de Autor",
      carta: "Foie gras mi-cuit con reducción de oporto · Lenguado Meunière tradicional · Filete Chateaubriand con papas fondant · Soufflé clásico de Grand Marnier",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Foie gras mi-cuit con reducción de oporto, Lenguado Meunière tradicional, Filete Chateaubriand con papas fondant y Soufflé clásico de Grand Marnier",
      signatureDishes: [
        "Foie gras mi-cuit con reducción de oporto",
        "Lenguado Meunière tradicional",
        "Filete Chateaubriand con papas fondant",
        "Soufflé clásico de Grand Marnier"
      ],
      hotel: "JOIA Paraíso by Iberostar"
    },
    tonis: {
      tipo: "especialidad",
      cocina: "Cocina internacional",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Filete · Salmón · Pasta · Ensaladas · Postres"
    },
    haiku: {
      tipo: "especialidad",
      cocina: "Cocina japonesa",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura"
    },
    "la-brisa": {
      tipo: "especialidad",
      cocina: "Cocina mediterránea",
      dressCode: "Casual elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Salmón · Camarones · Pasta · Ensaladas · Postres"
    },
    "baby-kitchen": {
      id: "baby-kitchen",
      name: "Baby Kitchen",
      tipo: "cafeteria",
      cocina: "Área de Preparación Infantil 24h",
      cuisine: "Área de Preparación Infantil 24h",
      carta: "Purés y papillas orgánicas para bebés · Leche entera, deslactosada y vegetal · Fruta fresca seleccionada para triturar · Esterilizadores y microondas de libre uso",
      horario: "Abierto 24 horas",
      hours: "Abierto 24 horas",
      horarioTexto: "Abierto 24 horas",
      vestimenta: "Casual",
      dressCode: "Casual",
      reservas: false,
      reservation: false,
      especialidades: "Purés y papillas orgánicas para bebés, Leche entera, deslactosada y vegetal, Fruta fresca seleccionada para triturar y Esterilizadores y microondas de libre uso",
      signatureDishes: [
        "Purés y papillas orgánicas para bebés",
        "Leche entera, deslactosada y vegetal",
        "Fruta fresca seleccionada para triturar",
        "Esterilizadores y microondas de libre uso"
      ],
      hotel: "Paraíso Maya & Paraíso Lindo"
    },
    "el-rancho-tonis": {
      id: "el-rancho-tonis",
      name: "Toni's / El Rancho Steakhouse",
      tipo: "especialidad",
      cocina: "Cortes Finos al Carbón",
      cuisine: "Cortes Finos al Carbón",
      carta: "Rib Eye a la parrilla de leña · New York Strip con mantequilla de hierbas · Costillas de cerdo glaseadas en salsa BBQ · Pastel tibio de manzana con helado",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Casual elegante",
      dressCode: "Casual elegante",
      reservas: true,
      reservation: true,
      especialidades: "Rib Eye a la parrilla de leña, New York Strip con mantequilla de hierbas, Costillas de cerdo glaseadas en salsa BBQ y Pastel tibio de manzana con helado",
      signatureDishes: [
        "Rib Eye a la parrilla de leña",
        "New York Strip con mantequilla de hierbas",
        "Costillas de cerdo glaseadas en salsa BBQ",
        "Pastel tibio de manzana con helado"
      ],
      hotel: "Iberostar Selection Paraíso Lindo"
    },
    "snack-beach-grill": {
      id: "snack-beach-grill",
      name: "Beach Grill & Tacos",
      tipo: "cafeteria",
      cocina: "Snacks, Tacos al Pastor y Parrilla",
      cuisine: "Snacks, Tacos al Pastor y Parrilla",
      carta: "Tacos al pastor al comal con piña asada · Hamburguesas a la parrilla con papas fritas · Ceviche fresco de pescado al cilantro · Crepas dulces y helados artesanales",
      horario: "11:30 - 17:30 h",
      hours: "11:30 - 17:30 h",
      horarioTexto: "11:30 - 17:30 h",
      vestimenta: "Playero / Casual",
      dressCode: "Playero / Casual",
      reservas: false,
      reservation: false,
      especialidades: "Tacos al pastor al comal con piña asada, Hamburguesas a la parrilla con papas fritas, Ceviche fresco de pescado al cilantro y Crepas dulces y helados artesanales",
      signatureDishes: [
        "Tacos al pastor al comal con piña asada",
        "Hamburguesas a la parrilla con papas fritas",
        "Ceviche fresco de pescado al cilantro",
        "Crepas dulces y helados artesanales"
      ],
      hotel: "Playa Paraíso (Área de Playa y Albercas)"
    },
  };

  // --- Bares ---------------------------------------------------------------
  const BARES = {
    "sports-bar-corner": { tipo: "bar", cocina: "Sports bar", carta: "Antojitos · Hamburguesas · Wings · Cerveza · Snacks" },
    // "heladeria-el-puente" consolidado: es el mismo lugar que "bar-el-puente"
    // "heladeria-el-mirador" consolidado: es el mismo lugar que "lobby-bar-el-mirador" (JOIA)
    "star-rock-cafe": { tipo: "bar_cierre_temprano", cocina: "Café y repostería", carta: "Café de especialidad · Repostería · Bagels · Smoothies" },
    "pool-bar-las-olas": { tipo: "bar", cocina: "Bar de piscina", carta: "Cócteles · Bucket de cerveza · Botella de agua · Snacks" },
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
      name: "Spa Sensations",
      hours: "08:00 - 20:00",
      horarioTexto: "08:00 - 20:00 h",
      hydrotherapyCircuit: [
        "Piscina dinámica de relajación con cascadas, cuellos de cisne y chorros de masaje corporal subacuático",
        "Baño turco de vapor, sauna finlandesa, pozo de agua fría de contraste, pediluvio y zona de descanso con camas térmicas de cerámica"
      ],
      treatments: "Masaje Relajante Aromático (50 / 80 min) · Masaje de Tejido Profundo - Deep Tissue (50 / 80 min) · Ritual Corporal de Sales Marinas y Coco (80 min) · Facial Hidratante Iluminador Post-Solar (50 min)",
      treatmentsList: [
        { name: "Masaje Relajante Aromático", duration: "50 / 80 min", description: "Terapia antiestrés con aceites esenciales botánicos para liberar tensión física" },
        { name: "Masaje de Tejido Profundo - Deep Tissue", duration: "50 / 80 min", description: "Presión moderada a intensa enfocada en contracturas y sobrecarga muscular" },
        { name: "Ritual Corporal de Sales Marinas y Coco", duration: "80 min", description: "Exfoliación regeneradora con sales naturales seguida de envoltura hidratante y masaje relajante" },
        { name: "Facial Hidratante Iluminador Post-Solar", duration: "50 min", description: "Limpieza suave y nutrición antioxidante profunda para pieles expuestas al sol del Caribe" }
      ],
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
      course: "Iberostar Playa Paraíso Golf Club",
      designer: "P.B. Dye (18 hoyos, Par 72)",
      description: "Campo 18 hoyos de campeonato, Par 72, diseñado por P.B. Dye. Trazado integrado en la selva maya con desniveles naturales y greenes de césped Paspalum.",
      hours: "07:00 h al atardecer",
      horarioTexto: "Primer tee time a partir de las 07:00 h hasta el atardecer",
      services: [
        "Campo de prácticas (driving range), putting green y chipping green",
        "Carrito de golf incluido en la ronda y servicio de bebidas/snacks todo incluido durante el recorrido",
        "Renta de bastones de gama alta y tienda Pro Shop con artículos deportivos y prendas oficiales"
      ],
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor"
    },
    piscina: {
      hours: "07:00 - 22:00"
    },
    theclub: {
      hours: "08:00 - 22:00",
      horarioTexto: "08:00 - 22:00",
      amenities: "Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks",
      amenidades: "Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      description: "Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.",
      descripcion: "Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo."
    },
    "star-prestige-lounge": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      description: "Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.",
      descripcion: "Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado."
    },
    "star-prestige-beach-club": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      description: "Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descripcion: "Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido."
    },
    "star-prestige-maya": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      description: "Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.",
      descripcion: "Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia."
    },
    "star-prestige-joia": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      description: "Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descripcion: "Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido."
    }
  };

  // --- Actividades del día -------------------------------------------------
  // Programa diario oficial del complejo.
  const ACTIVIDADES = [
    { hora: "08:30", nombre: "Yoga matutino frente al mar", lugar: "Playa Paraíso", poiId: "playa-mar-caribe", grupo: "Fit & Fun" },
    { hora: "10:30", nombre: "Star Camp: Taller Mini Chef y Huerto", lugar: "Star Camp", poiId: "starcamp", grupo: "Star Camp · Dolphin (8 a 12 años)" },
    { hora: "11:30", nombre: "Aqua Gym y Ritmos Caribeños", lugar: "Piscina Principal", poiId: "activities-pool", grupo: "Fit & Fun" },
    { hora: "15:00", nombre: "Torneo de Vóley de Playa", lugar: "Playa Paraíso", poiId: "playa-mar-caribe", grupo: "Fit & Fun" },
    { hora: "16:30", nombre: "Clínica de Tiro con Arco y Tenis", lugar: "Área Deportiva", poiId: "tennis", grupo: "Fit & Fun" },
    { hora: "20:00", nombre: "Música en Vivo y Coctelería", lugar: "Lobby Bar Acuario", poiId: "lobby-bar-acuario", grupo: "Entretenimiento" },
    { hora: "21:30", nombre: "Espectáculo Nocturno Circense", lugar: "Teatro Coliseo", poiId: "teatro-coliseo", grupo: "Espectáculos Nocturnos" }
  ];

  ACTIVIDADES.forEach(function (item) {
    item.fuente = "oficial";
    item.official = true;
  });

  datos.STAR_CAMP = [
    { rango: "Monkey (4 a 7 años)", actividades: "Manualidades sustentables, juegos en el parque acuático, búsqueda del tesoro y minidisco nocturna" },
    { rango: "Dolphin (8 a 12 años)", actividades: "Talleres culinarios Mini Chef, olimpiadas acuáticas y dinámicas interactivas del programa ambiental Wave of Change" },
    { rango: "Eagle (13 a 17 años)", actividades: "Torneos de videojuegos, vóley de playa, futbol, billar y encuentros con música DJ" }
  ];

  datos.FIT_FUN = [
    "Yoga y pilates matutino frente a la playa",
    "Aqua gym y zumba en la piscina principal",
    "Canchas de tenis, pádel y clínicas de tiro con arco",
    "Espectáculos Nocturnos: Shows diarios en el Teatro Coliseo y Teatro Music Hall a partir de las 21:30 h (producciones musicales, ballet folclórico mexicano y artes circenses)"
  ];

  datos.HORARIOS = HORARIOS;
  datos.RESTAURANTES = RESTAURANTES;
  datos.BARES = BARES;
  datos.SERVICIOS = SERVICIOS;
  datos.ACTIVIDADES = ACTIVIDADES;
  datos.ACTIVIDADES_FUENTE = "oficial";
  datos.ACTIVIDADES_OFICIAL = true;
  datos.ACTIVIDADES_NOTA = "Programa diario oficial del complejo.";
  window.RevistaDigital.datosComplejo = datos;
})();
