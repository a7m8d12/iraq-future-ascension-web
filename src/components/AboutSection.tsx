
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { Element } from 'react-scroll';

const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Element name="about" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400">{t.our}</span> {t.aboutUs}
          </h2>
          <div className="h-1 w-24 bg-emerald-400 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto text-gray-300 text-center mb-12">
          <p className="mb-4">
            {t.aboutDescription1}
          </p>
          <p>
            {t.aboutDescription2}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-2">{t.aboutFeature1Title}</h3>
            <p className="text-gray-400 text-center">{t.aboutFeature1Description}</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-2">{t.aboutFeature2Title}</h3>
            <p className="text-gray-400 text-center">{t.aboutFeature2Description}</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-2">{t.aboutFeature3Title}</h3>
            <p className="text-gray-400 text-center">{t.aboutFeature3Description}</p>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default AboutSection;
