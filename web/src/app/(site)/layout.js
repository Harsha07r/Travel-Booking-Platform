import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  image: absoluteUrl('/images/kashmir.webp'),
  telephone: SITE.phones[0],
  areaServed: ['Kashmir', 'Ladakh', 'Jammu'],
};

export default function SiteLayout({ children }) {
  return (
    <>
      <a href="#main" className="sr-only">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
      <JsonLd data={organization} />
    </>
  );
}
