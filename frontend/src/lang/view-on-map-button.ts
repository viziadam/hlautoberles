import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    VIEW_ON_MAP: 'Voir sur la carte',
  },
  en: {
    VIEW_ON_MAP: 'View on map',
  },
  es: {
    VIEW_ON_MAP: 'Ver en el mapa',
  },
  hu: {
  VIEW_ON_MAP: 'Megtekintés térképen',
},
})

langHelper.setLanguage(strings)
export { strings }
