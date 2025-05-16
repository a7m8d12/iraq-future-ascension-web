
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Toaster position="top-right" />
      <Navigation />
      
      <main>
        <HeroSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      
      <footer className="py-8 text-center text-sm text-iraq-gray">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <span className="text-xl font-bold text-iraq-green">IRAQ <span className="text-iraq-gray">FUTURE</span></span>
          </div>
          <p>© {new Date().getFullYear()} Iraq Future. All rights reserved.</p>
          <p className="mt-2">Building tomorrow's digital experiences today</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
