// importing Packages
const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./database/db');
const cors = require('cors');
const path = require('path'); // Import the 'path' module
const logger = require('./middleware/logger');

// creating an express app
const app = express();
// configuring dotenv to use the .env file

dotenv.config();
const corsOptions = {
  origin:true,
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
// connecting to database
connectToDB();
// accepting json data
app.use(express.json());
// accepting form data
app.use(logger); // Add the logger middleware here
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
const propertyTypesRoutes = require('./routes/propertyTypesRoute');
// const agentRoutes = require('./routes/agentRoutes');

app.use('/api/propertytypes', propertyTypesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/pages', pageRoutes);
// app.use('/api/agents', agentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  });
  