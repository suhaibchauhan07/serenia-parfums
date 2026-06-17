-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users Table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Categories Table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  isActive BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Products Table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Product-Categories Junction Table (for many-to-many)
CREATE TABLE product_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (product_id, category_id)
);

-- Create Cart Table
CREATE TABLE cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Dummy Categories
INSERT INTO categories (name, description, image, isActive) VALUES
('Men''s Perfumes', 'Bold, masculine scents for him', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600', true),
('Women''s Perfumes', 'Elegant, feminine fragrances for her', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600', true),
('Unisex Perfumes', 'Perfect for everyone, any occasion', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600', true),
('Oud Collection', 'Deep, smoky, luxurious oud fragrances', 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=600', true),
('Luxury Collection', 'Premium, high-end fragrances', 'https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=600', true),
('Gift Sets', 'Perfect gifts for any celebration', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', true);

-- Insert Dummy Products (INR Prices!)
INSERT INTO products (name, brand, price, description, image_url, stock) VALUES
('Jannatul Firdaus', 'Adilqadri', 2499.00, 'A luxurious unisex attar inspired by paradise, blending fresh herbs, florals, amber, musk, and woody notes.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800', 50),
('Black Oudh', 'Ajmal', 3999.00, 'Deep, smoky, and rich oud fragrance with agarwood, amber, and spices.', 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800', 25),
('Floral Bloom', 'Forest Essentials', 1899.00, 'Delicate, feminine fragrance with jasmine, rose, and sandalwood.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800', 40),
('Royal Oudh', 'Rasasi', 4999.00, 'Opulent blend of rare agarwood, saffron, and musk.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800', 15),
('Fresh Citrus', 'Body Shop', 1299.00, 'Refreshing burst of lemon, bergamot, and mandarin.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800', 60),
('Gift Set - Premium Trio', 'Serenia Parfums', 5999.00, 'Curated set of three best-selling perfumes.', 'https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=800', 30),
('Amber Nights', 'Amouage', 6499.00, 'Warm, sensual fragrance with amber, vanilla, and sandalwood.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800', 20),
('Rose Absolute', 'Jo Malone', 3299.00, 'Classic, elegant rose fragrance with hints of peony and white musk.', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&q=80&w=800', 35);

-- Now, we need to insert product_categories! First, get the IDs of products/categories, or use a script!
-- For simplicity, we'll use product and category names in comments to guide you, but in reality, you'd use actual UUIDs!
-- Here's an example of how to link a product to multiple categories once you have their UUIDs:
-- INSERT INTO product_categories (product_id, category_id) 
-- VALUES 
--   ('PRODUCT_UUID_1', 'CATEGORY_UUID_3'), 
--   ('PRODUCT_UUID_1', 'CATEGORY_UUID_4');
