var _ = require('lodash');
var Share = require('./share.js');
var moment = require('moment')

var Portfolio = function(holder, cash){
  this.holder = holder;
  this.cash = cash;
  this.sharePortfolio = [];
  this.historicalValues = [];
}



Portfolio.prototype = {
  addCash: function(newCash){
      this.cash += newCash;
  },


  buyShares: function(shareObject, purchasedQuantity){
    if(this.cash > (shareObject.price * purchasedQuantity)){
        var currentShare = _.remove(this.sharePortfolio, function(o){
          return o.name == shareObject.name;
      })
        console.log("currentShare==", currentShare[0])
       
      if(!currentShare[0]){//This part of the function will be if the share doesnt currently exist in the portfolio

        var newShares = {name:shareObject.name, share:shareObject, quantity:purchasedQuantity, date: new Date(), avgPurchasePrice:shareObject.price};
        
        this.sharePortfolio.push(newShares);
        this.cash -= (shareObject.price * purchasedQuantity);
        
      }else{//If the current share already in portfolio
        console.log("This is same share")
        newAverage =  ((currentShare[0].avgPurchasePrice * currentShare[0].quantity) + (shareObject.price * purchasedQuantity))/(currentShare[0].quantity + purchasedQuantity);

        
        currentShare[0].avgPurchasePrice = newAverage;
        currentShare[0].quantity += purchasedQuantity;
        this.sharePortfolio.push(currentShare[0])
        this.cash -= (shareObject.price * purchasedQuantity);
  }}else{
    console.log("You have insufficient funds")
    var possibleAmount = (this.cash / shareObject.price);
    console.log("You can only purchase " + Math.floor(possibleAmount) + " " +  shareObject.name + " Shares") 
  }
 },

 sellShares: function(shareName, sellQuantity){
        var sellShare = _.remove(this.sharePortfolio, function(o){
          return o.name == shareName;
      })
    if(!sellShare[0]){
      console.log("share does not exist in Portfolio");
    }else{
      if(sellQuantity > sellShare[0].quantity){
        console.log("You don't have enough shares to sell you only have " + sellShare[0].quantity)
      }else{
        console.log("Sell Shares")
        sellShare[0].quantity -=sellQuantity;
        sellShare.date = new Date();
        this.cash += sellShare[0].share.price * sellQuantity;
        if(sellShare[0].quantity > 0){
          this.sharePortfolio.push(sellShare[0])
        }

      }
    } 

  }, //end of the sell Shares  

getCurrentValue: function(){
    var totalShareValue = 0;
    var totalHoldings = []
  for(shareObject of this.sharePortfolio){
    var holdingValue = shareObject.share.price * shareObject.quantity;
    totalShareValue +=holdingValue;
    var shareByShare = {name:shareObject.name, value:holdingValue}
    totalHoldings.push(shareByShare);
  }
  var CurrentValue = {shares:totalHoldings, shareValue:totalShareValue, cashTotal:this.cash, totalAssets:(this.cash + totalShareValue)};
      return CurrentValue
},

endOfDayValue: function(){
  var currentValue = this.getCurrentValue();
  var endOfDayObject = {date:new Date(), totalEndValue:currentValue.totalAssets, shareEndValue:currentValue.shareValue, cashEndValue:currentValue.cashTotal}

  this.historicalValues.push(endOfDayObject)
},

  compareValues: function(historyDate){
  var currentValue = this.getCurrentValue().totalAssets;
  var historicalValue = _.find(this.historicalValues, function(o){
        var inputStringDate = new Date(historyDate).toDateString();
        var oStringDate = o.date.toDateString();
        console.log("inputted date==", inputStringDate);
        console.log("historical date date==", oStringDate);

            return inputStringDate == oStringDate  
    })
  var percentageChange =  ((currentValue - historicalValue.totalEndValue)/historicalValue.totalEndValue) *100;
      return percentageChange;
  
  }//end of compare values

}// end of prototype

module.exports = Portfolio
