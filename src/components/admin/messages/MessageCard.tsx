
import React from 'react';
import FuturisticButton from '@/components/FuturisticButton';
import { ContactMessage } from '@/types/messages';

interface MessageCardProps {
  message: ContactMessage;
  expandedMessage: string | null;
  toggleMessage: (id: string) => void;
  handleDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const MessageCard: React.FC<MessageCardProps> = ({ 
  message, 
  expandedMessage, 
  toggleMessage, 
  handleDelete,
  formatDate 
}) => {
  return (
    <div 
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
  );
};

export default MessageCard;
