
import React, { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import FooterSection from '@/components/FooterSection';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';

interface Partner {
  id: string;
  name: string;
  description: string;
  image: string;
  website: string | null;
}

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    async function fetchPartners() {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching partners:', error);
          return;
        }

        if (data) {
          setPartners(data as Partner[]);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <Toaster position="top-right" />
      <AnnouncementBar />
      <Navigation />
      
      <main>
        <section id="partners" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iraq-dark to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-iraq-gray">{t.our}</span> <span className="glow-text">{t.partners}</span>
              </h2>
              <p className="text-iraq-gray max-w-2xl mx-auto">
                {t.partnersDescription}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse w-8 h-8 rounded-full bg-iraq-green"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partners.map((partner) => (
                  <div key={partner.id} className="bg-iraq-dark bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-iraq-green-dark hover:border-iraq-green transition-all duration-300">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={partner.image} 
                        alt={partner.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                    <p className="text-iraq-gray mb-4">{partner.description}</p>
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-iraq-green hover:text-iraq-green-light transition-colors inline-flex items-center"
                      >
                        {t.visitWebsite}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Partners;
