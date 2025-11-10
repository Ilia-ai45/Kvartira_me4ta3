import React, { useState, useEffect, useRef } from 'react';
import { TelegramIcon } from './icons';
import { GoogleGenAI } from "@google/genai";

const quizData = [
  {
    question: "Для каких целей ищете квартиру?",
    options: ["Для себя", "Инвестиция (сдача)", "Перепродажа", "Для детей/родителей"],
    tags: {
        "Для себя": "dlya-sebya",
        "Инвестиция (сдача)": "invest-rent",
        "Перепродажа": "invest-resale",
        "Для детей/родителей": "dlya-semi"
    }
  },
  {
    question: "Что для вас в приоритете в расположении?",
    options: ["Центр города", "Тихий спальный район", "Экология и парки", "Развитая инфраструктура"],
    tags: {
        "Центр города": "location-center",
        "Тихий спальный район": "location-quiet",
        "Экология и парки" : "location-eco",
        "Развитая инфраструктура": "location-infra"
    }
  },
   {
    question: "Что важнее в качестве дома?",
    options: ["Толщина стен/шумоизоляция", "Качество окон и отделки", "Надежность застройщика", "Не разбираюсь, доверяю вам"],
    tags: {
        "Толщина стен/шумоизоляция": "quality-walls",
        "Качество окон и отделки": "quality-windows",
        "Надежность застройщика": "quality-developer",
        "Не разбираюсь, доверяю вам": "quality-trust"
    }
  },
  {
    question: "Какой у вас бюджет и форма оплаты?",
    options: ["до 5 млн ₽, ипотека", "5-10 млн ₽, ипотека", "10+ млн ₽, ипотека", "100% оплата / Рассрочка"],
    tags: {
        "до 5 млн ₽, ипотека": "budget-5",
        "5-10 млн ₽, ипотека": "budget-10",
        "10+ млн ₽, ипотека": "budget-15",
        "100% оплата / Рассрочка": "payment-full"
    }
  },
  {
    question: "Если рассматриваете покупку в ипотеку, то на каких условиях:",
    options: [
        "Семейная ипотека до 6%",
        "Ипотека для IT до 6%",
        "Сельская ипотека до 3%",
        "Военная ипотека от 6%",
        "Базовая ставка от 16%",
        "100% оплата / Не нужна ипотека",
    ],
    tags: {
        "Семейная ипотека до 6%": "mortgage-family",
        "Ипотека для IT до 6%": "mortgage-it",
        "Сельская ипотека до 3%": "mortgage-rural",
        "Военная ипотека от 6%": "mortgage-mil",
        "Базовая ставка от 16%": "mortgage-base",
        "100% оплата / Не нужна ипотека": "payment-full"
    }
  },
];

// --- SIMULATED PRIVATE REALTOR DATABASE ---
interface Apartment {
  id: number;
  rooms: 'Студия' | '1' | '2' | '3' | '4+';
  price: number;
  imageUrl: string;
  features: string[];
  tags: string[];
  publishDate: string; // ISO date string for sorting
}

const privateRealtorDatabase: Apartment[] = [
    { id: 1, rooms: '1', price: 4800000, imageUrl: 'https://cdn1.telegram-cdn.org/file/Z-F_wK6B1_t0oT6Fh5c_I_8_iO4V_d_1xJa_lC5L3n-R_x_95-G-2nZ54qO7iP7p-qS3u_W-z2W_q6i_L3p7i_S2c_Z_n5w7C6d5S2_1R3z5_v5C4k5M2B3j3g3H5t2a_d4M3x_s2.jpg', features: ['Видовые характеристики', 'Подземный паркинг', 'Закрытая продажа'], tags: ['dlya-sebya', 'location-center', 'quality-developer', 'budget-5', 'mortgage-it', 'rooms-1'], publishDate: '2025-10-28T10:00:00Z' },
    { id: 2, rooms: '2', price: 7200000, imageUrl: 'https://cdn1.telegram-cdn.org/file/e-bqAM2F29s0vS2Fh8b0I99-hO1V1u_2wJb-mC6L2o-S_w_74-F-3mX65pP8hQY2o9R4t_V12z3V9p7h_K2o8h3S5c3Z2n8w8B9d8S3_2R4z6_3v6C7k6M5B4j4g4H6t5a3d7M4x3s5.jpg', features: ['Выход на набережную', 'Закрытый двор', 'Современная архитектура'], tags: ['dlya-semi', 'location-quiet', 'quality-walls', 'budget-10', 'mortgage-family', 'rooms-2'], publishDate: '2025-10-29T11:00:00Z' },
    { id: 3, rooms: 'Студия', price: 4100000, imageUrl: 'https://cdn1.telegram-cdn.org/file/f-N-wK4B3-u0pT4Fh7d-I88_iO2V0d_3xJa-lC7L1n-R_x_85-G-4nZ74qO9iP9p-qS5u_W03z4W8q8i_L1p9i2S4c2Z3n7w9C8d7S4_3R5z7_2v7C6k7M4B5j5g5H7t4a2d6M5x2s4.jpg', features: ['Рядом с парком', 'Компактные планировки', 'Развитая инфраструктура'], tags: ['invest-rent', 'location-eco', 'quality-windows', 'budget-5', 'mortgage-base', 'rooms-studio'], publishDate: '2025-10-27T09:30:00Z' },
    { id: 4, rooms: '3', price: 9500000, imageUrl: 'https://cdn1.telegram-cdn.org/file/e-bqAM2F29s0vS2Fh8b0I99-hO1V1u_2wJb-mC6L2o-S_w_74-F-3mX65pP8hQY2o9R4t_V12z3V9p7h_K2o8h3S5c3Z2n8w8B9d8S3_2R4z6_3v6C7k6M5B4j4g4H6t5a3d7M4x3s5.jpg', features: ['Своя школа и дет. сад', 'Безопасные дворы', 'Скидка от подрядчика'], tags: ['dlya-semi', 'location-infra', 'quality-developer', 'budget-10', 'mortgage-family', 'rooms-3'], publishDate: '2025-10-30T14:00:00Z' },
    { id: 5, rooms: '2', price: 6800000, imageUrl: 'https://cdn1.telegram-cdn.org/file/e-bqAM2F29s0vS2Fh8b0I99-hO1V1u_2wJb-mC6L2o-S_w_74-F-3mX65pP8hQY2o9R4t_V12z3V9p7h_K2o8h3S5c3Z2n8w8B9d8S3_2R4z6_3v6C7k6M5B4j4g4H6t5a3d7M4x3s5.jpg', features: ['Большой ТРЦ рядом', 'Хорошая транспортная доступность', 'Готовая отделка'], tags: ['dlya-sebya', 'location-infra', 'quality-trust', 'budget-10', 'mortgage-base', 'rooms-2'], publishDate: '2025-10-25T18:00:00Z' },
    { id: 6, rooms: '1', price: 4300000, imageUrl: 'https://cdn1.telegram-cdn.org/file/O-C_xK_A_9q0nS_Ei_c7I_67jO_U_c90wJZ_kC_L_m-S_w-6_E-_mY_3oO_hP_p-oR_t_U_0z_V_o_i_L_o_h_S_c-Z_n-w-C-d-S-1R-z-v-C-k-M-B-j-g-H-t-a-d-M-x-s.jpg', features: ['Перспективный район', 'Доступная цена', 'Новая застройка'], tags: ['invest-resale', 'location-quiet', 'quality-trust', 'budget-5', 'mortgage-base', 'rooms-1'], publishDate: '2025-10-30T10:00:00Z' },
    { id: 7, rooms: '3', price: 11500000, imageUrl: 'https://cdn1.telegram-cdn.org/file/e-bqAM2F29s0vS2Fh8b0I99-hO1V1u_2wJb-mC6L2o-S_w_74-F-3mX65pP8hQY2o9R4t_V12z3V9p7h_K2o8h3S5c3Z2n8w8B9d8S3_2R4z6_3v6C7k6M5B4j4g4H6t5a3d7M4x3s5.jpg', features: ['Бизнес-класс', 'Вид на Туру', 'Высокие потолки'], tags: ['dlya-sebya', 'location-center', 'quality-walls', 'budget-15', 'mortgage-it', 'rooms-3'], publishDate: '2025-10-26T12:00:00Z' },
    { id: 8, rooms: 'Студия', price: 3900000, imageUrl: 'https://cdn1.telegram-cdn.org/file/f-N-wK4B3-u0pT4Fh7d-I88_iO2V0d_3xJa-lC7L1n-R_x_85-G-4nZ74qO9iP9p-qS5u_W03z4W8q8i_L1p9i2S4c2Z3n7w9C8d7S4_3R5z7_2v7C6k7M4B5j5g5H7t4a2d6M5x2s4.jpg', features: ['Экологичный район', 'Спортивные площадки', 'Лесопарк рядом'], tags: ['invest-rent', 'location-eco', 'quality-windows', 'budget-5', 'mortgage-base', 'rooms-studio'], publishDate: '2025-10-29T16:45:00Z' },
];
// --- END OF DATABASE ---

type QuizStep = 'quiz' | 'form' | 'processing' | 'result';

interface QuizProps {
  onPolicyClick: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onPolicyClick }) => {
  const quizFormRef = useRef<HTMLDivElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [step, setStep] = useState<QuizStep>('quiz');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priorities, setPriorities] = useState('');
  const [rooms, setRooms] = useState<string | null>('Студия');
  
  const [isUrgentBuyer, setIsUrgentBuyer] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // New state for AI results
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [recommendedFlats, setRecommendedFlats] = useState<Apartment[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);


  useEffect(() => {
    try {
      const storedAttempts = parseInt(localStorage.getItem('quizAttempts') || '0', 10);
      setAttempts(storedAttempts);
      if (storedAttempts >= 3) {
        setIsBlocked(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (step === 'result') {
        const timer = setTimeout(() => {
            setIsResultVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    } else {
        setIsResultVisible(false);
    }
  }, [step]);


  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('form');
    }
  };
  
  const generateAnalysis = async (leadData: any) => {
    if (!process.env.API_KEY) {
      console.error("API_KEY is not set.");
      return "Ошибка: Ключ API не настроен. Анализ не может быть сгенерирован.";
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    const currentDate = new Date().toLocaleDateString('ru-RU');

    const prompt = `
      Ты — ведущий эксперт-аналитик по рынку недвижимости Тюмени. Твоя задача — сгенерировать краткий, но веский анализ для клиента, который оставил заявку. Анализ должен подчеркнуть твою экспертизу и показать, что ты владеешь самой свежей информацией.

      **Дата анализа:** ${currentDate}

      **Запрос клиента:**
      - Цель: ${leadData.answers[0]}
      - Приоритет по расположению: ${leadData.answers[1]}
      - Приоритет по качеству: ${leadData.answers[2]}
      - Бюджет и оплата: ${leadData.answers[3]}
      - Ипотека: ${leadData.answers[4]}
      - Желаемое кол-во комнат: ${leadData.rooms}

      **Источники (мысленно проанализируй их, не переходя по ссылкам):**
      - **Официальные данные:** наш.дом.рф, cian.ru, etagi.com
      - **Региональные новости (за последнюю неделю):** 72.ru/realty, vsluh.ru/realty
      - **Закрытые данные от застройщиков (инсайды):** Упомяни, что владеешь информацией о старте закрытых продаж, скрытых скидках от подрядчиков и динамике бронирования в популярных ЖК.

      **Твоя задача — сгенерировать отчет в формате Markdown со следующей структурой. Каждый пункт — не более 4-5 предложений.**

      ### 1. Анализ рынка Тюмени на ${currentDate}
      Опиши текущее состояние рынка новостроек, динамику цен, спрос и ключевые тренды (например, "спрос смещается в сторону семейных форматов", "застройщики анонсировали повышение цен" и т.д.).

      ### 2. Рекомендации по вашему запросу
      Дай краткий совет, на что клиенту стоит обратить внимание, исходя из его ответов. Например: "С вашим бюджетом и IT-ипотекой сейчас лучшее время рассмотреть объекты в районе X, где скоро старт продаж" или "Для инвестиций под сдачу сейчас наиболее ликвидны студии в районе Y".
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating analysis:", error);
        return "Не удалось сгенерировать анализ. Пожалуйста, попробуйте позже или свяжитесь со мной напрямую.";
    }
  };

  const getRecommendations = (leadData: any): Apartment[] => {
      const { rooms, answers } = leadData;
      const budgetAnswer = answers[3] as string | undefined;

      let filteredFlats = privateRealtorDatabase;

      // 1. Filter by number of rooms
      if (rooms) {
          filteredFlats = filteredFlats.filter(flat => flat.rooms === rooms);
      }

      // 2. Filter by budget/price
      if (budgetAnswer) {
          if (budgetAnswer.includes('до 5 млн')) {
              filteredFlats = filteredFlats.filter(flat => flat.price <= 5000000);
          } else if (budgetAnswer.includes('5-10 млн')) {
              filteredFlats = filteredFlats.filter(flat => flat.price > 5000000 && flat.price <= 10000000);
          } else if (budgetAnswer.includes('10+ млн')) {
              filteredFlats = filteredFlats.filter(flat => flat.price > 10000000);
          }
          // If "100% оплата" is chosen, we don't apply a price filter, leaving a broader selection.
      }
      
      // 3. Sort by publish date (newest first)
      filteredFlats.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

      // 4. Return the top 3 most recent and relevant results
      return filteredFlats.slice(0, 3);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStep('processing');
    setIsGenerating(true);

    const leadData = {
        name,
        phone,
        rooms,
        priorities,
        isUrgentBuyer,
        answers,
        timestamp: new Date().toISOString()
    };
    
    // NOTE FOR DEVELOPER: This is where you would send `leadData` to your backend.
    // Example: fetch('/api/new-lead', { method: 'POST', body: JSON.stringify(leadData) });
    console.log("Lead Data Prepared for Backend:", leadData);


    try {
        await new Promise(resolve => setTimeout(resolve, 50)); 
        
        const recommendations = getRecommendations(leadData);
        const analysis = await generateAnalysis(leadData);
        
        setAnalysisResult(analysis);
        setRecommendedFlats(recommendations);

        const currentAttempts = parseInt(localStorage.getItem('quizAttempts') || '0', 10);
        const newAttempts = currentAttempts + 1;
        localStorage.setItem('quizAttempts', newAttempts.toString());
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
            setIsBlocked(true);
        }

    } catch (error) {
        console.error("Failed to get results:", error);
        setAnalysisResult("Произошла ошибка при подготовке вашего анализа. Пожалуйста, свяжитесь со мной напрямую.");
        setRecommendedFlats([]);
    } finally {
        setIsGenerating(false);
        setStep('result');
    }
  };


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('7') || input.startsWith('8')) {
        input = input.substring(1);
    }
    input = input.substring(0, 10);

    let formatted = '';
    if (input.length > 0) {
        formatted = '+7 (' + input.substring(0, 3);
    }
    if (input.length >= 4) {
        formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
        formatted += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
        formatted += '-' + input.substring(8, 10);
    }
    
    setPhone(formatted || (e.target.value.startsWith('+') ? '+' : ''));
  };

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  const attemptsLeft = 3 - attempts;

  const getAttemptsText = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'раз';
    }
    return 'раза';
  };

  const getSummary = () => {
    const purpose = answers[0] || 'Не указана';
    const budgetRaw = answers[3] || 'Не указан';
    const mortgage = answers[4] || 'Не указан';
    
    let budget = 'Не указан';
    if (budgetRaw.includes('до 5 млн')) budget = 'до 5 млн ₽';
    else if (budgetRaw.includes('5-10 млн')) budget = '5-10 млн ₽';
    else if (budgetRaw.includes('10+ млн')) budget = '10+ млн ₽';
    else if (budgetRaw.includes('100%')) budget = '100% оплата';
    
    return { purpose, rooms: rooms || 'Не указано', budget, mortgage };
  };

  const summary = getSummary();


  return (
    <section className="bg-black py-16 sm:py-20 overflow-hidden text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Начните с консультации, а не с поиска</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Рынок меняется каждый день. Не принимайте решение о покупке на миллионы рублей, основываясь на рекламе.
            </p>
        </div>

        <div ref={quizFormRef} className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 overflow-hidden border border-gray-700">
          {isBlocked ? (
            <div className="text-center animate-fade-in">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Вы уже проходили экспресс-диагностику</h3>
              <p className="text-lg text-gray-300 mb-6">
                Если у вас изменились условия, напишите в телеграм чат, и мы с вами свяжемся.
              </p>
              <a
                href="https://t.me/+s2L1rHyXD5gyNWNi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
                <TelegramIcon className="w-6 h-6" />
                <span>Написать в Telegram</span>
              </a>
            </div>
          ) : (
            <>
              {step === 'processing' && (
                <div className="text-center animate-fade-in flex flex-col items-center justify-center min-h-[300px]">
                  <svg className="animate-spin h-12 w-12 text-green-500 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <h3 className="text-3xl font-bold text-white mb-4">Готовим ваш персональный анализ...</h3>
                  <p className="text-lg text-gray-300">Это займет несколько секунд. Искусственный интеллект анализирует рынок специально для вас.</p>
                </div>
              )}
               {step === 'result' && (
                <div className="space-y-10">
                    <div className={`text-center transition-all duration-700 ease-out ${isResultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <h3 className="text-3xl font-bold text-green-500 mb-2">СПАСИБО! Ваш запрос принят!</h3>
                        <p className="text-lg text-gray-300">Вот предварительный анализ и подборка. Я скоро свяжусь с вами для детальной консультации.</p>
                    </div>

                    <div className={`transition-all duration-700 ease-out delay-200 ${isResultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <h4 className="text-2xl font-bold text-white mb-4 text-center">ТОП-3 предложения по вашему запросу</h4>
                        <p className="text-center text-sm text-gray-500 mb-6">Данные предоставлены из закрытой риэлторской базы</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recommendedFlats && recommendedFlats.length > 0 ? (
                                recommendedFlats.map((flat, index) => (
                                <div key={flat.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transform hover:scale-105 hover:border-green-500 transition-all duration-300">
                                    <div className="w-full h-40 bg-gray-700">
                                      <img 
                                        src={flat.imageUrl} 
                                        alt={`Подходящий вариант квартиры ${index + 1}`} 
                                        className="w-full h-full object-contain" 
                                        loading="lazy"
                                      />
                                    </div>
                                    <div className="p-4">
                                        <h5 className="font-bold text-lg text-white">{`Вариант ${index + 1}`}</h5>
                                        <p className="text-xl font-bold text-green-500 my-2">{flat.price.toLocaleString('ru-RU')} ₽</p>
                                        <div className="text-xs text-gray-300 space-y-1">
                                            {flat.features.map(f => <p key={f}>• {f}</p>)}
                                        </div>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 md:col-span-3">К сожалению, по вашим параметрам сейчас нет подходящих вариантов в нашей быстрой подборке. Я подберу их для вас вручную и свяжусь.</p>
                            )}
                        </div>
                    </div>

                     <div className={`transition-all duration-700 ease-out delay-500 ${isResultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <h4 className="text-2xl font-bold text-white mb-4 text-center">Экспресс-анализ рынка от AI</h4>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-gray-300 prose prose-invert prose-p:my-2 prose-headings:text-yellow-400">
                           {analysisResult ? (
                                <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: analysisResult.replace(/### (.*?)\n/g, '<h3 class="text-xl font-semibold text-yellow-400 mt-4 mb-2">$1</h3>').replace(/(\d\.\s)/g, '<br/>$1') }}></div>
                            ) : (
                                <p>Загрузка анализа...</p>
                            )}
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-6">
                           Обращаем ваше внимание: это является оценочным анализом, на текущий момент, и данные взяты из открытых источников и возможны ошибки.
                        </p>
                    </div>
                </div>
              )}
              {step === 'form' && (
                <div className="animate-fade-in max-w-2xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">Завершите ваш запрос</h3>
                    <p className="text-lg mb-6 text-gray-300">Мы уже знаем ваши финансовые параметры. Уточните детали, и я подберу идеальные варианты.</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left border border-gray-700">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm sm:text-base">
                      <div><p className="text-gray-400">Цель:</p><p className="font-bold">{summary.purpose}</p></div>
                      <div><p className="text-gray-400">Комнат:</p><p className="font-bold">{summary.rooms}</p></div>
                      <div><p className="text-gray-400">Бюджет:</p><p className="font-bold">{summary.budget}</p></div>
                      {summary.mortgage !== '100% оплата / Не нужна ипотека' && (
                        <div><p className="text-gray-400">Ипотека:</p><p className="font-bold">{summary.mortgage}</p></div>
                      )}
                    </div>
                  </div>

                  <div className="my-6">
                    <label htmlFor="urgentBuyer" className="flex items-center justify-center cursor-pointer p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                        <input
                            type="checkbox"
                            id="urgentBuyer"
                            checked={isUrgentBuyer}
                            onChange={(e) => setIsUrgentBuyer(e.target.checked)}
                            className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-600 ring-offset-gray-800 focus:ring-2"
                        />
                        <span className="ml-3 text-base font-medium text-gray-300">
                            Скидка 100 000 руб за быстрый выход на сделку
                        </span>
                    </label>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center">
                      <p className="font-semibold mb-3">Количество комнат</p>
                      <div className="flex justify-center flex-wrap gap-2">
                        {['Студия', '1', '2', '3', '4+'].map(r => (
                          <button type="button" key={r} onClick={() => setRooms(r)} className={`px-4 py-2 rounded-lg transition-colors font-medium ${rooms === r ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-800 hover:bg-gray-700'}`}>{r}</button>
                        ))}
                      </div>
                    </div>

                    <input 
                      type="text" 
                      value={priorities} 
                      onChange={(e) => setPriorities(e.target.value)} 
                      placeholder="Что является приоритетным? (Школа, Детский сад, Район)" 
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-green-500 focus:outline-none" 
                    />
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Ваше имя" 
                      required 
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-green-500 focus:outline-none" 
                    />
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={handlePhoneChange} 
                      placeholder="+7 (___) ___-__-__" 
                      required 
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-green-500 focus:outline-none" 
                    />
                    
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    >
                      Отправить и получить подборку
                    </button>
                     <p className="text-xs text-gray-500 text-center pt-2">Нажимая кнопку, вы соглашаетесь с <button type="button" onClick={onPolicyClick} className="underline hover:text-gray-400">политикой конфиденциальности</button>.</p>
                  </form>
                </div>
              )}
              {step === 'quiz' && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">Хватит искать "вслепую".</h2>
                    <p className="mt-2 text-lg text-gray-300">Пройдите экспресс-диагностику за 1 минуту, чтобы понять, на что ОБРАТИТЬ ВНИМАНИЕ при выборе.</p>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                    <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>

                  <div className="relative min-h-[20rem] sm:min-h-[16rem]">
                    {quizData.map((q, index) => (
                        <div
                          key={index}
                          className="absolute w-full transition-all duration-300 ease-in-out"
                          style={{
                            transform: `translateX(${(index - currentQuestionIndex) * 100}%)`,
                            opacity: index === currentQuestionIndex ? 1 : 0,
                            visibility: index === currentQuestionIndex ? 'visible' : 'hidden',
                          }}
                        >
                          <h3 className="text-xl font-semibold mb-6 text-center text-gray-200">{q.question}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {q.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="w-full text-left p-4 bg-gray-800 rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center h-full"
                              >
                                <span className="flex-1">{option}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                  {attemptsLeft > 0 && (
                    <p className="text-center text-lg text-blue-400 mt-6">
                      Пройти экспресс-диагностику можно только{' '}
                      <span className="font-bold text-yellow-400">{attemptsLeft}</span>{' '}
                      {getAttemptsText(attemptsLeft)}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;