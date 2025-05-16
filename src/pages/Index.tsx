
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import AnnouncementBar from '@/components/AnnouncementBar';
import FooterSection from '@/components/FooterSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Toaster position="top-right" />
      <AnnouncementBar />
      <Navigation />
      
      <main>
        <HeroSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Index;
