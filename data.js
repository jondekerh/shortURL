const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  _id: {
    type: Number,
    validate: {
      isAsync: true,
      validator: function(id, isValid) {
        const self = this;
        return self.constructor.findOne({_id: id})
        .exec(function(err, doc) {
          if (err) {
            throw err;
          } else if (doc) {
            if(self._id === doc._id) {
              return isValid(false);
            };
            return isValid(true);
          } else {
            return isValid(true);
          }
        });
      },
      message: '_id already exists'
    }
  },
  url: {
    type: String,
    validate: {
      isAsync: true,
      validator: function(theURL, isValid) {
        const self = this;
        return self.constructor.findOne({url: theURL})
        .exec(function(err, doc) {
          if (err) {
            throw err;
          } else if (doc) {
            if(self.url === doc.url) {
              return isValid(false);
            };
            return isValid(true);
          } else {
            return isValid(true);
          }
        });
      },
      message: 'url already exists'
    }
  },
  timestamp: Number
});

module.exports = mongoose.model('Data', dataSchema);
