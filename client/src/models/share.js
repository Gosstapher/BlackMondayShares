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
    var lastCloseObject = {"date": this.lastClose, "price": this.price};
    this.closingPrice.push(lastCloseObject);
  },
  
  compareCurrentTo: function(wantedDate){
    for(history of this.closingPrice){
      if(history.date == wantedDate){
        var change = (this.price - history.price);
        var step = (change/history.price);
        var percentChange = (step*100); 
        return percentChange;
      }
      else{"No date"};
    }
  }

}

module.exports = Share;
