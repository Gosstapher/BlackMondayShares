var mongoose = require('mongoose');

var shareSchema = new mongoose.Schema({
  name: {String, required: true, unique: false}, 
  epic: {String, required: true, unique: true},
  currentPrice: Number,
  closePrices: []
},
{"collection": "shares"}
);

var MongoShare = mongoose.model('mongoShare', shareSchema);

module.exports = MongoShare;