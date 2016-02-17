var mongoose = require('mongoose');
var Share = require('./share.js');
var historicalValuesSchema = new mongoose.Schema({ date: 'number', endOfDayTrade: 'number' });

var portfolioSchema = new mongoose.Schema({
  holder: {String, required: true, unique: false},
  cash: Number,
  sharePortfolio: [],
  HistoricalValues: HistoricalValuesSchema,
},
sharePortfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shares' }];
{"collection": "portfolio"}
;)