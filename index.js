var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');

app.use(bodyParser.json());
app.use(middleware.addHeaders);

app.get('/name', middleware.getName);
app.get('/location', middleware.getLocation);
app.get('/occupations', middleware.getOccupations);
app.get('/occupations/latest', middleware.getLatestOccupation);
app.get('/hobbies', middleware.getHobbies);
app.get('/hobbies/:type', middleware.getHobbiesByType);
app.get('/skills', middleware.getSkills);

app.put('/name', middleware.updateName);
app.put('/location', middleware.updateLocation);

app.post('/hobbies', middleware.createHobbies);
app.post('/occupations', middleware.createOccupations);
app.post('/skills', middleware.createSkills);

app.listen(8080, function() {
  console.log('listening on port 8080');
});
