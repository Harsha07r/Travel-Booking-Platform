import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // ✅ Import Lazy module

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/css/lazy"; // ✅ Import lazy CSS

import "../../Styles/Swiperimage.css"; // Your custom styles

const images = [
  "/images/adventure-logo.png",
  "/images/ladakh.webp",
  "/images/houseboat.webp",
];

const Swiperimage = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]} // ✅ Add Lazy module
      spaceBetween={30}
      centeredSlides={true}
      pagination={{ clickable: true }}
      navigation={true}
    lazy={{ loadPrevNext: true }}
      className="imageSlider"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="slider-image-wrapper">
            <img
              data-src={img} // ✅ Use data-src instead of src
              className="slider-image swiper-lazy"
              alt={`Slide ${index}`}
              loading="lazy" // ✅ Fallback for browsers
            />
            <div className="swiper-lazy-preloader"></div> {/* ✅ Optional spinner */}

            {index === 0 && (
              <div className="banner-text-animated">
                <div className="banner-text-main">Experience the Serenity</div>
                <div className="banner-text-sub">Welcome to Royal Horizon</div>
              </div>
            )}
          </div>
          <div className="swiper-lazy-preloader"></div>

        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Swiperimage;
