'use client';

import { useState } from 'react';
import TourCard from '@/components/TourCard';

export default function TourGrid({ tours }) {
  const categories = [...new Set(tours.map((t) => t.category))];
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? tours : tours.filter((t) => t.category === active);

  return (
    <>
      {categories.length > 1 && (
        <div className="filters" role="group" aria-label="Filter tours by type">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="tour-grid">
        {visible.map((t) => (
          <TourCard key={t.slug} tour={t} />
        ))}
      </div>
    </>
  );
}
