'use client';

import { useCallback, useEffect, useState } from 'react';
import { telHref, whatsappHref } from '@/lib/adminUi';

export function StatusBadge({ value }) {
  return <span className={`a-badge a-badge--${String(value).toLowerCase()}`}>{value}</span>;
}

export function Pager({ pagination, onPage }) {
  if (!pagination || pagination.pages <= 1) return null;
  return (
    <div className="a-pager">
      <button type="button" className="a-btn a-btn--ghost" disabled={pagination.page <= 1} onClick={() => onPage(pagination.page - 1)}>
        Previous
      </button>
      <span>
        Page {pagination.page} of {pagination.pages} &middot; {pagination.total} total
      </span>
      <button
        type="button"
        className="a-btn a-btn--ghost"
        disabled={pagination.page >= pagination.pages}
        onClick={() => onPage(pagination.page + 1)}
      >
        Next
      </button>
    </div>
  );
}

/**
 * Loads data with `fetcher` (wrap it in useCallback so it only changes with its inputs) and
 * reloads whenever it changes or reload() is called. State is only set inside promise
 * callbacks, never synchronously in the effect.
 */
export function useRemote(fetcher) {
  const [state, setState] = useState({ data: null, error: '' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((data) => !cancelled && setState({ data, error: '' }))
      .catch((err) => !cancelled && setState((s) => ({ ...s, error: err.message })));
    return () => {
      cancelled = true;
    };
  }, [fetcher, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, reload };
}

// Waits until the user stops typing before returning the new value.
export function useDebounced(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function ContactLinks({ phone, email, waText }) {
  const wa = whatsappHref(phone, waText);
  return (
    <span className="a-contact">
      {phone && (
        <a className="a-chip a-chip--call" href={telHref(phone)}>
          Call
        </a>
      )}
      {wa && (
        <a className="a-chip a-chip--wa" href={wa} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      )}
      {email && (
        <a className="a-chip" href={`mailto:${email}`}>
          Email
        </a>
      )}
    </span>
  );
}
