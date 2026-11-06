'use client';

import { useState } from 'react';
import { api } from '@/lib/adminApi';

export default function PasswordDialog({ onClose }) {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      await api('/admin/password', {
        method: 'POST',
        body: { currentPassword: form.get('currentPassword'), newPassword: form.get('newPassword') },
      });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-modal" role="dialog" aria-modal="true" aria-label="Change password">
      <form className="admin-card admin-modal__box" onSubmit={submit}>
        <h2>Change password</h2>
        {done ? (
          <>
            <p>Your password was updated. Other devices have been signed out.</p>
            <button type="button" className="a-btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            {error && <div className="a-error">{error}</div>}
            <label className="a-field">
              Current password
              <input name="currentPassword" type="password" required autoComplete="current-password" />
            </label>
            <label className="a-field">
              New password
              <input name="newPassword" type="password" required minLength={10} autoComplete="new-password" />
              <small>At least 10 characters with upper case, lower case and a number.</small>
            </label>
            <div className="a-row">
              <button type="submit" className="a-btn" disabled={busy}>
                {busy ? 'Saving…' : 'Update password'}
              </button>
              <button type="button" className="a-btn a-btn--ghost" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
