(function () {
  window.RevistaDigital = window.RevistaDigital || {};

  // Descripciones editoriales basadas en las páginas oficiales de cada hotel.
  // Las imágenes se mantienen en hotel-gallery-data.js y las fichas de Riviera Maya no se modifican.
  const hotelContent = {
    "Iberostar Selection Playa Mita": {
      tagline: "Pacific, nature and local culture",
      description: "Resort facing the Pacific in Riviera Nayarit, with semi-private beach, three pools, golf, sports and local and international cuisine.",
      tabs: {
        habitaciones: { description: "Choose from rooms and suites with sea, sunset, golf course or garden views.", keyPoints: ["Junior Suites and family suites", "Sea view options"] },
        restaurante: { description: "The proposal combines Mexican cuisine and international specialties; consult the restaurant selection on this card.", keyPoints: ["Local and international flavors", "Specialty restaurants"] },
        piscinas: { description: "The complex features an infinity pool, children's pool and water park.", keyPoints: ["Three pools", "Children's water park"] },
        experiencias: { description: "Enjoy direct beach access, Star Camp activities, tennis, PADI diving and golf course.", keyPoints: ["Semi-private beach", "PADI diving and golf"] }
      }
    },
    "Iberostar Waves Cozumel": {
      tagline: "Caribbean beaches and diving",
      description: "Resort beside Cozumel's reefs, with access to diving and snorkeling activities, beach and rooms with terrace.",
      tabs: {
        habitaciones: { description: "Tropical rooms with terrace; some offer direct access to the beach.", keyPoints: ["Private terrace", "Beachfront options"] },
        restaurante: { description: "The resort offers buffet and Mexican cuisine; consult the restaurant selection on this card.", keyPoints: ["International buffet", "Mexican cuisine"] },
        piscinas: { description: "Alternate beach time with the resort's outdoor pool.", keyPoints: ["Outdoor pool", "Beach access"] },
        experiencias: { description: "Proximity to the reefs makes this hotel a great base for diving and snorkeling in Cozumel.", keyPoints: ["Dive center", "Caribbean reefs"] }
      }
    },
    "Iberostar Selection Cancún": {
      tagline: "Caribbean-front villas",
      description: "Resort facing Playa Delfines with villas, ten pools, golf course, spa and Mexican and international restaurants.",
      tabs: {
        habitaciones: { description: "In addition to family rooms, there are villas in quiet areas; some have semi-private pools.", keyPoints: ["Villas and family rooms", "Semi-private pool options"] },
        restaurante: { description: "The offering includes buffet, Mexican, Italian, Japanese cuisine, meats and seaside proposals; consult the selection on this card.", keyPoints: ["Mexican and international cuisine", "Restaurants and bars"] },
        piscinas: { description: "The resort features ten pools, plus children's areas and villas with shared semi-private pools.", keyPoints: ["Ten pools", "Children's areas"] },
        experiencias: { description: "The complex has spa, golf, tennis, PADI dive center, Star Camp and direct beach access.", keyPoints: ["Playa Delfines access", "Golf, spa and diving"] }
      }
    },
    "Iberostar Selection Coral Cancún": {
      tagline: "Exclusive area within the resort",
      description: "Coral Level is an adults-only area within Iberostar Selection Cancún, with private pool and personalized service.",
      tabs: {
        habitaciones: { description: "The section features villas and rooms with exclusive services; some have semi-private pools.", keyPoints: ["Adults-only area", "Exclusive villas and rooms"] },
        restaurante: { description: "Enjoy the gastronomic options of the Selection Cancún complex and consult the restaurant selection on this card.", keyPoints: ["Access to resort offering", "Mexican and international cuisine"] },
        piscinas: { description: "Coral Level has a private pool and guests can enjoy the complex pools.", keyPoints: ["Private pool", "Access to complex pools"] },
        experiencias: { description: "The stay combines personalized services with access to the resort's facilities, spa, golf and beach.", keyPoints: ["Personalized service", "Access to Selection Cancún"] }
      }
    },
    "JOIA Rose Hall by Iberostar": {
      tagline: "Oceanfront luxury, adults only",
      description: "Adults-only luxury hotel in Montego Bay, with renovated suites, Swim-up and Butler options, spa and access to other complex hotels.",
      tabs: {
        habitaciones: { description: "The hotel offers 295 renovated suites, including Swim-up and Butler categories.", keyPoints: ["295 suites", "Swim-up and Butler options"] },
        restaurante: { description: "Gastronomy brings together specialty restaurants and Jamaican flavors; consult the selection on this card.", keyPoints: ["Specialty restaurants", "Jamaican flavors"] },
        piscinas: { description: "There is an oceanfront pool and suites with direct water access in Swim-up categories.", keyPoints: ["Outdoor pool", "Swim-up suites"] },
        experiencias: { description: "Adults-only hotel with spa, concierge, water sports and access to other Rose Hall complex hotels.", keyPoints: ["Adults only", "Spa and complex access"] }
      }
    },
    "Iberostar Selection Rose Hall Suites": {
      tagline: "Family suites in Jamaica",
      description: "All-inclusive oceanfront resort in Montego Bay, with suites, Star Camp, splash pool, spa and access to Iberostar Waves Rose Hall Beach.",
      tabs: {
        habitaciones: { description: "All rooms are suites; there are family options and garden, sea or pool views.", keyPoints: ["All rooms are suites", "Family options"] },
        restaurante: { description: "The complex offers specialty restaurants and bars; consult the selection on this card and confirm hours with the hotel.", keyPoints: ["Specialty restaurants", "Shared complex offering"] },
        piscinas: { description: "The resort features a pool and children's splash pool, plus beachfront areas.", keyPoints: ["Children's splash pool", "Direct beach access"] },
        experiencias: { description: "Star Camp, spa, sports and access to Rose Hall Beach facilities are part of the stay.", keyPoints: ["Star Camp", "Spa and shared complex"] }
      }
    },
    "Coral Level at Iberostar Selection Rose Hall Suites": {
      tagline: "Exclusive service in Rose Hall",
      description: "Coral Level offers a more private experience within the Selection Rose Hall Suites complex, with personalized services and access to the resort.",
      tabs: {
        habitaciones: { description: "The Coral Level category offers exclusive stay spaces within the Rose Hall complex.", keyPoints: ["Exclusive category", "Personalized services"] },
        restaurante: { description: "The card shows a selection of complex restaurants; confirm with the hotel which are included for your stay.", keyPoints: ["Complex restaurants", "Availability based on stay"] },
        piscinas: { description: "Guests can enjoy the Rose Hall complex pool areas.", keyPoints: ["Resort pools", "Rest areas"] },
        experiencias: { description: "The experience integrates Coral Level services with the complex's shared facilities.", keyPoints: ["Personalized attention", "Access to Rose Hall complex"] }
      }
    },
    "Iberostar Waves Rose Hall Beach": {
      tagline: "Beaches and activities in Montego Bay",
      description: "All-inclusive oceanfront resort with two activity pools, water park, spa and access to Rose Hall complex services.",
      tabs: {
        habitaciones: { description: "Caribbean-facing rooms with garden, pool or sea view options.", keyPoints: ["Caribbean views", "Family rooms"] },
        restaurante: { description: "The offering includes buffet and specialty restaurants; consult the selection on this card and official hours.", keyPoints: ["Buffet and specialties", "Complex restaurants"] },
        piscinas: { description: "The hotel has two activity pools and a water park.", keyPoints: ["Two activity pools", "Water park"] },
        experiencias: { description: "Enjoy beach access, spa, entertainment and shared Rose Hall complex services.", keyPoints: ["Direct beach access", "Spa and entertainment"] }
      }
    },
    "Iberostar Selection Bávaro Suites": {
      tagline: "Suites between gardens and beach",
      description: "All-inclusive hotel beside Playa Bávaro, with family suites, splash pool, Star Camp, spa and 18-hole golf course.",
      tabs: {
        habitaciones: { description: "There are suites with garden views, garden access, beach access and pool access.", keyPoints: ["Family suites", "Beach or pool access options"] },
        restaurante: { description: "The resort features buffet and specialty restaurants; consult the selection on this card and the resort's current offering.", keyPoints: ["Buffet and international cuisine", "Specialty restaurants"] },
        piscinas: { description: "The hotel offers a pool and children's splash pool, plus direct access to Playa Bávaro.", keyPoints: ["Children's splash pool", "Playa Bávaro"] },
        experiencias: { description: "Star Camp, spa, dive center, sports and an 18-hole golf course expand the stay.", keyPoints: ["Star Camp and PADI diving", "18-hole golf"] }
      }
    },
    "JOIA Bávaro by Iberostar": {
      tagline: "Adults-only luxury stay",
      description: "Adults-only luxury hotel on Playa Bávaro, with concierge service, spa, golf and access to restaurants and bars of other complex hotels.",
      tabs: {
        habitaciones: { description: "Accommodation includes luxury suites and categories with personalized attention.", keyPoints: ["Luxury suites", "Concierge service"] },
        restaurante: { description: "The proposal combines five a la carte restaurants, buffet and a 24-hour gourmet station; consult the selection on this card.", keyPoints: ["Five a la carte restaurants", "24-hour gourmet station"] },
        piscinas: { description: "Pool areas feature concierge service; consult the hotel on which spaces are enabled during your stay.", keyPoints: ["Pool with concierge", "Rest areas"] },
        experiencias: { description: "The hotel offers spa and golf access, plus restaurants and bars from other Bávaro complex hotels.", keyPoints: ["Adults only", "Spa, golf and Bávaro complex"] }
      }
    },
    "Iberostar Waves Punta Cana": {
      tagline: "Playa Bávaro and tropical life",
      description: "All-inclusive resort facing Playa Bávaro, with tropical gardens, Star Camp, spa, dive center, golf and coral lab.",
      tabs: {
        habitaciones: { description: "Rooms with balcony and garden, pool or sea view options.", keyPoints: ["Rooms with balcony", "Tropical views"] },
        restaurante: { description: "The offering includes Dominican and international buffet and themed restaurants; consult the selection on this card.", keyPoints: ["Dominican buffet", "Themed restaurants"] },
        piscinas: { description: "Alternate outdoor pool with direct access to Playa Bávaro beach.", keyPoints: ["Outdoor pool", "Direct beach access"] },
        experiencias: { description: "The stay includes Star Camp activities, water sports, dive center and access to the resort's 18-hole golf course.", keyPoints: ["Star Camp and water sports", "Diving and golf"] }
      }
    },
    "Iberostar Waves Dominicana": {
      tagline: "The Caribbean to enjoy as a family",
      description: "All-inclusive hotel facing Playa Bávaro, with tropical gardens, restaurants and bars, spa, golf and family activities.",
      tabs: {
        habitaciones: { description: "Rooms with balcony and tropical view options for couples and families.", keyPoints: ["Rooms with balcony", "Family options"] },
        restaurante: { description: "The offering brings together six themed restaurants, two buffets and seven bars; consult the selection on this card.", keyPoints: ["Six themed restaurants", "Two buffets"] },
        piscinas: { description: "Enjoy the outdoor pool and direct access to Playa Bávaro beach.", keyPoints: ["Outdoor pool", "Playa Bávaro"] },
        experiencias: { description: "The hotel offers Star Camp, spa, tennis, dive center, golf and a coral lab.", keyPoints: ["Family activities", "Diving and coral conservation"] }
      }
    },
    "Iberostar Selection Praia do Forte": {
      tagline: "Nature and beach in Bahia",
      description: "Oceanfront resort within a Bahia nature reserve, with five pools, spa, golf course and TAMAR conservation project activities.",
      tabs: {
        habitaciones: { description: "Rooms and suites for families, with Star Prestige services and categories available.", keyPoints: ["Rooms and suites", "Star Prestige categories"] },
        restaurante: { description: "Gastronomy brings together Bahian cuisine and international specialties; consult the selection on this card.", keyPoints: ["Local and international cuisine", "Specialty restaurants"] },
        piscinas: { description: "The complex has five pools, splash pool and direct beach access.", keyPoints: ["Five pools", "Children's splash pool"] },
        experiencias: { description: "Within the reserve you can learn about turtle conservation work; there is also golf, tennis, surfing and Star Camp.", keyPoints: ["TAMAR turtle conservation", "Golf and sports"] }
      }
    },
    "Praia do Forte · Star Prestige": {
      tagline: "Star Prestige services in Praia do Forte",
      description: "Star Prestige is a category of preferred services and spaces at Iberostar Selection Praia do Forte, not a separate hotel.",
      tabs: {
        habitaciones: { description: "Check available Star Prestige rooms and advantages when booking Iberostar Selection Praia do Forte.", keyPoints: ["Selection hotel category", "Benefits subject to availability"] },
        restaurante: { description: "Restaurants belong to Selection Praia do Forte hotel; consult the selection and access conditions.", keyPoints: ["Selection hotel offering", "Conditions based on reservation"] },
        piscinas: { description: "Pools are part of the resort; exclusive areas and benefits depend on the contracted category.", keyPoints: ["Resort pools", "Access by category"] },
        experiencias: { description: "Star Prestige adds services and preferred spaces within the hotel, without constituting a separate property.", keyPoints: ["Preferred services", "Selection Praia do Forte hotel"] }
      }
    },
    "Iberostar Waves Bahia": {
      tagline: "Bahian hospitality and flavors",
      description: "All-inclusive resort beside the beach in Praia do Forte, with six restaurants, spa, pools, family activities and Star Prestige areas.",
      tabs: {
        habitaciones: { description: "Choose from rooms and suites, with some Star Prestige categories and services available.", keyPoints: ["Rooms and suites", "Star Prestige categories"] },
        restaurante: { description: "Restaurants feature Brazilian flavors, Italian cuisine and international proposals; consult the selection on this card.", keyPoints: ["Brazilian cuisine", "Six restaurants"] },
        piscinas: { description: "The hotel has a pool and direct beach access; there are water activities for families.", keyPoints: ["Outdoor pool", "Direct beach access"] },
        experiencias: { description: "Enjoy spa, Star Camp activities, sports and shows for all ages.", keyPoints: ["Star Camp and entertainment", "Spa and sports"] }
      }
    },
    "Iberostar Heritage Grand Amazon": {
      tagline: "A hotel that sails the Amazon",
      description: "All-inclusive cruise departing from the Port of Manaus, offering three, four and seven-night itineraries along the Solimões and Negro rivers.",
      tabs: {
        habitaciones: { description: "On board there are cabins and suites; several categories have private balconies facing the river.", keyPoints: ["Cabins and suites", "Balcony options"] },
        restaurante: { description: "VITÓRIA-RÈGIA offers buffet and a la carte dinners; Tucano Grill serves breakfasts and lunches on the terrace. Hours depend on the route.", keyPoints: ["VITÓRIA-RÈGIA and Tucano Grill", "Hours based on itinerary"] },
        piscinas: { description: "The ship has a pool and decks to relax during navigation.", keyPoints: ["Pool on board", "River view terrace"] },
        experiencias: { description: "Choose from three itineraries with day and night excursions, onboard activities and Amazon talks.", keyPoints: ["Three itineraries", "Included excursions"] }
      }
    },
    "Iberostar Waves Tucán": {
      tagline: "All-inclusive oceanfront in Playacar",
      description: "All-inclusive hotel in Playacar, Playa del Carmen, with five specialty restaurants, three buffets, spa, water sports and activities for the whole family. Shares complex with Iberostar Waves Quetzal.",
      tabs: {
        habitaciones: { description: "Accommodation for couples and families within the Tucán & Quetzal complex.", keyPoints: ["Family rooms and suites", "Shared Tucán & Quetzal complex"] },
        restaurante: { description: "Five specialty restaurants —La Góndola (Italian), Bonsai (Japanese), Mare Nostrum (Mediterranean), Uxmal (Mexican) and La Hacienda Smoke House (meats)—, plus Cozumel buffet and gluten-free options.", keyPoints: ["Five specialty restaurants", "Cozumel buffet and gluten-free options"] },
        piscinas: { description: "The complex has pools for adults and children, plus beach access.", keyPoints: ["Adults and children pools", "Beach access"] },
        experiencias: { description: "Star Camp, professional entertainment, water sports, tennis and gym, with spa and nearby golf course.", keyPoints: ["Star Camp and entertainment", "Water sports and spa"] }
      }
    },
    "Iberostar Waves Quetzal": {
      tagline: "Oceanfront with four pools in Playacar",
      description: "All-inclusive oceanfront hotel in Playacar, Playa del Carmen, with direct beach access, four pools, five specialty restaurants, spa and family programs. Shares complex with Iberostar Waves Tucán.",
      tabs: {
        habitaciones: { description: "Accommodation for couples and families within the Tucán & Quetzal complex.", keyPoints: ["Family rooms and suites", "Shared Tucán & Quetzal complex"] },
        restaurante: { description: "Five specialty restaurants —La Góndola (Italian), Bonsai (Japanese), Mare Nostrum (Mediterranean), Uxmal (Mexican) and La Hacienda Smoke House (meats)—, plus Cozumel buffet and gluten-free and plant-based options.", keyPoints: ["Five specialty restaurants", "Cozumel buffet, gluten-free options"] },
        piscinas: { description: "Four pools, including children's pool, plus direct beach access.", keyPoints: ["Four pools", "Direct beach access"] },
        experiencias: { description: "Star Camp, entertainment, PADI diving, tennis, gym and oceanfront spa within the complex.", keyPoints: ["Star Camp and entertainment", "PADI diving and spa"] }
      }
    }
  };

  const serviceSections = {
    "Iberostar Selection Playa Mita": ["Centro de buceo PADI", "Star Camp", "Tenis y golf"],
    "Iberostar Waves Cozumel": ["Centro de buceo", "Snorkel", "Spa y actividades acuáticas"],
    "Iberostar Selection Cancún": ["Spa Sensations", "Golf y tenis", "Centro de buceo PADI", "Star Camp"],
    "Iberostar Selection Coral Cancún": ["Servicio personalizado", "Piscina privada", "Acceso a instalaciones del resort"],
    "JOIA Rose Hall by Iberostar": ["Concierge", "Spa", "Deportes acuáticos", "Traslados"],
    "Iberostar Selection Rose Hall Suites": ["Star Camp", "Spa", "Servicio a la habitación", "Acceso a Rose Hall Beach"],
    "Coral Level at Iberostar Selection Rose Hall Suites": ["Servicios Coral Level", "Instalaciones compartidas", "Confirmar beneficios al reservar"],
    "Iberostar Waves Rose Hall Beach": ["Parque acuático", "Spa", "Espectáculos", "Centro de buceo PADI"],
    "Iberostar Selection Bávaro Suites": ["Star Camp", "Spa", "Golf de 18 hoyos", "Centro de buceo PADI"],
    "JOIA Bávaro by Iberostar": ["Concierge", "Circuito de spa", "Golf", "Acceso gastronómico al complejo"],
    "Iberostar Waves Punta Cana": ["Star Camp", "Laboratorio de corales", "Deportes acuáticos", "Golf"],
    "Iberostar Waves Dominicana": ["Star Camp", "Laboratorio de corales", "Spa", "Deportes"],
    "Iberostar Selection Praia do Forte": ["Proyecto de conservación TAMAR", "Star Camp", "Spa", "Golf y tenis"],
    "Praia do Forte · Star Prestige": ["Servicios preferentes", "Espacios exclusivos según categoría", "Beneficios sujetos a reserva"],
    "Iberostar Waves Bahia": ["Star Camp", "Spa", "Deportes y espectáculos", "Star Prestige disponible"],
    "Iberostar Heritage Grand Amazon": ["Excursiones incluidas", "Piscina y gimnasio a bordo", "Charlas y actividades", "Atención médica a bordo"],
    "Iberostar Waves Tucán": ["Restaurantes de especialidad (x5)", "Star Camp y parque infantil", "Deportes acuáticos y buceo PADI", "Spa y masajes (con cargo)", "Wi-Fi gratuito"],
    "Iberostar Waves Quetzal": ["Frente al mar con acceso directo a la playa", "Cuatro piscinas (incl. infantil)", "Star Camp y animación", "Buceo PADI y deportes acuáticos", "Spa y masajes frente al mar", "Wi-Fi gratuito"]
  };

  Object.entries(serviceSections).forEach(([hotelName, keyPoints]) => {
    if (hotelContent[hotelName]) {
      hotelContent[hotelName].tabs.servicios = {
        description: `Consulte los servicios destacados de ${hotelName}; su disponibilidad puede depender de la categoría y las fechas de estancia.`,
        keyPoints
      };
    }
  });

  window.RevistaDigital.hotelContent = hotelContent;
})();