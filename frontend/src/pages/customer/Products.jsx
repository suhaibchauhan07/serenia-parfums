import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/customer/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  };

  const filteredProducts = selectedCategoryId
    ? products.filter(product => product.categoryIds && product.categoryIds.includes(selectedCategoryId))
    : products;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          {selectedCategoryId && (
            <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">
              {getCategoryName(selectedCategoryId)}
            </p>
          )}
          <h1 className="text-4xl font-serif font-bold mb-4">
            {selectedCategoryId ? getCategoryName(selectedCategoryId) : 'Our Collection'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {selectedCategoryId 
              ? `Explore our curated selection of ${getCategoryName(selectedCategoryId).toLowerCase()}`
              : 'Explore our range of premium fragrances, crafted with the finest ingredients.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                categories={categories} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-sm shadow-xl border border-gray-100">
            <p className="text-gray-500 font-serif text-xl mb-4">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
