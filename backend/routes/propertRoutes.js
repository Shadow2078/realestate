const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

// Property management routes
router.route('/add')
  .post(authMiddleware, propertyController.addProperty)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update/:id')
  .put(authMiddleware, propertyController.updateProperty)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/delete/:id')
  .delete(authMiddleware, propertyController.deleteProperty)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

// Route for property searching
router.get('/search/filter', propertyController.filterPropertiesByNames);

// Other specific property routes
router.get('/:id', propertyController.getPropertyById);
router.get('/', propertyController.getAllProperties);
router.get('/:id/properties', propertyController.getUserByIdWithProperties);
router.get('/users/:id/properties', propertyController.getPropertiesByUserId);

// Enquiries and reviews
router.post('/:propertyId/enquiries', authMiddleware, propertyController.addEnquiry);
router.post('/:propertyId/reviews', authMiddleware, propertyController.addReview);
router.get('/user/:userId', propertyController.getEnquiriesByUserId);
router.get('/owner/:ownerId/enquiries', propertyController.getEnquiriesByOwnerId);
router.post('/enquiries/:enquiryId/respond', authMiddleware, propertyController.respondToEnquiry);
router.get('/agent/enquiries/:agentId', propertyController.getAgentEnquiries);
router.get('/admin/enquiries', propertyController.getAllEnquiries);

// Reviews management
router.put('/reviews/approve/:id/:reviewId', authMiddleware, propertyController.approveReview);
router.put('/reviews/disapprove/:id/:reviewId', authMiddleware, propertyController.disapproveReview);
router.put('/reviews/delete/:id/:reviewId', authMiddleware, propertyController.deleteReview);

module.exports = router;
