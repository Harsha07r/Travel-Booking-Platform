import TourGrid from '@/components/TourGrid';
import { getTours } from '@/lib/tours';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Kashmir, Ladakh & Pilgrimage Tour Packages',
  description:
    'Browse Royal Horizon tour packages: Kashmir houseboat and honeymoon trips, Ladakh adventures and Katra-Shivkhori pilgrimage journeys.',
  path: '/tours',
});

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Tour packages</span>
          <h1>Our journeys</h1>
          <span className="rule" />
          <p>Every trip is arranged by our team and can be adjusted to your dates and pace.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <TourGrid tours={tours} />
        </div>
      </section>
    </>
  );
}
