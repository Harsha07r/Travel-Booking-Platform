'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/adminApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Already signed in? Go straight to the dashboard.
  useEffect(() => {
    api('/admin/me')
      .then(() => router.replace('/admin'))
      .catch(() => {});
  }, [router]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      await api('/admin/login', {
        method: 'POST',
        body: { email: form.get('email'), password: form.get('password') },
      });
      router.replace('/admin');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-card admin-login__box" onSubmit={submit}>
        <span className="admin-brand admin-brand--lg">
          Royal <b>Horizon</b>
        </span>
        <h1>Admin sign in</h1>
        {error && (
          <div className="a-error" role="alert">
            {error}
          </div>
        )}
        <label className="a-field">
          Email
          <input name="email" type="email" required autoComplete="email" autoFocus />
        </label>
        <label className="a-field">
          Password
          <input name="password" type="password" required autoComplete="current-password" />
        </label>
        <button type="submit" className="a-btn a-btn--block" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="admin-login__note">The first sign in after a quiet period can take up to a minute.</p>
      </form>
    </div>
  );
}
