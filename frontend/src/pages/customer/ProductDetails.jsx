import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get('/categories')
        ]);
        setProduct(productRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getCategoryNames = () => {
    if (!product?.categoryIds || categories.length === 0) return [];
    return product.categoryIds
      .map(categoryId => categories.find(cat => cat.id === categoryId))
      .filter(Boolean)
      .map(cat => cat.name);
  };

  const categoryNames = getCategoryNames();

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-primary mb-12 transition-colors font-bold text-xs uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-2" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="bg-gray-50 rounded-sm overflow-hidden max-w-md mx-auto w-full">
            <img 
              src={product.image_url || 'https://via.placeholder.com/600x750'} 
              alt={product.name} 
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {categoryNames.length > 0 && (
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">
                {categoryNames.join(' • ')}
              </div>
            )}
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm mb-4">{product.brand}</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{product.name}</h1>
            <p className="text-2xl md:text-3xl font-light mb-8">{formatCurrency(product.price)}</p>
            
            <div className="prose prose-sm text-gray-500 mb-10 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="flex items-center space-x-6 mb-10">
              <div className="flex items-center border border-gray-200">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => addToCart(product.id, quantity)}
                className="luxury-button flex-grow flex items-center justify-center py-4"
              >
                <ShoppingCart size={20} className="mr-2" /> ADD TO CART
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={24} className="text-secondary mb-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Authentic Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck size={24} className="text-secondary mb-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Complimentary Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw size={24} className="text-secondary mb-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
