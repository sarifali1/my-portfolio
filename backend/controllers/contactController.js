const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const { AppError } = require('../middleware/errorHandler');

// @desc    Submit contact form
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation failed', 400));
    }

    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    // Email notification temporarily disabled
    console.log('✉️ New contact message:', { name, email, message });

    res.status(201).json({ 
      success: true,
      message: 'Message sent successfully', 
      data: contact 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ 
      success: true,
      count: messages.length,
      data: messages 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return next(new AppError('Message not found', 404));
    }

    res.json({ 
      success: true,
      message: 'Message deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};
