import React from 'react';
import TourPage from './TourPage';

const tourData = {
  image: '/images/srinagar.webp',
  duration: '5 Night 6 Days',
  location: 'Srinagar',
  title: '5N-6D Kashmir Package',
  overview: 'Kashmir holiday tour is incomplete without a houseboat stay in Srinagar Dal Lake. Enjoy and experience a unique stay at the finest houseboats on the popular Dal and Nigeen Lake. Our Kashmir Houseboat tour packages enable you to explore and enjoy authentic Kashmiri flavor with an experience of a lifetime.',
  itinerary: [
    { day: 'Day 1: Arrival in Srinagar', desc: 'Arrival in Srinagar for your trip. Meet our representative and transfer to the Houseboat. Enjoy the Romantic Shikara ride on Dal Lake.' },
    { day: 'Day 2: Srinagar - Sonamarg - Srinagar', desc: 'After breakfast leave for full day trip to Sonamarg. Sonamarg also known as “The Meadow of Gold” or “The Gateway of Ladakh” Sonamarg is 84 Kms from Srinagar and is surrounded by colourful mountains and thick Pine forests. Overnight stay at Houseboat in Srinagar.' },
    { day: 'Day 3: Srinagar - Pahalgam', desc: 'After breakfast transfer to Pahalgam (2133 mts) also known as “The valley of Shepherds or Trekker’s Paradise for 01 night stay. On the way visit Awantipura ruins, Saffron fields. The town of Pahalgam offers breath-taking views. Overnight stay at Hotel in Pahalgam.' },
    { day: 'Day 4: Pahalgam - Srinagar Local Sightseeing', desc: 'After breakfast transfer from Pahalgam to Srinagar. Afternoon tour to famous Mughal Garden, Nishat Garden known as “Garden of pleasure” built in 16th century (1633) by Mughal King Asif Khan. Then visit to Shalimar Garden known as “Garden of love” built in 16th century (1619) by Mughal King Jahangir for his beloved wife Noor Jahan or (Mehr-un-Nissa) After that visit to Chashmashahi. Overnight stay at Hotel in Srinagar.' },
    { day: 'Day 5: Srinagar - Gulmarg - Srinagar', desc: 'After breakfast leave for full day trip to Gulmarg known as “Meadow of flowers. It is one of the India’s premier Hill resorts. Gulmarg today is not merely a mountain resort of exceptional beauty – It also turns into India’s premier Ski resort in winter. The Gondola Cable Car offers rides to the top of Apharwat range to a height of 14000 ft for viewing the Himalayan Peaks in summer and for downhill skiing in winter. Overnight stay at Hotel in Srinagar.' },
    { day: 'Day 6: Srinagar - Airport', desc: 'After breakfast transfer to Srinagar Airport with Sweet holiday memories.' },
  ],
};

const TourDetails = () => <TourPage {...tourData} />;

export default TourDetails;
