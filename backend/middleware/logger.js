const winston = require('winston');
require('winston-mongodb');
const User = require('../models/userModel'); // Adjust the path if necessary

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Ensure logs are in JSON format
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: 'mongodb://127.0.0.1:27017/realestate',
            collection: 'logs',
            level: 'info',
            options: { useUnifiedTopology: true }
        })
    ]
});

const logRequest = async (req, res, next) => {
    let email = 'Unknown email';
    let sessionId = req.sessionID || 'No session ID';

    if (req.user && req.user._id) {
        try {
            const user = await User.findById(req.user._id).select('email');
            if (user) {
                email = user.email;
            }
        } catch (error) {
            console.error('Error fetching user for logging:', error);
        }
    }

    // Define log object with specific fields
    const logEntry = {
        email: email,           // Replaced userName with email
        sessionId: sessionId,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString() // Add a timestamp manually to ensure it logs properly
    };

    // Log the object directly (without wrapping it in a message)
    logger.info(logEntry);

    next();
};

module.exports = logRequest;
