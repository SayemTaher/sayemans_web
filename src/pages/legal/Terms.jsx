import LegalLayout from './LegalLayout';
import { company } from '@/config/company';

export default function Terms() {
  return (
    <LegalLayout title="Terms & Conditions" updated="24 September 2026">
      <p>
        These general terms apply to all offers, proposals and agreements between {company.legalName}
        {company.kvk && <> (KvK {company.kvk})</>} and its clients, unless agreed otherwise in writing.
      </p>
      <h2>1. Proposals</h2>
      <p>Proposals are valid for 30 days. Prices are in euros and exclude VAT (BTW) unless stated otherwise.</p>
      <h2>2. Execution</h2>
      <p>We perform our work to the best of our knowledge and ability, according to the standards of good workmanship. Timelines are estimates unless explicitly agreed as fixed deadlines.</p>
      <h2>3. Payment</h2>
      <p>Invoices are payable within 14 days. Fixed-price projects are invoiced per milestone; subscriptions are invoiced monthly in advance.</p>
      <h2>4. Intellectual property</h2>
      <p>All intellectual property rights to deliverables transfer to the client upon full payment. We may reference the project in our portfolio unless agreed otherwise.</p>
      <h2>5. Liability</h2>
      <p>Our liability is limited to the amount invoiced for the relevant assignment in the three months preceding the event, and excludes indirect damage, except in cases of intent or gross negligence.</p>
      <h2>6. Confidentiality & data</h2>
      <p>Both parties keep confidential information confidential. Where we process personal data on your behalf, a data processing agreement (verwerkersovereenkomst) applies.</p>
      <h2>7. Governing law</h2>
      <p>Dutch law applies. Disputes are submitted to the competent court of Oost-Brabant, the Netherlands.</p>
      <p><em>Questions? Contact <a href={`mailto:${company.email}`}>{company.email}</a>.</em></p>
    </LegalLayout>
  );
}
