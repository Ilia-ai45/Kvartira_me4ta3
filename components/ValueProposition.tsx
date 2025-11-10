import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { CheckIcon, XIcon, ChevronDownIcon } from './icons';

const comparisonData = [
  {
    criterion: 'Объективность',
    developer: 'Продаст только свой ЖК. Его задача — выполнить план по своему объекту.',
    daria: 'Сравню для вас все 70+ ЖК города. Моя задача — найти лучший для вас.',
  },
  {
    criterion: 'Анализ Качества',
    developer: 'Расскажет о "премиальных" материалах и красивом фасаде.',
    daria: 'Проверю проектную декларацию и технологию строительства. Объясню, где застройщик сэкономил на шумоизоляции, окнах и инженерии.',
  },
  {
    criterion: 'Цена',
    developer: 'Предложит вам стандартную цену и "акции" с сайта.',
    daria: 'Найду скрытые скидки (от подрядчиков, инвесторов, закрытые распродажи). Сэкономлю вам 3-10% сверх цены застройщика.',
  },
  {
    criterion: 'Ипотека',
    developer: 'Предложит 1-2 «своих» банка, часто с невыгодными условиями.',
    daria: 'Свой ипотечный брокер, одобрение в день подачи. Подберу лучшую ставку из 5+ банков-партнеров.',
  },
  {
    criterion: 'Мотивация',
    developer: 'Зарплата от Застройщика.',
    daria: 'Мои услуги для вас бесплатны. Мою комиссию платит любой застройщик, поэтому я не ангажирована.',
  },
];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobile(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);
    return isMobile;
};

const ValueProposition: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  
  const handleToggle = (index: number) => {
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);
  };

    useLayoutEffect(() => {
        const stickyDiv = stickyContainerRef.current;
        if (isMobile) {
            if (activeIndex !== null) {
                // Calculate scrollbar width BEFORE hiding it to prevent layout shift
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                
                // Apply padding to body to compensate for the scrollbar
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                
                // Lock body scroll
                document.documentElement.style.overflow = 'hidden';
                
                if (stickyDiv) {
                    stickyDiv.style.overflow = 'visible';
                }
            } else {
                // Unlock body scroll and remove padding
                document.documentElement.style.overflow = '';
                document.body.style.paddingRight = '';
                
                if (stickyDiv) {
                    stickyDiv.style.overflow = 'hidden';
                }
            }
        }
        
        // Cleanup on component unmount
        return () => {
            if (isMobile) {
                document.documentElement.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        };
    }, [activeIndex, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (activeIndex !== null && isMobile) return;
      const element = sectionRef.current;
      if (!element) return;

      const { top, height } = element.getBoundingClientRect();
      const speedMultiplier = isMobile ? 1.5 : 0.8;
      const scrollableHeight = (height - window.innerHeight) * speedMultiplier;
      
      let progress = -top / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, activeIndex]);
  
  const calculateStyle = (progress: number, start: number, end: number, type: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'clipPathUp') => {
    let localProgress = 0;
    if (progress >= start && progress < end) {
      localProgress = (progress - start) / (end - start);
    } else if (progress >= end) {
      localProgress = 1;
    } else {
      localProgress = 0;
    }

    const style: React.CSSProperties = { willChange: 'transform, opacity, clip-path' };
    
    style.opacity = localProgress;
    
    switch (type) {
      case 'fade':
        break;
      case 'slideUp':
        style.transform = `translateY(${(1 - localProgress) * 40}px)`;
        break;
      case 'slideLeft':
        style.transform = `translateX(${-(1 - localProgress) * 100}%)`;
        break;
      case 'slideRight':
        style.transform = `translateX(${(1 - localProgress) * 100}%)`;
        break;
      case 'scaleUp':
        style.transform = `scale(${0.8 + localProgress * 0.2})`;
        break;
      case 'clipPathUp':
         style.clipPath = `inset(${(1 - localProgress) * 100}% 0 0 0)`;
         break;
    }

    return style;
  };

  const getAnimatedStyle = (progress: number) => {
    const styles: { [key: string]: React.CSSProperties } = {};
    const willChange = { willChange: 'transform, opacity' } as React.CSSProperties;

    const combine = (baseProgress: number, inStyle: React.CSSProperties, outStyle: React.CSSProperties, outStart: number, outDuration: number) => {
        if (progress < outStart) return inStyle;
        const outProgress = Math.max(0, Math.min(1, (progress - outStart) / outDuration));
        return {
            ...willChange,
            opacity: 1 - outProgress,
            transform: outStyle.transform ? `${outStyle.transform.replace(/[0-9.-]+/, (val) => String(parseFloat(val) * outProgress))}` : undefined
        };
    };
    
    const titleIn = calculateStyle(progress, 0.0, 0.08, 'fade');
    const subtitleIn = calculateStyle(progress, 0.08, 0.15, 'fade');
    const contentContainerIn = calculateStyle(progress, 0.10, 0.20, 'clipPathUp');
    
    const rowStart = isMobile ? 0.20 : 0.16;
    const rowStep = isMobile ? 0.09 : 0.10; // Adjusted for faster mobile animation
    
    const rowsIn = comparisonData.map((_, index) => 
        calculateStyle(progress, rowStart + (index * rowStep), rowStart + ((index + 1) * rowStep), 'slideUp')
    );

    const outStart = 0.82;
    const outStep = 0.035;
    
    styles.title = combine(progress, titleIn, { ...willChange, opacity: 0 }, 0.96, outStep);
    styles.subtitle = combine(progress, subtitleIn, { ...willChange, opacity: 0 }, 0.96, outStep);
    styles.contentContainer = combine(progress, contentContainerIn, { ...willChange, opacity: 0}, 0.96, outStep);
    
    rowsIn.reverse().forEach((rowStyle, index) => {
      const rowIndex = rowsIn.length - 1 - index;
      styles[`row${rowIndex + 1}`] = combine(progress, rowStyle, { ...willChange, transform: 'translateY(40px)' }, outStart + (index * outStep), outStep);
    });

    return styles;
  };
  
  const animatedStyles = getAnimatedStyle(scrollProgress);
  
  return (
    <section 
      ref={sectionRef} 
      className="bg-black h-[900vh] md:h-[1200vh]" // Increased mobile height
    >
      <div ref={stickyContainerRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dsajhtkyy/image/upload/v1762780318/Whisk_5348b1bcc93686899394efeb6963323adr_1_nltkwu.jpg"
            alt="Современный жилой комплекс"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-start pt-16 sm:pt-24">
            <div className="text-center mb-12 max-w-4xl">
              <h2 style={animatedStyles.title} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Я нарушаю все правила продаж.</h2>
              <p style={animatedStyles.subtitle} className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Сравните сами: Поход к Застройщику <span className="font-bold text-yellow-400">VS</span> работа с экспертом на вашей стороне.
              </p>
            </div>

            {/* --- DESKTOP VERSION (TABLE) --- */}
            <div style={animatedStyles.contentContainer} className="hidden md:block w-full max-w-6xl bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700">
              <div style={animatedStyles.row1} className="grid grid-cols-12 bg-gray-900/80 font-bold text-gray-300">
                <div className="p-8 text-center text-xl col-span-3">Критерий</div>
                <div className="p-8 text-center text-xl col-span-4">Менеджер Застройщика</div>
                <div className="p-8 text-center text-xl bg-green-600/90 text-white col-span-5">Ваш личный эксперт Дарья</div>
              </div>
              <div>
                {comparisonData.map((item, index) => (
                  <div 
                    key={item.criterion} 
                    style={(animatedStyles as any)[`row${index + 1}`]}
                    className="grid grid-cols-12 group items-start"
                  >
                    <div className="p-8 font-semibold text-yellow-400 border-t border-gray-700 col-span-3 text-center text-xl">{item.criterion}</div>
                    <div className="p-8 text-gray-400 border-t border-gray-700 flex items-start col-span-4 text-lg">
                       <XIcon className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{item.developer}</span>
                    </div>
                    <div className="p-8 text-white border-t border-gray-700 flex items-start col-span-5 text-lg">
                      <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="font-medium">{item.daria}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- MOBILE VERSION (ACCORDION) --- */}
            <div style={animatedStyles.contentContainer} className="md:hidden w-full max-w-md space-y-4">
              {comparisonData.map((item, index) => (
                <div
                  key={item.criterion}
                  style={(animatedStyles as any)[`row${index + 1}`]}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full p-4 flex justify-between items-center text-left font-semibold text-yellow-400"
                    aria-expanded={activeIndex === index}
                    aria-controls={`content-mobile-${index}`}
                  >
                    <span>{item.criterion}</span>
                    <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    id={`content-mobile-${index}`}
                    className={`accordion-content ${activeIndex === index ? 'open' : ''}`}
                  >
                    <div className="max-h-[45vh] overflow-y-auto">
                        <div className="p-4 border-t border-gray-700 space-y-4">
                            <div>
                                <h4 className="font-bold text-gray-300 mb-2">Менеджер Застройщика</h4>
                                <div className="flex items-start text-gray-400">
                                    <XIcon className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                    <span>{item.developer}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-green-900/20 rounded-lg">
                                <h4 className="font-bold text-white mb-2">Ваш личный эксперт Дарья</h4>
                                <div className="flex items-start text-white">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                    <span className="font-medium">{item.daria}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;