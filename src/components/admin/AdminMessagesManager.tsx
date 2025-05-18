
import React from 'react';
import FuturisticButton from '@/components/FuturisticButton';
import { useMessagesManager } from '@/hooks/useMessagesManager';
import MessagesList from './messages/MessagesList';

const AdminMessagesManager: React.FC = () => {
  const { 
    messages,
    loading,
    expandedMessage,
    fetchMessages,
    handleDelete,
    toggleMessage,
    formatDate
  } = useMessagesManager();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">رسائل التواصل</h3>
        <FuturisticButton size="sm" onClick={fetchMessages}>تحديث</FuturisticButton>
      </div>
      
      <MessagesList 
        messages={messages}
        loading={loading}
        expandedMessage={expandedMessage}
        toggleMessage={toggleMessage}
        handleDelete={handleDelete}
        formatDate={formatDate}
      />
    </div>
  );
};

export default AdminMessagesManager;
