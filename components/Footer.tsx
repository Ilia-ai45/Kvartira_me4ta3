import React from 'react';
import { PhoneIcon, MailIcon, TelegramIcon } from './icons';

interface FooterProps {
  onPolicyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPolicyClick }) => {
  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 mb-8">
          <div className="flex items-center gap-6">
            <img 
              src="https://res.cloudinary.com/dsajhtkyy/image/upload/v1761838066/%D0%B4%D0%B0%D1%88_ma1p03.jpg" 
              alt="Дарья Бугровская" 
              loading="lazy"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
            />
            <div>
              <h3 className="text-2xl font-bold text-white">Дарья Бугровская</h3>
              <p className="text-gray-400">Эксперт по новостройкам Тюмени</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start md:items-end space-y-4">
            <a href="https://t.me/+s2L1rHyXD5gyNWNi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg font-semibold hover:text-white transition-colors group">
              <TelegramIcon className="w-6 h-6 text-blue-400 group-hover:text-blue-500 transition-colors"/>
              <span>
                <span className="text-blue-400">КВАРТИРА</span><span className="text-yellow-400">МЕЧТЫ</span>
              </span>
            </a>
            <a href="tel:+79959403755" className="flex items-center gap-3 text-lg hover:text-white transition-colors">
              <PhoneIcon className="w-6 h-6"/>
              <span>+7 (995) 940-37-55</span>
            </a>
            <a href="mailto:daria.bugrovskaya@gmail.com" className="flex items-center gap-3 text-lg hover:text-white transition-colors">
              <MailIcon className="w-6 h-6"/>
              <span>daria.bugrovskaya@gmail.com</span>
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-xs text-gray-500 space-y-3">
          <p>
            Сайт носит информационный характер, и не является публичной офертой. Проектная декларация опубликована на сайте <a href="https://наш.дом.рф" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">наш.дом.рф</a>.
            Отправляя заявку, вы соглашаетесь на обработку персональных данных в соответствии с <button onClick={onPolicyClick} className="underline hover:text-gray-300">Политикой конфиденциальности</button>.
          </p>
          <p>© 2025 Дарья Бугровская. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;