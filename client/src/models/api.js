//get input
//get json
//format json
//create share from formatted json

var apiModel = {
  get: function(epic, callback){
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + epic +"%22)&env=store://datatables.org/alltableswithkeys&format=json";

    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(){
      if(request.status === 200){
        console.log("got the data");
        var shareData = JSON.parse(request.responseText);
        console.log(shareData.query.results.quote);
        callback(shareData.query.results.quote);
      }
    }
    request.send(null);
  }
}

module.exports = apiModel;