var _ = require('lodash');


//Portfolio Constructor and Prototype
var Share = function(name, epic, price){
  this.name = name;
  this.epic = epic;
  this.price = price;
  this.pastPrices = [{date:'01 Jan, 16', closing:200}, {date:'02 Jan, 16', closing:250}];
}



var Portfolio = function(holder, cash){
  this.holder = holder;
  this.cash = cash;
  this.sharePortfolio = [];
  this.historicalValues = [];
  this.addCash = function(newCash){
      this.cash += newCash;
  };


  this.buyShares = function(shareObject, purchasedQuantity){
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

 this.sellShares = function(shareName, quantity){
        var sellShare = _.remove(this.sharePortfolio, function(o){
          return o.name == shareName;
      })
    if(!sellShare[0]){
      console.log("share does not exist in Portfolio");
    }else{
      if(quantity > sellShare[0].quantity)
        console.log("You don't have enough shares to sell")
    }
  }  

  // this.sellShares = function(shareName, quantity){
  //   selectedShares = [];
  //   quantityOfSelected = 0;

  //   for(share of this.sharePortfolio){
  //     if(share.name == shareName){
  //         selectedShares.push(share);
  //     }else{
  //         console.log("You do not hold these shares")
  //     }//end of if
  //   } //end of for loop
    
  //   for(share of selectedShares){

  //   }
  // }//End of sellShares




   }

portfolio1 = new Portfolio("Andrew", 2000)



share1 = new Share("Shell", "SHL", 400)
share2 = new Share("Shell", "SHL", 200)
share3 = new Share("BP", "BPO", 350)



portfolio1.buyShares(share1, 2);
portfolio1.buyShares(share2, 1);
portfolio1.buyShares(share3, 1);
portfolio1.sellShares("Shell", 10);

console.log(portfolio1)




//portfolio1.sellShares("Shell", 200);



//module.exports = Bank;





