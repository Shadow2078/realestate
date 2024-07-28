const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration and login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/:id/change-password', userController.changePassword);
router.put('/:id/update-profile', userController.updateProfile);
router.get('/entities/count', userController.countEntities);
router.get('/count-by-role', userController.countUsersByRole);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/:id', userController.getUserById)
router.get('/getAllUsersWithPropertyCount', userController.getAllUsersWithPropertyCount);

module.exports = router;
