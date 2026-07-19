import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'
import { SITE } from '@/config/site.config'

const consentStorageKey = 'hlautoberles-consent-v1'

const strings = new LocalizedStrings({
  hu: {
    TITLE: 'Sütikezelési tájékoztató',
    POLICY: `
Hatályos: 2026. július 19.

Ez a tájékoztató bemutatja, hogy a ${env.WEBSITE_NAME} weboldala milyen sütiket, böngészőoldali tárolási megoldásokat és hasonló technológiákat használ. A statisztikai célú mérések csak az Ön kifejezett hozzájárulása után indulnak el. A weboldal használata önmagában nem jelent hozzájárulást.

1. Mi a süti és a böngészőoldali tárolás?

A süti egy, a böngésző által tárolt kis adatállomány. A localStorage olyan böngészőoldali tárhely, amelyben a weboldal bizonyos beállításokat őrizhet meg. Ezek egy része a weboldal működéséhez szükséges, más részük kizárólag statisztikai célokat szolgál.

2. Feltétlenül szükséges technológiák

A weboldal a működéshez, biztonságos bejelentkezéshez, munkamenet-kezeléshez és a felhasználó által választott beállítások megőrzéséhez szükséges technikai adatokat használhat. Ezek nélkül egyes funkciók – például a bejelentkezés, a foglalások kezelése vagy a biztonsági ellenőrzés – nem működnének megfelelően.

A sütiválasztást a weboldal a következő localStorage-bejegyzésben tárolja:

- Név: ${consentStorageKey}
- Típus: localStorage
- Cél: annak megőrzése, hogy Ön engedélyezte vagy elutasította-e a statisztikai mérést
- Tárolt adatok: verzió, szükséges tárolás állapota, statisztikai hozzájárulás állapota és a mentés időpontja
- Megőrzés: a választás módosításáig vagy a böngésző webhelyadatainak törléséig

Ez a bejegyzés feltétlenül szükséges, mert nélküle a weboldal nem tudná megjegyezni az Ön adatvédelmi választását.

3. Google Analytics 4

Az Ön hozzájárulása esetén a weboldal a Google Analytics 4 szolgáltatást használja a látogatottság, az oldalmegtekintések, a keresések, a foglalási folyamat és más webhelyhasználati események összesített elemzésére.

A Google Analytics a hozzájárulás előtt nem töltődik be. A Google Consent Mode alapértelmezett állapota analytics_storage=denied, ad_storage=denied, ad_user_data=denied és ad_personalization=denied. Hozzájárulás után kizárólag az analytics_storage válik engedélyezetté; hirdetési tárolást és hirdetési személyre szabást nem engedélyezünk.

A szolgáltatás jellemzően a következő első féltől származó sütiket használhatja:

- _ga: a felhasználók megkülönböztetésére; alapértelmezett lejárata legfeljebb 2 év
- _ga_<azonosító>: a munkamenet állapotának megőrzésére; alapértelmezett lejárata legfeljebb 2 év

A tényleges élettartamot a böngésző korlátozhatja. A Google Analytics beállított esemény- és felhasználói adatmegőrzési ideje 14 hónap.

4. Microsoft Clarity

Az Ön hozzájárulása esetén a weboldal Microsoft Clarity szolgáltatást használhat hőtérképek, kattintási minták, görgetési viselkedés és maszkolt munkamenet-felvételek készítésére. A cél a felhasználói élmény és a weboldal hibáinak javítása.

A Clarity a hozzájárulás előtt nem töltődik be. A szolgáltatásnak analytics_storage=granted és ad_storage=denied jelzést adunk. A Clarity beállítása kiegyensúlyozott maszkolást használ, továbbá a kapcsolatfelvételi űrlap és a bejelentkezéshez, foglaláshoz vagy felhasználói fiókhoz kapcsolódó privát oldalak alkalmazásszinten is maszkoltak.

A Clarity hozzájárulás után többek között a következő sütiket használhatja:

- _clck: a Clarity felhasználóazonosítójának és beállításainak megőrzésére
- _clsk: több oldalmegtekintés egy munkamenethez kapcsolására

A munkamenet-felvételek szolgáltatói megőrzési ideje jelenleg 30 nap; az összesített hőtérképes és kattintási adatok, valamint egyes megjelölt felvételek hosszabb ideig, a Microsoft mindenkori megőrzési szabályai szerint maradhatnak elérhetők.

5. Nem használunk célzott hirdetési sütiket

A weboldal jelenlegi beállítása nem engedélyezi a hirdetési adattárolást, a hirdetési felhasználói adatokat vagy a személyre szabott hirdetéseket. A Google Analytics és a Microsoft Clarity kizárólag statisztikai hozzájárulás után aktiválódik.

6. Hozzájárulás megadása és visszavonása

Első látogatáskor a sütibeállítási panelen elfogadhatja vagy elutasíthatja a statisztikai mérést. A szükséges technológiák nem kapcsolhatók ki, mert a weboldal alapvető működéséhez szükségesek.

A hozzájárulás bármikor módosítható vagy visszavonható a weboldal láblécében található „Sütibeállítások” hivatkozással. Visszavonáskor a weboldal leállítja a további statisztikai mérést és megkísérli törölni a hozzáférhető Google Analytics- és Clarity-sütiket. A böngésző beállításaiban az összes webhelyadat külön is törölhető.

7. Külső szolgáltatók

A Google Analytics szolgáltatója a Google, a Microsoft Clarity szolgáltatója a Microsoft. A szolgáltatók saját adatvédelmi szabályai, adatbiztonsági intézkedései és nemzetközi adattovábbítási garanciái alkalmazandók. A részletes adatkezelési tájékoztatás az Adatvédelmi tájékoztatóban található.

8. A tájékoztató módosítása

A tájékoztatót a használt technológiák, szolgáltatói feltételek vagy jogszabályi követelmények változása esetén frissíthetjük. A mindenkor hatályos változat ezen az oldalon érhető el.

9. Kapcsolat

Adatkezeléssel vagy sütibeállításokkal kapcsolatos kérdés esetén:

- E-mail: ${SITE.email}
- Telefon: ${SITE.phone}
- Weboldal: ${SITE.url}
    `,
  },
  en: {
    TITLE: 'Cookie Policy',
    POLICY: `
Effective date: 19 July 2026

This policy explains which cookies, browser storage solutions and similar technologies are used by the ${env.WEBSITE_NAME} website. Analytics services start only after your explicit consent. Merely using the website does not constitute consent.

1. Cookies and browser storage

A cookie is a small data file stored by the browser. localStorage is browser-side storage that can retain website preferences. Some technologies are necessary for the website to work, while others are used only for analytics.

2. Strictly necessary technologies

The website may use technical data required for operation, secure sign-in, session handling and the retention of user-selected settings. Without these technologies, functions such as sign-in, booking management and security checks may not work correctly.

Your cookie choice is stored under:

- Name: ${consentStorageKey}
- Type: localStorage
- Purpose: remembering whether analytics was accepted or rejected
- Data: version, necessary-storage flag, analytics preference and update time
- Retention: until you change the choice or delete the website data in your browser

3. Google Analytics 4

With your consent, Google Analytics 4 measures visits, page views, searches, the booking funnel and other website usage events in aggregated form.

Google Analytics is not loaded before consent. Google Consent Mode starts with analytics_storage, ad_storage, ad_user_data and ad_personalization denied. After consent only analytics_storage is granted. Advertising storage and personalised advertising remain disabled.

Typical first-party cookies may include:

- _ga: distinguishes users; default expiry up to 2 years
- _ga_<identifier>: maintains session state; default expiry up to 2 years

Browsers may enforce shorter lifetimes. The configured GA4 user- and event-level retention period is 14 months.

4. Microsoft Clarity

With your consent, Microsoft Clarity may create heatmaps, interaction statistics and masked session recordings to improve usability and identify errors.

Clarity is not loaded before consent. It receives analytics_storage=granted and ad_storage=denied. Balanced masking is enabled, and private account, sign-in, booking and contact-form content is additionally masked by the application.

Clarity may use cookies including:

- _clck: stores the Clarity user ID and preferences
- _clsk: connects page views into a single session

Playback data is currently retained by Microsoft for 30 days. Aggregated click and heatmap data and certain labelled recordings may be retained longer under Microsoft's current retention rules.

5. No targeted advertising cookies

The current configuration does not permit advertising storage, advertising user data or personalised advertising. Google Analytics and Microsoft Clarity are activated only after analytics consent.

6. Managing and withdrawing consent

On your first visit you may accept or reject analytics. Strictly necessary technologies cannot be disabled because they are required for core website functions.

You can change or withdraw consent at any time through the “Cookie settings” link in the footer. When analytics is withdrawn, further measurement stops and the website attempts to remove accessible Google Analytics and Clarity cookies. You may also delete all website data through your browser settings.

7. Third-party providers

Google provides Google Analytics and Microsoft provides Clarity. Their own privacy terms, security safeguards and international-transfer mechanisms apply. Further information is available in the Privacy Policy.

8. Changes

We may update this policy when technologies, provider terms or legal requirements change. The current version is always published on this page.

9. Contact

- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Website: ${SITE.url}
    `,
  },
  fr: {
    TITLE: 'Politique relative aux cookies',
    POLICY: `
Date d’effet : 19 juillet 2026

Cette politique explique les cookies, le stockage dans le navigateur et les technologies similaires utilisés par le site ${env.WEBSITE_NAME}. Les services de mesure ne démarrent qu’après votre consentement explicite. La simple utilisation du site ne vaut pas consentement.

1. Technologies strictement nécessaires

Le site peut utiliser les données techniques nécessaires au fonctionnement, à la connexion sécurisée, à la gestion des sessions et à la mémorisation de vos paramètres.

Votre choix est conservé sous la clé localStorage ${consentStorageKey}. Elle contient la version du mécanisme, le caractère nécessaire du stockage, votre choix analytique et la date de mise à jour. Elle reste stockée jusqu’à la modification du choix ou la suppression des données du site dans le navigateur.

2. Google Analytics 4

Avec votre consentement, Google Analytics 4 mesure de manière agrégée les visites, pages vues, recherches et étapes du parcours de réservation. Avant le consentement, le service n’est pas chargé. analytics_storage est autorisé uniquement après acceptation ; ad_storage, ad_user_data et ad_personalization restent refusés.

Les cookies _ga et _ga_<identifiant> peuvent être utilisés, avec une durée par défaut pouvant atteindre 2 ans, sous réserve des limites du navigateur. La conservation configurée des données utilisateur et événementielles est de 14 mois.

3. Microsoft Clarity

Avec votre consentement, Clarity peut produire des cartes thermiques, des statistiques d’interaction et des enregistrements de session masqués. Le mode de masquage équilibré est activé et les formulaires ainsi que les pages privées sont masqués par l’application.

Les cookies _clck et _clsk peuvent être utilisés après consentement. Les données de lecture des enregistrements sont actuellement conservées 30 jours ; d’autres données agrégées peuvent être conservées plus longtemps selon les règles de Microsoft.

4. Absence de publicité ciblée

Le stockage publicitaire et la personnalisation publicitaire restent désactivés. Les outils statistiques ne sont activés qu’après consentement.

5. Gestion du consentement

Vous pouvez modifier ou retirer votre consentement à tout moment via le lien « Paramètres des cookies » dans le pied de page. Le retrait arrête les futures mesures et le site tente de supprimer les cookies analytiques accessibles. Vous pouvez également supprimer toutes les données du site dans votre navigateur.

6. Contact

- E-mail : ${SITE.email}
- Téléphone : ${SITE.phone}
- Site : ${SITE.url}
    `,
  },
  es: {
    TITLE: 'Política de cookies',
    POLICY: `
Fecha de entrada en vigor: 19 de julio de 2026

Esta política explica las cookies, el almacenamiento del navegador y las tecnologías similares utilizadas por el sitio ${env.WEBSITE_NAME}. Los servicios analíticos solo se activan después de su consentimiento explícito. El uso del sitio por sí solo no constituye consentimiento.

1. Tecnologías estrictamente necesarias

El sitio puede utilizar datos técnicos necesarios para su funcionamiento, el inicio de sesión seguro, la gestión de sesiones y la conservación de preferencias.

Su elección se guarda en localStorage con la clave ${consentStorageKey}. Contiene la versión del mecanismo, el indicador de almacenamiento necesario, la preferencia analítica y la fecha de actualización. Se conserva hasta que cambie la elección o elimine los datos del sitio en el navegador.

2. Google Analytics 4

Con su consentimiento, Google Analytics 4 mide de forma agregada visitas, páginas vistas, búsquedas y pasos del proceso de reserva. Antes del consentimiento no se carga. Solo analytics_storage se autoriza después de aceptar; ad_storage, ad_user_data y ad_personalization permanecen denegados.

Pueden utilizarse las cookies _ga y _ga_<identificador>, con una duración predeterminada de hasta 2 años, sujeta a las limitaciones del navegador. La conservación configurada de datos de usuario y eventos es de 14 meses.

3. Microsoft Clarity

Con su consentimiento, Clarity puede crear mapas de calor, estadísticas de interacción y grabaciones de sesión enmascaradas. Se utiliza el modo de enmascaramiento equilibrado y la aplicación enmascara además los formularios y las páginas privadas.

Después del consentimiento pueden utilizarse _clck y _clsk. Los datos de reproducción se conservan actualmente durante 30 días; otros datos agregados pueden conservarse durante más tiempo conforme a las reglas de Microsoft.

4. Sin publicidad dirigida

El almacenamiento publicitario y la personalización de anuncios permanecen desactivados. Las herramientas analíticas solo se activan tras el consentimiento.

5. Gestión del consentimiento

Puede cambiar o retirar su consentimiento en cualquier momento mediante el enlace «Configuración de cookies» del pie de página. La retirada detiene las mediciones futuras y el sitio intenta borrar las cookies analíticas accesibles. También puede eliminar todos los datos del sitio desde el navegador.

6. Contacto

- Correo electrónico: ${SITE.email}
- Teléfono: ${SITE.phone}
- Sitio web: ${SITE.url}
    `,
  },
})

langHelper.setLanguage(strings)

export { strings }
