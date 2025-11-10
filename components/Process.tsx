import React, { useState, useEffect, useRef } from 'react';
import { AnalysisIcon, HandshakeIcon, ShieldIcon, KeysIcon } from './icons';

const processSteps = [
  {
    icon: <AnalysisIcon className="h-8 w-8 text-black" />,
    title: 'Подбор и Анализ',
    description: 'Вы проходите квиз и на 15-минутной консультации мы определяем ваши реальные потребности. Я готовлю объективный анализ ТОП-5 вариантов (плюсы, минусы, риски).',
  },
  {
    icon: <HandshakeIcon className="h-8 w-8 text-black" />,
    title: 'Показ и Согласование',
    description: 'Мы едем смотреть только лучшие варианты. Теперь, когда вы видите полную картину, вы можете принять взвешенное решение. Я добиваюсь от застройщика лучших условий.',
  },
  {
    icon: <ShieldIcon className="h-8 w-8 text-black" />,
    title: 'Юридическое Сопровождение и Ипотека',
    description: 'Мой ипотечный брокер одобряет вам лучшую ставку в день подачи. Мои юристы проверяют каждую букву в ДДУ. Вы полностью защищены.',
  },
  {
    icon: <KeysIcon className="h-8 w-8 text-black" />,
    title: 'Сделка и Ключи',
    description: 'Вы подписываете договор и празднуете новоселье. Мои услуги на всех этапах для вас бесплатны.',
  },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to animate once
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Start animation when 20% of the component is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  // Using arbitrary values with Tailwind's JIT compiler for dynamic delays
  const stepDelays = [
    { icon: 'delay-[400ms]', text: 'delay-[500ms]' },
    { icon: 'delay-[700ms]', text: 'delay-[800ms]' },
    { icon: 'delay-[1000ms]', text: 'delay-[1100ms]' },
    { icon: 'delay-[1300ms]', text: 'delay-[1400ms]' },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          src="https://res.cloudinary.com/dsajhtkyy/video/upload/q_auto:good,w_1920,c_limit/v1761727502/8440330-hd_1920_1080_25fps_mwneby.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-gray-900/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-extrabold text-white transition-all transform duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Ваш путь к квартире в 4 прозрачных шага
          </h2>
          <p className={`mt-4 text-lg text-gray-300 max-w-3xl mx-auto transition-all transform duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Процесс работы со мной прост, логичен и безопасен. Никаких сюрпризов, только результат.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div 
              className={`absolute left-7 sm:left-8 top-0 h-full w-1 bg-gray-600 opacity-50 transition-transform duration-1000 ease-in-out origin-top delay-300 ${isVisible ? 'scale-y-100' : 'scale-y-0'}`} 
              aria-hidden="true"
            ></div>
            
            <ul className="space-y-12">
              {processSteps.map((step, index) => (
                <li key={index} className="relative pl-20 sm:pl-24">
                  <div className={`absolute left-0 top-0 flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 bg-green-500 rounded-full shadow-lg border-4 border-transparent transition-all transform duration-500 ease-out ${stepDelays[index].icon} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    {step.icon}
                  </div>
                  <div className={`pt-2 transition-all transform duration-500 ease-out ${stepDelays[index].text} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
                    <h3 className="text-xl font-bold text-white mb-2">{`Шаг ${index + 1}: ${step.title}`}</h3>
                    <p className="text-gray-200">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;