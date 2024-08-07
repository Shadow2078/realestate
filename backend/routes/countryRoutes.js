const express = require('express');
const router = express.Router();
const countryController = require('../controller/countryController');
const authMiddleware = require('../middleware/authMiddleware');

// Country management routes
router.post('/add', countryController.addCountry);
router.put('/update/:id', countryController.updateCountry);
router.delete('/delete/:id', countryController.deleteCountry);
router.get('/:id', countryController.getCountryById);
router.get('/', countryController.getAllCountries);
module.exports = router;
