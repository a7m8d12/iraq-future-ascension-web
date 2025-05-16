
import React, { useState } from 'react';
import FuturisticButton from './FuturisticButton';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  link,
  tags
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg futuristic-border group transition-transform duration-500 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-iraq-black via-transparent to-transparent z-10 opacity-70"></div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      ></div>

      {/* Overlay with slight blurred glass effect on hover */}
      <div 
        className="absolute inset-0 bg-iraq-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      ></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end h-full p-6 transition-transform duration-500">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-iraq-green-dark text-iraq-green px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">
          {title}
        </h3>
        
        <div 
          className="overflow-hidden transition-all duration-500"
          style={{ 
            maxHeight: isHovered ? '200px' : '0',
            opacity: isHovered ? 1 : 0
          }}
        >
          <p className="text-iraq-gray mb-4">
            {description}
          </p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <FuturisticButton variant="outline" size="sm">
              View Project
            </FuturisticButton>
          </a>
        </div>
      </div>

      {/* Glowing border that activates on hover */}
      <div 
        className="absolute inset-0 border border-iraq-green rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-700"
        style={{
          boxShadow: '0 0 15px rgba(0, 255, 102, 0.5)'
        }}
      ></div>
    </div>
  );
};

export default ProjectCard;
