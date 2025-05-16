
import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching portfolio:', error);
          return;
        }

        if (data) {
          setProjects(data as PortfolioItem[]);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iraq-dark to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-iraq-gray">{t.our}</span> <span className="glow-text">{t.portfolio}</span>
          </h2>
          <p className="text-iraq-gray max-w-2xl mx-auto">
            {t.portfolioDescription}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index}
                className="bg-iraq-dark bg-opacity-50 rounded-lg h-64 animate-pulse"
              />
            ))
          ) : (
            projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`} 
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  tags={project.tags}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
