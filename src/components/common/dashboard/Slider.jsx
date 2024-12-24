import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Slider = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + events.length) % events.length
    );
  };

  return (
    <div className="relative overflow-hidden bg-white text-primary border-l-4 border-primary rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="font-light">Upcoming Events</p>
        <a href="#" className="underline underline-offset-2 cursor-pointer">
          History
        </a>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {events?.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-32 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="text-xl font-light uppercase">{slide.title}</p>
                <p className="text-sm font-light capitalize">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-2xl"
          onClick={goToPreviousSlide}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl"
          onClick={goToNextSlide}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
