import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://bellavitaluxury.co.in/cdn/shop/files/1920-720_8af70e11-34be-4c94-b987-2299d747a5ee.jpg?v=1739253653&width=1920",
  "https://bellavitaluxury.co.in/cdn/shop/files/1920-720_a165f1df-211d-4b06-8b0c-2a2b3a964803.webp?v=1740996704&width=1920",
  "https://bellavitaluxury.co.in/cdn/shop/files/1920-720_b16db889-83e8-4373-9151-71dbbe7db4a7.jpg?v=1739253708&width=1920",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef();

  const slides = [...images, images[0]];

  useEffect(() => {
    const delay = 3000;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="relative overflow-hidden w-full">
      <div
        ref={slideRef}
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
          }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full ${currentIndex === idx ||
                (currentIndex === slides.length - 1 && idx === 0)
                ? "bg-white"
                : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
