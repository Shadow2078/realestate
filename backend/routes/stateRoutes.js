const express = require('express');
const router = express.Router();
const stateController = require('../controller/stateController');

// State management routes with method restrictions
router.route('/add')
  .post(stateController.addState)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/update/:id')
  .put(stateController.updateState)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/delete/:id')
  .delete(stateController.deleteState)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/:id')
  .get(stateController.getStateById)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

router.route('/')
  .get(stateController.getAllStates)
  .all((req, res) => res.status(405).json({ error: "Method not allowed!" }));

module.exports = router;
