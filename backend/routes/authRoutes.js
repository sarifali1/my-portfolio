const express = require('express');
const router = express.Router();
const { login, createAdmin } = require('../controllers/authController');

router.post('/login', login);
// router.post('/create-admin', createAdmin); // Use once, then comment out

module.exports = router;
