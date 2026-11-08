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
      cuisine: "Gourmet / French",
      carta: "Bisque de bogavante al coñac · Magret de pato con reducción de frutos rojos · Solomillo de res al vino tinto · Crème brûlée tradicional",
      menu: "Lobster bisque with cognac · Duck magret with red fruit sauce · Beef tenderloin in red wine · Traditional crème brûlée",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegant",
      reservas: true,
      especialidades: "Bisque de bogavante al coñac, magret de pato con reducción de frutos rojos, solomillo de res al vino tinto y crème brûlée tradicional",
      specialties: "Lobster bisque with cognac, duck magret with red fruit sauce, beef tenderloin in red wine and traditional crème brûlée",
      hotel: "Iberostar Paraíso del Mar"
    },
    hashiru: {
      tipo: "solo_cena",
      cocina: "Japonesa & Teppanyaki",
      cuisine: "Japanese & Teppanyaki",
      carta: "Sushi y sashimi · Teppanyaki en vivo · Arroz yakimeshi · Helado frito en tempura",
      menu: "Sushi and sashimi · Live teppanyaki · Yakimeshi rice · Tempura fried ice cream",
      horario: "18:00 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Selección de sushi y sashimi, mesas de teppanyaki en vivo (solomillo, pollo teriyaki y camarones), arroz yakimeshi y helado frito en tempura",
      specialties: "Sushi and sashimi selection, live teppanyaki tables (tenderloin, teriyaki chicken and shrimp), yakimeshi rice and tempura fried ice cream"
    },
    "la-dorada": {
      tipo: "especialidad",
      cocina: "Pescados y Mariscos Mediterráneos",
      cuisine: "Mediterranean Fish and Seafood",
      carta: "Lubina a la sal marina · Cazuela de mariscos al azafrán · Pulpo a la parrilla sobre puré trufado · Tarta templada de limón",
      menu: "Sea bass in sea salt · Seafood casserole with saffron · Grilled octopus on truffle purée · Warm lemon tart",
      horario: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Lubina a la sal marina, cazuela de mariscos al azafrán, pulpo a la parrilla sobre puré trufado y tarta tibia de limón",
      specialties: "Sea bass in sea salt, saffron seafood casserole, grilled octopus on truffle purée and warm lemon tart"
    },
    rodizio: {
      tipo: "especialidad",
      cocina: "Churrasquería Brasileña",
      cuisine: "Brazilian Steakhouse",
      carta: "Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas) · Piña asada con canela · Buffet de guarniciones frías y calientes",
      menu: "Charcoal-grilled select cuts skewers (picanha, flank, skirt and ribs) · Cinnamon-roasted pineapple · Cold and hot side buffet",
      horario: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas), piña asada con canela y buffet de guarniciones frías y calientes",
      specialties: "Charcoal-grilled select cut skewers (picanha, flank, skirt and ribs), cinnamon-roasted pineapple and cold/hot side buffet",
      hotel: "Iberostar Paraíso Beach"
    },
    "el-mercado": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "Iberostar Paraíso del Mar"
    },
    "la-plaza": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "Iberostar Paraíso Beach"
    },
    "la-hacienda": {
      tipo: "especialidad",
      cocina: "Tradicional Mexicana",
      cuisine: "Traditional Mexican",
      carta: "Sopa azteca con queso y aguacate · Cochinita pibil en hoja de plátano · Pollo en mole poblano · Churros tradicionales con cajeta",
      menu: "Aztec soup with cheese and avocado · Cochinita pibil in banana leaf · Chicken in poblano mole · Traditional churros with cajeta",
      horario: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Sopa azteca con queso y aguacate, cochinita pibil en hoja de plátano, pollo en mole poblano y churros tradicionales con cajeta",
      specialties: "Aztec soup with cheese and avocado, cochinita pibil in banana leaf, chicken in poblano mole and traditional churros with cajeta",
      hotel: "Iberostar Paraíso del Mar"
    },
    trattoria: {
      id: "trattoria",
      name: "Trattoria / El Fogón",
      tipo: "especialidad",
      cocina: "Italiana Tradicional & Pizzería",
      cuisine: "Traditional Italian & Pizzeria",
      carta: "Pizza artesanal al horno de piedra · Lasaña boloñesa al gratín · Linguini ai frutti di mare · Panna cotta de frutos rojos",
      menu: "Stone-oven artisan pizza · Bolognese lasagna au gratin · Linguini ai frutti di mare · Red fruit panna cotta",
      horario: "18:00 - 22:00 h",
      hours: "18:00 - 22:00 h",
      horarioTexto: "18:00 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Informal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Pizza artesanal al horno de piedra, Lasaña boloñesa al gratín, Linguini ai frutti di mare y Panna cotta de frutos rojos",
      specialties: "Stone-oven artisan pizza, Bolognese lasagna au gratin, Linguini ai frutti di mare and Red fruit panna cotta",
      signatureDishes: [
        "Pizza artesanal al horno de piedra",
        "Lasaña boloñesa al gratín",
        "Linguini ai frutti di mare",
        "Panna cotta de frutos rojos"
      ],
      hotel: "Iberostar Paraíso Beach"
    },
    "el-puerto": {
      tipo: "especialidad",
      cocina: "Mariscos y pescados",
      cuisine: "Seafood and fish",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Ceviche · Pulpo a la parrilla · Pescado a la veracruzana · Camarones al ajillo · Paella",
      menu: "Ceviche · Grilled octopus · Veracruz-style fish · Garlic shrimp · Paella"
    },
    "beach-grill": {
      tipo: "cafeteria",
      cocina: "Grill y snacks",
      cuisine: "Grill and snacks",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "12:00 - 16:00 · 16:00 - 23:00",
      horarioTexto: "Comida 12:00 - 16:00 h · Tarde 16:00 - 23:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Hamburguesas · Hot dogs · Nachos · Ensaladas · Helados",
      menu: "Burgers · Hot dogs · Nachos · Salads · Ice cream"
    },
    burgers: {
      tipo: "cafeteria",
      cocina: "Hamburguesas gourmet",
      cuisine: "Gourmet burgers",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:00 - 17:00",
      horarioTexto: "11:00 - 17:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Hamburguesa clásica · Hamburguesa de pollo · Hamburguesa vegetariana · Papas fritas · Malteadas",
      menu: "Classic burger · Chicken burger · Vegetarian burger · French fries · Milkshakes"
    },
    "antojitos-tacos": {
      tipo: "cafeteria",
      cocina: "Antojitos mexicanos",
      cuisine: "Mexican snacks",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Tacos · Quesadillas · Nachos · Elotes · Churros",
      menu: "Tacos · Quesadillas · Nachos · Corn on the cob · Churros"
    },
    crepes: {
      tipo: "cafeteria",
      cocina: "Crepas dulces y saladas",
      cuisine: "Sweet and savory crepes",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:00 - 22:00",
      horarioTexto: "11:00 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Crepa de Nutella · Crepa de fresa · Crepa de jamón y queso · Waffles · Helados",
      menu: "Nutella crepe · Strawberry crepe · Ham and cheese crepe · Waffles · Ice cream"
    },
    "heladeria-el-puente": {
      tipo: "cafeteria",
      cocina: "Heladería y snacks",
      cuisine: "Ice cream parlor and snacks",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:00 - 18:00",
      horarioTexto: "11:00 - 18:00 h",
      hotel: "Iberostar Paraíso del Mar",
      carta: "Helados artesanales variados, paletas, crepas dulces y café.",
      menu: "Assorted artisan ice cream, popsicles, sweet crepes and coffee.",
      especialidades: "Helados artesanales variados, paletas, crepas dulces y café.",
      specialties: "Assorted artisan ice cream, popsicles, sweet crepes and coffee."
    },
    "el-museo": {
      tipo: "especialidad",
      cocina: "Cocina italiana",
      cuisine: "Italian cuisine",
      carta: "Carpaccio de res con parmesano y rúcula · Filete mignon a las tres pimientas · Lomo de salmón confitado · Fondente de chocolate con helado de vainilla",
      menu: "Beef carpaccio with parmesan and arugula · Peppercorn filet mignon · Confit salmon loin · Chocolate fondant with vanilla ice cream",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegant",
      reservas: true,
      especialidades: "Carpaccio de res con parmesano y rúcula, filete mignon a las tres pimientas, lomo de salmón confitado y fondente de chocolate con helado de vainilla",
      specialties: "Beef carpaccio with parmesan and arugula, peppercorn filet mignon, confit salmon loin and chocolate fondant with vanilla ice cream",
      hotel: "Iberostar Paraíso Lindo"
    },
    jambalaya: {
      tipo: "solo_cena",
      cocina: "Criolla y Cajún",
      cuisine: "Creole and Cajun",
      carta: "Arroz jambalaya con mariscos · Costillas glaseadas estilo cajún · Gumbo tradicional · Tarta de nuez pecana",
      menu: "Seafood jambalaya rice · Cajun-style glazed ribs · Traditional gumbo · Pecan pie",
      horario: "18:00 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Arroz jambalaya con mariscos, costillas glaseadas estilo cajún, gumbo tradicional y tarta de nuez pecana",
      specialties: "Seafood jambalaya rice, Cajun-style glazed ribs, traditional gumbo and pecan pie",
      hotel: "Iberostar Paraíso Lindo"
    },
    "la-pagoda": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "Iberostar Paraíso Maya"
    },
    "el-fogon-steak": {
      tipo: "especialidad",
      cocina: "Steakhouse",
      cuisine: "Steakhouse",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Ribeye · New York strip · Filete mignon · Costillas BBQ · Papas al horno",
      menu: "Ribeye · New York strip · Filet mignon · BBQ ribs · Oven-baked potatoes"
    },
    "el-fogon-italiano": {
      tipo: "especialidad",
      cocina: "Cocina italiana",
      cuisine: "Italian cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Pizza · Pasta · Risotto · Osso buco · Tiramisú",
      menu: "Pizza · Pasta · Risotto · Osso buco · Tiramisú"
    },
    "coco-buffet": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "07:00 - 10:30 · 12:30 - 15:30 · 18:30 - 22:00",
      horarioTexto: "Desayuno 07:00 - 10:30 h · Comida 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Buffet de desayuno · Comida internacional · Estación de tacos · Grill · Postres",
      menu: "Breakfast buffet · International food · Taco station · Grill · Desserts"
    },
    "el-rancho": {
      tipo: "especialidad",
      cocina: "Steakhouse & Carnes",
      cuisine: "Steakhouse & Meats",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Selección de cortes a la parrilla de leña (rib eye, new york strip, solomillo y costillas glaseadas), con guarniciones clásicas de papas al horno rellenas de crema agria y tocino, vegetales a la parrilla con mantequilla de ajo y tarta tibia de manzana con helado de vainilla.",
      menu: "Wood-grilled cuts selection (rib eye, new york strip, tenderloin and glazed ribs), with classic sides of baked potatoes stuffed with sour cream and bacon, grilled vegetables with garlic butter and warm apple tart with vanilla ice cream.",
      especialidades: "Selección de cortes a la parrilla de leña (rib eye, new york strip, solomillo y costillas glaseadas), con guarniciones clásicas de papas al horno rellenas de crema agria y tocino, vegetales a la parrilla con mantequilla de ajo y tarta tibia de manzana con helado de vainilla.",
      specialties: "Wood-grilled cuts selection (rib eye, new york strip, tenderloin and glazed ribs), with classic sides of baked potatoes stuffed with sour cream and bacon, grilled vegetables with garlic butter and warm apple tart with vanilla ice cream.",
      signatureDishes: [
        "Rib eye",
        "New york strip",
        "Solomillo",
        "Costillas glaseadas",
        "Tarta tibia de manzana con helado de vainilla"
      ]
    },
    "palapa-marina": {
      tipo: "cafeteria",
      cocina: "Snack & Almuerzo Grill",
      cuisine: "Snack and Lunch Grill",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:30 - 17:00",
      horarioTexto: "11:30 - 17:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Servicio informal bajo palapa junto a la alberca central: hamburguesas al carbón, cortes ligeros, tacos de pescado estilo Baja, nachos con queso y guacamole fresco, ensaladas mixtas y fruta tropical recién cortada.",
      menu: "Informal poolside palapa service: charcoal burgers, light cuts, Baja-style fish tacos, cheese nachos and fresh guacamole, mixed salads and freshly cut tropical fruit.",
      especialidades: "Hamburguesas al carbón, cortes ligeros, tacos de pescado estilo Baja, nachos con queso y guacamole fresco, ensaladas mixtas y fruta tropical recién cortada.",
      specialties: "Charcoal burgers, light cuts, Baja-style fish tacos, cheese nachos and fresh guacamole, mixed salads and freshly cut tropical fruit.",
      signatureDishes: [
        "Hamburguesas al carbón",
        "Tacos de pescado estilo Baja",
        "Nachos con queso y guacamole fresco",
        "Fruta tropical recién cortada"
      ]
    },
    "la-geisha": {
      tipo: "especialidad",
      cocina: "Japonés Tradicional y Teppanyaki",
      cuisine: "Traditional Japanese and Teppanyaki",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 21:30",
      horarioTexto: "18:30 - 21:30 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Rollos de sushi contemporáneos, sashimi de pesca sustentable y sopa miso, seguidos del espectáculo frente a la plancha teppan con arroz frito yakimeshi, verduras salteadas y mezcla de mar y tierra (camarones, res o salmón en salsa teriyaki casera).",
      menu: "Contemporary sushi rolls, sustainable fishing sashimi and miso soup, followed by the teppan plancha show cooking with yakimeshi fried rice, sautéed vegetables and surf and turf mix (shrimp, beef or salmon in homemade teriyaki sauce).",
      especialidades: "Rollos de sushi contemporáneos, sashimi de pesca sustentable y sopa miso, seguidos del espectáculo frente a la plancha teppan con arroz frito yakimeshi, verduras salteadas y mezcla de mar y tierra (camarones, res o salmón en salsa teriyaki casera).",
      specialties: "Contemporary sushi rolls, sustainable fishing sashimi and miso soup, followed by the teppan plancha show cooking with yakimeshi fried rice, sautéed vegetables and surf and turf mix (shrimp, beef or salmon in homemade teriyaki sauce).",
      signatureDishes: [
        "Rollos de sushi contemporáneos",
        "Sashimi de pesca sustentable",
        "Sopa miso",
        "Arroz frito yakimeshi",
        "Mezcla de mar y tierra en salsa teriyaki"
      ]
    },
    letoile: {
      tipo: "especialidad",
      cocina: "Gourmet Francés",
      cuisine: "French Gourmet",
      dressCode: "Formal",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Propuesta clásica de alta cocina gala. Destacan la sopa de cebolla gratinada con queso emmental, terrinas de ave, magret de pato con reducción de frutos rojos, filete mignon en salsa bordelesa y postres de autor como suflé caliente o milhojas de vainilla de Papantla.",
      menu: "Classic French haute cuisine proposal. Highlights include gratinated onion soup with emmental cheese, poultry terrines, duck magret with red fruit sauce, filet mignon in bordelaise sauce and signature desserts such as hot soufflé or Papantla vanilla mille-feuille.",
      especialidades: "Sopa de cebolla gratinada con queso emmental, terrinas de ave, magret de pato con reducción de frutos rojos, filete mignon en salsa bordelesa y postres de autor como suflé caliente o milhojas de vainilla de Papantla.",
      specialties: "Gratinated onion soup with emmental cheese, poultry terrines, duck magret with red fruit sauce, filet mignon in bordelaise sauce and signature desserts such as hot soufflé or Papantla vanilla mille-feuille.",
      signatureDishes: [
        "Sopa de cebolla gratinada con queso emmental",
        "Terrinas de ave",
        "Magret de pato con reducción de frutos rojos",
        "Filete mignon en salsa bordelesa",
        "Suflé caliente",
        "Milhojas de vainilla de Papantla"
      ]
    },
    "la-marina": {
      tipo: "buffet",
      cocina: "Buffet Principal",
      cuisine: "Main Buffet",
      carta: "Estaciones de cocina en vivo (show cooking), mesa fría de quesos internacionales y charcutería, barras de mariscos y ceviches al mediodía, cortes a la plancha al momento, pastas artesanales y área especial con opciones infantiles y vegetarianas.",
      menu: "Live cooking stations, international cheese and charcuterie table, seafood and ceviche bars at midday, grilled cuts to order, artisan pastas and special area with children's and vegetarian options.",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      horarioTexto: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina en vivo (show cooking), mesa fría de quesos internacionales y charcutería, barras de mariscos y ceviches, cortes a la plancha al momento, pastas artesanales y opciones infantiles y vegetarianas.",
      specialties: "Live cooking stations, international cheese and charcuterie table, seafood and ceviche bars, grilled cuts to order, artisan pastas and children's and vegetarian options.",
      hotel: "Iberostar Paraíso Maya"
    },
    "el-tapatio": {
      id: "el-tapatio",
      name: "El Tapatío",
      tipo: "especialidad",
      cocina: "Tradicional de Jalisco y el Bajío",
      cuisine: "Traditional from Jalisco and Bajío",
      carta: "Tacos de arrachera al comal · Pozole blanco tradicional con guarnición · Enchiladas potosinas artesanales · Buñuelos con miel de piloncillo",
      menu: "Skirt steak tacos on comal · Traditional white pozole with garnish · Artisan potosinas enchiladas · Piloncillo honey buñuelos",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Informal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Tacos de arrachera al comal, Pozole blanco tradicional con guarnición, Enchiladas potosinas artesanales y Buñuelos con miel de piloncillo",
      specialties: "Comal skirt steak tacos, traditional white pozole with garnish, artisan potosinas enchiladas and piloncillo honey buñuelos",
      signatureDishes: [
        "Tacos de arrachera al comal",
        "Pozole blanco tradicional con guarnición",
        "Enchiladas potosinas artesanales",
        "Buñuelos con miel de piloncillo"
      ],
      hotel: "Iberostar Paraíso Maya"
    },
    venecia: {
      tipo: "especialidad",
      cocina: "Italiana Tradicional",
      cuisine: "Traditional Italian",
      carta: "Ossobuco alla milanese · Risotto con boletus y aceite de trufa blanca · Raviolis artesanales de ricotta y espinacas · Tiramisú clásico",
      menu: "Milanese ossobuco · Porcini and white truffle oil risotto · Artisan ricotta and spinach ravioli · Classic tiramisu",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegant",
      reservas: true,
      especialidades: "Ossobuco alla milanese, risotto con boletus y aceite de trufa blanca, raviolis artesanales de ricotta y espinacas, y tiramisú clásico",
      specialties: "Milanese ossobuco, porcini and white truffle oil risotto, artisan ricotta and spinach ravioli and classic tiramisu",
      hotel: "JOIA Paraíso by Iberostar"
    },
    bellavista: {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "JOIA Paraíso by Iberostar"
    },
    latelier: {
      id: "latelier",
      name: "L'Atelier",
      tipo: "especialidad",
      cocina: "Alta Cocina Francesa de Autor",
      cuisine: "Signature French Haute Cuisine",
      carta: "Foie gras mi-cuit con reducción de oporto · Lenguado Meunière tradicional · Filete Chateaubriand con papas fondant · Soufflé clásico de Grand Marnier",
      menu: "Mi-cuit foie gras with port reduction · Traditional Meunière sole · Chateaubriand fillet with fondant potatoes · Classic Grand Marnier soufflé",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Foie gras mi-cuit con reducción de oporto, Lenguado Meunière tradicional, Filete Chateaubriand con papas fondant y Soufflé clásico de Grand Marnier",
      specialties: "Mi-cuit foie gras with port reduction, traditional Meunière sole, Chateaubriand fillet with fondant potatoes and classic Grand Marnier soufflé",
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
      cuisine: "International cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Filete · Salmón · Pasta · Ensaladas · Postres",
      menu: "Fillet · Salmon · Pasta · Salads · Desserts"
    },
    haiku: {
      tipo: "especialidad",
      cocina: "Cocina japonesa",
      cuisine: "Japanese cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura",
      menu: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura"
    },
    "la-brisa": {
      tipo: "bar",
      cocina: "Bar de Playa",
      cuisine: "Beach Bar",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso JOIA",
      carta: "Cervezas frías y refrescos junto a la arena; snacks de playa: hamburguesas, hot dogs, nachos con queso, papas a la francesa, tacos del día o ceviches ligeros.",
      menu: "Cold beers and soft drinks by the sand; beach snacks: burgers, hot dogs, cheese nachos, french fries, tacos of the day or light ceviches."
    },
    "baby-kitchen": {
      id: "baby-kitchen",
      name: "Baby Kitchen",
      tipo: "cafeteria",
      cocina: "Área de Preparación Infantil 24h",
      cuisine: "24h Infant Food Prep Area",
      carta: "Purés y papillas orgánicas para bebés · Leche entera, deslactosada y vegetal · Fruta fresca seleccionada para triturar · Esterilizadores y microondas de libre uso",
      menu: "Organic purees and porridges for babies · Whole, lactose-free and plant-based milk · Fresh selected fruit for crushing · Sterilizers and microwaves for free use",
      horario: "Abierto 24 horas",
      hours: "Open 24 hours",
      horarioTexto: "Abierto 24 horas",
      vestimenta: "Informal",
      dressCode: "Informal",
      reservas: false,
      reservation: false,
      especialidades: "Purés y papillas orgánicas para bebés, Leche entera, deslactosada y vegetal, Fruta fresca seleccionada para triturar y Esterilizadores y microondas de libre uso",
      specialties: "Organic purees and porridges for babies, whole/lactose-free/plant-based milk, fresh selected fruit for crushing and sterilizers/microwaves for free use",
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
      name: "El Rancho",
      tipo: "especialidad",
      cocina: "Steak House",
      cuisine: "Steak House",
      carta: "Cortes premium · Ribeye · T-Bone · Costillas · Entradas tradicionales",
      menu: "Premium cuts · Ribeye · T-Bone · Ribs · Traditional starters",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Informal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Cortes premium, Ribeye, T-Bone, costillas y entradas tradicionales",
      specialties: "Premium cuts, Ribeye, T-Bone, ribs and traditional starters",
      signatureDishes: [
        "Cortes premium",
        "Ribeye",
        "T-Bone",
        "Costillas"
      ],
      hotel: "Iberostar Selection Paraíso Lindo"
    },
    "snack-beach-grill": {
      id: "snack-beach-grill",
      name: "Beach Grill & Tacos",
      tipo: "cafeteria",
      cocina: "Snacks, Tacos al Pastor y Parrilla",
      cuisine: "Snacks, Al Pastor Tacos and Grill",
      carta: "Tacos al pastor al comal con piña asada · Hamburguesas a la parrilla con papas fritas · Ceviche fresco de pescado al cilantro · Crepas dulces y helados artesanales",
      menu: "Comal al pastor tacos with grilled pineapple · Grilled burgers with french fries · Fresh cilantro fish ceviche · Sweet crepes and artisan ice cream",
      horario: "11:30 - 17:30 h",
      hours: "11:30 - 17:30 h",
      horarioTexto: "11:30 - 17:30 h",
      vestimenta: "Playero / Informal",
      dressCode: "Playero / Informal",
      reservas: false,
      reservation: false,
      especialidades: "Tacos al pastor al comal con piña asada, Hamburguesas a la parrilla con papas fritas, Ceviche fresco de pescado al cilantro y Crepas dulces y helados artesanales",
      specialties: "Comal al pastor tacos with grilled pineapple, grilled burgers with french fries, fresh cilantro fish ceviche and sweet crepes with artisan ice cream",
      signatureDishes: [
        "Tacos al pastor al comal con piña asada",
        "Hamburguesas a la parrilla con papas fritas",
        "Ceviche fresco de pescado al cilantro",
        "Crepas dulces y helados artesanales"
      ],
      hotel: "Playa Paraíso (Área de Playa y Albercas)"
    },
    "el-kiosko": {
      tipo: "cafeteria",
      cocina: "Beach Snack & Grill",
      cuisine: "Beach Snack and Grill",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso del Mar",
      carta: "Nachos con queso fundido y jalapeños · Guacamole fresco · Hot dogs · Tacos al pastor · Fruta cortada.",
      menu: "Nachos with melted cheese and jalapeños · Fresh guacamole · Hot dogs · Al pastor tacos · Cut fruit.",
      especialidades: "Nachos con queso fundido y jalapeños, guacamole fresco, hot dogs, tacos al pastor y fruta cortada.",
      specialties: "Nachos with melted cheese and jalapeños, fresh guacamole, hot dogs, al pastor tacos and cut fruit."
    },
    "olivetti": {
      tipo: "especialidad",
      cocina: "Restaurante Italiano",
      cuisine: "Italian Restaurant",
      dressCode: "Smart Casual",
      reservation: "Requerida",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Entrantes / Antipasti: Carpaccio de res con virutas de parmesano y vinagreta balsámica, ensalada caprese con mozzarella fresca de búfala y jitomate bola, bruschettas al pomodoro con albahaca. Pastas y Risottos: Lasaña clásica boloñesa al horno, ravioles rellenos de queso ricota y espinaca en salsa de mantequilla con salvia, fettuccine a los cuatro quesos o frutos del mar, risotto de setas y hongos silvestres. Platos Fuertes: Escalopines de ternera al marsala, pechuga de pollo a la parmesana con costra crocante y pescado blanco en salsa ligera de alcaparras y vino blanco. Postres: Tiramisú tradicional al café con queso mascarpone, panna cotta de frutos rojos y cannoli sicilianos.",
      menu: "Appetizers / Antipasti: Beef carpaccio with parmesan shavings and balsamic vinaigrette, caprese salad with fresh buffalo mozzarella and bola tomato, pomodoro bruschettas with basil. Pastas and Risottos: Classic baked bolognese lasagna, ricotta and spinach ravioli in butter and sage sauce, four-cheese or seafood fettuccine, wild mushroom risotto. Main Courses: Marsala veal scaloppini, parmesan-crusted chicken breast and white fish in light caper and white wine sauce. Desserts: Traditional coffee tiramisu with mascarpone, red fruit panna cotta and Sicilian cannoli.",
      especialidades: "Carpaccio de res con virutas de parmesano, ensalada caprese, bruschettas al pomodoro, lasaña boloñesa, ravioles de ricota y espinaca, fettuccine, risotto de setas, escalopines al marsala, pollo a la parmesana, pescado blanco, tiramisú, panna cotta, cannoli sicilianos.",
      specialties: "Beef carpaccio with parmesan shavings, caprese salad, pomodoro bruschettas, baked bolognese lasagna, ricotta and spinach ravioli, fettuccine, wild mushroom risotto, marsala veal scaloppini, parmesan chicken breast, white fish with caper and white wine sauce, coffee tiramisu, red fruit panna cotta, Sicilian cannoli.",
      signatureDishes: [
        "Carpaccio de res con virutas de parmesano",
        "Ensalada caprese",
        "Lasaña clásica boloñesa",
        "Ravioles de queso ricota y espinaca",
        "Risotto de setas y hongos silvestres",
        "Escalopines de ternera al marsala",
        "Tiramisú tradicional al café",
        "Cannoli sicilianos"
      ]
    },
    "lemon-spices": {
      tipo: "especialidad",
      cocina: "Internacional / Mediterráneo de Especialidad",
      cuisine: "International / Mediterranean Specialty",
      dressCode: "Smart Casual",
      reservation: "Requerida",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Entrantes: Selección de tapas y mezze mediterráneo (hummus con pan pita, aceitunas marinadas), ensalada griega con queso feta y aderezo de limón con orégano, crema ligera de espárragos y hierbas frescas. Platos Fuertes: Filete de pescado fresco sellado al sartén marinado con emulsión de limón amarillo, hierbas y alcaparras; cordero asado con costra de especias dulces y romero; pechuga de pollo confitada con toques de romero, ajo y reducción cítrica; opciones vegetarianas con verduras rostizadas al grill y cuscús aromático. Postres: Mousse ligera de limón con merengue flameado, tarta de higos o tartaleta de manzana especiada con canela.",
      menu: "Appetizers: Mediterranean tapas and mezze selection (hummus with pita bread, marinated olives), Greek salad with feta cheese and lemon-oregano dressing, light asparagus and fresh herbs cream. Main Courses: Seared fresh fish fillet marinated with yellow lemon emulsion, herbs and capers; roasted lamb with sweet spice crust and rosemary; confit chicken breast with rosemary, garlic and citrus reduction; vegetarian options with grilled vegetables and aromatic couscous. Desserts: Light lemon mousse with flamed meringue, fig tart or cinnamon-spiced apple tartlet.",
      especialidades: "Tapas y mezze mediterráneo, hummus con pan pita, ensalada griega con queso feta, crema de espárragos, filete de pescado fresco, cordero asado con especias dulces y romero, pollo confitado, verduras rostizadas al grill, cuscús aromático, mousse de limón con merengue flameado, tarta de higos, tartaleta de manzana especiada.",
      specialties: "Mediterranean tapas and mezze, hummus with pita bread, Greek salad with feta cheese, asparagus cream, seared fresh fish fillet, roasted lamb with sweet spice crust and rosemary, confit chicken breast, grilled vegetables, aromatic couscous, light lemon mousse with flamed meringue, fig tart, cinnamon-spiced apple tartlet.",
      signatureDishes: [
        "Hummus con pan pita",
        "Ensalada griega con queso feta",
        "Filete de pescado fresco con emulsión de limón amarillo",
        "Cordero asado con costra de especias dulces y romero",
        "Pechuga de pollo confitada",
        "Mousse ligera de limón con merengue flameado",
        "Tarta de higos",
        "Tartaleta de manzana especiada con canela"
      ]
    },
    "under-the-sea": {
      tipo: "especialidad",
      cocina: "Especialidad de Mariscos",
      cuisine: "Seafood Specialty",
      dressCode: "Smart Casual",
      reservation: "Requerida",
      hours: "18:00 - 22:00",
      horarioTexto: "18:00 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Entrantes y Sopas: Cóctel clásico de camarón en salsa coctelera casera, ceviche mixto de pescado blanco y calamar marinado con lima, sopa espesa de almejas y mariscos (clam chowder). Platos Fuertes: Filete de salmón sellado a la parrilla sobre cama de vegetales al vapor, brochetas de camarones jumbo marinados con ajo y pimentón, parrillada mixta de mariscos (pesca del día, calamar y mejillones), lomo de res con cola de langosta/camarones (estilo surf and turf). Menú Infantil: Dedos de pescado crujientes con papas a la francesa, pasta con mantequilla o salsa de tomate. Postres: Tarta de queso americana con coulis de frambuesa, helados tropicales y pastel de chocolate cremoso.",
      menu: "Starters and Soups: Classic shrimp cocktail with homemade cocktail sauce, mixed ceviche of white fish and squid marinated with lime, thick clam and seafood chowder soup. Main Courses: Grilled seared salmon fillet over steamed vegetables, jumbo shrimp skewers marinated with garlic and paprika, mixed seafood grill (catch of the day, squid and mussels), beef tenderloin with lobster tail/shrimp (surf and turf style). Kids Menu: Crispy fish fingers with french fries, pasta with butter or tomato sauce. Desserts: American cheesecake with raspberry coulis, tropical ice creams and creamy chocolate cake.",
      especialidades: "Cóctel clásico de camarón, ceviche mixto de pescado blanco y calamar, sopa espesa de almejas y mariscos, filete de salmón a la parrilla, brochetas de camarones jumbo, parrillada mixta de mariscos, lomo de res con cola de langosta, dedos de pescado crujientes, pasta con mantequilla, tarta de queso americana con coulis de frambuesa, helados tropicales, pastel de chocolate cremoso.",
      specialties: "Classic shrimp cocktail, mixed ceviche of white fish and squid, thick clam and seafood chowder, grilled seared salmon fillet, jumbo shrimp skewers, mixed seafood grill, beef tenderloin with lobster tail (surf and turf), crispy fish fingers, pasta with butter or tomato sauce, American cheesecake with raspberry coulis, tropical ice creams, creamy chocolate cake.",
      signatureDishes: [
        "Cóctel clásico de camarón",
        "Ceviche mixto de pescado blanco y calamar",
        "Sopa espesa de almejas y mariscos",
        "Filete de salmón sellado a la parrilla",
        "Brochetas de camarones jumbo",
        "Parrillada mixta de mariscos",
        "Lomo de res con cola de langosta",
        "Tarta de queso americana con coulis de frambuesa"
      ]
    },
    "buffet-la-marina": {
      tipo: "buffet",
      cocina: "Buffet Principal",
      cuisine: "Main Buffet",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "07:00 - 10:30 · 12:30 - 15:30 · 18:30 - 22:00",
      horarioTexto: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Desayuno: Huevos y omelettes preparados al momento al gusto, hot cakes, waffles, estación de chilaquiles, embutidos y quesos variados, fruta tropical cortada, jugos naturales y panadería dulce recién horneada. Almuerzo y Cena: Estaciones de show cooking con carnes de res, aves y pescados a la plancha; barra de ensaladas orgánicas; barra caliente con pastas preparadas al momento, pizzas caseras, guisados mexicanos, pescados en salsa y mesa central de repostería y helados.",
      menu: "Breakfast: Eggs and omelettes prepared to order, hot cakes, waffles, chilaquiles station, assorted cold cuts and cheeses, cut tropical fruit, natural juices and freshly baked sweet bakery. Lunch and Dinner: Live cooking stations with grilled beef, poultry and fish; organic salad bar; hot bar with freshly made pastas, homemade pizzas, Mexican stews, fish in sauce and central pastry and ice cream table.",
      especialidades: "Huevos y omelettes al momento, hot cakes, waffles, estación de chilaquiles, embutidos y quesos, fruta tropical, jugos naturales, panadería dulce, estaciones de show cooking, barra de ensaladas orgánicas, pastas preparadas al momento, pizzas caseras, guisados mexicanos, pescados en salsa, repostería y helados.",
      specialties: "Eggs and omelettes to order, hot cakes, waffles, chilaquiles station, cold cuts and cheeses, tropical fruit, natural juices, sweet bakery, live cooking stations, organic salad bar, freshly made pastas, homemade pizzas, Mexican stews, fish in sauce, pastry and ice cream.",
      signatureDishes: [
        "Huevos y omelettes al momento",
        "Estación de chilaquiles",
        "Carnes a la plancha",
        "Pastas preparadas al momento",
        "Pizzas caseras",
        "Guisados mexicanos",
        "Repostería y helados"
      ]
    },
    "buffet-el-tapatio": {
      tipo: "cafeteria",
      cocina: "Buffet / Grill de Alberca",
      cuisine: "Buffet / Pool Grill",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:30 - 17:00",
      horarioTexto: "11:30 - 17:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Grill y Snacks: Hamburguesas al carbón, perritos calientes (hot dogs), papas a la francesa, aros de cebolla y pollo frito crujiente. Estación Mexicana: Tacos al pastor y bistec con tortillas de maíz calientes, barra de totopos con salsa de queso cheddar fundido, frijoles refritos, pico de gallo, guacamole fresco y salsas caseras de molcajete. Refrescos y Ligeros: Barra de ensaladas frescas, fruta cortada (sandía, piña, melón) y nieves/helados.",
      menu: "Grill and Snacks: Charcoal burgers, hot dogs, french fries, onion rings and crispy fried chicken. Mexican Station: Al pastor tacos and steak with hot corn tortillas, nacho bar with melted cheddar cheese sauce, refried beans, pico de gallo, fresh guacamole and molcajete homemade sauces. Refreshing and Light: Fresh salad bar, cut fruit (watermelon, pineapple, melon) and snow cones/ice creams.",
      especialidades: "Hamburguesas al carbón, hot dogs, papas a la francesa, aros de cebolla, pollo frito crujiente, tacos al pastor, bistec con tortillas de maíz, totopos con queso cheddar, frijoles refritos, pico de gallo, guacamole fresco, ensaladas frescas, fruta cortada, nieves y helados.",
      specialties: "Charcoal burgers, hot dogs, french fries, onion rings, crispy fried chicken, al pastor tacos, steak with corn tortillas, cheddar cheese nachos, refried beans, pico de gallo, fresh guacamole, fresh salads, cut fruit, snow cones and ice creams.",
      signatureDishes: [
        "Hamburguesas al carbón",
        "Tacos al pastor",
        "Totopos con queso cheddar",
        "Guacamole fresco",
        "Fruta cortada",
        "Nieves y helados"
      ]
    },
    "el-museo": {
      tipo: "especialidad",
      cocina: "Restaurante Italiano",
      cuisine: "Italian Restaurant",
      dressCode: "Smart Casual",
      reservation: "Requerida",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Entrantes: Selección de antipasto con prosciutto crudo, salami toscano, alcachofas marinadas y aceitunas negras; crema de pomodoro con albahaca y croutones de ajo; ensalada de arúgula con queso pecorino y peras caramelizadas. Especialidades de Pasta y Risotto: Risotto nero con calamares salteados, gnocchis en salsa cremosa de gorgonzola y nueces, penne all'arrabbiata con toque picante suave, ravioles de carne en salsa de trufa negra. Platos Fuertes: Ossobuco braseado a fuego lento acompañado de polenta cremosa, filete de res en costra de hierbas con riduzione de vino Chianti y filete de robalo a la plancha con vinagreta de jitomates deshidratados. Postres: Cannoli crujientes rellenos de ricotta y pistache, tiramisú de autor y torta húmeda de chocolate con gelato de avellana.",
      menu: "Appetizers: Antipasto selection with prosciutto crudo, Tuscan salami, marinated artichokes and black olives; pomodoro cream with basil and garlic croutons; arugula salad with pecorino cheese and caramelized pears. Pasta and Risotto Specialties: Nero risotto with sautéed squid, gnocchi in creamy gorgonzola and walnut sauce, penne all'arrabbiata with mild spicy touch, meat ravioli in black truffle sauce. Main Courses: Slow-braised ossobuco with creamy polenta, beef fillet in herb crust with Chianti wine reduction and grilled sea bass fillet with dehydrated tomato vinaigrette. Desserts: Crispy cannoli filled with ricotta and pistachio, signature tiramisu and moist chocolate cake with hazelnut gelato.",
      especialidades: "Antipasto con prosciutto crudo, salami toscano, alcachofas marinadas, aceitunas negras, crema de pomodoro, ensalada de arúgula con queso pecorino, risotto nero con calamares, gnocchis de gorgonzola, penne all'arrabbiata, ravioles de carne en salsa de trufa, ossobuco braseado, filete de res en costra de hierbas, filete de robalo, cannoli de ricotta y pistache, tiramisú de autor, torta de chocolate con gelato de avellana.",
      specialties: "Antipasto with prosciutto crudo, Tuscan salami, marinated artichokes, black olives, pomodoro cream, arugula salad with pecorino cheese, nero risotto with squid, gnocchi with gorgonzola, penne all'arrabbiata, meat ravioli in black truffle sauce, slow-braised ossobuco, herb-crusted beef fillet, grilled sea bass, ricotta and pistachio cannoli, signature tiramisu, moist chocolate cake with hazelnut gelato.",
      signatureDishes: [
        "Antipasto con prosciutto crudo",
        "Risotto nero con calamares",
        "Gnocchis de gorgonzola y nueces",
        "Penne all'arrabbiata",
        "Ravioles de carne en salsa de trufa negra",
        "Ossobuco braseado con polenta cremosa",
        "Filete de res en costra de hierbas",
        "Cannoli de ricotta y pistache",
        "Tiramisú de autor"
      ]
    }
  };

  // --- Bares ---------------------------------------------------------------
  const BARES = {
    "sports-bar-corner": { tipo: "bar", cocina: "Sports bar", cuisine: "Sports bar", carta: "Antojitos · Hamburguesas · Wings · Cerveza · Snacks", menu: "Mexican snacks · Burgers · Wings · Beer · Snacks", hours: "17:00 - 01:00", horarioTexto: "17:00 - 01:00 h", hotel: "Iberostar Paraíso Lindo" },
    // "heladeria-el-mirador" consolidado: es el mismo lugar que "lobby-bar-el-mirador" (JOIA)
    "starcafe": {
      tipo: "bar",
      cocina: "Bar",
      cuisine: "Bar",
      carta: "Bebidas de alta gama, licores añejos y coctelería especializada; cerveza y snacks tipo bar (alitas, nachos).",
      menu: "Premium drinks, aged spirits and specialty cocktails; beer and bar snacks (wings, nachos).",
      hours: "16:00 - 00:00",
      horarioTexto: "16:00 - 00:00 h",
      hotel: "Iberostar Paraíso del Mar"
    },
    "pool-bar-las-olas": { tipo: "bar", cocina: "Bar de piscina (Swim-up)", cuisine: "Pool bar (Swim-up)", carta: "Margaritas frozen · Piñas coladas · Mojitos caribeños · Daiquirís · Cervezas frías", menu: "Frozen margaritas · Piña coladas · Caribbean mojitos · Daiquiris · Cold beers", hours: "10:00 - 19:00", horarioTexto: "10:00 - 19:00 h", hotel: "Iberostar Paraíso del Mar" },
    "lobby-bar-kukulkan": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería de autor · Whisky · Aperitivos", menu: "Signature cocktails · Whisky · Appetizers", hours: "09:00 - 01:00", horarioTexto: "09:00 - 01:00 h", hotel: "Iberostar Paraíso Maya" },
    "music-bar-rhapsody": { tipo: "bar", cocina: "Music bar", cuisine: "Music bar", carta: "Coctelería · Cervezas de autor · Snacks · Música en vivo", menu: "Cocktails · Craft beers · Snacks · Live music", hours: "18:00 - 01:00", horarioTexto: "18:00 - 01:00 h" },
    "lobby-bar-el-mirador": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería · Vinos tintos · Tabla de quesos", menu: "Cocktails · Red wines · Cheese board", hours: "09:00 - 01:00", horarioTexto: "09:00 - 01:00 h", hotel: "Iberostar Paraíso JOIA" },
    "aqua-bar-la-sirenita": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks", hours: "10:00 - 18:00", horarioTexto: "10:00 - 18:00 h" },
    "health-bar-spa": { tipo: "bar_cierre_temprano", cocina: "Health bar", cuisine: "Health bar", carta: "Bowls · Zumos prensados · Ensaladas · Infusiones", menu: "Bowls · Cold-pressed juices · Salads · Infusions", hours: "08:00 - 20:00", horarioTexto: "08:00 - 20:00 h" },
    "aqua-bar-la-perla": { tipo: "bar", cocina: "Bar de piscina", cuisine: "Pool bar", carta: "Refrescos · Cervezas de barril · Cócteles tropicales con servicio a camastros", menu: "Soft drinks · Draft beers · Tropical cocktails with lounge service", hours: "10:00 - 18:00", horarioTexto: "10:00 - 18:00 h", hotel: "Iberostar Paraíso del Mar" },
    "bar-teatro": { tipo: "bar", cocina: "Bar de teatro", cuisine: "Theater bar", carta: "Tragos rápidos · Combinados con ron / vodka / whisky · Refrescos", menu: "Quick drinks · Mixed drinks with rum / vodka / whisky · Soft drinks", hours: "17:00 - 00:00", horarioTexto: "17:00 - 00:00 h", hotel: "Iberostar Paraíso Lindo" },
    "lobby-bar-la-fuente": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería de temporada · Aperitivos", menu: "Seasonal cocktails · Appetizers", hours: "09:00 - 01:00", horarioTexto: "09:00 - 01:00 h" },
    "aqua-bar-las-olas": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks", hours: "10:00 - 18:00", horarioTexto: "10:00 - 18:00 h" },
    "lobby-bar-la-cula": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería de autor · Highballs", menu: "Signature cocktails · Highballs", hours: "08:00 - 01:00", horarioTexto: "08:00 - 01:00 h" },
    "aqua-bar-las-rocas": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks", hours: "10:00 - 18:00", horarioTexto: "10:00 - 18:00 h" },
    "lobby-bar-acuario": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería · Vinos · Aperitivos", menu: "Cocktails · Wines · Appetizers", hours: "09:00 - 01:00", horarioTexto: "09:00 - 01:00 h", hotel: "Iberostar Paraíso Lindo" },
    "cigar-bar": { tipo: "bar_cierre_temprano", cocina: "Cigar bar", cuisine: "Cigar bar", carta: "Cigarros premium · Whisky y ron añejo · Quesos · Café", menu: "Premium cigars · Aged whisky and rum · Cheeses · Coffee", hours: "17:00 - 01:00", horarioTexto: "17:00 - 01:00 h" },
    "bar-la-fuente": {
      tipo: "bar",
      cocina: "Lobby bar",
      cuisine: "Lobby bar",
      carta: "Cafés matutinos de especialidad · Martinis · Cócteles clásicos (Negroni, Old Fashioned) · Digestivos y licores",
      menu: "Specialty morning coffee · Martinis · Classic cocktails (Negroni, Old Fashioned) · Digestifs and liquors",
      hours: "08:00 - 01:00",
      horarioTexto: "08:00 - 01:00 h",
      hotel: "Iberostar Paraíso del Mar"
    },
    "bar-el-kiosko": {
      tipo: "bar",
      cocina: "Bar de playa",
      cuisine: "Beach bar",
      carta: "Cervezas de playa con limón · Cócteles de ron · Tequila sunrise · Aguas frescas de sabores",
      menu: "Beach beers with lime · Rum cocktails · Tequila sunrise · Flavored fresh waters",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso del Mar"
    },
    "bar-galaxy-nightclub": {
      tipo: "bar_cierre_temprano",
      cocina: "Nightclub",
      cuisine: "Nightclub",
      carta: "Shots · Cócteles energéticos · Cerveza · Licores importados con DJ en directo",
      menu: "Shots · Energy cocktails · Beer · Imported liquors with live DJ",
      hours: "23:00 - 03:00",
      horarioTexto: "23:00 - 03:00 h",
      hotel: "Iberostar Paraíso del Mar"
    },
    "beach-bar": {
      tipo: "bar",
      cocina: "Bar de Playa",
      cuisine: "Beach Bar",
      carta: "Cervezas y Cocteles Tropicales: Cerveza fría (de barril y botella) servida con limón y sal, margaritas (limón, mango, fresa), piñas coladas, mojitos caribeños, daiquirís y tequila sunrise. Sin alcohol: Aguas frescas (jamaica, horchata), refrescos de lata, cócteles vírgenes frutales (mocktails) y agua embotellada.",
      menu: "Beers and Tropical Cocktails: Cold beer (draft and bottle) served with lime and salt, margaritas (lime, mango, strawberry), piña coladas, Caribbean mojitos, daiquiris and tequila sunrise. Non-alcoholic: Fresh waters (hibiscus, horchata), canned sodas, virgin fruit cocktails (mocktails) and bottled water.",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso del Mar"
    },
    "cocobar": {
      tipo: "bar",
      cocina: "Bar de Alberca y Playa",
      cuisine: "Pool and Beach Bar",
      carta: "Bebidas refrescantes de alberca y playa: piñas coladas, daiquirís de sabores, mojitos tropicales, cervezas bien frías, aguas de sabor y opciones sin alcohol (mocktails) para toda la familia.",
      menu: "Pool and beach refreshing drinks: piña coladas, flavored daiquiris, tropical mojitos, ice-cold beers, flavored waters and non-alcoholic options (mocktails) for the whole family.",
      hours: "10:00 - 17:00",
      horarioTexto: "10:00 - 17:00 h",
      hotel: "Iberostar Paraíso del Mar"
    },
    "bar-lobby-chichen-itza": {
      tipo: "bar",
      cocina: "Lobby bar",
      cuisine: "Lobby bar",
      carta: "Coctelería de autor mexicana (mezcales, tequilas reposados), martinis, whiskies de etiqueta y café expreso recién molido.",
      menu: "Mexican author cocktails (mezcals, rested tequilas), martinis, label whiskies and freshly ground espresso coffee.",
      hours: "09:00 - 01:00",
      horarioTexto: "09:00 - 01:00 h",
      hotel: "Iberostar Paraíso Maya"
    },
    "star-rock-cafe-lindo": {
      tipo: "bar",
      cocina: "Bar temático",
      cuisine: "Rock bar",
      carta: "Bebidas de alta gama, licores añejos y coctelería especializada; cerveza y snacks tipo bar (alitas, nachos).",
      menu: "Premium drinks, aged spirits and specialty cocktails; beer and bar snacks (wings, nachos).",
      hours: "16:00 - 00:00",
      horarioTexto: "16:00 - 00:00 h",
      hotel: "Iberostar Paraíso Lindo"
    },
  };

  // --- Spa, golf y otros servicios ----------------------------------------
  const SERVICIOS = {
    spa: {
      name: "Spa Sensations",
      nameEn: "Spa Sensations",
      hours: "08:00 - 20:00",
      horarioTexto: "08:00 - 20:00 h",
      hydrotherapyCircuit: [
        "Piscina dinámica de relajación con cascadas, cuellos de cisne y chorros de masaje corporal subacuático",
        "Baño turco de vapor, sauna finlandesa, pozo de agua fría de contraste, pediluvio y zona de descanso con camas térmicas de cerámica"
      ],
      hydrotherapyCircuitEn: [
        "Relaxing dynamic pool with waterfalls, swan necks and underwater body massage jets",
        "Turkish steam bath, Finnish sauna, contrast cold water pool, foot bath and rest area with ceramic thermal beds"
      ],
      treatments: "Masaje Relajante Aromático (50 / 80 min) · Masaje de Tejido Profundo - Deep Tissue (50 / 80 min) · Ritual Corporal de Sales Marinas y Coco (80 min) · Facial Hidratante Iluminador Post-Solar (50 min)",
      treatmentsEn: "Aromatic Relaxing Massage (50 / 80 min) · Deep Tissue Massage (50 / 80 min) · Sea Salt and Coconut Body Ritual (80 min) · Post-Sun Hydrating Illuminating Facial (50 min)",
      treatmentsList: [
        { name: "Masaje Relajante Aromático", nameEn: "Aromatic Relaxing Massage", duration: "50 / 80 min", description: "Terapia antiestrés con aceites esenciales botánicos para liberar tensión física", descriptionEn: "Anti-stress therapy with botanical essential oils to release physical tension" },
        { name: "Masaje de Tejido Profundo - Deep Tissue", nameEn: "Deep Tissue Massage", duration: "50 / 80 min", description: "Presión moderada a intensa enfocada en contracturas y sobrecarga muscular", descriptionEn: "Moderate to intense pressure focused on contractures and muscle overload" },
        { name: "Ritual Corporal de Sales Marinas y Coco", nameEn: "Sea Salt and Coconut Body Ritual", duration: "80 min", description: "Exfoliación regeneradora con sales naturales seguida de envoltura hidratante y masaje relajante", descriptionEn: "Regenerating exfoliation with natural salts followed by hydrating wrap and relaxing massage" },
        { name: "Facial Hidratante Iluminador Post-Solar", nameEn: "Post-Sun Hydrating Illuminating Facial", duration: "50 min", description: "Limpieza suave y nutrición antioxidante profunda para pieles expuestas al sol del Caribe", descriptionEn: "Gentle cleansing and deep antioxidant nutrition for skin exposed to Caribbean sun" }
      ],
      packages: "Paquete Maya Renewal (2 h con desayuno) · Paquete Escape de medio día · Paquete Relax para dos",
      packagesEn: "Maya Renewal Package (2 h with breakfast) · Half Day Escape Package · Relax Package for two"
    },
    "massage-palapa": {
      hours: "09:00 - 18:00",
      treatments: "Masaje de pies 30 min · Masaje relajante 60 min · Masaje tailandés 90 min",
      treatmentsEn: "30 min foot massage · 60 min relaxing massage · 90 min Thai massage",
      packages: "Paquete Palapa para dos · Paquete de Spa de 60 minutos",
      packagesEn: "Palapa Package for two · 60 min Spa Package"
    },
    "golf-club-house": {
      hours: "07:00 - 18:00",
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor",
      packagesEn: "18-hole green fee · Equipment rental · Private lessons with professional · Golf package with breakfast and advisor"
    },
    golf: {
      course: "Iberostar Playa Paraíso Golf Club",
      designer: "P.B. Dye (18 hoyos, Par 72)",
      description: "Campo 18 hoyos de campeonato, Par 72, diseñado por P.B. Dye. Trazado integrado en la selva maya con desniveles naturales y greenes de césped Paspalum.",
      descriptionEn: "18-hole championship course, Par 72, designed by P.B. Dye. Layout integrated into the Mayan jungle with natural undulations and Paspalum grass greens.",
      hours: "07:00 h al atardecer",
      horarioTexto: "Primer tee time a partir de las 07:00 h hasta el atardecer",
      services: [
        "Campo de prácticas (driving range), putting green y chipping green",
        "Carrito de golf incluido en la ronda y servicio de bebidas/snacks todo incluido durante el recorrido",
        "Renta de bastones de gama alta y tienda Pro Shop con artículos deportivos y prendas oficiales"
      ],
      servicesEn: [
        "Driving range, putting green and chipping green",
        "Golf cart included in the round and all-inclusive drinks/snacks service during the course",
        "High-end club rental and Pro Shop with sports items and official garments"
      ],
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor",
      packagesEn: "18-hole green fee · Equipment rental · Private lessons with professional · Golf package with breakfast and advisor"
    },
    piscina: {
      hours: "07:00 - 22:00"
    },
    theclub: {
      hours: "08:00 - 22:00",
      horarioTexto: "08:00 - 22:00",
      amenities: "Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks",
      amenidades: "Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks",
      amenitiesEn: "High-speed Wi-Fi, rest areas, terrace, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.",
      descripcion: "Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.",
      descriptionEn: "Exclusive space for members where you enjoy personalized attention, warm environments and preferred experiences in the heart of the complex."
    },
    "star-prestige-lounge": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.",
      descripcion: "Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.",
      descriptionEn: "Exclusive Star Prestige lounge where you rest with warmth, enjoy premium drinks and receive personalized attention in a reserved environment."
    },
    "star-prestige-beach-club": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descripcion: "Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descriptionEn: "Exclusive oceanfront area where you enjoy comfort, attentive service and preferred experiences in a warm and distinguished environment."
    },
    "star-prestige-maya": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.",
      descripcion: "Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.",
      descriptionEn: "Exclusive Star Prestige area in Paraíso Maya where you access preferred services, warm environments and personalized attention during your stay."
    },
    "star-prestige-joia": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descripcion: "Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descriptionEn: "Exclusive Star Prestige area in JOIA where you enjoy luxury, attentive service and preferred experiences in a warm and distinguished environment."
    }
  };

  // --- Actividades del día -------------------------------------------------
  // Programa diario oficial del complejo.
  const ACTIVIDADES = [
    { hora: "08:30", nombre: "Yoga matutino frente al mar", nombreEn: "Morning yoga facing the sea", lugar: "Playa Paraíso", poiId: "playa-mar-caribe", grupo: "Fit & Fun" },
    { hora: "10:30", nombre: "Star Camp: Taller Mini Chef y Huerto", nombreEn: "Star Camp: Mini Chef Workshop and Garden", lugar: "Star Camp", poiId: "starcamp", grupo: "Star Camp · Dolphin (8 a 12 años)" },
    { hora: "11:30", nombre: "Aqua Gym y Ritmos Caribeños", nombreEn: "Aqua Gym and Caribbean Rhythms", lugar: "Piscina Principal", poiId: "activities-pool", grupo: "Fit & Fun" },
    { hora: "15:00", nombre: "Torneo de Vóley de Playa", nombreEn: "Beach Volleyball Tournament", lugar: "Playa Paraíso", poiId: "playa-mar-caribe", grupo: "Fit & Fun" },
    { hora: "16:30", nombre: "Clínica de Tiro con Arco y Tenis", nombreEn: "Archery and Tennis Clinic", lugar: "Área Deportiva", poiId: "tennis", grupo: "Fit & Fun" },
    { hora: "20:00", nombre: "Música en Vivo y Coctelería", nombreEn: "Live Music and Cocktails", lugar: "Lobby Bar Acuario", poiId: "lobby-bar-acuario", grupo: "Entretenimiento" },
    { hora: "21:30", nombre: "Espectáculo Nocturno Circense", nombreEn: "Night Circus Show", lugar: "Teatro Coliseo", poiId: "teatro-coliseo", grupo: "Espectáculos Nocturnos" }
  ];

  ACTIVIDADES.forEach(function (item) {
    item.fuente = "oficial";
    item.official = true;
  });

  datos.STAR_CAMP = [
    { rango: "Monkey (4 a 7 años)", actividades: "Manualidades sustentables, juegos en el parque acuático, búsqueda del tesoro y minidisco nocturna", actividadesEn: "Sustainable crafts, water park games, treasure hunt and night minidisco" },
    { rango: "Dolphin (8 a 12 años)", actividades: "Talleres culinarios Mini Chef, olimpiadas acuáticas y dinámicas interactivas del programa ambiental Wave of Change", actividadesEn: "Mini Chef culinary workshops, water Olympics and interactive dynamics of the Wave of Change environmental program" },
    { rango: "Eagle (13 a 17 años)", actividades: "Torneos de videojuegos, vóley de playa, futbol, billar y encuentros con música DJ", actividadesEn: "Video game tournaments, beach volleyball, soccer, billiards and DJ music meetups" }
  ];

  datos.FIT_FUN = [
    "Yoga y pilates matutino frente a la playa",
    "Aqua gym y zumba en la piscina principal",
    "Canchas de tenis, pádel y clínicas de tiro con arco",
    "Espectáculos Nocturnos: Shows diarios en el Teatro Coliseo y Teatro Music Hall a partir de las 21:30 h (producciones musicales, ballet folclórico mexicano y artes circenses)"
  ];

  datos.FIT_FUN_EN = [
    "Morning yoga and pilates on the beach",
    "Aqua gym and zumba in the main pool",
    "Tennis, padel courts and archery clinics",
    "Night Shows: Daily shows at Teatro Coliseo and Teatro Music Hall from 21:30 h (musical productions, Mexican folk ballet and circus arts)"
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