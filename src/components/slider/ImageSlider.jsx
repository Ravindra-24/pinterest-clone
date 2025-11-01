import React, { useState } from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ImageSllider.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SliderSkeleton from "./SliderSkeleton";

const ImageSlider = () => {
  const slideImages = useSelector((state) => state.ImageSliderReducer);

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  //   const prevStyle = {
  //     left:"1%",
  //     bottom:"5%",
  // };

  // const nextStyle = {
  //   right:"1%",
  //   bottom:"5%",
  // }

  const properties = {
    prevArrow: (
      <button className="prev-btn">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    ),
    nextArrow: (
      <button className="next-btn">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    ),
  };

  const handleSlideChange = (currentIndex) => {
    setCurrentIndex(currentIndex);
  };

  return (
    <>
      {slideImages.loaded && slideImages.slideshowImages ? (
        <div className="slide-container border-s-slate-800">
          {slideImages.loaded && (
            <Zoom
              {...properties}
              onChange={handleSlideChange}
              indicators={(index) => (
                <div className="indicator">
                  <div className="active-indicator"></div>
                </div>
              )}
              scale={1.4}
              defaultIndex={currentIndex}
            >
              {slideImages?.slideshowImages.map((images) => (
                <div className="each-slide-effect" key={images._id}>
                  <div
                    className="background-img"
                    style={{ backgroundImage: `url('${images.image}')` }} // Ensure the URL is properly formatted
                  >
                    <div className="slider-desc">
                      <span>{images.title}</span>
                      <p>{images.description}</p>

                      <button
                        className="slide-nav-button max-w-min text-white focus:ring-4 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none  active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                        onClick={() => navigate(`/post/${images._id}`)}
                      >
                        View
                      </button>
                    </div>
                    <div className="slider-text-background bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"></div>
                  </div>
                </div>
              ))}
            </Zoom>
          )}
        </div>
      ) : (
        <SliderSkeleton />
      )}
    </>
  );
};

export default ImageSlider;
