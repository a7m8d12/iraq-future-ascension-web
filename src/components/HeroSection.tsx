
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import FuturisticButton from './FuturisticButton';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const tagline = taglineRef.current;
    const button = buttonRef.current;
    if (title && subtitle && tagline && button) {
      title.style.opacity = '0';
      subtitle.style.opacity = '0';
      tagline.style.opacity = '0';
      button.style.opacity = '0';
      setTimeout(() => {
        title.style.transition = 'opacity 1s, transform 1s';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 500);
      setTimeout(() => {
        subtitle.style.transition = 'opacity 1s, transform 1s';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }, 800);
      setTimeout(() => {
        tagline.style.transition = 'opacity 1s, transform 1s';
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
      }, 1100);
      setTimeout(() => {
        button.style.transition = 'opacity 1s, transform 1s';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, 1400);
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-32" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Enhanced glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-iraq-green opacity-10 rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-iraq-green opacity-15 rounded-full filter blur-3xl animate-pulse-glow" style={{
        animationDelay: '1s'
      }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-iraq-green-dark opacity-10 rounded-full filter blur-3xl animate-pulse" style={{
        animationDelay: '1.5s'
      }}></div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5 tracking-tight text-shadow-glow" style={{
          transform: 'translateY(20px)',
          textShadow: '0 0 15px rgba(0, 255, 102, 0.6), 0 0 30px rgba(0, 255, 102, 0.4)'
        }}>
          <span className="text-iraq-green glow-text">Iraq Future</span>
        </h1>
        
        <p ref={subtitleRef} className="text-xl md:text-2xl lg:text-3xl mb-5 font-bold text-white" style={{
          transform: 'translateY(20px)'
        }}>
          {t.startYourDigitalProject}
        </p>
        
        <p ref={taglineRef} className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-iraq-gray" style={{
          transform: 'translateY(20px)'
        }}>
          {t.welcomeMessage}
        </p>
        
        <div ref={buttonRef} className="flex flex-col md:flex-row gap-6 justify-center" style={{
          transform: 'translateY(20px)'
        }}>
          <Link to="contact" spy={true} smooth={true} offset={-100} duration={1000}>
            <FuturisticButton size="lg">{t.contactNow}</FuturisticButton>
          </Link>
          
          <Link to="portfolio" spy={true} smooth={true} offset={-100} duration={1000}>
            <FuturisticButton size="lg" variant="outline">{t.portfolio}</FuturisticButton>
          </Link>
        </div>
      </div>
      
      {/* Enhanced scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-iraq-green text-sm mb-2">{t.scrollDown}</span>
        <svg className="w-6 h-6 text-iraq-green animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
