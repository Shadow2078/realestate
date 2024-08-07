const express = require('express');
const router = express.Router();
const stateController = require('../controller/stateController');

// State management routes
router.post('/add', stateController.addState);
router.put('/update/:id', stateController.updateState);
router.delete('/delete/:id', stateController.deleteState);
router.get('/:id', stateController.getStateById);
router.get('/', stateController.getAllStates);

module.exports = router;
