import React from "react";
import { useNavigate } from "react-router-dom";

function Video() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[620px] sm:h-[520px] flex items-center justify-center overflow-hidden mt-16">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/478dfd30e1114a6a9fe7a4c4d1b1ffa4.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-12">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-wide">
          DISCOVER THE ART OF <br />PERFUMERY
        </p>

        <p className="mt-5 text-base sm:text-lg max-w-3xl mx-auto leading-7 text-white/90">
          Our formulations have proven efficacy, contain certified ingredients only, and are 100% cruelty-free.
        </p>
        <button
          onClick={() => navigate("/Luxuryperfumes")} 
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-xl shadow-black/20 transition hover:bg-gray-200"
        >
          FRAGRANCES
        </button>
      </div>
    </div>
  );
}

export default Video;
