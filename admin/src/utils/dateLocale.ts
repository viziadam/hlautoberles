import type { Locale } from 'date-fns'
import {
  enUS as dateEnUS,
  es as dateEs,
  fr as dateFr,
  hu as dateHu,
} from 'date-fns/locale'

import {
  enUS as pickerEnUS,
  esES as pickerEsES,
  frFR as pickerFrFR,
  huHU as pickerHuHU,
} from '@mui/x-date-pickers/locales'

type SupportedDateLanguage = (
  'hu' | 'en' | 'fr' | 'es'
)

const normalizeDateLanguage = (
  language?: string,
): SupportedDateLanguage => {
  const normalized = String(language || '')
    .trim()
    .toLowerCase()
    .split('-')[0]

  if (
    normalized === 'hu'
    || normalized === 'en'
    || normalized === 'fr'
    || normalized === 'es'
  ) {
    return normalized
  }

  return 'hu'
}

const dateLocales: Record<
  SupportedDateLanguage,
  Locale
> = {
  hu: dateHu,
  en: dateEnUS,
  fr: dateFr,
  es: dateEs,
}

const pickerLocales = {
  hu: pickerHuHU,
  en: pickerEnUS,
  fr: pickerFrFR,
  es: pickerEsES,
}

export const getDateFnsLocale = (
  language?: string,
): Locale => (
  dateLocales[normalizeDateLanguage(language)]
)

export const getPickerLocaleText = (
  language?: string,
) => (
  pickerLocales[
    normalizeDateLanguage(language)
  ].components.MuiLocalizationProvider
    .defaultProps.localeText
)
