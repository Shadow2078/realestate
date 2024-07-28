// middleware/loggerMiddleware.js

const logger = (req, res, next) => {
    const route = req.route ? req.route.path : 'Unknown route';
    const method = req.method;
    const originalUrl = req.originalUrl;
    const secure = req.headers.authorization ? 'true' : 'false';

    console.log(`@route ${method} ${originalUrl}`);

    next();
};

module.exports = logger;
