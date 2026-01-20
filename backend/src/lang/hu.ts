import * as env from '../config/env.config'

export const hu = {
  ERROR: 'Belső hiba: ',
  DB_ERROR: 'Adatbázis hiba: ',
  SMTP_ERROR: 'SMTP hiba – Az email küldése sikertelen: ',

  ACCOUNT_ACTIVATION_SUBJECT: 'Fiók aktiválása',
  HELLO: 'Kedves ',
  ACCOUNT_ACTIVATION_LINK: 'Kérjük, aktiváld a fiókodat az alábbi linkre kattintva:',
  REGARDS: `Üdvözlettel,<br>${env.WEBSITE_NAME} csapata`,

  ACCOUNT_ACTIVATION_TECHNICAL_ISSUE:
    'Technikai probléma történt! Kérjük, kattints az újraküldés gombra az email megerősítéséhez.',
  ACCOUNT_ACTIVATION_LINK_EXPIRED:
    'Az aktiváló link lejárhatott. Kérjük, kattints az újraküldés gombra az email megerősítéséhez.',
  ACCOUNT_ACTIVATION_LINK_ERROR:
    'Nem találtunk felhasználót ehhez az ellenőrzéshez. Kérjük, regisztrálj.',
  ACCOUNT_ACTIVATION_SUCCESS:
    'A fiókod sikeresen aktiválásra került.',
  ACCOUNT_ACTIVATION_RESEND_ERROR:
    'Nem találtunk felhasználót ezzel az email címmel. Kérjük, ellenőrizd az email címet.',
  ACCOUNT_ACTIVATION_ACCOUNT_VERIFIED:
    'Ez a fiók már aktiválva van. Kérjük, jelentkezz be.',
  ACCOUNT_ACTIVATION_EMAIL_SENT_PART_1:
    'Az aktiváló email elküldésre került a következő címre: ',
  ACCOUNT_ACTIVATION_EMAIL_SENT_PART_2:
    '. Az email 1 napig érvényes. Ha nem kaptad meg, kattints az újraküldés gombra.',

  CAR_IMAGE_REQUIRED:
    'A jármű képének megadása kötelező: ',
  CAR_IMAGE_NOT_FOUND:
    'A képfájl nem található: ',

  PASSWORD_RESET_SUBJECT: 'Jelszó visszaállítása',
  PASSWORD_RESET_LINK:
    'Kérjük, állítsd vissza a jelszavad az alábbi linkre kattintva:',

  BOOKING_CONFIRMED_SUBJECT_PART1: 'Foglalásod',
  BOOKING_CONFIRMED_SUBJECT_PART2: 'megerősítésre került.',

  BOOKING_CONFIRMED_PART1: 'Foglalásod',
  BOOKING_CONFIRMED_PART2:
    'megerősítésre került, a fizetés sikeresen megtörtént.',
  BOOKING_CONFIRMED_PART3:
    ' Kérjük, jelenj meg irodánkban ',
  BOOKING_CONFIRMED_PART4: ' (',
  BOOKING_CONFIRMED_PART5: ') ',
  BOOKING_CONFIRMED_PART6:
    ` (${env.TIMEZONE}) időzóna szerint a jármű átvételéhez `,
  BOOKING_CONFIRMED_PART7: '.',
  BOOKING_CONFIRMED_PART8:
    'Kérjük, hozd magaddal személyi igazolványodat, jogosítványodat és a kaucióhoz szükséges dokumentumokat.',
  BOOKING_CONFIRMED_PART9:
    'A jármű leadása az alábbi helyszínen történik: ',
  BOOKING_CONFIRMED_PART10: ' (',
  BOOKING_CONFIRMED_PART11: ') ',
  BOOKING_CONFIRMED_PART12:
    ` (${env.TIMEZONE}) időzóna szerint.`,
  BOOKING_CONFIRMED_PART13:
    'Kérjük, tartsd be az átvételi és leadási időpontokat.',
  BOOKING_CONFIRMED_PART14:
    'Foglalásod állapotát itt követheted nyomon: ',

  BOOKING_PAY_LATER_NOTIFICATION:
    'megerősítette a foglalást',
  BOOKING_PAID_NOTIFICATION:
    'kifizette a foglalást',
  CANCEL_BOOKING_NOTIFICATION:
    'lemondási kérelmet nyújtott be a foglalásra',

  BOOKING_UPDATED_NOTIFICATION_PART1:
    'A foglalás állapota',
  BOOKING_UPDATED_NOTIFICATION_PART2:
    'megváltozott.',

  CONTACT_SUBJECT:
    'Új üzenet a kapcsolatfelvételi űrlapról',
  SUBJECT: 'Tárgy',
  FROM: 'Feladó',
  MESSAGE: 'Üzenet',

  LOCATION_IMAGE_NOT_FOUND:
    'A helyszínhez tartozó kép nem található',

  NEW_CAR_NOTIFICATION_PART1:
    'A szolgáltató ',
  NEW_CAR_NOTIFICATION_PART2:
    ' új járművet hozott létre.',

  BOOKING_REQUEST_SUBJECT:
    'Új foglalási kérelem',
  BOOKING_REQUEST_ADMIN_INTRO:
    'Új foglalási kérelem érkezett, amely jóváhagyásra vár.',
  BOOKING_REQUEST_ADMIN_ACTION:
    'Kérjük, nyisd meg a foglalást az admin felületen az elfogadáshoz vagy elutasításhoz.',

  BOOKING_REQUEST_RECEIVED_SUBJECT:
    'Foglalási kérelem fogadva',
  BOOKING_REQUEST_RECEIVED_INTRO:
    'Megkaptuk foglalási kérelmedet, és továbbítottuk jóváhagyásra.',
  BOOKING_REQUEST_RECEIVED_NEXT_STEPS:
    'A foglalási kérelem sikeres volt. Munkatársaink hamarosan felveszik veled a kapcsolatot.',

  BOOKING_ID: 'Foglalási azonosító',
  BOOKING_STATUS: 'Állapot',
  BOOKING_STATUS_PENDING: 'Függőben',
  REQUESTED_BY: 'Kérelmezte',
  COMPANY: 'HL Dekor',
  CAR: 'Jármű',
  TO: 'Címzett',
}
