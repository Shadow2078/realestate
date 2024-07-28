const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    response: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
