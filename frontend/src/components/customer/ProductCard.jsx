import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';

const ProductCard = ({ product, categories = [] }) => {
  const { addToCart } = useCart();

  const getCategoryNames = () => {
    if (!product.categoryIds || categories.length === 0) return [];
    return product.categoryIds
      .map(id => categories.find(cat => cat.id === id))
      .filter(Boolean)
      .map(cat => cat.name);
  };

  const categoryNames = getCategoryNames();
  const primaryCategory = categoryNames[0];

  return (
    <div className="luxury-card group overflow-hidden">
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <img 
          src={product.image_url || 'https://via.placeholder.com/400x500?text=Perfume'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-4">
          <button 
            onClick={() => addToCart(product.id)}
            className="p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-colors shadow-lg"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
          <Link 
            to={`/products/${product.id}`}
            className="p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-colors shadow-lg"
            title="View Details"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        {primaryCategory && (
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">
            {primaryCategory}
          </div>
        )}
        <div className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">{product.brand}</div>
        <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
          <button 
            onClick={() => addToCart(product.id)}
            className="text-xs font-bold uppercase tracking-tighter border-b border-primary hover:text-secondary hover:border-secondary transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
