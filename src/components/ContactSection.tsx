
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { Element } from 'react-scroll';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

const ContactSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <Element name="contact" className="py-24 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div ref={sectionRef} className="absolute inset-0"></div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-iraq-dark/30 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-transparent to-iraq-dark/30 opacity-50"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div 
          className="absolute -bottom-40 -right-20 w-96 h-96 bg-emerald-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow" 
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-iraq-gray">{t.getInTouch}</span> <span className="glow-text">{t.contactUs}</span>
          </h2>
          <p className="text-iraq-gray max-w-2xl mx-auto text-lg">
            {isRTL 
              ? 'هل أنت مستعد لتحويل رؤيتك إلى واقع؟ تواصل معنا اليوم لنتحدث عن كيف يمكننا مساعدتك في تحقيق أفكارك وتطوير موقعك أو تطبيقك بأسلوب احترافي ومبتكر.' 
              : 'Are you ready to transform your vision into reality? Contact us today to discuss how we can help you realize your ideas and develop your website or application professionally and innovatively.'
            }
          </p>
        </div>
        
        <div 
          className={`backdrop-blur-xl bg-black/40 p-8 md:p-10 rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
          style={{ transitionDelay: '300ms' }}
        >
          <ContactForm isVisible={isVisible} />
          <ContactInfo isVisible={isVisible} />
        </div>
      </div>
    </Element>
  );
};

export default ContactSection;
