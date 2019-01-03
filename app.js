const express = require('express');
const path = require('path');
const app = express();


function asdf() {
  console.log('it works bruv');
};

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile('/public/index.html'));

app.get('/submit-url', (req, res) => res.send('asdf'));

module.exports = app;
