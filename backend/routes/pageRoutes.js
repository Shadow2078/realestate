const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageController');

// Routes for page information with method restrictions
router.route('/get-about-info')
  .get(pageController.getAboutInfo)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/get-contact-info')
  .get(pageController.getContactInfo)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update-about-info')
  .put(pageController.updateAboutInfo)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update-contact-info')
  .put(pageController.updateContactInfo)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

module.exports = router;
