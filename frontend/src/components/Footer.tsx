import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { MailOutline } from '@mui/icons-material'
import { strings } from '@/lang/footer'
import env from '@/config/env.config'
import '@/assets/css/footer.css'

const Footer = () => {
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
          </ul>
        </div>
        <div className="main-section">
          <div className="title">{strings.RENT}</div>
          <ul className="links">
            <li>
              <RouterLink to="/autoberles-budapest">
                Autó- és teherautó-bérlés
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/szerszamkolcsonzes-budapest">
                Szerszámkölcsönzés
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
