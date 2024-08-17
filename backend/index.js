// Importing Packages
const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./database/db');
const cors = require('cors');
const path = require('path'); 
const logger = require('./middleware/logger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const mongoSanitize = require('express-mongo-sanitize'); // Import mongoSanitize

// Configuring dotenv to use the .env file (move this to the very top)
dotenv.config();

// Encryption function
const encrypt = (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

// Creating an express app
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// Apply security headers
app.use(helmet());

// Connecting to the database
connectToDB();

// Accepting JSON data
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Apply mongoSanitize middleware
app.use(mongoSanitize());

// Session configuration
app.use(
  session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 30 * 24 * 60 * 60, // Expiry time in seconds (30 days)
    }),
  })
);

// Logging incoming requests
app.use(logger);

// Serving static files
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// Routes
const userRoutes = require('./routes/userRoutes');
const stateRoutes = require('./routes/stateRoutes');
const propertyRoutes = require('./routes/propertRoutes');
const countryRoutes = require('./routes/countryRoutes');
const cityRoutes = require('./routes/cityRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pageRoutes = require('./routes/pageRoutes');

app.use('/api/propertytypes', propertyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/pages', pageRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
