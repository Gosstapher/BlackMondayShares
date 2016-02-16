
var PortfolioView = function(){

  this.apiShareView = function(shareObject){
      //Clear Objects

      //Display Share Name
      console.log(shareObject)
      var shareName = document.querySelector("#shareName");
      shareName.innerText = shareObject.Name;
      //Display Current Price
      var sharePrice = document.querySelector("#sharePrice");
      sharePrice.innerText = "Current Share Price: £" + shareObject.Ask;
      //Display Yesterday Closing Price
      var yesterdayContainer = document.querySelector("#dailyChange")
      yesterdayContainer.innerHTML = " "
      var yesterdayPrice = document.createElement("li");
      yesterdayPrice.innerText = "Previous Closing Price: £" + shareObject.PreviousClose
      var yesterdayComparison = document.createElement("li");
      yesterdayComparison.innerText = (((shareObject.Ask - shareObject.PreviousClose)/shareObject.PreviousClose) * 100).toFixed(2) + "%";
      console.log(typeof(yesterdayComparison.innerText[0]))
      if(yesterdayComparison.innerText[0] == "-"){
        yesterdayComparison.style.color = "red"
      }else{
        yesterdayComparison.style.color = "green"
      }
      yesterdayContainer.appendChild(yesterdayPrice);
      yesterdayContainer.appendChild(yesterdayComparison);

      //Display Change Against Year High and Low
      var yearContainer = document.querySelector("#year")
      yearContainer.innerHTML = " "
      var yearHigh = document.createElement("li")
      var yearLow = document.createElement("li")
      yearHigh.innerHTML = "<p>Year High: " +  shareObject.YearHigh + " Compared to today: " + ((shareObject.ChangeFromYearHigh/shareObject.YearHigh)*100).toFixed(2) +  "% </p><p>Year Low: " + shareObject.YearLow + " Compared to today: " + ((shareObject.ChangeFromYearLow/shareObject.YearLow)*100).toFixed(2) + "%";

      yearContainer.appendChild(yearHigh)

      var chartContainer = document.querySelector("#liveShareChart");
      var chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo: chartContainer,
        },
        title: {
             text: shareObject.Name +' Share Live Data',
             align: 'center',
        },
        subtitle: {
             text: "CurrentSharePrice: " + shareObject.Currency+ " " + shareObject.Ask,
             align: 'left',
             style: {"color":"blue", "font-size":"1.2em"}
        },
        yAxis: {
            title: {
                text: 'Change in Percent (%)'
            },   
        },
        xAxis: {
            categories: ['Change Since Yesterday', 'Change on Month Average', 'Change on Six Month Average', 'Change On Year High Price', 'Change on Year Low Price', ]
        },

        tooltip: {
            valueSuffix: '%'
        },
        series: [{

          data: [ 
            ["Compared to Yesterdays Closing Value", parseInt((shareObject.Ask - shareObject.PreviousClose)/shareObject.PreviousClose*100)],
            ["Compared to Monthly Average", parseInt(shareObject.PercentChangeFromFiftydayMovingAverage)],
            ["Compared to Six Month Average", parseInt(shareObject.PercentChangeFromTwoHundreddayMovingAverage)],
            ["Compared to Highest Year Value", parseInt(shareObject.PercebtChangeFromYearHigh)],
            ["Compared to Lowest Year Value", parseInt(shareObject.PercentChangeFromYearLow)]
          ],
          threshold: 0,
          negativeColor: 'red',
          color: 'green',
        }]
      
      })//end of HighChart

     console.log(chart) 




  }

  this.createView = function(portfolio){
    //Get the total Values of the Portfolio
    var holderName = document.querySelector("#holderName");
    holderName.innerHTML = "<h2 class='title'>" + portfolio.holder + " Share Portfolio</h2>";
    
    var portfolioContainer = document.querySelector("#mainPortfolioContainer")
    var portfolioCurrentValue = document.createElement("h3")
    portfolioCurrentValue.innerText ="Total Assets in Portfolio: £" + ((portfolio.getCurrentValue().totalAssets)/100) + "          Invested in Shares: £" + ((portfolio.getCurrentValue().shareValue)/100) + "          Cash Holdings: £" + ((portfolio.getCurrentValue().cashTotal)/100);
      portfolioContainer.appendChild(portfolioCurrentValue);

    
    for(shareObject of portfolio.sharePortfolio){
      var portfolioContainer = document.querySelector("#mainPortfolioContainer")
      var shareRow = document.createElement("div");
      shareRow.id = shareObject.name
      //Share Name Display
      var nameHolder = document.createElement("p");
      nameHolder.innerText ="Company Name: " + shareObject.name;
      shareRow.appendChild(nameHolder);
      //Share epic Display
      var epicHolder = document.createElement("p");
      epicHolder.innerText = "Share identifer: " + shareObject.share.epic;
      shareRow.appendChild(epicHolder);
      //Share Current Price Display
      var priceHolder = document.createElement("p");
      priceHolder.innerText = "Current Share Price: " + shareObject.share.price + " pence";
      shareRow.appendChild(priceHolder);
      //Quantity of shares held
      var quantityHolder = document.createElement("p");
      quantityHolder.innerText ="Quantity Held: " + shareObject.quantity;
      shareRow.appendChild(quantityHolder);
      //Display Buy Price
      var percentageChange = ((shareObject.share.price - shareObject.avgPurchasePrice)/(shareObject.avgPurchasePrice)) * 100;
      var buyHolder = document.createElement("div");
      buyHolder.innerHTML = "<p>Buy Price: " + shareObject.avgPurchasePrice + "pence <br> Percentage Change: " + Math.round(percentageChange) + "% </p>" ;
      var percentView = document.querySelector(".percentageChange")
        if(percentageChange > 0){
          buyHolder.style.color = "green"
        }else{
          buyHolder.style.color = "red"
        }
      shareRow.appendChild(buyHolder);
      portfolioContainer.appendChild(shareRow);
      shareRow.style.borderTop = "thick solid #0000FF";
    }//End of Table Build
    
  }//End of Create View Method
}//end of model

module.exports = PortfolioView;