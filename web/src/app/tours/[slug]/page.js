import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnquiryForm from '@/components/EnquiryForm';
import JsonLd from '@/components/JsonLd';
import TourImage from '@/components/TourImage';
import { getSlugs, getTour } from '@/lib/tours';
import { formatDuration } from '@/lib/format';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return { title: 'Tour not found', robots: { index: false } };

  return pageMeta({
    title: tour.seo?.title || `${tour.title}: ${formatDuration(tour.durationDays)} in ${tour.destination}`,
    description: tour.seo?.description || tour.summary,
    path: `/tours/${tour.slug}`,
    image: tour.seo?.ogImage || tour.heroImage?.url,
  });
}

export default async function TourPage({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) notFound();

  const url = absoluteUrl(`/tours/${tour.slug}`);
  const paragraphs = (tour.description || tour.summary).split(/\n{2,}/).filter(Boolean);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.summary,
      url,
      image: tour.heroImage?.url ? absoluteUrl(tour.heroImage.url) : undefined,
      provider: { '@type': 'TravelAgency', name: SITE.name, url: SITE.url },
      itinerary: {
        '@type': 'ItemList',
        itemListElement: tour.itinerary.map((d) => ({
          '@type': 'ListItem',
          position: d.day,
          name: `Day ${d.day}: ${d.title}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Tours', item: absoluteUrl('/tours') },
        { '@type': 'ListItem', position: 3, name: tour.title, item: url },
      ],
    },
  ];

  return (
    <>
      <section className="tour-hero">
        <div className="tour-hero__media">
          <TourImage image={tour.heroImage} fallbackAlt={tour.title} sizes="100vw" priority />
        </div>
        <div className="container tour-hero__content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/tours">Tours</Link> / {tour.title}
          </nav>
          <h1>{tour.title}</h1>
          <div className="tour-facts">
            <span>{formatDuration(tour.durationDays)}</span>
            <span>{tour.destination}</span>
            <span>{tour.category}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container tour-layout">
          <article className="tour-main">
            <h2>Overview</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {tour.highlights?.length > 0 && (
              <>
                <h2>Highlights</h2>
                <ul className="highlights">
                  {tour.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </>
            )}

            {tour.itinerary?.length > 0 && (
              <>
                <h2>Day by day</h2>
                <ol className="itinerary">
                  {tour.itinerary.map((d) => (
                    <li key={d.day}>
                      <div className="itinerary__day">
                        <small>Day</small>
                        <b>{d.day}</b>
                      </div>
                      <div>
                        <h3>{d.title}</h3>
                        {d.description && <p>{d.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {(tour.inclusions?.length > 0 || tour.exclusions?.length > 0) && (
              <div className="two-col-list">
                {tour.inclusions?.length > 0 && (
                  <div>
                    <h2>Included</h2>
                    <ul>
                      {tour.inclusions.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.exclusions?.length > 0 && (
                  <div>
                    <h2>Not included</h2>
                    <ul>
                      {tour.exclusions.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {tour.faqs?.length > 0 && (
              <>
                <h2>Questions</h2>
                <div className="faq">
                  {tour.faqs.map((f) => (
                    <details key={f.question}>
                      <summary>{f.question}</summary>
                      <p>{f.answer}</p>
                    </details>
                  ))}
                </div>
              </>
            )}
          </article>

          <aside>
            <EnquiryForm fixedTour={{ slug: tour.slug, title: tour.title }} sticky id="tour-enquiry" />
          </aside>
        </div>
      </section>

      {structuredData.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
    </>
  );
}
