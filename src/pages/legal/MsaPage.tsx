import { LegalDocument } from '@/components/legal/LegalDocument'

export function MsaPage() {
  return (
    <LegalDocument title="Master Service Agreement" updated="July 1, 2026">
      <p>
        This Master Service Agreement (“MSA”) sets the framework terms between Savi (“Provider”)
        and the customer entity named in an applicable order, quote, or statement of work
        (“Customer”) for procurement and related platform services.
      </p>
      <p>
        This document is a design prototype summary for product UI purposes and does not constitute
        executed legal counsel. Final MSA language is agreed in writing between the parties.
      </p>

      <h2>1. Scope</h2>
      <p>
        Provider will make the Savi platform available and may supply goods or related logistics
        services as described in individual quotes and orders (each an “Order”). Each Order is
        governed by this MSA unless expressly stated otherwise.
      </p>

      <h2>2. Orders and acceptance</h2>
      <p>
        Customer may submit RFQs through the platform. Provider may issue quotes. Customer’s
        approval of a quote and payment of any required deposit constitutes acceptance of that Order.
        Changes require written (including electronic) agreement.
      </p>

      <h2>3. Fees and payment</h2>
      <p>
        Fees are set out in the Order. Deposits and balance payments are due as stated. Late amounts
        may accrue interest at the rate specified in the Order or the maximum allowed by law.
        Taxes are Customer’s responsibility except for taxes based on Provider’s income.
      </p>

      <h2>4. Delivery and risk</h2>
      <p>
        Delivery terms, Incoterms (if any), and estimated schedules appear on the Order. Title and
        risk transfer as specified in the Order. Tracking information may be provided via the platform
        and may be updated manually by Provider operations.
      </p>

      <h2>5. Warranties</h2>
      <p>
        Provider warrants that goods will materially conform to the specifications in the Order at
        delivery. Platform services will be provided in a professional manner. Except as expressly
        stated, Provider disclaims all other warranties.
      </p>

      <h2>6. Indemnification</h2>
      <p>
        Each party will defend and indemnify the other against third-party claims arising from its
        material breach of this MSA or gross negligence, subject to customary notice and control
        of defense provisions.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        Except for willful misconduct, confidentiality breaches, or payment obligations, neither
        party’s aggregate liability under this MSA will exceed the amounts paid or payable under
        the Orders giving rise to the claim in the twelve (12) months before the event.
      </p>

      <h2>8. Term and termination</h2>
      <p>
        This MSA remains in effect until terminated. Either party may terminate for material breach
        uncured within thirty (30) days of notice. Surviving Orders continue unless cancelled under
        their terms.
      </p>

      <h2>9. Governing law</h2>
      <p>
        Governing law and venue are as stated in the Order or, if silent, the laws of the State of
        Delaware, excluding conflict-of-law rules.
      </p>

      <h2>10. Contact</h2>
      <p>
        Commercial and legal notices: legal@savi.example
      </p>
    </LegalDocument>
  )
}
