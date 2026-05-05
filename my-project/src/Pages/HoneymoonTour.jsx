import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
import BookingModal from '../Components/BookingModal';
import tourIds from '../tourIds';
import '../Styles/TourDetails.css';

const honeymoonTour = {
  image: '/images/srinagar-honeymoon.webp',
  duration: '3 Night 4 Days',
  location: 'Leh',
  title: 'Kashmir Honeymoon Tour',
  overview: 'Kashmir holiday tour is incomplete without a houseboat stay in Srinagar Dal Lake. Enjoy and experience a unique stay at the finest houseboats on the popular Dal and Nigeen Lake in Srinagar. Our Kashmir Houseboat tour packages enables you to explore and enjoy authentic Kashmiri flavor with an experience of lifetime.',
  itinerary: [
    { day: 'Day 1: Arrival in Srinagar', desc: 'On arrival Srinagar airport, welcome by our representative and transfer to the Gulmarg. Located at a distance of 60 km from Srinagar airport, Arrive Gulmarg, check in to the hotel. Gulmarg is one of the best Ski destinations in India.Gulmarg – The ‘Heartland of Winter sports’, Gulmarg is where all the enjoyment happens. The extremely first ski resort was established here in 1927 and ever since Gulmarg has been an epitome of skiing in the country. The town also takes wonderful satisfaction in owning Asia’s largest and also world’s second largest cable car project called Gulmarg Gondola. It connects Gulmarg with Aparwath Hill, where one can ski down on a long snow-trail. Shark Fin is one more brilliant area for powder skiing in the town. Gulmarg also boasts regarding being the longest Golf Course in India. Set against a beautiful backdrop, it attracts a large number of visitors.' },
    { day: 'Day 2: Gulmarg', desc: 'Gulmarg Gondola in Gulmarg – Jammu & Kashmir is just one of the world’s highest operating cable vehicles. Greater lines include the Dagu Glacier Gondola in Sichuan, China which gets to 4843 m, Jade Dragon in Yunnan, and the Mi Teleferico in between El Alto as well as La Paz, in Bolivia. Cable car will certainly take about 12 to 15 minutes to get to one phase to another phase.' },
    { day: 'Day 3: GULMARG – PAHALGAM (150 KMS, 5 HRS DRIVE)', desc: 'After breakfast check out from the hotel and transfer to Pahalgam. Located at a distance of 150 kms from Gulmarg, Arrive Pahalgam, and check in into the hotel. Day free at leisure. Overnight stay at hotel.' },
    { day: 'Day 4: Pahalgam', desc: 'After breakfast visit local sightseeing of Pahalgam. Visit Aru valley, Chandanwari & Betaab valley (On direct payment).' },
    { day: 'Day 5: PAHALGAM – SRINAGAR (96KMS, 3 HRS DRIVE)', desc: 'Back to home.' },

 ],
};

const HoneymoonTour = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingSuccess = (booking) => {
    console.log('Booking successful:', booking);
  };

  return (
    <>
      <div className="image-container w-80">
        <img src={honeymoonTour.image} alt={honeymoonTour.title} />
        <h1 className="heading">{honeymoonTour.title}</h1>
      </div>

      <Container className="mb-5">
        <h3 className="mb-3">Tour Overview</h3>
        <div className="p-3 bg-light rounded shadow-sm">
          <p>{honeymoonTour.overview}</p>
        </div>

        <div className="itinerary-section p-4 mt-4 rounded shadow-sm">
          {honeymoonTour.itinerary.map(({ day, desc }, idx) => (
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
        tourId={tourIds[honeymoonTour.title]} // Updated to use MongoDB _id
        tourName={honeymoonTour.title}
        onBooked={handleBookingSuccess}
      />

      <Contactform />
    </>
  );
};

export default HoneymoonTour;
