import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TourCard = ({ id, image, duration, location, title, places, customRoute }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm rounded-1 overflow-hidden">
      {/* Image with fixed height and object fit */}
      <Card.Img
        variant="top"
        src={image}
        style={{ height: '230px', objectFit: 'cover' }}
        alt={title}
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

        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="text-muted mb-3">{places}</p>

        <Button 
          variant="primary" 
          className="w-100 mt-2"
          style={{ display: 'block' }}
          onClick={() => customRoute ? navigate(customRoute) : navigate(`/tour/${id}`)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default TourCard;
