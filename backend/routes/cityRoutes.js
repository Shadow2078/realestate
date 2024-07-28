const express = require('express');
const router = express.Router();
const cityController = require('../controller/cityController');

// City management routes
router.post('/add', cityController.addCity);
router.put('/update/:id', cityController.updateCity);
router.get('/:id', cityController.getCityById);
router.get('/', cityController.getAllCities);


module.exports = router;
