
import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';

// Sample portfolio data - would typically come from a CMS or API
const projects = [
  {
    id: 1,
    title: 'TechVista Platform',
    description: 'A futuristic dashboard for monitoring and controlling IoT devices with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: '#',
    tags: ['Web App', 'IoT', 'Dashboard']
  },
  {
    id: 2,
    title: 'NeoCommerce',
    description: 'Next-generation e-commerce platform with AR product previews and AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: '#',
    tags: ['E-commerce', 'AR/VR', 'AI']
  },
  {
    id: 3,
    title: 'Quantum Finance',
    description: 'Blockchain-based financial platform with advanced cryptography and secure transaction processing.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: '#',
    tags: ['Fintech', 'Blockchain', 'Security']
  },
  {
    id: 4,
    title: 'MetaVerse Portal',
    description: 'Interactive 3D virtual world with realistic physics and immersive user experiences.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: '#',
    tags: ['3D', 'WebGL', 'Virtual Reality']
  },
  {
    id: 5,
    title: 'Neural Network',
    description: 'Machine learning platform that processes and analyzes complex data patterns for predictive insights.',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: '#',
    tags: ['AI', 'Data Science', 'Analytics']
  },
  {
    id: 6,
    title: 'CyberShield',
    description: 'Advanced cybersecurity suite with real-time threat detection and automated response systems.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    link: '#',
    tags: ['Security', 'Monitoring', 'Enterprise']
  }
];

const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const filters = [
    'All', 
    'Web App', 
    'E-commerce', 
    'Fintech', 
    '3D', 
    'AI', 
    'Security'
  ];

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
    if (activeFilter === 'All') {
      setVisibleProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tags.includes(activeFilter)
      );
      setVisibleProjects(filtered);
    }
  }, [activeFilter]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 relative">
      {/* Section background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-iraq-dark to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-iraq-gray">Our</span> <span className="glow-text">Portfolio</span>
          </h2>
          <p className="text-iraq-gray max-w-2xl mx-auto">
            Explore our cutting-edge projects showcasing the future of digital experiences. From immersive web applications to advanced AI systems, we push the boundaries of what's possible.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-iraq-green text-black font-medium shadow-[0_0_10px_rgba(0,255,102,0.5)]'
                  : 'bg-iraq-dark text-iraq-gray hover:bg-iraq-green-dark'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
