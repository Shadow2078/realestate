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

// Update a property type by ID
const updatePropertyType = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    try {
        // Validate input
        if (!type) {
            return res.status(400).send({ message: 'Property type is required.' });
        }

        // Find and update the property type
        const updatedPropertyType = await PropertyType.findByIdAndUpdate(id, { type }, { new: true });

        if (!updatedPropertyType) {
            return res.status(404).send({ message: 'Property type not found' });
        }

        // Send response
        res.status(200).send({ message: 'Property type updated successfully', propertyType: updatedPropertyType });
    } catch (error) {
        console.error('Error updating property type:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Delete a property type by ID
const deletePropertyType = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the property type
        const deletedPropertyType = await PropertyType.findByIdAndDelete(id);

        if (!deletedPropertyType) {
            return res.status(404).send({ message: 'Property type not found' });
        }

        // Send response
        res.status(200).send({ message: 'Property type deleted successfully', propertyType: deletedPropertyType });
    } catch (error) {
        console.error('Error deleting property type:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addPropertyType,
    getPropertyTypes,
    updatePropertyType,
    deletePropertyType,
};