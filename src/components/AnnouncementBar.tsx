
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AnnouncementBar: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('message')
          .eq('active', true)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching announcement:', error);
          return;
        }

        if (data) {
          setAnnouncement(data.message);
        }
      } catch (error) {
        console.error('Error in announcement fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, []);

  if (loading || !announcement) return null;

  return (
    <div className="w-full bg-iraq-green py-2 text-center text-black text-sm font-medium">
      <p>{announcement}</p>
    </div>
  );
};

export default AnnouncementBar;
