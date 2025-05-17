
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import FuturisticButton from './FuturisticButton';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { Languages } from 'lucide-react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, isRTL } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.home, to: '/', isScroll: false },
    { label: t.portfolio, to: isHomePage ? 'portfolio' : '/portfolio', isScroll: isHomePage },
    { label: t.partners, to: '/partners', isScroll: false },
    { label: t.about, to: isHomePage ? 'about' : '/about', isScroll: isHomePage },
    { label: t.contact, to: isHomePage ? 'contact' : '/contact', isScroll: isHomePage }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const renderNavLink = (item: typeof menuItems[0], index: number) => {
    if (item.isScroll) {
      return (
        <ScrollLink
          key={index}
          to={item.to}
          spy={true}
          smooth={true}
          offset={-70}
          duration={1000}
          className="relative text-iraq-gray hover:text-iraq-green cursor-pointer transition-all px-3 py-2 group font-medium"
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-iraq-green group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </ScrollLink>
      );
    } else {
      return (
        <Link
          key={index}
          to={item.to}
          className="relative text-iraq-gray hover:text-iraq-green cursor-pointer transition-all px-3 py-2 group font-medium"
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-iraq-green group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </Link>
      );
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black bg-opacity-90 backdrop-blur-xl py-3 shadow-xl shadow-iraq-green/10 border-b border-iraq-green/20' 
          : 'bg-transparent py-6'
      }`}
      style={{ marginTop: '32px' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-iraq-green glow-text">IRAQ</span> <span className="text-iraq-gray">FUTURE</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {menuItems.map((item, index) => renderNavLink(item, index))}
          </div>
          
          <div className="ml-6 flex items-center">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-iraq-gray hover:text-iraq-green transition-all px-4 py-2 rounded-full border border-iraq-green/30 hover:border-iraq-green/70 bg-black/40 backdrop-blur-sm hover:bg-black/60 group"
            >
              <Languages size={18} className="transition-transform group-hover:rotate-180 duration-500" />
              <span className="font-medium">{language === 'en' ? 'عربي' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-iraq-gray hover:text-iraq-green transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className={`w-8 h-6 relative transform transition-all duration-500 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
              <span className={`absolute h-0.5 w-8 bg-iraq-green transform transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : '-translate-y-2'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-iraq-green transform transition-all duration-500 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute h-0.5 w-8 bg-iraq-green transform transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-2'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with animations */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden transition-all duration-500 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setMobileMenuOpen(false)}
              className="transform transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {renderNavLink(item, index)}
            </div>
          ))}
          
          <div className="mt-8 transform transition-all duration-300" style={{ transitionDelay: '300ms' }}>
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-iraq-gray hover:text-iraq-green transition-colors px-5 py-3 rounded-full border border-iraq-green/30 hover:border-iraq-green bg-black/40"
            >
              <Languages size={20} />
              <span className="font-medium text-lg">{language === 'en' ? 'عربي' : 'English'}</span>
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-iraq-green/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-iraq-green/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-iraq-green rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-iraq-green rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
    </nav>
  );
};

export default Navigation;
