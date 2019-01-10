const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
var Data = require('./data.js');


//mongodb stuff
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to local database')
});


//express routing and such
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => res.sendFile('/public/index.html'));

app.post('/submit-url', (req, res) => {
  function createShortURL(reqURL) {
    var newData = new Data({
      _id: Math.floor(0 + Math.random() * 9999),
      url: reqURL,
      timestamp: Date.now()
    });

    newData.save((err) => {
      if(err) {
        createShortURL(reqURL);
      } else {
        res.send('your shortURL is localhost:3000/' + newData._id);
      };
    });
  };

  createShortURL(req.body.url);

});

app.get('/:id', (req, res) => {
   Data.findOne({_id: req.params.id}, (err, data) => {
     if (err) {
       res.send(err);
     } else {
       //set the timestamp to now every time redirect is used for db cleanup
       data.timestamp = Date.now();
       data.save((err) => {
         if (err) {
           res.send(err);
         }
       });
       //I have no idea why this works, it just does
       //okay for real this needs fixing though as the // prefix fucks with some URLS
       res.redirect('//' + data.url);
     }
   });
});

app.get('/:id/info', (req, res) => {
  Data.findOne({_id: req.params.id}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = app;
