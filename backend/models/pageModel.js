const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  about: {
    paragraph: { type: String, default: ''},
    objective1: { type: String, default: ''},
    objective2: { type: String, default: ''},
    objective3: { type: String, default: ''}
  },
  contact: {
    address: { type: String, default: ''},
    contact: { type: String, default: ''},
    workingHours: { type: String, default: ''}
  }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
