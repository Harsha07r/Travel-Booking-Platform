import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
import BookingModal from '../Components/BookingModal';
import '../Styles/TourDetails.css';

const katraTour = {
  image: '/images/srinagar.webp',
  duration: 'Katra-Shivkhori-Kashmir',
  location: 'Srinagar',
  title: 'Katra-Shivkhori-Kashmir',
  overview: 'Take this opportunity to explore the paradisiacal Vale of Kashmir with the 4 nights 5 days Katra-Kashmir package ex Katra. The popular package covers the cities of Shivkhori, Srinagar, and Gulmarg. The Kashmir tour itinerary begins with a pick-up from Katra and is ideal for those who wish to head to Kashmir after their Vaishno Devi Darshan.',
  itinerary: [
    { day: 'Day 1: Katra - Shivkhori - Katra (70 Kms One Way, Approx. 3 Hours’ Drive)', desc: 'Pickup from Katra and proceed for an excursion to Shivkhori temple, which is around 70 km (3 hours’ drive each way). "Shivkhori" means the cave of Lord Shiva. On the way, visit Aghar Jitto (6 km from Katra), a shrine dedicated to revolutionary Baba Jitto, and Nau Deviyan (10 km from Katra). Upon reaching Shivkhori, a 4 km steep walk leads to the holy Shivling. The yatra and darshan can take between 1.5 to 3 hours. After darshan, return to the starting point and get transferred back to the hotel for an overnight stay in Katra.' },
    { day: 'Day 2:Katra – Srinagar (270 Kms, Approx. 7 Hours’ Drive)', desc: 'Early morning, check out from the hotel in Katra and proceed towards Srinagar. Enroute, enjoy a sightseeing tour of Patnitop and admire the splendid views. After reaching Srinagar, check in to the hotel, freshen up, and enjoy a delicious dinner. Overnight stay in Srinagar.' },
    { day: 'Day 3: Srinagar Local Sightseeing', desc: 'After a healthy breakfast at the houseboat, visit the famous Mughal Gardens: Chashma Shahi, Nishat, and Shalimar, which were laid out in the 16th century along the banks of Dal Lake. Also visit Pari Mahal and the Botanical Garden. In the evening, explore the local markets. Overnight stay at the hotel in Srinagar.' },
    { day: 'Day 4:Srinagar - Gulmarg - Srinagar', desc: 'Early morning, proceed to Gulmarg, passing willow trees, fast-flowing streams, and lush green meadows. Gulmarg, known as the "Meadow of Flowers," offers a breathtaking view of snow-capped peaks covered with dense forests. Enjoy pony rides (at your own expense) or take a ride on the Gondola lift (at your own expense). Return to Srinagar in the evening and stay overnight at the hotel.' },
    { day: 'Day 5:Srinagar - Katra', desc: 'After breakfast, check out and depart for Katra. En route, enjoy the scenic beauty of the Kashmir Valley. Upon reaching Katra, transfer to your hotel or onward journey location.' },
    { day: 'Day 6: Srinagar - Airport', desc: 'After breakfast transfer to Srinagar Airport with Sweet holiday memories.' },
  ],
};

const KatraTour = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingSuccess = (booking) => {
    console.log('Booking successful:', booking);
  };

  return (
    <>
      <div className="image-container w-80">
        <img src={katraTour.image} alt={katraTour.title} />
        <h1 className="heading">{katraTour.title}</h1>
      </div>

      <Container className="mb-5">
        <h3 className="mb-3">Tour Overview</h3>
        <div className="p-3 bg-light rounded shadow-sm">
          <p>{katraTour.overview}</p>
        </div>

        <div className="itinerary-section p-4 mt-4 rounded shadow-sm">
          {katraTour.itinerary.map(({ day, desc }, idx) => (
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
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(10, 42, 74, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
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
        tourId={katraTour.title}
        tourName={katraTour.title}
        onBooked={handleBookingSuccess}
      />

      <Contactform />
    </>
  );
};

export default KatraTour;
