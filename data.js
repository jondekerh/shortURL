const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  url: {type: String, required: true, unique: true},
  shortURL: Number,
  timestamp: Number
});

module.exports = mongoose.model('Data', dataSchema);
