import React from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video
          src="https://res.cloudinary.com/dsajhtkyy/video/upload/q_auto:good,w_1920,c_limit/v1761565958/%D0%B7%D0%B0%D0%B4%D0%BD%D0%B8%D0%B9_%D1%84%D0%BE%D0%BD_16-9_jq1thh.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Купить квартиру в Тюмени
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Помогу найти и купить квартиру в новостройке без переплат , по привлекательной цене.
          </p>
          <button
            onClick={onCTAClick}
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-base md:text-lg py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse-custom"
          >
            Подбор и анализ рынка, ТОП-3 лучших предложений
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;