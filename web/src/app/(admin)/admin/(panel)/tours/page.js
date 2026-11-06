'use client';

import { useCallback, useState } from 'react';
import { api } from '@/lib/adminApi';
import { canManageTours } from '@/lib/adminUi';
import { useAdmin } from '@/components/admin/AdminShell';
import { useRemote } from '@/components/admin/parts';
import TourEditor from '@/components/admin/TourEditor';

export default function ToursPage() {
  const { admin } = useAdmin();
  const allowed = canManageTours(admin.role);
  const [actionError, setActionError] = useState('');
  const [editing, setEditing] = useState(null); // null = list, { tour } = editor (tour null for new)

  const fetcher = useCallback(() => (allowed ? api('/tours/admin') : Promise.resolve(null)), [allowed]);
  const { data, error: loadError, reload } = useRemote(fetcher);
  const tours = data?.tours;
  const error = actionError || loadError;

  if (!allowed) return <p className="a-error">Your role does not include editing tours.</p>;

  async function edit(id) {
    setActionError('');
    try {
      const { tour } = await api(`/tours/admin/${id}`);
      setEditing({ tour });
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function toggle(tour, key) {
    setActionError('');
    try {
      await api(`/tours/admin/${tour._id}`, { method: 'PUT', body: { [key]: !tour[key] } });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function remove(tour) {
    if (!window.confirm(`Delete "${tour.title}" permanently? Hide it instead if you may want it back.`)) return;
    setActionError('');
    try {
      await api(`/tours/admin/${tour._id}`, { method: 'DELETE' });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (editing) {
    return (
      <TourEditor
        tour={editing.tour}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          reload();
        }}
      />
    );
  }

  return (
    <>
      <div className="a-row a-row--between">
        <h1 className="a-title">Tours</h1>
        <button type="button" className="a-btn" onClick={() => setEditing({ tour: null })}>
          + New tour
        </button>
      </div>
      <p className="a-hint">Changes can take up to an hour to appear on the public website.</p>

      {error && <div className="a-error">{error}</div>}
      {!tours && !error && <p className="a-muted">Loading tours&hellip;</p>}

      <div className="a-list">
        {tours?.map((t) => (
          <article className="a-item" key={t._id}>
            <div className="a-item__head">
              <div className="a-item__main">
                <strong>{t.title}</strong>
                <span>
                  {t.destination} &middot; {t.category} &middot; {t.durationDays} days
                </span>
              </div>
              <span />
              <span className={`a-badge a-badge--${t.isPublished ? 'confirmed' : 'cancelled'}`}>
                {t.isPublished ? 'Published' : 'Hidden'}
              </span>
            </div>
            <div className="a-item__actions">
              <span className="a-contact">
                <button type="button" className="a-chip" onClick={() => edit(t._id)}>
                  Edit
                </button>
                <button type="button" className="a-chip" onClick={() => toggle(t, 'isPublished')}>
                  {t.isPublished ? 'Hide' : 'Publish'}
                </button>
                <button type="button" className="a-chip" onClick={() => toggle(t, 'isFeatured')}>
                  {t.isFeatured ? 'Unfeature' : 'Feature'}
                </button>
                <a className="a-chip" href={`/tours/${t.slug}`} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </span>
              <button type="button" className="a-link a-link--danger" onClick={() => remove(t)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
