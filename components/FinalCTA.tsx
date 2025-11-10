import React from 'react';

interface FinalCTAProps {
  onCTAClick: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onCTAClick }) => {
  return (
    <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <video
                src="https://res.cloudinary.com/dsajhtkyy/video/upload/v1762712325/2-35_foio6b.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            ></video>
            <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Начните с консультации, а не с поиска</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
          Рынок меняется каждый день. Не принимайте решение о покупке на миллионы рублей, основываясь на рекламе.
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Получите бесплатную 15-минутную консультацию. Я разберу вашу ситуацию и честно скажу, какие у вас есть варианты, даже если вы решите не работать со мной. Это вас ни к чему не обязывает.
        </p>
        <button
          onClick={onCTAClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 animate-pulse-custom"
        >
          Начать подбор →
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;