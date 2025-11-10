import * as React from 'react';

// --- This hook is responsible for animating the numbers in the stats ---
const useCountUp = (end: number, duration = 2) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round((duration * 1000) / frameRate);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let frame = 0;
                    const counter = setInterval(() => {
                        frame++;
                        const progress = frame / totalFrames;
                        const currentCount = Math.round(end * progress);
                        setCount(currentCount);

                        if (frame === totalFrames) {
                            clearInterval(counter);
                            setCount(end);
                        }
                    }, frameRate);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [end, duration, totalFrames]);

    return [count, ref] as const;
};

// --- Helper function for formatting numbers ---
const formatNumber = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

// --- Component for a single stats item ---
const TrustBarItem: React.FC<{ value: number; label: string; suffix?: string; duration?: number }> = ({ value, label, suffix = '', duration }) => {
    const [count, ref] = useCountUp(value, duration);
    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold text-amber-400">
                {formatNumber(count)}{suffix}
            </p>
            <p className="text-sm text-gray-400 mt-1">{label}</p>
        </div>
    );
};

// --- DATA: Real cases ---
const cases = [
    {
        id: "case1",
        identifier: "Анна и Виктор, IT-специалисты",
        problem: "Клиентам 5 раз отказывали в ипотеке на новостройку из-за статуса ИП и старых долгов. Застройщик не хотел ими заниматься.",
        solution: "Я провела полную 'очистку' кредитной истории, собрала пакет документов и подала заявку через моего менеджера в банке-партнере, который специализируется на сложных клиентах.",
        result: "Ипотека одобрена под 11.2%. Клиенты купили 2-комнатную квартиру в районе Дом Обороны."
    },
    {
        id: "case2",
        identifier: "Семья инвесторов, Москва",
        problem: "Хотели купить 3 апартамента для сдачи. Застройщик (лидер рынка) дал 'финальную' скидку 2%.",
        solution: "Я знала, что у этого застройщика есть 'скрытый' бюджет на маркетинг. Мы вышли на сделку в конце месяца, и я согласовала дополнительную скидку 4% как 'оптовому' покупателю + паркинг в подарок.",
        result: "Дополнительная экономия 3.2 млн рублей."
    },
    {
        id: "case3",
        identifier: "Екатерина, переезд из Нового Уренгоя",
        problem: "Клиентка покупала квартиру дистанционно и боялась выбрать неудачный район или столкнуться с мошенничеством.",
        solution: "Я провела серию видео-экскурсий по районам и ЖК, предоставила полный юридический аудит выбранного объекта и организовала полностью дистанционную сделку с электронной регистрацией.",
        result: "Квартира куплена безопасно, без единого визита в Тюмень. Клиентка сэкономила время и деньги на перелетах."
    }
];

// --- DATA: Testimonials ---
const testimonials = [
    {
        quote: "Дарья, спасибо. С вами я чувствовала себя как за каменной стеной. Юридическая проверка была на высшем уровне.",
        name: "Марина Л., юрист"
    },
    {
        quote: "Мы не знали город от слова совсем. Дарья стала нашими глазами и ушами, уберегла от покупки в откровенно плохом районе.",
        name: "Алексей П., переезд из Норильска"
    },
     {
        quote: "Это была наша первая покупка квартиры. Дарья все подробно объяснила, помогла с ипотекой и документами. Все прошло гладко и без стресса!",
        name: "Анна и Дмитрий"
    }
];

// --- Component for a single testimonial ---
const MessengerReview: React.FC<typeof testimonials[0]> = ({ quote, name }) => (
    <div className="flex flex-col h-full animate-reveal anim-scale-in">
        <div className="bg-stone-800 p-6 rounded-xl shadow-md border border-stone-700 flex-grow">
            <p className="text-gray-300">"{quote}"</p>
        </div>
        <div className="mt-4 text-right">
            <p className="font-bold text-white">{name}</p>
        </div>
    </div>
);

// --- Slider component for "Real Cases" ---
const CaseSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextCase = () => setCurrentIndex((prev) => (prev + 1) % cases.length);
    const prevCase = () => setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);

    return (
        <div className="bg-stone-800 rounded-2xl p-6 md:p-10 shadow-lg border border-stone-700 relative overflow-hidden">
            <div className="relative h-[280px] sm:h-[220px]">
                {cases.map((caseItem, index) => (
                    <div 
                        key={caseItem.id} 
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        <h4 className="font-semibold text-lg text-amber-400 mb-4">{caseItem.identifier}</h4>
                        <dl className="space-y-4">
                            <div>
                                <dt className="font-bold text-white">Проблема:</dt>
                                <dd className="text-gray-400">{caseItem.problem}</dd>
                            </div>
                            <div>
                                <dt className="font-bold text-white">Решение Дарьи:</dt>
                                <dd className="text-gray-400">{caseItem.solution}</dd>
                            </div>
                             <div>
                                <dt className="font-bold text-white">Результат:</dt>
                                <dd className="text-gray-300 font-semibold">{caseItem.result}</dd>
                            </div>
                        </dl>
                    </div>
                ))}
            </div>
            {/* Slider navigation buttons */}
            <div className="absolute bottom-6 right-6 flex items-center space-x-3">
                <button onClick={prevCase} aria-label="Previous case" className="bg-black/50 text-white rounded-full p-2 focus:outline-none z-10 hover:bg-black/75 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button onClick={nextCase} aria-label="Next case" className="bg-black/50 text-white rounded-full p-2 focus:outline-none z-10 hover:bg-black/75 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT FOR THE BLOCK ---
const CaseStudies: React.FC = () => {
    return (
        <section id="social-proof" className="py-24 bg-stone-900/70">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-reveal anim-fade-up">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Мои клиенты уже сэкономили 87 400 000 ₽ на покупке. Посмотрите, как</h2>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-reveal anim-fade-up">
                    <TrustBarItem value={8} suffix="+" label="лет на рынке новостроек" />
                    <TrustBarItem value={140} suffix="+" label="семей получили ключи" />
                    <TrustBarItem value={1200000} suffix=" ₽" label="средняя экономия клиента" />
                    <TrustBarItem value={100} suffix="%" label="гарантия юридической чистоты" />
                </div>
                
                {/* Real Cases (Slider) */}
                <div className="animate-reveal anim-fade-up mb-20" style={{'--delay': '0.2s'} as React.CSSProperties}>
                    <CaseSlider />
                </div>
                
                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} style={{'--delay': `${index * 0.1}s`} as React.CSSProperties}>
                            <MessengerReview {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;