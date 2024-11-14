const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carTitle: {
    type: String,
    required: true,
  },
  carDescription: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  imgsUrl: [{
    type: String,
    required: true,
  }],
  carModel: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cars', carSchema);

