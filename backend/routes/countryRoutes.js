const express = require('express');
const router = express.Router();
const countryController = require('../controller/countryController');
const authMiddleware = require('../middleware/authMiddleware');

// Country management routes with method restrictions
router.route('/add')
  .post(authMiddleware, countryController.addCountry)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update/:id')
  .put(authMiddleware, countryController.updateCountry)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/delete/:id')
  .delete(authMiddleware, countryController.deleteCountry)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/:id')
  .get(authMiddleware, countryController.getCountryById)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/')
  .get(authMiddleware, countryController.getAllCountries)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

module.exports = router;
