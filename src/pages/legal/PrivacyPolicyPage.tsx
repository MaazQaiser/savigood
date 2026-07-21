import { LegalDocument } from '@/components/legal/LegalDocument'

export function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy" updated="July 1, 2026">
      <p>
        This Privacy Policy describes how Savi (“we”, “us”) collects, uses, and shares information
        when you use the Savi Buyer Portal and Admin Dashboard (the “Service”).
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong className="text-foreground font-medium">Account data</strong> — name, email,
          phone, company, role, and credentials
        </li>
        <li>
          <strong className="text-foreground font-medium">Transaction data</strong> — RFQs, quotes,
          orders, payment references, shipment and tracking details
        </li>
        <li>
          <strong className="text-foreground font-medium">Files</strong> — documents you upload
          (e.g. POs, specifications, certificates)
        </li>
        <li>
          <strong className="text-foreground font-medium">Communications</strong> — messages sent
          through in-app chat
        </li>
        <li>
          <strong className="text-foreground font-medium">Technical data</strong> — device, browser,
          IP address, and usage logs needed to operate and secure the Service
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Provide and improve the Service</li>
        <li>Process quotes, orders, payments, and shipments</li>
        <li>Communicate about account activity and support</li>
        <li>Maintain security, prevent fraud, and comply with law</li>
      </ul>

      <h2>3. Sharing</h2>
      <p>
        We share information with service providers who help operate the Service (e.g. hosting,
        payment processing) under contractual confidentiality obligations; with your counterparties
        as needed to fulfill RFQs and orders; and when required by law or to protect rights and safety.
        We do not sell personal information.
      </p>

      <h2>4. Retention</h2>
      <p>
        We retain information for as long as needed to provide the Service, meet legal and
        accounting requirements, and resolve disputes. Retention periods vary by data type.
      </p>

      <h2>5. Security</h2>
      <p>
        We implement administrative, technical, and organizational measures designed to protect
        information. No method of transmission or storage is completely secure.
      </p>

      <h2>6. Your choices</h2>
      <p>
        You may update profile information in Account settings. Contact us to request access,
        correction, or deletion where applicable under local law. Some requests may be limited
        by legitimate business or legal needs.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Information may be processed in countries other than where you are located. Where required,
        we use appropriate safeguards for cross-border transfers.
      </p>

      <h2>8. Contact</h2>
      <p>
        Privacy inquiries: privacy@savi.example
      </p>
    </LegalDocument>
  )
}
