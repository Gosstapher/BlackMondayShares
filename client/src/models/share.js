var moment = require('moment');

var Share = function(name, epic, price){
  this.name = name;
  this.epic = epic;
  this.price = price;
  this.closingPrice = [];
  this.lastClose = null;
}

Share.prototype = {
  newPrice: function(amount){
    this.price = amount;
  },
  closingDayRecord: function(closeDate){
    var date = Date.parse(closeDate) || 0;
    this.lastClose = moment(date).format("MMM Do YY");
  }
}

module.exports = Share;