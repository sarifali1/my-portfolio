const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], submitContact);

router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
