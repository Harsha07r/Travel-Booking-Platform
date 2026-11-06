import { getTours } from '@/lib/tours';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap() {
  const tours = await getTours();

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/tours'), changeFrequency: 'monthly', priority: 0.9 },
    ...tours.map((t) => ({
      url: absoluteUrl(`/tours/${t.slug}`),
      lastModified: t.updatedAt ? new Date(t.updatedAt) : undefined,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.5 },
  ];
}
