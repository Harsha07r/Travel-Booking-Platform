'use client';

import { useEffect, useRef, useState } from 'react';
import { API_URL, telHref, waHref, SITE } from '@/lib/site';

const NETWORK_ERROR =
  'We could not reach our server. Please message us on WhatsApp or call, and we will help right away.';

/**
 * Short "plan my trip" form. The team follows up by phone or WhatsApp, so there is no
 * pricing, payment or account step.
 *
 *  - fixedTour: { slug, title }  tour pages (tour is already known)
 *  - tours: [{ slug, title }]    home page (visitor picks a tour or "not sure yet")
 */
export default function EnquiryForm({ tours = [], fixedTour = null, sticky = false, id }) {
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const [sentTour, setSentTour] = useState('');
  const dateRef = useRef(null);

  // Earliest selectable date = today. Set after mount so server and browser HTML match.
  useEffect(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    if (dateRef.current) dateRef.current.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setStatus('sending');

    const form = new FormData(event.currentTarget);
    const chosen = fixedTour ?? tours.find((t) => t.slug === form.get('tour'));

    const payload = {
      tourId: chosen?.slug ?? 'general',
      tourName: chosen?.title ?? 'General enquiry',
      fullName: form.get('fullName'),
      email: form.get('email'),
      phone: form.get('phone'),
      travelDate: form.get('travelDate'),
      numberOfPeople: Number(form.get('numberOfPeople')) || 1,
      otherRequirements: form.get('message') || undefined,
      website: form.get('website'), // honeypot: real visitors leave this empty
    };

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data.details?.map((d) => d.message).join('. ');
        throw new Error(detail || data.message || 'Something went wrong. Please try again.');
      }
      setSentTour(payload.tourName);
      setStatus('done');
    } catch (err) {
      setError(err instanceof TypeError ? NETWORK_ERROR : err.message);
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div className={`enquiry${sticky ? ' enquiry--sticky' : ''}`} id={id} role="status">
        <div className="form-success">
          <h3>Thank you, we have your enquiry</h3>
          <p>
            Our team will call or message you shortly to plan{' '}
            {sentTour && sentTour !== 'General enquiry' ? <strong>{sentTour}</strong> : 'your trip'}.
          </p>
          <a
            className="btn btn--outline btn--block"
            href={waHref(`Hello Royal Horizon, I just sent an enquiry${sentTour ? ` for ${sentTour}` : ''}.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={`enquiry${sticky ? ' enquiry--sticky' : ''}`} id={id} onSubmit={onSubmit}>
      <h3>{fixedTour ? 'Plan this journey' : 'Plan your journey'}</h3>
      <p className="enquiry__sub">
        Tell us a little and our team will contact you directly. No payment needed.
      </p>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      {/* honeypot */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!fixedTour && tours.length > 0 && (
        <div className="field">
          <label htmlFor={`${id || 'enq'}-tour`}>Tour</label>
          <select id={`${id || 'enq'}-tour`} name="tour" defaultValue="">
            <option value="">Not sure yet, help me choose</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor={`${id || 'enq'}-name`}>Full name</label>
        <input id={`${id || 'enq'}-name`} name="fullName" required minLength={2} maxLength={100} autoComplete="name" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${id || 'enq'}-phone`}>Phone / WhatsApp</label>
          <input id={`${id || 'enq'}-phone`} name="phone" type="tel" required maxLength={20} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor={`${id || 'enq'}-email`}>Email</label>
          <input id={`${id || 'enq'}-email`} name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${id || 'enq'}-date`}>Travel date</label>
          <input id={`${id || 'enq'}-date`} name="travelDate" type="date" required ref={dateRef} />
        </div>
        <div className="field">
          <label htmlFor={`${id || 'enq'}-people`}>Travellers</label>
          <input id={`${id || 'enq'}-people`} name="numberOfPeople" type="number" min={1} max={50} defaultValue={2} required />
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${id || 'enq'}-msg`}>Anything we should know? (optional)</label>
        <textarea id={`${id || 'enq'}-msg`} name="message" maxLength={1000} />
      </div>

      <button className="btn btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>

      <div className="contact-actions">
        <a className="btn btn--outline" href={waHref(fixedTour ? `Hello Royal Horizon, I am interested in ${fixedTour.title}.` : undefined)} target="_blank" rel="noopener noreferrer">
          WhatsApp us
        </a>
        <a className="btn btn--outline" href={telHref(SITE.phones[0])}>
          Call {SITE.phones[0]}
        </a>
      </div>
    </form>
  );
}
