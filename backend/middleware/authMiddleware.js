const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    // First, check for session cookie
    if (req.cookies && req.cookies["connect.sid"]) {
        if (req.session.user) {
            req.user = req.session.user; // Attach session user information to req.user
            return next();
        } else {
            return res.status(401).json({ message: 'Session is invalid, please log in again' });
        }
    }

    // If no session cookie, proceed with JWT authentication
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        req.user = user; // Attach full user information to req.user
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired, please log in again' });
        }
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
