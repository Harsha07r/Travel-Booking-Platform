import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
import BookingModal from '../Components/BookingModal';
import tourIds from '../tourIds';
import '../Styles/TourDetails.css';

const TourPage = ({ image, duration, location, title, overview, itinerary }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingSuccess = (booking) => {
    console.log('Booking successful:', booking);
  };

  return (
    <>
      <div className="image-container w-80">
        <img src={image} alt={title} loading="lazy" />
        <div className="heading">
          <h1 className="title">{title}</h1>
        </div>
      </div>

      <Container className="mb-5">
        <h3 className="mb-3">Tour Overview</h3>
        <div className="p-3 bg-light rounded shadow-sm">
          <p>{overview}</p>
        </div>

        <div className="itinerary-section p-4 mt-4 rounded shadow-sm">
          {itinerary.map(({ day, desc }, idx) => (
            <div className="mt-4" key={idx}>
              <h5>🕘 {day}</h5>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </Container>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tourId={tourIds[title]}   
        tourName={title}
        onBooked={handleBookingSuccess}
      />

<Container id="booking-section" className="mb-5 text-center">
  <div
    className="booking-cta p-5 rounded-4 shadow-lg"
    style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #b6dbff 100%)',
      border: '2px solid #4682B4',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'linear-gradient(45deg, rgba(10, 42, 74, 0.05) 0%, rgba(70, 130, 180, 0.05) 100%)',
        zIndex: 1
      }}
    ></div>

    <div style={{ position: 'relative', zIndex: 2 }}>
      <h2
        className="mb-3"
        style={{
          background: 'linear-gradient(135deg, #0A2A4A 0%, #4682B4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: '900'
        }}
      >
        Ready to Book Your Adventure?
      </h2>

      <p
        className="mb-4 fs-5"
        style={{ color: '#252525', fontWeight: '600' }}
      >
        Secure your spot now and create unforgettable memories in Kashmir!
      </p>

      <Button
        size="lg"
        className="px-5 py-3 fs-4 fw-bold rounded-pill shadow"
        style={{
          background: 'linear-gradient(135deg, #0A2A4A 0%, #4682B4 100%)',
          border: 'none',
          color: 'white',
          transition: 'all 0.3s ease',
          fontSize: '2rem',
          borderRadius: '40px',
          padding: '18px 48px',
          margin: '32px auto 0 auto',
          display: 'block',
          boxShadow: '0 8px 32px rgba(10, 42, 74, 0.18)',
          maxWidth: '600px',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'scale(1.04)';
          e.target.style.boxShadow = '0 16px 40px rgba(10, 42, 74, 0.22)';
        }}
        onMouseLeave={e => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 8px 32px rgba(10, 42, 74, 0.18)';
        }}
        onClick={() => setShowBookingModal(true)} 
      >
        Book Now - Limited Seats Available!
      </Button>
    </div>
  </div>
</Container>

      <Contactform />
    </>
  );
};

export default TourPage;
