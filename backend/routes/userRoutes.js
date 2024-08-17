const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const loginLimiter = require('../middleware/rateLimiter');

router.post('/register', userController.register);

// Apply rate limiting to the login route
router.post('/login', loginLimiter, userController.login);

// Logout route to destroy the session
router.post('/logout', authMiddleware, userController.logout);

// Protect the profile routes with authentication middleware
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Protect password change route with authentication
router.put('/:id/change-password', authMiddleware, userController.changePassword);

// Protect route to get user by ID
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;
