// import LocalizedStrings from 'localized-strings'
// import * as langHelper from '@/utils/langHelper'
// import env from '@/config/env.config'

// const strings = new LocalizedStrings({
//   fr: {
//     TITLE: "Conditions d'utilisation",
//     TOS: `
// Bienvenue chez ${env.WEBSITE_NAME} ! En accédant à notre site Web et en utilisant nos services, vous acceptez de vous conformer et d'être lié par les conditions d'utilisation suivantes. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.

// 1. Acceptation des conditions

// En accédant ou en utilisant nos services, vous confirmez avoir lu, compris et accepté ces conditions d'utilisation et notre politique de confidentialité.

// 2. Utilisation de nos services

// Vous acceptez d'utiliser nos services uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits, ne restreint ni n'empêche quiconque d'utiliser nos services. Cela inclut le respect de toutes les lois et réglementations applicables.

// 3. Réservations et paiements

// Lorsque vous effectuez une réservation avec ${env.WEBSITE_NAME}, vous acceptez de fournir des informations exactes et complètes. Tous les paiements doivent être effectués via notre système de paiement sécurisé. Une fois le paiement effectué, vous recevrez une confirmation de votre réservation.

// 4. Politique d'annulation

// Les annulations effectuées 24 heures avant la date de location peuvent donner droit à un remboursement complet. Les annulations effectuées moins de 24 heures avant la date de location peuvent entraîner des frais d'annulation. Veuillez vous référer à notre politique d'annulation pour des informations détaillées.

// 5. Conditions de location

// Toutes les locations sont soumises à nos conditions de location, qui incluent, sans s'y limiter, les restrictions d'âge, les exigences en matière de permis de conduire et les obligations d'assurance. Vous êtes responsable de vous assurer que vous remplissez toutes les conditions avant d'effectuer une réservation.

// 6. Limitation de responsabilité

// ${env.WEBSITE_NAME} ne sera pas responsable des dommages indirects, accessoires ou consécutifs découlant de votre utilisation de nos services. En aucun cas, notre responsabilité totale ne dépassera le montant que vous avez payé pour les services.

// 7. Modifications des conditions

// Nous nous réservons le droit de modifier ces conditions de service à tout moment. Toute modification entrera en vigueur immédiatement après sa publication sur notre site Web. Votre utilisation continue de nos services après toute modification constitue votre acceptation des nouvelles conditions.

// 8. Loi applicable

// Ces conditions de service seront régies et interprétées conformément aux lois. Tout litige découlant de ces conditions sera résolu devant les tribunaux.

// 9. Coordonnées

// Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse ${env.CONTACT_EMAIL}. Nous sommes là pour vous aider pour toute demande relative à nos services.

// 10. Reconnaissance

// En utilisant nos services, vous reconnaissez avoir lu et compris ces conditions d'utilisation et acceptez d'être lié par elles.    
//     `,
//   },
//   en: {
//     TITLE: 'Terms of Service',
//     TOS: `
// Welcome to ${env.WEBSITE_NAME}! By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please do not use our services.


// 1. Acceptance of Terms

// By accessing or using our services, you confirm that you have read, understood, and agree to these Terms of Service and our Privacy Policy.


// 2. Use of Our Services

// You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of our services. This includes compliance with all applicable laws and regulations.


// 3. Reservations and Payments

// When you make a reservation with ${env.WEBSITE_NAME}, you agree to provide accurate and complete information. All payments must be made through our secure payment system. Once payment is completed, you will receive a confirmation of your reservation.


// 4. Cancellation Policy

// Cancellations made 24 hours before the rental date may be eligible for a full refund. Cancellations made less than 24 hours prior to the rental date may incur a cancellation fee. Please refer to our cancellation policy for detailed information.


// 5. Rental Conditions

// All rentals are subject to our rental conditions, which include but are not limited to age restrictions, driver's license requirements, and insurance obligations. You are responsible for ensuring that you meet all requirements before making a reservation.


// 6. Limitation of Liability

// ${env.WEBSITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our services. In no event shall our total liability exceed the amount paid by you for the services.


// 7. Modifications to Terms

// We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services following any changes constitutes your acceptance of the new terms.


// 8. Governing Law

// These Terms of Service shall be governed by and construed in accordance with the laws. Any disputes arising out of these terms shall be resolved in the courts.


// 9. Contact Information

// If you have any questions regarding these Terms of Service, please contact us at ${env.CONTACT_EMAIL}. We are here to help you with any inquiries related to our services.


// 10. Acknowledgment

// By using our services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
//     `,
//   },
//   es: {
//     TITLE: 'Condiciones de uso',
//     TOS: `
// ¡Bienvenido a ${env.WEBSITE_NAME}! Al acceder a nuestro sitio web y utilizar nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes Términos de servicio. Si no acepta estos términos, no utilice nuestros servicios.

// 1. Aceptación de los términos

// Al acceder o utilizar nuestros servicios, usted confirma que ha leído, comprendido y acepta estos Términos de servicio y nuestra Política de privacidad.

// 2. Uso de nuestros servicios

// Usted acepta utilizar nuestros servicios solo con fines legales y de una manera que no infrinja los derechos de terceros ni restrinja o inhiba el uso de nuestros servicios por parte de terceros. Esto incluye el cumplimiento de todas las leyes y regulaciones aplicables.

// 3. Reservas y pagos

// Cuando hace una reserva con ${env.WEBSITE_NAME}, acepta proporcionar información precisa y completa. Todos los pagos deben realizarse a través de nuestro sistema de pago seguro. Una vez completado el pago, recibirá una confirmación de su reserva.

// 4. Política de cancelación

// Las cancelaciones realizadas 24 horas antes de la fecha de alquiler pueden ser elegibles para un reembolso completo. Las cancelaciones realizadas con menos de 24 horas de antelación a la fecha de alquiler pueden generar un cargo por cancelación. Consulte nuestra política de cancelación para obtener información detallada.

// 5. Condiciones de alquiler

// Todos los alquileres están sujetos a nuestras condiciones de alquiler, que incluyen, entre otras, restricciones de edad, requisitos de licencia de conducir y obligaciones de seguro. Usted es responsable de asegurarse de cumplir con todos los requisitos antes de realizar una reserva.

// 6. Limitación de responsabilidad

// ${env.WEBSITE_NAME} no será responsable de ningún daño indirecto, incidental o consecuente que surja de su uso de nuestros servicios. En ningún caso nuestra responsabilidad total excederá el monto que usted pagó por los servicios.

// 7. Modificaciones de los términos

// Nos reservamos el derecho de modificar estos Términos de servicio en cualquier momento. Cualquier cambio entrará en vigencia inmediatamente después de su publicación en nuestro sitio web. Su uso continuo de nuestros servicios después de cualquier cambio constituye su aceptación de los nuevos términos.

// 8. Ley aplicable

// Estos Términos de servicio se regirán e interpretarán de acuerdo con las leyes. Cualquier disputa que surja de estos términos se resolverá en los tribunales.

// 9. Información de contacto

// Si tiene alguna pregunta sobre estos Términos de servicio, comuníquese con nosotros a ${env.CONTACT_EMAIL}. Estamos aquí para ayudarlo con cualquier consulta relacionada con nuestros servicios.

// 10. Reconocimiento

// Al utilizar nuestros servicios, usted reconoce que ha leído y comprendido estos Términos de servicio y acepta regirse por ellos.    
//     `,
//   },
//   hu: {
//   TITLE: 'Felhasználási feltételek',
//   TOS: `
// Üdvözlünk a(z) ${env.WEBSITE_NAME} oldalán! A weboldal elérésével és szolgáltatásaink használatával elfogadod az alábbi Felhasználási feltételeket. Ha nem értesz egyet ezekkel a feltételekkel, kérjük, ne használd a szolgáltatásainkat.


// 1. A feltételek elfogadása

// Szolgáltatásaink elérésével vagy használatával megerősíted, hogy elolvastad, megértetted és elfogadod a jelen Felhasználási feltételeket és az Adatvédelmi tájékoztatót.


// 2. A szolgáltatás használata

// Vállalod, hogy a szolgáltatásainkat kizárólag jogszerű célokra használod, és nem sérted mások jogait, illetve nem korlátozod mások szolgáltatáshasználatát. Ide tartozik az összes vonatkozó jogszabály és előírás betartása is.


// 3. Foglalások és fizetések

// Amikor a(z) ${env.WEBSITE_NAME} oldalon foglalást készítesz, vállalod, hogy pontos és teljes adatokat adsz meg. Minden fizetés a biztonságos fizetési rendszerünkön keresztül történik. A fizetés befejezése után visszaigazolást kapsz a foglalásról.


// 4. Lemondási feltételek

// A bérlés kezdete előtt 24 órával történő lemondás esetén teljes visszatérítésre lehetsz jogosult. A bérlés kezdete előtti 24 órán belüli lemondás lemondási díjat vonhat maga után. A részletekért kérjük, tekintsd meg a lemondási szabályzatot.


// 5. Bérlési feltételek

// Minden bérlés a bérlési feltételeink hatálya alá tartozik, amelyek többek között életkori korlátozásokat, jogosítvány-követelményeket és biztosítási kötelezettségeket is tartalmazhatnak. A foglalás előtt neked kell meggyőződnöd arról, hogy minden követelménynek megfelelsz.


// 6. Felelősség korlátozása

// A(z) ${env.WEBSITE_NAME} nem vállal felelősséget a szolgáltatás használatából eredő közvetett, járulékos vagy következményi károkért. Teljes felelősségünk semmilyen esetben sem haladja meg az általad a szolgáltatásért kifizetett összeget.


// 7. A feltételek módosítása

// Fenntartjuk a jogot a Felhasználási feltételek bármikori módosítására. A változások a weboldalon történő közzétételkor azonnal hatályba lépnek. A szolgáltatás további használata a módosítások elfogadását jelenti.


// 8. Irányadó jog

// A jelen feltételekre a vonatkozó jogszabályok az irányadók. A feltételekből eredő viták rendezése az illetékes bíróságok előtt történik.


// 9. Kapcsolat

// Ha kérdésed van a Felhasználási feltételekkel kapcsolatban, írj nekünk: ${env.CONTACT_EMAIL}. Szívesen segítünk.


// 10. Tudomásulvétel

// Szolgáltatásaink használatával tudomásul veszed, hogy elolvastad, megértetted és elfogadod a jelen Felhasználási feltételeket, és magadra nézve kötelezőnek ismered el azokat.
//     `,
// },
// })

// langHelper.setLanguage(strings)
// export { strings }


import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const en = {
  SEO_TITLE: 'Rental Terms and Contract Template',
  SEO_DESCRIPTION:
    'Review the main vehicle and equipment rental conditions and download the current rental contract template in PDF or Word format.',

  EYEBROW: 'HL Auto Rental · Rental documents',
  TITLE: 'Rental terms and contract template',
  INTRO:
    'Review the main conditions applicable to vehicle and equipment rentals. The complete contract template can also be downloaded in PDF or editable Word format.',

  DOCUMENTS_TITLE: 'Downloadable contract documents',
  DOCUMENTS_TEXT:
    'The PDF version is suitable for reviewing and printing. The Word version can be completed electronically before signing.',

  PDF_TITLE: 'Rental contract - PDF',
  PDF_DESCRIPTION:
    'Print-ready version of the complete rental contract template.',
  PDF_DOWNLOAD: 'Download PDF',
  PDF_OPEN: 'Open PDF',

  WORD_TITLE: 'Rental contract - Word',
  WORD_DESCRIPTION:
    'Editable version of the rental contract template.',
  WORD_DOWNLOAD: 'Download Word document',

  NOTICE_TITLE: 'Important information',
  NOTICE_TEXT:
    'The summary below is provided for easier understanding. The complete, completed and signed rental contract contains the legally relevant terms agreed between the parties.',

  RULES_EYEBROW: 'Conditions of rental',
  RULES_TITLE: 'The most important rental rules',
  RULES_INTRO:
    'The following sections provide an overview of the conditions included in the downloadable contract template.',

  RULE_1_TITLE: 'Subject of the rental',
  RULE_1_BODY:
    'The rental may include a passenger car, cargo van or truck and the equipment listed in the annex, including tools, ladders, step stools and scaffolding. The exact vehicle and equipment must be recorded in the signed contract and handover report.',

  RULE_2_TITLE: 'Rental period and rental fee',
  RULE_2_BODY:
    'The starting and ending date and time of the rental, the daily vehicle rental fee and any equipment rental fees are recorded individually in the signed contract.',

  RULE_3_TITLE: 'Mileage allowance and excess mileage',
  RULE_3_BODY:
    'The daily mileage allowance and the fee payable for excess mileage are recorded in the contract. Any excess mileage fee must be settled when the rental ends.',

  RULE_4_TITLE: 'Payment and security deposit',
  RULE_4_BODY:
    'The rental fee must be paid before the rental begins. A security deposit may also be required. The lessor may satisfy contract-related claims from the deposit, while the remaining amount is returned after the rental ends.',

  RULE_5_TITLE: 'Handover and proper use',
  RULE_5_BODY:
    'The vehicle and equipment are handed over in an operating condition. Existing damage, mileage and other relevant circumstances must be recorded in the handover report. The renter must use all rented items carefully and according to the manufacturer’s instructions.',

  RULE_6_TITLE: 'Territorial and usage restrictions',
  RULE_6_BODY:
    'Unless otherwise agreed in writing, the vehicle may only be used within Hungary. Smoking in the vehicle and placing advertising stickers on it are prohibited.',

  RULE_7_TITLE: 'Operating costs and fines',
  RULE_7_BODY:
    'Fuel, parking, toll, motorway, access and similar costs incurred during the rental are payable by the renter. The renter is also responsible for fines resulting from unlawful use or breaches of traffic regulations.',

  RULE_8_TITLE: 'Damage, breakdown and insurance',
  RULE_8_BODY:
    'Accidents, damage, faults or suspected faults must be reported immediately. Repairs may not be arranged without prior approval. The contract template states that the vehicles do not have comprehensive Casco insurance, therefore damage caused by the renter may result in full compensation liability.',

  RULE_9_TITLE: 'Use by another person',
  RULE_9_BODY:
    'The vehicle or equipment may not be transferred, sublet or made available to another person without the lessor’s permission. The person authorised to drive the vehicle must be identified in the signed contract.',

  RULE_10_TITLE: 'Return, late return and extension',
  RULE_10_BODY:
    'At the end of the rental, the vehicle and equipment must be returned in an operational and clean condition. Late return may result in additional rental fees or a surcharge. An extension must be requested before the contract expires.',

  RULE_11_TITLE: 'Applicable law',
  RULE_11_BODY:
    'Matters not regulated by the contract are governed by the rental provisions of the Hungarian Civil Code. The contract becomes complete when it is filled in and signed by the parties and witnesses.',

  CONTACT_TITLE: 'Do you have a question about the contract?',
  CONTACT_TEXT:
    `Contact us before booking or signing. You can also write to us at ${env.CONTACT_EMAIL}.`,
  CONTACT_BUTTON: 'Contact us',
}

const hu = {
  SEO_TITLE: 'Bérleti feltételek és szerződésminta',
  SEO_DESCRIPTION:
    'Ismerd meg a gépjármű- és eszközbérlés legfontosabb feltételeit, és töltsd le az aktuális bérleti szerződésmintát PDF vagy Word formátumban.',

  EYEBROW: 'HL Autóbérlés · Bérleti dokumentumok',
  TITLE: 'Bérleti feltételek és szerződésminta',
  INTRO:
    'Tekintsd át a gépjárművek és eszközök bérlésére vonatkozó legfontosabb feltételeket. A teljes szerződésminta PDF és szerkeszthető Word formátumban is letölthető.',

  DOCUMENTS_TITLE: 'Letölthető szerződésdokumentumok',
  DOCUMENTS_TEXT:
    'A PDF-változat megtekintéshez és nyomtatáshoz, a Word-változat pedig elektronikus kitöltéshez használható.',

  PDF_TITLE: 'Gépjármű-bérleti szerződés - PDF',
  PDF_DESCRIPTION:
    'A teljes szerződésminta nyomtatásra kész változata.',
  PDF_DOWNLOAD: 'PDF letöltése',
  PDF_OPEN: 'PDF megnyitása',

  WORD_TITLE: 'Gépjármű-bérleti szerződés - Word',
  WORD_DESCRIPTION:
    'A szerződésminta szerkeszthető és elektronikusan kitölthető változata.',
  WORD_DOWNLOAD: 'Word-dokumentum letöltése',

  NOTICE_TITLE: 'Fontos tudnivaló',
  NOTICE_TEXT:
    'Az alábbi összefoglaló a könnyebb tájékozódást szolgálja. A felek közötti jogviszony teljes és egyedi feltételeit a kitöltött és aláírt bérleti szerződés tartalmazza.',

  RULES_EYEBROW: 'Bérleti szabályok',
  RULES_TITLE: 'A legfontosabb bérleti feltételek',
  RULES_INTRO:
    'Az alábbi részek a letölthető szerződésmintában szereplő legfontosabb szabályokat foglalják össze.',

  RULE_1_TITLE: 'A bérlet tárgya',
  RULE_1_BODY:
    'A bérlet tárgya lehet személyautó, kisteherautó vagy teherautó, továbbá a szerződés mellékletében felsorolt szerszámok, létrák, fellépők és állványok. A pontos járművet és eszközöket az aláírt szerződésben és az átadás-átvételi jegyzőkönyvben kell rögzíteni.',

  RULE_2_TITLE: 'Bérleti idő és bérleti díj',
  RULE_2_BODY:
    'A bérlet kezdő és befejező időpontját, a gépjármű napi bérleti díját, valamint az eszközök esetleges bérleti díját minden esetben az egyedi szerződés tartalmazza.',

  RULE_3_TITLE: 'Kilométerkeret és túlfutási díj',
  RULE_3_BODY:
    'A napi kilométerkeretet és annak túllépése esetén fizetendő kilométerenkénti díjat a szerződésben kell meghatározni. A túlfutási díjat a bérleti jogviszony végén kell rendezni.',

  RULE_4_TITLE: 'Fizetés és kaució',
  RULE_4_BODY:
    'A bérleti díjat a bérlet megkezdése előtt kell megfizetni. A bérbeadó kaució megfizetését is kérheti, amelyből a szerződéssel kapcsolatos jogos követeléseit levonhatja. A fennmaradó összeget a bérlet lezárásakor vissza kell fizetni.',

  RULE_5_TITLE: 'Átadás és rendeltetésszerű használat',
  RULE_5_BODY:
    'A gépjárművet és az eszközöket üzemképes állapotban kell átadni. A meglévő sérüléseket, a kilométeróra állását és minden lényeges körülményt átadás-átvételi jegyzőkönyvben kell rögzíteni. A bérlő köteles a bérelt dolgokat gondosan és a gyártói előírások szerint használni.',

  RULE_6_TITLE: 'Területi és használati korlátozások',
  RULE_6_BODY:
    'Eltérő írásbeli megállapodás hiányában a gépjármű kizárólag Magyarország területén használható. A járműben tilos a dohányzás, továbbá marketingcélú matricák sem helyezhetők el rajta.',

  RULE_7_TITLE: 'Üzemeltetési költségek és bírságok',
  RULE_7_BODY:
    'A bérlés alatt felmerülő üzemanyag-, parkolási, behajtási, autópálya-, útdíj- és egyéb használati költségek a bérlőt terhelik. A közlekedési és parkolási szabályok megszegéséből eredő bírságokat szintén a bérlő köteles megfizetni.',

  RULE_8_TITLE: 'Káresemény, meghibásodás és biztosítás',
  RULE_8_BODY:
    'A balesetet, sérülést, meghibásodást vagy annak gyanúját haladéktalanul jelezni kell a bérbeadónak. Előzetes egyeztetés nélkül javítás nem végeztethető. A szerződésminta szerint a gépjárművek nem rendelkeznek Casco biztosítással, ezért saját hibás károkozás esetén a bérlőt teljes kártérítési kötelezettség terhelheti.',

  RULE_9_TITLE: 'Más személy általi használat',
  RULE_9_BODY:
    'A gépjármű és az eszközök a bérbeadó engedélye nélkül más személy használatába vagy albérletbe nem adhatók. A gépjármű vezetésére jogosult személyt az aláírt szerződésben fel kell tüntetni.',

  RULE_10_TITLE: 'Visszaadás, késedelem és hosszabbítás',
  RULE_10_BODY:
    'A bérlet végén a gépjárművet és az eszközöket üzemképes, tiszta állapotban kell visszaszolgáltatni. A késedelmes visszaadás további bérleti díjat vagy felárat vonhat maga után. A hosszabbítást a szerződés lejárata előtt kell kezdeményezni.',

  RULE_11_TITLE: 'Irányadó jog',
  RULE_11_BODY:
    'A szerződésben nem szabályozott kérdésekben a Polgári Törvénykönyv bérletre vonatkozó rendelkezései irányadók. A szerződés a felek és a tanúk aláírásával, az egyedi adatok kitöltésével válik teljessé.',

  CONTACT_TITLE: 'Kérdésed van a szerződéssel kapcsolatban?',
  CONTACT_TEXT:
    `Foglalás vagy aláírás előtt kérj tájékoztatást. E-mailben is elérsz minket: ${env.CONTACT_EMAIL}.`,
  CONTACT_BUTTON: 'Kapcsolatfelvétel',
}

const strings = new LocalizedStrings({
  fr: en,
  en,
  es: en,
  hu,
})

langHelper.setLanguage(strings)

export { strings }
