'use client';

import { useState } from 'react';
import { api } from '@/lib/adminApi';
import { TOUR_CATEGORIES } from '@/lib/adminUi';

const lines = (text) =>
  text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

function toForm(tour) {
  return {
    title: tour?.title ?? '',
    slug: tour?.slug ?? '',
    destination: tour?.destination ?? '',
    category: tour?.category ?? TOUR_CATEGORIES[0],
    durationDays: tour?.durationDays ?? 3,
    summary: tour?.summary ?? '',
    description: tour?.description ?? '',
    heroUrl: tour?.heroImage?.url ?? '',
    heroAlt: tour?.heroImage?.alt ?? '',
    highlights: (tour?.highlights ?? []).join('\n'),
    inclusions: (tour?.inclusions ?? []).join('\n'),
    exclusions: (tour?.exclusions ?? []).join('\n'),
    itinerary: (tour?.itinerary ?? []).map((d) => ({ title: d.title, description: d.description ?? '' })),
    faqs: (tour?.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
    seoTitle: tour?.seo?.title ?? '',
    seoDescription: tour?.seo?.description ?? '',
    isPublished: tour?.isPublished ?? true,
    isFeatured: tour?.isFeatured ?? false,
    sortOrder: tour?.sortOrder ?? 0,
  };
}

export default function TourEditor({ tour, onSaved, onCancel }) {
  const [f, setF] = useState(() => toForm(tour));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const isNew = !tour;

  const set = (key) => (e) => setF((s) => ({ ...s, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const setItem = (list, index, key, value) =>
    setF((s) => ({ ...s, [list]: s[list].map((x, i) => (i === index ? { ...x, [key]: value } : x)) }));
  const addItem = (list, blank) => setF((s) => ({ ...s, [list]: [...s[list], blank] }));
  const removeItem = (list, index) => setF((s) => ({ ...s, [list]: s[list].filter((_, i) => i !== index) }));

  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);

    const payload = {
      title: f.title,
      destination: f.destination,
      category: f.category,
      durationDays: Number(f.durationDays),
      summary: f.summary,
      description: f.description,
      highlights: lines(f.highlights),
      inclusions: lines(f.inclusions),
      exclusions: lines(f.exclusions),
      itinerary: f.itinerary
        .filter((d) => d.title.trim())
        .map((d, i) => ({ day: i + 1, title: d.title.trim(), description: d.description.trim() })),
      faqs: f.faqs.filter((q) => q.question.trim() && q.answer.trim()),
      seo: {
        title: f.seoTitle.trim(),
        description: f.seoDescription.trim(),
        ...(tour?.seo?.ogImage ? { ogImage: tour.seo.ogImage } : {}),
      },
      isPublished: f.isPublished,
      isFeatured: f.isFeatured,
      sortOrder: Number(f.sortOrder) || 0,
    };
    if (f.slug.trim()) payload.slug = f.slug.trim();
    if (f.heroUrl.trim()) payload.heroImage = { url: f.heroUrl.trim(), alt: f.heroAlt.trim() };

    try {
      if (isNew) await api('/tours/admin', { method: 'POST', body: payload });
      else await api(`/tours/admin/${tour._id}`, { method: 'PUT', body: payload });
      onSaved();
    } catch (err) {
      setError(err.message);
      setBusy(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <form className="admin-card a-form" onSubmit={submit}>
      <div className="a-row a-row--between">
        <h2>{isNew ? 'New tour' : `Edit: ${tour.title}`}</h2>
        <button type="button" className="a-btn a-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && <div className="a-error">{error}</div>}

      <div className="a-grid">
        <label className="a-field a-span2">
          Title
          <input value={f.title} onChange={set('title')} required minLength={3} maxLength={150} />
        </label>
        <label className="a-field">
          Destination
          <input value={f.destination} onChange={set('destination')} required />
        </label>
        <label className="a-field">
          Type
          <select value={f.category} onChange={set('category')}>
            {TOUR_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="a-field">
          Days
          <input type="number" min={1} max={60} value={f.durationDays} onChange={set('durationDays')} required />
        </label>
        <label className="a-field">
          Page address {isNew ? '(optional)' : ''}
          <input value={f.slug} onChange={set('slug')} placeholder="made from the title if empty" pattern="[a-z0-9]+(-[a-z0-9]+)*" />
          <small>Lower case words joined by dashes. Changing it changes the page&apos;s web address.</small>
        </label>
      </div>

      <label className="a-field">
        Short summary (shown on cards and in Google)
        <textarea value={f.summary} onChange={set('summary')} required minLength={10} maxLength={300} rows={2} />
      </label>
      <label className="a-field">
        Overview
        <textarea value={f.description} onChange={set('description')} rows={5} maxLength={10000} />
      </label>

      <div className="a-grid">
        <label className="a-field">
          Main photo address
          <input value={f.heroUrl} onChange={set('heroUrl')} placeholder="/images/ladakh.webp or https://..." />
        </label>
        <label className="a-field">
          Photo description (for accessibility and Google)
          <input value={f.heroAlt} onChange={set('heroAlt')} maxLength={200} />
        </label>
      </div>

      <div className="a-grid a-grid--3">
        <label className="a-field">
          Highlights (one per line)
          <textarea value={f.highlights} onChange={set('highlights')} rows={5} />
        </label>
        <label className="a-field">
          Included (one per line)
          <textarea value={f.inclusions} onChange={set('inclusions')} rows={5} />
        </label>
        <label className="a-field">
          Not included (one per line)
          <textarea value={f.exclusions} onChange={set('exclusions')} rows={5} />
        </label>
      </div>

      <h3 className="a-sub">Day by day</h3>
      {f.itinerary.map((d, i) => (
        <div className="a-repeat" key={i}>
          <b>Day {i + 1}</b>
          <input value={d.title} onChange={(e) => setItem('itinerary', i, 'title', e.target.value)} placeholder="Title" aria-label={`Day ${i + 1} title`} />
          <textarea value={d.description} onChange={(e) => setItem('itinerary', i, 'description', e.target.value)} rows={3} placeholder="What happens this day" aria-label={`Day ${i + 1} details`} />
          <button type="button" className="a-link a-link--danger" onClick={() => removeItem('itinerary', i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="a-btn a-btn--ghost" onClick={() => addItem('itinerary', { title: '', description: '' })}>
        + Add a day
      </button>

      <h3 className="a-sub">Questions and answers (optional)</h3>
      {f.faqs.map((q, i) => (
        <div className="a-repeat" key={i}>
          <b>Q{i + 1}</b>
          <input value={q.question} onChange={(e) => setItem('faqs', i, 'question', e.target.value)} placeholder="Question" aria-label={`Question ${i + 1}`} />
          <textarea value={q.answer} onChange={(e) => setItem('faqs', i, 'answer', e.target.value)} rows={2} placeholder="Answer" aria-label={`Answer ${i + 1}`} />
          <button type="button" className="a-link a-link--danger" onClick={() => removeItem('faqs', i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="a-btn a-btn--ghost" onClick={() => addItem('faqs', { question: '', answer: '' })}>
        + Add a question
      </button>

      <h3 className="a-sub">Search engines (optional)</h3>
      <div className="a-grid">
        <label className="a-field">
          Page title
          <input value={f.seoTitle} onChange={set('seoTitle')} maxLength={70} placeholder="uses the tour title if empty" />
        </label>
        <label className="a-field">
          Page description
          <input value={f.seoDescription} onChange={set('seoDescription')} maxLength={170} placeholder="uses the summary if empty" />
        </label>
      </div>

      <div className="a-grid">
        <label className="a-check">
          <input type="checkbox" checked={f.isPublished} onChange={set('isPublished')} /> Published (visible on the website)
        </label>
        <label className="a-check">
          <input type="checkbox" checked={f.isFeatured} onChange={set('isFeatured')} /> Featured
        </label>
        <label className="a-field">
          Order on the website (smaller first)
          <input type="number" value={f.sortOrder} onChange={set('sortOrder')} />
        </label>
      </div>

      <div className="a-row">
        <button type="submit" className="a-btn" disabled={busy}>
          {busy ? 'Saving…' : isNew ? 'Create tour' : 'Save changes'}
        </button>
        <button type="button" className="a-btn a-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
