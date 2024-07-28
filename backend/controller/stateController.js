const State = require('../models/stateModel');

// Add a new state
exports.addState = async (req, res) => {
    console.log(req.body);
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).send({ message: 'State name is required.' });
        }

        // Create new state instance
        const newState = new State({ name });

        // Save the state to the database
        await newState.save();

        // Send response
        res.status(200).send({ message: 'State added successfully', state: newState });
    } catch (error) {
        console.error('Error adding state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Update a state by ID
exports.updateState = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Validate input
        if (!name) {
            return res.status(400).send({ message: 'State name is required.' });
        }

        // Find and update the state
        const updatedState = await State.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedState) {
            return res.status(404).send({ message: 'State not found' });
        }

        // Send response
        res.status(200).send({ message: 'State updated successfully', state: updatedState });
    } catch (error) {
        console.error('Error updating state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get a state by ID
exports.getStateById = async (req, res) => {
    const { id } = req.params;

    try {
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).send({ message: 'State not found' });
        }
        res.status(200).send({ state });
    } catch (error) {
        console.error('Error fetching state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all states
exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).send({ states });
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
