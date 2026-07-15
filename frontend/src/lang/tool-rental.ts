import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  en: {
    SEO_TITLE: 'Tool Rental in Budapest District XI',
    SEO_DESCRIPTION:
      'Professional drivers, grinders, ladders, step stools and scaffolding for rent in Budapest District XI.',

    SCHEMA_NAME: 'Tool rental in Budapest District XI',
    SCHEMA_DESCRIPTION:
      'Professional tools and work equipment available for rent',

    EYEBROW: 'HL Auto Rental · Budapest District XI',
    TITLE: 'Tool Rental in Budapest',
    INTRO:
      'You do not need to purchase a separate machine or tool for every job. Rent professional equipment for the period you need, subject to current availability.',

    CATALOG_TITLE: 'Tools and equipment available for rent',

    DRIVERS_TITLE: 'Drivers and hand tools',
    DRIVERS_DESCRIPTION:
      'Cordless drivers and hand tools for assembly, construction and home projects.',

    GRINDERS_TITLE: 'Cutting and grinding tools',
    GRINDERS_DESCRIPTION:
      'Angle grinders and other power tools for professional and home use.',

    LADDERS_TITLE: 'Ladders and step stools',
    LADDERS_DESCRIPTION:
      'Wooden and aluminium ladders and step stools in different sizes.',

    SCAFFOLDING_TITLE: 'Scaffolding and accessories',
    SCAFFOLDING_DESCRIPTION:
      'Scaffolding and related accessories for safe and efficient work.',

    AVAILABILITY_TITLE: 'Current availability',
    AVAILABILITY_TEXT:
      'Available models, quantities, rental periods and prices may change. Contact us before booking for the current inventory.',

    CONTACT_BUTTON: 'Ask about tool rental',
  },

  hu: {
    SEO_TITLE: 'Szerszámkölcsönzés Budapest XI. kerületében',
    SEO_DESCRIPTION:
      'Professzionális behajtók, sarokcsiszolók, létrák, fellépők és állványok kölcsönzése Budapest XI. kerületében.',

    SCHEMA_NAME: 'Szerszámkölcsönzés Budapest XI. kerületében',
    SCHEMA_DESCRIPTION:
      'Professzionális szerszámok és munkavégzést segítő eszközök kölcsönzése',

    EYEBROW: 'HL Autóbérlés · Budapest XI. kerület',
    TITLE: 'Szerszámkölcsönzés Budapesten',
    INTRO:
      'Nem szükséges minden munkához külön gépet vagy eszközt vásárolni. Bérelj professzionális szerszámokat a szükséges időszakra, az aktuális elérhetőség függvényében.',

    CATALOG_TITLE: 'Bérelhető szerszámok és eszközök',

    DRIVERS_TITLE: 'Behajtók és kéziszerszámok',
    DRIVERS_DESCRIPTION:
      'Akkumulátoros behajtók és kéziszerszámok szerelési, építési és otthoni munkákhoz.',

    GRINDERS_TITLE: 'Vágó- és csiszológépek',
    GRINDERS_DESCRIPTION:
      'Sarokcsiszolók és további elektromos szerszámok professzionális vagy otthoni munkavégzéshez.',

    LADDERS_TITLE: 'Létrák és fellépők',
    LADDERS_DESCRIPTION:
      'Fa- és alumínium létrák, valamint különböző magasságú fellépők.',

    SCAFFOLDING_TITLE: 'Állványok és kiegészítők',
    SCAFFOLDING_DESCRIPTION:
      'Biztonságos munkavégzéshez használható állványok és kapcsolódó kiegészítők.',

    AVAILABILITY_TITLE: 'Aktuális elérhetőség',
    AVAILABILITY_TEXT:
      'Az elérhető típusok, mennyiségek, bérlési időszakok és árak változhatnak. Foglalás előtt kérj tájékoztatást az aktuális készletről.',

    CONTACT_BUTTON: 'Érdeklődés szerszámbérlésről',
  },
})

langHelper.setLanguage(strings)

export { strings }
