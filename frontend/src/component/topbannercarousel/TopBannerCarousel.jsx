import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promoTexts = [
  "Get any 2 100ml PERFUMES for just ₹949",
  "Free shipping on all orders",
  <span>🎁 FREE Gift on all PREPAID Orders</span>
];

export default function TopBannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promoTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + promoTexts.length) % promoTexts.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % promoTexts.length);
  };

  return (
    <div className="bg-black text-white text-sm md:text-base py-2 relative overflow-hidden flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrev}
          className="text-white hover:text-gray-400 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="min-w-[450px] text-center text-[15px] transition-opacity duration-500 ease-in-out">
          {promoTexts[index]}
        </div>

        <button
          onClick={handleNext}
          className="text-white hover:text-gray-400 transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
