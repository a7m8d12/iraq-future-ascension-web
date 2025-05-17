
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { Element } from 'react-scroll';
import { Shield, Lightbulb, Medal } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Element name="about" className="relative py-20 lg:py-32" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Enhanced background with parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-iraq-dark/70 to-black/40 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 102, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(0, 255, 102, 0.08) 0%, transparent 40%)'
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-emerald-400">{t.our}</span> {t.aboutUs}
          </h2>
          <div className="h-1 w-32 bg-emerald-400 mx-auto mb-8 rounded-full"></div>
          
          <div className="max-w-4xl mx-auto text-gray-300 text-center mb-12">
            <p className="mb-6 text-lg leading-relaxed">
              {t.aboutDescription1}
            </p>
            <p className="text-lg leading-relaxed">
              {t.aboutDescription2}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div 
            className={`bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-emerald-500/30 hover:border-emerald-500 transition-all duration-500 shadow-lg hover:shadow-emerald-500/20 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/20">
              <Lightbulb size={30} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-center mb-4">{t.innovation}</h3>
            <p className="text-gray-400 text-center leading-relaxed">{t.aboutFeature1Description}</p>
            
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-6"></div>
            
            <div className="mt-6 flex justify-center">
              <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                {isRTL ? 'المستقبل' : 'Future'}
              </span>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div 
            className={`bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-emerald-500/30 hover:border-emerald-500 transition-all duration-500 shadow-lg hover:shadow-emerald-500/20 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/20">
              <Shield size={30} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-center mb-4">{t.expertise}</h3>
            <p className="text-gray-400 text-center leading-relaxed">{t.aboutFeature2Description}</p>
            
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-6"></div>
            
            <div className="mt-6 flex justify-center">
              <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                {isRTL ? 'الخبرة' : 'Experience'}
              </span>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div 
            className={`bg-gradient-to-br from-gray-900/90 to-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-emerald-500/30 hover:border-emerald-500 transition-all duration-500 shadow-lg hover:shadow-emerald-500/20 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
            style={{ transitionDelay: '600ms' }}
          >
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/20">
              <Medal size={30} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-center mb-4">{t.quality}</h3>
            <p className="text-gray-400 text-center leading-relaxed">{t.aboutFeature3Description}</p>
            
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-6"></div>
            
            <div className="mt-6 flex justify-center">
              <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                {isRTL ? 'الإتقان' : 'Excellence'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 overflow-hidden">
          <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-float" style={{ left: '10%', animationDelay: '0s', opacity: 0.6 }}></div>
          <div className="absolute w-3 h-3 bg-emerald-500 rounded-full animate-float" style={{ left: '25%', animationDelay: '1.2s', opacity: 0.4 }}></div>
          <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-float" style={{ left: '40%', animationDelay: '2.1s', opacity: 0.7 }}></div>
          <div className="absolute w-4 h-4 bg-emerald-500 rounded-full animate-float" style={{ left: '65%', animationDelay: '0.5s', opacity: 0.3 }}></div>
          <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-float" style={{ left: '80%', animationDelay: '1.7s', opacity: 0.5 }}></div>
        </div>
      </div>
    </Element>
  );
};

export default AboutSection;
