const express = require('express');
const router = express.Router();
const { addPropertyType, getPropertyTypes } = require('../controller/propertyTypeController');

router.post('/add', addPropertyType);
router.get('/', getPropertyTypes);

module.exports = router;
