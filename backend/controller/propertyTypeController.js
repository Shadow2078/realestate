const PropertyType = require('../models/propertytype');

// Add new property type
const addPropertyType = async (req, res) => {
    console.log(req.body);
    try {
        const { type } = req.body;

        // Validate input
        if (!type) {
            return res.status(400).send({ message: 'Property type is required.' });
        }

        // Create new property type instance
        const newPropertyType = new PropertyType({ type });

        // Save the property type to the database
        await newPropertyType.save();

        // Send response
        res.status(200).send({ message: 'Property type added successfully', propertyType: newPropertyType });
    } catch (error) {
        console.error('Error adding property type:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all property types
const getPropertyTypes = async (req, res) => {
    try {
        const propertyTypes = await PropertyType.find();
        res.status(200).send({ propertyTypes });
    } catch (error) {
        console.error('Error fetching property types:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addPropertyType,
    getPropertyTypes
};
