'use client';

import { useState } from 'react';
import { API_URL } from '@/lib/site';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setStatus('sending');
    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone') || undefined,
          message: form.get('message'),
          website: form.get('website'),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.details?.map((d) => d.message).join('. ') || data.message || 'Something went wrong.');
      }
      setStatus('done');
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'We could not reach our server. Please message us on WhatsApp or call.'
          : err.message
      );
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div className="enquiry" role="status">
        <div className="form-success">
          <h3>Message sent</h3>
          <p>Thank you. We will get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="enquiry" onSubmit={onSubmit}>
      <h3>Send us a message</h3>
      <p className="enquiry__sub">We usually reply the same day.</p>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" required minLength={2} maxLength={100} autoComplete="name" />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone (optional)</label>
          <input id="c-phone" name="phone" type="tel" maxLength={20} autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" required minLength={5} maxLength={2000} />
      </div>

      <button className="btn btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
