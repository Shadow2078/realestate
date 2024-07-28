const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyType', required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'sold'], required: true },
    description: { type: String },
    enquiries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry'
    }],
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
        approved: { type: Boolean, default: false }
    }],
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
