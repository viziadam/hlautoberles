import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    CONGRATULATIONS: 'Félicitation!',
    SUCCESS: 'Votre paiement a été effectué avec succès. Nous vous avons envoyé un e-mail de confirmation.',
    SUCCESS_PAY_LATER: 'Votre réservation a été effectuée avec succès. Nous vous avons envoyé un e-mail de confirmation.',
    ERROR: 'Something went wrong! Try again later',
    STATUS_TITLE: `${env.WEBSITE_NAME} Confirmation de réservation`,
    STATUS_MESSAGE: "Vérifiez votre boîte mail et suivez les étapes décrites dans l'e-mail de confirmation de réservation pour réserver votre voiture.",
  },
  en: {
    CONGRATULATIONS: 'Congratulations!',
    SUCCESS: 'Your payment was successfully done. We sent you a confirmation email.',
    PENDING: 'Your reservation request was successful. Our staff will contact you shortly. We sent you a confirmation email.', 
    SUCCESS_PAY_LATER: 'Your booking was successfully done. We sent you a confirmation email.',
    ERROR: 'Something went wrong! Try again later',
    STATUS_TITLE: `${env.WEBSITE_NAME} Booking Confirmation`,
    STATUS_MESSAGE: 'Check your mailbox and follow the steps described in the booking confirmation email to book your car.',
  },
  es: {
    CONGRATULATIONS: '¡Felicitaciones!',
    SUCCESS: 'Tu pago se realizó con éxito. Te hemos enviado un correo de confirmación.',
    SUCCESS_PAY_LATER: 'Tu reserva se ha realizado con éxito. Te hemos enviado un correo de confirmación.',
    ERROR: '¡Algo salió mal! Inténtelo nuevamente más tarde',
    STATUS_TITLE: `${env.WEBSITE_NAME} Confirmación de reserva`,
    STATUS_MESSAGE: 'Revise su buzón de correo y siga los pasos descritos en el correo electrónico de confirmación de reserva para reservar su vehículo.',
  },
  hu: {
  CONGRATULATIONS: 'Gratulálunk!',
  SUCCESS:
    'A fizetés sikeresen megtörtént. Megerősítő emailt küldtünk.',
  PENDING:
    'A foglalási kérelem sikeres volt. Munkatársaink hamarosan felveszik veled a kapcsolatot. Megerősítő emailt küldtünk.',
  SUCCESS_PAY_LATER:
    'A foglalás sikeresen létrejött. Megerősítő emailt küldtünk.',
  ERROR:
    'Hiba történt. Kérjük, próbáld újra később.',
  STATUS_TITLE: `${env.WEBSITE_NAME} – Foglalás visszaigazolása`,
  STATUS_MESSAGE:
    'Ellenőrizd az email fiókodat, és kövesd a visszaigazoló emailben leírt lépéseket.',
},

})

langHelper.setLanguage(strings)
export { strings }
