import React from 'react';
import { Container } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
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

      <Contactform />
    </>
  );
};

export default LadakhTour;
