import React from 'react';
import { CheckBadgeIcon } from './icons';

const achievements = [
    'Высшее образование "Промышленное и гражданское строительство" (ПГС) с отличием',
    'Опыт приемки загородной недвижимости у застройщиков',
    'Управленческий опыт: открыла более 50 филиалов МФЦ в регионе',
    'Глубокое знание строительных норм (СНиП) и технологий'
];

const About: React.FC = () => {
    return (
        <section className="relative py-16 sm:py-20 bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    src="https://res.cloudinary.com/dsajhtkyy/video/upload/q_auto:good,w_1920,c_limit/v1762619159/%D1%8F%D0%BD-2_gggqei.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                ></video>
                <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-10 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-4">
                         <img
                          src="https://res.cloudinary.com/dsajhtkyy/image/upload/v1761838062/photo_2025-10-29_17-49-52_ut603i.jpg"
                          alt="Дарья Бугровская, эксперт по новостройкам в Тюмени"
                          loading="lazy"
                          className="rounded-2xl shadow-2xl object-cover w-full h-full border-4 border-gray-800"
                        />
                    </div>
                    <div className="md:col-span-6">
                        <h2 className="text-3xl font-extrabold text-white mb-4">Ваш эксперт по недвижимости — Дарья Бугровская</h2>
                        <blockquote className="border-l-4 border-green-500 pl-6 my-6 text-gray-300 text-lg space-y-4">
                            <p className="italic">
                                "Я не 'продажник' в классическом понимании. Я — инженер-строитель, который пришел в недвижимость, чтобы защищать интересы покупателей.
                            </p>
                            <p className="italic">
                                <strong className="not-italic font-bold text-white">Моя цель</strong> — не 'продать' вам квартиру, а убедиться, что вы инвестируете в качественный, надежный и ликвидный актив, который будет радовать вас долгие годы."
                            </p>
                        </blockquote>
                        <p className="text-gray-300 mt-6">
                           Я лично знакома со всеми застройщиками Тюмени. Знаю их сильные и слабые стороны не из рекламных брошюр, а из технической документации и реальных объектов. Это позволяет мне видеть полную картину и находить варианты, о которых вы не узнаете в отделе продаж.
                        </p>
                        <div className="space-y-3 mt-8">
                            {achievements.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <CheckBadgeIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                    <span className="text-gray-200 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;