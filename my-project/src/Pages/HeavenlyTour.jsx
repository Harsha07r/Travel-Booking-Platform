import React from 'react';
import { Container } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
import '../Styles/TourDetails.css';

const heavenlyTour = {
  image: '/images/kashmir.webp',
  duration: '3 Night 4 Days',
  location: 'Leh',
  title: 'Heavenly Tours',
  overview: 'Kashmir is a state which is equally rich in cultural and natural wonders along with the myriad of history and political past that this state is home to. This state provides unique experiences to its tourists in the form of spicy native food along with a variety of teas, long walks or a jagged trekking experience on the many mountains in the region, marvelling at the cozy houseboats on the lakes of Srinagar and visiting the many pilgrimage sites, temples and religious and spiritual centres that are present throughout the state.',
  itinerary: [
    { day: 'Day 1: Srinagar -Airport', desc: 'Our services starts upon your arrival at Srinagar, you will be greeted by our representative and transfers to Hotel. Afternoon .Visit to famous Mughal Gardens Chashma Shahi, Nishat, Shalimar Mughal laid out in the 16th century & these fall along the bank of Dal-lake in the heart of Srinagar city .Pari Mahal, Botanical Garden, evening visit Market, overnight stay at Hotel.' },
    { day: 'Day 2: Srinagar – Sonmarg – Srinagar 168 Km', desc: 'After breakfast, full day excursion to Sonmarg which is the most beautiful drive from Srinagar. On the way we stop at many beautiful spots. Continue drive to Sonmarg 2690 Meters (Meadow of Gold). One can ride on horse to visit to Thajiwas Glacier where snow remains round the year and Sonmarg is known as Gateway of Ladakh. In the evening return to Hotel. Overnight and dinner in Hotel.' },
    { day: 'Day 3: Srinagar– Gulmarg -Srinagar', desc: 'After breakfast drive to Gulmarg (Meadow of Flowers) 2730 Mts above sea level. The distance of 60 kms will be covered in about 2 hrs. Gulmarg has one of the best Ski slopes in the world and highest golf course of the world with 18 holes. One can also have the view of Nanga Parbhat if weather permits. The view enroute from Tangmarg to Gulmarg is fascinating. One can also have a short trek up to Khilangmarg, which can be covered in about 3 hrs. Also enjoy sledge riding on snow. Chair Lifts for mountain ride are also available. Dinner and overnight stay in Hotel.' },
    { day: 'Day 4: Departure from Srinagar', desc: 'After breakfast, leave from Srinagar and drive to Pahalgam 2440 Mtrs (Vale of Kashmir) on the way visit Saffron fields and Avantipur ruins which is eleven hundred years old temple. Finally by the lunch time you will reach Pahalgam which is the most famous place for Indian Film Industry. After lunch enjoy the nature charm of the valley. Dinner and Overnight in Hotel' },
    { day: 'Day 5: Srinagar airport drop', desc: 'After breakfast checkout from hotel transfers to airport. Return back with sweet memories' },

],
};

const HeavenlyTour = () => {
  return (
    <>
      <div className="image-container w-80">
        <img src={heavenlyTour.image} alt={heavenlyTour.title} />
        <h1 className="heading">{heavenlyTour.title}</h1>
      </div>

      <Container className="mb-5">
        <h3 className="mb-3">Tour Overview</h3>
        <div className="p-3 bg-light rounded shadow-sm">
          <p>{heavenlyTour.overview}</p>
        </div>

        <div className="itinerary-section p-4 mt-4 rounded shadow-sm">
          {heavenlyTour.itinerary.map(({ day, desc }, idx) => (
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

export default HeavenlyTour;
