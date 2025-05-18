
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ContactMessage } from '@/types/messages';

export const useMessagesManager = () => {
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

  return {
    messages,
    loading,
    expandedMessage,
    fetchMessages,
    handleDelete,
    toggleMessage,
    formatDate
  };
};
