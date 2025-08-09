// App.js
import React from 'react';
import '../../App.css';
import Contactform from './Contactform';

function Destinations() {
  const cardsData = [
    { id: 1, src: "/images/dal-lake.webp", alt: "Dal Lake" },
    { id: 2, src: "/images/Pahalgam Kashmir Photography (1).webp", alt: "Pahalgam" },
    { id: 3, src: "/images/gondola.webp", alt: "Gulmarg Gondola" },
    { id: 4, src: "/images/sonamarg.webp", alt: "Sonamarg" },
    { id: 5, src: "/images/ladakh.webp", alt: "Ladakh" },
    { id: 6, src: "/images/vaishno devi (1).webp", alt: "Vaishno Devi" },
  ];
    
  return (
    <div className="container py-2">
<h2 className="gradient-text">
  Popular Destinations
</h2>

      <div className="row g-4">
        {cardsData.map(card => (
          <div key={card.id} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
            <div className="card image-wrapper" style={{ width: "30rem", border: "none", position: "relative", overflow: "hidden" }}>
              
              {/* Black overlay */}
              <div className="overlay"></div>

              {/* Centered text over image */}
              <div className="overlay-text">{card.alt}</div>

              {/* Image */}
              <img
                src={card.src}
                className="card-img-top"
                alt={card.alt}
                style={{
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  transition: "transform 0.8s ease",
                  width: "100%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
