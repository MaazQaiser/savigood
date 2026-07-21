import { LegalDocument } from '@/components/legal/LegalDocument'

export function TermsOfServicePage() {
  return (
    <LegalDocument title="Terms of Service" updated="July 1, 2026">
      <p>
        These Terms of Service (“Terms”) govern access to and use of the Savi platform,
        including the Buyer Portal and related services (collectively, the “Service”), operated
        by Savi (“we”, “us”, or “our”). By creating an account or using the Service, you agree
        to these Terms.
      </p>

      <h2>1. Eligibility and accounts</h2>
      <p>
        You must be authorized to act on behalf of your organization. You are responsible for
        maintaining the confidentiality of your credentials and for all activity under your
        account. Notify us promptly of any unauthorized use.
      </p>

      <h2>2. Use of the Service</h2>
      <p>You agree to use the Service only for lawful business purposes and not to:</p>
      <ul>
        <li>Interfere with or disrupt the Service or its infrastructure</li>
        <li>Attempt unauthorized access to other accounts or data</li>
        <li>Upload malicious code or content that violates third-party rights</li>
        <li>Misrepresent your identity or affiliation when submitting RFQs or payments</li>
      </ul>

      <h2>3. Quotes, orders, and payments</h2>
      <p>
        Quotes displayed in the Service are invitations to contract and may expire on the stated
        validity date. Approving a quote and completing required deposits or balance payments
        creates binding commercial obligations subject to the applicable quote, order confirmation,
        and any Master Service Agreement (MSA) between the parties.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        Savi and its licensors own the Service, including software, design, and trademarks.
        You retain ownership of documents and data you upload. You grant Savi a limited license
        to process that content solely to provide the Service.
      </p>

      <h2>5. Confidentiality</h2>
      <p>
        Non-public pricing, specifications, and business information exchanged through the
        Service are confidential and may only be used for the purpose of evaluating or fulfilling
        procurement transactions.
      </p>

      <h2>6. Disclaimers and limitation of liability</h2>
      <p>
        The Service is provided “as is.” To the maximum extent permitted by law, Savi disclaims
        warranties of merchantability, fitness for a particular purpose, and non-infringement.
        Savi’s aggregate liability arising from these Terms or the Service shall not exceed the
        fees paid by your organization for the Service in the twelve (12) months preceding the claim.
      </p>

      <h2>7. Termination</h2>
      <p>
        We may suspend or terminate access for material breach of these Terms. You may stop using
        the Service at any time. Provisions that by nature should survive will survive termination.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use after the effective date of
        changes constitutes acceptance of the updated Terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms: legal@savi.example
      </p>
    </LegalDocument>
  )
}
