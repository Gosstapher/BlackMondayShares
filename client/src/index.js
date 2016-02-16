var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var apiModel = require('./models/api.js');
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
  bindEvents();
  createShares(portfolioView.createView);
}

var populateSharesFromDB = function(){
  var url = '/shares'
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var mongoShares = JSON.parse(jsonString);
      console.log("mongoShare: ", mongoShares);
    }
  }.bind(this);
  request.send(null);
}

populateSharesFromDB();

function bindEvents(){
  var shareSearch = document.getElementById("shareSearch");

  shareSearch.onclick = function(event){
    event.preventDefault();
    var epicValue = document.getElementById("epicValue"); 
  
    var epic = epicValue.value.toUpperCase();
    apiModel.get(epic, createShareModel);
  }

}

function createShareModel(shareData){
  var newShare = new Share(shareData.Name, shareData.symbol, shareData.Ask);
  console.log(newShare);
}
