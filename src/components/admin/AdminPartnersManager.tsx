
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FuturisticButton from '@/components/FuturisticButton';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  description: string;
  image: string;
  website: string | null;
}

interface AdminPartnersManagerProps {
  onUpdate: () => void;
}

const AdminPartnersManager: React.FC<AdminPartnersManagerProps> = ({ onUpdate }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  
  // Form state
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching partners:', error);
        toast.error('Failed to load partners');
        return;
      }

      setPartners(data as Partner[]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImage('');
    setWebsite('');
    setEditingPartner(null);
    setShowForm(false);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setName(partner.name);
    setDescription(partner.description);
    setImage(partner.image);
    setWebsite(partner.website || '');
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting partner:', error);
        toast.error('Failed to delete partner');
        return;
      }

      toast.success('Partner deleted successfully');
      fetchPartners();
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !image) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingPartner) {
        // Update existing partner
        const { error } = await supabase
          .from('partners')
          .update({
            name,
            description,
            image,
            website: website || null
          })
          .eq('id', editingPartner.id);

        if (error) {
          console.error('Error updating partner:', error);
          toast.error('Failed to update partner');
          return;
        }

        toast.success('Partner updated successfully');
      } else {
        // Create new partner
        const { error } = await supabase
          .from('partners')
          .insert([{
            name,
            description,
            image,
            website: website || null
          }]);

        if (error) {
          console.error('Error creating partner:', error);
          toast.error('Failed to create partner');
          return;
        }

        toast.success('Partner created successfully');
      }
      
      resetForm();
      fetchPartners();
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Partners</h2>
        <FuturisticButton onClick={() => setShowForm(!showForm)}>
          <PlusIcon size={16} />
          Add New Partner
        </FuturisticButton>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6 mb-6">
          <h3 className="text-white text-lg mb-4">
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-iraq-gray mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-iraq-black border border-iraq-green-dark rounded-md text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-iraq-gray mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-iraq-black border border-iraq-green-dark rounded-md text-white h-24"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-iraq-gray mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 bg-iraq-black border border-iraq-green-dark rounded-md text-white"
                required
              />
              {image && (
                <div className="mt-2 w-full max-w-xs">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="h-32 object-cover rounded-md border border-iraq-green-dark" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150?text=Image+Error";
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-iraq-gray mb-1">
                Website URL (optional)
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 bg-iraq-black border border-iraq-green-dark rounded-md text-white"
              />
            </div>
            
            <div className="flex space-x-4 pt-2">
              <FuturisticButton type="submit">
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </FuturisticButton>
              <FuturisticButton 
                type="button" 
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </FuturisticButton>
            </div>
          </form>
        </div>
      )}

      {/* Partners List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse w-8 h-8 rounded-full bg-iraq-green"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-iraq-dark">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Website
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-iraq-dark">
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-iraq-gray">
                    No partners found. Add your first partner!
                  </td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.id} className="bg-iraq-black bg-opacity-50">
                    <td className="px-4 py-4">
                      <img 
                        src={partner.image} 
                        alt={partner.name}
                        className="h-16 w-24 object-cover rounded" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/150?text=Image+Error";
                        }}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-white">
                      {partner.name}
                    </td>
                    <td className="px-4 py-4 text-iraq-gray max-w-xs truncate">
                      {partner.description}
                    </td>
                    <td className="px-4 py-4 text-iraq-green">
                      {partner.website ? (
                        <a 
                          href={partner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-iraq-green-light transition-colors"
                        >
                          {new URL(partner.website).hostname}
                        </a>
                      ) : (
                        <span className="text-iraq-gray">None</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(partner)}
                          className="text-iraq-green hover:text-iraq-green-light transition-colors"
                          title="Edit"
                        >
                          <PencilIcon size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="text-red-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPartnersManager;
