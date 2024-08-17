const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Manage Property Types with method restrictions
router.route('/property-type')
  .post(adminController.addPropertyType)
router.put('/property-type/:id', adminController.updatePropertyType)
router.all('/property-type', (req, res) => res.status(405).json({ error: "Method not allowed!" }));

// Manage Countries with method restrictions
router.route('/country')
  .post(adminController.addCountry)
router.put('/country/:id', adminController.updateCountry)
router.all('/country', (req, res) => res.status(405).json({ error: "Method not allowed!" }));

// Manage States with method restrictions
router.route('/state')
  .post(adminController.addState)
router.put('/state/:id', adminController.updateState)
router.all('/state', (req, res) => res.status(405).json({ error: "Method not allowed!" }));

// Manage Cities with method restrictions
router.route('/city')
  .post(adminController.addCity)
router.put('/city/:id', adminController.updateCity)
router.all('/city', (req, res) => res.status(405).json({ error: "Method not allowed!" }));

// View Details
router.get('/owners', adminController.getOwners);
router.get('/agents', adminController.getAgents);
router.get('/users', adminController.getUsers);
router.get('/properties', adminController.getProperties);

// Reviews with method restrictions
router.route('/reviews')
  .get(adminController.getReviews)
router.put('/reviews/:id/approve', adminController.approveReview)
router.put('/reviews/:id/disapprove', adminController.disapproveReview)
router.delete('/reviews/:id', adminController.deleteReview)
router.all('/reviews', (req, res) => res.status(405).json({ error: "Method not allowed!" }));

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
