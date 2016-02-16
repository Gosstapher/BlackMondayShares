var mongoose = require('mongoose');

var shareSchema = new mongoose.Schema({
  name: String,
  epic: String,
  currentPrice: Number,
  closePrices: []
},
{"collection": "shares"}
);

var MongoShare = mongoose.model('mongoShare', shareSchema);

module.exports = MongoShare;