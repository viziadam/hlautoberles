import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    PICK_UP_DATE: 'Date de prise en charge',
    DROP_OFF_DATE: 'Date de retour',
    DROP_OFF: 'Restituer au même endroit',
    COVER: "Réservez votre voiture aujourd'hui!",
    SUPPLIERS_TITLE: 'Vous Connecter aux plus Grandes Enseignes',
    MAP_TITLE: 'Carte des Agences de Location de Voitures',
    MAP_PICK_UP_SELECTED: 'Lieu de prise en charge sélectionné',
    MAP_DROP_OFF_SELECTED: 'Lieu de restitution sélectionné',
    DESTINATIONS_TITLE: 'Parcourir par destinations',
    CAR_SIZE_TITLE: 'Consulter nos tailles de voitures',
    CAR_SIZE_TEXT: 'Nos véhicules sont disponibles en trois tailles principales.',
    MINI: 'MINI',
    MIDI: 'MIDI',
    MAXI: 'MAXI',
    SEARCH_FOR_CAR: 'Rechercher une voiture',

    TITLE: 'Les meilleures offres de location de voitures',
    SUBTITLE: "Comparez nos prix et réservez votre voiture dès aujourd'hui !",
    WHY_TITLE: "Réservez avec nous dès aujourd'hui et conduisez en toute confiance !",
    WHY_SERVICE_TITLE: 'Service',
    WHY_SERVICE: "Assistance routière 24h/24 pour une tranquillité d'esprit.",
    WHY_CHARGES_TITLE: 'Pas de frais cachés',
    WHY_CHARGES: 'Ce que vous voyez est ce que vous payez.',
    WHY_FLEET_TITLE: 'Flotte distinctive',
    WHY_FLEET: 'Choisissez parmi une large sélection de véhicules haut de gamme et fiables.',
    WHY_MILEAGE_TITLE: 'Kilométrage illimité',
    WHY_MILEAGE: 'Explorez les villes et au-delà sans limites.',
    WHY_MILEAGE_ASTERISK: "* s'applique lorsque cela est indiqué",
    SERVICES_TITLE: "Qu'est-ce qui nous différencie ?",
    SERVICES_FLEET_TITLE: 'Large gamme de véhicules',
    SERVICES_FLEET: 'Des voitures citadines compactes aux SUV de luxe, notre flotte distinctive répond à tous les besoins de voyage. Que ce soit pour les affaires ou les loisirs, nous avons la voiture parfaite pour votre voyage.',
    SERVICES_FLEXIBLE_TITLE: 'Prise en charge et restitution flexibles',
    SERVICES_FLEXIBLE: "Grâce à nos emplacements pratiques et à nos horaires flexibles, nous facilitons la location d'une voiture. Que vous arriviez dans une ville ou dans un aéroport international, votre véhicule sera prêt quand vous l'êtes.",
    SERVICES_PRICES_TITLE: 'Excellents prix',
    SERVICES_PRICES: "Nous proposons des tarifs compétitifs sur tous les véhicules, vous assurant d'obtenir des voitures de qualité supérieure à des prix imbattables. Pas besoin de faire de compromis - obtenez un excellent rapport qualité-prix à chaque fois.",
    SERVICES_BOOKING_ONLINE_TITLE: 'Réservation en ligne facile',
    SERVICES_BOOKING_ONLINE: "'Évitez les files d'attente et réservez votre location de voiture en quelques minutes via notre plateforme en ligne conviviale. Comparez les options, personnalisez votre location et sécurisez votre véhicule sans effort.",
    SERVICE_INSTANT_BOOKING_TITLE: 'Réservation instantanée',
    SERVICE_INSTANT_BOOKING: "Pas d'attente ! Une fois que vous avez choisi votre véhicule et effectué votre réservation, vous recevrez une confirmation immédiate, garantissant un processus de location fluide et sans tracas.",
    SERVICES_SUPPORT_TITLE: 'Assistance client 24h/24 et 7j/7',
    SERVICES_SUPPORT: "Que vous réserviez un véhicule, que vous ayez besoin d'assistance sur la route ou que vous ayez des questions, notre équipe d'assistance dédiée est disponible 24 heures sur 24.",
    CUSTOMER_CARE_TITLE: `Service client ${env.WEBSITE_NAME}`,
    CONTACT_US: 'Nous Contacter',
    CUSTOMER_CARE_SUBTITLE: 'Toujours là pour vous aider',
    CUSTOMER_CARE_TEXT: `Chez ${env.WEBSITE_NAME}, nous nous engageons à fournir une assistance rapide et fiable pour garantir que votre expérience de location de voiture soit fluide et agréable du début à la fin.`,
    CUSTOMER_CARE_ASSISTANCE: 'Assistance routière 24h/24 et 7j/7',
    CUSTOMER_CARE_MODIFICATION: 'Demandes de renseignements et modifications',
    CUSTOMER_CARE_GUIDANCE: 'Guide pour la sélection du véhicule',
    CUSTOMER_CARE_SUPPORT: 'Conseils et assistance',
  },
  en: {
    PICK_UP_DATE: 'Pick-up Date',
    DROP_OFF_DATE: 'Drop-off Date',
    DROP_OFF: 'Return to same location',
    COVER: 'Book your Car today!',
    SUPPLIERS_TITLE: 'Connecting you to the Biggest Brands',
    MAP_TITLE: 'Map of Car Rental Locations',
    MAP_PICK_UP_SELECTED: 'Pick-up Location selected',
    MAP_DROP_OFF_SELECTED: 'Drop-off Location selected',
    DESTINATIONS_TITLE: 'Browse by Destinations',
    CAR_SIZE_TITLE: 'Meet Some of Our Car sizes',
    CAR_SIZE_TEXT: 'Our vehicles come in three main sizes.',
    MINI: 'MINI',
    MIDI: 'MIDI',
    MAXI: 'MAXI',
    SEARCH_FOR_CAR: 'Search for a car',

    TITLE: 'Top Car Rental Deals',
    SUBTITLE: 'Compare our prices and book your car today!',
    WHY_TITLE: 'Book with us today and drive with confidence!',
    WHY_SERVICE_TITLE: 'Professional Fleet',
    WHY_SERVICE: 'Vehicles and equipment maintained to professional standards, previously used in industrial production and on-site installations.',
    WHY_CHARGES_TITLE: 'Transparent Rental',
    WHY_CHARGES: 'Clear rental terms with no hidden costs. You know exactly what you rent and for how long.',
    WHY_FLEET_TITLE: 'Vehicles & Tools',
    WHY_FLEET: 'From passenger cars to box vans, large trucks, and professional tools – everything you need from one place.',
    WHY_MILEAGE_TITLE: 'Flexible Usage',
    WHY_MILEAGE: 'hort-term or daily rentals with flexible usage options, tailored to work-related transport needs.',
    WHY_MILEAGE_ASTERISK: '*terms depend on vehicle category',
    SERVICES_TITLE: 'What Makes Us Different?',
    SERVICES_FLEET_TITLE: 'Vehicle Rental',
    SERVICES_FLEET:
  'Passenger cars, small cargo vans, and large box trucks available for work-related transport and logistics.',

    SERVICES_FLEXIBLE_TITLE: 'Tool Rental',
    SERVICES_FLEXIBLE:
  'Professional tools available for rent, including drills, hammer drills, angle grinders, ladders, and step platforms.',

    SERVICES_PRICES_TITLE: 'Fair Pricing',
    SERVICES_PRICES:
  'Work-oriented pricing designed for short-term and daily use, ideal for projects and installations.',

    SERVICES_BOOKING_ONLINE_TITLE: 'Simple Reservation',
    SERVICES_BOOKING_ONLINE:
  'Request your vehicle or tools online with a clear overview of availability and rental terms.',

    SERVICE_INSTANT_BOOKING_TITLE: 'Driver Service Available',
    SERVICE_INSTANT_BOOKING:
  'Need a driver? Optional chauffeur service is available for selected vehicles.',

SERVICES_SUPPORT_TITLE: 'Direct Support',
SERVICES_SUPPORT:
  'Rental managed directly by the fleet operator – fast communication and practical assistance.',
    CUSTOMER_CARE_TITLE: `${env.WEBSITE_NAME} Customer Care`,
    CONTACT_US: 'Contact Us',
    CUSTOMER_CARE_SUBTITLE: 'Always Here to Help',
    CUSTOMER_CARE_TEXT: `At ${env.WEBSITE_NAME}, we're dedicated to providing prompt and reliable support to ensure your car rental experience is smooth and enjoyable from start to finish.`,
    CUSTOMER_CARE_ASSISTANCE: '24/7 Roadside Assistance',
    CUSTOMER_CARE_MODIFICATION: 'Inquiries and Modifications',
    CUSTOMER_CARE_GUIDANCE: 'Vehicle Selection Guidance',
    CUSTOMER_CARE_SUPPORT: 'Advice and Support',
  },
  es: {
    PICK_UP_DATE: 'Fecha de recogida',
    DROP_OFF_DATE: 'Fecha de devolución',
    DROP_OFF: 'Devolver en el mismo lugar',
    COVER: '¡Reserva tu coche hoy!',
    SUPPLIERS_TITLE: 'Conectándote con las marcas más grandes',
    MAP_TITLE: 'Mapa de ubicaciones de alquiler de coches',
    MAP_PICK_UP_SELECTED: 'Ubicación de recogida seleccionada',
    MAP_DROP_OFF_SELECTED: 'Ubicación de devolución seleccionada',
    DESTINATIONS_TITLE: 'Buscar por destinos',
    CAR_SIZE_TITLE: 'Descubre algunos de nuestros tamaños de coches',
    CAR_SIZE_TEXT: 'Nuestros vehículos están disponibles en tres tamaños principales.',
    MINI: 'MINI',
    MIDI: 'MIDI',
    MAXI: 'MAXI',
    SEARCH_FOR_CAR: 'Buscar un coche',

    TITLE: 'Las mejores ofertas de alquiler de coches',
    SUBTITLE: '¡Compare nuestros precios y reserve su coche hoy mismo!',
    WHY_TITLE: '¡Reserve con nosotros hoy y conduzca con confianza!',
    WHY_SERVICE_TITLE: 'Servicio',
    WHY_SERVICE: 'Asistencia en carretera las 24 horas para su tranquilidad.',
    WHY_CHARGES_TITLE: 'Sin cargos ocultos',
    WHY_CHARGES: 'Lo que ve es lo que paga.',
    WHY_FLEET_TITLE: 'Flota distintiva',
    WHY_FLEET: 'Elija entre una amplia selección de vehículos premium y confiables.',
    WHY_MILEAGE_TITLE: 'Kilometraje ilimitado',
    WHY_MILEAGE: 'Explore ciudades y más allá sin límites.',
    WHY_MILEAGE_ASTERISK: '*se aplica cuando se indica',
    SERVICES_TITLE: 'Lo que nos distingue ¿Diferente?',
    SERVICES_FLEET_TITLE: 'Amplia gama de vehículos',
    SERVICES_FLEET: 'Desde coches urbanos compactos hasta SUV de lujo, nuestra distintiva flota satisface todas las necesidades de viaje. Ya sea por negocios o por placer, tenemos el coche perfecto para su viaje.',
    SERVICES_FLEXIBLE_TITLE: 'Recogida y devolución flexibles',
    SERVICES_FLEXIBLE: 'Ofrecemos ubicaciones convenientes y horarios flexibles, para que alquilar un coche sea una experiencia sin complicaciones. Tanto si llega a una ciudad como a un aeropuerto internacional, su vehículo estará listo cuando usted lo esté.',
    SERVICES_PRICES_TITLE: 'Precios excelentes',
    SERVICES_PRICES: 'Ofrecemos tarifas competitivas en todos los vehículos, lo que garantiza que obtendrá automóviles de la mejor calidad a precios inmejorables. No es necesario que haga concesiones: obtenga una excelente relación calidad-precio en todo momento.',
    SERVICES_BOOKING_ONLINE_TITLE: 'Reserva en línea sencilla',
    SERVICES_BOOKING_ONLINE: 'Evite las colas y reserve su alquiler de automóvil en minutos a través de nuestra plataforma en línea fácil de usar. Compare opciones, personalice su alquiler y asegure su vehículo sin esfuerzo.',
    SERVICE_INSTANT_BOOKING_TITLE: 'Reserva instantánea',
    SERVICE_INSTANT_BOOKING: '¡Sin esperas! Una vez que elijas tu vehículo y completes tu reserva, recibirás una confirmación inmediata, lo que garantiza un proceso de alquiler sin complicaciones y sin complicaciones.',
    SERVICES_SUPPORT_TITLE: 'Atención al cliente las 24 horas, los 7 días de la semana',
    SERVICES_SUPPORT: 'Ya sea que estés reservando un vehículo, necesites asistencia en la carretera o tengas alguna pregunta, nuestro equipo de soporte dedicado está disponible las 24 horas.',
    CUSTOMER_CARE_TITLE: `Atención al cliente de ${env.WEBSITE_NAME}`,
    CONTACT_US: 'Contáctanos',
    CUSTOMER_CARE_SUBTITLE: 'Siempre aquí para ayudar',
    CUSTOMER_CARE_TEXT: `En ${env.WEBSITE_NAME}, nos dedicamos a brindar asistencia rápida y confiable para garantizar que su experiencia de alquiler de automóviles sea fluida y placentera de principio a fin`,
    CUSTOMER_CARE_ASSISTANCE: 'Asistencia en carretera las 24 horas, los 7 días de la semana',
    CUSTOMER_CARE_MODIFICATION: 'Consultas y modificaciones',
    CUSTOMER_CARE_GUIDANCE: 'Orientación para la selección de vehículos',
    CUSTOMER_CARE_SUPPORT: 'Asesoramiento y asistencia',
  },
  hu: {
  PICK_UP_DATE: 'Átvétel dátuma',
  DROP_OFF_DATE: 'Leadás dátuma',
  DROP_OFF: 'Vissza ugyanoda',
  COVER: 'Foglalj autót még ma!',
  SUPPLIERS_TITLE: 'Kapcsolat a legnagyobb márkákkal',
  MAP_TITLE: 'Autókölcsönző helyszínek térképe',
  MAP_PICK_UP_SELECTED: 'Átvételi hely kiválasztva',
  MAP_DROP_OFF_SELECTED: 'Leadási hely kiválasztva',
  DESTINATIONS_TITLE: 'Böngéssz úti célok szerint',
  CAR_SIZE_TITLE: 'Járműkategóriák',
  CAR_SIZE_TEXT: 'Járműveink három fő méretkategóriába sorolhatók.',
  MINI: 'MINI',
  MIDI: 'MIDI',
  MAXI: 'MAXI',
  SEARCH_FOR_CAR: 'Autó keresése',

  TITLE: 'Legjobb autóbérlési ajánlatok',
  SUBTITLE: 'Hasonlítsd össze árainkat és foglalj egyszerűen!',
  WHY_TITLE: 'Foglalj nálunk, és vezess magabiztosan!',
  WHY_SERVICE_TITLE: 'Ipari minőség',
  WHY_SERVICE:
  'Gépjárműveink és eszközeink ipari környezetben használt, rendszeresen karbantartott flottából származnak.',

  WHY_CHARGES_TITLE: 'Átlátható bérlés',
  WHY_CHARGES:
  'Rejtett költségek nélkül, egyértelmű feltételekkel. Pontosan tudod, mit és mennyi időre bérelsz.',

  WHY_FLEET_TITLE: 'Járművek és eszközök',
  WHY_FLEET:
  'Személyautók, kis dobozos és nagy teherautók, valamint professzionális szerszámok egy helyen.',

  WHY_MILEAGE_TITLE: 'Rugalmas használat',
  WHY_MILEAGE:
  'Óradíjas vagy napidíjas bérlés, a munkavégzéshez igazítva.',
  WHY_MILEAGE_ASTERISK: '*kategóriától függően',
  SERVICES_TITLE: 'Szolgáltatásaink',

  SERVICES_FLEET_TITLE: 'Járműbérlés',
  SERVICES_FLEET:
  'Személyautók, kis dobozos és nagy teherautók bérlése munkavégzéshez és szállításhoz.',

  SERVICES_FLEXIBLE_TITLE: 'Szerszámbérlés',
  SERVICES_FLEXIBLE:
  'Bérelhető professzionális szerszámok: behajtók, fúrók, ütvefúrók, flexek, fa- és alumínium létrák, fellépők.',

  SERVICES_PRICES_TITLE: 'Korrekt árképzés',
  SERVICES_PRICES:
  'Munkavégzésre optimalizált díjak, rövid és napi bérlésre kialakítva.',

  SERVICES_BOOKING_ONLINE_TITLE: 'Egyszerű foglalás',
  SERVICES_BOOKING_ONLINE:
  'Járművek és eszközök igénylése online, egyértelmű elérhetőséggel és feltételekkel.',

  SERVICE_INSTANT_BOOKING_TITLE: 'Sofőrszolgálat',
  SERVICE_INSTANT_BOOKING:
  'Igény esetén sofőrt is biztosítunk a kiválasztott járművekhez.',

  SERVICES_SUPPORT_TITLE: 'Közvetlen ügyintézés',
  SERVICES_SUPPORT:
  'A bérlést közvetlenül az üzemeltető kezeli – gyors válaszok, gyakorlati segítség.',
  CUSTOMER_CARE_TITLE: `${env.WEBSITE_NAME} Ügyfélszolgálat`,
  CONTACT_US: 'Kapcsolatfelvétel',
  CUSTOMER_CARE_SUBTITLE: 'Mindig segítünk',
  CUSTOMER_CARE_TEXT:
    `A ${env.WEBSITE_NAME} csapata gyors és megbízható segítséget nyújt, hogy az autóbérlés zökkenőmentes legyen az elejétől a végéig.`,
  CUSTOMER_CARE_ASSISTANCE: '0–24 segítségnyújtás',
  CUSTOMER_CARE_MODIFICATION: 'Kérdések és módosítások',
  CUSTOMER_CARE_GUIDANCE: 'Segítség járműválasztásban',
  CUSTOMER_CARE_SUPPORT: 'Tanácsadás és támogatás',
},
})

langHelper.setLanguage(strings)
export { strings }
