import Link from 'next/link';
import TourImage from '@/components/TourImage';
import { formatDuration } from '@/lib/format';

export default function TourCard({ tour }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="tour-card">
      <div className="tour-card__media">
        <TourImage
          image={tour.heroImage}
          fallbackAlt={tour.title}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
        />
        <span className="tour-card__badge">{tour.category}</span>
      </div>
      <div className="tour-card__body">
        <div className="tour-card__meta">
          {tour.destination} &middot; {formatDuration(tour.durationDays)}
        </div>
        <h3>{tour.title}</h3>
        <p>{tour.summary}</p>
        <span className="tour-card__cta">View journey</span>
      </div>
    </Link>
  );
}
