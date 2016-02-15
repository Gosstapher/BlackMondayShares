// var Bank = require("./bank/bank.js");
var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
//var Account = require("./bank/account.js")








window.onload = function(){

  // console.log(sampleStocks);
  

  createShares = function(){
      portfolioShareArray = [];
      for(object of sampleStocks){
        var onloadShare new Share(object.name, object.epic, object.price);
        onloadShare.closingPrice = object.pastCloseOfDayPrices;
        var portfolioShareInfo = {name:object.name, share:onloadShare, quantity:object.quantity, date:object.buyDate, avgPurchasePrice:Object.buyPrice}
        portfolioShareArray.push(portfolioShareInfo);
      }
      var jaysMumsPortfolio = new Portfolio("Jay's Mum", 1000)
      jaysMumsPortfolio.sharePortfolio = portfolioShareArray;
      console.log("Our Portfolio====", jaysMumsPortfolio);
}

    createShares();

}



