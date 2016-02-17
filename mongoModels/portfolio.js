var mongoose = require('mongoose');
var PortfolioShare = require('./PortfolioShare.js');

var PortfolioSchema = new mongoose.Schema({
  holder: {type: String, required: true, unique: false},
  cash: Number,
  PortfolioShares: [{type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioShare'}]
},
{"collection": "portfolio"}
);

var MongoPortfolio = mongoose.model('MongoPortfolio', PortfolioSchema);

module.exports = MongoPortfolio;