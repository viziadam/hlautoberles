import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'
import { SITE } from '@/config/site.config'

const controllerAddress = [
  SITE.address.postalCode,
  SITE.address.addressLocality,
  SITE.address.streetAddress,
  SITE.address.addressCountry,
].filter(Boolean).join(', ')

const strings = new LocalizedStrings({
  hu: {
    TITLE: 'Adatvédelmi tájékoztató',
    PRIVACY_POLICY: `
Hatályos: 2026. július 19.

A jelen tájékoztató a ${env.WEBSITE_NAME} weboldalán, foglalási rendszerében és kapcsolódó ügyfélkommunikáció során végzett személyesadat-kezelést mutatja be.

Fontos: a forráskód nem tartalmazza az üzemeltető vállalkozás teljes jogi nevét, nyilvántartási számát és adószámát. Ezeket az adatokat a végleges közzététel előtt az üzemeltető hivatalos adataival ki kell egészíteni.

1. Az adatkezelő

- Szolgáltatás neve: ${env.WEBSITE_NAME}
- Cím: ${controllerAddress || 'a vállalkozás hivatalos címén'}
- E-mail: ${SITE.email}
- Telefon: ${SITE.phone}
- Weboldal: ${SITE.url}

Az adatkezelő a weboldalt üzemeltető vállalkozás. Az adatkezelő hivatalos jogi neve, nyilvántartási száma és adószáma a számlákon, szerződéses dokumentumokban és az üzemeltető hivatalos cég- vagy vállalkozói nyilvántartásában található.

2. A kezelt adatok köre

2.1. Regisztráció és felhasználói fiók

A rendszer a fiók létrehozásához és kezeléséhez az alábbi adatokat kezelheti:

- teljes név;
- e-mail-cím;
- telefonszám;
- születési dátum;
- titkosított vagy egyirányúan képzett jelszóadat;
- fiókellenőrzési és aktiválási állapot;
- választott nyelv és értesítési beállítások;
- vezetői engedély adatai vagy feltöltött állománya, ha az adott bérléshez szükséges;
- technikai fiókazonosítók.

2.2. Foglalás és bérlés

A foglalási rendszer többek között az alábbi adatokat kezeli:

- foglalási azonosító;
- kiválasztott jármű;
- bérlő felhasználói azonosítója;
- átvételi és leadási időpont;
- foglalási állapot;
- ár, pénznem és választott kiegészítő szolgáltatások;
- lemondási kérelem;
- fizetési munkamenethez tartozó technikai azonosítók, például ügyfél-, fizetési vagy rendelési azonosító;
- a foglalás létrehozásának és módosításának időpontja.

A rendszer a bankkártya teljes számát és biztonsági kódját nem tárolja. Online fizetés esetén a fizetési adatokat a választott külső fizetési szolgáltató kezeli; a rendszer csak a tranzakcióhoz szükséges technikai azonosítókat és állapotokat tárolhatja.

2.3. Kapcsolatfelvétel

A kapcsolatfelvételi űrlap használatakor az e-mail-címet, a tárgyat, az üzenet tartalmát és a küldéshez kapcsolódó technikai adatokat kezeljük a megkeresés megválaszolása érdekében.

2.4. Technikai és biztonsági adatok

A weboldal és a szerver a biztonságos működéshez kezelheti az IP-címet, a kérés időpontját, a böngésző és eszköz technikai adatait, hitelesítési és hibalogokat, munkamenet-adatokat, valamint a visszaélések felismeréséhez szükséges információkat.

2.5. Statisztikai adatok

Kifejezett hozzájárulás esetén a Google Analytics 4 és a Microsoft Clarity a weboldal használatával kapcsolatos technikai és viselkedési adatokat kezelhet. Ide tartozhatnak az oldalmegtekintések, keresések, kattintások, görgetési események, eszköz- és böngészőadatok, hozzávetőleges földrajzi információk, valamint maszkolt munkamenet-felvételek.

3. Az adatkezelés céljai és jogalapjai

A személyes adatokat az alábbi célokból kezeljük:

- felhasználói fiók létrehozása és kezelése;
- foglalási kérelem fogadása, jóváhagyása, teljesítése és dokumentálása;
- jármű elérhetőségének ellenőrzése;
- ügyfélkommunikáció és rendszerüzenetek küldése;
- fizetés előkészítése és státuszának kezelése;
- lemondási kérelmek kezelése;
- jogi, számviteli és adózási kötelezettségek teljesítése;
- informatikai biztonság, csalás- és visszaélés-megelőzés;
- a szolgáltatás minőségének fejlesztése;
- hozzájárulás esetén webanalitika és felhasználóiélmény-elemzés.

A regisztrációhoz és foglaláshoz szükséges adatkezelés jogalapja a szerződés megkötését megelőző lépések megtétele és a szerződés teljesítése. A számlázási és megőrzési kötelezettségek jogalapja jogi kötelezettség. A rendszerbiztonság, az ügyfélszolgálat és a szolgáltatás védelme az adatkezelő jogos érdeke lehet. A Google Analytics és a Microsoft Clarity használatának jogalapja az Ön önkéntes hozzájárulása.

4. Foglalás utáni Google-véleménykérés

Ha az adminisztrátor a foglalást „Teljesítve” állapotba helyezi, és a bérlési időszak már lezárult, a rendszer egy alkalommal e-mailt küldhet, amelyben a szolgáltatás Google Cégprofilján történő értékelésére kéri az ügyfelet.

A levél kiküldésének célja az ügyfél-visszajelzések gyűjtése és a szolgáltatás minőségének fejlesztése. A rendszer a foglalásnál rögzíti a véleménykérés elküldésének időpontját, hogy ugyanarra a foglalásra ne küldjön újabb kérést. Az e-mail nem tartalmaz követőkódot, a Google értékelési oldalára mutató közvetlen hivatkozást használja.

A rendszer nem képes megbízhatóan megállapítani, hogy egy konkrét ügyfél ténylegesen közzétett-e Google-értékelést. Emiatt a technikai védelem azt biztosítja, hogy ugyanahhoz a foglaláshoz legfeljebb egy véleménykérő e-mail kerüljön elküldésre. Ha a felhasználó az e-mail-értesítéseket kikapcsolta, a rendszer a véleménykérő levelet sem küldi el.

Az adatkezelés jogalapja az adatkezelőnek a teljesített szolgáltatáshoz kapcsolódó minőségfejlesztéshez és ügyfél-visszajelzéshez fűződő jogos érdeke. Az érintett bármikor tiltakozhat az ilyen megkeresés ellen, illetve kikapcsolhatja az e-mail-értesítéseket.

5. Google Analytics 4 és Microsoft Clarity

A statisztikai szolgáltatások csak az Ön hozzájárulása után töltődnek be. A Google Consent Mode alapértelmezésben minden analitikai és hirdetési tárolást tilt; elfogadás után csak az analitikai tárolás válik engedélyezetté. A hirdetési tárolás, hirdetési felhasználói adatok és hirdetési személyre szabás tiltva marad.

A Clarity kiegyensúlyozott maszkolással működik. A privát fiók-, bejelentkezési, foglalási és kapcsolati tartalmak további alkalmazásszintű maszkolást kapnak. A maszkolás célja, hogy a felvételeken ne legyen olvasható a személyes űrlaptartalom.

A hozzájárulás bármikor visszavonható a lábléc „Sütibeállítások” hivatkozásán keresztül. A visszavonás a jövőbeni mérést leállítja, és a weboldal megkísérli törölni a hozzáférhető analitikai sütiket.

6. Adatfeldolgozók és címzettek

A szolgáltatás működtetéséhez az adatkezelő az alábbi adatfeldolgozói kategóriákat veheti igénybe:

- szerver-, tárhely- és hálózati szolgáltató;
- adatbázis-szolgáltató;
- e-mail-küldési szolgáltató, a jelenlegi rendszerben Brevo-alapú e-mailküldés;
- online fizetési szolgáltató, amennyiben az online fizetés engedélyezett;
- Google Analytics 4 – Google;
- Microsoft Clarity – Microsoft;
- Google Cégprofil, amikor az ügyfél az értékelési linket megnyitja.

A személyes adatokat nem értékesítjük, és nem adjuk át önálló reklámcélú felhasználásra. Adat átadására jogszabályi kötelezettség, hatósági megkeresés vagy jogi igény érvényesítése esetén is sor kerülhet.

7. Nemzetközi adattovábbítás

A Google, a Microsoft, a Brevo vagy egyes infrastruktúra- és fizetési szolgáltatók az Európai Gazdasági Térségen kívül is kezelhetnek adatokat. Ilyen esetben a szolgáltató és az adatkezelő a vonatkozó megfelelőségi határozatot, általános szerződési feltételeket vagy más, GDPR szerinti megfelelő garanciát alkalmazhat.

8. Adatmegőrzés

- Fiókadatok: a fiók fennállásáig, illetve a kapcsolódó jogi igények és kötelezettségek időtartamáig.
- Foglalási és bérlési adatok: a szerződés teljesítéséhez szükséges ideig, majd a számviteli, adózási, fogyasztóvédelmi és jogi igényekhez kapcsolódó kötelező vagy indokolt megőrzési idő végéig.
- Kapcsolatfelvételi üzenetek: a megkeresés lezárásáig, majd az esetleges jogi igények elévülési idejéhez igazodó ideig.
- Biztonsági naplók: a biztonsági célhoz szükséges, arányos időtartamig.
- Google Analytics 4: a tulajdonban beállított felhasználó- és eseményszintű adatmegőrzés 14 hónap.
- Microsoft Clarity: a munkamenet-felvételek szolgáltatói megőrzése jelenleg 30 nap; az összesített hőtérképes és kattintási adatok, valamint egyes megjelölt felvételek hosszabb ideig maradhatnak elérhetők a Microsoft mindenkori szabályai szerint.
- Véleménykérő e-mail jelzője: a foglalási rekorddal együtt marad meg annak igazolására, hogy ugyanarra a foglalásra ne történjen ismételt kiküldés.

9. Adatbiztonság

A rendszer hozzáférés-szabályozást, hitelesítést, titkosított HTTPS-kapcsolatot, jelszóvédelmet, szerveroldali ellenőrzéseket és naplózást alkalmazhat. A hozzáférés az arra jogosult személyekre és szolgáltatókra korlátozott. Egyetlen informatikai rendszer sem tekinthető teljesen kockázatmentesnek; adatvédelmi incidens esetén az adatkezelő a vonatkozó jogszabályok szerint jár el.

10. Az érintett jogai

Ön jogosult:

- tájékoztatást és hozzáférést kérni;
- pontatlan adatainak helyesbítését kérni;
- a törlését kérni, ha annak nincs jogszabályi vagy szerződéses akadálya;
- az adatkezelés korlátozását kérni;
- tiltakozni a jogos érdeken alapuló adatkezelés ellen;
- a hozzájárulását bármikor visszavonni;
- az adathordozhatósághoz való jogát gyakorolni, ha annak feltételei fennállnak;
- panaszt tenni és bírósági jogorvoslatot igénybe venni.

A kérelmek a ${SITE.email} címen nyújthatók be. Az adatkezelő a személyazonosság ellenőrzéséhez arányos további adatot kérhet.

Panasz benyújtható a Nemzeti Adatvédelmi és Információszabadság Hatósághoz:

- Cím: 1055 Budapest, Falk Miksa utca 9–11.
- Levelezési cím: 1363 Budapest, Pf. 9.
- E-mail: ugyfelszolgalat@naih.hu
- Weboldal: naih.hu

11. Automatizált döntéshozatal

A weboldal nem alkalmaz olyan kizárólag automatizált döntéshozatalt vagy profilalkotást, amely az érintettre nézve joghatással járna vagy hasonlóan jelentős mértékben érintené. A foglalások elfogadásáról vagy elutasításáról adminisztratív döntés születhet.

12. Kiskorúak

A járműbérléshez a vonatkozó minimuméletkor és vezetői jogosultság szükséges. A szolgáltatás nem kiskorúak önálló igénybevételére készült.

13. A tájékoztató módosítása és kapcsolat

A tájékoztatót a szolgáltatás, a technológia, az adatfeldolgozók vagy a jogszabályok változásakor frissíthetjük. Az aktuális változat ezen az oldalon érhető el.

Kapcsolat:

- E-mail: ${SITE.email}
- Telefon: ${SITE.phone}
- Weboldal: ${SITE.url}
    `,
  },
  en: {
    TITLE: 'Privacy Policy',
    PRIVACY_POLICY: `
Effective date: 19 July 2026

This policy describes the processing of personal data through the ${env.WEBSITE_NAME} website, booking system and related customer communications.

Important: the repository does not contain the operator’s full legal name, registration number or tax number. These details must be added from the operator’s official records before this document is treated as a final legal notice.

1. Controller

- Service: ${env.WEBSITE_NAME}
- Address: ${controllerAddress || 'the operator’s official address'}
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Website: ${SITE.url}

The controller is the business operating the website. Its official legal and registration details are available on invoices, contractual documents and official business registers.

2. Data processed

Account data may include name, email, phone number, date of birth, password hash, verification status, language, notification preferences and driving-licence data where required.

Booking data may include the booking ID, vehicle, customer ID, rental dates, status, price, selected extras, cancellation requests and technical payment identifiers. The system does not store full card numbers or card security codes; external payment providers process payment credentials.

Contact requests include the email address, subject, message and related technical information. Security data may include IP address, request time, browser/device information, authentication events and server logs.

With consent, Google Analytics 4 and Microsoft Clarity may process page views, searches, clicks, scrolling events, approximate location, device information and masked session recordings.

3. Purposes and legal bases

Data is processed to create and manage accounts, receive and perform bookings, check vehicle availability, communicate with customers, prepare payments, process cancellations, comply with legal obligations, protect the service and improve quality.

Account and booking processing is based on steps taken before entering into a contract and performance of the contract. Accounting and statutory retention is based on legal obligations. Security and customer service may rely on legitimate interests. Google Analytics and Microsoft Clarity rely on voluntary consent.

4. Google review request after a completed rental

When an administrator changes a booking to “Completed” and the rental period has ended, the system may send one email inviting the customer to review the business on Google.

The booking stores the time when the request was sent so that no second request is sent for the same booking. The email contains a direct Google review link without tracking parameters. The system cannot reliably determine whether a specific customer has actually published a Google review; it therefore guarantees one request per booking rather than detecting a published review.

No review request is sent if email notifications are disabled. This processing is based on the controller’s legitimate interest in collecting feedback and improving service quality. The customer may object at any time.

5. Analytics and session analysis

Analytics services load only after consent. Google Consent Mode starts with analytics and advertising storage denied; only analytics storage is granted after acceptance. Advertising storage, advertising user data and personalised advertising remain disabled.

Microsoft Clarity uses Balanced masking, while private account, booking, sign-in and contact-form content is additionally masked by the application. Consent can be withdrawn at any time through the footer’s “Cookie settings” link.

6. Processors and recipients

Processor categories may include hosting and network providers, database providers, Brevo-based email delivery, payment providers where enabled, Google Analytics, Microsoft Clarity and Google Business Profile when the review link is opened.

Personal data is not sold or disclosed for independent advertising purposes. Disclosure may also occur where required by law, a competent authority or the establishment and defence of legal claims.

7. International transfers

Google, Microsoft, Brevo and certain infrastructure or payment providers may process data outside the EEA. Appropriate safeguards may include an adequacy decision, standard contractual clauses or another GDPR-compliant transfer mechanism.

8. Retention

Account data is retained while the account is active and for the period required by legal obligations or claims. Booking records are retained for contract, accounting, tax, consumer-protection and limitation purposes. Contact messages are retained until resolution and, where necessary, for the relevant limitation period. Security logs are retained for a proportionate security period.

GA4 user- and event-level retention is configured to 14 months. Clarity playback data is currently retained for 30 days, while aggregate data and certain labelled recordings may be retained longer under Microsoft’s current rules. The review-request timestamp remains with the booking record to prevent repeat delivery.

9. Security

The service may use access controls, authentication, HTTPS encryption, password protection, server-side validation and logging. Access is limited to authorised persons and providers. No system can be guaranteed risk-free; incidents are handled under applicable law.

10. Your rights

You may request access, rectification, erasure, restriction, portability where applicable, withdrawal of consent and objection to processing based on legitimate interests. You may also lodge a complaint with the competent supervisory authority and seek a judicial remedy.

Requests may be sent to ${SITE.email}.

11. Automated decisions

The website does not make solely automated decisions producing legal or similarly significant effects. Booking approval or rejection may be decided by an administrator.

12. Children

Vehicle rental requires the applicable minimum age and driving entitlement. The service is not designed for independent use by children.

13. Changes and contact

This policy may be updated when the service, technologies, processors or legal requirements change.

- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Website: ${SITE.url}
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
