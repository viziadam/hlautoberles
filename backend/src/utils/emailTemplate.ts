import type { SendMailOptions } from 'nodemailer'
import * as env from '../config/env.config'
import {
  getTranslator,
  normalizeLanguage,
} from '../lang/translator'

export const escapeHtml = (
  value: unknown,
): string => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

export const multilineToHtml = (
  value: unknown,
): string => escapeHtml(value)
  .replaceAll(/\r?\n/g, '<br>')

interface BrandedEmailOptions {
  language?: string
  to: string
  subject: string
  recipientName?: string
  bodyText: string
  bodyHtml: string
}

export const createBrandedEmail = ({
  language,
  to,
  subject,
  recipientName,
  bodyText,
  bodyHtml,
}: BrandedEmailOptions): SendMailOptions => {
  const translator = getTranslator(language)

  const greeting = recipientName
    ? `${String(translator.t('HELLO'))}${recipientName},`
    : ''

  const regards = String(translator.t('REGARDS'))
  const companyTeam = String(
    translator.t('COMPANY_TEAM'),
  )

  const text = [
    greeting,
    greeting ? '' : undefined,
    bodyText,
    '',
    regards,
    companyTeam,
  ]
    .filter((line): line is string => (
      typeof line === 'string'
    ))
    .join('\n')

  const greetingHtml = recipientName
    ? `<p>${escapeHtml(
      String(translator.t('HELLO')),
    )}${escapeHtml(recipientName)},</p>`
    : ''

  return {
    from: env.SMTP_FROM,
    to,
    subject,
    text,
    html: `<!doctype html>
<html lang="${normalizeLanguage(language)}">
  <body>
    <div
      style="
        max-width:620px;
        margin:0 auto;
        padding:24px;
        font-family:Arial,sans-serif;
        line-height:1.6;
        color:#1f2937;
      "
    >
      ${greetingHtml}
      ${bodyHtml}

      <p>
        ${escapeHtml(regards)}<br>
        ${escapeHtml(companyTeam)}
      </p>
    </div>
  </body>
</html>`,
  }
}
