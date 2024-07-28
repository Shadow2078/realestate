const Country = require('../models/countryModel');

// Add a new country
exports.addCountry = async (req, res) => {
    console.log(req.body);
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).send({ message: 'Country name is required.' });
        }

        // Create new country instance
        const newCountry = new Country({ name });

        // Save the country to the database
        await newCountry.save();

        // Send response
        res.status(200).send({ message: 'Country added successfully', country: newCountry });
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Update a country by ID
exports.updateCountry = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Validate input
        if (!name) {
            return res.status(400).send({ message: 'Country name is required.' });
        }

        // Find and update the country
        const updatedCountry = await Country.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCountry) {
            return res.status(404).send({ message: 'Country not found' });
        }

        // Send response
        res.status(200).send({ message: 'Country updated successfully', country: updatedCountry });
    } catch (error) {
        console.error('Error updating country:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get a country by ID
exports.getCountryById = async (req, res) => {
    const { id } = req.params;

    try {
        const country = await Country.findById(id);
        if (!country) {
            return res.status(404).send({ message: 'Country not found' });
        }
        res.status(200).send({ country });
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all countries
exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).send({ countries });
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
