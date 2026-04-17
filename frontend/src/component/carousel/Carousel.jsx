import React, { useState, useEffect } from "react";

const images = [
  "/herosection1.jpg",
  "/herosection2.jpeg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const delay = 5000;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-[300px] md:h-[500px] lg:h-[650px] bg-black">
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full flex-shrink-0 object-cover object-center"
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-white w-8" : "bg-white/40"
              }`}
          />
        ))}
      </div>

      {/* Overlay for Premium Look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
}
