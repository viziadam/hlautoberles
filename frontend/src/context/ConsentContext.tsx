import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyGoogleConsent,
  clearAnalyticsCookies,
  readConsent,
  writeConsent,
  type ConsentPreferences,
} from '@/utils/consent'
import { init as initAnalytics } from '@/utils/ga4'
import {
  initClarity,
  updateClarityConsent,
} from '@/utils/clarity'

interface ConsentContextValue {
  consent: ConsentPreferences | null
  consentReady: boolean
  analyticsAllowed: boolean
  panelOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (analytics: boolean) => void
}

const ConsentContext = createContext<
  ConsentContextValue | undefined
>(undefined)

interface ConsentProviderProps {
  children: ReactNode
}

export const ConsentProvider = ({
  children,
}: ConsentProviderProps) => {
  const [consent, setConsent] = (
    useState<ConsentPreferences | null>(null)
  )
  const [consentReady, setConsentReady] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  const applyPreferences = useCallback((
    nextConsent: ConsentPreferences,
  ) => {
    applyGoogleConsent(nextConsent.analytics)

    if (nextConsent.analytics) {
      initAnalytics()
      initClarity()
      updateClarityConsent(true)
    } else {
      updateClarityConsent(false)
      clearAnalyticsCookies()
    }
  }, [])

  useEffect(() => {
    const storedConsent = readConsent()

    if (storedConsent) {
      setConsent(storedConsent)
      applyPreferences(storedConsent)
    } else {
      setPanelOpen(true)
    }

    setConsentReady(true)
  }, [applyPreferences])

  const savePreferences = useCallback((
    analytics: boolean,
  ) => {
    const nextConsent = writeConsent(analytics)

    setConsent(nextConsent)
    applyPreferences(nextConsent)
    setPanelOpen(false)
  }, [applyPreferences])

  const openSettings = useCallback(() => {
    setPanelOpen(true)
  }, [])

  const closeSettings = useCallback(() => {
    if (consent) {
      setPanelOpen(false)
    }
  }, [consent])

  const acceptAll = useCallback(() => {
    savePreferences(true)
  }, [savePreferences])

  const rejectAll = useCallback(() => {
    savePreferences(false)
  }, [savePreferences])

  const value = useMemo<ConsentContextValue>(() => ({
    consent,
    consentReady,
    analyticsAllowed: consent?.analytics === true,
    panelOpen,
    openSettings,
    closeSettings,
    acceptAll,
    rejectAll,
    savePreferences,
  }), [
    acceptAll,
    closeSettings,
    consent,
    consentReady,
    openSettings,
    panelOpen,
    rejectAll,
    savePreferences,
  ])

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  )
}

export const useConsent = () => {
  const context = useContext(ConsentContext)

  if (!context) {
    throw new Error(
      'useConsent must be used inside ConsentProvider.',
    )
  }

  return context
}
