import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
import BookingModal from '../Components/BookingModal';
import tourIds from '../tourIds';
import '../Styles/TourDetails.css';

const ladakhTour = {
  image: '/images/ladakh.webp',
  duration: '3 Night 4 Days',
  location: 'Leh',
  title: 'Rendezvous Ladakh Tour',
  overview: 'Ladakh lies in the north-east region of India and is surrounded by the world’s highest mountain ranges, Karakoram and Great Himalayas. The Ladakh district occupied Kashmir in the west and China in the north. Ladakh is an exotic destination considered as the highest plateau lying at an altitude of 9, 800 ft. Ladakh is the 3rd province of Kashmir Valley.',
  itinerary: [
    { day: 'Day 1: Arrival at Leh Airport', desc: 'Arrive at Leh airpoArrival at Leh airport and transferred to the Hotel. Complete day for Acclimatize. Later evening visit to Leh Market, Leh Palace and Shanti Stupa. O/N Leh.' },
    { day: 'Day 2: Leh - Sham Valley', desc: 'After breakfast, drive to Sham Valley. Visit Gurudwara Pathar Sahib, Magnetic Hill, and the confluence of Zanskar and Indus rivers. Return to Leh for overnight stay.' },
    { day: 'Day 3: Leh - Pangong Lake - Leh', desc: 'After early Breakfast leave for Pangong Lake (14,500 ft) through Changla Pass 17,350 ft, 3rd highest motorable road in the world. Enjoy the beauty of the lake on the Banks of pangong while appreciating the changing Colors and fascinating high altitude of the Lake. Drive back to Leh by the same route. O/N Leh.' },
    { day: 'Day 4:  Leh Airport', desc: 'Early morning transfer to Leh airport to board flight back to destination. Journey Ends.' },
  ],
};

const LadakhTour = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingSuccess = (booking) => {
    console.log('Booking successful:', booking);
  };

  return (
    <>
      <div className="image-container w-80">
        <img src={ladakhTour.image} alt={ladakhTour.title} />
        <h1 className="heading">{ladakhTour.title}</h1>
      </div>

      <Container className="mb-5">
        <h3 className="mb-3">Tour Overview</h3>
        <div className="p-3 bg-light rounded shadow-sm">
          <p>{ladakhTour.overview}</p>
        </div>

        <div className="itinerary-section p-4 mt-4 rounded shadow-sm">
          {ladakhTour.itinerary.map(({ day, desc }, idx) => (
            <div className="mt-4" key={idx}>
              <h5>🕘 {day}</h5>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Prominent Book Now Section */}
      <Container id="booking-section" className="mb-5 text-center">
        <div className="booking-cta p-5 rounded-4 shadow-lg" style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #b6dbff 100%)',
          border: '2px solid #4682B4',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(10, 42, 74, 0.05) 0%, rgba(70, 130, 180, 0.05) 100%)',
            zIndex: 1
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="mb-3" style={{
              background: 'linear-gradient(135deg, #0A2A4A 0%, #4682B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem',
              fontWeight: '900'
            }}>
              Ready to Book Your Adventure?
            </h2>
            <p className="mb-4 fs-5" style={{ color: '#252525', fontWeight: '600' }}>
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

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tourId={tourIds[ladakhTour.title]} // Updated to use MongoDB _id
        tourName={ladakhTour.title}
        onBooked={handleBookingSuccess}
      />

      <Contactform />
    </>
  );
};

export default LadakhTour;
