var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Shares = require('./mongoModels/share.js');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

mongoose.connect('mongodb://localhost/black-monday');

Shares.find(function(err, shares) {
  if(err) console.log(err)
  app.locals.shares = shares;
});

app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET REQUEST TO SHARE DB
// app.get("/", function(req, res){
//   Shares.find(function(err, shares) {
//     if(err) console.log(err)
//     res.('index', { animals: animals });
//   })
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});