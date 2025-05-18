
import React from 'react';
import { ContactMessage } from '@/types/messages';
import MessageCard from './MessageCard';

interface MessagesListProps {
  messages: ContactMessage[];
  loading: boolean;
  expandedMessage: string | null;
  toggleMessage: (id: string) => void;
  handleDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  loading, 
  expandedMessage, 
  toggleMessage, 
  handleDelete,
  formatDate 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <div className="w-10 h-10 border-4 border-iraq-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-8 text-center">
        <p className="text-iraq-gray">لا توجد رسائل مستلمة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          expandedMessage={expandedMessage}
          toggleMessage={toggleMessage}
          handleDelete={handleDelete}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default MessagesList;
