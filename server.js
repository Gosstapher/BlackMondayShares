var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Shares = require('./mongoModels/share.js');
var Portfolio = require('./mongoModels/portfolio.js')

mongoose.connect('mongodb://localhost/black-monday');

app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



//DB SHARES

// GET REQUEST TO SHARE COLLECTION
app.get("/shares", function(req, res){
  Shares.find(function(err, shares) {
    if(err) console.log("share GET error: ", err);
    res.json(shares);
  });
});

//POST - CREATE NEW SHARE ON SEARCH
app.post("/shares", function(req, res){
  var newShare = new Shares(req.body);

  newShare.save(function(err, share){
    if(err) console.log("share POST error: ", err);
    console.log("New share Created");
    res.json(newShare);
  });
});

//UPDATE SHARE
// app.post('/shares/:id', function(req, res){

// });

//DB PORTFOLIO (SORRY FOR THE COMMENTS VAL)

//GET REQUEST TO PORTFOLIO COLLECTION
app.get("/portfolio", function(req, res){
  Portfolio.find(function(err, portfolio){
    if(err) console.log("portfolio GET error: ", err);
    res.json(portfolio);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});