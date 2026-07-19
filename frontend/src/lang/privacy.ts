import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'
import { SITE } from '@/config/site.config'

const controllerName = (
  SITE.controller.legalName || SITE.name
)

const controllerAddress = (
  SITE.controller.address
  || [
    SITE.address.postalCode,
    SITE.address.addressLocality,
    SITE.address.streetAddress,
  ].filter(Boolean).join(', ')
)

const strings = new LocalizedStrings({
  hu: {
    TITLE: 'Adatvédelmi tájékoztató',
    PRIVACY_POLICY: `
      Hatályos: 2026. július 19.

      1. Az adatkezelő

      Név: ${controllerName}
      Cím: ${controllerAddress}
      E-mail: ${SITE.email}
      Telefon: ${SITE.phone}
      Weboldal: ${SITE.url}

      2. Az adatkezelések

      Felhasználói fiók és regisztráció

      A kezelt adatok a név, e-mail-cím, telefonszám, születési dátum, bejelentkezési adatok, választott nyelv és értesítési beállítások, valamint szükség esetén a vezetői engedély adatai.

      Az adatkezelés célja a felhasználói fiók létrehozása és kezelése, valamint a bérlő azonosítása. Jogalapja a szerződés megkötését megelőző lépések megtétele és a szerződés teljesítése. Az adatokat a fiók fennállásáig, majd a jogi kötelezettségek és igényérvényesítés által szükséges ideig őrizzük meg.

      Foglalás és bérlés

      A kezelt adatok a bérlő adatai, a kiválasztott jármű, az átvételi és leadási időpont, a foglalás állapota, az ár, a választott szolgáltatások és a foglaláshoz kapcsolódó kommunikáció.

      Az adatkezelés célja a foglalás kezelése, a bérleti szerződés előkészítése és teljesítése, valamint a kapcsolódó jogi és számviteli kötelezettségek teljesítése. Jogalapja a szerződés teljesítése és a jogi kötelezettség teljesítése. Az adatokat a szerződéses kapcsolat és a vonatkozó jogszabályi megőrzési idők végéig őrizzük meg.

      Fizetés

      Online fizetés esetén a fizetési adatokat a választott fizetési szolgáltató kezeli. A rendszer a tranzakció azonosítóját és állapotát kezelheti, de a teljes bankkártyaszámot és biztonsági kódot nem tárolja.

      Az adatkezelés célja a fizetés végrehajtása és igazolása. Jogalapja a szerződés teljesítése és a jogi kötelezettség teljesítése.

      Kapcsolatfelvétel és ügyfélkommunikáció

      Kapcsolatfelvételkor az e-mail-címet, az üzenet tartalmát és a megkereséshez kapcsolódó adatokat kezeljük.

      Az adatkezelés célja a megkeresés megválaszolása és az ügyféllel történő kapcsolattartás. Jogalapja a szerződés teljesítése, szerződéskötést megelőző intézkedés vagy az adatkezelő ügyfélkommunikációhoz fűződő jogos érdeke. Az adatokat az ügy lezárásáig, illetve az esetleges jogi igények rendezéséhez szükséges ideig őrizzük meg.

      Véleménykérés

      Teljesített bérlés után egy alkalommal, kizárólag ügyfél-visszajelzés kérése céljából e-mailt küldhetünk. A levél nem tartalmaz reklámajánlatot.

      Az adatkezelés jogalapja az adatkezelő szolgáltatásfejlesztéshez és ügyfél-visszajelzéshez fűződő jogos érdeke. A címzett bármikor tiltakozhat az ilyen megkeresés ellen.

      Biztonság és naplózás

      A weboldal biztonságos működése érdekében IP-cím, időpont, böngésző- és eszközadatok, valamint biztonsági és hibalogok kezelhetők.

      Az adatkezelés célja a rendszer működtetése, hibák feltárása és visszaélések megelőzése. Jogalapja az adatkezelő informatikai biztonsághoz fűződő jogos érdeke. Az adatokat a biztonsági célhoz szükséges, arányos ideig őrizzük meg.

      Webanalitika

      A Google Analytics 4 és a Microsoft Clarity kizárólag az Ön hozzájárulása esetén használható. Ezek a szolgáltatások a weboldal használatával kapcsolatos technikai és statisztikai adatokat kezelhetnek.

      Az adatkezelés jogalapja az Ön hozzájárulása. A hozzájárulás bármikor visszavonható a láblécben elérhető Sütibeállítások használatával.

      3. Adatfeldolgozók és címzettek

      Az adatkezelő tárhely-, adatbázis-, e-mail-küldési és fizetési szolgáltatót vehet igénybe. A jelenlegi szolgáltatók között szerepelhet a Brevo e-mail-küldéshez, a Google a Google Analytics szolgáltatáshoz és a Microsoft a Clarity szolgáltatáshoz.

      Adatátadásra jogszabályi kötelezettség vagy hatósági megkeresés alapján is sor kerülhet.

      Egyes szolgáltatók az Európai Gazdasági Térségen kívül is kezelhetnek adatokat. Ilyen esetben a GDPR szerinti megfelelőségi határozatot, általános szerződési feltételeket vagy más megfelelő garanciát alkalmaznak.

      4. Az adatok megadása

      A regisztrációhoz, foglaláshoz, bérléshez és fizetéshez szükséges adatok megadása a szolgáltatás igénybevételének feltétele. Ezek hiányában a foglalás vagy a bérleti szerződés nem teljesíthető.

      A statisztikai célú adatkezelés önkéntes, annak elutasítása nem korlátozza a weboldal alapvető használatát.

      5. Az érintett jogai

      Ön jogosult:

      - hozzáférést kérni személyes adataihoz;
      - kérni azok helyesbítését vagy törlését;
      - kérni az adatkezelés korlátozását;
      - tiltakozni a jogos érdeken alapuló adatkezelés ellen;
      - gyakorolni az adathordozhatósághoz való jogát, ha annak feltételei fennállnak;
      - hozzájárulását bármikor visszavonni;
      - panaszt tenni a felügyeleti hatóságnál;
      - bírósági jogorvoslatot igénybe venni.

      Kérelmét a ${SITE.email} e-mail-címen nyújthatja be.

      Panaszával a Nemzeti Adatvédelmi és Információszabadság Hatósághoz is fordulhat:

      1055 Budapest, Falk Miksa utca 9–11.
      E-mail: ugyfelszolgalat@naih.hu
      Weboldal: https://www.naih.hu

      6. Automatizált döntéshozatal

      A weboldal nem alkalmaz olyan kizárólag automatizált döntéshozatalt vagy profilalkotást, amely az érintettre nézve joghatással vagy hasonlóan jelentős hatással járna.

      7. A tájékoztató módosítása

      A tájékoztatót az adatkezelési tevékenységek vagy a jogszabályi követelmények változása esetén frissíthetjük. Az aktuális változat ezen az oldalon érhető el.
      `,
  },
  en: {
    TITLE: 'Privacy Policy',
    PRIVACY_POLICY: `
      Effective date: 19 July 2026
        
      1. Controller
        
      Name: ${controllerName}
      Address: ${controllerAddress}
      Email: ${SITE.email}
      Phone: ${SITE.phone}
      Website: ${SITE.url}
        
      2. Processing activities
        
      User accounts and registration
        
      We may process your name, email address, phone number, date of birth, login information, selected language, notification preferences and, where required, driving-licence information.
        
      The purpose is to create and manage your account and identify the renter. Processing is based on steps taken before entering into a contract and performance of the contract. Data is retained while the account exists and afterwards for the period required by legal obligations or legal claims.
        
      Bookings and rentals
        
      We process customer information, the selected vehicle, pick-up and return dates, booking status, price, selected services and booking-related communications.
        
      The purpose is to manage the booking, prepare and perform the rental contract and comply with legal and accounting obligations. Processing is based on performance of the contract and compliance with legal obligations. Data is retained until the applicable contractual and statutory retention periods expire.
        
      Payments
        
      Where online payment is used, payment details are processed by the selected payment provider. The system may retain transaction identifiers and payment status but does not store full card numbers or security codes.
        
      Processing is necessary to perform the contract and comply with legal obligations.
        
      Contact and customer communication
        
      When you contact us, we process your email address, message and information related to your request.
        
      Processing is necessary to respond to your request and communicate with you. It is based on the contract, steps requested before entering into a contract or the controller's legitimate interest in customer communication. Data is retained until the matter is closed and for any period required for legal claims.
        
      Review requests
        
      After a completed rental, we may send one email solely to request customer feedback. The email does not contain advertising offers.
        
      Processing is based on the controller's legitimate interest in collecting customer feedback and improving the service. You may object to such communication at any time.
        
      Security and logs
        
      IP addresses, timestamps, browser and device information, security logs and error logs may be processed to operate and protect the website, diagnose errors and prevent misuse.
        
      Processing is based on the controller's legitimate interest in information security. Data is retained for a proportionate period necessary for that purpose.
        
      Website analytics
        
      Google Analytics 4 and Microsoft Clarity are used only with your consent. These services may process technical and statistical information relating to the use of the website.
        
      Consent may be withdrawn at any time through the Cookie settings link in the footer.
        
      3. Processors and recipients
        
      The controller may use hosting, database, email-delivery and payment providers. Current providers may include Brevo for email delivery, Google for Google Analytics and Microsoft for Clarity.
        
      Data may also be disclosed where required by law or a competent authority.
        
      Some providers may process data outside the European Economic Area. In such cases, an adequacy decision, standard contractual clauses or another safeguard permitted by the GDPR is used.
        
      4. Required information
        
      Information required for registration, booking, rental and payment must be provided in order to use those services. Without it, a booking or rental contract cannot be completed.
        
      Analytics processing is voluntary. Refusing analytics does not restrict the essential use of the website.
        
      5. Your rights
        
      You may:
        
      - request access to your personal data;
      - request rectification or erasure;
      - request restriction of processing;
      - object to processing based on legitimate interests;
      - exercise data portability where applicable;
      - withdraw consent at any time;
      - lodge a complaint with a supervisory authority;
      - seek a judicial remedy.
        
      Requests may be sent to ${SITE.email}.
        
      The Hungarian supervisory authority is:
        
      Hungarian National Authority for Data Protection and Freedom of Information
      1055 Budapest, Falk Miksa utca 9–11.
      Email: ugyfelszolgalat@naih.hu
      Website: https://www.naih.hu
        
      6. Automated decision-making
        
      The website does not use solely automated decision-making or profiling that produces legal or similarly significant effects.
        
      7. Changes
        
      This notice may be updated when processing activities or legal requirements change. The current version is available on this page.
      `,
  },
  fr: {
    TITLE: 'Politique de confidentialité',
    PRIVACY_POLICY: `
Date d’effet : 19 juillet 2026

Cette politique décrit le traitement des données personnelles via le site, le système de réservation et les communications de ${env.WEBSITE_NAME}.

Le responsable du traitement est l’entreprise qui exploite le service. Le dépôt ne contient pas sa dénomination légale complète, son numéro d’immatriculation ni son numéro fiscal ; ces informations doivent être ajoutées à partir des documents officiels avant publication définitive.

Coordonnées : ${controllerAddress}; ${SITE.email}; ${SITE.phone}; ${SITE.url}.

Les données traitées peuvent inclure le nom, l’e-mail, le téléphone, la date de naissance, le mot de passe haché, les préférences, le permis de conduire si nécessaire, les données de réservation, le véhicule, les dates, le prix, les options, les demandes d’annulation, les identifiants techniques de paiement, les messages de contact, l’adresse IP et les journaux de sécurité. Les numéros complets de carte et codes de sécurité ne sont pas stockés par le système.

Le traitement sert à gérer les comptes, préparer et exécuter les réservations, communiquer avec les clients, respecter les obligations légales, sécuriser le service et améliorer sa qualité. La base juridique est selon le cas l’exécution du contrat, une obligation légale, l’intérêt légitime ou le consentement pour Google Analytics et Microsoft Clarity.

Après une location terminée, le système peut envoyer une seule demande d’avis Google par réservation. La date d’envoi est conservée avec la réservation afin d’éviter un nouvel envoi. Aucun message n’est envoyé si les notifications par e-mail sont désactivées. Le système ne peut pas vérifier de manière fiable si un client précis a effectivement publié un avis.

Les prestataires peuvent inclure l’hébergement, la base de données, Brevo pour les e-mails, le prestataire de paiement, Google Analytics, Microsoft Clarity et Google Business Profile. Des transferts hors EEE peuvent avoir lieu avec les garanties prévues par le RGPD.

Les données de compte et de réservation sont conservées pendant la relation contractuelle et les durées légales applicables. Les données utilisateur et événementielles GA4 sont configurées pour 14 mois. Les enregistrements Clarity sont actuellement conservés 30 jours ; certaines données agrégées peuvent être conservées plus longtemps.

Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité, retirer votre consentement et vous opposer à un traitement fondé sur l’intérêt légitime. Contact : ${SITE.email}.

Le service ne prend pas de décision exclusivement automatisée produisant des effets juridiques ou similaires. La location nécessite l’âge minimum et le droit de conduire applicables.
    `,
  },
  es: {
    TITLE: 'Política de privacidad',
    PRIVACY_POLICY: `
Fecha de entrada en vigor: 19 de julio de 2026

Esta política describe el tratamiento de datos personales mediante el sitio, el sistema de reservas y las comunicaciones de ${env.WEBSITE_NAME}.

El responsable es la empresa que opera el servicio. El repositorio no contiene su nombre jurídico completo, número registral ni número fiscal; estos datos deben añadirse desde los documentos oficiales antes de la publicación definitiva.

Contacto: ${controllerAddress}; ${SITE.email}; ${SITE.phone}; ${SITE.url}.

Los datos tratados pueden incluir nombre, correo electrónico, teléfono, fecha de nacimiento, contraseña cifrada, preferencias, permiso de conducir cuando sea necesario, datos de reserva, vehículo, fechas, precio, extras, solicitudes de cancelación, identificadores técnicos de pago, mensajes de contacto, dirección IP y registros de seguridad. El sistema no almacena números completos de tarjeta ni códigos de seguridad.

El tratamiento se realiza para gestionar cuentas, preparar y ejecutar reservas, comunicarse con clientes, cumplir obligaciones legales, proteger el servicio y mejorar su calidad. La base jurídica puede ser el contrato, una obligación legal, el interés legítimo o el consentimiento para Google Analytics y Microsoft Clarity.

Después de un alquiler completado, el sistema puede enviar una única solicitud de reseña de Google por reserva. La fecha de envío se conserva con la reserva para evitar otro envío. No se envía si las notificaciones por correo están desactivadas. El sistema no puede comprobar de forma fiable si un cliente concreto ha publicado una reseña.

Los proveedores pueden incluir alojamiento, base de datos, Brevo para correo, el proveedor de pagos, Google Analytics, Microsoft Clarity y Google Business Profile. Pueden existir transferencias fuera del EEE con las garantías previstas por el RGPD.

Los datos de cuenta y reserva se conservan durante la relación contractual y los plazos legales aplicables. La conservación configurada de datos de usuario y eventos de GA4 es de 14 meses. Las grabaciones de Clarity se conservan actualmente 30 días; algunos datos agregados pueden conservarse durante más tiempo.

Puede solicitar acceso, rectificación, supresión, limitación, portabilidad, retirar el consentimiento y oponerse al tratamiento basado en interés legítimo. Contacto: ${SITE.email}.

El servicio no adopta decisiones exclusivamente automatizadas con efectos jurídicos o similares. El alquiler requiere la edad mínima y la autorización para conducir aplicables.
    `,
  },
})

langHelper.setLanguage(strings)

export { strings }
