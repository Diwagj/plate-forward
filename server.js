require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String
}, { timestamps: true }));

const FoodDonation = mongoose.model('FoodDonation', new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  expiry: Date,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied. No token' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// MongoDB connection with retry and error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Graceful connection state handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected');
});

// User endpoints
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = new User({ username: name, name, email, password: hashedPassword, role: role || 'user' });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
    console.log('✅ New user created:', user.email);
  } catch (error) {
    console.error('User creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
    console.log('✅ User logged in:', user.email);
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: 'Login failed' });
  }
});

app.get('/api/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Food donation endpoints (protected)
app.post('/api/food-donations', authMiddleware, async (req, res) => {
  try {
    const donation = new FoodDonation({ ...req.body, donor: req.user.id });
    await donation.save();
    const populated = await FoodDonation.findById(donation._id).populate('donor', 'name email');
    res.status(201).json(populated);
    console.log('✅ New food donation:', donation.title);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/food-donations', async (req, res) => {
  try {
    const donations = await FoodDonation.find().populate('donor', 'name email');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log('📱 Test endpoints: POST /api/users, POST /api/login');
});

