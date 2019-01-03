const app = require('./app.js');
var port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
