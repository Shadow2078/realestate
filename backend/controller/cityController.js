const City = require('../models/cityModel');

// Add a new city
exports.addCity = async (req, res) => {
    console.log(req.body);
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).send({ message: 'City name is required.' });
        }

        // Create new city instance
        const newCity = new City({ name });

        // Save the city to the database
        await newCity.save();

        // Send response
        res.status(200).send({ message: 'City added successfully', city: newCity });
    } catch (error) {
        console.error('Error adding city:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Validate input
        if (!name) {
            return res.status(400).send({ message: 'City name is required.' });
        }

        // Find and update the city
        const updatedCity = await City.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCity) {
            return res.status(404).send({ message: 'City not found' });
        }

        // Send response
        res.status(200).send({ message: 'City updated successfully', city: updatedCity });
    } catch (error) {
        console.error('Error updating city:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get a city by ID
exports.getCityById = async (req, res) => {
    const { id } = req.params;

    try {
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).send({ message: 'City not found' });
        }
        res.status(200).send({ city });
    } catch (error) {
        console.error('Error fetching city:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all cities
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).send({ cities });
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the city
        const deletedCity = await City.findByIdAndDelete(id);

        if (!deletedCity) {
            return res.status(404).send({ message: 'City not found' });
        }

        // Send response
        res.status(200).send({ message: 'City deleted successfully', city: deletedCity });
    } catch (error) {
        console.error('Error deleting city:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};