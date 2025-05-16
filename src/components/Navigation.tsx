
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import FuturisticButton from './FuturisticButton';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', to: 'hero' },
    { label: 'Services', to: 'services' },
    { label: 'Portfolio', to: 'portfolio' },
    { label: 'FAQs', to: 'faqs' },
    { label: 'Resources', to: 'resources' },
    { label: 'About', to: 'about' },
    { label: 'Partners', to: 'partners' },
    { label: 'Contact', to: 'contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black bg-opacity-95 backdrop-blur-md py-3 shadow-lg shadow-iraq-green/10' 
          : 'bg-transparent py-6'
      }`}
      style={{ marginTop: '32px' }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-iraq-green">
            IRAQ <span className="text-iraq-gray">FUTURE</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {menuItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              className="text-iraq-gray hover:text-iraq-green cursor-pointer transition-colors px-2"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-2">
            <FuturisticButton variant="outline" size="sm">
              Login
            </FuturisticButton>
            <FuturisticButton size="sm">
              Sign Up
            </FuturisticButton>
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
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              className="text-2xl text-iraq-gray hover:text-iraq-green cursor-pointer transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-4">
            <FuturisticButton variant="outline" size="md">
              Login
            </FuturisticButton>
            <FuturisticButton size="md">
              Sign Up
            </FuturisticButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
