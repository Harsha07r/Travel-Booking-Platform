import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This path leads nowhere</h1>
        <span className="rule" style={{ marginInline: 'auto' }} />
        <p>The page you are looking for has moved or does not exist.</p>
        <Link href="/tours" className="btn">
          Browse our tours
        </Link>
      </div>
    </section>
  );
}
