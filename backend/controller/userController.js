const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// User login
exports.login = async (req, res) => {
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

        // Check if password is older than 90 days
        const today = new Date();
        const passwordAge = Math.floor((today - user.passwordChangeDate) / (1000 * 60 * 60 * 24));
        if (passwordAge > 90) {
            return res.status(403).json({
                message: 'Password expired, please update your password.',
                passwordExpired: true
            });
        }

        // Create session
        req.session.userId = user._id;
        req.session.user = user;  // Store the user object in session

        const token = jwt.sign(
            { userId: user._id, role: user.role, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set the token in an httpOnly cookie
        res.cookie('token', token, { httpOnly: true, secure: true });

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
        res.status(500).json({ message: 'Server error during login.' });
    }
};

// Logout user
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');  // Clear the session cookie
        res.json({ message: 'Logout successful' });
    });
};

// Change password
exports.changePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        for (let oldPassword of user.previousPasswords) {
            const isReused = await bcrypt.compare(newPassword, oldPassword);
            if (isReused) {
                return res.status(400).json({ success: false, message: 'You cannot reuse an old password.' });
            }
        }

        user.password = newPassword;
        await user.save();
        res.json({ success: true, message: 'Password updated successfully', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error during password change.' });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error during profile retrieval.' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    let filteredData = { ...req.body };  // Create a copy of the request body

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent users from updating these sensitive fields
        delete filteredData.role;
        delete filteredData.email;  // If you want to prevent email updates, otherwise remove this line
        delete filteredData.password;
        delete filteredData.userName;  // Assuming you have a userName field in your schema

        // Encrypt sensitive information if present
        if (filteredData.dateOfBirth) {
            filteredData.dateOfBirth = encrypt(filteredData.dateOfBirth);
        }
        if (filteredData.phoneNumber) {
            filteredData.phoneNumber = encrypt(filteredData.phoneNumber);
        }
        if (filteredData.address) {
            filteredData.address = encrypt(filteredData.address);
        }

        // Update the user's profile with the filtered and encrypted data
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: filteredData },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error during profile update.' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error during user retrieval.' });
    }
};
