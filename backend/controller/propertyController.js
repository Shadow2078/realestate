const Property = require('../models/propertyModel');
const upload = require('../middleware/multipleDocs');
const User = require('../models/userModel');
const Enquiry = require('../models/enquiryModel');
const State = require('../models/stateModel');
const Country = require('../models/countryModel');
const City = require('../models/cityModel');

// Add a new property
exports.addProperty = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: 'Error uploading files.', error: err.message });
        }

        const { title, type, country, state, city, owner, price, status, description } = req.body;

        console.log('Request body:', req.body);

        if (!title || !type || !country || !state || !city || !owner || !price || !status || !description) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        let image;
        if (req.file) {
            image = req.file.path;
        } else {
            return res.status(400).send({ message: 'Image is required.' });
        }

        try {
            const newProperty = new Property({
                title,
                type,
                country,
                state,
                city,
                owner,
                price,
                status,
                description,
                image
            });

            await newProperty.save();
            res.status(200).send({ message: 'Property added successfully', property: newProperty });
        } catch (error) {
            console.error('Error adding property:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
};

// Update a property by ID
exports.updateProperty = async (req, res) => {
  upload(req, res, async (err) => {
      if (err) {
          return res.status(400).send({ message: 'Error uploading files.', error: err.message });
      }

      const { id } = req.params;
      const { title, type, country, state, city, owner, price, status, description } = req.body;

      console.log('Request body:', req.body);

      if (!title || !type || !country || !state || !city || !owner || !price || !status || !description) {
          return res.status(400).send({ message: 'All fields are required.' });
      }

      try {
          const updateData = {
              title,
              type,
              country,
              state,
              city,
              owner,
              price,
              status,
              description
          };

          if (req.file) {
              updateData.image = req.file.path;
          }

          const updatedProperty = await Property.findByIdAndUpdate(id, updateData, { new: true });

          if (!updatedProperty) {
              return res.status(404).send({ message: 'Property not found' });
          }

          res.status(200).send({ message: 'Property updated successfully', property: updatedProperty });
      } catch (error) {
          console.error('Error updating property:', error);
          res.status(500).send({ message: 'Internal Server Error' });
      }
  });
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
      const property = await Property.findByIdAndDelete(id);

      if (!property) {
          return res.status(404).send({ message: 'Property not found' });
      }

      res.status(200).send({ message: 'Property deleted successfully' });
  } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
      console.log(`Fetching property with ID: ${id}`);
      const property = await Property.findById(id).populate('type country state city owner').populate({
        path: 'reviews.user',
        model: 'User'
    });
      if (!property) {
          console.log('Property not found');
          return res.status(404).send({ message: 'Property not found' });
      }
      res.status(200).send({ property });
  } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
      const properties = await Property.find()
          .populate('type country state city owner')
          .populate({
              path: 'reviews.user',
              model: 'User'
          });
      res.status(200).send({ properties });
  } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).send({ message: 'Internal Server Error' });
  }
};
// In propertyController.js
exports.getUserByIdWithProperties = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const properties = await Property.find({ owner: user._id }).populate('type country state city').populate({
          path: 'reviews.user',
          model: 'User'
      });

        res.status(200).send({
            user: user.toObject(),
            properties
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.getPropertiesByUserId = async (req, res) => {
    const { id } = req.params;
    try {
      const properties = await Property.find({ owner: id }).populate('type country state city owner').populate({
        path: 'reviews.user',
        model: 'User'
    });
      res.status(200).send({ properties });
    } catch (error) {
      console.error('Error fetching properties by user ID:', error);
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



// Add enquiry to a property
exports.addEnquiry = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);

    if (!user || user.role !== 'buyer') {
      return res.status(403).send({ message: 'Only buyers can send enquiries.' });
    }

    const property = await Property.findById(req.params.propertyId);
    const newEnquiry = new Enquiry({
      property: req.params.propertyId,
      user: req.body.user,
      message: req.body.message,
    });

    await newEnquiry.save();
    property.enquiries.push(newEnquiry._id);
    await property.save();

    res.status(200).send({ message: 'Enquiry added successfully', enquiry: newEnquiry });
  } catch (error) {
    console.error('Error adding enquiry:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Add review to a property
exports.addReview = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);

    if (!user || user.role !== 'buyer') {
      return res.status(403).send({ message: 'Only buyers can submit reviews.' });
    }

    const property = await Property.findById(req.params.propertyId);
    property.reviews.push({
      user: req.body.user,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await property.save();

    res.status(200).send({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.getEnquiriesByUserId = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ user: req.params.userId }).populate('property');
    res.status(200).send({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries by user ID:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Get enquiries by property owner ID
exports.getEnquiriesByOwnerId = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const properties = await Property.find({ owner: ownerId }).select('_id');
    const propertyIds = properties.map(property => property._id);
    const enquiries = await Enquiry.find({ property: { $in: propertyIds } }).populate('property user');
    res.status(200).send({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries for owner:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Respond to an enquiry
exports.respondToEnquiry = async (req, res) => {
  const { enquiryId } = req.params;
  const { response } = req.body;
  try {
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res.status(404).send({ message: 'Enquiry not found' });
    }
    enquiry.response = response;
    await enquiry.save();
    res.status(200).send({ message: 'Response added successfully', enquiry });
  } catch (error) {
    console.error('Error responding to enquiry:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
// Get enquiries by agent ID
// Fetch enquiries for properties managed by the agent
exports.getAgentEnquiries = async (req, res) => {
  const { agentId } = req.params;
  try {
    const properties = await Property.find({ owner: agentId });
    const propertyIds = properties.map(property => property._id);
    const enquiries = await Enquiry.find({ property: { $in: propertyIds } }).populate('property user');

    res.status(200).send({ enquiries });
  } catch (error) {
    console.error('Error fetching agent enquiries:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Fetch all enquiries for admin
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate('property user');
    res.status(200).send({ enquiries });
  } catch (error) {
    console.error('Error fetching all enquiries:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.filterPropertiesByNames = async (req, res) => {
  const { country, state, city } = req.query;

  try {
      // Find country, state, and city by their names
      const countryObj = await Country.findOne({ name: country });
      const stateObj = await State.findOne({ name: state });
      const cityObj = await City.findOne({ name: city });

      if (!countryObj || !stateObj || !cityObj) {
          return res.status(404).send({ message: 'Invalid location parameters.' });
      }

      // Find properties based on the IDs of country, state, and city
      const properties = await Property.find({
          country: countryObj._id,
          state: stateObj._id,
          city: cityObj._id
      }).populate('type country state city owner');

      res.status(200).send({ properties });
  } catch (error) {
      console.error('Error fetching filtered properties:', error);
      res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Approve a review by index
exports.approveReview = async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }

    const review = property.reviews.id(reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }

    review.approved = true;
    await property.save();

    res.status(200).send({ message: 'Review approved successfully', review });
  } catch (error) {
    console.error('Error approving review:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Disapprove a review by reviewId
exports.disapproveReview = async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }

    const review = property.reviews.id(reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }

    review.approved = false;
    await property.save();

    res.status(200).send({ message: 'Review disapproved successfully', review });
  } catch (error) {
    console.error('Error disapproving review:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Delete a review by reviewId
exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }

    const review = property.reviews.id(reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }

    property.reviews.pull(reviewId);
    await property.save();

    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};