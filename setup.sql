-- Create Users Table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
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

-- Create Cart Table
CREATE TABLE cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dummy Product Data
INSERT INTO products (name, brand, price, description, image_url, stock) VALUES
('Chanel N°5', 'Chanel', 150.00, 'The essence of femininity. A powdery floral bouquet sublimated by an iconic bottle.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 25),
('Bleu de Chanel', 'Chanel', 120.00, 'A woody, aromatic fragrance for the man who defies convention.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 15),
('Savage', 'Dior', 110.00, 'A radically fresh composition, dictated by a name that has the ring of a manifesto.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 30),
('J''adore', 'Dior', 140.00, 'A tribute to Christian Dior''s passion for flowers, J''adore is a fragrance that is both feminine and sensual.', 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 20),
('Black Opium', 'YSL', 130.00, 'A captivating floral gourmand scent, twisted with an overdose of black coffee.', 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 12),
('La Vie Est Belle', 'Lancôme', 115.00, 'A bouquet of fine delicacies. The first tasty Iris fragrance.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 18);
