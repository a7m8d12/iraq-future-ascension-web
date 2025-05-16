
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FuturisticButton from '@/components/FuturisticButton';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

interface AdminPortfolioManagerProps {
  onUpdate: () => void;
}

const AdminPortfolioManager: React.FC<AdminPortfolioManagerProps> = ({ onUpdate }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  
  // Form state
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching portfolio items:', error);
        toast.error('Failed to load portfolio items');
        return;
      }

      setPortfolioItems(data as PortfolioItem[]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setLink('');
    setTags('');
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.image);
    setLink(item.link);
    setTags(item.tags.join(', '));
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting portfolio item:', error);
        toast.error('Failed to delete portfolio item');
        return;
      }

      toast.success('Portfolio item deleted successfully');
      fetchPortfolio();
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !image || !link) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('portfolio')
          .update({
            title,
            description,
            image,
            link,
            tags: tagsArray
          })
          .eq('id', editingItem.id);

        if (error) {
          console.error('Error updating portfolio item:', error);
          toast.error('Failed to update portfolio item');
          return;
        }

        toast.success('Portfolio item updated successfully');
      } else {
        // Create new item
        const { error } = await supabase
          .from('portfolio')
          .insert([{
            title,
            description,
            image,
            link,
            tags: tagsArray
          }]);

        if (error) {
          console.error('Error creating portfolio item:', error);
          toast.error('Failed to create portfolio item');
          return;
        }

        toast.success('Portfolio item created successfully');
      }
      
      resetForm();
      fetchPortfolio();
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Portfolio Items</h2>
        <FuturisticButton onClick={() => setShowForm(!showForm)}>
          <PlusIcon size={16} />
          Add New Project
        </FuturisticButton>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-iraq-dark bg-opacity-70 backdrop-blur-sm border border-iraq-green-dark rounded-lg p-6 mb-6">
          <h3 className="text-white text-lg mb-4">
            {editingItem ? 'Edit Project' : 'Add New Project'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-iraq-gray mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-3 py-2 bg-iraq-black border border-iraq-green-dark rounded-md text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-iraq-gray mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 bg-iraq-black border border-iraq-green-dark rounded-md text-white"
                placeholder="Web App, Dashboard, IoT"
              />
            </div>
            
            <div className="flex space-x-4 pt-2">
              <FuturisticButton type="submit">
                {editingItem ? 'Update Project' : 'Add Project'}
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

      {/* Portfolio Items List */}
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
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-iraq-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-iraq-dark">
              {portfolioItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-iraq-gray">
                    No portfolio items found. Add your first project!
                  </td>
                </tr>
              ) : (
                portfolioItems.map((item) => (
                  <tr key={item.id} className="bg-iraq-black bg-opacity-50">
                    <td className="px-4 py-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="h-16 w-24 object-cover rounded" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/150?text=Image+Error";
                        }}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-white">
                      {item.title}
                    </td>
                    <td className="px-4 py-4 text-iraq-gray max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-iraq-green-dark text-iraq-green px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-iraq-green hover:text-iraq-green-light transition-colors"
                          title="Edit"
                        >
                          <PencilIcon size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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

export default AdminPortfolioManager;
