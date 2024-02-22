import React, { useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './ImageSllider.css';
import {useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const slideImages = useSelector((state) => state.postsReducer.slideshowImages);
  
  const navigate = useNavigate()

  return (
    <div className="slide-container">
      <Slide>
        {slideImages && slideImages.map((image) => (
          <div className="each-slide-effect" key={image._id}>
            <div className='background-img' style={{ backgroundImage: `url(${image.image})` }}>
              <div className='slider-desc'>
                <div className='slider-text'>
              <span>{image.title}</span>
              <p>{image.description}</p>
              </div>
              <button
              className=" w-full md:w-auto text-white focus:ring-4 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none  active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
              // bg-blue-500 text-white px-4 py-1 rounded mt-2 block w-full md:w-auto

              onClick={() => navigate(`/post/${image._id}`)}
            >View</button>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;

