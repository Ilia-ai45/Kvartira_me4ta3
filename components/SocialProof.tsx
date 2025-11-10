import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from './icons';

interface TrustBarItem {
    id: 'clients' | 'saved' | 'focus' | 'years';
    targetValue: number | string;
    label: string;
    suffix: string;
}

const trustBarData: TrustBarItem[] = [
  { id: 'clients', targetValue: 217, label: 'довольных клиентов', suffix: '' },
  { id: 'saved', targetValue: 350000, label: 'руб. сэкономлено клиентам', suffix: '' },
  { id: 'focus', targetValue: '100%', label: 'фокус на качестве строительства', suffix: '' },
  { id: 'years', targetValue: 6, label: 'лет на рынке новостроек Тюмени', suffix: '+' },
];

const caseStudies = [
  {
    title: "Выбор между 'красиво' и 'качественно'",
    identifier: "Анна и Виктор, IT-специалисты",
    problem: "Клиенты выбирали между двумя ЖК с похожими планировками и ценой. Реклама обоих обещала 'комфорт-класс'.",
    solution: "Я проанализировала техническую документацию. В первом ЖК использовались стандартные панели с минимальной шумоизоляцией, во втором — кирпичные перегородки и более качественные окна. Разница в цене была всего 3%, но в качестве жизни — огромна.",
    result: "Клиенты вложились в тишину и комфорт, избежав будущих трат на дополнительную звукоиоляцию."
  },
  {
    title: "Нашли скрытый дефект до покупки",
    identifier: "Семья инвесторов, Москва",
    problem: "Хотели купить апартаменты для сдачи. На фото все было идеально. Застройщик торопил со сделкой.",
    solution: "Мой опыт приемки объектов подсказал, что нужно проверить вентиляцию. Оказалось, что вентканал в санузle был смонтирован с ошибкой, что грозило плесенью. Мы настояли на исправлении до сделки.",
    result: "Застройщик устранил дефект за свой счет. Сэкономлено время, деньги и нервы будущих арендаторов."
  },
  {
    title: "Переезд вслепую с умом",
    identifier: "Алексей П., переезд из Норильска",
    problem: "Семья не знала город и выбирала по рекламным буклетам. Их выбор пал на ЖК, расположенный рядом с промзоной, о чем застройщик умолчал.",
    solution: "Провела видео-экскурсии по 5 районам, но с акцентом на экологию, розу ветров и планы развития территорий. Подготовила честный отчет по плюсам и минусам каждого.",
    result: "Семья выбрала идеальный для себя вариант в зеленом районе и избежала крайне неудачной инвестиции."
  }
];

const SocialProof: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedCounts, setDisplayedCounts] = useState({
    clients: 0,
    saved: 0,
    years: 0,
  });
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !animationTriggered) {
            setAnimationTriggered(true);
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.5 });

    const currentRef = sectionRef.current;
    if (currentRef) {
        observer.observe(currentRef);
    }

    return () => {
        if (currentRef) observer.unobserve(currentRef);
    };
  }, [animationTriggered]);

  useEffect(() => {
    if (!animationTriggered) return;

    let animationFrameId: number;
    const startTime = Date.now();
    const DURATION = 10000; // 10 seconds

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / DURATION, 1);

        // Main counter: Clients from 0 to 217
        const currentClients = Math.floor(progress * 217);

        // Time points for saved animation based on client count milestones
        const startTimeSavedStage1 = (10 / 217) * DURATION;
        const endTimeSavedStage1 = (100 / 217) * DURATION;
        const durationSavedStage1 = endTimeSavedStage1 - startTimeSavedStage1;

        const startTimeSavedStage2 = endTimeSavedStage1;
        const endTimeSavedStage2 = DURATION;
        const durationSavedStage2 = endTimeSavedStage2 - startTimeSavedStage2;

        let currentSaved = 0;
        if (elapsed >= startTimeSavedStage1 && elapsed < endTimeSavedStage1) {
            // Stage 1: Animate smoothly from 0 to 50,000
            const stage1Elapsed = elapsed - startTimeSavedStage1;
            const stage1Progress = Math.min(stage1Elapsed / durationSavedStage1, 1);
            currentSaved = Math.floor(stage1Progress * 50000);
        } else if (elapsed >= endTimeSavedStage1) {
            // Stage 2: Animate smoothly from 50,000 to 350,000
            const stage2Elapsed = elapsed - startTimeSavedStage2;
            const stage2Progress = Math.min(stage2Elapsed / durationSavedStage2, 1);
            const savedFromStage2 = stage2Progress * (350000 - 50000);
            currentSaved = 50000 + Math.floor(savedFromStage2);
        }
        
        // Years counter logic
        let currentYears = 0;
        if (currentClients >= 50) {
            const yearsStartProgress = 50 / 217;
            if (progress > yearsStartProgress) {
                const yearsProgress = (progress - yearsStartProgress) / (1 - yearsStartProgress);
                currentYears = Math.min(Math.floor(yearsProgress * 6), 6);
            }
        }

        setDisplayedCounts({
            clients: currentClients,
            saved: currentSaved,
            years: currentYears,
        });

        if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
        }
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [animationTriggered]);
  
  const nextSlide = () => setCurrentSlide((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));

  const renderValue = (item: TrustBarItem) => {
    switch(item.id) {
        case 'clients': return displayedCounts.clients.toLocaleString('ru-RU');
        case 'saved': return displayedCounts.saved.toLocaleString('ru-RU');
        case 'years': return displayedCounts.years;
        case 'focus': return item.targetValue;
        default: return '';
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Мои клиенты покупают уверенно, а не вслепую.</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Посмотрите, как инженерный подход помогает избегать <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md">дорогостоящих ошибок</span>.
          </p>
        </div>

        {/* Trust Bar */}
        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {trustBarData.map(item => (
            <div key={item.id} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col">
              <div className="flex-grow flex flex-col justify-center items-center min-h-[6rem]">
                 <p className={`font-extrabold text-green-500 ${typeof item.targetValue === 'number' && item.targetValue > 9999 ? 'text-4xl md:text-4xl' : 'text-4xl md:text-5xl'}`}>
                    {renderValue(item)}
                    {item.id === 'years' && displayedCounts.years > 0 ? item.suffix : ''}
                  </p>
              </div>
              <p className="mt-2 text-sm md:text-base text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Case Studies Slider */}
        <div className="relative bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-200">
          <div className="overflow-hidden">
             <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                 {caseStudies.map((study, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                        <p className="text-sm font-bold text-green-500 mb-2">{study.identifier}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                        <div className="space-y-4 text-gray-700">
                        <p><strong className="text-gray-900">Проблема:</strong> {study.problem}</p>
                        <p><strong className="text-gray-900">Решение инженера:</strong> {study.solution}</p>
                        <p className="bg-green-100 p-3 rounded-lg"><strong className="text-green-500">Результат:</strong> {study.result}</p>
                        </div>
                    </div>
                ))}
             </div>
          </div>
           <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-gray-100 rounded-full p-2 shadow-md transition z-10">
                <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-gray-100 rounded-full p-2 shadow-md transition z-10">
                <ChevronRightIcon className="h-6 w-6 text-gray-800" />
            </button>
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                    <QuoteIcon className="h-10 w-10 text-green-500 mb-4" />
                    <p className="text-lg italic text-gray-700">
                        "Дарья, спасибо. С вами я чувствовала себя как за каменной стеной. Юридическая проверка была на высшем уровне."
                    </p>
                </div>
                <div className="flex items-center mt-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-xl mr-4 flex-shrink-0">
                        МЛ
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Марина Л.</p>
                        <p className="text-sm text-gray-600">юрист</p>
                    </div>
                </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                    <QuoteIcon className="h-10 w-10 text-green-500 mb-4" />
                    <p className="text-lg italic text-gray-700">
                        "Мы не знали город от слова совсем. Дарья стала нашими глазами и ушами, уберегла от покупки в откровенно плохом районе."
                    </p>
                </div>
                <div className="flex items-center mt-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-xl mr-4 flex-shrink-0">
                        АП
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Алексей П.</p>
                        <p className="text-sm text-gray-600">переезд из Норильска</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;