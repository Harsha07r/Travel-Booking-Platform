import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './TourCard.module.css';

const TourCard = ({ id, image, duration, location, title, places, customRoute }) => {
  const navigate = useNavigate();

  // Handler for clicking the card (image or title)
  const handleCardClick = () => {
    const route = customRoute || `/tour/${id}`;
    navigate(route);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <Card className="shadow-sm rounded-1 overflow-hidden tour-card-hover position-relative" style={{ cursor: 'pointer' }}>
      {/* Image with fixed height and object fit, clickable */}
      <Card.Img
        variant="top"
        src={image}
        style={{ height: '230px', objectFit: 'cover' }}
        alt={title}
        onClick={handleCardClick}
      />

      {/* Inner content section with gradient */}
      <div className="card-inner-gradient text-center p-3">
        <div className="text-muted mb-1">
          <FaClock className="me-2 text-danger" />
          {duration}
          {' | '}
          <FaMapMarkerAlt className="ms-2 me-1 text-danger" />
          {location}
        </div>

        {/* Title clickable */}
        <h5 className="fw-bold mb-2" onClick={handleCardClick} style={{ cursor: 'pointer' }}>{title}</h5>
        <p className="text-muted mb-3">{places}</p>

        {/* Only one prominent Book Now button */}
        <Button 
          className={styles.bookNowBtn}
          onClick={handleCardClick}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};

export default TourCard;
