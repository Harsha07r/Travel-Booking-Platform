import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
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

// Only fonts, global CSS and metadata live here. The public header/footer are in the
// (site) group and the admin panel has its own shell in the (admin) group.
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
