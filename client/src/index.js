var sampleStocks = require('./sampleStockData.json');
var _ = require('lodash');
var apiModel = require('./models/api.js');


window.onload = function(){

  var shareSearch = document.getElementById("shareSearch");
  var epicValue = document.getElementById("epicValue");

  shareSearch.onclick = function(event){
    event.preventDefault();
    var epic = epicValue.value.toUpperCase();
    alert(epic);
    console.log("epic==" + epic);
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + epic +"%22)&env=store://datatables.org/alltableswithkeys&format=json";
    
    var request = new XMLHttpRequest();

    request.open('GET', url);
    
    request.onload = function(){
      if(request.status === 200){
        console.log("got the data");
        shareData = JSON.parse(request.responseText);
        console.log(shareData);
        apiModel.saveToModel(shareData);
      }
    }
    request.send(null);
  }
}