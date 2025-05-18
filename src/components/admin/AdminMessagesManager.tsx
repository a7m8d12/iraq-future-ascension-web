
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FuturisticButton from '@/components/FuturisticButton';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminMessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setMessages(data as ContactMessage[]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('فشل في تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه الرسالة؟')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('تم حذف الرسالة بنجاح');
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('فشل في حذف الرسالة');
    }
  };

  const toggleMessage = (id: string) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-IQ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">رسائل التواصل</h3>
        <FuturisticButton size="sm" onClick={fetchMessages}>تحديث</FuturisticButton>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-6">
          <div className="w-10 h-10 border-4 border-iraq-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-8 text-center">
          <p className="text-iraq-gray">لا توجد رسائل مستلمة</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-4 transition-all duration-300 hover:border-iraq-green"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <div>
                  <h4 className="text-white font-semibold">{message.name}</h4>
                  <a href={`mailto:${message.email}`} className="text-emerald-400 text-sm hover:underline">{message.email}</a>
                </div>
                <div className="text-iraq-gray text-xs md:text-right mt-2 md:mt-0 rtl:text-right">
                  {formatDate(message.created_at)}
                </div>
              </div>
              
              <div className="mt-3">
                <p className={`text-white ${expandedMessage === message.id ? '' : 'line-clamp-2'}`}>
                  {message.message}
                </p>
                
                <div className="mt-4 flex justify-between items-center">
                  <button 
                    onClick={() => toggleMessage(message.id)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm transition"
                  >
                    {expandedMessage === message.id ? 'عرض أقل' : 'عرض المزيد'}
                  </button>
                  
                  <div>
                    <FuturisticButton 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(message.id)}
                    >
                      حذف
                    </FuturisticButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagesManager;
