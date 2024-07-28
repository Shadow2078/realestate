const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

// Property management routes
router.post('/add', propertyController.addProperty);
router.put('/update/:id', propertyController.updateProperty);
router.get('/search/filter', propertyController.filterPropertiesByNames);
router.get('/:id', propertyController.getPropertyById); // Ensure this route is specific enough to not conflict with other routes
router.get('/', propertyController.getAllProperties);
router.get('/:id/properties', propertyController.getUserByIdWithProperties);
router.get('/users/:id/properties', propertyController.getPropertiesByUserId);
router.post('/:propertyId/enquiries', propertyController.addEnquiry);
router.post('/:propertyId/reviews', propertyController.addReview);
router.get('/user/:userId', propertyController.getEnquiriesByUserId); // Ensure this line is correct
router.get('/owner/:ownerId/enquiries', propertyController.getEnquiriesByOwnerId); // New route
router.post('/enquiries/:enquiryId/respond', propertyController.respondToEnquiry); // 
router.get('/agent/enquiries/:agentId', propertyController.getAgentEnquiries);
router.get('/admin/enquiries', propertyController.getAllEnquiries);

module.exports = router;
