
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import FuturisticButton from '@/components/FuturisticButton';
import ParticleBackground from '@/components/ParticleBackground';
import AdminPortfolioManager from '@/components/admin/AdminPortfolioManager';
import AdminPartnersManager from '@/components/admin/AdminPartnersManager';
import AdminAnnouncementsManager from '@/components/admin/AdminAnnouncementsManager';
import AdminMessagesManager from '@/components/admin/AdminMessagesManager';
import { toast } from 'sonner';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'partners' | 'announcements' | 'messages'>('portfolio');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    portfolioCount: 0,
    partnersCount: 0,
    announcementsCount: 0,
    messagesCount: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      navigate('/admin-login');
      return;
    }

    try {
      const userData = JSON.parse(adminUser);
      if (!userData.isLoggedIn) {
        navigate('/admin-login');
        return;
      }
      setIsAuthenticated(true);
      fetchStats();
    } catch (error) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch portfolio count
      const { count: portfolioCount, error: portfolioError } = await supabase
        .from('portfolio')
        .select('*', { count: 'exact', head: true });

      // Fetch partners count
      const { count: partnersCount, error: partnersError } = await supabase
        .from('partners')
        .select('*', { count: 'exact', head: true });
        
      // Fetch announcements count
      const { count: announcementsCount, error: announcementsError } = await supabase
        .from('announcements')
        .select('*', { count: 'exact', head: true });

      // Fetch messages count
      const { count: messagesCount, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true });

      if (portfolioError || partnersError || announcementsError || messagesError) {
        console.error('Error fetching stats:', portfolioError || partnersError || announcementsError || messagesError);
        return;
      }

      setStats({
        portfolioCount: portfolioCount || 0,
        partnersCount: partnersCount || 0,
        announcementsCount: announcementsCount || 0,
        messagesCount: messagesCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="animate-pulse w-10 h-10 rounded-full bg-iraq-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-iraq-black">
      <ParticleBackground />
      
      {/* Admin Header */}
      <header className="bg-iraq-black bg-opacity-90 backdrop-blur-md border-b border-iraq-green-dark py-4 px-6 sticky top-0 z-30">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-iraq-green mb-4 md:mb-0">
            IRAQ <span className="text-iraq-gray">FUTURE</span> <span className="text-white">Admin</span>
          </h1>
          
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FuturisticButton variant="outline" size="sm">
                View Site
              </FuturisticButton>
            </a>
            <FuturisticButton size="sm" onClick={handleLogout}>
              Logout
            </FuturisticButton>
          </div>
        </div>
      </header>
      
      {/* Dashboard Stats */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold text-white mb-6">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6 hover:border-iraq-green transition-all duration-300">
              <h3 className="text-iraq-gray text-lg mb-2">Portfolio Items</h3>
              <p className="text-3xl font-bold text-white">{stats.portfolioCount}</p>
            </div>
            
            <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6 hover:border-iraq-green transition-all duration-300">
              <h3 className="text-iraq-gray text-lg mb-2">Partners</h3>
              <p className="text-3xl font-bold text-white">{stats.partnersCount}</p>
            </div>
            
            <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6 hover:border-iraq-green transition-all duration-300">
              <h3 className="text-iraq-gray text-lg mb-2">Announcements</h3>
              <p className="text-3xl font-bold text-white">{stats.announcementsCount}</p>
            </div>

            <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6 hover:border-iraq-green transition-all duration-300">
              <h3 className="text-iraq-gray text-lg mb-2">Messages</h3>
              <p className="text-3xl font-bold text-white">{stats.messagesCount}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Management Tabs */}
      <section className="py-6 px-6">
        <div className="container mx-auto">
          <div className="flex border-b border-iraq-green-dark mb-6 flex-wrap">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'portfolio'
                  ? 'text-iraq-green border-b-2 border-iraq-green'
                  : 'text-iraq-gray hover:text-white'
              }`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio Manager
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'partners'
                  ? 'text-iraq-green border-b-2 border-iraq-green'
                  : 'text-iraq-gray hover:text-white'
              }`}
              onClick={() => setActiveTab('partners')}
            >
              Partners Manager
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'announcements'
                  ? 'text-iraq-green border-b-2 border-iraq-green'
                  : 'text-iraq-gray hover:text-white'
              }`}
              onClick={() => setActiveTab('announcements')}
            >
              Announcements Manager
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'messages'
                  ? 'text-iraq-green border-b-2 border-iraq-green'
                  : 'text-iraq-gray hover:text-white'
              }`}
              onClick={() => setActiveTab('messages')}
            >
              Messages Manager
            </button>
          </div>
          
          {activeTab === 'portfolio' && (
            <AdminPortfolioManager onUpdate={fetchStats} />
          )}
          
          {activeTab === 'partners' && (
            <AdminPartnersManager onUpdate={fetchStats} />
          )}
          
          {activeTab === 'announcements' && (
            <AdminAnnouncementsManager onUpdate={fetchStats} />
          )}

          {activeTab === 'messages' && (
            <AdminMessagesManager />
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
