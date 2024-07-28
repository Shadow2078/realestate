const Property = require('../models/propertyModel');

// Get the total number of houses added by the agent and the total number of enquiries received
exports.getAgentOverview = async (req, res) => {
  try {
    const agentId = req.params.id;

    const houses = await Property.find({ owner: agentId });
    const totalHouses = houses.length;

    const totalEnquiries = houses.reduce((sum, house) => sum + house.enquiries.length, 0);

    res.status(200).send({ totalHouses, totalEnquiries, houses });
  } catch (error) {
    console.error('Error fetching agent overview data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
