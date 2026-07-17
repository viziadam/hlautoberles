import { useEffect, useState } from 'react'
import * as UserService from '@/services/UserService'
import { useConsent } from '@/context/ConsentContext'
import '@/assets/css/cookie-consent.css'

const translations = {
  hu: {
    title: 'Sütibeállítások',
    text:
      'A weboldal működéséhez szükséges sütiket mindig használjuk. '
      + 'A statisztikai mérés csak a hozzájárulásod után indul el.',
    necessary: 'Szükséges sütik',
    necessaryHelp: 'A weboldal alapvető működéséhez.',
    analytics: 'Statisztikai sütik',
    analyticsHelp:
      'Névtelen használati adatok a weboldal fejlesztéséhez.',
    accept: 'Összes elfogadása',
    reject: 'Elutasítás',
    settings: 'Beállítások',
    save: 'Beállítások mentése',
    cancel: 'Mégse',
    policy: 'Sütikezelési tájékoztató',
  },
  en: {
    title: 'Cookie settings',
    text:
      'Necessary cookies are always used for the website to work. '
      + 'Analytics starts only after your consent.',
    necessary: 'Necessary cookies',
    necessaryHelp: 'Required for the core website functionality.',
    analytics: 'Analytics cookies',
    analyticsHelp:
      'Anonymous usage data used to improve the website.',
    accept: 'Accept all',
    reject: 'Reject',
    settings: 'Settings',
    save: 'Save settings',
    cancel: 'Cancel',
    policy: 'Cookie policy',
  },
} as const

const CookieConsent = () => {
  const {
    consent,
    consentReady,
    panelOpen,
    closeSettings,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useConsent()

  const language = UserService.getLanguage() === 'en'
    ? 'en'
    : 'hu'
  const text = translations[language]

  const [preferencesOpen, setPreferencesOpen] = (
    useState(false)
  )
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false)

    if (panelOpen && consent) {
      setPreferencesOpen(true)
    }
  }, [consent, panelOpen])

  if (!consentReady || !panelOpen) {
    return null
  }

  return (
    <section
      className="cookie-consent"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-copy">
          <h2 id="cookie-consent-title">
            {text.title}
          </h2>

          <p>{text.text}</p>

          <a href="/cookie-policy">
            {text.policy}
          </a>
        </div>

        {preferencesOpen ? (
          <div className="cookie-consent-preferences">
            <label className="cookie-consent-option">
              <input
                type="checkbox"
                checked
                disabled
              />
              <span>
                <strong>{text.necessary}</strong>
                <small>{text.necessaryHelp}</small>
              </span>
            </label>

            <label className="cookie-consent-option">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => {
                  setAnalytics(event.target.checked)
                }}
              />
              <span>
                <strong>{text.analytics}</strong>
                <small>{text.analyticsHelp}</small>
              </span>
            </label>

            <div className="cookie-consent-actions">
              <button
                type="button"
                className="cookie-consent-primary"
                onClick={() => savePreferences(analytics)}
              >
                {text.save}
              </button>

              {consent && (
                <button
                  type="button"
                  className="cookie-consent-secondary"
                  onClick={() => {
                    setPreferencesOpen(false)
                    closeSettings()
                  }}
                >
                  {text.cancel}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="cookie-consent-actions">
            <button
              type="button"
              className="cookie-consent-primary"
              onClick={acceptAll}
            >
              {text.accept}
            </button>

            <button
              type="button"
              className="cookie-consent-secondary"
              onClick={rejectAll}
            >
              {text.reject}
            </button>

            <button
              type="button"
              className="cookie-consent-secondary"
              onClick={() => setPreferencesOpen(true)}
            >
              {text.settings}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CookieConsent
