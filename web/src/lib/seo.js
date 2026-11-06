import { SITE } from '@/lib/site';

// Builds the title, description, canonical and social-preview tags for a page.
// `title` is the page title without the site name (the layout template adds it).
export function pageMeta({ title, description, path, image }) {
  const full = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName: SITE.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: image || '/images/kashmir.webp' }],
    },
  };
}

export const absoluteUrl = (path = '/') => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
