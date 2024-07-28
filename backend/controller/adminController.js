const User = require('../models/userModel');
const PropertyType = require('../models/propertyModel');
const Country = require('../models/countryModel');
const State = require('../models/stateModel');
const City = require('../models/cityModel');
const Property = require('../models/propertyModel');

// Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const totalPropertyTypes = await PropertyType.countDocuments();
        const totalCountries = await Country.countDocuments();
        const totalStates = await State.countDocuments();
        const totalCities = await City.countDocuments();
        const totalAgents = await User.countDocuments({ role: 'agent' });
        const totalOwners = await User.countDocuments({ role: 'owner' });
        const totalBuyers = await User.countDocuments({ role: 'buyer' });
        const totalProperties = await Property.countDocuments();

        res.json({
            totalPropertyTypes,
            totalCountries,
            totalStates,
            totalCities,
            totalAgents,
            totalOwners,
            totalBuyers,
            totalProperties
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Property Type
exports.addPropertyType = async (req, res) => {
    try {
        const newPropertyType = new PropertyType(req.body);
        await newPropertyType.save();
        res.status(201).json(newPropertyType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Property Type
exports.updatePropertyType = async (req, res) => {
    try {
        const propertyType = await PropertyType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(propertyType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Country
exports.addCountry = async (req, res) => {
    try {
        const newCountry = new Country(req.body);
        await newCountry.save();
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Country
exports.updateCountry = async (req, res) => {
    try {
        const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(country);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add State
exports.addState = async (req, res) => {
    try {
        const newState = new State(req.body);
        await newState.save();
        res.status(201).json(newState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update State
exports.updateState = async (req, res) => {
    try {
        const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add City
exports.addCity = async (req, res) => {
    try {
        const newCity = new City(req.body);
        await newCity.save();
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update City
exports.updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Owners
exports.getOwners = async (req, res) => {
    try {
        const owners = await User.find({ role: 'owner' }).populate('profile');
        res.json(owners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Agents
exports.getAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: 'agent' }).populate('profile');
        res.json(agents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'buyer' }).populate('profile');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Properties
exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('owner').populate('country').populate('state').populate('city');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Reviews
exports.getReviews = async (req, res) => {
    // try {
    //     const reviews = await Review.find().populate('user').populate('property');
    //     res.json(reviews);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

// Approve Review
exports.approveReview = async (req, res) => {
    // try {
    //     const review = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    //     res.json(review);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

// Disapprove Review
exports.disapproveReview = async (req, res) => {
    // try {
    //     const review = await Review.findByIdAndUpdate(req.params.id, { approved: false }, { new: true });
    //     res.json(review);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

// Delete Review
exports.deleteReview = async (req, res) => {
    // try {
    //     await Review.findByIdAndDelete(req.params.id);
    //     res.json({ message: 'Review deleted' });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

// Update About Page
exports.updateAboutPage = async (req, res) => {
    try {
        // Assume there's a Page model to manage static pages
        const aboutPage = await Page.findOneAndUpdate({ name: 'about' }, req.body, { new: true });
        res.json(aboutPage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Contact Page
exports.updateContactPage = async (req, res) => {
    try {
        const contactPage = await Page.findOneAndUpdate({ name: 'contact' }, req.body, { new: true });
        res.json(contactPage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search Properties
exports.searchProperties = async (req, res) => {
    try {
        const { query } = req;
        const properties = await Property.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { 'owner.name': new RegExp(query, 'i') },
                { 'owner.phone': new RegExp(query, 'i') }
            ]
        }).populate('owner');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user || !await user.comparePassword(currentPassword)) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Recover Password
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Email not found' });
        }

        // Assume a sendPasswordRecoveryEmail function exists to send the recovery email
        await sendPasswordRecoveryEmail(user);
        res.json({ message: 'Password recovery email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
