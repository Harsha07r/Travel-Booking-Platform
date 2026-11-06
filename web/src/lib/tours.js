import { cacheLife } from 'next/cache';
import { API_URL } from '@/lib/site';
import fallback from '@/data/tours.json';

// Tours come from the API. If the API is asleep or down (the free Render plan sleeps),
// the bundled copy in src/data/tours.json keeps the site fully working.

const published = () =>
  fallback.filter((t) => t.isPublished).sort((a, b) => a.sortOrder - b.sortOrder);

const toCard = ({ slug, title, destination, category, durationDays, summary, heroImage, isFeatured }) => ({
  slug,
  title,
  destination,
  category,
  durationDays,
  summary,
  heroImage,
  isFeatured,
});

async function api(path) {
  const res = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(15000) });
  if (res.status === 404) {
    // Only the new API's explicit JSON "Tour not found" means the tour was removed.
    // Any other 404 (for example an older backend without /api/tours) means "API
    // unavailable", so the caller falls back to the bundled tours.
    const body = await res.json().catch(() => null);
    if (body?.message === 'Tour not found') return null;
    throw new Error('Tours API route unavailable');
  }
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export async function getTours() {
  'use cache';
  cacheLife('hours');
  try {
    const data = await api('/api/tours?limit=50');
    if (data?.tours?.length) return data.tours;
  } catch {
    // fall through to the bundled copy
  }
  return published().map(toCard);
}

export async function getTour(slug) {
  'use cache';
  cacheLife('hours');
  try {
    const data = await api(`/api/tours/${encodeURIComponent(slug)}`);
    // 404 from a healthy API means "unpublished or removed": do not resurrect it.
    return data ? data.tour : null;
  } catch {
    return published().find((t) => t.slug === slug) ?? null;
  }
}

export async function getSlugs() {
  const tours = await getTours();
  return tours.map((t) => t.slug);
}
