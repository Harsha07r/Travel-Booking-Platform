// src/Components/Layouts/TourPageLayout.jsx

import React from 'react';
import { Container } from 'react-bootstrap';
import '../../Styles/TourDetails.css'; // Your existing CSS

const TourPageLayout = ({ tour }) => {
  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="image-container w-80">
        <img src={tour.image} alt={tour.title} />
        <h1 className="heading">{tour.title}</h1>
      </div>

      <Container className="mb-5">
        <h3 className="mb-3">Tour Overview</h3>
        <div className="p-3 bg-light rounded shadow-sm">
          <p>{tour.overview}</p>
        </div>

        <div className="itinerary-section p-4 mt-4 rounded shadow-sm">
          {tour.itinerary.map(({ day, desc }, idx) => (
            <div className="mt-4" key={idx}>
              <h5>🕘 {day}</h5>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default TourPageLayout;