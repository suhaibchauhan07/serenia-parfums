import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import api from '../../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    stock: '',
    image_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      navigate('/admin/products');
    } catch (err) {
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/admin/products')}
        className="flex items-center text-gray-400 hover:text-primary mb-6 transition-colors font-bold text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Products
      </button>

      <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 md:p-12">
        <h1 className="text-3xl font-serif font-bold mb-10">Add New Fragrance</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors font-medium"
                placeholder="e.g. Chanel N°5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Brand</label>
              <input 
                type="text" 
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors font-medium"
                placeholder="e.g. Chanel"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Price ($)</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors font-medium"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Initial Stock</label>
                <input 
                  type="number" 
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors font-medium"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
              <textarea 
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm p-3 focus:outline-none focus:border-secondary transition-colors font-medium resize-none"
                placeholder="Tell the story of this scent..."
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
              <input 
                type="text" 
                name="image_url"
                required
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-secondary transition-colors font-medium"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="border-2 border-dashed border-gray-100 rounded-sm aspect-[4/5] flex flex-col items-center justify-center p-6 text-center bg-gray-50 overflow-hidden relative group">
              {formData.image_url ? (
                <>
                  <img src={formData.image_url} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))} className="bg-white p-2 rounded-full text-red-500">
                      <X size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Upload size={48} className="text-gray-200 mb-4" />
                  <p className="text-sm text-gray-400">Preview will appear here once you provide a URL</p>
                </>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full luxury-button flex items-center justify-center py-4 mt-8 disabled:bg-gray-400"
            >
              {loading ? 'SAVING...' : (
                <>
                  <Save size={18} className="mr-2" /> SAVE PRODUCT
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
