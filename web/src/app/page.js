import Image from 'next/image';
import Link from 'next/link';
import TourCard from '@/components/TourCard';
import EnquiryForm from '@/components/EnquiryForm';
import { getTours } from '@/lib/tours';
import { DESTINATIONS, OFFERINGS, REVIEWS, SITE } from '@/lib/site';

export const metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const tours = await getTours();

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image
            src="/images/kashmir.webp"
            alt="Snow-capped mountains above a green valley in Kashmir"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container">
          <div className="hero__content">
            <span className="eyebrow">Welcome to {SITE.name}</span>
            <h1>Experience the Serenity</h1>
            <p className="lead">{SITE.tagline}. Comfortable stays, private vehicles and a team that is with you throughout.</p>
            <div className="hero__actions">
              <Link href="/tours" className="btn">
                Explore tours
              </Link>
              <Link href="#enquire" className="btn btn--ghost">
                Plan my trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark" aria-labelledby="offer-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we offer</span>
            <h2 id="offer-title">Journeys, thoughtfully arranged</h2>
            <span className="rule" />
          </div>
          <div className="offer-grid">
            {OFFERINGS.map((o, i) => (
              <div className="offer" key={o.title}>
                <span className="offer__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="packages" aria-labelledby="tours-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Tour packages</span>
            <h2 id="tours-title">Popular journeys</h2>
            <span className="rule" />
            <p>From the houseboats of Dal Lake to the high passes of Ladakh.</p>
          </div>
          <div className="tour-grid">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" id="destinations" aria-labelledby="dest-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Destinations</span>
            <h2 id="dest-title">Where we take you</h2>
            <span className="rule" />
          </div>
          <div className="dest-grid">
            {DESTINATIONS.map((d) => (
              <div className="dest" key={d.name}>
                <Image src={d.image} alt={d.name} fill sizes="(max-width: 700px) 100vw, 360px" style={{ objectFit: 'cover' }} />
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="reviews" aria-labelledby="reviews-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Guest stories</span>
            <h2 id="reviews-title">What our travellers say</h2>
            <span className="rule" />
          </div>
          <div className="review-grid">
            {REVIEWS.map((r) => (
              <figure className="review" key={r.name}>
                <div className="review__stars" aria-label={`${r.stars} out of 5 stars`}>
                  {'★'.repeat(r.stars)}
                  {'☆'.repeat(5 - r.stars)}
                </div>
                <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  {r.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" id="enquire" aria-labelledby="enquire-title">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">Plan your journey</span>
            <h2 id="enquire-title">Tell us where you want to go</h2>
            <span className="rule" />
            <p>
              Share your dates and a few details. Our team will call or message you to design the trip around you.
              There is nothing to pay to enquire.
            </p>
          </div>
          <EnquiryForm tours={tours.map(({ slug, title }) => ({ slug, title }))} id="home-enquiry" />
        </div>
      </section>
    </>
  );
}
