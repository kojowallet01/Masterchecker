const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/admin-login', AuthController.adminLogin);

// Protected routes
router.get('/me', authMiddleware, AuthController.getCurrentUser);

module.exports = router;
