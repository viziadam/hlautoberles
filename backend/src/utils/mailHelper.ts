import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import * as env from '../config/env.config'

const createTransporter = async (): Promise<nodemailer.Transporter> => {
  if (env.CI) {
    const testAccount = await nodemailer.createTestAccount()
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  }

  // const transporterOptions: SMTPTransport.Options = {
  //   host: env.SMTP_HOST,
  //   port: env.SMTP_PORT,
  //   auth: {
  //     user: env.SMTP_USER,
  //     pass: env.SMTP_PASS,
  //   },
  // }

  const transporterOptions: SMTPTransport.Options = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT, // 587
  secure: false,       // 587-es porton ez KÖTELEZŐEN false!
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  // Senior beállítások a timeout és TLS hibák ellen:
  connectionTimeout: 20000, // Emeld meg 20 másodpercre
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: {
    // Ez segít, ha a production szerveren a cert-ellenőrzés szigorú:
    rejectUnauthorized: false, 
    minVersion: 'TLSv1.2'
  },
  debug: true, // Ezt kapcsold be, hogy lássuk a pontos SMTP logot!
  logger: true  // Ez kiírja a teljes beszélgetést a Brevo-val a konzolra
};
  

  return nodemailer.createTransport(transporterOptions)
}

/**
 * Sends an email using either real SMTP credentials or a test account.
 *
 * @param mailOptions - Email content and metadata
 * @returns A promise resolving to the sending result
 */
export const sendMail = async (mailOptions: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> => {
  //! Enable if you want to use SMTP server for sending emails 
  const transporter = await createTransporter()
  return transporter.sendMail(mailOptions)
  console.log('[EMAIL DISABLED] Nem küldök levelet, csak logolok.', mailOptions.to);
  // return;
}
