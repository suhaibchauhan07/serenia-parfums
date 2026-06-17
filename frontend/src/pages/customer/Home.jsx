import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import ProductCard from '../../components/customer/ProductCard';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'The Essence of Elegance',
    subtitle: 'Discover Serenia Premium Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Timeless Fragrance',
    subtitle: 'A Scent for Every Moment'
  },
  {
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Signature Scents',
    subtitle: 'Define Your Presence'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/products');
        console.log('Home page products:', res.data);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredProducts = products.slice(0, 3); // First 3 products!

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-primary overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            
            <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-secondary font-medium tracking-[0.3em] uppercase mb-4"
              >
                {slides[currentSlide].subtitle}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/products" className="luxury-button inline-flex items-center">
                  SHOP COLLECTION <ArrowRight className="ml-2" size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors"
        >
          <ChevronLeft size={40} />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-secondary transition-colors"
        >
          <ChevronRight size={40} />
        </button>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm">Curated Selection</span>
            <h2 className="text-4xl font-serif font-bold mt-2">Featured Fragrances</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/products" className="text-primary font-bold border-b-2 border-primary hover:text-secondary hover:border-secondary transition-all pb-1 tracking-widest uppercase text-sm">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Perfume making" 
              className="rounded-sm shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm">Our Heritage</span>
            <h2 className="text-4xl font-serif font-bold">The Art of Perfumery Since 1920</h2>
            <p className="text-gray-600 leading-relaxed">
              Every bottle of Serenia Parfums tells a story of craftsmanship, dedication, and the pursuit of olfactory perfection.
            </p>
            <Link to="/about" className="luxury-button inline-block">
              DISCOVER OUR STORY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
