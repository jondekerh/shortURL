const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  url: String,
  shortURL: Number,
  timestamp: Number
});

module.exports = mongoose.model('Data', dataSchema);
