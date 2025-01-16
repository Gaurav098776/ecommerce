"use client";
import React, { useState } from "react";
import Image from "next/image"; // Ensure you're using Next.js' Image component

const SLIDER_IMAGES = [
  { src: "/img/06.jpg", alt: "Product 1" },
  { src: "/img/06.jpg", alt: "Product 2" },
  { src: "/img/06.jpg", alt: "Product 3" },
];

const SHARED_BUTTON_CLASSES =
  "absolute top-1/2 transform -translate-y-1/2 bg-white bg-secondary text-secondary-foreground p-2 rounded-full hover:bg-secondary/80";

const Crousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < SLIDER_IMAGES.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : SLIDER_IMAGES.length - 1
    );
  };

  const updateSliderPosition = () => {
    return { transform: `translateX(-${currentIndex * 100}%)` };
  };

  return (
    <div className="w-full mx-auto py-8">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={updateSliderPosition()}
          >
            {SLIDER_IMAGES.map((image, index) => (
              <div key={index} className="min-w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className={`${SHARED_BUTTON_CLASSES} left-4`}
          aria-label="Previous Slide"
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>
        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`${SHARED_BUTTON_CLASSES} right-4`}
          aria-label="Next Slide"
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Crousel;
