import * as bookcarsTypes from ':bookcars-types'

const { Mini, Midi, Maxi } = bookcarsTypes.CarRange

export type VehicleLandingKey =
  | 'all'
  | 'passenger'
  | 'commercial'

export interface VehicleLandingConfig {
  key: VehicleLandingKey
  path: string
  defaultRanges: bookcarsTypes.CarRange[]

  seoTitle: string
  seoDescription: string
  schemaName: string
  schemaDescription: string

  hu: {
    heroEyebrow: string
    heroTitle: string
    heroDescription: string
    contentTitle: string
    contentDescription: string
  }

  en: {
    heroEyebrow: string
    heroTitle: string
    heroDescription: string
    contentTitle: string
    contentDescription: string
  }
}

export const VEHICLE_LANDINGS: Record<
  VehicleLandingKey,
  VehicleLandingConfig
> = {
  all: {
    key: 'all',
    path: '/autoberles-budapest',
    defaultRanges: [Mini, Midi, Maxi],

    seoTitle: 'Autó- és teherautó-bérlés Budapesten',
    seoDescription:
      'Személyautó-, kisteherautó- és teherautó-bérlés Budapest XI. kerületében. Hasonlítsd össze az árakat, az elérhetőséget és a bérlési feltételeket.',

    schemaName: 'Autó- és teherautó-bérlés Budapesten',
    schemaDescription:
      'Személyautók, kisteherautók és teherautók bérlése Budapest XI. kerületében.',

    hu: {
      heroEyebrow: 'Járműbérlés · Budapest XI. kerület',
      heroTitle: 'Autó- és teherautó-bérlés Budapesten',
      heroDescription:
        'Hasonlítsd össze az elérhető személyautókat, kisteherautókat és teherautókat.',
      contentTitle: 'Melyik jármű illik a feladathoz?',
      contentDescription:
        'Foglalás előtt összehasonlíthatod az árakat, a felszereltséget és a legfontosabb bérlési feltételeket.',
    },

    en: {
      heroEyebrow: 'Vehicle rental · Budapest District XI',
      heroTitle: 'Car and truck rental in Budapest',
      heroDescription:
        'Compare available passenger cars, vans and trucks.',
      contentTitle: 'Which vehicle suits the job?',
      contentDescription:
        'Compare prices, equipment and rental terms before booking.',
    },
  },

  passenger: {
    key: 'passenger',
    path: '/szemelyauto-berles-budapest',
    defaultRanges: [Mini],

    seoTitle: 'Személyautó-bérlés Budapesten',
    seoDescription:
      'Személyautó-bérlés Budapest XI. kerületében városi használatra, üzleti útra vagy hosszabb időszakra. Online keresés és átlátható feltételek.',

    schemaName: 'Személyautó-bérlés Budapesten',
    schemaDescription:
      'Személyautók bérlése Budapest XI. kerületében.',

    hu: {
      heroEyebrow: 'Személyautó-bérlés · Budapest XI. kerület',
      heroTitle: 'Személyautó-bérlés Budapesten',
      heroDescription:
        'Válassz személyautót városi közlekedéshez, üzleti útra vagy hosszabb használatra.',
      contentTitle: 'Személyautó-bérlés egyszerűen',
      contentDescription:
        'Add meg a bérlés időpontját, majd hasonlítsd össze az elérhető személyautók árait, felszereltségét, kaucióját és feltételeit.',
    },

    en: {
      heroEyebrow: 'Passenger car rental · Budapest District XI',
      heroTitle: 'Passenger car rental in Budapest',
      heroDescription:
        'Choose a passenger car for city travel, business or longer use.',
      contentTitle: 'Simple passenger car rental',
      contentDescription:
        'Choose your dates and compare available passenger cars.',
    },
  },

  commercial: {
    key: 'commercial',
    path: '/teherauto-berles-budapest',
    defaultRanges: [Midi, Maxi],

    seoTitle: 'Kisteherautó- és teherautó-bérlés Budapesten',
    seoDescription:
      'Kisteherautó- és teherautó-bérlés Budapest XI. kerületében költözéshez, áruszállításhoz és munkavégzéshez. Online keresés és foglalás.',

    schemaName: 'Kisteherautó- és teherautó-bérlés Budapesten',
    schemaDescription:
      'Kisteherautók és nagyobb teherautók bérlése Budapest XI. kerületében.',

    hu: {
      heroEyebrow: 'Teherautó-bérlés · Budapest XI. kerület',
      heroTitle: 'Kisteherautó- és teherautó-bérlés Budapesten',
      heroDescription:
        'Válassz kisebb vagy nagyobb teherautót költözéshez, áruszállításhoz vagy munkavégzéshez.',
      contentTitle: 'Teherautó a feladathoz megfelelő méretben',
      contentDescription:
        'Hasonlítsd össze a kisebb dobozos és nagyobb rakterű járművek árait, kilométerkeretét, kaucióját és bérlési feltételeit.',
    },

    en: {
      heroEyebrow: 'Van and truck rental · Budapest District XI',
      heroTitle: 'Van and truck rental in Budapest',
      heroDescription:
        'Choose a van or truck for moving, deliveries or work.',
      contentTitle: 'The right vehicle for the job',
      contentDescription:
        'Compare available vans and trucks before booking.',
    },
  },
}

export const getVehicleLandingByPath = (
  pathname: string,
): VehicleLandingConfig => (
  Object.values(VEHICLE_LANDINGS).find(
    (landing) => landing.path === pathname,
  ) || VEHICLE_LANDINGS.all
)

export const getVehicleLandingByRanges = (
  ranges: bookcarsTypes.CarRange[],
): VehicleLandingConfig => {
  const uniqueRanges = new Set(ranges)

  if (
    uniqueRanges.size === 1
    && uniqueRanges.has(Mini)
  ) {
    return VEHICLE_LANDINGS.passenger
  }

  if (
    uniqueRanges.size > 0
    && !uniqueRanges.has(Mini)
    && (
      uniqueRanges.has(Midi)
      || uniqueRanges.has(Maxi)
    )
  ) {
    return VEHICLE_LANDINGS.commercial
  }

  return VEHICLE_LANDINGS.all
}
