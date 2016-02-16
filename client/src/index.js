var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var apiModel = require('./models/api.js');
var Portfolio = require('./models/portfolio.js');
var Share = require('./models/share.js');

window.onload = function(){
  bindEvents();
}

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

