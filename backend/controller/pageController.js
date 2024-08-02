const Page = require('../models/pageModel');

// Get About Info
exports.getAboutInfo = async (req, res) => {
  try {
    const page = await Page.findOne();
    if (!page) return res.status(404).send({ message: 'About info not found' });
    res.status(200).send(page.about);
  } catch (error) {
    console.error('Error fetching about info:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Get Contact Info
exports.getContactInfo = async (req, res) => {
  try {
    const page = await Page.findOne();
    if (!page) return res.status(404).send({ message: 'Contact info not found' });
    res.status(200).send(page.contact);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Update About Info
exports.updateAboutInfo = async (req, res) => {
  try {
    const { paragraph, objective1, objective2, objective3 } = req.body;
    let page = await Page.findOne();
    if (!page) {
      page = new Page({ about: { paragraph, objective1, objective2, objective3 }, contact: {} });
    } else {
      page.about = { paragraph, objective1, objective2, objective3 };
    }
    await page.save();
    res.status(200).send({ message: 'About info updated successfully', about: page.about });
  } catch (error) {
    console.error('Error updating about info:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Update Contact Info
exports.updateContactInfo = async (req, res) => {
  try {
    const { address, contact, workingHours } = req.body;
    let page = await Page.findOne();
    if (!page) {
      page = new Page({ contact: { address, contact, workingHours }, about: {} });
    } else {
      page.contact = { address, contact, workingHours };
    }
    await page.save();
    res.status(200).send({ message: 'Contact info updated successfully', contact: page.contact });
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
