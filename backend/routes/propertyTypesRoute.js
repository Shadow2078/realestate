const express = require('express');
const router = express.Router();
const { addPropertyType, getPropertyTypes, updatePropertyType, deletePropertyType } = require('../controller/propertyTypeController');

router.post('/add', addPropertyType);
router.get('/', getPropertyTypes);
router.put('/update/:id', updatePropertyType);
router.delete('/delete/:id', deletePropertyType);

module.exports = router;
