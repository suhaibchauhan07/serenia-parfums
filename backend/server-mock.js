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
    name: 'Admin User',
    email: 'admin@sereniaparfums.com',
    password_hash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'John Customer',
    email: 'customer@sereniaparfums.com',
    password_hash: bcrypt.hashSync('customer123', 10),
    role: 'customer',
    created_at: new Date().toISOString()
  }
];

let products = [
  {
    id: '1',
    name: 'Chanel N°5',
    brand: 'Chanel',
    price: 150.00,
    description: 'The essence of femininity. A powdery floral bouquet sublimated by an iconic bottle.',
    image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    price: 120.00,
    description: 'A woody, aromatic fragrance for the man who defies convention.',
    image_url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Savage',
    brand: 'Dior',
    price: 110.00,
    description: 'A radically fresh composition, dictated by a name that has the ring of a manifesto.',
    image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 30,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Jadore',
    brand: 'Dior',
    price: 140.00,
    description: 'A tribute to Christian Dior\'s passion for flowers, J\'adore is a fragrance that is both feminine and sensual.',
    image_url: 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 20,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Black Opium',
    brand: 'YSL',
    price: 130.00,
    description: 'A captivating floral gourmand scent, twisted with an overdose of black coffee.',
    image_url: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 12,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    price: 115.00,
    description: 'A bouquet of fine delicacies. The first tasty Iris fragrance.',
    image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 18,
    created_at: new Date().toISOString()
  }
];

let cartItems = [];
let nextId = 7;

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

// --- Products Routes ---
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/api/products', authMiddleware, adminMiddleware, (req, res) => {
  const newProduct = {
    id: String(nextId++),
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
  const { product_id, quantity } = req.body;
  const existingItem = cartItems.find(c => c.user_id === req.user.id && c.product_id === product_id);
  if (existingItem) {
    existingItem.quantity += (quantity || 1);
    return res.json(existingItem);
  }
  const newItem = {
    id: String(cartItems.length + 1),
    user_id: req.user.id,
    product_id,
    quantity: quantity || 1,
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
  console.log('👤 Demo Customer: customer@sereniaparfums.com / customer123');
});
