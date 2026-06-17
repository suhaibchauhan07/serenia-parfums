const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret_key';

app.use(cors());
app.use(express.json());

// --- Mock Data ---
let users = [
  {
    id: '1',
    name: 'Serenia Admin',
    email: 'admin@sereniaparfums.com',
    password_hash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Suhaib Chauhan',
    email: 'suhaibchauhan0@gmail.com',
    password_hash: bcrypt.hashSync('password123', 10),
    role: 'customer',
    created_at: new Date().toISOString()
  }
];

let categories = [
  {
    id: '1',
    name: "Men's Perfumes",
    description: "Bold, charismatic fragrances for the modern gentleman.",
    image: "https://images.unsplash.com/photo-1584301129079-c450ec071d51?auto=format&fit=crop&q=80&w=600",
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: "Women's Perfumes",
    description: "Elegant, enchanting scents for every occasion.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: "Unisex Perfumes",
    description: "Scents that transcend gender, made for everyone.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: "Oud Collection",
    description: "Luxurious, deep, and mysterious oud fragrances.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: "Luxury Collection",
    description: "Premium, exclusive fragrances for special moments.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=600",
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: "Gift Sets",
    description: "Perfect fragrance gifts for loved ones.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    isActive: true,
    created_at: new Date().toISOString()
  }
];

let products = [
  {
    id: '1',
    name: "Jannatul Firdaus",
    brand: "Adilqadri",
    price: 2499,
    description: "Jannatul Firdaus by Adilqadri is a luxurious unisex attar inspired by the essence of paradise, blending fresh green herbs, delicate florals, warm amber, soft musk, and rich woody notes. Its long-lasting aroma opens with a refreshing herbal freshness and settles into a smooth, elegant, and spiritual fragrance, making it perfect for both everyday wear and special occasions.",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    stock: 50,
    categoryIds: ['3', '4', '5'],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: "Black Oudh",
    brand: "Ajmal",
    price: 3999,
    description: "A deep, smoky, and rich oud fragrance with notes of agarwood, amber, and spices. Perfect for those who love bold, long-lasting scents.",
    image_url: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800",
    stock: 25,
    categoryIds: ['1', '4'],
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: "Floral Bloom",
    brand: "Forest Essentials",
    price: 1899,
    description: "A delicate, feminine fragrance with top notes of jasmine, rose, and sandalwood. An elegant scent for daily wear.",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    stock: 40,
    categoryIds: ['2'],
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: "Royal Oudh",
    brand: "Rasasi",
    price: 4999,
    description: "An opulent blend of rare agarwood, saffron, and musk. Fit for royalty.",
    image_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    stock: 15,
    categoryIds: ['4', '5'],
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: "Fresh Citrus",
    brand: "Body Shop",
    price: 1299,
    description: "A refreshing burst of lemon, bergamot, and mandarin, perfect for summer.",
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    stock: 60,
    categoryIds: ['1', '3'],
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: "Gift Set - Premium Trio",
    brand: "Serenia Parfums",
    price: 5999,
    description: "A curated gift set of three of our best-selling perfumes, perfect for gifting.",
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=800",
    stock: 30,
    categoryIds: ['6'],
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: "Amber Nights",
    brand: "Amouage",
    price: 6499,
    description: "A warm, sensual fragrance with notes of amber, vanilla, and sandalwood. Perfect for evenings.",
    image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    categoryIds: ['3', '5'],
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: "Rose Absolute",
    brand: "Jo Malone",
    price: 3299,
    description: "A classic, elegant rose fragrance with hints of peony and white musk.",
    image_url: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&q=80&w=800",
    stock: 35,
    categoryIds: ['2'],
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    name: "Wood Sage & Sea Salt",
    brand: "Jo Malone",
    price: 2899,
    description: "A fresh, aquatic fragrance with woody notes and a hint of sea salt.",
    image_url: "https://images.unsplash.com/photo-1513483461680-32a07fc74be9?auto=format&fit=crop&q=80&w=800",
    stock: 45,
    categoryIds: ['1', '3'],
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    name: "Oud Royale",
    brand: "Serenia Parfums",
    price: 7999,
    description: "Our signature oud fragrance, crafted with rare Cambodian agarwood and saffron.",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    stock: 12,
    categoryIds: ['4', '5'],
    created_at: new Date().toISOString()
  }
];

let cartItems = [];
let nextProductId = 11;
let nextCategoryId = 7;
let nextCartId = 1;

// --- Middleware ---
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin only' });
  }
};

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);
  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password_hash,
    role: 'customer',
    created_at: new Date().toISOString()
  };
  users.push(newUser);
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });
  res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

app.put('/api/auth/me', authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  const index = users.findIndex(u => u.id === req.user.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users[index] = { ...users[index], name, email };
  res.json({ id: users[index].id, name, email, role: users[index].role });
});

// --- Categories Routes ---
app.get('/api/categories', (req, res) => {
  const activeCats = categories.filter(c => c.isActive);
  res.json(activeCats);
});

app.get('/api/categories/all', authMiddleware, adminMiddleware, (req, res) => {
  res.json(categories);
});

app.post('/api/categories', authMiddleware, adminMiddleware, (req, res) => {
  const { name, description, image, isActive } = req.body;
  const newCategory = {
    id: String(nextCategoryId++),
    name,
    description,
    image,
    isActive: isActive !== undefined ? isActive : true,
    created_at: new Date().toISOString()
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put('/api/categories/:id', authMiddleware, adminMiddleware, (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Category not found' });
  categories[index] = { ...categories[index], ...req.body };
  res.json(categories[index]);
});

app.delete('/api/categories/:id', authMiddleware, adminMiddleware, (req, res) => {
  categories = categories.filter(c => c.id !== req.params.id);
  res.json({ message: 'Category deleted' });
});

// --- Products Routes ---
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/category/:categoryId', (req, res) => {
  const filteredProducts = products.filter(p => p.categoryIds && p.categoryIds.includes(req.params.categoryId));
  res.json(filteredProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/api/products', authMiddleware, adminMiddleware, (req, res) => {
  const newProduct = {
    id: String(nextProductId++),
    ...req.body,
    created_at: new Date().toISOString()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authMiddleware, adminMiddleware, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete('/api/products/:id', authMiddleware, adminMiddleware, (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.json({ message: 'Product removed' });
});

// --- Cart Routes ---
app.get('/api/cart', authMiddleware, (req, res) => {
  const userCartItems = cartItems
    .filter(c => c.user_id === req.user.id)
    .map(c => ({
      ...c,
      products: products.find(p => p.id === c.product_id)
    }));
  res.json(userCartItems);
});

app.post('/api/cart', authMiddleware, (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  const existingItem = cartItems.find(c => c.user_id === req.user.id && c.product_id === product_id);
  if (existingItem) {
    existingItem.quantity += quantity;
    return res.json(existingItem);
  }
  const newItem = {
    id: String(nextCartId++),
    user_id: req.user.id,
    product_id,
    quantity,
    created_at: new Date().toISOString()
  };
  cartItems.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/cart/:id', authMiddleware, (req, res) => {
  const item = cartItems.find(c => c.id === req.params.id && c.user_id === req.user.id);
  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  item.quantity = req.body.quantity;
  res.json(item);
});

app.delete('/api/cart/:id', authMiddleware, (req, res) => {
  cartItems = cartItems.filter(c => c.id !== req.params.id || c.user_id !== req.user.id);
  res.json({ message: 'Item removed from cart' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📧 Demo Admin: admin@sereniaparfums.com / admin123');
  console.log('👤 Demo Customer: suhaibchauhan0@gmail.com / password123');
});
