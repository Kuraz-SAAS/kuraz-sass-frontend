import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { content: 'No Events' },
    { content: 'Event Details Here' },
    // Add more slides as needed
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative overflow-hidden bg-green-500 text-white rounded-lg py-2 shadow px-8">
      <div className="flex justify-between items-center mb-4">
        <p>Upcoming Events</p>
        <a href="#" className="underline underline-offset-2 cursor-pointer">
          History
        </a>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-32 flex items-center justify-center"
            >
              <p className="text-xl">{slide.content}</p>
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
