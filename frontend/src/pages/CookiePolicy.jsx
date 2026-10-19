import React from 'react'
import { Link } from 'react-router-dom'
import PolicyLayout, { PolicyList, PolicySection } from '../components/legal/PolicyLayout'

const CookiePolicy = () => (
  <PolicyLayout
    eyebrow="WEBSITE STORAGE AND PREFERENCES"
    title="Cookie Policy"
    intro="This policy explains what cookies are, the two main types based on how long they remain on your device, what they can be used for, and how you can manage them while visiting the Secofrate website."
  >
    <PolicySection title="1. What cookies are">
      <p>Cookies are small text files that a website or a service used by the website may ask your browser to store on your device. A cookie can contain a unique identifier or a small amount of information. The browser sends it back to the website or relevant service on later requests, subject to its settings and the cookie’s scope.</p>
      <p>Cookies do not usually contain the readable contents of your files, messages or documents. However, an identifier can become personal data when it can be linked to a person, account, device or browsing activity. Similar technologies include local storage, session storage, pixels and software development kits; they are not technically cookies, but can perform related functions and should be explained and controlled appropriately.</p>
    </PolicySection>

    <PolicySection title="2. The two types of cookies by duration">
      <h3 className="font-bold text-sic-black">Session cookies</h3>
      <p>A session cookie is temporary. It is generally removed when you close the browser or when the relevant session ends. Websites commonly use session cookies to remember a user’s actions while moving between pages, maintain a temporary sign-in session, support security checks, or keep a short-lived preference during one visit. A session cookie should not be confused with a session-storage item or a server-side session, although systems may use them together.</p>
      <h3 className="mt-5 font-bold text-sic-black">Persistent cookies</h3>
      <p>A persistent cookie remains on your device after the browser is closed until it expires or you delete it. A site may use one to remember a preference, recognise that a visitor has already made a cookie choice, or support a longer-lived security or analytics function. Its lifetime should be limited to what the stated purpose needs; you can remove it earlier through browser settings.</p>
      <p>Session and persistent describe how long a cookie lasts. Separately, cookies can be classified by purpose, such as strictly necessary, preference, analytics or advertising. A cookie’s duration does not by itself determine whether it is necessary or whether consent is required.</p>
    </PolicySection>

    <PolicySection title="3. How this website currently uses cookies">
      <p>At the time of publication, the website’s application code does not intentionally set first-party cookies, run an analytics or advertising tag, or provide a sign-in session on the public website. The contact form sends information to the Secofrate server; its current implementation does not use a cookie to submit the form. The site may load website infrastructure or externally hosted resources, such as web fonts. The providers and browser may process technical request information as part of delivering those resources.</p>
      <p>Hosting, security, content-delivery or infrastructure providers may set or process cookies outside the application code, for example to route traffic, prevent abuse or maintain service reliability. The cookies used can depend on the production hosting configuration and may change if new tools or features are introduced. We will update this policy and provide any notices or choices required before introducing non-essential cookies.</p>
      <p>We do not use cookies on this public website to track visitors across unrelated websites or to deliver behavioural advertising. If that changes, this policy will be updated to identify the relevant purposes and providers and explain the available choices.</p>
    </PolicySection>

    <PolicySection title="4. Common cookie purposes">
      <p>For clarity, websites may use cookies for the following purposes. The list explains possible functions; it does not mean that every category is currently active on this site.</p>
      <PolicyList items={[
        'Strictly necessary or security cookies: maintain a requested service, balance traffic, prevent abuse, protect forms, preserve a secure session or remember a privacy choice. These are generally limited to the function needed to operate the service.',
        'Preference cookies: remember choices such as language, display preferences or accessibility settings so they do not need to be set again on every visit.',
        'Analytics cookies: help measure aggregated use of pages and features, understand errors and improve the site. Analytics tools may receive identifiers and technical data; any deployment should be configured to minimise collection and respect required consent.',
        'Advertising or cross-site tracking cookies: may be used by advertising services to recognise a browser across sites and select or measure adverts. The public Secofrate website does not currently use these for behavioural advertising.'
      ]} />
    </PolicySection>

    <PolicySection title="5. Consent and control">
      <p>Where applicable law requires consent for a non-essential cookie or similar technology, we will request consent before it is stored or accessed, explain the purpose, and provide a way to change or withdraw the choice. Strictly necessary technologies may be used where permitted because they are required to provide a service you request or to protect the website. We will not treat optional analytics or advertising as essential simply because they are convenient.</p>
      <p>At present, this website has no cookie preference panel because its application code does not intentionally set optional cookies. You can still control cookies through your browser: block cookies, clear existing site data, restrict third-party cookies, or configure alerts before a cookie is stored. If you block all cookies, some websites and embedded services may not function as intended. Browser controls do not necessarily block non-cookie technologies such as local storage or pixels.</p>
    </PolicySection>

    <PolicySection title="6. Third-party services">
      <p>Third-party services embedded in or linked from a website may set their own cookies under their own policies. A provider may receive technical information such as an IP address, browser type and the page that requested a resource. The public site currently links to external resources, including Google-hosted fonts and the Office of the Data Protection Commissioner. Following an external link takes you to that provider’s website, where its own privacy and cookie practices apply.</p>
      <p>We aim to limit third-party technologies to what is needed to operate and improve the website. Before adding a new analytics, advertising, chat, video or social-media tool, we will review its data practices and update this policy and any required consent controls.</p>
    </PolicySection>

    <PolicySection title="7. Cookie data and privacy">
      <p>Information associated with cookies or similar technologies may include an online identifier, device or browser information, pages viewed, approximate activity times, and preference or security state. We use such information only for the disclosed purpose, limit access and retention to what is necessary, and handle any personal data in line with our <Link className="font-semibold text-sic-red hover:underline" to="/privacy">Privacy Policy</Link> and applicable data-protection law.</p>
      <p>Do not use a public or shared device to access sensitive client material. The public website is not intended for exchange of evidence or confidential assignment files; contact us to agree a suitable channel.</p>
    </PolicySection>

    <PolicySection title="8. Changes and contact">
      <p>We may revise this policy when website technologies, providers or legal requirements change. The effective date at the top shows when this version was published. For questions about cookies, website data or a privacy choice, contact us at <a className="font-semibold text-sic-red hover:underline" href="mailto:intel@secofrate.com">intel@secofrate.com</a>.</p>
    </PolicySection>
  </PolicyLayout>
)

export default CookiePolicy
