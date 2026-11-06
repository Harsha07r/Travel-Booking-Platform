import Link from 'next/link';
import { SITE, telHref, waHref } from '@/lib/site';
import { getTours } from '@/lib/tours';

export default async function Footer() {
  const tours = await getTours();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link href="/" className="brand">
              Royal <span>Horizon</span>
            </Link>
            <p style={{ marginTop: '1rem', maxWidth: 360 }}>{SITE.tagline}.</p>
          </div>

          <div>
            <h4>Popular tours</h4>
            <ul>
              {tours.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link href={`/tours/${t.slug}`}>{t.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Talk to us</h4>
            <ul>
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)}>{p}</a>
                </li>
              ))}
              <li>
                <a href={waHref()} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <Link href="/contact">Send an enquiry</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">&copy; Royal Horizon. All rights reserved.</div>
      </div>
    </footer>
  );
}
