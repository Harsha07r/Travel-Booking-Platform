import React from 'react';
import { Container } from 'react-bootstrap';
import Contactform from '../Components/Sections/Contactform';
import '../Styles/TourDetails.css';

const TourPage = ({ image, duration, location, title, overview, itinerary }) => (
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

    <Contactform />
  </>
);

export default TourPage; 