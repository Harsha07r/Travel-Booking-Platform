'use client';

import { useCallback, useState } from 'react';
import { api } from '@/lib/adminApi';
import { CONTACT_STATUSES, formatDateTime } from '@/lib/adminUi';
import { ContactLinks, Pager, StatusBadge, useRemote } from '@/components/admin/parts';

export default function MessagesPage() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState('');

  const fetcher = useCallback(() => {
    const params = new URLSearchParams({ page, limit: 20 });
    if (status) params.set('status', status);
    return api(`/contact?${params}`);
  }, [page, status]);

  const { data, error: loadError, reload } = useRemote(fetcher);
  const error = actionError || loadError;

  async function update(id, next) {
    setActionError('');
    try {
      await api(`/contact/${id}`, { method: 'PATCH', body: { status: next } });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  }

  return (
    <>
      <h1 className="a-title">Messages</h1>
      <div className="a-toolbar">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by status"
        >
          <option value="">All messages</option>
          {CONTACT_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && <div className="a-error">{error}</div>}
      {!data && !error && <p className="a-muted">Loading messages&hellip;</p>}
      {data && data.contacts.length === 0 && <p className="a-empty">No messages.</p>}

      <div className="a-list">
        {data?.contacts.map((c) => (
          <article className="a-item is-open" key={c._id}>
            <div className="a-item__head">
              <div className="a-item__main">
                <strong>{c.name}</strong>
                <span>{c.email}{c.phone ? ` · ${c.phone}` : ''}</span>
              </div>
              <div className="a-item__meta">
                <span className="a-muted">{formatDateTime(c.createdAt || c.date)}</span>
              </div>
              <StatusBadge value={c.status || 'New'} />
            </div>
            <div className="a-item__body">
              <p className="a-message">{c.message}</p>
              <div className="a-row a-row--between">
                <ContactLinks phone={c.phone} email={c.email} waText={`Hello ${c.name}, this is Royal Horizon.`} />
                <label className="a-field a-field--inline">
                  Status
                  <select value={c.status || 'New'} onChange={(e) => update(c._id, e.target.value)}>
                    {CONTACT_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pager pagination={data?.pagination} onPage={setPage} />
    </>
  );
}
