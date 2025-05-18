
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import FuturisticButton from '@/components/FuturisticButton';
import { toast } from 'sonner';

interface Announcement {
  id: string;
  message: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminAnnouncementsManager: React.FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setAnnouncements(data as Announcement[]);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('فشل في تحميل الإعلانات');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!newMessage.trim()) {
      toast.error('الرجاء إدخال نص الإعلان');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('announcements')
        .insert([
          { message: newMessage.trim() }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast.success('تم إضافة الإعلان بنجاح');
      setNewMessage('');
      fetchAnnouncements();
      onUpdate();
    } catch (error) {
      console.error('Error adding announcement:', error);
      toast.error('فشل في إضافة الإعلان');
    }
  };

  const handleUpdateAnnouncement = async (id: string) => {
    if (!editMessage.trim()) {
      toast.error('الإعلان لا يمكن أن يكون فارغاً');
      return;
    }

    try {
      const { error } = await supabase
        .from('announcements')
        .update({ message: editMessage.trim(), updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('تم تحديث الإعلان بنجاح');
      setEditingId(null);
      fetchAnnouncements();
      onUpdate();
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error('فشل في تحديث الإعلان');
    }
  };

  const handleToggleActive = async (announcement: Announcement) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ active: !announcement.active, updated_at: new Date().toISOString() })
        .eq('id', announcement.id);

      if (error) {
        throw error;
      }

      toast.success(`تم ${announcement.active ? 'إلغاء تنشيط' : 'تنشيط'} الإعلان بنجاح`);
      fetchAnnouncements();
      onUpdate();
    } catch (error) {
      console.error('Error toggling announcement status:', error);
      toast.error('فشل في تغيير حالة الإعلان');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الإعلان؟')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('تم حذف الإعلان بنجاح');
      fetchAnnouncements();
      onUpdate();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('فشل في حذف الإعلان');
    }
  };

  const startEditing = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setEditMessage(announcement.message);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditMessage('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">إضافة إعلان جديد</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="newMessage" className="block text-iraq-gray mb-2">
              نص الإعلان
            </label>
            <textarea
              id="newMessage"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-iraq-black text-white border border-iraq-green-dark rounded-lg p-3 focus:border-iraq-green focus:outline-none"
              placeholder="أدخل نص الإعلان هنا..."
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <FuturisticButton onClick={handleAddAnnouncement}>
              إضافة إعلان
            </FuturisticButton>
          </div>
        </div>
      </div>

      <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">إدارة الإعلانات</h3>
        
        {loading ? (
          <div className="flex justify-center p-6">
            <div className="w-10 h-10 border-4 border-iraq-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : announcements.length === 0 ? (
          <p className="text-iraq-gray text-center py-8">لا توجد إعلانات متاحة</p>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`border ${announcement.active ? 'border-iraq-green' : 'border-iraq-gray'} rounded-lg p-4`}
              >
                {editingId === announcement.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full bg-iraq-black text-white border border-iraq-green-dark rounded-lg p-3 focus:border-iraq-green focus:outline-none"
                      rows={3}
                    />
                    <div className="flex space-x-2 rtl:space-x-reverse justify-end">
                      <FuturisticButton variant="outline" onClick={cancelEditing}>
                        إلغاء
                      </FuturisticButton>
                      <FuturisticButton onClick={() => handleUpdateAnnouncement(announcement.id)}>
                        حفظ
                      </FuturisticButton>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={`text-white mb-3 ${!announcement.active ? 'opacity-60' : ''}`}>
                      {announcement.message}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center justify-between mt-4">
                      <div className="text-xs text-iraq-gray">
                        آخر تحديث: {new Date(announcement.updated_at).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <FuturisticButton 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleActive(announcement)}
                        >
                          {announcement.active ? 'إلغاء التنشيط' : 'تنشيط'}
                        </FuturisticButton>
                        <FuturisticButton 
                          variant="outline" 
                          size="sm" 
                          onClick={() => startEditing(announcement)}
                        >
                          تعديل
                        </FuturisticButton>
                        <FuturisticButton 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(announcement.id)}
                        >
                          حذف
                        </FuturisticButton>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncementsManager;
