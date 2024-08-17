const express = require('express');
const router = express.Router();
const cityController = require('../controller/cityController');

// City management routes with method restrictions
router.route('/add')
  .post(cityController.addCity)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update/:id')
  .put(cityController.updateCity)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/delete/:id')
  .delete(cityController.deleteCity)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/:id')
  .get(cityController.getCityById)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/')
  .get(cityController.getAllCities)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

module.exports = router;
