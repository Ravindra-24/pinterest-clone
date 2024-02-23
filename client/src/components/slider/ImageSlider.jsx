import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./ImageSllider.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import withPublic from "../../hoc/withPublic";

const ImageSlider = () => {
  const slideImages = useSelector(
    (state) => state.postsReducer.slideshowImages
  );

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (currentIndex) => {
    setCurrentIndex(currentIndex);
  };

  const indicatorStyles = {
    backgroundColor: "white",
    border: "1px solid pink",
    color: "pink",
  };

  return (
    <div className="slide-container">
      <Slide
        onChange={handleSlideChange}
        indicators={true}
        defaultIndex={currentIndex}
        indicatorStyle={indicatorStyles} // Add indicatorStyle prop
      >
        {slideImages &&
          slideImages.map((images) => (
            <div className="each-slide-effect" key={images._id}>
              <div
                className="background-img"
                style={{ backgroundImage: `url('${images.image}')` }} // Ensure the URL is properly formatted
              >
                <div className="slider-desc">
                  <span>{images.title}</span>
                  <p>{images.description}</p>

                  <button
                    className="max-w-min text-white focus:ring-4 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none  active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                    onClick={() => navigate(`/post/${images._id}`)}
                  >
                    View
                  </button>
                </div>
                <div className="slider-text-background bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"></div>
              </div>
            </div>
          ))}
      </Slide>
    </div>
  );
};

export default withPublic(ImageSlider);
