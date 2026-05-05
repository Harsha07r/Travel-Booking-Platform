import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Reviewcard.css';

const reviewsData = [
  {
    id: 1,
    stars: 5,
    quote: "This was our first family vacation after years, and RoyalHorizon made it smooth and hassle-free.",
    name: "Harsha Vardhan",
    title: "Undergraduate",
    avatar: "https://placehold.co/40x40/adb5bd/ffffff?text=ST"
  },
  {
    id: 2,
    stars: 5,
    quote: "I've traveled with multiple agencies, but RoyalHorizon offered the best experience within budget.",
    name: "Geethika Sai",
    title: "Architect",
    avatar: "https://placehold.co/40x40/adb5bd/ffffff?text=MC"
  },
  {
    id: 3,
    stars: 5,
    quote: "We had a last-minute change in our dates, and the RoyalHorizon team was super flexible.",
    name: "Jayasri",
    title: "Home maker",
    avatar: "https://placehold.co/40x40/adb5bd/ffffff?text=ER"
  },
  {
    id: 4,
    stars: 4,
    quote: "What I loved most was how they customized our trip based on our pace.",
    name: "Ramakrishna",
    title: "Business Owner",
    avatar: "https://placehold.co/40x40/adb5bd/ffffff?text=JD"
  },
  {
    id: 5,
    stars: 5,
    quote: "From the first call to the final drop-off, RoyalHorizon was top-notch.",
    name: "Lokesh",
    title: "Mechanical Engineer",
    avatar: "https://placehold.co/40x40/adb5bd/ffffff?text=DP"
  },
  {
    id: 6,
    stars: 5,
    quote: "We traveled with elderly parents, and RoyalHorizon ensured all comfort.",
    name: "Sashank",
    title: "Software Engineer",
    avatar: "https://placehold.co/40x40/adb5bd/ffffff?text=OH"
  }
];

const StarRating = ({ count }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi ${i < count ? 'bi-star-fill text-warning' : 'bi-star text-secondary'} me-1`}
      />
    ))}
  </div>
);

function Reviewcard() {
  const desktopSlides = [];
  for (let i = 0; i < reviewsData.length; i += 3) {
    desktopSlides.push(reviewsData.slice(i, i + 3));
  }

  const mobileSlides = reviewsData.map(review => [review]);

  return (
    <div className="container py-5">
      <h2 className="gradient-text text-center mb-5">What Our Users Say</h2>

      {/* ================= DESKTOP CAROUSEL ================= */}
      <div
        id="reviewCarouselDesktop"
        className="carousel slide d-none d-md-block"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {desktopSlides.map((group, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row">
                {group.map(review => (
                  <div key={review.id} className="col-md-4 mb-4">
                    <ReviewCardItem review={review} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <CarouselControls target="#reviewCarouselDesktop" />
      </div>

      {/* ================= MOBILE CAROUSEL ================= */}
      <div
        id="reviewCarouselMobile"
        className="carousel slide d-block d-md-none"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {mobileSlides.map((group, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row">
                <div className="col-12">
                  <ReviewCardItem review={group[0]} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <CarouselControls target="#reviewCarouselMobile" />
      </div>
    </div>
  );
}

const ReviewCardItem = ({ review }) => (
  <div className="card h-100 review-card">
    <div className="card-body d-flex flex-column justify-content-between">
      <div>
        <StarRating count={review.stars} />
        <p className="card-text fst-italic mt-3">"{review.quote}"</p>
      </div>
      <div className="d-flex align-items-center mt-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="rounded-circle me-3 border"
          width="40"
          height="40"
        />
        <div>
          <h6 className="mb-0">{review.name}</h6>
          <small className="text-light">{review.title}</small>
        </div>
      </div>
    </div>
  </div>
);

const CarouselControls = ({ target }) => (
  <>
    <button className="carousel-control-prev" type="button" data-bs-target={target} data-bs-slide="prev">
      <span className="carousel-control-prev-icon" />
    </button>
    <button className="carousel-control-next" type="button" data-bs-target={target} data-bs-slide="next">
      <span className="carousel-control-next-icon" />
    </button>
  </>
);

export default Reviewcard;
