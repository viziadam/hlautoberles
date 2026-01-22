import * as env from '../config/env.config'

export const hu = {
  ERROR: 'Belső hiba: ',
  DB_ERROR: 'Adatbázis hiba: ',
  SMTP_ERROR: 'SMTP hiba – az e-mail küldése sikertelen: ',

  ACCOUNT_ACTIVATION_SUBJECT: 'Fiók aktiválása',
  HELLO: 'Kedves ',
  ACCOUNT_ACTIVATION_LINK: 'Kérjük, aktiváld a fiókodat az alábbi linkre kattintva:',
  REGARDS: `Üdvözlettel,<br>${env.WEBSITE_NAME} csapata`,

  ACCOUNT_ACTIVATION_TECHNICAL_ISSUE:
    'Technikai hiba történt. Kérjük, kattints az újraküldésre az e-mail címed megerősítéséhez.',
  ACCOUNT_ACTIVATION_LINK_EXPIRED:
    'Az aktiváló link lejárt. Kérjük, kattints az újraküldésre az e-mail címed megerősítéséhez.',
  ACCOUNT_ACTIVATION_LINK_ERROR:
    'Nem találtunk felhasználót ehhez az ellenőrzéshez. Kérjük, regisztrálj.',
  ACCOUNT_ACTIVATION_SUCCESS:
    'A fiókodat sikeresen hitelesítettük.',
  ACCOUNT_ACTIVATION_RESEND_ERROR:
    'Nem találtunk felhasználót ezzel az e-mail címmel. Ellenőrizd, hogy helyesen adtad-e meg.',
  ACCOUNT_ACTIVATION_ACCOUNT_VERIFIED:
    'Ez a fiók már aktiválva van. Kérjük, jelentkezz be.',
  ACCOUNT_ACTIVATION_EMAIL_SENT_PART_1:
    'Az aktiváló e-mail elküldésre került a következő címre: ',
  ACCOUNT_ACTIVATION_EMAIL_SENT_PART_2:
    '. Az e-mail 1 napig érvényes. Ha nem kaptad meg, kattints az újraküldésre.',

  CAR_IMAGE_REQUIRED:
    'A jármű képének megadása kötelező: ',
  CAR_IMAGE_NOT_FOUND:
    'A képfájl nem található: ',

  PASSWORD_RESET_SUBJECT: 'Jelszó visszaállítása',
  PASSWORD_RESET_LINK:
    'Kérjük, állítsd vissza a jelszavad az alábbi linkre kattintva:',

  BOOKING_CONFIRMED_SUBJECT_PART1: 'A foglalásod',
  BOOKING_CONFIRMED_SUBJECT_PART2: 'megerősítésre került.',

  BOOKING_CONFIRMED_PART1: 'A foglalásod',
  BOOKING_CONFIRMED_PART2:
    'megerősítésre került, a fizetés sikeresen megtörtént.',
  BOOKING_CONFIRMED_PART3:
    ' Kérjük, jelenj meg irodánkban: ',
  BOOKING_CONFIRMED_PART4: ' (',
  BOOKING_CONFIRMED_PART5: ') ',
  BOOKING_CONFIRMED_PART6:
    ` (${env.TIMEZONE}) a jármű átvételéhez `,
  BOOKING_CONFIRMED_PART7: '.',
  BOOKING_CONFIRMED_PART8:
    'Kérjük, hozd magaddal személyi igazolványodat, jogosítványodat és a kauciót.',
  BOOKING_CONFIRMED_PART9:
    'A jármű leadása az alábbi irodánkban történik: ',
  BOOKING_CONFIRMED_PART10: ' (',
  BOOKING_CONFIRMED_PART11: ') ',
  BOOKING_CONFIRMED_PART12:
    ` (${env.TIMEZONE}).`,
  BOOKING_CONFIRMED_PART13:
    'Kérjük, tartsd be az átvételi és leadási dátumokat és időpontokat.',
  BOOKING_CONFIRMED_PART14:
    'A foglalásod állapotát itt követheted nyomon: ',

  BOOKING_PAY_LATER_NOTIFICATION:
    'megerősítette a foglalást',
  BOOKING_PAID_NOTIFICATION:
    'kifizette a foglalást',
  CANCEL_BOOKING_NOTIFICATION:
    'lemondási kérelmet nyújtott be a foglalásra',

  BOOKING_UPDATED_NOTIFICATION_PART1:
    'A foglalás állapota',
  BOOKING_UPDATED_NOTIFICATION_PART2:
    'frissítésre került.',

  CONTACT_SUBJECT:
    'Új üzenet a kapcsolatfelvételi űrlapról',
  SUBJECT: 'Tárgy',
  FROM: 'Feladó',
  MESSAGE: 'Üzenet',

  LOCATION_IMAGE_NOT_FOUND:
    'A helyszín képe nem található',

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
    'Megkaptuk a foglalási kérelmedet, és továbbítottuk jóváhagyásra.',
  BOOKING_REQUEST_RECEIVED_NEXT_STEPS:
    'A foglalási kérelmed sikeres volt. Munkatársaink hamarosan felveszik veled a kapcsolatot.',

  BOOKING_ID: 'Foglalás azonosító',
  BOOKING_STATUS: 'Állapot',
  BOOKING_STATUS_PENDING: 'Függőben',
  BOOKING_STATUS_RESERVED: "Lefoglalt",
  BOOKING_STATUS_CANCELLED: "Törölt",
  BOOKING_STATUS_VOID: "Érvénytelen",
  REQUESTED_BY: 'Igénylő',
  COMPANY: 'HL Dekor',
  CAR: 'Jármű',
  TO: 'Címzett',

  BOOKING_CREATED_NOTIFICATION_PART1:
    'Egy új foglalás',
  BOOKING_CREATED_NOTIFICATION_PART2:
    'létrehozásra került.',

  BOOKING_STATUS_CHANGED_NOTIFICATION_PART1:
    'A foglalás állapota',
  BOOKING_STATUS_CHANGED_NOTIFICATION_PART2:
    'megváltozott erről:',
  BOOKING_STATUS_CHANGED_NOTIFICATION_PART3:
    'erre:'
}
