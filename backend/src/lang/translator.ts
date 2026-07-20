import { I18n } from 'i18n-js'
import * as env from '../config/env.config'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { hu } from './hu'

export const SUPPORTED_LANGUAGES = [
  'hu',
  'en',
  'fr',
  'es',
] as const

export type SupportedLanguage = (
  typeof SUPPORTED_LANGUAGES[number]
)

const translations = {
  hu,
  en,
  fr,
  es,
}

const isSupportedLanguage = (
  language: string,
): language is SupportedLanguage => (
  SUPPORTED_LANGUAGES.includes(
    language as SupportedLanguage,
  )
)

export const normalizeLanguage = (
  language?: string,
): SupportedLanguage => {
  const normalized = String(language || '')
    .trim()
    .toLowerCase()
    .split('-')[0]

  if (isSupportedLanguage(normalized)) {
    return normalized
  }

  const defaultLanguage = String(
    env.DEFAULT_LANGUAGE || 'hu',
  )
    .trim()
    .toLowerCase()
    .split('-')[0]

  return isSupportedLanguage(defaultLanguage)
    ? defaultLanguage
    : 'hu'
}

const createTranslator = (
  language: SupportedLanguage,
): I18n => {
  const translator = new I18n(translations)

  translator.enableFallback = true
  translator.defaultLocale = 'hu'
  translator.locale = language

  return translator
}

const translators: Record<SupportedLanguage, I18n> = {
  hu: createTranslator('hu'),
  en: createTranslator('en'),
  fr: createTranslator('fr'),
  es: createTranslator('es'),
}

export const getTranslator = (
  language?: string,
): I18n => translators[normalizeLanguage(language)]

const intlLocales: Record<SupportedLanguage, string> = {
  hu: 'hu-HU',
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
}

export const formatDateTime = (
  value: Date | string,
  language?: string,
): string => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  if (env.TIMEZONE) {
    options.timeZone = env.TIMEZONE
  }

  return new Intl.DateTimeFormat(
    intlLocales[normalizeLanguage(language)],
    options,
  ).format(date)
}
