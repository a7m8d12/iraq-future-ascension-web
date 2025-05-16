
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import AnnouncementBar from '@/components/AnnouncementBar';
import FooterSection from '@/components/FooterSection';
import { useLanguage } from '@/hooks/useLanguage';

const Index: React.FC = () => {
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <ParticleBackground />
      <Toaster position="top-right" />
      <AnnouncementBar />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Index;
