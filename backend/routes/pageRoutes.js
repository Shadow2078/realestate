const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageController');

router.get('/get-about-info', pageController.getAboutInfo);
router.get('/get-contact-info', pageController.getContactInfo);
router.put('/update-about-info', pageController.updateAboutInfo);
router.put('/update-contact-info', pageController.updateContactInfo);

module.exports = router;
