var mongoose = require('mongoose');
var Share = require('./share.js');

var portfolioSchema = new mongoose.Schema({
  holder: {type: String, required: true, unique: false},
  cash: Number,
  sharePortfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Share', quantity: 'number' }]
},
{"collection": "portfolio"}
);

var MongoPortfolio = mongoose.model('MongoPortfolio', portfolioSchema);

module.exports = MongoPortfolio;