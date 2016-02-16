// var Bank = require("./bank/bank.js");
var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var Share = require('./models/share.js');
var Portfolio = require('./models/portfolio.js');
var PortfolioView = require('./PortfolioView.js');

share1 = new Share("Insleys", "INS", 120.00)
portfolioView = new PortfolioView();


  createShares = function(callback){
      portfolioShareArray = [];
      for(object of sampleStocks){
        var onloadShare = new Share(object.name, object.epic, object.price);
        onloadShare.closingPrice = object.pastCloseOfDayPrices;
        var portfolioShareInfo = {name:object.name, share:onloadShare, quantity:object.quantity, date:object.buyDate, avgPurchasePrice:object.buyPrice}
        portfolioShareArray.push(portfolioShareInfo);
      }
      var MumsPortfolio = new Portfolio("Mum's", 1000)
      MumsPortfolio.sharePortfolio = portfolioShareArray;
       MumsPortfolio;
       callback(MumsPortfolio);
}




window.onload = function(){

    createShares(portfolioView.createView);
    


}



