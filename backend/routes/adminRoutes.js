const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Manage Property Types
router.post('/property-type', adminController.addPropertyType);
router.put('/property-type/:id', adminController.updatePropertyType);

// Manage Countries
router.post('/country', adminController.addCountry);
router.put('/country/:id', adminController.updateCountry);

// Manage States
router.post('/state', adminController.addState);
router.put('/state/:id', adminController.updateState);

// Manage Cities
router.post('/city', adminController.addCity);
router.put('/city/:id', adminController.updateCity);

// View Details
router.get('/owners', adminController.getOwners);
router.get('/agents', adminController.getAgents);
router.get('/users', adminController.getUsers);
router.get('/properties', adminController.getProperties);

// Reviews
router.get('/reviews', adminController.getReviews);
router.put('/reviews/:id/approve', adminController.approveReview);
router.put('/reviews/:id/disapprove', adminController.disapproveReview);
router.delete('/reviews/:id', adminController.deleteReview);

// Pages
router.put('/pages/about', adminController.updateAboutPage);
router.put('/pages/contact', adminController.updateContactPage);

// Search Properties
router.get('/search', adminController.searchProperties);

// Profile
router.put('/profile', adminController.updateProfile);
router.put('/change-password', adminController.changePassword);
router.post('/recover-password', adminController.recoverPassword);

module.exports = router;
