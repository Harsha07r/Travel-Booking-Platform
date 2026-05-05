import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../Styles/Swiperimage.css";// ✅ CORRECT ORDER:
import "swiper/css";              // Core Swiper styles (must be first)
import "swiper/css/pagination";   // Pagination module styles
import "swiper/css/navigation";   // Navigation module styles
import "swiper/css/autoplay";     // Autoplay module styles (optional)

// Custom styles LAST (to override defaults)
import "../../Styles/Swiperimage.css";

const images = [
  "/images/dal-lake.webp",
  "/images/ladakh.webp",
  "/images/gondola.webp",
];

const Swiperimage = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{ clickable: true }}
      navigation={true}
      className="imageSlider"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="slider-image-wrapper">
            <img
              src={img}
              className="slider-image"
              alt={`Slide ${index}`}
              loading="lazy" // optional: keeps browser native lazy loading
            />
            {index === 0 && (
              <div className="banner-text-animated">
                <div className="banner-text-main">Experience the Serenity</div>
                <div className="banner-text-sub">Welcome to Royal Horizon</div>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Swiperimage;