// Guía interactiva del complejo Iberostar Playa Paraíso
// Catálogo verificado a partir del plano oficial + páginas oficiales
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  window.RevistaDigital.guiapa = window.RevistaDigital.guiapa || {};

  const CATEGORIES = {
    hotel: { icon: "building", color: "#000000" },
    club: { icon: "star", color: "#B9A385" },
    starprestige: { icon: "star", color: "#002855" },
    concierge: { icon: "concierge-bell", color: "#002855" },
    restaurante: { icon: "utensils", color: "#B9A385" },
    snacks: { icon: "cookie-bite", color: "#4E545A" },
    bar: { icon: "cocktail", color: "#4E545A" },
    piscina: { icon: "swimming", color: "#02678D" },
    spa: { icon: "spa", color: "#B0857C" },
    golf: { icon: "golf-ball", color: "#00331D" },
    playa: { icon: "umbrella-beach", color: "#709EB1" },
    comer: { icon: "shopping-bag", color: "#B0857C" },
    deportes: { icon: "dumbbell", color: "#ACAFB0" },
    entretenimiento: { icon: "music", color: "#4E545A" },
    servicio: { icon: "info", color: "#ACAFB0" },
    wellness: { icon: "spa", color: "#B0857C" },
    kids: { icon: "child", color: "#ACAFB0" },
    conv: { icon: "building", color: "#ACAFB0" },
    discoteca: { icon: "music", color: "#6B0123" }
  };

  // Catálogo base alineado con lo verificado (se expandirá con coordenadas OSM)
  const POIS = [
    // Hoteles (reutilizarán hotelCoordinates existentes; marcados como verified si coords conocidas)
    {
      id: "del-mar",
      name: "Iberostar Selection Paraíso del Mar",
      category: "hotel",
      hotelId: "Iberostar Selection Paraíso del Mar",
      lat: 20.7612389,
      lng: -86.9640931,
      description: "Hotel Selection",
      source: "official",
      verified: true,
      brand: "selection"
    },
    {
      id: "beach",
      name: "Iberostar Waves Paraíso Beach",
      category: "hotel",
      hotelId: "Iberostar Waves Paraíso Beach",
      lat: 20.7584,
      lng: -86.9585,
      description: "Hotel Waves",
      source: "official",
      verified: true,
      brand: "waves"
    },
    {
      id: "lindo",
      name: "Iberostar Waves Paraíso Lindo",
      category: "hotel",
      hotelId: "Iberostar Waves Paraíso Lindo",
      lat: 20.7596096,
      lng: -86.9639649,
      description: "Hotel Waves",
      source: "official",
      verified: true,
      brand: "waves"
    },
    {
      id: "maya",
      name: "Iberostar Selection Paraíso Maya",
      category: "hotel",
      hotelId: "Iberostar Selection Paraíso Maya",
      lat: 20.7578835,
      lng: -86.9648766,
      description: "Hotel Selection",
      source: "official",
      verified: true,
      brand: "selection"
    },
    {
      id: "joia",
      name: "JOIA Paraíso by Iberostar",
      category: "hotel",
      hotelId: "JOIA Paraíso by Iberostar",
      lat: 20.7563073,
      lng: -86.9629786,
      description: "Solo adultos",
      source: "official",
      verified: true,
      brand: "joia"
    }
  ];

  POIS.push({"id":"golf","name":"Iberostar Playa Paraíso Golf Club","category":"golf","lat":20.75946,"lng":-86.96714,"description":"Campo 18 hoyos","verified":true},
    {"id":"convention","name":"Centro de Convenciones","category":"conv","lat":20.76143,"lng":-86.96538,"description":"Centro de convenciones del complejo","verified":true},
    {"id":"spa","name":"Spa Sensations","category":"spa","lat":20.76032,"lng":-86.96629,"description":"Spa del complejo","verified":true},
    {"id":"starcamp","name":"Star Camp","category":"kids","lat":20.76071,"lng":-86.96471,"description":"Star Camp","verified":true},
    {"id":"galaxy","name":"Discoteca Galaxy","category":"discoteca","lat":20.75955,"lng":-86.966,"description":"Discoteca del complejo (+18)","hours":"22:00 / 23:00 - 03:00 h","horarioTexto":"22:00 / 23:00 - 03:00 h","carta":"Shots · Cócteles energéticos · Cerveza · Licores importados con DJ en directo","verified":true},
    // Coco Bar: coordenada verificada manualmente (Google Maps).
    {"id":"cocobar","name":"Coco Bar","category":"bar","lat":20.756290,"lng":-86.959046,"description":"Coco Bar","verified":true});
  POIS.push({"id":"theclub","name":"THE CLUB","category":"club","description":"Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.","hours":"08:00 - 22:00","amenities":"Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas"},
    {"id":"playa-mar-caribe","name":"Mar Caribe","category":"playa","description":"Mar Caribe / Caribbean Sea"});
  POIS.push(
    {"id":"hashiru","name":"Hashiro","category":"restaurante","description":"Restaurante japonés","tipo":"solo_cena","cocina":"Japonesa & Teppanyaki","cuisine":"Japanese & Teppanyaki","carta":"Sushi y sashimi · Teppanyaki en vivo · Arroz yakimeshi · Helado frito en tempura","menu":"Sushi and sashimi · Live teppanyaki · Yakimeshi rice · Tempura fried ice cream","horario":"18:00 - 22:00 h","hours":"18:00 - 22:00 h","vestimenta":"Informal elegante","dressCode":"Smart casual","reservas":true,"reservation":true,"especialidades":"Selección de sushi y sashimi, mesas de teppanyaki en vivo (solomillo, pollo teriyaki y camarones), arroz yakimeshi y helado frito en tempura","specialties":"Sushi and sashimi selection, live teppanyaki tables (tenderloin, teriyaki chicken and shrimp), yakimeshi rice and tempura fried ice cream","lat":20.7606093,"lng":-86.9637212,"verified":true,"source":"osm","hotel":"Iberostar Waves Paraíso Beach"},
    {"id":"la-dorada","name":"La Dorada","category":"restaurante","description":"Restaurante mediterráneo","tipo":"especialidad","cocina":"Pescados y Mariscos Mediterráneos","cuisine":"Mediterranean Fish and Seafood","carta":"Lubina a la sal marina · Cazuela de mariscos al azafrán · Pulpo a la parrilla sobre puré trufado · Tarta templada de limón","menu":"Sea bass in sea salt · Seafood casserole with saffron · Grilled octopus on truffle purée · Warm lemon tart","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00 h","vestimenta":"Informal elegante","dressCode":"Smart casual","reservas":true,"reservation":true,"especialidades":"Lubina a la sal marina, cazuela de mariscos al azafrán, pulpo a la parrilla sobre puré trufado y tarta tibia de limón","specialties":"Sea bass in sea salt, saffron seafood casserole, grilled octopus on truffle purée and warm lemon tart","lat":20.76156,"lng":-86.9631079,"verified":true,"source":"osm","hotel":"Iberostar Selection Paraíso del Mar"},
    {"id":"rodizio","name":"Rodizio","category":"restaurante","description":"Restaurante de especialidad brasileño","tipo":"especialidad","cocina":"Churrasquería Brasileña","cuisine":"Brazilian Steakhouse","carta":"Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas) · Piña asada con canela · Buffet de guarniciones frías y calientes","menu":"Charcoal-grilled select cuts skewers (picanha, flank, skirt and ribs) · Cinnamon-roasted pineapple · Cold and hot side buffet","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00 h","vestimenta":"Informal elegante","dressCode":"Smart casual","reservas":true,"reservation":true,"especialidades":"Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas), piña asada con canela y buffet de guarniciones frías y calientes","specialties":"Charcoal-grilled select cut skewers (picanha, flank, skirt and ribs), cinnamon-roasted pineapple and cold/hot side buffet","hotel":"Iberostar Selection Paraíso del Mar","lat":20.76112,"lng":-86.9634612,"verified":true,"source":"osm"},
    {"id":"el-mercado","name":"El Mercado","category":"restaurante","description":"Restaurante buffet","tipo":"buffet","cocina":"Buffet internacional","cuisine":"International buffet","carta":"Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables","menu":"International stations · Cold bar · Artisan bakery · Healthy options","horario":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","hours":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","vestimenta":"Informal","dressCode":"Casual","reservas":false,"reservation":false,"especialidades":"Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables","specialties":"International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options","hotel":"Iberostar Selection Paraíso del Mar","lat":20.7612549,"lng":-86.9626755,"verified":true,"source":"osm"},
    {"id":"la-plaza","name":"La Plaza","category":"restaurante","description":"Restaurante buffet","tipo":"buffet","cocina":"Buffet internacional","cuisine":"International buffet","carta":"Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables","menu":"International stations · Cold bar · Artisan bakery · Healthy options","horario":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","hours":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","vestimenta":"Informal","dressCode":"Casual","reservas":false,"reservation":false,"especialidades":"Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables","specialties":"International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options","hotel":"Iberostar Waves Paraíso Beach","lat":20.7608481,"lng":-86.9629956,"verified":true,"source":"osm"},
    {"id":"la-hacienda","name":"La Hacienda","category":"restaurante","description":"Restaurante mexicano","tipo":"especialidad","cocina":"Tradicional Mexicana","cuisine":"Traditional Mexican","carta":"Sopa azteca con queso y aguacate · Cochinita pibil en hoja de plátano · Pollo en mole poblano · Churros tradicionales con cajeta","menu":"Aztec soup with cheese and avocado · Cochinita pibil in banana leaf · Chicken in poblano mole · Traditional churros with cajeta","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00 h","vestimenta":"Informal elegante","dressCode":"Smart casual","reservas":true,"reservation":true,"especialidades":"Sopa azteca con queso y aguacate, cochinita pibil en hoja de plátano, pollo en mole poblano y churros tradicionales con cajeta","specialties":"Aztec soup with cheese and avocado, cochinita pibil in banana leaf, chicken in poblano mole and traditional churros with cajeta","hotel":"Iberostar Waves Paraíso Beach","lat":20.7614866,"lng":-86.9629864,"verified":true,"source":"osm"},
    {"id":"el-puerto","name":"El Puerto","category":"restaurante","description":"Restaurante de especialidad","tipo":"especialidad","cocina":"Mariscos y pescados","cuisine":"Seafood and fish","carta":"Ceviche · Pulpo a la parrilla · Pescado a la veracruzana · Camarones al ajillo · Paella","menu":"Ceviche · Grilled octopus · Veracruz-style fish · Garlic shrimp · Paella","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00 h","vestimenta":"Informal elegante","dressCode":"Informal elegante","reservas":true,"reservation":true,"especialidades":"Ceviche, pulpo a la parrilla, pescado a la veracruzana, camarones al ajillo y paella","specialties":"Ceviche, grilled octopus, veracruz-style fish, garlic shrimp and paella","hotel":"Iberostar Waves Paraíso Beach","lat":20.7578601,"lng":-86.9591398,"verified":true,"source":"osm"},
    {"id":"beach-grill","name":"Beach Grill","category":"snacks","lat":20.7578219,"lng":-86.9582285,"description":"Grill de playa","verified":true,"tipo":"cafeteria","cocina":"Grill y snacks","cuisine":"Grill and snacks","carta":"Hamburguesas · Hot dogs · Nachos · Ensaladas · Helados","menu":"Burgers · Hot dogs · Nachos · Salads · Ice cream","horario":"Comida 12:00 - 16:00 h · Tarde 16:00 - 23:00 h","hours":"12:00 - 16:00 · 16:00 - 23:00","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Hamburguesas, hot dogs, nachos, ensaladas, helados","specialties":"Burgers, hot dogs, nachos, salads, ice cream","hotel":"Iberostar Waves Paraíso Lindo"},
    {"id":"burgers","name":"Burgers","category":"snacks","description":"Hamburguesas","tipo":"cafeteria","cocina":"Hamburguesas gourmet","cuisine":"Gourmet burgers","carta":"Hamburguesa clásica · Hamburguesa de pollo · Hamburguesa vegetariana · Papas fritas · Malteadas","menu":"Classic burger · Chicken burger · Vegetarian burger · French fries · Milkshakes","horario":"Desayuno cerrado · Comida / Snack 11:00 - 17:00 h · Cena cerrada · Lunes a Domingo","hours":"Breakfast closed · Lunch / Snack 11:00 - 17:00 h · Dinner closed · Monday-Sunday","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Hamburguesa clásica, hamburguesa de pollo, hamburguesa vegetariana, papas fritas, malteadas","specialties":"Classic burger, chicken burger, vegetarian burger, french fries, milkshakes","hotel":"Iberostar Waves Paraíso Lindo","lat":20.7598217,"lng":-86.9663036,"verified":true,"source":"osm"},
    {"id":"antojitos-tacos","name":"Antojitos / Tacos","category":"snacks","description":"Antojitos / Tacos","tipo":"cafeteria","cocina":"Antojitos mexicanos","cuisine":"Mexican snacks","carta":"Tacos · Quesadillas · Nachos · Elotes · Churros","menu":"Tacos · Quesadillas · Nachos · Corn on the cob · Churros","horario":"Desayuno cerrado · Comida / Snack 10:00 - 18:00 h · Cena cerrada · Lunes a Domingo","hours":"Breakfast closed · Lunch / Snack 10:00 - 18:00 h · Dinner closed · Monday-Sunday","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Tacos, quesadillas, nachos, elotes, churros","specialties":"Tacos, quesadillas, nachos, corn on the cob, churros","hotel":"Iberostar Waves Paraíso Lindo","lat":20.7604457,"lng":-86.9658435,"verified":true,"source":"osm"},
    {"id":"crepes","name":"Crepes & Ice Cream","category":"snacks","description":"Crepas y helados","tipo":"cafeteria","cocina":"Crepas dulces y saladas","cuisine":"Sweet and savory crepes","carta":"Crepa de Nutella · Crepa de fresa · Crepa de jamón y queso · Waffles · Helados","menu":"Nutella crepe · Strawberry crepe · Ham and cheese crepe · Waffles · Ice cream","horario":"Desayuno cerrado (abre a media mañana) · Comida / Cena (Snack dulce) 11:00 - 22:00 h · Lunes a Domingo","hours":"Breakfast closed (opens mid-morning) · Lunch / Dinner (Sweet snack) 11:00 - 22:00 h · Monday-Sunday","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Crepa de Nutella, crepa de fresa, crepa de jamón y queso, waffles, helados","specialties":"Nutella crepe, strawberry crepe, ham and cheese crepe, waffles, ice cream","hotel":"Iberostar Waves Paraíso Lindo","lat":20.7599822,"lng":-86.965172,"verified":true,"source":"osm"},
    {"id":"el-museo","name":"El Museo","category":"restaurante","hotelId":"Iberostar Waves Paraíso Lindo","description":"Restaurante italiano","tipo":"especialidad","cocina":"Cocina italiana","cuisine":"Italian cuisine","carta":"Carpaccio de res con parmesano y rúcula · Filete mignon a las tres pimientas · Lomo de salmón confitado · Fondente de chocolate con helado de vainilla","menu":"Beef carpaccio with parmesan and arugula · Peppercorn filet mignon · Confit salmon loin · Chocolate fondant with vanilla ice cream","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Formal elegante","dressCode":"Formal elegant","reservas":true,"reservation":true,"especialidades":"Carpaccio de res con parmesano y rúcula, filete mignon a las tres pimientas, lomo de salmón confitado y fondente de chocolate con helado de vainilla","specialties":"Beef carpaccio with parmesan and arugula, peppercorn filet mignon, confit salmon loin and chocolate fondant with vanilla ice cream","lat":20.7589083,"lng":-86.9636421,"verified":true,"source":"osm"},
    {"id":"la-pagoda","name":"La Pagoda","category":"restaurante","description":"Restaurante buffet","tipo":"buffet","cocina":"Buffet internacional","cuisine":"International buffet","carta":"Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables","menu":"International stations · Cold bar · Artisan bakery · Healthy options","horario":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","hours":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","vestimenta":"Informal","dressCode":"Casual","reservas":false,"reservation":false,"especialidades":"Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables","specialties":"International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options","hotel":"Iberostar Waves Paraíso Lindo","lat":20.7587578,"lng":-86.9632596,"verified":true,"source":"osm"},
    {"id":"coco-buffet","name":"Coco Snack Bar","category":"snacks","lat":20.756466,"lng":-86.958965,"description":"Snack bar de playa","verified":true,"tipo":"buffet","cocina":"Buffet internacional","cuisine":"International buffet","carta":"Buffet de desayuno · Comida internacional · Estación de tacos · Grill · Postres","menu":"Breakfast buffet · International food · Taco station · Grill · Desserts","horario":"Desayuno 07:00 - 10:30 h · Comida 12:30 - 15:30 h · Cena 18:30 - 22:00 h","hours":"07:00 - 10:30 · 12:30 - 15:30 · 18:30 - 22:00","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Buffet de desayuno, comida internacional, estación de tacos, grill, postres","specialties":"Breakfast buffet, international food, taco station, grill, desserts","hotel":"Iberostar Selection Paraíso Maya","hotelId":"Iberostar Selection Paraíso Maya"},
    {"id":"el-rancho","name":"El Rancho (Steak House)","category":"restaurante","description":"Steak house — El restaurante Steak House del área Maya","tipo":"especialidad","cocina":"Steakhouse & Carnes","cuisine":"Steakhouse & Meats","carta":"Selección de cortes a la parrilla de leña (rib eye, new york strip, solomillo y costillas glaseadas), con guarniciones clásicas de papas al horno rellenas de crema agria y tocino, vegetales a la parrilla con mantequilla de ajo y tarta tibia de manzana con helado de vainilla.","menu":"Wood-grilled cuts selection (rib eye, new york strip, tenderloin and glazed ribs), with classic sides of baked potatoes stuffed with sour cream and bacon, grilled vegetables with garlic butter and warm apple tart with vanilla ice cream.","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Informal elegante","dressCode":"Informal elegante","reservas":true,"reservation":true,"especialidades":"Selección de cortes a la parrilla de leña (rib eye, new york strip, solomillo y costillas glaseadas), con guarniciones clásicas de papas al horno rellenas de crema agria y tocino, vegetales a la parrilla con mantequilla de ajo y tarta tibia de manzana con helado de vainilla.","specialties":"Wood-grilled cuts selection (rib eye, new york strip, tenderloin and glazed ribs), with classic sides of baked potatoes stuffed with sour cream and bacon, grilled vegetables with garlic butter and warm apple tart with vanilla ice cream.","signatureDishes":["Rib eye","New york strip","Solomillo","Costillas glaseadas","Tarta tibia de manzana con helado de vainilla"],"hotel":"Iberostar Selection Paraíso Maya","lat":20.7580548,"lng":-86.964155,"verified":true,"source":"osm"},
    {"id":"la-geisha","name":"La Geisha","category":"restaurante","description":"Restaurante japonés","tipo":"especialidad","cocina":"Japonés Tradicional y Teppanyaki","cuisine":"Traditional Japanese and Teppanyaki","carta":"Rollos de sushi contemporáneos, sashimi de pesca sustentable y sopa miso, seguidos del espectáculo frente a la plancha teppan con arroz frito yakimeshi, verduras salteadas y mezcla de mar y tierra (camarones, res o salmón en salsa teriyaki casera).","menu":"Contemporary sushi rolls, sustainable fishing sashimi and miso soup, followed by the teppan plancha show cooking with yakimeshi fried rice, sautéed vegetables and surf and turf mix (shrimp, beef or salmon in homemade teriyaki sauce).","horario":"Desayuno cerrado · Comida cerrada · Cena 18:30 - 21:30 h · Lunes a Domingo · Acceso sujeto a disponibilidad de reservación","hours":"Breakfast closed · Lunch closed · Dinner 18:30 - 21:30 h · Monday-Sunday · Access subject to reservation availability","vestimenta":"Informal elegante","dressCode":"Informal elegante","reservas":true,"reservation":true,"especialidades":"Rollos de sushi contemporáneos, sashimi de pesca sustentable y sopa miso, seguidos del espectáculo frente a la plancha teppan con arroz frito yakimeshi, verduras salteadas y mezcla de mar y tierra (camarones, res o salmón en salsa teriyaki casera).","specialties":"Contemporary sushi rolls, sustainable fishing sashimi and miso soup, followed by the teppan plancha show cooking with yakimeshi fried rice, sautéed vegetables and surf and turf mix (shrimp, beef or salmon in homemade teriyaki sauce).","signatureDishes":["Rollos de sushi contemporáneos","Sashimi de pesca sustentable","Sopa miso","Arroz frito yakimeshi","Mezcla de mar y tierra en salsa teriyaki"],"hotel":"Iberostar Selection Paraíso Maya","lat":20.7572267,"lng":-86.9646975,"verified":true,"source":"osm"},
    {"id":"letoile","name":"L'Etoile","category":"restaurante","description":"Cocina francesa","tipo":"especialidad","cocina":"Gourmet Francés","cuisine":"French Gourmet","carta":"Propuesta clásica de alta cocina gala. Destacan la sopa de cebolla gratinada con queso emmental, terrinas de ave, magret de pato con reducción de frutos rojos, filete mignon en salsa bordelesa y postres de autor como suflé caliente o milhojas de vainilla de Papantla.","menu":"Classic French haute cuisine proposal. Highlights include gratinated onion soup with emmental cheese, poultry terrines, duck magret with red fruit sauce, filet mignon in bordelaise sauce and signature desserts such as hot soufflé or Papantla vanilla mille-feuille.","horario":"Desayuno cerrado · Comida cerrada · Cena 18:30 - 22:00 h · Lunes a Domingo · Acceso sujeto a disponibilidad de reservación","hours":"Breakfast closed · Lunch closed · Dinner 18:30 - 22:00 h · Monday-Sunday · Access subject to reservation availability","vestimenta":"Formal","dressCode":"Formal","reservas":true,"reservation":true,"especialidades":"Sopa de cebolla gratinada con queso emmental, terrinas de ave, magret de pato con reducción de frutos rojos, filete mignon en salsa bordelesa y postres de autor como suflé caliente o milhojas de vainilla de Papantla.","specialties":"Gratinated onion soup with emmental cheese, poultry terrines, duck magret with red fruit sauce, filet mignon in bordelaise sauce and signature desserts such as hot soufflé or Papantla vanilla mille-feuille.","signatureDishes":["Sopa de cebolla gratinada con queso emmental","Terrinas de ave","Magret de pato con reducción de frutos rojos","Filete mignon en salsa bordelesa","Suflé caliente","Milhojas de vainilla de Papantla"],"hotel":"Iberostar Selection Paraíso Maya","lat":20.7570704,"lng":-86.9644942,"verified":true,"source":"osm"},
    {"id":"el-tapatio","name":"El Tapatío","category":"restaurante","description":"Restaurante mexicano / buffet y grill de alberca","tipo":"especialidad","cocina":"Tradicional de Jalisco y el Bajío","cuisine":"Traditional from Jalisco and Bajío","carta":"Tacos de arrachera al comal · Pozole blanco tradicional con guarnición · Enchiladas potosinas artesanales · Buñuelos con miel de piloncillo. \n\nBuffet y grill de alberca (11:30-17:00): Hamburguesas al carbón, hot dogs, papas a la francesa, aros de cebolla, pollo frito crujiente. Estación Mexicana: Tacos al pastor y bistec, totopos con queso cheddar, frijoles refritos, pico de gallo, guacamole y salsas de molcajete. Ensaladas, fruta cortada y nieves/helados.","menu":"Skirt steak tacos on comal · Traditional white pozole with garnish · Artisan potosinas enchiladas · Piloncillo honey buñuelos. \n\nPool Buffet & Grill (11:30-17:00): Charcoal burgers, hot dogs, french fries, onion rings, crispy fried chicken. Mexican Station: Al pastor and steak tacos, nachos with cheddar cheese sauce, refried beans, pico de gallo, fresh guacamole and molcajete salsas. Fresh salads, cut fruit (watermelon, pineapple, melon) and ice cream.","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Informal elegante","dressCode":"Informal elegante","reservas":true,"reservation":true,"especialidades":"Tacos de arrachera al comal, Pozole blanco tradicional con guarnición, Enchiladas potosinas artesanales y Buñuelos con miel de piloncillo. Buffet y grill de alberca: hamburguesas al carbón, tacos al pastor, totopos con queso, guacamole, ensaladas, fruta y helados.","specialties":"Comal skirt steak tacos, traditional white pozole with garnish, artisan potosinas enchiladas and piloncillo honey buñuelos. Pool buffet & grill: charcoal burgers, al pastor tacos, cheddar nachos, guacamole, salads, fruit and ice cream.","signatureDishes":["Tacos de arrachera al comal","Pozole blanco tradicional con guarnición","Enchiladas potosinas artesanales","Buñuelos con miel de piloncillo"],"hotel":"Iberostar Waves Paraíso Lindo","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.7567139,"lng":-86.960329,"verified":true,"source":"osm"},
    {"id":"venecia","name":"Venecia","category":"restaurante","description":"Restaurante italiano","tipo":"especialidad","cocina":"Italiana Tradicional","cuisine":"Traditional Italian","carta":"Ossobuco alla milanese · Risotto con boletus y aceite de trufa blanca · Raviolis artesanales de ricotta y espinacas · Tiramisú clásico","menu":"Milanese ossobuco · Porcini and white truffle oil risotto · Artisan ricotta and spinach ravioli · Classic tiramisu","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Formal elegante","dressCode":"Formal elegant","reservas":true,"reservation":true,"especialidades":"Ossobuco alla milanese, risotto con boletus y aceite de trufa blanca, raviolis artesanales de ricotta y espinacas, y tiramisú clásico","specialties":"Milanese ossobuco, porcini and white truffle oil risotto, artisan ricotta and spinach ravioli and classic tiramisu","hotel":"JOIA Paraíso by Iberostar","lat":20.755841,"lng":-86.9626532,"verified":true,"source":"osm"},
    {"id":"bellavista","name":"Bellavista","category":"restaurante","description":"Restaurante buffet","tipo":"buffet","cocina":"Buffet internacional","cuisine":"International buffet","carta":"Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables","menu":"International stations · Cold bar · Artisan bakery · Healthy options","horario":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","hours":"Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h","vestimenta":"Informal","dressCode":"Casual","reservas":false,"reservation":false,"especialidades":"Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables","specialties":"International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options","hotel":"JOIA Paraíso by Iberostar","lat":20.7549173,"lng":-86.9612041,"verified":true,"source":"osm"},
    {"id":"latelier","name":"L'Atelier","category":"restaurante","description":"Restaurante gourmet","tipo":"especialidad","cocina":"Alta Cocina Francesa de Autor","cuisine":"Signature French Haute Cuisine","carta":"Foie gras mi-cuit con reducción de oporto · Lenguado Meuniére tradicional · Filete Chateaubriand con papas fondant · Soufflé clásico de Grand Marnier","menu":"Mi-cuit foie gras with port reduction · Traditional Meuniére sole · Chateaubriand fillet with fondant potatoes · Classic Grand Marnier soufflé","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Formal elegante","dressCode":"Formal elegante","reservas":true,"reservation":true,"especialidades":"Foie gras mi-cuit con reducción de oporto, Lenguado Meuniére tradicional, Filete Chateaubriand con papas fondant y Soufflé clásico de Grand Marnier","specialties":"Mi-cuit foie gras with port reduction, traditional Meuniére sole, Chateaubriand fillet with fondant potatoes and classic Grand Marnier soufflé","signatureDishes":["Foie gras mi-cuit con reducción de oporto","Lenguado Meuniére tradicional","Filete Chateaubriand con papas fondant","Soufflé clásico de Grand Marnier"],"hotel":"JOIA Paraíso by Iberostar","lat":20.7551676,"lng":-86.9609817,"verified":true,"source":"osm"},

    {"id":"haiku","name":"Haiku","category":"restaurante","description":"Restaurante japonés","tipo":"especialidad","cocina":"Cocina japonesa","cuisine":"Japanese cuisine","carta":"Sushi · Sashimi · Teppanyaki · Ramen · Tempura","menu":"Sushi · Sashimi · Teppanyaki · Ramen · Tempura","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Informal elegante","dressCode":"Informal elegante","reservas":true,"reservation":true,"especialidades":"Sushi, sashimi, teppanyaki, ramen, tempura","specialties":"Sushi, sashimi, teppanyaki, ramen, tempura","hotel":"JOIA Paraíso by Iberostar","lat":20.755212,"lng":-86.9610284,"verified":true,"source":"osm"},
    {"id":"olivetti","name":"The Olivetti","category":"restaurante","hotelId":"Iberostar Selection Paraíso Maya","lat":20.7567218,"lng":-86.9604135,"description":"Restaurante italiano — Spaghetti Factory","source":"Google Maps","verified":true,"tipo":"especialidad","cocina":"Restaurante Italiano","cuisine":"Italian Restaurant","carta":"Entrantes / Antipasti: Carpaccio de res con virutas de parmesano y vinagreta balsámica, ensalada caprese con mozzarella fresca de búfala y jitomate bola, bruschettas al pomodoro con albahaca. Pastas y Risottos: Lasaña clásica boloñesa al horno, ravioles rellenos de queso ricota y espinaca en salsa de mantequilla con salvia, fettuccine a los cuatro quesos o frutos del mar, risotto de setas y hongos silvestres. Platos Fuertes: Escalopines de ternera al marsala, pechuga de pollo a la parmesana con costra crocante y pescado blanco en salsa ligera de alcaparras y vino blanco. Postres: Tiramisú tradicional al café con queso mascarpone, panna cotta de frutos rojos y cannoli sicilianos.","menu":"Appetizers / Antipasti: Beef carpaccio with parmesan shavings and balsamic vinaigrette, caprese salad with fresh buffalo mozzarella and bola tomato, pomodoro bruschettas with basil. Pastas and Risottos: Classic baked bolognese lasagna, ricotta and spinach ravioli in butter and sage sauce, four-cheese or seafood fettuccine, wild mushroom risotto. Main Courses: Marsala veal scaloppini, parmesan-crusted chicken breast and white fish in light caper and white wine sauce. Desserts: Traditional coffee tiramisu with mascarpone, red fruit panna cotta and Sicilian cannoli.","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Smart Casual","dressCode":"Smart Casual","reservas":true,"reservation":true,"especialidades":"Carpaccio de res con virutas de parmesano, ensalada caprese, bruschettas al pomodoro, lasaña boloñesa, ravioles de ricota y espinaca, fettuccine, risotto de setas, escalopines al marsala, pollo a la parmesana, pescado blanco, tiramisú, panna cotta, cannoli sicilianos.","specialties":"Beef carpaccio with parmesan shavings, caprese salad, pomodoro bruschettas, baked bolognese lasagna, ricotta and spinach ravioli, fettuccine, wild mushroom risotto, marsala veal scaloppini, parmesan chicken breast, white fish with caper and white wine sauce, coffee tiramisu, red fruit panna cotta, Sicilian cannoli.","signatureDishes":["Carpaccio de res con virutas de parmesano","Ensalada caprese","Lasaña clásica boloñesa","Ravioles de queso ricota y espinaca","Risotto de setas y hongos silvestres","Escalopines de ternera al marsala","Tiramisú tradicional al café","Cannoli sicilianos"]},
    {"id":"lemon-spices","name":"Lemon & Spices","category":"restaurante","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.7589371,"lng":-86.9634247,"description":"Restaurante asiático","source":"Google Maps","verified":true,"tipo":"especialidad","cocina":"Internacional / Mediterráneo de Especialidad","cuisine":"International / Mediterranean Specialty","carta":"Entrantes: Selección de tapas y mezze mediterráneo (hummus con pan pita, aceitunas marinadas), ensalada griega con queso feta y aderezo de limón con orégano, crema ligera de espárragos y hierbas frescas. Platos Fuertes: Filete de pescado fresco sellado al sartén marinado con emulsión de limón amarillo, hierbas y alcaparras; cordero asado con costra de especias dulces y romero; pechuga de pollo confitada con toques de romero, ajo y reducción cítrica; opciones vegetarianas con verduras rostizadas al grill y cuscús aromático. Postres: Mousse ligera de limón con merengue flameado, tarta de higos o tartaleta de manzana especiada con canela.","menu":"Appetizers: Mediterranean tapas and mezze selection (hummus with pita bread, marinated olives), Greek salad with feta cheese and lemon-oregano dressing, light asparagus and fresh herbs cream. Main Courses: Seared fresh fish fillet marinated with yellow lemon emulsion, herbs and capers; roasted lamb with sweet spice crust and rosemary; confit chicken breast with rosemary, garlic and citrus reduction; vegetarian options with grilled vegetables and aromatic couscous. Desserts: Light lemon mousse with flamed meringue, fig tart or cinnamon-spiced apple tartlet.","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Smart Casual","dressCode":"Smart Casual","reservas":true,"reservation":true,"especialidades":"Tapas y mezze mediterráneo, hummus con pan pita, ensalada griega con queso feta, crema de espárragos, filete de pescado fresco, cordero asado con especias dulces y romero, pollo confitado, verduras rostizadas al grill, cuscús aromático, mousse de limón con merengue flameado, tarta de higos, tartaleta de manzana especiada.","specialties":"Mediterranean tapas and mezze, hummus with pita bread, Greek salad with feta cheese, asparagus cream, seared fresh fish fillet, roasted lamb with sweet spice crust and rosemary, confit chicken breast, grilled vegetables, aromatic couscous, light lemon mousse with flamed meringue, fig tart, cinnamon-spiced apple tartlet.","signatureDishes":["Hummus con pan pita","Ensalada griega con queso feta","Filete de pescado fresco con emulsión de limón amarillo","Cordero asado con costra de especias dulces y romero","Pechuga de pollo confitada","Mousse ligera de limón con merengue flameado","Tarta de higos","Tartaleta de manzana especiada con canela"]},
    {"id":"under-the-sea","name":"American Seafood Grill Under the Sea","category":"restaurante","hotelId":"Iberostar Selection Paraíso Maya","lat":20.75687,"lng":-86.95974,"description":"Restaurante de mariscos","source":"Google Maps","verified":true,"tipo":"especialidad","cocina":"Especialidad de Mariscos","cuisine":"Seafood Specialty","carta":"Entrantes y Sopas: Cóctel clásico de camarón en salsa coctelera casera, ceviche mixto de pescado blanco y calamar marinado con lima, sopa espesa de almejas y mariscos (clam chowder). Platos Fuertes: Filete de salmón sellado a la parrilla sobre cama de vegetales al vapor, brochetas de camarones jumbo marinados con ajo y pimentón, parrillada mixta de mariscos (pesca del día, calamar y mejillones), lomo de res con cola de langosta/camarones (estilo surf and turf). Menú Infantil: Dedos de pescado crujientes con papas a la francesa, pasta con mantequilla o salsa de tomate. Postres: Tarta de queso americana con coulis de frambuesa, helados tropicales y pastel de chocolate cremoso.","menu":"Starters and Soups: Classic shrimp cocktail with homemade cocktail sauce, mixed ceviche of white fish and squid marinated with lime, thick clam and seafood chowder soup. Main Courses: Grilled seared salmon fillet over steamed vegetables, jumbo shrimp skewers marinated with garlic and paprika, mixed seafood grill (catch of the day, squid and mussels), beef tenderloin with lobster tail/shrimp (surf and turf style). Kids Menu: Crispy fish fingers with french fries, pasta with butter or tomato sauce. Desserts: American cheesecake with raspberry coulis, tropical ice creams and creamy chocolate cake.","horario":"18:00 - 22:00 h","hours":"18:00 - 22:00","vestimenta":"Smart Casual","dressCode":"Smart Casual","reservas":true,"reservation":true,"especialidades":"Cóctel clásico de camarón, ceviche mixto de pescado blanco y calamar, sopa espesa de almejas y mariscos, filete de salmón a la parrilla, brochetas de camarones jumbo, parrillada mixta de mariscos, lomo de res con cola de langosta, dedos de pescado crujientes, pasta con mantequilla, tarta de queso americana con coulis de frambuesa, helados tropicales, pastel de chocolate cremoso.","specialties":"Classic shrimp cocktail, mixed ceviche of white fish and squid, thick clam and seafood chowder, grilled seared salmon fillet, jumbo shrimp skewers, mixed seafood grill, beef tenderloin with lobster tail (surf and turf), crispy fish fingers, pasta with butter or tomato sauce, American cheesecake with raspberry coulis, tropical ice creams, creamy chocolate cake.","signatureDishes":["Cóctel clásico de camarón","Ceviche mixto de pescado blanco y calamar","Sopa espesa de almejas y mariscos","Filete de salmón sellado a la parrilla","Brochetas de camarones jumbo","Parrillada mixta de mariscos","Lomo de res con cola de langosta","Tarta de queso americana con coulis de frambuesa"]},
    {"id":"la-brisa","name":"Ember Steak House / La Brisa","category":"restaurante","categories":["restaurante","bar"],"hotelId":"JOIA Paraíso by Iberostar","lat":20.7546463,"lng":-86.9597269,"description":"","carta":"Ember (Steak House)\n\nDatos: 18:30 – 22:00 h · Casual Elegante · Reserva recomendada.\n\nES: Cortes premium a la parrilla (Ribeye, New York, Filet Mignon, Arrachera) con salsas y guarniciones clásicas, además de entradas de asador como carpaccio de res, empanadas y sopas.\n\nEN: Premium grilled cuts (Ribeye, New York, Filet Mignon, flank steak) with classic sauces and sides, alongside traditional steakhouse starters like beef carpaccio, empanadas, and soups.\n\nLa Brisa\n\nDatos: 11:30 – 16:00 h · Casual de playa · Sin reserva.\n\nES: Almuerzo frente al mar (buffet y a la carta) con mariscos frescos, ceviches, parrilla al momento (pesca del día, hamburguesas), tacos, pizzas y postres tropicales.\n\nEN: Oceanfront buffet and à la carte lunch featuring fresh seafood, ceviches, a made-to-order grill (catch of the day, burgers), tacos, pizzas, and tropical desserts.","menu":"Ember (Steak House)\n\nData: 18:30 – 22:00 h · Smart Casual · Reservation recommended.\n\nES: Cortes premium a la parrilla (Ribeye, New York, Filet Mignon, Arrachera) con salsas y guarniciones clásicas, además de entradas de asador como carpaccio de res, empanadas y sopas.\n\nEN: Premium grilled cuts (Ribeye, New York, Filet Mignon, flank steak) with classic sauces and sides, alongside traditional steakhouse starters like beef carpaccio, empanadas, and soups.\n\nLa Brisa\n\nData: 11:30 – 16:00 h · Beach Casual · No reservation.\n\nES: Almuerzo frente al mar (buffet y a la carta) con mariscos frescos, ceviches, parrilla al momento (pesca del día, hamburguesas), tacos, pizzas y postres tropicales.\n\nEN: Oceanfront buffet and à la carte lunch featuring fresh seafood, ceviches, a made-to-order grill (catch of the day, burgers), tacos, pizzas, and tropical desserts.", "horario":"Ember (Steak house): 18:30 – 22:00 h\nLa Brisa: 11:30 – 16:00 h","hours":"Ember (Steakhouse): 18:30 – 22:00\nLa Brisa: 11:30 – 16:00","verified":true,"tipo":"especialidad","cocina":"Ember: Especialidad — Cortes de carne a la parrilla · La Brisa: Restaurante de alberca / Almuerzo frente al mar","cuisine":"Ember: Specialty — Grilled premium meat cuts · La Brisa: Pool restaurant / Beachfront lunch","vestimenta":"Ember: Casual Elegante (Smart Casual) · La Brisa: Casual de playa / Informal","dressCode":"Ember: Smart Casual · La Brisa: Beach casual / Informal","reservas":"Ember: Recomendada · La Brisa: No requerida","reservation":"Ember: Recomendada · La Brisa: No requerida","especialidades":"Ember: Cortes de carne premium a la parrilla (Ribeye, Filet Mignon), empanadas argentinas, carpaccio de res. · La Brisa: Ceviches y aguachiles frescos, pesca del día a la parrilla, pizzas, comida relajada de alberca.","specialties":"Ember: Premium grilled meat cuts (Ribeye, Filet Mignon), Argentine empanadas, beef carpaccio. · La Brisa: Fresh ceviches and aguachiles, grilled catch of the day, pizzas, relaxed pool dining.","signatureDishes":["Ember: Ribeye","Ember: Filet Mignon","Ember: Empanadas argentinas","Ember: Carpaccio de res","La Brisa: Ceviches y aguachiles frescos","La Brisa: Pesca del día a la parrilla","La Brisa: Pizzas"]},
    {"id":"punta-sal-ceviche","name":"Punta Sal Ceviche & Beach Bar","category":"bar","hotelId":"JOIA Paraíso by Iberostar","lat":20.754750,"lng":-86.959584,"description":"Ceviche & Beach Bar frente al mar; bebidas en la arena de 10:00 a 18:00 h","verified":true,"carta":"Ceviches frescos · Tiraditos · Cócteles de mariscos · Cervezas artesanales · Vinos blancos · Margaritas de frutas tropicales","menu":"Fresh ceviches · Tiraditos · Seafood cocktails · Craft beers · White wines · Tropical fruit margaritas","horario":"10:00 - 18:00 h","hours":"10:00 - 18:00"},
    {"id":"grand-cellar","name":"The Grand Cellar / Wine Cellar","category":"snacks","hotelId":"JOIA Paraíso by Iberostar","lat":20.756344,"lng":-86.962658,"description":"The Wine Cellar (Cava de Vinos). Coordenadas: 20.756344, -86.962658. Horarios de Cata: 17:00 y 19:00 h. Operación diaria: Degustaciones programadas de Lunes a Domingo. Costo: $700 MXN por persona lunes a sábado, $1,400 MXN domingos. Catas privadas disponibles contactando a Concierge.","verified":true,"carta":"Menú (Cata y Maridaje por día): Lunes y Miércoles (Tequila/Mezcal y Vinos Mexicanos): queso Oaxaca ahumado, chicharrón, sikil pak, chapulines y mermelada de chile. Martes (Vinos Españoles): queso manchego, Idiazábal, Mahón, jamón serrano y embutido ibérico. Jueves (Vinos Argentinos): tabla de carne con queso, chorizo, camarón y empanadas con chimichurri. Viernes (Vinos Italianos): burrata trufada, Asiago, provolone, coppa y prosciutto. Sábado y Domingo (Vinos del Nuevo Mundo y Burbujas): queso camembert, queso azul, paté de campaña y paté en croûte.","menu":"Menu (Tasting and Pairing by day): Monday and Wednesday (Tequila/Mezcal and Mexican Wines): smoked Oaxaca cheese, chicharrón, sikil pak, chapulines and chili jam. Tuesday (Spanish Wines): manchego, Idiazábal, Mahón, serrano ham and Iberian sausage. Thursday (Argentine Wines): meat board with cheese, chorizo, shrimp and chimichurri empanadas. Friday (Italian Wines): truffled burrata, Asiago, provolone, coppa and prosciutto. Saturday and Sunday (New World Wines and Sparkling): camembert, blue cheese, country pâté and pâté en croûte.","horario":"Catas 17:00 y 19:00 h · Lunes a Domingo","hours":"Tastings 5:00 PM and 7:00 PM · Monday to Sunday","vestimenta":"Casual Elegante (Smart Casual)","dressCode":"Smart Casual","reservas":true,"reservation":true,"especialidades":"Catas de vino privadas, maridaje guiado por sommelier experto y botellas de colección","specialties":"Private wine tastings, sommelier-guided pairing, and collection bottles"},
    {"id":"joia-cafe","name":"Star Cafe JOIA","category":"snacks","hotelId":"JOIA Paraíso by Iberostar","lat":20.756068,"lng":-86.962852,"description":"Star Café (Lobby JOIA Paraíso). Coordenadas: 20.756068, -86.962852. Horario: Abierto 24 horas. Operación diaria: Horario continuo (24 h) · Lunes a Domingo.","verified":true,"tipo":"cafeteria","cocina":"Coffee Shop & Snacks","cuisine":"Coffee Shop & Snacks","carta":"Menú (Bebidas y Coffee Shop): cafés tradicionales (espresso, capuchino, latte), especialidades (caramel macchiato, moca blanco) y barra de frappés (café, caramelo, moca, chocolate blanco). También sirven tés calientes (chai, negro, verde, manzanilla) y tés fríos (frutos rojos, limón y jengibre, limonada de durazno). Opciones de leche: entera, light, deslactosada, semi, soja y almendra. Acompañado de panadería, sándwiches fríos, ensaladas y postres.","menu":"Menu (Drinks and Coffee Shop): traditional coffees (espresso, cappuccino, latte), specialties (caramel macchiato, white mocha) and frappé bar (coffee, caramel, mocha, white chocolate). Also hot teas (chai, black, green, chamomile) and cold teas (red fruits, lemon and ginger, peach lemonade). Milk options: whole, light, lactose-free, semi, soy and almond. Accompanied by bakery, cold sandwiches, salads and desserts.","horario":"Abierto 24 horas","hours":"Open 24 hours","vestimenta":"Casual / Informal","dressCode":"Casual / Informal","reservas":false,"reservation":false,"especialidades":"Café barista, sándwiches fríos, panadería dulce y repostería disponible las 24 horas","specialties":"Barista coffee, cold sandwiches, sweet bakery and pastries available 24 hours"},
    {"id":"baby-kitchen","name":"Baby Kitchen","category":"servicio","lat":20.758029,"lng":-86.963437,"description":"Cocina para bebés","verified":true});
  POIS.push(
    {"id":"sports-bar-corner","name":"Sports Bar Corner","category":"bar","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.7596764,"lng":-86.9634133,"description":"Sports bar","verified":true,"carta":"Cervezas · Alitas · Nachos · Hamburguesas · Cócteles","menu":"Beers · Wings · Nachos · Burgers · Cocktails"},
    // "Heladería El Puente" (20.758672,-86.959008, Paraíso del Mar).
    {"id":"starcafe","name":"Star Rock Café — Paraíso del Mar","category":"snacks","hotelId":"Iberostar Selection Paraíso del Mar","lat":20.7618856,"lng":-86.9627721,"description":"Star Rock Café — Paraíso del Mar","verified":true,"source":"Google Maps","tipo":"cafeteria","cocina":"Coffee Shop & Snacks","cuisine":"Coffee Shop & Snacks","carta":"Desayuno rápido · Comida ligera · Cena · Antojos de madrugada","menu":"Quick breakfast · Light lunch · Dinner · Late-night snacks","horario":"Horario continuo (24 horas) · Lunes a Domingo · Desayuno rápido, comida ligera, cena o antojos de madrugada sin interrupción","hours":"Continuous hours (24 hours) · Monday-Sunday · Quick breakfast, light lunch, dinner or late-night snacks without interruption"},
    {"id":"star-rock-cafe-lindo","name":"Star Cafe - Shopping Center","category":"snacks","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.760072,"lng":-86.965257,"description":"Star Cafe - Shopping Center","verified":true,"source":"Google Maps","tipo":"cafeteria","cocina":"Coffee Shop & Snacks","cuisine":"Coffee Shop & Snacks","carta":"Desayuno rápido · Comida ligera · Cena · Antojos de madrugada","menu":"Quick breakfast · Light lunch · Dinner · Late-night snacks","horario":"Horario continuo (24 horas) · Lunes a Domingo · Desayuno rápido, comida ligera, cena o antojos de madrugada sin interrupción","hours":"Continuous hours (24 hours) · Monday-Sunday · Quick breakfast, light lunch, dinner or late-night snacks without interruption","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Servicio continuo de desayuno rápido, comida ligera, cena y antojos de madrugada.","specialties":"Continuous service of quick breakfast, light lunch, dinner and late-night snacks."},
    {"id":"paraiso-maya-cafe","name":"Lobby Café Iberostar Selection Paraíso Maya","category":"snacks","hotelId":"Iberostar Selection Paraíso Maya","lat":20.757492,"lng":-86.964523,"description":"Lobby Iberostar Selection Paraíso Maya","verified":true,"tipo":"cafeteria","cocina":"Coffee Shop & Snacks","cuisine":"Coffee Shop & Snacks","carta":"Café de especialidad (espresso, capuchino, frappés) · Tés e infusiones · Panadería recién horneada (croissants, muffins, pan dulce) · Sándwiches fríos · Wraps · Ensaladas frescas · Fruta picada · Postres individuales","menu":"Specialty coffee (espresso, cappuccino, frappés) · Teas and infusions · Freshly baked pastries (croissants, muffins, sweet bread) · Cold sandwiches · Wraps · Fresh salads · Sliced fruit · Individual desserts","horario":"Abierto 24 horas","hours":"Open 24 hours","vestimenta":"Casual / Informal","dressCode":"Casual / Informal","reservas":false,"reservation":false,"especialidades":"Café barista, sándwiches fríos, panadería dulce y repostería disponible las 24 horas","specialties":"Barista coffee, cold sandwiches, sweet bakery and pastries available 24 hours"},
    {"id":"pool-bar-las-olas","name":"Pool Bar Las Olas","category":"bar","lat":20.757897,"lng":-86.961767,"description":"Bar de piscina","verified":true,"carta":"Cócteles tropicales · Piñas coladas · Daiquiris · Cervezas · Refrescos","menu":"Tropical cocktails · Piña coladas · Daiquiris · Beers · Soft drinks"},
    {"id":"lobby-bar-kukulkan","name":"Lobby Bar Kukulkán","category":"bar","hotelId":"Iberostar Selection Paraíso Maya","lat":20.7575018,"lng":-86.9645296,"description":"Lobby bar","verified":true,"carta":"Cócteles de autor · Vinos · Whiskys · Café · Té","menu":"Signature cocktails · Wines · Whiskies · Coffee · Tea","horario":"09:00 - 01:00 h","hours":"09:00 - 01:00"},
    {"id":"music-bar-rhapsody","name":"Music Bar Rhapsody","category":"bar","lat":20.756312,"lng":-86.962411,"hotelId":"Iberostar Selection Paraíso Maya","description":"Music bar","verified":true,"carta":"Cócteles · Cervezas · Vinos · Tapas · Música en vivo","menu":"Cocktails · Beers · Wines · Tapas · Live music"},
    {"id":"lobby-bar-el-mirador","name":"Lobby Bar El Mirador","category":"bar","hotelId":"JOIA Paraíso by Iberostar","lat":20.756335,"lng":-86.962712,"description":"Lobby bar","verified":true,"carta":"Cócteles premium · Champán · Vinos finos · Café gourmet","menu":"Premium cocktails · Champagne · Fine wines · Gourmet coffee"},
    {"id":"aqua-bar-la-sirenita","name":"Aqua Bar La Sirenita","category":"bar","lat":20.754775,"lng":-86.960108,"hotelId":"Iberostar Selection Paraíso Maya","description":"Aqua bar","verified":true,"carta":"Cócteles refrescantes · Zumos · Batidos · Cervezas","menu":"Refreshing cocktails · Juices · Smoothies · Beers"},
    {"id":"health-bar-spa","name":"Health Bar SPA","category":"bar","lat":20.756025,"lng":-86.961423,"hotelId":"Iberostar Selection Paraíso Maya","description":"Health bar","verified":true,"carta":"Zumos detox · Batidos saludables · Tés · Agua infusionada","menu":"Detox juices · Healthy smoothies · Teas · Infused water"},
    {"id":"aqua-bar-la-perla","name":"Aqua Bar La Perla","category":"starprestige","hotelId":"Iberostar Selection Paraíso del Mar","lat":20.759537490303693,"lng":-86.96006196166931,"description":"Pool Star Prestige - Bar de la Perla","verified":true,"carta":"Cócteles refrescantes · Zumos naturales · Batidos · Cervezas","menu":"Refreshing cocktails · Natural juices · Smoothies · Beers"},
    {"id":"bar-teatro","name":"Bar Teatro","category":"bar","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.759376,"lng":-86.962659,"description":"Bar de teatro","verified":true,"carta":"Cócteles · Vinos · Cervezas · Aperitivos","menu":"Cocktails · Wines · Beers · Appetizers"},
    {"id":"lobby-bar-la-fuente","name":"Lobby Bar La Fuente","category":"bar","hotelId":"JOIA Paraíso by Iberostar","lat":20.7609293,"lng":-86.9639926,"description":"Lobby bar","carta":"Cócteles clásicos · Vinos · Licores · Café · Té","menu":"Classic cocktails · Wines · Spirits · Coffee · Tea"},
    {"id":"aqua-bar-las-olas","name":"Aqua Bar Las Olas","category":"bar","hotelId":"Iberostar Selection Paraíso Maya","lat":20.7586198,"lng":-86.9590972,"description":"Aqua bar (zona de playa)","verified":true,"carta":"Cócteles de playa · Piñas coladas · Mojitos · Cervezas frías","menu":"Beach cocktails · Piña coladas · Mojitos · Cold beers"},
    {"id":"lobby-bar-la-cula","name":"Lobby Bar La Cúpula","category":"bar","hotelId":"Iberostar Selection Paraíso Maya","lat":20.762207,"lng":-86.9629327,"description":"Lobby bar","carta":"Cócteles · Vinos · Licores · Café · Té","menu":"Cocktails · Wines · Spirits · Coffee · Tea"},
    {"id":"aqua-bar-las-rocas","name":"Aqua Bar Las Rocas","category":"bar","hotelId":"Iberostar Selection Paraíso Maya","lat":20.7571518,"lng":-86.9604151,"description":"Aqua bar","carta":"Cócteles · Cervezas · Refrescos · Snacks","menu":"Cocktails · Beers · Soft drinks · Snacks"},
    {"id":"lobby-bar-acuario","name":"Lobby Bar Acuario","category":"bar","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.7595512,"lng":-86.963491,"description":"Lobby bar","verified":true,"carta":"Cócteles · Vinos · Cervezas · Café · Snacks","menu":"Cocktails · Wines · Beers · Coffee · Snacks"},
    {"id":"cigar-bar","name":"Cigar Bar","category":"bar","hotelId":"Iberostar Selection Paraíso Maya","lat":20.7593191,"lng":-86.9656938,"description":"Cigar bar","carta":"Puros premium · Whiskys · Cognacs · Licores","menu":"Premium cigars · Whiskies · Cognacs · Spirits"},
    {"id":"heladeria-el-puente","name":"Heladería El Puente","category":"snacks","hotelId":"Iberostar Selection Paraíso del Mar","lat":20.758672,"lng":-86.959008,"description":"Heladería El Puente","verified":true,"tipo":"cafeteria","cocina":"Heladería y snacks","cuisine":"Ice cream parlor and snacks","carta":"Helados artesanales variados, paletas, crepas dulces y café.","menu":"Assorted artisan ice cream, popsicles, sweet crepes and coffee.","horario":"Desayuno cerrado · Comida / Snack 11:00 - 18:00 h · Cena cerrada · Lunes a Domingo","hours":"Breakfast closed · Lunch / Snack 11:00 - 18:00 h · Dinner closed · Monday-Sunday","vestimenta":"Informal","dressCode":"Informal","reservas":false,"reservation":false,"especialidades":"Helados artesanales variados, paletas, crepas dulces y café.","specialties":"Assorted artisan ice cream, popsicles, sweet crepes and coffee."},
    {"id":"bar-el-kiosko","name":"El Kiosko Bar","category":"bar","hotelId":"Iberostar Selection Paraíso del Mar","lat":20.757810,"lng":-86.958304,"description":"Bar de playa frente al mar","verified":true,"carta":"Cócteles tropicales · Piñas coladas · Mojitos · Cervezas · Snacks de playa","menu":"Tropical cocktails · Piña coladas · Mojitos · Beers · Beach snacks"}),
  POIS.push(
    {"id":"waterfall-jacuzzi","name":"Cascada y jacuzzi","category":"piscina","lat":20.759539,"lng":-86.960991,"description":"Water fall & jacuzzi","verified":true},
    {"id":"quiet-pool","name":"Piscina tranquila","category":"piscina","lat":20.759600,"lng":-86.960224,"description":"Quiet pool","verified":true},
    {"id":"activities-pool","name":"Piscina de actividades","category":"piscina","lat":20.759267,"lng":-86.959714,"description":"Activities pool","verified":true},
    {"id":"lazy-river","name":"Río lento","nameEn":"Lazy river","category":"piscina","description":"Río lento","descriptionEn":"Lazy river"},
    {"id":"sports-pool","name":"Piscina deportiva","category":"piscina","description":"Sports pool"},
    {"id":"wave-pool","name":"Piscina de olas","category":"piscina","description":"Wave pool"},
    {"id":"jacuzzi","name":"Jacuzzi","category":"piscina","lat":20.757415,"lng":-86.960793,"description":"Jacuzzi","verified":true},
    {"id":"private-pool","name":"Piscina privada","nameEn":"Private pool","category":"piscina","lat":20.756499,"lng":-86.960229,"description":"Piscina privada","descriptionEn":"Private pool","verified":true},
    {"id":"indoor-pool","name":"Piscina cubierta","category":"piscina","lat":20.756076,"lng":-86.961331,"description":"Indoor pool","verified":true},
    {"id":"main-pool","name":"Piscina principal","category":"piscina","lat":20.754701,"lng":-86.960497,"description":"Main pool","verified":true},
    {"id":"mini-water-playground","name":"Mini parque acuático","category":"piscina","description":"Mini water playground"},
    {"id":"massage-palapa","name":"Palapas de masajes","category":"spa","lat":20.758252,"lng":-86.957775,"description":"Massage palapa","verified":true});
  POIS.push(
    {"id":"tennis","name":"Tenis","category":"deportes","lat":20.760289,"lng":-86.964375,"description":"Tennis","verified":true},
    {"id":"tenis-paraiso-lindo","name":"Tenis Paraíso Lindo","category":"deportes","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.758833,"lng":-86.964598,"description":"Cancha de tenis Paraíso Lindo","verified":true},
    {"id":"shooting-area","name":"Campo de tiro","category":"deportes","lat":20.761933,"lng":-86.962473,"description":"Shooting area","verified":true},
    {"id":"diving-center","name":"Centro de buceo","category":"deportes","description":"Diving center"},
    {"id":"golf-club-house","name":"Golf Club House","category":"golf","description":"Golf club house"},
    {"id":"teatro-music-hall","name":"Teatro Music Hall","category":"entretenimiento","lat":20.7591882,"lng":-86.9627312,"description":"Teatro","verified":true},
    {"id":"teatro-coliseo","name":"Teatro Coliseo","category":"entretenimiento","hotelId":"JOIA Paraíso by Iberostar","lat":20.756739,"lng":-86.962693,"description":"Teatro","verified":true},
    {"id":"games-room","name":"Sala de juegos","category":"entretenimiento","description":"Games room"},
    // El "Casino" del plano es en realidad el "Teatro Mar-Playa" (Google Maps)
    {"id":"teatro-mar-playa","name":"Teatro Mar-Playa","category":"entretenimiento","lat":20.7608353,"lng":-86.9625428,"description":"Teatro","verified":true},
    {"id":"shopping-mall","name":"Centro comercial","category":"comer","lat":20.759933,"lng":-86.965830,"description":"Shopping mall","verified":true},
    {"id":"starmarket","name":"Starmarket","category":"comer","description":"Starmarket"},
    {"id":"shop-tienda","name":"Shop / Tienda","category":"comer","lat":20.762215,"lng":-86.963121,"description":"Shop / Tienda","verified":true},
    {"id":"pool-shop","name":"Tienda de piscina","category":"comer","lat":20.758561,"lng":-86.959673,"description":"Pool shop","verified":true},
    {"id":"meeting-room","name":"Sala de juntas","category":"conv","lat":20.760629,"lng":-86.963838,"description":"Sala de juntas","verified":true},
    {"id":"billiards-library","name":"Internet, billar, biblioteca","category":"servicio","lat":20.760721,"lng":-86.963638,"description":"Billiards, library","verified":true},
    {"id":"medical-center","name":"Centro médico","category":"servicio","lat":20.759144,"lng":-86.964771,"description":"Medical center","verified":true},
    {"id":"drugstore","name":"Farmacia","category":"servicio","lat":20.759826,"lng":-86.965208,"description":"Drugstore","verified":true},
    {"id":"preview-gallery","name":"Preview Gallery","category":"club","lat":20.757715,"lng":-86.964923,"description":"Preview Gallery (The Club)","verified":true},
    {"id":"head-concierge","name":"Head Concierge","category":"concierge","lat":20.759753,"lng":-86.965457,"description":"Head Concierge","verified":true},
    {"id":"star-prestige-lounge","name":"Star Prestige Lounge","category":"starprestige","hotelId":null,"lat":20.754739,"lng":-86.959533,"description":"Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas","verified":true},
    {"id":"star-prestige-beach-club","name":"Star Prestige Beach Club","category":"starprestige","hotelId":"JOIA Paraíso by Iberostar","lat":20.756829,"lng":-86.958688,"description":"Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas","verified":true},
    {"id":"star-prestige-del-mar","name":"Star Prestige del Mar","category":"starprestige","hotelId":"Iberostar Selection Paraíso del Mar","lat":20.762034,"lng":-86.962601,"description":"Área Star Prestige en Paraíso del Mar con servicio exclusivo y atención preferente.","hours":"07:00 - 23:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas","verified":true},
    {"id":"courtesy-room","name":"Duchas de cortesía","category":"servicio","lat":20.758045,"lng":-86.964554,"description":"Courtesy room","verified":true},
    {"id":"wedding-chapel","name":"Capilla de bodas","category":"servicio","description":"Wedding chapel"},
    {"id":"star-friends-desk","name":"Star Friends Desk","category":"kids","lat":20.755117,"lng":-86.961373,"description":"Star Friends Desk","verified":true},
    // --- Nuevos POIs del plano oficial no existentes en catálogo previo ---
    {"id":"beach-bar","name":"Beach Bar / Bar de playa","category":"bar","hotelId":"Iberostar Selection Paraíso del Mar","lat":20.757856,"lng":-86.958359,"description":"Bar de playa","verified":true,"carta":"Cócteles de playa · Piñas coladas · Mojitos · Cervezas · Snacks","menu":"Beach cocktails · Piña coladas · Mojitos · Beers · Snacks"},
    {"id":"buffet-la-marina","name":"La Marina","category":"restaurante","hotelId":"Iberostar Selection Paraíso Maya","lat":20.757842,"lng":-86.963819,"description":"Restaurante de mariscos en Iberostar Selection Paraíso Maya, con buffet mediterráneo al mediodía y cena a la carta; acceso compartido desde Paraíso Lindo.","verified":true,"tipo":"especialidad","cocina":"Restaurante de Mariscos · Buffet Mediterráneo","cuisine":"Seafood Restaurant · Mediterranean Buffet","carta":"Comida (12:00 - 16:00 h): Buffet Mediterráneo e Internacional frente a la alberca y playa. Cena (18:30 - 22:00 h): Especialidad a la carta en Pescados y Mariscos.","menu":"Lunch (12:00 - 16:00 h): Mediterranean and international buffet by the pool and beach. Dinner (18:30 - 22:00 h): A la carte fish and seafood specialty.","horario":"Desayuno cerrado · Comida (Buffet) 12:00 - 16:00 h · Cena (Mariscos a la carta) 18:30 - 22:00 h · Lunes a Domingo","hours":"Breakfast closed · Lunch (Buffet) 12:00 - 16:00 h · Dinner (A la carte seafood) 18:30 - 22:00 h · Monday-Sunday","vestimenta":"Casual de playa (almuerzo) / Smart Casual (cena)","dressCode":"Beach casual (lunch) / Smart Casual (dinner)","especialidades":"Buffet Mediterráneo e Internacional frente a la alberca y playa; cena a la carta de pescados y mariscos.","specialties":"Mediterranean and international buffet by the pool and beach; a la carte fish and seafood dinner.","signatureDishes":["Buffet Mediterráneo e Internacional","Pescados y Mariscos a la carta","Vista a la alberca y playa","Acceso compartido con Paraíso Lindo"]},
  );

  // Eliminados a petición del usuario (2026-10-22): "surprise-gf", "surprise-2f" y "shushi"
    // (Restaurant Surprise, planta baja y 2º nivel, y Restaurant Shushi, sin coordenadas verificadas).

  // Instalaciones por hotel con coordenadas confirmadas manualmente
  // (recorrido del complejo + enlaces de Google Maps).
  POIS.push(
    {"id":"concierge-lindo","name":"Concierge Paraíso Lindo","category":"concierge","hotelId":"Iberostar Waves Paraíso Lindo","lat":20.759481,"lng":-86.963898,"description":"Concierge del hotel","verified":true},
    {"id":"star-prestige-maya","name":"Star Prestige Paraíso Maya","category":"starprestige","hotelId":"Iberostar Selection Paraíso Maya","lat":20.757650,"lng":-86.964755,"description":"Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas","verified":true},
    // "Star Café Maya" era en realidad el Lobby Bar Kukulkán (mismo punto); se
    // consolidó con sus coordenadas verificadas en "lobby-bar-kukulkan".
    {"id":"spa-joia","name":"Spa Sensations","category":"spa","hotelId":"JOIA Paraíso by Iberostar","lat":20.755878,"lng":-86.961372,"description":"Spa del hotel JOIA","verified":true},
    {"id":"fit-fun-joia","name":"Fit & Fun JOIA","category":"deportes","hotelId":"JOIA Paraíso by Iberostar","lat":20.7560274,"lng":-86.9611985,"description":"Gimnasio Fit & Fun","verified":true},
    {"id":"concierge-joia","name":"Concierge JOIA","category":"concierge","hotelId":"JOIA Paraíso by Iberostar","lat":20.756125,"lng":-86.962989,"description":"Concierge del hotel JOIA","verified":true},
    {"id":"legado","name":"Legado","category":"restaurante","hotelId":"JOIA Paraíso by Iberostar","lat":20.754923,"lng":-86.961316,"description":"Restaurante mexicano","verified":true,"tipo":"especialidad","cocina":"Mexicana de Especialidad","cuisine":"Mexican Specialty","carta":"Entrantes: Carpaccio Prime, tartar de atún, ensaladas Wedge/César y crema de almejas. · Cortes y Platos Fuertes: Rib Eye, New York Strip, Filet Mignon, costillar de cordero, Surf & Turf con langosta y salmón. · Guarniciones: Papa horneada, puré trufado, espárragos, mac & cheese y champiñones. · Postres: Cheesecake, volcán de chocolate, tarta de manzana y sorbetes.","menu":"Starters: Prime Carpaccio, tuna tartar, Wedge/Caesar salads, clam chowder. · Cuts & Mains: Rib Eye, New York Strip, Filet Mignon, lamb chops, Surf & Turf with lobster & salmon. · Sides: Baked potato, truffle mash, asparagus, mac & cheese, mushrooms. · Desserts: Cheesecake, chocolate lava cake, apple tart, sorbets.","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Smart Casual","dressCode":"Smart Casual","reservas":true,"reservation":true,"especialidades":"Rib Eye Prime, New York Strip, Filet Mignon, Costillar de Cordero, Surf & Turf Toni's, Cola de Langosta, Salmón Noruego","specialties":"Rib Eye Prime, New York Strip, Filet Mignon, Herb-Crusted Lamb Chops, Surf & Turf Toni's, Grilled Lobster Tail, Pan-Seared Norwegian Salmon"},
    {"id":"star-prestige-joia","name":"Star Prestige JOIA","category":"starprestige","hotelId":"JOIA Paraíso by Iberostar","lat":20.756156,"lng":-86.962287,"description":"Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.","hours":"09:00 - 21:00","amenities":"Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks","services":"Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas","verified":true},
    {"id":"concierge-grand-paraiso","name":"Concierge Grand Paraíso (Edificio 71)","category":"concierge","hotelId":"JOIA Paraíso by Iberostar","lat":20.753724,"lng":-86.960434,"description":"Concierge de Grand Paraíso","verified":true},
    {"id":"spa-grand-paraiso","name":"Spa Grand Paraíso","category":"spa","hotelId":"JOIA Paraíso by Iberostar","lat":20.753233,"lng":-86.960193,"description":"Spa de Grand Paraíso","verified":true},
    {"id":"fit-fun-grand-paraiso","name":"Fit & Fun Grand Paraíso","category":"deportes","hotelId":"JOIA Paraíso by Iberostar","lat":20.757618,"lng":-86.958517,"description":"Gimnasio Fit & Fun de Grand Paraíso","verified":true},
    {"id":"fit-fun-playa-paraiso","name":"Fit&Fun Playa Paraíso","category":"deportes","lat":20.7603125,"lng":-86.9645625,"description":"Gimnasio Fit&Fun en la zona de playa","verified":true},
    {"id":"bar-el-puente","name":"Bar El Puente","category":"bar","hotelId":"Iberostar Selection Paraíso Maya","lat":20.757166,"lng":-86.960961,"description":"Pool bar junto al puente y río lento","verified":true,"carta":"Piña colada, margaritas, mojitos, daiquiris, Miami Vice · Cervezas nacionales (Corona, Modelo, Pacífico) · Tequila, ron, vodka, ginebra, whisky · Congas caribeñas, limonadas, smoothies, refrescos · Cacahuates y totopos con salsas","menu":"Piña colada, margaritas, mojitos, daiquiris, Miami Vice · Draft & bottled beers (Corona, Modelo, Pacífico) · Tequila, rum, vodka, gin, whisky · Virgin piña coladas, lemonades, smoothies, sodas · Peanuts and tortilla chips with salsa","horario":"10:00 - 18:00 h","hours":"10:00 - 18:00","vestimenta":"Ropa de playa / traje de baño","dressCode":"Beachwear / swimwear","reservas":false,"reservation":false},
    {"id":"el-colonial","name":"El Colonial","category":"restaurante","lat":20.7609943,"lng":-86.963447,"description":"Restaurant","verified":true,"tipo":"especialidad","cocina":"Gourmet / Francesa","cuisine":"Gourmet / French","carta":"Bisque de bogavante al coñac · Magret de pato con reducción de frutos rojos · Solomillo de res al vino tinto · Créme brûlée tradicional","menu":"Lobster bisque with cognac · Duck magret with red fruit sauce · Beef tenderloin in red wine · Traditional créme brûlée","horario":"18:30 - 22:00 h","hours":"18:30 - 22:00","vestimenta":"Formal elegante","dressCode":"Formal elegant","reservas":true,"reservation":true,"especialidades":"Bisque de bogavante al coñac, magret de pato con reducción de frutos rojos, solomillo de res al vino tinto y créme brûlée tradicional","specialties":"Lobster bisque with cognac, duck magret with red fruit sauce, beef tenderloin in red wine and traditional créme brûlée","hotel":"Iberostar Waves Paraíso Beach"},
    {"id":"trattoria","name":"Trattoria by El Faro","category":"restaurante","lat":20.7589509,"lng":-86.9583723,"description":"Trattoria by El Faro","verified":true,"tipo":"especialidad","cocina":"Italiana Tradicional & Pizzería","cuisine":"Traditional Italian & Pizzeria","carta":"Pizza artesanal al horno de piedra · Lasaña boloñesa al gratín · Linguini ai frutti di mare · Panna cotta de frutos rojos","menu":"Stone-oven artisan pizza · Bolognese lasagna au gratin · Linguini ai frutti di mare · Red fruit panna cotta","horario":"18:00 - 22:00 h","hours":"18:00 - 22:00","vestimenta":"Informal elegante","dressCode":"Informal elegante","reservas":true,"reservation":true,"especialidades":"Pizza artesanal al horno de piedra, Lasaña boloñesa al gratín, Linguini ai frutti di mare y Panna cotta de frutos rojos","specialties":"Stone-oven artisan pizza, Bolognese lasagna au gratin, Linguini ai frutti di mare and Red fruit panna cotta","signatureDishes":["Pizza artesanal al horno de piedra","Lasaña boloñesa al gratín","Linguini ai frutti di mare","Panna cotta de frutos rojos"],"hotel":"Iberostar Selection Paraíso del Mar"},

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
    ["la-pagoda", 20.7587578, -86.9632596, "Pagoda"],
    ["el-rancho", 20.7580548, -86.964155, "El Rancho"],
    ["la-geisha", 20.7572267, -86.9646975, "La Geisha"],
    ["letoile", 20.7570704, -86.9644942, "L'Etoile"],
    ["el-tapatio", 20.7567139, -86.960329, "El Tapatío"],
    ["venecia", 20.755841, -86.9626532, "Venecia"],
    ["bellavista", 20.7549173, -86.9612041, "Bella Vista"],
    ["tonis", 20.7549562, -86.9611689, "Tony’"],
    ["haiku", 20.755212, -86.9610284, "Haiku"],
    ["la-brisa", 20.7546463, -86.9597269, "Ember / La Brisa"],
    ["burgers", 20.7598217, -86.9663036, "Star Hamburgers"],
    ["antojitos-tacos", 20.7604457, -86.9658435, "Tacos"],
    ["crepes", 20.7599822, -86.965172, "Crepes"],
    ["aqua-bar-la-perla", 20.759537490303693, -86.96006196166931, "La Perla"],
    ["aqua-bar-las-rocas", 20.7571518, -86.9604151, "Las Rocas"],
    ["lobby-bar-la-fuente", 20.7609293, -86.9639926, "La Fuente"],
    ["lobby-bar-la-cula", 20.762207, -86.9629327, "La Cupula Lobby Bar"],
    ["cigar-bar", 20.7593191, -86.9656938, "Vitolas"],
    ["sports-pool", 20.7580558, -86.9618529, "Sports Pool"],
    ["wave-pool", 20.7578053, -86.9615154, "Wave Pool"],
    ["lazy-river", 20.7582757, -86.9622815, "Lazy River"],
    ["mini-water-playground", 20.758176, -86.9631163, "Kids Waterpark"],
    ["starmarket", 20.7574499, -86.9613521, "Star Market"],
    ["games-room", 20.759771, -86.9662607, "Video Games Room"],
    ["golf-club-house", 20.7586073, -86.9658668, "Golf Clubhouse"],
    ["diving-center", 20.7588638, -86.9575332, "Dressel Divers"],
    ["latelier", 20.7551676, -86.9609817, "L'Atelier"],
    ["theclub", 20.7598333, -86.9652778, "THE CLUB"],
    ["star-prestige-7a11-del-mar", 20.762034, -86.962601, "7 a 11 Star Prestige del Mar"],
    ["olivetti", 20.7567218, -86.9604135, "The Olivetti"],
    ["lemon-spices", 20.7589371, -86.9634247, "Lemon & Spices"],
    ["under-the-sea", 20.75687, -86.95974, "American Seafood Grill Under the Sea"]
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
      if (entry.hours) poi.hoursEn = entry.hours;
      if (entry.cocina || entry.cuisine) {
        poi.cocina = entry.cocina || entry.cuisine;
        poi.cuisine = entry.cuisine || entry.cocina;
      }
      if (entry.carta) poi.carta = entry.carta;
      if (entry.menu) poi.menu = entry.menu;
      if (entry.treatments) poi.treatments = entry.treatments;
      if (entry.treatmentsEn) poi.treatmentsEn = entry.treatmentsEn;
      if (entry.packages) poi.packages = entry.packages;
      if (entry.packagesEn) poi.packagesEn = entry.packagesEn;
      if (entry.teeTimes) poi.teeTimes = entry.teeTimes;
      if (entry.amenities || entry.amenidades) poi.amenities = entry.amenities || entry.amenidades;
      if (entry.amenitiesEn) poi.amenitiesEn = entry.amenitiesEn;
      if (entry.services || entry.servicios) poi.services = entry.services || entry.servicios;
      if (entry.servicesEn) poi.servicesEn = entry.servicesEn;
      if (entry.description || entry.descripcion) poi.description = entry.description || entry.descripcion;
      if (entry.descriptionEn) poi.descriptionEn = entry.descriptionEn;
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
  if (entry.specialties) poi.specialties = entry.specialties;
  if (entry.signatureDishes || entry.platillosInsignia) {
    poi.signatureDishes = entry.signatureDishes || entry.platillosInsignia;
    poi.platillosInsignia = entry.platillosInsignia || entry.signatureDishes;
  }
  if (entry.cocteles || entry.cocktails || entry.bebidas) poi.cocteles = entry.cocteles || entry.cocktails || entry.bebidas;
  // Hotel / ubicacion de referencia.
  if (entry.hotel) {
    poi.hotel = entry.hotel;
    if (!poi.hotelId) poi.hotelId = entry.hotel;
  }
  if (Array.isArray(entry.categories)) poi.categories = entry.categories.slice();
    }
  })();

  window.RevistaDigital.guiapa.poiMatchesCategory = function (poi, category) {
    if (!poi || !category || category === "all") return true;
    if (poi.category === category) return true;
    return Array.isArray(poi.categories) && poi.categories.indexOf(category) !== -1;
  };

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
      name: "Iberostar Selection Paraíso del Mar",
      slug: "iberostar-paraiso-del-mar",
      folder: "paraiso-del-mar",
      images: ["PMA_GAST_0015", "PMA_GAST_0024", "PMA_GAST_0060", "PMA_GAST_0065", "PMA_GAST_0072"]
    },
    {
      name: "Iberostar Selection Paraíso Maya",
      slug: "iberostar-paraiso-maya",
      folder: "paraiso-maya",
      images: ["PMY_GAST_0231", "PMY_GAST_0235", "PMY_GAST_0262", "PMY_GAST_0270", "PMY_GAST_0296"]
    },
    {
      name: "Iberostar Waves Paraíso Lindo",
      slug: "iberostar-paraiso-lindo",
      folder: "paraiso-lindo",
      restaurantFolder: "Restaurante",
      images: ["PLI_GAST_0043", "PLI_GAST_0085", "PLI_GAST_0089", "PLI_GAST_0098", "PLI_GAST_0105"]
    },
    {
      name: "Iberostar Waves Paraíso Beach",
      slug: "iberostar-paraiso-beach",
      folder: "paraiso-beach",
      images: ["PBE_GAST_0048", "PBE_GAST_0049", "PBE_GAST_0053", "PBE_GAST_0059", "PBE_GAST_0061"]
    },
    {
      name: "JOIA Paraíso by Iberostar",
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

  gp.menuToggleLabel = function () {
    return window.RevistaDigital.i18n?.getLang?.() === "en" ? "View menu" : "Ver menú";
  };

  gp.menuCollapseLabel = function () {
    return window.RevistaDigital.i18n?.getLang?.() === "en" ? "Show less" : "Ver menos";
  };

  gp.menuHideLabel = function () {
    return window.RevistaDigital.i18n?.getLang?.() === "en" ? "Hide menu" : "Ocultar menú";
  };

  gp.isMobilePoiGuide = function () {
    try {
      return window.matchMedia("(max-width: 850px)").matches;
    } catch (e) {
      return window.innerWidth <= 850;
    }
  };

  function poiHoursText(poi) {
    if (!poi) return "";
    if (isEnglishUi()) return poi.hoursEn || poi.hours || poi.horarioTexto || poi.horario || "";
    return poi.horarioTexto || poi.hours || poi.horario || "";
  }

  function poiMenuText(poi) {
    if (!poi) return "";
    var english = window.RevistaDigital.i18n?.getLang?.() === "en";
    return english ? (poi.menu || poi.carta || "") : (poi.carta || poi.menu || "");
  }

  function isEnglishUi() {
    return window.RevistaDigital.i18n?.getLang?.() === "en";
  }

  function pickLang(es, en) {
    if (isEnglishUi()) return (en != null && en !== "") ? en : (es != null ? es : "");
    return (es != null && es !== "") ? es : (en != null ? en : "");
  }

  function valueToText(value) {
    if (value == null) return "";
    return Array.isArray(value) ? value.join(", ") : String(value);
  }

  function poiNameText(poi) {
    return poi ? valueToText(pickLang(poi.name, poi.nameEn)) : "";
  }

  function poiDescriptionText(poi) {
    return poi ? valueToText(pickLang(poi.description, poi.descriptionEn)) : "";
  }

  function poiCuisineText(poi) {
    return poi ? valueToText(pickLang(poi.cocina, poi.cuisine)) : "";
  }

  function poiSpecialtiesText(poi) {
    if (!poi) return "";
    var es = poi.especialidades || poi.signatureDishes || poi.platillosInsignia || "";
    var en = poi.specialties || "";
    return valueToText(pickLang(es, en));
  }

  function poiTreatmentsText(poi) {
    return poi ? valueToText(pickLang(poi.treatments, poi.treatmentsEn)) : "";
  }

  function poiPackagesText(poi) {
    return poi ? valueToText(pickLang(poi.packages, poi.packagesEn)) : "";
  }

  function poiAmenitiesText(poi) {
    return poi ? valueToText(pickLang(poi.amenities, poi.amenitiesEn)) : "";
  }

  function poiServicesText(poi) {
    return poi ? valueToText(pickLang(poi.services, poi.servicesEn)) : "";
  }

  function poiDressCodeText(poi) {
    return poi ? valueToText(pickLang(poi.vestimenta, poi.dressCode)) : "";
  }

  function poiCocktailsText(poi) {
    if (!poi) return "";
    var es = poi.cocteles || poi.cocktails || poi.bebidas || poi.coctelesInsignia || "";
    var en = poi.cocktailsEn || poi.coctelesEn || poi.cocktails || poi.bebidas || "";
    return valueToText(pickLang(es, en));
  }

  gp.poiHoursText = poiHoursText;
  gp.poiMenuText = poiMenuText;
  gp.poiNameText = poiNameText;
  gp.poiDescriptionText = poiDescriptionText;
  gp.poiCuisineText = poiCuisineText;
  gp.poiSpecialtiesText = poiSpecialtiesText;
  gp.poiTreatmentsText = poiTreatmentsText;
  gp.poiPackagesText = poiPackagesText;
  gp.poiAmenitiesText = poiAmenitiesText;
  gp.poiServicesText = poiServicesText;
  gp.poiDressCodeText = poiDressCodeText;
  gp.poiCocktailsText = poiCocktailsText;
  gp.isEnglishUi = isEnglishUi;

  function poiGalleryHotel(poi) {
    var direct = POI_GALLERY_HOTELS.find(function (hotel) { return hotel.name === poi.hotelId; });
    if (direct) return direct;
    // Fallback: comparar nombres normalizados usando canonicalHotelName
    // para manejar variantes de marca (con/sin Selection, Waves, by Iberostar, etc.)
    var pannellum = window.RevistaDigital && window.RevistaDigital.pannellum360;
    if (pannellum && typeof pannellum.canonicalHotelName === "function" && poi.hotelId) {
      var targetCanonical = pannellum.canonicalHotelName(poi.hotelId);
      if (targetCanonical) {
        var canonicalMatch = POI_GALLERY_HOTELS.find(function (hotel) {
          return pannellum.canonicalHotelName(hotel.name) === targetCanonical;
        });
        if (canonicalMatch) return canonicalMatch;
      }
    }
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

  function poiAssetPath(path) {
    try {
      var pathname = (window.location && window.location.pathname) || "";
      if (/\/mapbox\//i.test(pathname)) return "../" + path;
    } catch (e) {}
    return path;
  }

  function poiGalleryImages(poi) {
    if (!poi) return [];
    if (poi.category === "golf") return GOLF_GALLERY_IMAGES.map(poiAssetPath);
    if (poi.category !== "restaurante") return [];
    var hotel = poiGalleryHotel(poi);
    if (!hotel || !hotel.images) return [];
    return hotel.images.map(function (image) {
      return poiAssetPath("src/" + hotel.folder + "/" + (hotel.restaurantFolder || "restaurante") + "/" + image + "-640.webp");
    });
  }

  function poiCarouselMarkup(images, name) {
    if (!images || !images.length) return "";
    var slides = images.map(function (image, index) {
      return '<div class="gp-map-carousel-slide' + (index === 0 ? ' is-active' : '') + '" data-map-slide aria-hidden="' + (index === 0 ? 'false' : 'true') + '">' +
        '<img src="' + popupEscape(image) + '" alt="' + name + ' · imagen ' + (index + 1) + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '" decoding="async" />' +
        '</div>';
    });
    return '<div class="gp-map-carousel" data-map-carousel>' +
      '<div class="gp-map-carousel-slides">' + slides.join("") + '</div>' +
      '<div class="gp-map-carousel-controls">' +
        '<button type="button" data-map-carousel-step="-1" aria-label="Imagen anterior">«</button>' +
        '<span data-map-carousel-count>1 / ' + slides.length + '</span>' +
        '<button type="button" data-map-carousel-step="1" aria-label="Imagen siguiente">»</button>' +
      '</div>' +
    '</div>';
  }

  function initializePoiCarousel(root) {
    if (!root) return;
    var carousel = root.querySelector("[data-map-carousel]");
    if (!carousel) return;
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

  function stopPoiCarousel(root) {
    if (!root) return;
    root.querySelectorAll("[data-map-carousel]").forEach(function (carousel) {
      if (carousel.__autoPlay) {
        window.clearInterval(carousel.__autoPlay);
        carousel.__autoPlay = null;
      }
    });
  }

  function poiPopupMarkup(poi) {
    var name = popupEscape(poiNameText(poi));
    var description = popupEscape(poiDescriptionText(poi));
    var isRestaurant = poi.category === "restaurante";
    var isGolf = poi.category === "golf";
    var hotel = isRestaurant ? poiGalleryHotel(poi) : null;
    var panoHotel = hotel && window.RevistaDigital.pannellum360 && typeof window.RevistaDigital.pannellum360.canonicalHotelName === "function"
      ? (window.RevistaDigital.pannellum360.canonicalHotelName(hotel.name) || hotel.name)
      : (hotel && hotel.name) || "";
    var images = poiGalleryImages(poi);
    var has360 = isRestaurant && hotel && panoHotel && window.RevistaDigital.pannellum360?.isPlayaParaiso?.(panoHotel);
    var pano360Btn = has360
      ? '<div class="gp-map-pano360">' +
        '<button type="button" class="gp-map-carousel-360-link" data-poi-id="' + popupEscape(poi.id) + '" data-poi-360-hotel="' + popupEscape(panoHotel) + '" data-poi-360-label="' + name + '">Ver exploración 360°</button>' +
        '</div>'
      : "";
    var carousel = poiCarouselMarkup(images, name);
    var cartButton = (isRestaurant || isGolf)
      ? '<button type="button" class="gp-map-cart guide-cart" data-id="' + popupEscape(poi.id) + '" data-cat="' + popupEscape(poi.category) + '">Solicitar carrito</button>'
      : "";
    var hours = popupEscape(poiHoursText(poi));
    var english = window.RevistaDigital.i18n?.getLang?.() === "en";
    var menuText = poiMenuText(poi);
    var menu = popupEscape(menuText || "");
    var menuLabel = english ? "Menu" : "Menú";
    var missingMenu = english ? "Not available yet." : "No disponible por ahora.";
    var hoursHtml = hours ? '<p><strong>' + (english ? "Hours" : "Horario") + ':</strong> ' + hours + '</p>' : '';
    var menuHtml = menu ? '<p><strong>' + menuLabel + ':</strong> ' + menu + '</p>' : (isRestaurant ? '<p><strong>' + menuLabel + ':</strong> ' + missingMenu + '</p>' : '');
    var descriptionHtml = description ? '<small class="gp-map-poi-description">' + description + '</small>' : '';
    var details = (hoursHtml || menuHtml) ? '<div class="gp-map-poi-details">' + hoursHtml + menuHtml + '</div>' : '';
    var dirButton = '<button type="button" class="gp-dir" data-lat="' + poi.lat + '" data-lng="' + poi.lng + '" data-name="' + name + '">Cómo llegar</button>';
    var compactDining = gp.isMobilePoiGuide() && isRestaurant;
    var extra = compactDining ? (descriptionHtml + menuHtml + carousel + pano360Btn + cartButton) : (details + carousel + pano360Btn + cartButton);
    var visibleDetails = compactDining && hoursHtml ? '<div class="gp-map-poi-details">' + hoursHtml + '</div>' : details;
    var toggle = compactDining && extra
      ? '<button type="button" class="gp-map-menu-toggle" data-popup-menu-toggle data-poi-id="' + popupEscape(poi.id) + '">' + gp.menuToggleLabel() + '</button>'
      : '';
    return '<div class="gp-map-poi-popup"><strong class="gp-map-poi-title">' + name + '</strong>' +
      (compactDining ? '' : descriptionHtml) +
      visibleDetails +
      (compactDining ? '' : carousel + pano360Btn) +
      dirButton +
      (compactDining ? '' : cartButton) +
      toggle +
      '</div>';
  }

  function initializePoiPopup(popupElement) {
    if (!popupElement) return;
    var menuToggle = popupElement.querySelector("[data-popup-menu-toggle]");
    if (menuToggle && menuToggle.dataset.bound !== "true") {
      menuToggle.dataset.bound = "true";
      menuToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var poiId = menuToggle.getAttribute("data-poi-id");
        if (poiId) gp.openDiningOverlay(poiId);
      });
    }
    initializePoiCarousel(popupElement);
    var cartButton = popupElement.querySelector(".gp-map-cart");
    if (cartButton && cartButton.dataset.bound !== "true") {
      cartButton.dataset.bound = "true";
      cartButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.RevistaDigital.guiapa?.requestCartForPoi?.(cartButton.dataset.id);
      });
    }
    var panoramaButton = popupElement.querySelector("[data-poi-360-hotel]");
    if (panoramaButton && panoramaButton.dataset.bound !== "true") {
      panoramaButton.dataset.bound = "true";
      panoramaButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var pannellum360 = window.RevistaDigital && window.RevistaDigital.pannellum360;
        var hotelName = panoramaButton.getAttribute("data-poi-360-hotel");
        var label = panoramaButton.getAttribute("data-poi-360-label");
        var poiId = panoramaButton.getAttribute("data-poi-id");
        if (pannellum360 && typeof pannellum360.open === "function" && hotelName) {
          pannellum360.open(hotelName, "restaurantes", label, poiId);
          window.RevistaDigital?.guiapa?.syncBackTo360Button?.();
          return;
        }
        navigateTo360Fallback(hotelName, "restaurantes", label, poiId);
      });
    }
  }

  function bindPoiPopupActions(popup) {
    var attempts = 0;
    function attempt() {
      var element = popup && typeof popup.getElement === "function" ? popup.getElement() : null;
      if (element && element.querySelector("[data-poi-360-hotel], [data-popup-menu-toggle], [data-map-carousel]")) {
        initializePoiPopup(element);
        window.setTimeout(function () {
          var refreshed = popup && typeof popup.getElement === "function" ? popup.getElement() : null;
          if (refreshed) initializePoiPopup(refreshed);
        }, 350);
        return;
      }
      if (attempts < 12) {
        attempts += 1;
        window.setTimeout(attempt, 40);
      }
    }
    window.setTimeout(attempt, 0);
  }

  function navigateTo360Fallback(hotelName, zoneKey, label, poiId) {
    try {
      window.sessionStorage.setItem("club360RestaurantSelection", JSON.stringify({
        hotelName: hotelName,
        zoneKey: zoneKey,
        label: label,
        poiId: poiId || ""
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
  }

  function closeDiningOverlay() {
    var overlay = document.querySelector(".gp-dining-overlay");
    if (!overlay) return;
    stopPoiCarousel(overlay);
    if (overlay.__onKeyDown) document.removeEventListener("keydown", overlay.__onKeyDown);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.body.classList.remove("gp-dining-open");
  }

  gp.closeDiningOverlay = closeDiningOverlay;

  gp.openDiningOverlay = function (id) {
    var poi = (gp.POIS || []).find(function (item) { return item && item.id === id; });
    if (!poi || (poi.category !== "restaurante" && poi.category !== "bar")) return false;
    closeDiningOverlay();

    var english = window.RevistaDigital.i18n?.getLang?.() === "en";
    var name = popupEscape(poiNameText(poi));
    var isRestaurant = poi.category === "restaurante";
    var images = poiGalleryImages(poi);
    var carousel = poiCarouselMarkup(images, name);
    var description = popupEscape(poiDescriptionText(poi));
    var hours = popupEscape(poiHoursText(poi));
    var menuText = popupEscape(poiMenuText(poi));
    var menuLabel = english ? "Menu" : "Menú";
    var photosLabel = english ? "Photos" : "Fotos";
    var missingMenu = english ? "Not available yet." : "No disponible por ahora.";
    var hoursText = hours || (english ? "Please check with the hotel." : "Consultar en el hotel.");

    var hotel = poiGalleryHotel(poi);
    var panoHotel = hotel && window.RevistaDigital.pannellum360 && typeof window.RevistaDigital.pannellum360.canonicalHotelName === "function"
      ? (window.RevistaDigital.pannellum360.canonicalHotelName(hotel.name) || hotel.name)
      : (hotel && hotel.name) || poi.hotelId || poi.hotel || "";
    var pannellum360 = window.RevistaDigital && window.RevistaDigital.pannellum360;
    var has360 = pannellum360 && typeof pannellum360.isPlayaParaiso === "function" &&
      pannellum360.isPlayaParaiso(isRestaurant ? panoHotel : (poi.hotelId || poi.hotel || panoHotel));

    var overlay = document.createElement("div");
    overlay.className = "gp-dining-overlay";
    overlay.dataset.poiId = poi.id;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", name);
    overlay.innerHTML =
      '<div class="gp-dining-bar">' +
        '<div class="gp-dining-heading"><strong>' + name + '</strong><span>' + (english ? "Menu" : "Menú") + '</span></div>' +
        '<button type="button" class="gp-dining-close" aria-label="' + (english ? "Close" : "Salir") + '">×</button>' +
      '</div>' +
      '<div class="gp-dining-content">' +
        (carousel ? '<section class="gp-dining-section gp-dining-photos"><h3>' + photosLabel + '</h3>' + carousel + '</section>' : '') +
        (description ? '<section class="gp-dining-section"><h3>' + (english ? "About" : "Descripción") + '</h3><p>' + description + '</p></section>' : '') +
        '<section class="gp-dining-section"><h3>' + (english ? "Hours" : "Horario") + '</h3><p>' + hoursText + '</p></section>' +
        '<section class="gp-dining-section"><h3>' + menuLabel + '</h3><p>' + (menuText || missingMenu) + '</p></section>' +
        '<div class="gp-dining-actions">' +
          '<button type="button" class="gp-dining-route gp-dir" data-lat="' + poi.lat + '" data-lng="' + poi.lng + '" data-name="' + name + '">' + (english ? "Directions" : "Cómo llegar") + '</button>' +
          '<button type="button" class="gp-dining-map" data-dining-map="1">' + (english ? "View on map" : "Ver en el mapa") + '</button>' +
          (isRestaurant ? '<button type="button" class="gp-dining-cart" data-dining-cart="1">' + (english ? "Request cart" : "Solicitar carrito") + '</button>' : '') +
          (has360 ? '<button type="button" class="gp-dining-360" data-dining-360="1">Ver exploración 360°</button>' : '') +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.classList.add("gp-dining-open");
    initializePoiCarousel(overlay);

    overlay.querySelector(".gp-dining-close").addEventListener("click", function () {
      closeDiningOverlay();
    });
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeDiningOverlay();
    });
    overlay.__onKeyDown = function (event) {
      if (event.key === "Escape") closeDiningOverlay();
    };
    document.addEventListener("keydown", overlay.__onKeyDown);

    var routeButton = overlay.querySelector(".gp-dining-route");
    if (routeButton) {
      routeButton.addEventListener("click", function () {
        closeDiningOverlay();
      });
    }
    var mapButton = overlay.querySelector("[data-dining-map]");
    if (mapButton) {
      mapButton.addEventListener("click", function () {
        closeDiningOverlay();
        if (typeof gp.selectPoi === "function") gp.selectPoi(poi.id, { noScroll: gp.isMobilePoiGuide() });
      });
    }
    var cartButton = overlay.querySelector("[data-dining-cart]");
    if (cartButton) {
      cartButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof gp.selectPoi === "function") gp.selectPoi(poi.id, { noScroll: true });
        gp.renderDiningCartForm?.(overlay, poi);
      });
    }
    var panoButton = overlay.querySelector("[data-dining-360]");
    if (panoButton) {
      panoButton.addEventListener("click", function () {
        closeDiningOverlay();
        var panoZone = isRestaurant ? "restaurantes" : "bares";
        var panoHotelName = panoHotel || poi.hotelId || poi.hotel;
        if (pannellum360 && typeof pannellum360.open === "function") {
          pannellum360.open(panoHotelName, panoZone, poi.name, poi.id);
          window.RevistaDigital?.guiapa?.syncBackTo360Button?.();
        } else {
          navigateTo360Fallback(panoHotelName, panoZone, poi.name, poi.id);
        }
      });
    }
    return true;
  };

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
        var labelHtml = '<span style="display:inline-block;transform:translate(-50%,-50%);white-space:nowrap;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#0b3d66;background:rgba(255,255,255,.72);border:1px solid rgba(11,61,102,.35);border-radius:999px;padding:2px 10px;">' + (poiNameText(p) || "") + "</span>";
        var areaIcon = window.L.divIcon ? window.L.divIcon({ className: "gp-area-label", html: labelHtml, iconSize: [0, 0], iconAnchor: [0, 0] }) : null;
        var areaMarker = window.L.marker([p.lat, p.lng], areaIcon ? { icon: areaIcon } : {});
        areaMarker.bindPopup("<strong>" + (poiNameText(p) || "") + "</strong><br><small>" + (poiDescriptionText(p) || "") + "</small>");
        gp.registerMarker(p.id, areaMarker, labels);
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
          bindPoiPopupActions(event.popup);
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
        var name = poiNameText(p) || "";
        var dirButton = '<button type="button" class="gp-dir" data-lat="' + p.lat + '" data-lng="' + p.lng + '" data-name="' + name.replace(/"/g,'&quot;') + '">Cómo llegar</button>';
        var popup;
        if (p.category === "club") {
          popup = '<div class="gp-club-popup">'
            + '<div class="gp-club-popup-badge"><img class="gp-club-popup-logo" src="branding/IB_THE_CLUB_VV_POS_RGB-320.webp" alt="" /></div>'
            + '<h3 class="gp-club-popup-name">' + name + '</h3>'
            + (poiHoursText(p) ? '<p class="gp-club-popup-hours">' + poiHoursText(p) + '</p>' : '')
            + dirButton
            + '</div>';
          popupOptions = { className: 'gp-club-pop', minWidth: 190, maxWidth: 230 };
        } else if (p.category === "starprestige") {
          popup = '<div class="gp-sp-popup">'
            + '<div class="gp-sp-popup-badge"><span class="gp-sp-popup-star">★</span>STAR PRESTIGE</div>'
            + '<h3 class="gp-sp-popup-name">' + name + '</h3>'
            + (poiDescriptionText(p) ? '<p class="gp-sp-popup-desc">' + poiDescriptionText(p) + '</p>' : '')
            + (poiHoursText(p) ? '<p class="gp-sp-popup-hours">' + poiHoursText(p) + '</p>' : '')
            + dirButton
            + '</div>';
          popupOptions = { className: 'gp-sp-pop', minWidth: 220, maxWidth: 260 };
        } else if (p.category === "bar" || p.category === "discoteca") {
          var english = window.RevistaDigital.i18n?.getLang?.() === "en";
          var barMenu = poiMenuText(p);
          var barMenuHtml = barMenu
            ? '<p class="gp-bar-popup-menu"><strong>' + (english ? 'Menu:' : 'Carta:') + '</strong> ' + popupEscape(barMenu) + '</p>'
            : '<p class="gp-bar-popup-menu"><strong>' + (english ? 'Menu:' : 'Carta:') + '</strong> ' + (english ? 'Not available yet.' : 'No disponible por ahora.') + '</p>';
          var barDescHtml = poiDescriptionText(p) ? '<small class="gp-bar-popup-desc">' + popupEscape(poiDescriptionText(p)) + '</small>' : '';
          var barHoursHtml = '<p class="gp-bar-popup-hours"><strong>' + (english ? 'Hours:' : 'Horario:') + '</strong> ' + popupEscape(poiHoursText(p) || (english ? 'Please check with the hotel.' : 'Consultar en el hotel.')) + '</p>';
          var compactBar = gp.isMobilePoiGuide() && p.category === "bar";
          popup = '<div class="gp-bar-popup">' +
            '<strong class="gp-bar-popup-name">' + name + '</strong>' +
            barHoursHtml +
            dirButton +
            (compactBar
              ? '<button type="button" class="gp-map-menu-toggle" data-popup-menu-toggle data-poi-id="' + popupEscape(p.id) + '">' + gp.menuToggleLabel() + '</button>'
              : barMenuHtml + barDescHtml) +
            '</div>';
          popupOptions = { className: 'gp-bar-pop', minWidth: 220, maxWidth: 280 };
          if (compactBar) {
            m.on("popupopen", function (event) {
              bindPoiPopupActions(event.popup);
            });
          }
        } else {
          popup = '<strong>' + name + '</strong><br><small>' + poiDescriptionText(p) + '</small><br>' + dirButton;
        }
        m.bindPopup(popup, popupOptions);
      }
      gp.registerMarker(p.id, m, layer);
      m.addTo(layer);
    });
    layer.addTo(map);
    try {
      if (labels.getLayers().length) labels.addTo(map);
    } catch (e) { /* ignore label layer errors */ }
    gp._poiLayer = layer;
    gp._poiLabelLayer = labels;
    gp._poiLayerConfig = { filterHotelId: filterHotelId || null, options: options || null };
    return layer;
  };

  // Reconstruye la capa de POIs conservando el filtro activo y los popups
  // abiertos. Se usa al cambiar de idioma para refrescar los textos.
  gp.refreshPoiLayer = function () {
    if (!gp._map) return;
    var config = gp._poiLayerConfig;
    if (!config) return;
    var openIds = [];
    Object.keys(gp._markers || {}).forEach(function (id) {
      var marker = gp._markers[id];
      try {
        if (marker && typeof marker.isPopupOpen === "function" && marker.isPopupOpen()) openIds.push(id);
      } catch (e) { /* ignore */ }
    });
    try { if (gp._poiLabelLayer && typeof gp._poiLabelLayer.remove === "function") gp._poiLabelLayer.remove(); } catch (e) { /* ignore */ }
    try { if (gp._poiLayer && typeof gp._poiLayer.remove === "function") gp._poiLayer.remove(); } catch (e) { /* ignore */ }
    gp._poiLayer = null;
    gp._poiLabelLayer = null;
    gp.addPoiLayer(gp._map, config.filterHotelId, config.options);
    if (gp._currentFilter && gp._currentFilter !== "all") {
      try { gp.filterMapMarkers(gp._currentFilter); } catch (e) { /* ignore */ }
    }
    openIds.forEach(function (id) {
      var marker = gp._markers && gp._markers[id];
      if (marker && typeof marker.openPopup === "function") {
        try { marker.openPopup(); } catch (e) { /* ignore */ }
      }
    });
  };

  gp.bindPoiPopupActions = bindPoiPopupActions;
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
    var color = opts.color || "#eceae6"; // tono del sitio (--paper)
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
      map.on("zoomstart movestart rotatestart", function () {
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

  gp.registerMarker = function (id, marker, parentLayer) {
    if (id && marker) {
      gp._markers[id] = marker;
      gp._markerParents = gp._markerParents || {};
      if (parentLayer) {
        gp._markerParents[id] = parentLayer;
      } else {
        delete gp._markerParents[id];
      }
      try {
        var el = marker.getElement ? marker.getElement() : null;
        if (el && !el.classList.contains("gp-map-marker")) {
          el.classList.add("gp-map-marker");
        }
      } catch (e) { /* ignore */ }
    }
  };

  gp.filterMapMarkers = function (category) {
    if (!gp._map || !gp._markers) return;
    gp._currentFilter = category || "all";
    var pois = gp.POIS || [];
    var poisById = {};
    pois.forEach(function (p) { poisById[p.id] = p; });
    Object.keys(gp._markers).forEach(function (id) {
      var marker = gp._markers[id];
      var poi = poisById[id];
      var show = !!(poi && gp.poiMatchesCategory(poi, category));
      var parent = (gp._markerParents && gp._markerParents[id]) || null;
      if (!parent && gp._poiLayer && gp._poiLayer.hasLayer && gp._poiLayer.hasLayer(marker)) {
        parent = gp._poiLayer;
      }
      var el;
      if (show) {
        try {
          if (parent) {
            if (!parent.hasLayer(marker)) parent.addLayer(marker);
          } else if (!marker._map) {
            marker.addTo(gp._map);
          }
        } catch (e) { /* ignore */ }
        el = marker.getElement ? marker.getElement() : null;
        if (el) {
          el.classList.remove("fading-out");
          el.classList.add("fading-in");
        }
      } else {
        el = marker.getElement ? marker.getElement() : null;
        if (el) {
          el.classList.remove("fading-in");
          el.classList.add("fading-out");
        }
        try {
          if (parent) {
            if (parent.hasLayer(marker)) parent.removeLayer(marker);
          } else if (marker._map) {
            marker._map.removeLayer(marker);
          }
        } catch (e) { /* ignore */ }
      }
    });
    if (category === "hotel") {
      try { if (gp._poiLayer && typeof gp._poiLayer.remove === "function") gp._poiLayer.remove(); } catch (e) {}
      try { if (gp._poiLabelLayer && typeof gp._poiLabelLayer.remove === "function") gp._poiLabelLayer.remove(); } catch (e) {}
    } else {
      try { if (gp._poiLayer && typeof gp._poiLayer.addTo === "function" && !gp._map.hasLayer(gp._poiLayer)) gp._poiLayer.addTo(gp._map); } catch (e) {}
      try { if (gp._poiLabelLayer && typeof gp._poiLabelLayer.addTo === "function" && gp._poiLabelLayer.getLayers && gp._poiLabelLayer.getLayers().length && !gp._map.hasLayer(gp._poiLabelLayer)) gp._poiLabelLayer.addTo(gp._map); } catch (e) {}
    }
    if (category === "hotel" && gp._map && typeof gp._map.fitBounds === "function" && window.L && window.L.latLngBounds) {
      var hotelPoints = [];
      pois.forEach(function (p) {
        if (p.category !== "hotel" || p.external === true) return;
        var hotelMarker = gp._markers[p.id];
        if (hotelMarker && typeof hotelMarker.getLatLng === "function") hotelPoints.push(hotelMarker.getLatLng());
      });
      if (hotelPoints.length) {
        try {
          var fitOptions = { padding: [48, 48], maxZoom: 16 };
          if (typeof gp.isMobilePoiGuide === "function" && gp.isMobilePoiGuide()) {
            var mapSize = gp._map.getSize ? gp._map.getSize() : null;
            var bottom = mapSize ? Math.round(mapSize.y * 0.4) : 220;
            fitOptions = { paddingTopLeft: [20, 20], paddingBottomRight: [20, bottom], maxZoom: 16 };
          }
          gp._map.fitBounds(window.L.latLngBounds(hotelPoints), fitOptions);
        } catch (e) { /* ignore */ }
      }
    }
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

  var HOTEL_POI_IDS = {
    "Iberostar Paraíso del Mar": "del-mar",
    "Iberostar Paraíso Beach": "beach",
    "Iberostar Paraíso Lindo": "lindo",
    "Iberostar Paraíso Maya": "maya",
    "Iberostar Paraíso JOIA": "joia"
  };

  gp.hotelPoiIdForName = function (hotelName) {
    return HOTEL_POI_IDS[hotelName] || null;
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

  var CATEGORY_LABELS_EN = {
    hotel: "Hotels",
    club: "THE CLUB",
    starprestige: "Star Prestige",
    concierge: "Concierge",
    restaurante: "Restaurants",
    bar: "Bars",
    piscina: "Pools",
    spa: "Spa",
    golf: "Golf",
    playa: "Beach",
    comer: "Shopping",
    deportes: "Sports",
    entretenimiento: "Entertainment",
    servicio: "Services",
    wellness: "Wellness",
    kids: "Kids",
    conv: "Conventions",
    discoteca: "Nightclub"
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

  function poiHoursText(poi) {
    if (!poi) return "";
    if (isEnglishUi()) return poi.hoursEn || poi.hours || poi.horarioTexto || poi.horario || "";
    return poi.horarioTexto || poi.hours || poi.horario || "";
  }

  function poiMenuText(poi) {
    if (!poi) return "";
    var english = window.RevistaDigital.i18n?.getLang?.() === "en";
    return english ? (poi.menu || poi.carta || "") : (poi.carta || poi.menu || "");
  }

  function isEnglishUi() {
    return window.RevistaDigital.i18n?.getLang?.() === "en";
  }

  function categoryLabel(cat) {
    var labels = isEnglishUi() ? CATEGORY_LABELS_EN : CATEGORY_LABELS;
    return labels[cat] || CATEGORY_LABELS[cat] || cat || "Lugar";
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
      // activa (bearing > 0) hay que rotarlo al revés para que el lugar siga
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
    includedPois().forEach(function (p) {
      var cats = Array.isArray(p.categories) && p.categories.length ? p.categories : [p.category];
      cats.forEach(function (cat) { if (cat) seen[cat] = (seen[cat] || 0) + 1; });
    });
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
      if (filter !== "all" && !gp.poiMatchesCategory(p, filter)) return false;
      if (query) {
        var labels = Array.isArray(p.categories) && p.categories.length ? p.categories.map(categoryLabel).join(" ") : categoryLabel(p.category);
        var haystack = normalize([gp.poiNameText(p), gp.poiDescriptionText(p), gp.poiMenuText(p), gp.poiSpecialtiesText(p), p.hotelId, labels].join(" "));
        if (haystack.indexOf(query) === -1) return false;
      }
      return true;
    });
  }

  var state = { mount: null, filter: "all", query: "", selectedId: null, legendMount: null };

  function categoryChips() {
    var allActive = state.filter === "all";
    var chips = ['<button type="button" class="guide-chip' + (allActive ? " is-active" : "") + '" data-guide-filter="all" aria-pressed="' + allActive + '">' + (isEnglishUi() ? "All" : "Todos") + ' <span>' + includedPois().length + "</span></button>"];
    presentCategories().forEach(function (entry) {
      var active = state.filter === entry.key;
      chips.push('<button type="button" class="guide-chip' + (active ? " is-active" : "") + '" data-guide-filter="' + escapeHtml(entry.key) + '" aria-pressed="' + active + '"><span class="guide-chip-dot" style="background:' + categoryColor(entry.key) + '"></span>' + escapeHtml(categoryLabel(entry.key)) + " <span>" + entry.count + "</span></button>");
    });
    return chips.join("");
  }

  function legendMarkup() {
    var items = presentCategories().map(function (entry) {
      return '<li><span class="guide-dot" style="background:' + categoryColor(entry.key) + '"></span>' + escapeHtml(categoryLabel(entry.key)) + " <em>" + entry.count + "</em></li>";
    }).join("");
    var pendingCount = 0;
    var currentPois = queryPois({ filter: state.filter, query: state.query });
    currentPois.forEach(function (p) {
      var hasCoords = typeof p.lat === "number" && typeof p.lng === "number";
      var isVerified = p.verified === true;
      if (!hasCoords || !isVerified) pendingCount++;
    });
    var noteHtml = "";
    if (pendingCount > 0) {
      noteHtml = isEnglishUi()
        ? '<p class="guide-legend-note"><span class="guide-dot guide-dot--pending"></span>' + pendingCount + ' place' + (pendingCount === 1 ? '' : 's') + ' pending verification (no confirmed location)</p>'
        : '<p class="guide-legend-note"><span class="guide-dot guide-dot--pending"></span>' + pendingCount + ' lugar' + (pendingCount === 1 ? '' : 'es') + ' pendiente de verificación (sin ubicación confirmada)</p>';
    }
    return '<h3 class="guide-legend-title">' + (isEnglishUi() ? "Category legend" : "Leyenda de categorías") + '</h3><ul class="guide-legend-list">' + items + '</ul>' + noteHtml;
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
    if (count) count.textContent = isEnglishUi()
      ? (pois.length + " of " + includedPois().length + " places")
      : (pois.length + " de " + includedPois().length + " lugares");
    if (!pois.length) {
      list.innerHTML = isEnglishUi()
        ? '<li class="guide-empty">Adjust the search to see more places.</li>'
        : '<li class="guide-empty">Ajuste la búsqueda para ver más lugares.</li>';
      return;
    }
    list.innerHTML = pois.map(function (p) {
      var active = p.id === state.selectedId ? " is-active" : "";
      var meta = escapeHtml(categoryLabel(p.category)) + (p.hotelId ? " · " + escapeHtml(p.hotelId) : "");
      var brandHtml = "";
      if (p.category === "hotel" && p.brand) {
        var brandLogo = p.brand === "waves" ? "src/LOGOS-IBEROSTAR/LOGO_IB_WAVES_BR_POS_REDUCED_RGB.svg" :
                        p.brand === "selection" ? "src/LOGOS-IBEROSTAR/LOGO_IB_SELECTION_BR_POS_REDUCED_RGB.svg" :
                        p.brand === "joia" ? "src/LOGOS-IBEROSTAR/JOIA_by_IB_POS_RGB.svg" : "";
        if (brandLogo) {
          brandHtml = '<img class="guide-item-brand" src="' + brandLogo + '" alt="' + escapeHtml(p.brand) + '" loading="lazy" />';
        }
      }
      return '<li class="guide-item' + active + (p.category === "hotel" ? " guide-item--hotel" : "") + '" data-id="' + escapeHtml(p.id) + '" tabindex="0" role="button">' +
        '<span class="guide-dot" style="background:' + categoryColor(p.category) + '"></span>' +
        '<span class="guide-item-body"><span class="guide-item-name">' + escapeHtml(gp.poiNameText(p)) + '</span><span class="guide-item-meta">' + meta + "</span></span>" +
        brandHtml +
        "</li>";
    }).join("");
  }

  gp._route = { status: "idle", targetId: null, targetName: null, info: null, line: null, abort: null, recalcAbort: null, recalcAt: 0, recalcToken: 0 };
  gp._routeFocus = { active: false, id: null, name: null };

  function applyRouteFocus() {
    if (!gp._markers || !Object.keys(gp._markers).length) return;
    var focus = gp._routeFocus || {};
    var active = !!focus.active && !!focus.id;
    if (!active) {
      gp.filterMapMarkers(state.filter);
      return;
    }
    Object.keys(gp._markers).forEach(function (id) {
      var marker = gp._markers[id];
      var show = id === focus.id;
      var parent = (gp._markerParents && gp._markerParents[id]) || null;
      if (!parent && gp._poiLayer && gp._poiLayer.hasLayer && gp._poiLayer.hasLayer(marker)) parent = gp._poiLayer;
      var el = marker.getElement ? marker.getElement() : null;
      if (show) {
        try {
          if (parent) {
            if (!parent.hasLayer(marker)) parent.addLayer(marker);
          } else if (!marker._map) {
            marker.addTo(gp._map);
          }
        } catch (e) {}
        if (el) {
          el.classList.remove("fading-out");
          el.classList.add("fading-in");
        }
      } else {
        if (el) {
          el.classList.remove("fading-in");
          el.classList.add("fading-out");
        }
        try {
          if (parent) {
            if (parent.hasLayer(marker)) parent.removeLayer(marker);
          } else if (marker._map) {
            marker._map.removeLayer(marker);
          }
        } catch (e) {}
      }
    });
  }

  function ensureRouteBar() {
    var bar = document.getElementById("gpRouteBar");
    if (bar) return bar;
    bar = document.createElement("div");
    bar.id = "gpRouteBar";
    bar.className = "gp-route-bar";
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    bar.innerHTML = '<span class="gp-route-bar-label"></span><button type="button" class="gp-route-bar-cancel">Cancelar</button>';
    document.body.appendChild(bar);
    var cancel = bar.querySelector(".gp-route-bar-cancel");
    if (cancel) {
      cancel.addEventListener("click", function () {
        if (typeof gp.cancelRoute === "function") gp.cancelRoute();
        var mapas = window.RevistaDigital && window.RevistaDigital.mapas;
        if (mapas && typeof mapas.cancelRoute === "function") mapas.cancelRoute();
        if (typeof window.cancelarRuta3d === "function") window.cancelarRuta3d();
        gp.clearRouteFocus();
      });
    }
    return bar;
  }

  var routeBarPositionTimer = null;

  function positionRouteBar() {
    var bar = document.getElementById("gpRouteBar");
    if (!bar || !bar.classList.contains("is-visible")) return;
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    var barRect = bar.getBoundingClientRect ? bar.getBoundingClientRect() : null;
    var barWidth = barRect && barRect.width ? barRect.width : 240;
    var barLeft = viewportWidth / 2 - barWidth / 2;
    var barRight = barLeft + barWidth;
    var minTop = viewportHeight - 16;
    var selectors = [".guide-mobile-actions:not([hidden])", ".hotel-guide-panel", ".hotel-guide-open", ".route-info", ".guide-toggle", ".mapboxgl-ctrl-bottom-left", ".mapboxgl-ctrl-bottom-right"];
    selectors.forEach(function (selector) {
      var nodes = document.querySelectorAll ? document.querySelectorAll(selector) : [];
      Array.prototype.forEach.call(nodes, function (node) {
        if (!node || node === bar) return;
        var style = window.getComputedStyle ? window.getComputedStyle(node) : null;
        if (style && (style.display === "none" || style.visibility === "hidden" || Number(style.opacity || 1) < 0.05)) return;
        var rect = node.getBoundingClientRect ? node.getBoundingClientRect() : null;
        if (!rect || !rect.width || !rect.height || rect.bottom < viewportHeight - 120 || rect.top < viewportHeight * 0.35) return;
        if (rect.right <= barLeft || rect.left >= barRight) return;
        minTop = Math.min(minTop, rect.top);
      });
    });
    var bottom = Math.max(16, viewportHeight - minTop + 10);
    var next = bottom + "px";
    if (bar.style && bar.style.getPropertyValue && bar.style.getPropertyValue("--gp-route-bottom") !== next) {
      bar.style.setProperty("--gp-route-bottom", next);
    }
  }

  function scheduleRouteBarPosition() {
    if (routeBarPositionTimer) clearTimeout(routeBarPositionTimer);
    routeBarPositionTimer = setTimeout(function () {
      routeBarPositionTimer = null;
      positionRouteBar();
    }, 0);
    setTimeout(positionRouteBar, 260);
  }

  window.addEventListener("resize", scheduleRouteBarPosition);
  if (window.MutationObserver && document.body) {
    new window.MutationObserver(scheduleRouteBarPosition).observe(document.body, { attributes: true, attributeFilter: ["class", "style", "hidden"], subtree: true });
  }

  function renderRouteBar() {
    var focus = gp._routeFocus || {};
    var bar = document.getElementById("gpRouteBar");
    if (!focus.active || !focus.id) {
      if (bar) bar.classList.remove("is-visible");
      return;
    }
    bar = ensureRouteBar();
    var label = bar.querySelector(".gp-route-bar-label");
    if (label) label.textContent = "Dirigiéndote a " + (focus.name || "el destino");
    bar.classList.add("is-visible");
    scheduleRouteBarPosition();
  }

  function notifyRouteFocus() {
    applyRouteFocus();
    if (typeof gp._routeFocusHook === "function") gp._routeFocusHook(gp._routeFocus);
    renderRouteBar();
  }

  gp.setRouteFocus = function (id, name) {
    if (!id) return false;
    var poi = findPoi(id);
    gp._routeFocus = { active: true, id: id, name: name || (poi && poi.name) || "el destino" };
    notifyRouteFocus();
    return true;
  };

  gp.setRouteFocusByCoordinates = function (coordinates, name) {
    if (!Array.isArray(coordinates) || coordinates.length < 2) return false;
    var lat = Number(coordinates[0]);
    var lng = Number(coordinates[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
    var poi = (gp.POIS || []).find(function (item) {
      return item && Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lng)) &&
        Math.abs(Number(item.lat) - lat) < 0.0002 && Math.abs(Number(item.lng) - lng) < 0.0002;
    });
    if (!poi) return false;
    return gp.setRouteFocus(poi.id, name || poi.name);
  };

  gp.clearRouteFocus = function () {
    gp._routeFocus = { active: false, id: null, name: null };
    notifyRouteFocus();
  };

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
    gp.clearRouteFocus();
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
      try { gp._redrawMap.off("rotateend zoomend", gp._redrawHandler); } catch (e) { /* ignore */ }
    }
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
    map.on("rotateend zoomend", gp._redrawHandler);
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
      color: "#002855",
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
    if (status === "idle") gp.clearRouteFocus();
    else gp.setRouteFocus(id, name);
    renderRouteStatus();
  }

  function routeToPoi(id) {
    var poi = findPoi(id);
    if (!poi) return;
    // En móvil, al trazar una ruta aseguramos que la guía NO esté expandida
    // (se muestra en su tamaño pequeño original) para que el mapa y la ruta
    // trazada queden visibles. No la colapsamos: se queda como al inicio.
    if (isMobileGuide()) {
      try {
        var r = window.RevistaDigital && window.RevistaDigital.routes;
        if (r && typeof r.setGuidePanelExpanded === "function") {
          r.setGuidePanelExpanded(false);
        }
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
    var isDining = !!poi && (poi.category === "restaurante" || poi.category === "bar");
    panel.classList.toggle("guide-mobile-actions--dining", isDining && isMobileGuide());
    var titleEl = mobileActionsRoot("#guideMobileActionsTitle");
    var body = mobileActionsRoot("#guideMobileActionsBody");
    if (!body) return;
    if (!poi) {
      panel.setAttribute("hidden", "");
      body.innerHTML = "";
      if (titleEl) titleEl.textContent = "";
      return;
    }
    var verified = Number.isFinite(poi.lat) && Number.isFinite(poi.lng);
    var isArea = poi.kind === "area";
    var cat = poi.category;
    
    // Check if this POI has a 360° tour available (mobile)
    var hasPano360Mobile = (cat === "restaurante" || cat === "bar" || cat === "discoteca") && window.RevistaDigital.pannellum360 && typeof window.RevistaDigital.pannellum360.isPlayaParaiso === "function" && window.RevistaDigital.pannellum360.isPlayaParaiso(poi.hotelId || poi.hotel);
    
    var btns = "";
    if (isArea) {
      btns += '<button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button>';
    } else if (verified) {
      btns += '<button type="button" class="guide-route" data-id="' + escapeHtml(poi.id) + '">Cómo llegar</button>';
      btns += '<button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button>';
      if (hasPano360Mobile) {
        btns += '<button type="button" class="guide-pano360" data-id="' + escapeHtml(poi.id) + '">Ver exploración 360°</button>';
      }
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
    if (titleEl) titleEl.textContent = gp.poiNameText(poi) || "";
    body.innerHTML = mobilePoiInfoHtml(poi) +
      '<div class="guide-mobile-actions-buttons">' + btns + "</div>" +
      '<div class="guide-route-box" id="guideMobileRouteBox" role="status" aria-live="polite"></div>' +
      '<div class="guide-book-box" id="guideMobileBookBox"></div>';
    if (isDining && isMobileGuide()) {
      var info = body.querySelector(".guide-mobile-actions-info");
      var rows = info ? Array.prototype.slice.call(info.querySelectorAll(".guide-detail-row")) : [];
      var hiddenRows = rows.filter(function (row) {
        var label = row.querySelector("strong");
        return !label || (label.textContent !== "Horario" && label.textContent !== "Hours");
      });
      var buttonsEl = body.querySelector(".guide-mobile-actions-buttons");
      var buttons = buttonsEl ? Array.prototype.slice.call(buttonsEl.children) : [];
      var primary = [];
      if (poi.category === "restaurante") {
        primary = buttons.filter(function (btn) { return btn.classList.contains("guide-route") || btn.classList.contains("guide-book"); });
      } else {
        primary = buttons.filter(function (btn) { return btn.classList.contains("guide-route") || btn.classList.contains("guide-focus"); });
      }
      if (!primary.length) primary = buttons.slice(0, 2);
      var extraButtons = buttons.filter(function (btn) { return primary.indexOf(btn) === -1; });
      if (hiddenRows.length || extraButtons.length) {
        var extra = document.createElement("div");
        extra.className = "guide-mobile-actions-extra";
        extra.hidden = true;
        hiddenRows.forEach(function (row) { extra.appendChild(row); });
        if (extraButtons.length) {
          var extraWrap = document.createElement("div");
          extraWrap.className = "guide-mobile-actions-buttons";
          extraButtons.forEach(function (btn) { extraWrap.appendChild(btn); });
          extra.appendChild(extraWrap);
        }
        var more = document.createElement("button");
        more.type = "button";
        more.className = "guide-mobile-actions-more";
        more.setAttribute("data-mobile-actions-more", "");
        more.setAttribute("aria-expanded", "false");
        more.setAttribute("data-label-more", gp.menuToggleLabel());
        more.textContent = gp.menuToggleLabel();
        body.insertBefore(extra, buttonsEl ? buttonsEl.nextSibling : null);
        body.insertBefore(more, extra);
      }
    }
    panel.removeAttribute("hidden");
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
    if (wrap.classList.contains("is-guide-expanded")) {
      panel.style.left = "8px";
      panel.style.right = "8px";
      panel.style.width = "auto";
      panel.style.maxWidth = "none";
      panel.style.top = "calc(68px + 6px + env(safe-area-inset-top))";
      panel.style.bottom = "auto";
      panel.style.maxHeight = "calc(100vh - 84px - env(safe-area-inset-top))";
      return;
    }
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
    
    // Check if this POI has a 360° tour available
    var hasPano360 = (poi.category === "restaurante" || poi.category === "bar" || poi.category === "discoteca") && window.RevistaDigital.pannellum360 && typeof window.RevistaDigital.pannellum360.isPlayaParaiso === "function" && window.RevistaDigital.pannellum360.isPlayaParaiso(poi.hotelId || poi.hotel);
    
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
    
    var pano360Btn = (hasPano360 && verified) ? '<button type="button" class="guide-pano360" data-id="' + escapeHtml(poi.id) + '">Ver exploración 360°</button>' : "";
    
    if (isArea) {
      actions = '<p class="guide-detail-desc">Se representa como <strong>área/etiqueta</strong> en el mapa: no es una instalación con ruta.</p>' +
        '<div class="guide-detail-actions"><button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button></div>';
    } else if (verified) {
      actions = '<div class="guide-detail-actions">' +
        '<button type="button" class="guide-focus" data-id="' + escapeHtml(poi.id) + '">Ver en el mapa</button>' +
        '<button type="button" class="guide-route" data-id="' + escapeHtml(poi.id) + '">Cómo llegar</button>' +
        pano360Btn +
        bookingActions +
        "</div>";
    } else {
      actions = '<p class="guide-pending-note">La información de este lugar se está actualizando; en breve estará disponible en el mapa y con ruta.</p>' +
        (bookingActions ? '<div class="guide-detail-actions">' + bookingActions + "</div>" : "");
    }
    var english = isEnglishUi();
    var hoursFallback = english ? "Please check the Iberostar app." : "Consultar horario en la app de Iberostar";
    var cuisineFallback = english ? "Please check the Iberostar app." : "Consultar en la app de Iberostar";
    var missingMenu = english ? "Not available yet" : "No disponible por ahora";
    var extraInfo = "";
    // Desglose de horarios por servicio (desayuno / comida / cena / bar).
    var scheduleRows = "";
    if (poi.breakfast) scheduleRows += '<p class="guide-detail-row"><strong>' + (english ? "Breakfast" : "Desayuno") + '</strong> ' + escapeHtml(poi.breakfast) + "</p>";
    if (poi.lunch) scheduleRows += '<p class="guide-detail-row"><strong>' + (english ? "Lunch" : "Comida") + '</strong> ' + escapeHtml(poi.lunch) + "</p>";
    if (poi.dinner) scheduleRows += '<p class="guide-detail-row"><strong>' + (english ? "Dinner" : "Cena") + '</strong> ' + escapeHtml(poi.dinner) + "</p>";
    if (poi.late) scheduleRows += '<p class="guide-detail-row"><strong>Bar</strong> ' + escapeHtml(poi.late) + "</p>";

    if (poi.category === "restaurante") {
      var hours = poiHoursText(poi) || hoursFallback;
      var cuisine = gp.poiCuisineText(poi) || cuisineFallback;
      var restaurantMenu = poiMenuText(poi);
      extraInfo = '<div class="guide-extra-info">' +
        (scheduleRows ? "" : '<p class="guide-detail-row"><strong>' + (english ? "Hours" : "Horario") + '</strong> ' + escapeHtml(hours) + "</p>") +
        scheduleRows +
        '<p class="guide-detail-row"><strong>' + (english ? "Cuisine" : "Cocina") + '</strong> ' + escapeHtml(cuisine) + "</p>" +
        (restaurantMenu ? '<p class="guide-detail-row"><strong>' + (english ? "Menu" : "Menú") + '</strong> ' + escapeHtml(restaurantMenu) + "</p>" : "") +
        "</div>";
    } else if (poi.category === "spa") {
      var spaHours = poiHoursText(poi) || hoursFallback;
      var treatments = gp.poiTreatmentsText(poi) || (english ? "Check available treatments in the Iberostar app." : "Consulte los tratamientos disponibles en la app de Iberostar.");
      var spaPackages = gp.poiPackagesText(poi);
      extraInfo = '<div class="guide-extra-info">' +
        '<p class="guide-detail-row"><strong>' + (english ? "Hours" : "Horario") + '</strong> ' + escapeHtml(spaHours) + "</p>" +
        '<p class="guide-detail-row"><strong>' + (english ? "Treatments" : "Tratamientos") + '</strong> ' + escapeHtml(treatments) + "</p>" +
        (spaPackages ? '<p class="guide-detail-row"><strong>' + (english ? "Packages" : "Paquetes") + '</strong> ' + escapeHtml(spaPackages) + "</p>" : "") +
        "</div>";
    } else if (poi.category === "golf") {
      var golfHours = poiHoursText(poi) || hoursFallback;
      var golfPackages = gp.poiPackagesText(poi) || (english ? "Check packages in the Iberostar app." : "Consulte los paquetes en la app de Iberostar.");
      extraInfo = '<div class="guide-extra-info">' +
        '<p class="guide-detail-row"><strong>' + (english ? "Hours" : "Horario") + '</strong> ' + escapeHtml(golfHours) + "</p>" +
        (poi.teeTimes ? '<p class="guide-detail-row"><strong>Tee times</strong> ' + escapeHtml(poi.teeTimes) + "</p>" : "") +
        '<p class="guide-detail-row"><strong>' + (english ? "Packages" : "Paquetes") + '</strong> ' + escapeHtml(golfPackages) + "</p>" +
        "</div>";
    } else if (poi.category === "bar" || poi.category === "discoteca") {
      var barHours = poiHoursText(poi);
      var barMenu = poiMenuText(poi);
      var barCuisine = gp.poiCuisineText(poi);
      var barMenuLabel = english ? "Menu" : "Carta";
      extraInfo = '<div class="guide-extra-info">' +
        '<p class="guide-detail-row"><strong>' + (english ? "Hours" : "Horario") + '</strong> ' + escapeHtml(barHours || hoursFallback) + "</p>" +
        (barCuisine ? '<p class="guide-detail-row"><strong>' + (english ? "Concept" : "Concepto") + '</strong> ' + escapeHtml(barCuisine) + "</p>" : "") +
        '<p class="guide-detail-row"><strong>' + barMenuLabel + '</strong> ' + escapeHtml(barMenu || missingMenu) + "</p>" +
        "</div>";
    } else if (poi.category === "club" || poi.category === "starprestige") {
      var memberHours = poiHoursText(poi);
      var memberAmenities = gp.poiAmenitiesText(poi);
      var memberServices = gp.poiServicesText(poi);
      extraInfo = '<div class="guide-extra-info">' +
        (memberHours ? '<p class="guide-detail-row"><strong>' + (english ? "Hours" : "Horario") + '</strong> ' + escapeHtml(memberHours) + "</p>" : "") +
        (memberAmenities ? '<p class="guide-detail-row"><strong>' + (english ? "Amenities" : "Amenidades") + '</strong> ' + escapeHtml(memberAmenities) + "</p>" : "") +
        (memberServices ? '<p class="guide-detail-row"><strong>' + (english ? "Included services" : "Servicios incluidos") + '</strong> ' + escapeHtml(memberServices) + "</p>" : "") +
        "</div>";
    } else if (poiHoursText(poi) || poiMenuText(poi) || gp.poiPackagesText(poi)) {
      var genericHours = poiHoursText(poi);
      var genericCuisine = gp.poiCuisineText(poi);
      var genericMenu = poiMenuText(poi);
      var genericPackages = gp.poiPackagesText(poi);
      extraInfo = '<div class="guide-extra-info">' +
        (genericHours ? '<p class="guide-detail-row"><strong>' + (english ? "Hours" : "Horario") + '</strong> ' + escapeHtml(genericHours) + "</p>" : "") +
        (genericCuisine ? '<p class="guide-detail-row"><strong>' + (english ? "Concept" : "Concepto") + '</strong> ' + escapeHtml(genericCuisine) + "</p>" : "") +
        (genericMenu ? '<p class="guide-detail-row"><strong>' + (english ? "Menu" : "Carta") + '</strong> ' + escapeHtml(genericMenu) + "</p>" : "") +
        (genericPackages ? '<p class="guide-detail-row"><strong>' + (english ? "Packages" : "Paquetes") + '</strong> ' + escapeHtml(genericPackages) + "</p>" : "") +
        "</div>";
    }
    detail.innerHTML =
      '<button type="button" class="guide-detail-close" aria-label="Cerrar información del lugar" title="Cerrar">×</button>' +
      '<div class="guide-detail-feedback">' +
        '<div class="guide-route-box" id="guideRouteBox" role="status" aria-live="polite"></div>' +
        '<div class="guide-book-box" id="guideBookBox"></div>' +
      '</div>' +
      '<span class="guide-dot guide-dot--lg" style="background:' + categoryColor(poi.category) + '"></span>' +
      '<h3 class="guide-detail-title">' + escapeHtml(gp.poiNameText(poi)) + "</h3>" +
      '<p class="guide-detail-cat">' + escapeHtml(categoryLabel(poi.category)) + ((poi.hotelId || poi.hotel || poi.zone) ? ' · ' + escapeHtml(poi.hotelId || poi.hotel || poi.zone) : '') + "</p>" +
      (gp.poiDescriptionText(poi) ? '<p class="guide-detail-desc">' + escapeHtml(gp.poiDescriptionText(poi)) + "</p>" : "") +
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
  function renderBookingPanel(poi, kind, useMobileActions) {
    var showInMobileActions = useMobileActions === undefined ? isMobileGuide() : useMobileActions;
    var box = showInMobileActions
      ? mobileActionsRoot("#guideMobileBookBox")
      : (state.mount && state.mount.querySelector("#guideBookBox"));
    if (!box || !poi) return;
    var otherBox = showInMobileActions
      ? (state.mount && state.mount.querySelector("#guideBookBox"))
      : mobileActionsRoot("#guideMobileBookBox");
    if (otherBox) otherBox.innerHTML = "";
    if (!showInMobileActions && isMobileGuide()) {
      var detailActions = state.mount.querySelector("#guideDetail .guide-detail-actions");
      if (detailActions) detailActions.insertAdjacentElement("afterend", box);
    }
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
              try { sessionStorage.setItem('auto_fullscreen_transporte', 'true'); } catch (e) {}
              tracker.openPage(document.body.dataset.hotelSlug || "");
            });
            if (showInMobileActions) {
              try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
              if (state.mobilePoi) positionMobileActions(state.mobilePoi);
            } else revealFeedback(box);
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
    if (showInMobileActions) {
      positionMobileActions(state.mobilePoi);
      try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
    } else revealFeedback(box);
    // El formulario cambia la altura del menú: lo recolocamos sobre el panel.
    if (showInMobileActions) positionMobileActions(state.mobilePoi);
  }

  function scrollDiningCartBox(box) {
    try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) {}
  }

  function renderDiningCartDone(box, poi, request, tracker) {
    box.innerHTML = '<div class="guide-book-done guide-book-done--cart">' +
      '<h4 class="guide-book-title">Se solicitó el transporte</h4>' +
      '<p>Buscando un carrito para recogerte en ' + escapeHtml(request.pickup?.label || "") +
      ' y llevarte a ' + escapeHtml(request.destination?.name || poi.name) + '.</p>' +
      '<button type="button" class="guide-cart-track" data-guide-cart-track="1">Ver el transporte →</button>' +
      '</div>';
    box.querySelector("[data-guide-cart-track]")?.addEventListener("click", function () {
      try { sessionStorage.setItem("auto_fullscreen_transporte", "true"); } catch (e) {}
      gp.closeDiningOverlay?.();
      tracker.openPage(document.body.dataset.hotelSlug || "");
    });
    scrollDiningCartBox(box);
  }

  function renderDiningCartForm(overlay, poi) {
    var content = overlay && overlay.querySelector(".gp-dining-content");
    if (!content || !poi) return;
    var box = overlay.querySelector("[data-dining-cart-box]");
    if (!box) {
      box = document.createElement("section");
      box.className = "gp-dining-section gp-dining-cart-box";
      box.setAttribute("data-dining-cart-box", "");
      var actions = content.querySelector(".gp-dining-actions");
      if (actions) content.insertBefore(box, actions);
      else content.appendChild(box);
    }
    var tracker = window.RevistaDigital && window.RevistaDigital.carritoGolf;
    box.innerHTML = '<form class="guide-book-form" data-dining-cart-form>' +
      '<h4 class="guide-book-title">Solicitud de carrito de golf</h4>' +
      '<p class="guide-book-place">' + escapeHtml(poi.name) + '</p>' +
      '<p class="guide-book-note">El carrito le recogerá en su ubicación actual. Active la ubicación del dispositivo para compartir el punto exacto.</p>' +
      '<label class="guide-book-field"><span>Nombre</span><input type="text" name="nombre" data-dining-cart-name required /></label>' +
      '<label class="guide-book-field"><span>Habitación</span><input type="text" name="habitacion" data-dining-cart-room placeholder="Ej. 1204" /></label>' +
      '<label class="guide-book-field"><span>Notas</span><textarea name="notas" data-dining-cart-notes rows="2"></textarea></label>' +
      '<div class="guide-book-actions">' +
        '<button type="submit" class="guide-book-submit">Enviar solicitud</button>' +
        '<button type="button" class="guide-book-cancel" data-dining-cart-cancel="1">Cancelar</button>' +
      '</div>' +
      '<p class="guide-book-note">Su solicitud se registra en el sistema. La confirmación se realiza en recepción del hotel.</p>' +
      '</form>';
    var form = box.querySelector("[data-dining-cart-form]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!tracker || typeof tracker.request !== "function") {
        box.innerHTML = '<div class="guide-book-done">' +
          '<h4 class="guide-book-title">Solicitud enviada</h4>' +
          '<p>Registramos su solicitud de carrito de golf para ' + escapeHtml(poi.name) + '.</p>' +
          '<p>Recepción del hotel le confirmará la hora y el punto de encuentro.</p>' +
          '</div>';
        scrollDiningCartBox(box);
        return;
      }
      var destination = null;
      if (Number.isFinite(Number(poi.lat)) && Number.isFinite(Number(poi.lng))) {
        destination = { id: poi.id, name: poi.name, lat: Number(poi.lat), lng: Number(poi.lng) };
      } else if (poi.hotelId && typeof gp.poiForHotel === "function") {
        var hotelPoi = gp.poiForHotel(poi.hotelId);
        if (hotelPoi && Number.isFinite(Number(hotelPoi.lat)) && Number.isFinite(Number(hotelPoi.lng))) {
          destination = { id: hotelPoi.id, name: hotelPoi.name, lat: Number(hotelPoi.lat), lng: Number(hotelPoi.lng) };
        }
      }
      var request = tracker.request({
        guest: form.querySelector("[data-dining-cart-name]")?.value || "",
        room: form.querySelector("[data-dining-cart-room]")?.value || "",
        notes: form.querySelector("[data-dining-cart-notes]")?.value || "",
        destination: destination,
        source: "guide-map"
      });
      if (request) {
        renderDiningCartDone(box, poi, request, tracker);
        return;
      }
      box.innerHTML = '<div class="guide-book-done">' +
        '<h4 class="guide-book-title">Solicitud enviada</h4>' +
        '<p>Registramos su solicitud de carrito de golf para ' + escapeHtml(poi.name) + '.</p>' +
        '<p>Recepción del hotel le confirmará la hora y el punto de encuentro.</p>' +
        '</div>';
      scrollDiningCartBox(box);
    });
    box.querySelector("[data-dining-cart-cancel]")?.addEventListener("click", function () {
      box.innerHTML = "";
    });
    scrollDiningCartBox(box);
  }

  gp.renderDiningCartForm = renderDiningCartForm;

  function clearSelection() {
    state.selectedId = null;
    state.mobilePoi = null;
    renderList();
    renderDetail(null);
    renderMobileActions(null);
    var panel = mobileActionsRoot("#guideMobileActions");
    if (panel) panel.hidden = true;
    try {
      if (gp._map && typeof gp._map.closePopup === "function") gp._map.closePopup();
    } catch (e) { /* ignore map errors */ }
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
      if (marker && typeof marker.getPopup === "function" && typeof gp.bindPoiPopupActions === "function") {
        gp.bindPoiPopupActions(marker.getPopup());
      }
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
    var english = isEnglishUi();
    if (!actividades.length) {
      list.innerHTML = english
        ? '<li class="guide-activity-empty">No activities scheduled for today.</li>'
        : '<li class="guide-activity-empty">No hay actividades programadas para hoy.</li>';
      return;
    }
    list.innerHTML = actividades.map(function (item, index) {
      var poi = item.poiId ? findPoi(item.poiId) : null;
      var can = poi && canMap(poi);
      var activityName = english ? (item.nombreEn || item.nombre) : item.nombre;
      var activityPlace = english ? (item.lugarEn || item.lugar) : item.lugar;
      return '<li class="guide-activity-item' + (can ? " is-linked" : "") + '"' +
        (can ? ' data-activity-id="' + escapeHtml(item.poiId) + '" tabindex="0" role="button"' : "") + ">" +
        '<span class="guide-activity-time">' + escapeHtml(item.hora) + "</span>" +
        '<span class="guide-activity-name">' + escapeHtml(activityName) + "</span>" +
        '<span class="guide-activity-location">' + escapeHtml(activityPlace || "") + "</span>" +
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
  var english = isEnglishUi();
  var rows = [];
  var location = poi.hotel || poi.hotelId || poi.zone || "";
  var hours = poiHoursText(poi);
  var menu = poiMenuText(poi);
  if (hours) rows.push([english ? "Hours" : "Horario", hours]);
  var cuisine = gp.poiCuisineText(poi);
  if (cuisine) rows.push([poi.category === "restaurante" ? (english ? "Cuisine" : "Cocina") : (english ? "Concept" : "Concepto"), cuisine]);
  if (menu) rows.push([poi.category === "bar" || poi.category === "discoteca" ? (english ? "Menu" : "Carta") : (english ? "Menu" : "Men\u00fa"), menu]);
  var specialties = gp.poiSpecialtiesText(poi);
  if (specialties && specialties !== menu) rows.push([english ? "Specialties" : "Especialidades", specialties]);
  var cocteles = gp.poiCocktailsText(poi);
  if (cocteles) rows.push([english ? "Cocktails" : "C\u00f3cteles", cocteles]);
  var treatments = gp.poiTreatmentsText(poi);
  if (treatments) rows.push([english ? "Treatments" : "Tratamientos", treatments]);
  var packages = gp.poiPackagesText(poi);
  if (packages) rows.push([english ? "Packages" : "Paquetes", packages]);
  if (poi.teeTimes) rows.push(["Tee times", poi.teeTimes]);
  var amenities = gp.poiAmenitiesText(poi);
  if (amenities) rows.push([english ? "Amenities" : "Amenidades", amenities]);
  var services = gp.poiServicesText(poi);
  if (services) rows.push([english ? "Services" : "Servicios", services]);
  var dress = gp.poiDressCodeText(poi);
  if (dress) rows.push([english ? "Dress code" : "C\u00f3digo de vestimenta", dress]);
  var r = (poi.reservation !== undefined ? poi.reservation : poi.reservas);
  var reservationText = "";
  if (r !== undefined && r !== null && r !== "") reservationText = (typeof r === "boolean") ? (r ? (english ? "Recommended" : "Recomendada") : (english ? "Not required" : "No requerida")) : String(r);
  if (reservationText) rows.push([english ? "Reservations" : "Reservas", reservationText]);
  var description = gp.poiDescriptionText(poi);
  if (description) rows.push([english ? "Description" : "Descripci\u00f3n", description]);
  if (!rows.length) return "";
  var html = '<div class="guide-mobile-actions-info">';
  html += '<p class="guide-mobile-actions-cat">' + escapeHtml(categoryLabel(poi.category)) + (location ? ' \u00b7 ' + escapeHtml(location) : '') + '</p>';
  html += rows.map(function (row) { return '<p class="guide-detail-row"><strong>' + escapeHtml(row[0]) + '</strong> ' + escapeHtml(row[1]) + '</p>'; }).join("");
  html += '</div>';
  return html;
}

function poiCommonInfoHtml(poi) {
  if (!poi) return "";
  var english = isEnglishUi();
  var rows = [];
  var menu = poiMenuText(poi);
  var specialties = gp.poiSpecialtiesText(poi);
  if (specialties && specialties !== menu) rows.push([english ? "Specialties" : "Especialidades", specialties]);
  var cocteles = gp.poiCocktailsText(poi);
  if (cocteles) rows.push([english ? "Cocktails" : "C\u00f3cteles", cocteles]);
  var dress = gp.poiDressCodeText(poi);
  if (dress) rows.push([english ? "Dress code" : "C\u00f3digo de vestimenta", dress]);
  var r = (poi.reservation !== undefined ? poi.reservation : poi.reservas);
  var reservationText = "";
  if (r !== undefined && r !== null && r !== "") reservationText = (typeof r === "boolean") ? (r ? (english ? "Recommended" : "Recomendada") : (english ? "Not required" : "No requerida")) : String(r);
  if (reservationText) rows.push([english ? "Reservations" : "Reservas", reservationText]);
  if (!rows.length) return "";
  return '<div class="guide-extra-info guide-common-info">' + rows.map(function (row) {
    return '<p class="guide-detail-row"><strong>' + escapeHtml(row[0]) + '</strong> ' + escapeHtml(row[1]) + '</p>';
  }).join("") + '</div>';
}

  function buildBackTo360Button() {
    try {
      var stored = window.sessionStorage.getItem("club360LastViewed");
      if (!stored) return "";
      var data = JSON.parse(stored);
      if (!data || !data.label) return "";
      return '<button type="button" class="guide-back-to-360" data-back-to-360="true" aria-label="Volver a la exploración 360° de ' + escapeHtml(data.label) + '"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/></svg> Volver al 360°: ' + escapeHtml(data.label) + '</button>';
    } catch (e) { return ""; }
  }

  gp.syncBackTo360Button = function () { syncBackTo360Button(); };

  function syncBackTo360Button() {
    var host = document.querySelector(".guide-explorer-head--panel") || document.querySelector(".guide-explorer-title");
    if (!host) return;
    var existing = host.querySelector("[data-back-to-360]");
    var markup = buildBackTo360Button();
    if (!markup) {
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      return;
    }
    if (existing) existing.outerHTML = markup;
    else host.insertAdjacentHTML("beforeend", markup);
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
    
    var backTo360Html = buildBackTo360Button();

    var head = panelMode
      ? '<div class="guide-explorer-head guide-explorer-head--panel">' + backTo360Html + '</div>'
      : '<div class="guide-explorer-head">' +
          '<div class="guide-explorer-title">' +
            '<p class="portal-kicker">GUÍA INTERACTIVA · THE CLUB</p>' +
            "<h2>Explore los lugares del complejo</h2>" +
            "<p>Busque por nombre o filtre por categoría. Seleccione un lugar verificado para verlo en el mapa.</p>" +
            backTo360Html +
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
      if (event.target.closest("#guideMobileActionsClose") || event.target.closest(".guide-detail-close")) {
        clearSelection();
        return;
      }
      var more = event.target.closest("[data-mobile-actions-more]");
      if (more) {
        var diningPoi = state.mobilePoi;
        if (diningPoi && (diningPoi.category === "restaurante" || diningPoi.category === "bar")) {
          event.preventDefault();
          if (diningPoi.id) gp.openDiningOverlay(diningPoi.id);
          return;
        }
        var extra = more.parentNode ? more.parentNode.querySelector(".guide-mobile-actions-extra") : null;
        if (extra) {
          extra.hidden = !extra.hidden;
          more.setAttribute("aria-expanded", extra.hidden ? "false" : "true");
          more.textContent = extra.hidden ? (more.getAttribute("data-label-more") || gp.menuToggleLabel()) : gp.menuCollapseLabel();
          try { positionMobileActions(state.mobilePoi); } catch (e) {}
        }
        return;
      }
      var backTo360 = event.target.closest("[data-back-to-360]");
      if (backTo360) {
        event.preventDefault();
        event.stopPropagation();
        try {
          var last360 = window.sessionStorage.getItem("club360LastViewed");
          if (last360) {
            var last360Data = JSON.parse(last360);
            if (last360Data && window.RevistaDigital.pannellum360 && typeof window.RevistaDigital.pannellum360.open === "function") {
              window.RevistaDigital.pannellum360.open(last360Data.hotelName, last360Data.zoneKey, last360Data.label);
            }
          }
        } catch (e) { /* ignore */ }
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
        clearSelection();
        // Filtrar marcadores del mapa con animación
        try {
          if (window.RevistaDigital && window.RevistaDigital.guiapa) {
            window.RevistaDigital.guiapa.filterMapMarkers(state.filter);
          }
        } catch (e) { /* ignore */ }
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
        event.preventDefault();
        event.stopPropagation();
        var bookPoi = findPoi(book.getAttribute("data-id"));
        if (bookPoi) {
          if (state.selectedId !== bookPoi.id) selectPoi(bookPoi.id);
          renderBookingPanel(bookPoi, "booking", Boolean(event.target.closest("#guideMobileActions")));
        }
        return;
      }
      var cart = event.target.closest(".guide-cart");
      if (cart) {
        event.preventDefault();
        event.stopPropagation();
        var cartPoi = findPoi(cart.getAttribute("data-id"));
        if (cartPoi) {
          if (state.selectedId !== cartPoi.id) selectPoi(cartPoi.id);
          renderBookingPanel(cartPoi, "cart", Boolean(event.target.closest("#guideMobileActions")));
        }
        return;
      }
      var pano360 = event.target.closest(".guide-pano360");
      if (pano360) {
        event.preventDefault();
        event.stopPropagation();
        var panoPoi = findPoi(pano360.getAttribute("data-id"));
        if (panoPoi && window.RevistaDigital.pannellum360 && typeof window.RevistaDigital.pannellum360.open === "function") {
          var hotelName = panoPoi.hotelId || panoPoi.hotel;
          if (hotelName) {
            var panoZone = (panoPoi.category === "bar" || panoPoi.category === "discoteca") ? "bares" : "restaurantes";
            window.RevistaDigital.pannellum360.open(hotelName, panoZone, panoPoi.name, panoPoi.id);
            window.RevistaDigital?.guiapa?.syncBackTo360Button?.();
          }
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
  gp.renderMobileActions = renderMobileActions;
  gp.renderCategoryLegend = function (mount) {
    if (!mount) return false;
    mount.innerHTML = legendMarkup();
    return true;
  };

  function refreshGuideLanguage() {
    if (typeof gp.refreshPoiLayer === "function") {
      try { gp.refreshPoiLayer(); } catch (e) { /* ignore */ }
    }
    if (!state.mount) return;
    var filters = state.mount.querySelector("#guideFilters");
    if (filters) filters.innerHTML = categoryChips();
    renderLegend();
    renderList();
    renderActivities();
    renderDetail(state.selectedId ? findPoi(state.selectedId) : null);
  }

  gp.refreshGuideLanguage = refreshGuideLanguage;

  window.addEventListener("languagechange", function () {
    refreshGuideLanguage();
    var overlay = document.querySelector(".gp-dining-overlay");
    if (!overlay) return;
    var overlayId = overlay.dataset ? overlay.dataset.poiId : null;
    if (!overlayId || overlay.querySelector("form")) return;
    try { gp.openDiningOverlay(overlayId); } catch (e) { /* ignore */ }
  });
})();
