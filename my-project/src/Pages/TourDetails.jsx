import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TourPage from './TourPage';

const tourData = {
  image: '/images/srinagar.webp',
  duration: '5 Night 6 Days',
  location: 'Srinagar',
  title: '5N-6D Kashmir Package',
  overview:
    'Kashmir holiday tour is incomplete without a houseboat stay in Srinagar Dal Lake. Enjoy and experience a unique stay at the finest houseboats on the popular Dal and Nigeen Lake.',
  itinerary: [
    { day: 'Day 1: Arrival in Srinagar', desc: 'Arrival in Srinagar. Transfer to houseboat and enjoy Shikara ride.' },
    { day: 'Day 2: Srinagar - Sonamarg', desc: 'Full day trip to Sonamarg – The Meadow of Gold.' },
    { day: 'Day 3: Srinagar - Pahalgam', desc: 'Visit Awantipura ruins, saffron fields. Overnight in Pahalgam.' },
    { day: 'Day 4: Pahalgam - Srinagar', desc: 'Mughal Gardens sightseeing.' },
    { day: 'Day 5: Srinagar - Gulmarg', desc: 'Gondola ride & sightseeing.' },
    { day: 'Day 6: Departure', desc: 'Transfer to airport.' },
  ],
};

const TourDetails = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <TourPage {...tourData}>
   <Container id="booking-section" className="mb-5 text-center">
  <div
    className="booking-cta p-4 p-md-5 rounded-4 shadow-lg"
    style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #b6dbff 100%)',
      border: '2px solid #4682B4',
      position: 'relative',
    }}
  >
    {/* Heading */}
    <h2
      className="mb-3"
      style={{
        background: 'linear-gradient(135deg, #0A2A4A, #4682B4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 900,
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
      }}
    >
      Ready to Book Your Adventure?
    </h2>

    {/* Subtitle */}
    <p
      className="mb-4 fw-semibold"
      style={{
        fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)',
      }}
    >
      Secure your spot now and create unforgettable memories in Kashmir!
    </p>

    {/* CTA Button */}
    <Button
      className="fw-bold rounded-pill shadow mx-auto d-block"
      style={{
        background: 'linear-gradient(135deg, #0A2A4A, #4682B4)',
        border: 'none',
        padding: '12px 28px',
        fontSize: 'clamp(0.95rem, 4vw, 1.25rem)',
        maxWidth: '100%',
        whiteSpace: 'normal',
      }}
      onClick={() => setShowBookingModal(true)}
    >
      {/* Desktop / Tablet Text */}
      <span className="d-none d-md-inline">
        Book Now – Limited Seats Available!
      </span>

      {/* Mobile Text */}
      <span className="d-inline d-md-none">
        Book Now
      </span>
    </Button>

    {/* TEMP CHECK */}
    {showBookingModal && (
      <p className="mt-4 text-success fw-bold">
        Booking modal will open here
      </p>
    )}
  </div>
</Container>

    </TourPage>
  );
};

export default TourDetails;
