// var Bank = require("./bank/bank.js");
var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var Share = require('./models/share.js')
var Portfolio = require('./models/portfolio.js')



  createShares = function(){
      portfolioShareArray = [];
      for(object of sampleStocks){
        var onloadShare = new Share(object.name, object.epic, object.price);
        onloadShare.closingPrice = object.pastCloseOfDayPrices;
        var portfolioShareInfo = {name:object.name, share:onloadShare, quantity:object.quantity, date:object.buyDate, avgPurchasePrice:object.buyPrice}
        portfolioShareArray.push(portfolioShareInfo);
      }
      var MumsPortfolio = new Portfolio("Mum", 1000)
      MumsPortfolio.sharePortfolio = portfolioShareArray;
      return MumsPortfolio;
}

share1 = new Share("Insleys", "INS", 120.00)



window.onload = function(){

    var portfolio = createShares();
    portfolio.addCash(2000);
    portfolio.buyShares(share1, 1)
    console.log(portfolio);

}



