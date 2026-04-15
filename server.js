require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const Employee = mongoose.model('Employees', new mongoose.Schema({
    employeeID: String,
    name: String,
    department: String,
    jobTitle: String
}));

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true }));

const FoodDonation = mongoose.model('FoodDonation', new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  expiry: Date,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));

app.get('/api/employee', async (req, res) => {
    const employee = await Employee.find();
    res.send(employee);
});

app.post('/api/employee', async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.send(employee);
    console.log('Added new employee:', employee);
});

// User endpoints
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
    console.log('Added new user:', user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Food donation endpoints
app.post('/api/food-donations', async (req, res) => {
  try {
    const donation = new FoodDonation(req.body);
    await donation.save();
    res.status(201).send(donation);
    console.log('Added new food donation:', donation);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/api/food-donations', async (req, res) => {
  const donations = await FoodDonation.find().populate('donor');
  res.send(donations);
});
