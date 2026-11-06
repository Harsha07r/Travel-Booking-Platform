import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Kashmir, Ladakh & Himalayan Tours`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_IN',
    images: [{ url: '/images/kashmir.webp' }],
  },
};

export const viewport = {
  themeColor: '#0b1426',
};

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

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
