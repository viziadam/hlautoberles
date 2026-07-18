import LocalizedStrings from 'localized-strings'
import env from '@/config/env.config'

export const strings = new LocalizedStrings({
  hu: {
    SEO_TITLE: 'Kapcsolat és járműátvétel',
    SEO_DESCRIPTION:
      `Kapcsolatfelvétel a ${env.WEBSITE_NAME} csapatával. `
      + 'Jármű- és eszközátvétel Budapest XI. kerületében.',

    EYEBROW: 'Segítünk a választásban',
    TITLE: `Kapcsolat – ${env.WEBSITE_NAME}`,

    INTRO:
      'Autó-, teherautó- vagy szerszámbérléssel kapcsolatban '
      + 'telefonon, e-mailben vagy az űrlapon keresztül '
      + 'érhetsz el bennünket.',

    PHONE: 'Telefon',
    EMAIL: 'E-mail',

    PICKUP_TITLE: 'Átvétel a XI. kerületben',

    PICKUP_DESCRIPTION:
      'A járművek és eszközök átvételének pontos időpontját '
      + 'a foglalás visszaigazolásakor egyeztetjük.',

    OPEN_MAP: 'Cím megnyitása térképen',
    PHONE_ARIA_LABEL: 'Telefonhívás indítása',
    EMAIL_ARIA_LABEL: 'E-mail küldése',
  },

  en: {
    SEO_TITLE: 'Contact and vehicle pick-up',
    SEO_DESCRIPTION:
      `Contact ${env.WEBSITE_NAME}. Vehicle and equipment pick-up `
      + 'is available in Budapest District XI.',

    EYEBROW: 'We are here to help',
    TITLE: `Contact – ${env.WEBSITE_NAME}`,

    INTRO:
      'For car, truck or tool rental enquiries, contact us by '
      + 'phone, email or through the contact form.',

    PHONE: 'Phone',
    EMAIL: 'Email',

    PICKUP_TITLE: 'Pick-up in Budapest District XI',

    PICKUP_DESCRIPTION:
      'The exact time for collecting vehicles and equipment '
      + 'will be arranged when your booking is confirmed.',

    OPEN_MAP: 'Open address in maps',
    PHONE_ARIA_LABEL: 'Start phone call',
    EMAIL_ARIA_LABEL: 'Send email',
  },
})
