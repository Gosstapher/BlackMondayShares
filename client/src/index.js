var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var apiModel = require('./models/api.js');
var Share = require('./models/share.js');
var Portfolio = require('./models/portfolio.js');
var PortfolioView = require('./PortfolioView.js');

share1 = new Share("Insleys", "INS", 120.00)
var portfolioView = new PortfolioView();


  var createShares = function(){
      portfolioShareArray = [];
      for(object of sampleStocks){
        var onloadShare = new Share(object.name, object.epic, object.price);
        onloadShare.closingPrice = object.pastCloseOfDayPrices;
        var portfolioShareInfo = {name:object.name, share:onloadShare, quantity:object.quantity, date:object.buyDate, avgPurchasePrice:object.buyPrice}
        portfolioShareArray.push(portfolioShareInfo);
      }
      var MumsPortfolio = new Portfolio("Mum's", 1000000)
      MumsPortfolio.sharePortfolio = portfolioShareArray;
      portfolioView.createView(MumsPortfolio);
}


window.onload = function(){
  bindEvents();
  //createShares(portfolioView.createView);
}

function bindEvents(){
  var shareSearch = document.getElementById("shareSearch");

  shareSearch.onclick = function(event){
    event.preventDefault();
    var epicValue = document.getElementById("epicValue"); 
  
    var epic = epicValue.value.toUpperCase();
    apiModel.get(epic, portfolioView.apiShareView);
  }
//Button for DropDown of Portfolio
 var portfolioDropdown = document.getElementById("portfolioButton");
 
  portfolioDropdown.addEventListener('click', function(){
    createShares();
  })


}

function createShareModel(shareData){
  var newShare = new Share(shareData.Name, shareData.symbol, shareData.Ask);
  console.log(newShare);
}









  
    





