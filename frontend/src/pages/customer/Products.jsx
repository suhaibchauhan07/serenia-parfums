import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/customer/ProductCard';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
-
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = searchQuery ? { search: searchQuery } : {};
        const res = await api.get('/products', { params });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Collection'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {searchQuery 
              ? `Showing ${products.length} result(s) for your search.`
              : 'Explore our range of premium fragrances, crafted with the finest ingredients.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500">No products found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
