import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ProductCard from '../../components/customer/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
        
        const uniqueBrands = ['All', ...new Set(res.data.map(p => p.brand))];
        setBrands(uniqueBrands);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    result = result.filter(p => p.price <= priceRange);

    setFilteredProducts(result);
  }, [searchTerm, selectedBrand, priceRange, products]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our range of premium fragrances, crafted with the finest ingredients to create an unforgettable olfactory experience.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-8 bg-white p-6 rounded-sm shadow-sm h-fit">
            <div className="flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </div>

            {/* Search */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Search</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-b border-gray-200 py-2 pl-8 focus:outline-none focus:border-secondary transition-colors"
                />
                <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Brands */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Brand</label>
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-secondary bg-transparent"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Max Price: ${priceRange}</label>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-secondary"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-sm shadow-sm">
                <p className="text-gray-500 font-serif text-xl">No products found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedBrand('All'); setPriceRange(1000); }}
                  className="mt-4 text-secondary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
