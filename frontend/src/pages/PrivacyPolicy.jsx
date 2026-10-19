import React from 'react'
import PolicyLayout, { PolicyList, PolicySection } from '../components/legal/PolicyLayout'

const PrivacyPolicy = () => (
  <PolicyLayout
    eyebrow="PRIVACY AND PERSONAL DATA"
    title="Privacy Policy"
    intro="This policy explains how Secofrate Investigations Bureau handles personal information when you visit this website, contact us, enquire about our services, or engage us for security or investigative work. We treat privacy and the confidentiality of sensitive matters as essential parts of responsible security work."
  >
    <PolicySection title="1. Who we are and when this policy applies">
      <p>In this policy, “Secofrate”, “we”, “us” and “our” mean Secofrate Investigations Bureau. This policy applies to personal data processed through our public website and, where relevant, in connection with enquiries, proposals, service delivery, client administration and professional communications.</p>
      <p>For a particular assignment, Secofrate may process information on its own behalf or under a client’s documented instructions. The roles and responsibilities of the parties depend on the assignment and applicable law. A client engagement may also have additional confidentiality, data-handling or retention terms; those terms should be read together with this policy.</p>
    </PolicySection>

    <PolicySection title="2. Information we may handle">
      <p>The information depends on how you interact with us and the scope of any engagement. It may include:</p>
      <PolicyList items={[
        'Contact and identity details, such as your name, email address, telephone number, organization and job title.',
        'Enquiry information, including the subject, message, urgency and any details or documents you choose to send through a form or other communication channel.',
        'Client and assignment records, such as instructions, correspondence, meeting notes, service records, invoices and authorised points of contact.',
        'Information relevant to a security or investigative assignment, which may include statements, images, video, location or movement information, public-record material, digital files, incident details and evidence records.',
        'Personnel, contractor or access information where needed to administer a service, verify authority, coordinate site access or meet legal obligations.',
        'Technical information associated with operating the website and protecting its services, such as request time, device or browser details, and network identifiers processed by hosting or infrastructure providers.'
      ]} />
      <p>Assignment information can concern people other than the person who instructs us. We handle such information only in the context of the authorised purpose, applicable law and the instructions or legal basis relevant to that work. Please do not send highly sensitive information through the general website contact form unless we have agreed a suitable channel and it is necessary for your enquiry.</p>
    </PolicySection>

    <PolicySection title="3. Why we use information">
      <p>We use personal data for specific and proportionate purposes, which may include:</p>
      <PolicyList items={[
        'Responding to enquiries, assessing requested services and communicating with prospective or existing clients.',
        'Planning and delivering agreed security, protection, investigative, intelligence, forensic or related professional services.',
        'Protecting people, property, sites, systems and the integrity of an investigation or security assignment.',
        'Maintaining accurate case, evidence, chain-of-custody, incident, client and service records where relevant to an engagement.',
        'Managing billing, contractual obligations, service quality, complaints, disputes and legal claims.',
        'Keeping our website and systems available, secure and protected against misuse, fraud, unauthorised access and service disruption.',
        'Meeting applicable legal, regulatory, professional and record-keeping obligations, and responding to lawful requests.'
      ]} />
      <p>We do not use information collected for one purpose in a way that is incompatible with that purpose. If a new use is proposed, we will assess whether it is lawful and provide any notice required.</p>
    </PolicySection>

    <PolicySection title="4. Legal grounds and sensitive information">
      <p>Depending on the circumstances, processing may be necessary to take steps at your request, perform a contract, comply with a legal obligation, protect vital interests, carry out a task permitted by law, or pursue a legitimate interest that does not override your rights. Where consent is the appropriate basis, we will request it and explain how it can be withdrawn. The applicable basis can differ between a website enquiry and a client-authorised assignment.</p>
      <p>Security and investigative work can involve sensitive personal data, including biometric identifiers, health information, precise location, information about alleged offences, or information concerning a person’s private or family affairs. We limit such processing to what is relevant and necessary for the assignment, apply appropriate safeguards, and observe any additional consent, authorisation or legal requirements that apply. A client instruction alone does not remove legal restrictions on processing.</p>
    </PolicySection>

    <PolicySection title="5. Investigations, security operations and evidence">
      <p>When engaged to conduct investigative or protective work, we may collect information from the client, the individual concerned, witnesses, public or lawfully accessible records, digital sources, or observations made during an authorised operation. The sources and methods depend on the assignment and must be assessed against the client’s authority, the purpose, necessity and applicable law.</p>
      <p>Where evidence or operational records are created, they may be recorded with context such as the collection date, source, handler, transfer, storage location or access history. Access is limited to people who need the information for the engagement, supervision, legal review or another authorised purpose. We do not promise that a particular item will be admissible or that an investigation will achieve a particular outcome.</p>
      <p>Clients are responsible for ensuring they have a lawful basis and authority to instruct work involving other people’s data. We may ask for clarification, limit work, or decline an instruction where authority or legality is unclear.</p>
    </PolicySection>

    <PolicySection title="6. How we share information">
      <p>We do not sell personal data. Information may be shared only where appropriate for the stated purpose, such as:</p>
      <PolicyList items={[
        'With the client or their authorised representatives, as agreed for the engagement and subject to applicable rights and legal restrictions.',
        'With personnel, professional advisers, investigators, security providers or vetted service providers who need it to perform authorised work or support our operations and are subject to confidentiality or data-protection duties.',
        'With courts, law-enforcement bodies, regulators, emergency services or other public authorities when required or permitted by law, or where necessary to protect vital interests.',
        'With another party involved in a transaction, restructuring or transfer of services, subject to appropriate confidentiality and legal safeguards.'
      ]} />
      <p>We expect service providers to use information only for the services they provide and to protect it appropriately. We do not disclose operational or client information for publicity or marketing without authority.</p>
    </PolicySection>

    <PolicySection title="7. International processing">
      <p>Some technology or communications providers may process information in countries outside Kenya. Where personal data is transferred across borders, we will apply the requirements of Kenyan data-protection law, including any required safeguards, contractual protections, assessment or consent. The relevant location and safeguards can depend on the provider and service used for a particular engagement.</p>
    </PolicySection>

    <PolicySection title="8. Retention and secure handling">
      <p>We keep information only for as long as it is reasonably needed for the purpose for which it was collected, an active service or investigation, evidence integrity, legal or regulatory duties, resolving disputes, or establishing and defending legal claims. Retention periods vary by record type, assignment and legal obligations; we do not apply one fixed period to all investigative or client files.</p>
      <p>When information is no longer needed, we take reasonable steps to securely delete it, anonymise it or otherwise dispose of it. A record may be retained longer where law requires it, a legal hold applies, or preservation is necessary to protect a legitimate legal interest.</p>
      <p>We use administrative, technical and physical safeguards appropriate to the sensitivity and risk of the information. No website, email or electronic transmission can be guaranteed completely secure. Contact us before sending sensitive case material so we can agree an appropriate channel.</p>
    </PolicySection>

    <PolicySection title="9. Your privacy rights">
      <p>Subject to applicable law and any lawful limits, individuals may have the right to be informed about use of their data, request access, object to processing, request correction of inaccurate or misleading information, and request deletion of false or misleading data. Other rights or conditions may apply depending on the processing and the Data Protection Act, 2019.</p>
      <p>To make a request, email <a className="font-semibold text-sic-red hover:underline" href="mailto:intel@secofrate.com">intel@secofrate.com</a> with “Privacy Request” in the subject and enough information for us to understand and verify it. We may request proportionate proof of identity or authority before acting, especially where disclosure could expose another person’s information, compromise an investigation, affect safety, or breach a legal duty. We will respond within the period required by applicable law.</p>
      <p>If you are dissatisfied with our response, you may contact Kenya’s Office of the Data Protection Commissioner. See the <a className="font-semibold text-sic-red hover:underline" href="https://www.odpc.go.ke/rights-of-a-data-subject/" target="_blank" rel="noreferrer">ODPC guidance on data-subject rights</a> and its <a className="font-semibold text-sic-red hover:underline" href="https://www.odpc.go.ke/data-protection-laws-kenya/" target="_blank" rel="noreferrer">data-protection laws and regulations</a>.</p>
    </PolicySection>

    <PolicySection title="10. Children">
      <p>Our website and professional services are not directed to children as ordinary consumers. We do not knowingly collect children’s information through the public website for marketing. Information relating to a child may arise in a specific client-authorised matter; in that case, it must be handled with heightened care and in accordance with applicable law, safeguards and any required parental or guardian authority.</p>
    </PolicySection>

    <PolicySection title="11. External websites and changes">
      <p>Our website may link to third-party websites or services. Their privacy practices are governed by their own policies, and we are not responsible for their content or handling of information. We may update this policy as our services, technology or legal obligations change. The effective date above identifies the latest published version. Material changes will be reflected on this page.</p>
    </PolicySection>
  </PolicyLayout>
)

export default PrivacyPolicy
