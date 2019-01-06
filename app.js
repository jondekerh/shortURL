const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
var Data = require('./data.js')


//mongodb stuff
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to local database')
});

//func to generate ShortURLs
function genShortURL() {
  shortURL = Math.floor(1000 + Math.random() * 9000);
  return shortURL;
};


//express routing and such
app.use(express.static(path.join(__dirname, '/public')));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => res.sendFile('/public/index.html'));

app.post('/submit-url', (req, res) => {
  var newData = new Data({
    url: req.body.url,
    shortURL: genShortURL(),
    timestamp: Date.now()
  });

  newData.save((err) => {
    if(err) {
      res.type('html').status(500);
      res.send('ERROR: ' + err);
    } else {
      res.send('created: ' + newData);
    }
  });
});

app.get('/:shortURL', (req, res) => {
   var entry = Data.find({shortURL: req.params.shortURL}).exec((err, datas) => {
     res.send(datas[0].url);
   })
});

app.get('/results', (req, res) => res.send(
  Data.find((err, datas) => {
    console.log(datas);
  })
));

module.exports = app;

//move the stuff out of its nested func in mongo shit so we can access data, not sure how to return search results yet
