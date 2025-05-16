
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import FuturisticButton from './FuturisticButton';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;
    
    if (title && subtitle && button) {
      title.style.opacity = '0';
      subtitle.style.opacity = '0';
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
      }, 1000);
      
      setTimeout(() => {
        button.style.transition = 'opacity 1s, transform 1s';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, 1500);
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-32">
      {/* Glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-iraq-green opacity-5 rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-iraq-green opacity-10 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          style={{ transform: 'translateY(20px)' }}
        >
          <span className="text-white">Welcome to</span> <br />
          <span className="glow-text inline-block mt-2">IRAQ FUTURE</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-iraq-gray"
          style={{ transform: 'translateY(20px)' }}
        >
          Building tomorrow's digital experiences with cutting-edge technology and futuristic design
        </p>
        
        <div 
          ref={buttonRef}
          className="flex flex-col md:flex-row gap-4 justify-center"
          style={{ transform: 'translateY(20px)' }}
        >
          <Link to="portfolio" spy={true} smooth={true} offset={-70} duration={1000}>
            <FuturisticButton size="lg">
              View Our Work
            </FuturisticButton>
          </Link>
          <Link to="contact" spy={true} smooth={true} offset={-70} duration={1000}>
            <FuturisticButton variant="outline" size="lg">
              Contact Us
            </FuturisticButton>
          </Link>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-iraq-green text-sm mb-2">Scroll Down</span>
        <svg className="w-6 h-6 text-iraq-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
