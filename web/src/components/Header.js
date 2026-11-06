'use client';

import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { href: '/tours', label: 'Tours' },
  { href: '/#destinations', label: 'Destinations' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand" onClick={close} aria-label="Royal Horizon home">
          Royal <span>Horizon</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav id="main-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link href="/#enquire" className="btn" onClick={close}>
            Plan my trip
          </Link>
        </nav>
      </div>
    </header>
  );
}
