// src/components/SwiperCards.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";  // ✅ Import navigation

import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/pagination";

import '../../Styles/Swipercard.css'; // custom styles

const cardData = [
  {
    title: "Group Tours",
    image: "/images/group.webp",
    description: "We go above and beyond to ensure your comfort by providing exceptional service.",
  },

  {
    title: "Best Hotels",
    image: "/images/hotels.webp",
    description: "We go above and beyond to ensure your comfort by providing exceptional service.",
  },

  {
    title: "Adventures",
    image: "/images/adventure-2.webp",
    description: "We specialize in creating customized adventure experiences, lasting memories.",
  },

  {
    title: "Piligrimage Tour",
    image: "/images/temple.webp",
    description: "Embark on a Piligrimage tour to reconnect your faith and experience divine serenity.",
  },

  {
    title: "Premium Service",
    image: "/images/ertiga-new.webp",
    description: "We deliver comfort, class, and confidence — with premium vehicles and professional drivers.",
  },

  {
    title: "Houseboats",
    image: "/images/houseboat-1.webp",
    description: "Riverside charm and valley adventures,Experience the perfect blend of nature.",
  },

];

const SwiperCards = () => {
  return (
    <div className="card-slider-container">
      {/* ✅ Heading div inside the component */}
      <div className="offer-text-wrapper">
        <h2 className="offer-heading">We Offer</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        breakpoints={{
           0: { slidesPerView: 1 },      // Mobile

          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="custom-card">
              <img src={card.image} alt={card.title} />
              <div className="card-body">
                <h1>{card.title}</h1>
                <p>{card.description}</p>
                <button className="explore-btn" onClick={() => navigate("/tour-packages")}>Explore
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCards;
