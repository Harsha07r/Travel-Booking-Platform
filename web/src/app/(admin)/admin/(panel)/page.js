'use client';

import { useCallback, useState } from 'react';
import { api } from '@/lib/adminApi';
import { BOOKING_STATUSES, formatDate, formatDateTime } from '@/lib/adminUi';
import { ContactLinks, Pager, StatusBadge, useDebounced, useRemote } from '@/components/admin/parts';

const STAT_ORDER = [
  ['pending', 'Pending'],
  ['contacted', 'Contacted'],
  ['confirmed', 'Confirmed'],
  ['rejected', 'Rejected'],
  ['cancelled', 'Cancelled'],
];

export default function EnquiriesPage() {
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const query = useDebounced(search);

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ page, limit: 20 });
    if (status) params.set('status', status);
    if (query) params.set('q', query);
    return api(`/bookings?${params}`);
  }, [page, status, query]);

  const { data, error, reload: load } = useRemote(fetcher);

  const stats = data?.stats;

  return (
    <>
      <h1 className="a-title">Enquiries</h1>

      {stats && (
        <div className="a-stats">
          {STAT_ORDER.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`a-stat${status === label ? ' is-active' : ''}`}
              onClick={() => {
                setStatus(status === label ? '' : label);
                setPage(1);
              }}
            >
              <b>{stats[key]}</b>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="a-toolbar">
        <input
          type="search"
          placeholder="Search name, email, phone or tour"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          aria-label="Search enquiries"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && <div className="a-error">{error}</div>}
      {!data && !error && <p className="a-muted">Loading enquiries&hellip;</p>}
      {data && data.bookings.length === 0 && <p className="a-empty">No enquiries match.</p>}

      <div className="a-list">
        {data?.bookings.map((b) => (
          <EnquiryCard
            key={b._id}
            booking={b}
            open={openId === b._id}
            onToggle={() => setOpenId(openId === b._id ? null : b._id)}
            onChanged={load}
          />
        ))}
      </div>

      <Pager pagination={data?.pagination} onPage={setPage} />
    </>
  );
}

function EnquiryCard({ booking: b, open, onToggle, onChanged }) {
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  async function run(action) {
    setBusy(true);
    setError('');
    try {
      await action();
      await onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const setStatus = (status) => run(() => api(`/bookings/${b._id}`, { method: 'PATCH', body: { status } }));
  const addNote = (event) => {
    event.preventDefault();
    if (!note.trim()) return;
    run(async () => {
      await api(`/bookings/${b._id}/notes`, { method: 'POST', body: { text: note } });
      setNote('');
    });
  };

  return (
    <article className={`a-item${open ? ' is-open' : ''}`}>
      <div className="a-item__head" onClick={onToggle}>
        <div className="a-item__main">
          <strong>{b.fullName}</strong>
          <span>{b.tourName}</span>
        </div>
        <div className="a-item__meta">
          <span>Travel {formatDate(b.travelDate)}</span>
          <span>{b.numberOfPeople} traveller{b.numberOfPeople === 1 ? '' : 's'}</span>
          <span className="a-muted">Sent {formatDateTime(b.createdAt)}</span>
        </div>
        <StatusBadge value={b.status} />
      </div>

      <div className="a-item__actions">
        <ContactLinks
          phone={b.phone}
          email={b.email}
          waText={`Hello ${b.fullName}, this is Royal Horizon about your enquiry for ${b.tourName}.`}
        />
        <button type="button" className="a-link" onClick={onToggle}>
          {open ? 'Hide details' : 'Details'}
        </button>
      </div>

      {open && (
        <div className="a-item__body">
          {error && <div className="a-error">{error}</div>}
          <dl className="a-dl">
            <div><dt>Email</dt><dd>{b.email}</dd></div>
            <div><dt>Phone</dt><dd>{b.phone || '-'}</dd></div>
            <div><dt>Tour</dt><dd>{b.tourName}</dd></div>
            <div><dt>Requirements</dt><dd>{b.otherRequirements || '-'}</dd></div>
            {b.contactedAt && <div><dt>First contacted</dt><dd>{formatDateTime(b.contactedAt)}</dd></div>}
          </dl>

          <label className="a-field a-field--inline">
            Status
            <select value={b.status} disabled={busy} onChange={(e) => setStatus(e.target.value)}>
              {BOOKING_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <p className="a-hint">Customers are emailed automatically when you choose Confirmed, Rejected or Cancelled.</p>

          <h3 className="a-sub">Notes</h3>
          {b.notes?.length ? (
            <ul className="a-notes">
              {b.notes.map((n, i) => (
                <li key={i}>
                  <span>{n.text}</span>
                  <small>
                    {n.by} &middot; {formatDateTime(n.at)}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="a-muted">No notes yet.</p>
          )}
          <form className="a-row" onSubmit={addNote}>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note, for example: called, wants late May"
              maxLength={1000}
              aria-label="New note"
            />
            <button type="submit" className="a-btn" disabled={busy || !note.trim()}>
              Add note
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
