import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
const AboutSection: React.FC = () => {
  const {
    language
  } = useLanguage();
  const t = translations[language];
  return;
};
export default AboutSection;