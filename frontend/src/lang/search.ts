import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SHOW_FILTERS: 'Afficher les filtres',
    HILE_FILTERS: 'Masquer les filtres',
  },
  en: {
    SHOW_FILTERS: 'Show Filters',
    HILE_FILTERS: 'Hide Filters',
    SEO_TITLE: 'Car and Van Rental in Budapest',
    SEO_DESCRIPTION:
      'Passenger car, cargo van and truck rental in Budapest District XI. Compare availability, prices and rental terms, then book online.',

    SCHEMA_NAME: 'Car and van rental in Budapest',
    SCHEMA_DESCRIPTION:
      'Passenger car, cargo van and truck rental in Budapest',

    HERO_EYEBROW: 'Vehicle rental · Budapest District XI',
    HERO_TITLE: 'Car and van rental in Budapest',
    HERO_DESCRIPTION:
      'Compare passenger cars, cargo vans and trucks available for your selected dates, then book the vehicle that best fits the job.',

    HIGHLIGHT_AVAILABILITY: 'Current availability',
    HIGHLIGHT_TERMS: 'Clear prices and rental terms',
    HIGHLIGHT_PICKUP: 'Pick-up on Galvani Street',

    DIRECT_SEARCH_EYEBROW: 'New search',
    DIRECT_SEARCH_TITLE: 'Choose your rental dates',
    DIRECT_SEARCH_TEXT:
      'After searching, we only show vehicles available for the selected period.',

    SERVICES_EYEBROW: 'Help with choosing',
    SERVICES_TITLE: 'Which vehicle suits the job?',
    SERVICES_DESCRIPTION:
      'Compare prices, equipment and the most important rental conditions before booking.',

    PASSENGER_TITLE: 'Passenger car rental',
    PASSENGER_TEXT:
      'Choose a passenger car for city travel, business use or a longer rental. The vehicle card shows the daily price, number of seats, gearbox, deposit and other important conditions.',
    PASSENGER_LINK: 'View available passenger cars',

    TRUCK_TITLE: 'Cargo van and truck rental',
    TRUCK_TEXT:
      'Choose a compact cargo van or a larger truck for moving, deliveries or work. Check the daily mileage allowance and all rental conditions before booking.',
    TRUCK_LINK: 'View available vans and trucks',

    DRIVER_TITLE: 'Vehicle rental with a driver',
    DRIVER_TEXT:
      'Selected vehicles can also be requested with a driver. Route, date, cargo and pricing are agreed individually in advance.',
    DRIVER_LINK: 'Request rental with a driver',

    TOOLS_EYEBROW: 'Additional service',
    TOOLS_TITLE: 'Do you also need tools for the job?',
    TOOLS_TEXT:
      'Drivers, angle grinders, ladders, step stools, scaffolding and other work equipment are also available for rent.',
    TOOLS_LINK: 'View rental tools',

    PICKUP_LABEL: 'Vehicle pick-up:',
    CONTACT_LINK: 'Contact and further information',
    COMPANY_LOCATION_NAME: 'HL Auto Rental depot',
  },
  es: {
    SHOW_FILTERS: 'Mostrar filtros',
    HILE_FILTERS: 'Ocultar filtros',
  },
  hu: {
  SHOW_FILTERS: 'Szűrők megjelenítése',
  HILE_FILTERS: 'Szűrők elrejtése',
  SEO_TITLE: 'Autó- és teherautó-bérlés Budapesten',
  SEO_DESCRIPTION:
    'Személyautó-, kisteherautó- és teherautó-bérlés Budapest XI. kerületében. Hasonlítsd össze az elérhetőséget, az árakat és a feltételeket, majd foglalj online.',

  SCHEMA_NAME: 'Autó- és teherautó-bérlés Budapesten',
  SCHEMA_DESCRIPTION:
    'Személyautó-, kisteherautó- és teherautó-bérlés',

  HERO_EYEBROW: 'Járműbérlés · Budapest XI. kerület',
  HERO_TITLE: 'Autó- és teherautó-bérlés Budapesten',
  HERO_DESCRIPTION:
    'Hasonlítsd össze a kiválasztott időszakban elérhető személyautókat, kisteherautókat és teherautókat, majd foglald le a feladathoz megfelelő járművet.',

  HIGHLIGHT_AVAILABILITY: 'Aktuális elérhetőség',
  HIGHLIGHT_TERMS: 'Átlátható árak és feltételek',
  HIGHLIGHT_PICKUP: 'Átvétel a Galvani utcában',

  DIRECT_SEARCH_EYEBROW: 'Új keresés',
  DIRECT_SEARCH_TITLE: 'Add meg a bérlés időpontját',
  DIRECT_SEARCH_TEXT:
    'A keresés után csak az adott időszakban elérhető járműveket mutatjuk.',

  SERVICES_EYEBROW: 'Segítség a választáshoz',
  SERVICES_TITLE: 'Melyik jármű illik a feladathoz?',
  SERVICES_DESCRIPTION:
    'Foglalás előtt összehasonlíthatod az árakat, a felszereltséget és a legfontosabb bérlési feltételeket.',

  PASSENGER_TITLE: 'Személyautó-bérlés',
  PASSENGER_TEXT:
    'Városi ügyintézéshez, üzleti úthoz vagy hosszabb használatra is választhatsz személyautót. A járműkártyán rögtön látható a napi ár, a férőhelyek száma, a sebességváltó típusa és a kaució.',
  PASSENGER_LINK: 'Elérhető személyautók',

  TRUCK_TITLE: 'Kisteherautó- és teherautó-bérlés',
  TRUCK_TEXT:
    'Költözéshez, áruszállításhoz vagy munkavégzéshez kis dobozos és nagyobb rakterű járművek közül választhatsz. Foglalás előtt ellenőrizheted a kilométerkeretet és a feltételeket.',
  TRUCK_LINK: 'Elérhető kisteherautók és teherautók',

  DRIVER_TITLE: 'Járműbérlés sofőrrel',
  DRIVER_TEXT:
    'Egyes járműveink sofőrrel is kérhetők. Az útvonalat, az időpontot, a rakományt és a díjazást minden esetben előzetesen egyeztetjük.',
  DRIVER_LINK: 'Sofőrös bérlés egyeztetése',

  TOOLS_EYEBROW: 'Kiegészítő szolgáltatás',
  TOOLS_TITLE: 'Szerszámra is szükséged van a munkához?',
  TOOLS_TEXT:
    'Behajtók, sarokcsiszolók, létrák, fellépők, állványok és további munkavégzést segítő eszközök is bérelhetők.',
  TOOLS_LINK: 'Bérelhető szerszámok',

  PICKUP_LABEL: 'Járműátvétel:',
  CONTACT_LINK: 'Kapcsolat és további információ',
  COMPANY_LOCATION_NAME: 'HL Autóbérlés telephely',
},
})

langHelper.setLanguage(strings)
export { strings }
