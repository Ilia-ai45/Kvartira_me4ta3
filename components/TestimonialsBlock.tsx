// ./components/TestimonialsBlock.tsx

import React from 'react';

// --- ДАННЫЕ: Отзывы ---
const testimonials = [
    {
        quote: "Дарья — настоящий профессионал! Помогла нам найти идеальную квартиру в новостройке и провела сделку от начала до конца. Очень благодарны за ее работу и терпение.",
        name: "Семья Ивановых",
        avatar: "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761748407/%D0%B8%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D1%8B_luxope.jpg"
    },
    {
        quote: "Рекомендую Дарью всем, кто ищет недвижимость в Тюмени. Она отлично знает рынок, всех застройщиков и всегда на связи. Сэкономила мне кучу времени и нервов.",
        name: "Алексей Тверин",
        avatar: "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761748606/%D1%82%D0%B2%D0%B5%D1%80%D0%B8%D0%BD_t8amvr.jpg"
    },
    {
        quote: "Это была наша первая покупка квартиры. Дарья все подробно объяснила, помогла с ипотекой и документами. Все прошло гладко и без стресса!",
        name: "Анна и Дмитрий",
        avatar: "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761748957/%D0%B0%D0%BD%D0%BD%D0%B0_%D0%B8_%D0%B4%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_nhp29i.jpg"
    },
    {
        quote: "Купили квартиру, находясь в другом городе. Дарья все организовала на высшем уровне: онлайн-показ, полное сопровождение сделки. Очень удобно и надежно!",
        name: "Екатерина, г. Новый Уренгой",
        avatar: "https://res.cloudinary.com/dsajhtkyy/image/upload/v1761749043/%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9_%D1%83%D1%80%D0%B5%D0%BD%D0%B3%D0%BE%D0%B9_fzav1m.jpg"
    }
];

// --- Главный компонент, который вы будете импортировать ---
const TestimonialsBlock: React.FC = () => {
    return (
        <section id="reviews" className="py-24 bg-zinc-900">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-reveal anim-fade-up">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Что говорят мои клиенты</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-zinc-800 p-8 rounded-lg shadow-md border border-zinc-700 flex flex-col h-full animate-reveal anim-scale-in" style={{'--delay': `${index * 0.1}s`} as React.CSSProperties}>
                            <p className="text-gray-300 mb-6 flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-auto">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 object-cover" />
                                <div>
                                    <p className="font-bold text-white">{testimonial.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 animate-reveal anim-fade-up" style={{'--delay': '0.3s'} as React.CSSProperties}>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeq5sb8wdBZxFAZWSXqgTcWH4DQ3WOcgHlDPRY_FyIJyWz06g/viewform?usp=sharing&ouid=110097416081346053566" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-amber-500 text-gray-900 font-bold text-lg px-8 py-3 rounded-lg shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all duration-300"
                    >
                        Оставить отзыв
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsBlock;
