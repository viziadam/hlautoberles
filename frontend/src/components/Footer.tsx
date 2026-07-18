import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { MailOutline, PhoneOutlined, } from '@mui/icons-material'
import { strings } from '@/lang/footer'
import env from '@/config/env.config'
import '@/assets/css/footer.css'

import * as UserService from '@/services/UserService'
import { useConsent } from '@/context/ConsentContext'

const Footer = () => {

  const { openSettings } = useConsent()
  const language = UserService.getLanguage()

  return (
    <div className="footer">
      <div className="header">{env.WEBSITE_NAME}</div>
      <section className="main">
        <div className="main-section">
          <div className="title">{strings.CORPORATE}</div>
          <ul className="links">
            <li><RouterLink to="/about">{strings.ABOUT}</RouterLink></li>
            <li><RouterLink to="/cookie-policy">{strings.COOKIE_POLICY}</RouterLink></li>
            <li><RouterLink to="/privacy">{strings.PRIVACY_POLICY}</RouterLink></li>
            <li><RouterLink to="/tos">{strings.TOS}</RouterLink></li>
            <li>
              <button
                type="button"
                className="footer-cookie-settings"
                onClick={openSettings}
              >
                {
                  language === 'en'
                    ? 'Cookie settings'
                    : 'Sütibeállítások'
                }
              </button>
            </li>
          </ul>
        </div>
        <div className="main-section">
          <div className="title">{strings.RENT}</div>
          <ul className="links">
            <li>
              <RouterLink to="/autoberles-budapest">
                {strings.VEHICLE_RENTAL}
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/szerszamkolcsonzes-budapest">
                {strings.TOOL_RENTAL}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div className="main-section">
          <div className="title">{strings.SUPPORT}</div>
          <ul className="links">
            <li><RouterLink to="/contact">{strings.CONTACT}</RouterLink></li>
            <li><RouterLink to="/faq">{strings.FAQ}</RouterLink></li>
          </ul>
          <div className="footer-contact">
            <MailOutline className="icon" />
            <a href={`mailto:${env.CONTACT_EMAIL}`}>{env.CONTACT_EMAIL}</a>
          </div>
          {env.CONTACT_PHONE && (
            <div className="footer-contact">
              <PhoneOutlined className="icon" />
                    
              <a
                href={`tel:${env.CONTACT_PHONE.replace(/[^\d+]/g, '')}`}
                aria-label={`${strings.PHONE}: ${env.CONTACT_PHONE}`}
              >
                {env.CONTACT_PHONE}
              </a>
            </div>
          )}
          {/* <div className="newsletter">
            <NewsletterForm />
          </div> */}
        </div>
      </section>
      <section className="copyright">
        <div className="copyright">
          <span>{strings.COPYRIGHT_PART1}</span>
          <span>{strings.COPYRIGHT_PART2}</span>
        </div>
      </section>
    </div>
  )
}
export default Footer
