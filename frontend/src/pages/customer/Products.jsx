import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/customer/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [brands, setBrands] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) setSelectedCategory(categoryId);

    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
        
        const uniqueBrands = ['All', ...new Set(productsRes.data.map(p => p.brand))];
        setBrands(uniqueBrands);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.categoryIds && p.categoryIds.includes(selectedCategory));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedBrand, selectedCategory, products]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setSelectedCategory('All');
  };

  const hasActiveFilters = searchTerm || selectedBrand !== 'All' || selectedCategory !== 'All';

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our range of premium fragrances, crafted with the finest ingredients to create an unforgettable olfactory experience.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 space-y-8 bg-white p-8 rounded-sm shadow-xl border border-gray-100 h-fit">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2 text-primary font-bold uppercase tracking-[0.2em] text-sm">
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button 
                  onClick={resetFilters}
                  className="text-secondary text-xs font-medium uppercase tracking-wider hover:opacity-80 flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Reset
                </button>
              )}
            </div>

            {/* Search */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Search</label>
              <div className="relative group">
                <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by name, brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 pl-8 focus:outline-none focus:border-secondary transition-all bg-transparent placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-sm py-3 px-4 focus:outline-none focus:border-secondary bg-white transition-all text-sm"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Brands */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Brand</label>
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border border-gray-200 rounded-sm py-3 px-4 focus:outline-none focus:border-secondary bg-white transition-all text-sm"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div>
                <p className="text-sm text-gray-500 mb-6">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-sm shadow-xl border border-gray-100">
                <p className="text-gray-500 font-serif text-xl mb-4">No products found matching your criteria.</p>
                <button 
                  onClick={resetFilters}
                  className="luxury-button"
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
