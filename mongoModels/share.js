var mongoose = require('mongoose');

var shareSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: false}, 
  epic: {type: String, required: true, unique: true},
  currentPrice: Number,
  closePrices: []
},
{"collection": "shares"}
);

shareSchema.methods.updateCurrentPrice = function(price){
  this.currentPrice = price;
};

var MongoShare = mongoose.model('mongoShare', shareSchema);


module.exports = MongoShare;