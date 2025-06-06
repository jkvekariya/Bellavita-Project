import React from "react";
import { useNavigate } from "react-router-dom";

function Video() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-130 flex items-center justify-center overflow-hidden mt-15">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-130 object-cover">
        <source
          src="https://cdn.shopify.com/videos/c/o/v/478dfd30e1114a6a9fe7a4c4d1b1ffa4.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 text-center text-white px-4">
        <p className="text-2xl md:text-4xl font-medium leading-[1.4]">
          DISCOVER THE ART OF <br />PERFUMERY
        </p>


        <p className="mt-4 text-lg max-w-xl mx-auto">
          Our formulations have proven efficacy, contain<br /> certified ingredients only, and are 100% cruelty-free.
        </p>
        <button
          onClick={() => navigate("/Luxuryperfumes")} 
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-md shadow-lg hover:bg-gray-200 transition"
        >
          FRAGRANCES
        </button>
      </div>
    </div>
  );
}

export default Video;
