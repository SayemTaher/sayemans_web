import { Link } from 'react-router';
import LegalLayout from './LegalLayout';
import { company, formatAddress } from '@/config/company';

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="24 September 2026">
      <p>
        {company.legalName} (“we”, “us”) respects your privacy. This policy explains which personal data we process when you visit{' '}
        {company.siteUrl.replace('https://', '')} or contact us, why, and what your rights are under the General Data Protection Regulation (GDPR / AVG).
      </p>

      <h2>1. Who is responsible</h2>
      <p>
        {company.legalName}
        {formatAddress() && <>, {formatAddress()}</>}
        {company.kvk && <>, KvK {company.kvk}</>}. Contact: <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>2. What we collect and why</h2>
      <ul>
        <li><strong>Inquiries</strong>: name, email, company, website and your message, to respond to your request (legal basis: pre-contractual steps / legitimate interest). Retained up to 24 months, or longer if we start working together.</li>
        <li><strong>Newsletter</strong>: your email address, to send studio updates (legal basis: consent). You can unsubscribe at any time.</li>
        <li><strong>Analytics</strong> (only with your consent): pages visited, referrer, campaign parameters, device type, language and a random pseudonymous identifier. Used to improve the website. Retained up to 14 months.</li>
        <li><strong>Technical data</strong>: IP address and browser data processed by our hosting provider to deliver and secure the website (legitimate interest).</li>
      </ul>

      <h2>3. Processors</h2>
      <p>
        We use carefully selected processors with data processing agreements: Cloudflare (hosting & security) and Google Firebase (database, authentication and,
        with consent, analytics). Where data is transferred outside the EEA, this happens under the EU–US Data Privacy Framework or Standard Contractual Clauses.
      </p>

      <h2>4. Your rights</h2>
      <p>
        You have the right to access, rectify, erase, restrict and port your data, to object to processing, and to withdraw consent at any time. Email{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>. We respond within one month. You may also lodge a complaint with the Dutch Data Protection
        Authority (Autoriteit Persoonsgegevens).
      </p>

      <h2>5. Cookies</h2>
      <p>Read more in our <Link to="/cookies">cookie policy</Link>.</p>

      <h2>6. Security</h2>
      <p>We protect data with encryption in transit, strict access rules, least-privilege admin access and regular reviews.</p>
    </LegalLayout>
  );
}
