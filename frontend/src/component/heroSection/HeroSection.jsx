import React, { useState, useEffect } from "react";

const HeroSection = () => {
    const images = ["/herosection1.jpg", "/herosection2.jpeg"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden relative">
            <img
                className="w-full h-full object-cover object-center transition-opacity duration-1000 hover:scale-105"
                src={images[index]}
                alt="Bella Vita Luxury Premium Hero"
            />
            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500"></div>
        </div>
    );
}

export default HeroSection;