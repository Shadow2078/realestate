const express = require('express');
const router = express.Router();
const { addPropertyType, getPropertyTypes, updatePropertyType, deletePropertyType } = require('../controller/propertyTypeController');

// Property Type management routes with method restrictions
router.route('/add')
  .post(addPropertyType)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/')
  .get(getPropertyTypes)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update/:id')
  .put(updatePropertyType)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/delete/:id')
  .delete(deletePropertyType)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

module.exports = router;
