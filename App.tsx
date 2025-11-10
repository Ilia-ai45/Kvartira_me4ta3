import React, { useRef, useState, useEffect } from 'react';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import RealCasesBlock from './components/RealCasesBlock';
import Quiz from './components/Quiz';
import Process from './components/Process';
import About from './components/About';
import Footer from './components/Footer';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TestimonialsBlock from './components/TestimonialsBlock';

const App: React.FC = () => {
  const quizRef = useRef<HTMLDivElement>(null);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  // Effect to handle reveal-on-scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Animation starts when 10% of the element is visible
      }
    );

    const elements = document.querySelectorAll('.animate-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []); // Empty array ensures this runs only once on mount

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openPolicyModal = () => setIsPolicyModalOpen(true);
  const closePolicyModal = () => setIsPolicyModalOpen(false);

  return (
    <div className="bg-black text-gray-200">
      <header className="absolute top-0 left-0 w-full z-10 p-4 bg-black/20">
          <div className="container mx-auto">
              <div className="flex items-center">
                <img 
                  src="https://res.cloudinary.com/dsajhtkyy/image/upload/v1761837364/Generated_Image_October_29_2025_-_12_07PM-no-bg-preview_carve.photos_vo1uyc.png" 
                  alt="Логотип Дарьи Бугровской, эксперта по новостройкам в Тюмени" 
                  className="h-10 w-10 mr-3"
                  style={{ filter: 'invert(62%) sepia(61%) saturate(541%) hue-rotate(87deg) brightness(94%) contrast(92%)' }}
                />
                <a 
                  href="https://t.me/+s2L1rHyXD5gyNWNi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="перейти на канал"
                  className="text-lg sm:text-xl font-bold text-white transition-opacity hover:opacity-80"
                >
                  <span className="text-yellow-400">Дарья</span> | Эксперт по новостройкам в Тюмени
                </a>
              </div>
          </div>
      </header>
      <main>
        <Hero onCTAClick={scrollToQuiz} />
        <About />
        <ValueProposition />
        <RealCasesBlock />
        <TestimonialsBlock />
        <Process />
        <div ref={quizRef} id="quiz-section">
          <Quiz onPolicyClick={openPolicyModal} />
        </div>
      </main>
      <Footer onPolicyClick={openPolicyModal} />
      <PrivacyPolicyModal isOpen={isPolicyModalOpen} onClose={closePolicyModal} />
    </div>
  );
};

export default App;