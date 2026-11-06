import ContactForm from '@/components/ContactForm';
import { SITE, telHref, waHref } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact Us',
  description: 'Call, WhatsApp or write to Royal Horizon to plan your Kashmir, Ladakh or pilgrimage trip.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let&rsquo;s plan your trip</h1>
          <span className="rule" />
          <p>Reach us the way that suits you. We reply the same day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div>
            <h2>Talk to our team</h2>
            <ul className="contact-list">
              {SITE.phones.map((p) => (
                <li key={p}>
                  <small>Phone</small>
                  <a href={telHref(p)}>{p}</a>
                </li>
              ))}
              <li>
                <small>WhatsApp</small>
                <a href={waHref()} target="_blank" rel="noopener noreferrer">
                  Message us
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
