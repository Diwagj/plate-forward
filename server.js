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