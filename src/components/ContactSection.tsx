import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import FuturisticButton from './FuturisticButton';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Element } from 'react-scroll';
import { supabase } from '@/integrations/supabase/client';
const ContactSection: React.FC = () => {
  const {
    language,
    isRTL
  } = useLanguage();
  const t = translations[language];
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });

    // Fix: Only observe the element if it exists
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      // Fix: Make sure to properly clean up the observer
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? isRTL ? 'يجب أن يكون الاسم على الأقل حرفين' : 'Name must be at least 2 characters' : '';
      case 'email':
        return !validateEmail(value) ? isRTL ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address' : '';
      case 'message':
        return value.length < 10 ? isRTL ? 'يجب أن تكون الرسالة على الأقل 10 أحرف' : 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const errorMessage = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      message: validateField('message', form.message)
    };
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    setIsSubmitting(true);
    try {
      // Store the message in Supabase
      const {
        error
      } = await supabase.from('contact_messages').insert([{
        name: form.name,
        email: form.email,
        message: form.message
      }]);
      if (error) {
        console.error('Error submitting message:', error);
        // Still show success message to the user, but log the error
      }

      // Show success message
      toast.success(t.messageSentSuccess, {
        description: t.messageSentDescription,
        position: 'bottom-right'
      });

      // Reset form
      setForm({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error in submission:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Element name="contact" className="py-24 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Note: Moving ref to this div that's guaranteed to exist */}
      <div ref={sectionRef} className="absolute inset-0"></div>
      
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-iraq-dark/30 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-transparent to-iraq-dark/30 opacity-50"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-emerald-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow" style={{
        animationDelay: '2s'
      }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-iraq-gray">{t.getInTouch}</span> <span className="glow-text">{t.contactUs}</span>
          </h2>
          <p className="text-iraq-gray max-w-2xl mx-auto text-lg">
            {isRTL ? 'هل أنت مستعد لتحويل رؤيتك إلى واقع؟ تواصل معنا اليوم لنتحدث عن كيف يمكننا مساعدتك في تحقيق أفكارك وتطوير موقعك أو تطبيقك بأسلوب احترافي ومبتكر.' : 'Are you ready to transform your vision into reality? Contact us today to discuss how we can help you realize your ideas and develop your website or application professionally and innovatively.'}
          </p>
        </div>
        
        <div className={`backdrop-blur-xl bg-black/40 p-8 md:p-10 rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{
        transitionDelay: '300ms'
      }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-emerald-400 font-medium mb-2">{t.name}</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder={t.yourName} className="w-full bg-gray-900/70 text-white border border-emerald-500/30 focus:border-emerald-400 rounded-lg py-3 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400/30" required />
                {errors.name && <p className="text-sm text-red-400 mt-2">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-emerald-400 font-medium mb-2">{t.email}</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder={t.yourEmail} className="w-full bg-gray-900/70 text-white border border-emerald-500/30 focus:border-emerald-400 rounded-lg py-3 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400/30" required />
                {errors.email && <p className="text-sm text-red-400 mt-2">{errors.email}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-emerald-400 font-medium mb-2">{t.message}</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder={t.yourMessage} rows={6} className="w-full bg-gray-900/70 text-white border border-emerald-500/30 focus:border-emerald-400 rounded-lg py-3 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400/30 resize-none" required></textarea>
              {errors.message && <p className="text-sm text-red-400 mt-2">{errors.message}</p>}
            </div>
            
            <div className="text-center">
              <FuturisticButton type="submit" size="lg" disabled={isSubmitting} className={`px-10 py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isSubmitting ? t.sending : t.sendMessage}
              </FuturisticButton>
            </div>
          </form>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: '600ms'
          }}>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 p-3 mb-5 mx-auto shadow-lg shadow-emerald-500/20">
                <Mail className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{t.email}</h3>
              <a href="mailto:info@iraqfuture.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">contact@iraqfuture.xyz</a>
            </div>
            
            <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: '750ms'
          }}>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 p-3 mb-5 mx-auto shadow-lg shadow-emerald-500/20">
                <Phone className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{t.phone}</h3>
              <a href="tel:+1234567890" className="text-emerald-400 hover:text-emerald-300 transition-colors">9647724745656+</a>
            </div>
            
            <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: '900ms'
          }}>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 p-3 mb-5 mx-auto shadow-lg shadow-emerald-500/20">
                <MapPin className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{t.location}</h3>
              <p className="text-emerald-400">
                Baghdad, Iraq
              </p>
            </div>
          </div>
        </div>
      </div>
    </Element>;
};
export default ContactSection;