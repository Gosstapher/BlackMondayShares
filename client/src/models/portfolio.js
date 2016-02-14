// var Share = require('./share/js');

var Portfolio = function(){
  this.shares = [];
  this.totalCash = 0;
};

Portfolio.prototype = {
  addCash: function(amount){
    this.totalCash += amount;
  }
}

module.exports = Portfolio;