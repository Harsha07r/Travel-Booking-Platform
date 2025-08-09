// src/pages/TourPackages.jsx
import React from 'react';
import TourCard from './TourCard';
import { Container, Row, Col } from 'react-bootstrap';
import '../../Styles/Tourpackages.css';

const tours = [
  {
    id: 1,
    image: '/images/srinagar.webp',
    duration: '5 Night 6 Days',
    location: 'Srinagar',
    title: '5N-6D Kashmir Package',
    places: 'Srinagar - Gulmarg - Pahalgam',
  },
  {
    id: 2,
    image: '/images/vaishno devi (1).webp',
    duration: '4 Night 5 Days',
    location: 'Jammu',
    title: 'Katra-Shivkhori-Kashmir',
    places: 'Katra - Shivkhori - Srinagar',
  },
  {
    id: 3,
    image: '/images/ladakh.webp',
    duration: '3 Night 4 Days',
    location: 'Leh',
    title: 'Ladakh Tour',
    places: 'Leh - Sham Valley - Pangong - Leh',
  },
  {
    id: 4,
    image: '/images/housebat (1).webp',
    duration: '3 Night 4 Days',
    location: 'Leh',
    title: 'Kashmir Houseboat Tour',
    places: 'Leh - Sham Valley - Pangong - Leh',
  },
  {
    id: 5,
    image: '/images/srinagar-honeymoon.webp',
    duration: '3 Night 4 Days',
    location: 'Leh',
    title: 'Honeymoon Tour',
    places: 'Leh - Sham Valley - Pangong - Leh',
  },
  {
    id: 6,
    image: '/images/kashmir.webp',
    duration: '3 Night 4 Days',
    location: 'Leh',
    title: 'Heavenly Kashmir Tours',
    places: 'Leh - Sham Valley - Pangong - Leh',
  }
];

const TourPackages = () => {
  return (
    <Container className="py-5">
      <h2 className="gradient-text">Popular Tour Packages</h2>
      <Row className="g-4">
        {tours.map((tour) => (
          <Col
            key={tour.id}
            xs={11}
            sm={6}
            lg={4}
            className="d-flex justify-content-center"
          >
            <div className="tour-card-wrapper" style={{ width: "38rem" }}>
              <TourCard {...tour} customRoute={tour.title === 'Katra-Shivkhori-Kashmir' ? '/katra-tour' : tour.title === 'Ladakh Tour' ? '/ladakh-tour' : tour.title === 'Kashmir Houseboat Tour' ? '/houseboat-tour' : tour.title === 'Kashmir Honeymoon Tour' ? '/honeymoon-tour' : tour.title === 'Heavenly Kashmir Tours' ? '/heavenly-tour' : undefined} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TourPackages;
