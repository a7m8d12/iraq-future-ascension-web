
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';

const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="py-24 relative">
      {/* Background effect */}
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-iraq-green opacity-5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-iraq-green glow-text">{t.aboutUs}</span>
        </h2>
        
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-10 relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-iraq-green"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-iraq-green"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-iraq-green"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-iraq-green"></div>
          
          <p className="text-lg mb-6 text-iraq-gray">
            {t.aboutDescription1}
          </p>
          
          <p className="text-lg mb-6 text-iraq-gray">
            {t.aboutDescription2}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="text-center">
              <div className="bg-iraq-green-dark p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-iraq-green">{t.aboutFeature1Title}</h3>
              <p className="text-sm text-iraq-gray">{t.aboutFeature1Description}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-iraq-green-dark p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-iraq-green">{t.aboutFeature2Title}</h3>
              <p className="text-sm text-iraq-gray">{t.aboutFeature2Description}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-iraq-green-dark p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-iraq-green">{t.aboutFeature3Title}</h3>
              <p className="text-sm text-iraq-gray">{t.aboutFeature3Description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
