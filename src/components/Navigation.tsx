
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import FuturisticButton from './FuturisticButton';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { Globe } from 'lucide-react';

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
          className="text-iraq-gray hover:text-iraq-green cursor-pointer transition-colors px-2"
        >
          {item.label}
        </ScrollLink>
      );
    } else {
      return (
        <Link
          key={index}
          to={item.to}
          className="text-iraq-gray hover:text-iraq-green cursor-pointer transition-colors px-2"
        >
          {item.label}
        </Link>
      );
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black bg-opacity-95 backdrop-blur-md py-3 shadow-lg shadow-iraq-green/10' 
          : 'bg-transparent py-6'
      }`}
      style={{ marginTop: '32px' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-iraq-green">
            IRAQ <span className="text-iraq-gray">FUTURE</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems.map((item, index) => renderNavLink(item, index))}
          
          <div className="ml-4 flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-iraq-gray hover:text-iraq-green transition-colors px-3 py-1 rounded-full border border-iraq-green-dark"
            >
              <Globe size={18} />
              <span className="font-medium">{language === 'en' ? 'عربي' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-iraq-gray hover:text-iraq-green transition-colors focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 backdrop-blur-md z-40 flex flex-col justify-center items-center md:hidden transition-transform duration-500 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {menuItems.map((item, index) => (
            <div key={index} onClick={() => setMobileMenuOpen(false)}>
              {renderNavLink(item, index)}
            </div>
          ))}
          <div className="mt-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-iraq-gray hover:text-iraq-green transition-colors px-4 py-2 rounded-full border border-iraq-green-dark"
            >
              <Globe size={18} />
              <span className="font-medium">{language === 'en' ? 'عربي' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
