
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FuturisticButton from '@/components/FuturisticButton';
import ParticleBackground from '@/components/ParticleBackground';
import bcrypt from 'bcryptjs-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      // Get user with matching username
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error || !data) {
        toast.error('Invalid username or password');
        return;
      }
      
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, data.password_hash);
      
      if (!isPasswordValid) {
        toast.error('Invalid username or password');
        return;
      }
      
      // Update last login time
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);
      
      // Store admin session in localStorage
      localStorage.setItem('adminUser', JSON.stringify({
        id: data.id,
        username: data.username,
        isLoggedIn: true
      }));
      
      toast.success('Login successful');
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-md p-8 bg-iraq-black bg-opacity-80 backdrop-blur-lg border border-iraq-green-dark rounded-lg shadow-lg shadow-iraq-green/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-iraq-green">
            IRAQ <span className="text-iraq-gray">FUTURE</span>
          </h2>
          <h3 className="mt-2 text-xl text-white">Admin Login</h3>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-iraq-gray">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-iraq-dark border border-iraq-green-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-iraq-green"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-iraq-gray">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-iraq-dark border border-iraq-green-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-iraq-green"
            />
          </div>

          <div>
            <FuturisticButton
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </FuturisticButton>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-iraq-green hover:text-iraq-green-light transition-colors">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
