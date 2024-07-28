const mongoose = require('mongoose');

const propertyTypeSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('PropertyType', propertyTypeSchema);
