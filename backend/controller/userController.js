const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Property = require('../models/propertyModel');
const PropertyType = require('../models/propertytype');
const Country = require('../models/countryModel');
const State = require('../models/stateModel');
const City = require('../models/stateModel');
// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isAdmin: role === 'admin'
        });

        await newUser.save();

        res.status(201).json({ message: `Registration Successful!` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
exports.login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get user profile

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { id } = req.params; // Get the user ID from params
    const { name, email } = req.body;

    try {
        const user = await User.findById(id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;

            const updatedUser = await user.save();

            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Count users by role
exports.countUsersByRole = async (req, res) => {
    try {
        const agents = await User.countDocuments({ role: 'agent' });
        const owners = await User.countDocuments({ role: 'owner' });
        const buyers = await User.countDocuments({ role: 'buyer' });

        res.status(200).send({ agents, owners, buyers });
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Count various entities
exports.countEntities = async (req, res) => {
    try {
        const properties = await Property.countDocuments();
        const propertyTypes = await PropertyType.countDocuments();
        const countries = await Country.countDocuments();
        const states = await State.countDocuments();
        const cities = await City.countDocuments();

        res.status(200).send({ properties, propertyTypes, countries, states, cities });
    } catch (error) {
        console.error('Error counting entities:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all users with property count
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        // Count properties for each user
        const usersWithPropertiesCount = await Promise.all(
            users.map(async (user) => {
                const propertyCount = await Property.countDocuments({ owner: user._id });
                return {
                    ...user.toObject(),
                    propertyCount
                };
            })
        );

        res.status(200).send(usersWithPropertiesCount);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get user by ID and their properties count
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const propertyCount = await Property.countDocuments({ owner: user._id });

        res.status(200).send({
            ...user.toObject(),
            propertyCount
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.getAllUsersWithPropertyCount = async (req, res) => {
    try {
      const users = await User.find({});
      const usersWithPropertyCount = await Promise.all(users.map(async (user) => {
        const propertyCount = await Property.countDocuments({ owner: user._id });
        return { ...user.toObject(), propertyCount };
      }));
  
      res.status(200).json(usersWithPropertyCount);
    } catch (error) {
      console.error('Error fetching users with property count:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };