const app = require('./app.js');
const mongoose = require('mongoose');
var Data = require('./data.js');
var port = 3000;

function dbCleanup() {
  //remove any documents with links that have not been used for a week
  var cutoffTime = new Date();
  var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  cutoffTime = cutoffTime.getTime() - weekInMilliseconds;

  Data.deleteMany({timestamp: {$lt: cutoffTime}}).exec();
};

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  //run our cleanup func every hour
  setInterval(dbCleanup, 3600000);
});
