var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var Share = require('./share.js');
var Portfolio = require('./portfolio.js');


var shareArray = [];


createShares = function(){
  for(object of sampleStocks){
    var onloadShare new Share(object.name, object.epic, object.price);
    onloadShare.closingPrice = object.pastCloseOfDayPrices;
    shareArray.push(onloadShare);
  }
}



window.onload = function(){

  
}

