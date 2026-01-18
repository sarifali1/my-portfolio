const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { AppError } = require('../middleware/errorHandler');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Admin Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(new AppError('Invalid credentials', 401));
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = generateToken(admin._id);
    res.json({ 
      success: true,
      token, 
      email: admin.email 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Admin
exports.createAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return next(new AppError('Admin already exists', 400));
    }

    const admin = await Admin.create({ email, password });
    res.status(201).json({ 
      success: true,
      message: 'Admin created successfully' 
    });
  } catch (error) {
    next(error);
  }
};
