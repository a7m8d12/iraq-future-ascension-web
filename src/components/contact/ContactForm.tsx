
import React, { useState } from 'react';
import { toast } from 'sonner';
import FuturisticButton from '@/components/FuturisticButton';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormProps {
  isVisible: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isVisible }) => {
  const { language, isRTL } = useLanguage();
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
    const { name, value } = e.target;
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
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: form.name,
          email: form.email,
          message: form.message
        });

      if (error) {
        console.error('Error submitting message:', error);
        throw error;
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-emerald-400 font-medium mb-2">{t.name}</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder={t.yourName} 
            className="w-full bg-gray-900/70 text-white border border-emerald-500/30 focus:border-emerald-400 rounded-lg py-3 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400/30" 
            required 
          />
          {errors.name && <p className="text-sm text-red-400 mt-2">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-emerald-400 font-medium mb-2">{t.email}</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder={t.yourEmail} 
            className="w-full bg-gray-900/70 text-white border border-emerald-500/30 focus:border-emerald-400 rounded-lg py-3 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400/30" 
            required 
          />
          {errors.email && <p className="text-sm text-red-400 mt-2">{errors.email}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-emerald-400 font-medium mb-2">{t.message}</label>
        <textarea 
          id="message" 
          name="message" 
          value={form.message} 
          onChange={handleChange} 
          placeholder={t.yourMessage} 
          rows={6} 
          className="w-full bg-gray-900/70 text-white border border-emerald-500/30 focus:border-emerald-400 rounded-lg py-3 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400/30 resize-none" 
          required
        ></textarea>
        {errors.message && <p className="text-sm text-red-400 mt-2">{errors.message}</p>}
      </div>
      
      <div className="text-center">
        <FuturisticButton 
          type="submit" 
          size="lg" 
          disabled={isSubmitting} 
          className={`px-10 py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? t.sending : t.sendMessage}
        </FuturisticButton>
      </div>
    </form>
  );
};

export default ContactForm;
