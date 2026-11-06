'use client';

import { useCallback, useState } from 'react';
import { api } from '@/lib/adminApi';
import { ROLES, canManageStaff, formatDateTime } from '@/lib/adminUi';
import { useAdmin } from '@/components/admin/AdminShell';
import { useRemote } from '@/components/admin/parts';

export default function StaffPage() {
  const { admin } = useAdmin();
  const allowed = canManageStaff(admin.role);
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const fetcher = useCallback(() => (allowed ? api('/admin/staff') : Promise.resolve(null)), [allowed]);
  const { data, error: loadError, reload } = useRemote(fetcher);
  const staff = data?.staff;
  const error = actionError || loadError;

  if (!allowed) return <p className="a-error">Only a super admin can manage staff.</p>;

  async function create(event) {
    event.preventDefault();
    setActionError('');
    setNotice('');
    setBusy(true);
    const form = event.currentTarget;
    const values = new FormData(form);
    try {
      await api('/admin/staff', {
        method: 'POST',
        body: {
          username: values.get('username'),
          email: values.get('email'),
          password: values.get('password'),
          role: values.get('role'),
        },
      });
      form.reset();
      setNotice('Staff member created. Share the password with them privately and ask them to change it.');
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function update(id, body) {
    setActionError('');
    setNotice('');
    try {
      await api(`/admin/staff/${id}`, { method: 'PATCH', body });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  }

  return (
    <>
      <h1 className="a-title">Staff</h1>
      <p className="a-hint">
        Staff sign in at the same address. Role changes and disabling an account sign that person out straight away.
      </p>

      {error && <div className="a-error">{error}</div>}
      {notice && <div className="a-ok">{notice}</div>}

      <div className="a-list">
        {staff?.map((s) => {
          const self = s.id === admin.id;
          return (
            <article className="a-item" key={s.id}>
              <div className="a-item__head">
                <div className="a-item__main">
                  <strong>
                    {s.username}
                    {self ? ' (you)' : ''}
                  </strong>
                  <span>{s.email}</span>
                </div>
                <div className="a-item__meta">
                  <span className="a-muted">Last sign in {s.lastLoginAt ? formatDateTime(s.lastLoginAt) : 'never'}</span>
                </div>
                <span className={`a-badge a-badge--${s.isActive ? 'confirmed' : 'cancelled'}`}>
                  {s.isActive ? 'Active' : 'Disabled'}
                </span>
              </div>
              <div className="a-item__actions">
                <label className="a-field a-field--inline">
                  Role
                  <select value={s.role} onChange={(e) => update(s.id, { role: e.target.value })}>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" className="a-link" onClick={() => update(s.id, { isActive: !s.isActive })}>
                  {s.isActive ? 'Disable account' : 'Enable account'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <form className="admin-card a-form" onSubmit={create}>
        <h2>Add a staff member</h2>
        <div className="a-grid">
          <label className="a-field">
            Username
            <input name="username" required minLength={3} maxLength={40} pattern="[A-Za-z0-9._\-]+" />
          </label>
          <label className="a-field">
            Email
            <input name="email" type="email" required />
          </label>
          <label className="a-field">
            Temporary password
            <input name="password" type="text" required minLength={10} autoComplete="off" />
            <small>At least 10 characters with upper case, lower case and a number.</small>
          </label>
          <label className="a-field">
            Role
            <select name="role" defaultValue="support">
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="a-btn" disabled={busy}>
          {busy ? 'Creating…' : 'Create staff member'}
        </button>
      </form>
    </>
  );
}
