import React, { useState, useMemo, useEffect } from 'react';

// --- DATA: Real cases ---
const cases = [
    {
        title: "ЖК 'Европейский берег'",
        subtitle: "2-комнатная для молодой семьи",
        imageUrls: [
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761740649/XXXL_pbux11.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761740647/XXXL_3_jtrksz.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761740632/XXXL_1_xe818h.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761740622/photo_2025-09-09_15-22-08_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_thjv1i.jpg"
        ],
        results: [
            "Сэкономили 350 000 ₽ на скидке от застройщика",
            "Одобрили IT-ипотеку под 5%",
            "Сделка проведена за 7 дней"
        ]
    },
    {
        title: "ЖК 'Новин квартал'",
        subtitle: "Студия для инвестиций",
        imageUrls: [
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761742393/XXXL_hgwjod.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761742391/XXXL_4_mcwtq2.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761742389/XXXL_2_n4bdhc.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761742388/XXXL_1_cfgthc.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761742378/photo_2025-10-29_17-51-38_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_zzkmyz.jpg"
        ],
        results: [
            "Найден вариант на 200 000 ₽ ниже рынка",
            "Проведена полная юридиеская проверка",
            "Дистанционная сделка для клиента из Сургута"
        ]
    },
    {
        title: "ЖК 'Ария'",
        subtitle: "3-шка для многодетной семьи",
        imageUrls: [
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761743077/XXXL_3_ahzsg9.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761743081/XXXL_aczcrm.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761743077/XXXL_2_ftizzj.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761743080/XXXL_4_a4rgo2.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761743076/XXXL_1_kxkwhy.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761743083/photo_2025-10-29_18-02-49_nxcsql.jpg"
        ],
        results: [
            "Найден эксклюзивный вариант, не доступный в открытой продаже",
            "Помощь в одобрении сложной ипотеки",
            "Организован ускоренный выход на сделку",
            "Анастасия, Я вас не забыла, ваш кейс как обещала выкладываю)"
        ]
    },
    {
        title: "ЖК 'Сердце Сибири'",
        subtitle: "Квартира-студия для студента",
        imageUrls: [
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761745349/XXXL_2_c1ikt0.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761745350/XXXL_5_s1qpbs.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761745352/XXXL_tuvlbo.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761745347/XXXL_1_ly7wto.webp",
            "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761745707/photo_2025-10-29_18-47-22_zk91xg.jpg"
        ],
        results: [
            "Помощь в получении ипотеки без первоначального взноса",
            "Квартира найдена и забронирована за 1 день",
            "Полное юридическое сопровождение на всех этапах"
        ]
    }
];

// --- Case card component (with slider logic) ---
type CaseCardProps = {
    caseItem: typeof cases[0];
};

const CaseCard: React.FC<CaseCardProps> = ({ caseItem }) => {
    const slides = useMemo(() => {
        if (caseItem.imageUrls.length <= 1) {
            return caseItem.imageUrls;
        }
        const first = caseItem.imageUrls[0];
        const last = caseItem.imageUrls[caseItem.imageUrls.length - 1];
        return [last, ...caseItem.imageUrls, first];
    }, [caseItem.imageUrls]);

    const [currentIndex, setCurrentIndex] = useState(slides.length > 1 ? 1 : 0);
    const [transitionClass, setTransitionClass] = useState('transition-transform ease-out duration-500');

    const handleTransitionEnd = () => {
        if (currentIndex === 0) {
            setTransitionClass('');
            setCurrentIndex(slides.length - 2);
        }
        if (currentIndex === slides.length - 1) {
            setTransitionClass('');
            setCurrentIndex(1);
        }
    };
    
    useEffect(() => {
        if (transitionClass === '') {
            const timer = setTimeout(() => setTransitionClass('transition-transform ease-out duration-500'), 50);
            return () => clearTimeout(timer);
        }
    }, [transitionClass]);

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (slides.length <= 1) return;
        setCurrentIndex(prev => prev - 1);
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (slides.length <= 1) return;
        setCurrentIndex(prev => prev + 1);
    };
    
    const goToSlide = (slideIndex: number) => {
        if (slides.length <= 1) return;
        setTransitionClass('transition-transform ease-out duration-500');
        setCurrentIndex(slideIndex + 1);
    };
    
    const getDotIndex = () => {
        if (slides.length <= 1) return 0;
        if (currentIndex === 0) return caseItem.imageUrls.length - 1;
        if (currentIndex === slides.length - 1) return 0;
        return currentIndex - 1;
    }
    
    const dotIndex = getDotIndex();

    return (
        <div className="bg-stone-800 rounded-lg shadow-lg overflow-hidden border border-stone-700 flex flex-col h-full">
            <div className="relative h-56 w-full overflow-hidden group bg-[#A6937B]">
                <div 
                    className={`flex h-full ${transitionClass}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {slides.map((url, index) => (
                        <img key={index} src={url} alt={`${caseItem.title} - фото ${index + 1}`} className="w-full h-full object-contain flex-shrink-0" loading="lazy" />
                    ))}
                </div>
                
                <button onClick={prevSlide} aria-label="Previous image" className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 focus:outline-none z-10 hover:bg-black/75">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button onClick={nextSlide} aria-label="Next image" className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 focus:outline-none z-10 hover:bg-black/75">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                    {caseItem.imageUrls.map((_, slideIndex) => (
                        <button key={slideIndex} onClick={() => goToSlide(slideIndex)} aria-label={`Go to image ${slideIndex + 1}`} className={`w-2 h-2 rounded-full transition-colors ${dotIndex === slideIndex ? 'bg-gray-800' : 'bg-gray-800/50 hover:bg-gray-800/75'}`}></button>
                    ))}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-white">{caseItem.title}</h3>
                <p className="text-gray-400 mb-4">{caseItem.subtitle}</p>
                <ul className="space-y-2 text-sm mt-auto">
                    {caseItem.results.map((result, i) => (
                        <li key={i} className="flex items-start">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-gray-300">{result}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- Main component to be imported ---
const RealCasesBlock: React.FC = () => {
    return (
        <section id="cases" className="py-24 bg-stone-900">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-reveal anim-fade-up">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Реальные кейсы и решённые задачи</h2>
                    <p className="text-base sm:text-lg text-gray-400">
                        Лучше всего о моей работе говорят результаты моих клиентов.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {cases.map((caseItem, index) => (
                        <div key={index} className="animate-reveal anim-fade-up" style={{'--delay': `${index * 0.1}s`} as React.CSSProperties}>
                            <CaseCard caseItem={caseItem} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealCasesBlock;