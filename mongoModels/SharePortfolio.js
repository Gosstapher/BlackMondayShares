var mongoose = require('mongoose');
var Share = require('./share.js');

var PortfolioShare = new mongoose.Schema({
  share: {type: mongoose.Schema.Types.ObjectId, ref: 'Share'},
  quantity: Number,
  purchaseDate: Date,
  purchasePrice: Number
});

var MongoPortfolioShare = mongoose.model('MongoPortfolioShare', PortfolioShareSchema);

module.exports = MongoPortfolioShare;