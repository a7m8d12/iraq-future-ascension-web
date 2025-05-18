
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';

interface ContactInfoProps {
  isVisible: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isVisible }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
        style={{ transitionDelay: '600ms' }}
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 p-3 mb-5 mx-auto shadow-lg shadow-emerald-500/20">
          <Mail className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">{t.email}</h3>
        <a href="mailto:info@iraqfuture.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
          contact@iraqfuture.xyz
        </a>
      </div>
      
      <div 
        className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
        style={{ transitionDelay: '750ms' }}
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 p-3 mb-5 mx-auto shadow-lg shadow-emerald-500/20">
          <Phone className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">{t.phone}</h3>
        <a href="tel:+1234567890" className="text-emerald-400 hover:text-emerald-300 transition-colors">
          9647724745656+
        </a>
      </div>
      
      <div 
        className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
        style={{ transitionDelay: '900ms' }}
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 p-3 mb-5 mx-auto shadow-lg shadow-emerald-500/20">
          <MapPin className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">{t.location}</h3>
        <p className="text-emerald-400">
          Baghdad, Iraq
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
