// Importing Packages
const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./database/db');
const cors = require('cors');
const path = require('path'); 
const logger = require('./middleware/logger'); // Adjusted logger placement
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');  // Importing cookie-parser
const crypto = require('crypto');  // Importing the crypto module for encryption
const fs = require('fs');  // Importing fs module to read SSL certificate files
const https = require('https'); // Importing https module to create HTTPS server

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

// Session configuration
app.use(
  session({
    secret: process.env.SECRETSESSION,  // Secret key to encrypt session cookies
    resave: false,  // Do not save session if unmodified
    saveUninitialized: false,  // Do not create session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === 'production',  // Set to true if in production environment
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
      httpOnly: true,  // Cookie is not accessible via JavaScript
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,  // MongoDB connection string
      ttl: 30 * 24 * 60 * 60,  // Expiry time in seconds (30 days)
    }),
  })
);

// Logging incoming requests
app.use(logger); // Logger middleware after session middleware

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

// Read SSL certificate and key files
const key = fs.readFileSync(process.env.SSL_KEY_FILE);
const cert = fs.readFileSync(process.env.SSL_CRT_FILE);

// Creating HTTPS server
const server = https.createServer({ key: key, cert: cert }, app);

const PORT = process.env.PORT || 5000;

// Start the HTTPS server
server.listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});
