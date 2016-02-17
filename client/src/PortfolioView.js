
function PortfolioView(){

  this.apiShareView = function(shareObject){
      //Display Share Name
      var shareName = document.querySelector("#shareName");
      shareName.innerText = shareObject.Name;
      //Display Current Price
      var sharePrice = document.querySelector("#currentPrice");
      sharePrice.innerText = shareObject.Ask;
      //Display Yesterday Closing Price
      var yesterdayContainer = document.querySelector("#prevoiusClose")
      yesterdayContainer.innerText = shareObject.PreviousClose;
      //Display change since Yesterday
      var yesterdayComparison = document.querySelector("#sinceClose");
      yesterdayComparison.innerText = (((shareObject.Ask - shareObject.PreviousClose)/shareObject.PreviousClose) * 100).toFixed(2) + "%";
     
      if(yesterdayComparison.innerText[0] == "-"){
        yesterdayComparison.style.color = "red"
      }else{
        yesterdayComparison.style.color = "green"
      }
      
     

      //Display Change Against Year High and Low
    
      console.log(shareObject)
      var yearHigh = document.querySelector("#yearHigh");
      var yearLow = document.querySelector("#yearLow");
      var changeHigh = document.querySelector("#changeHigh");
      var changeLow = document.querySelector("#changeLow");
      yearHigh.innerHTML = shareObject.YearHigh
      yearLow.innerHTML =  shareObject.YearLow
      changeHigh.innerText = shareObject.PercebtChangeFromYearHigh;
      changeLow.innerText =  shareObject.PercentChangeFromYearLow;
      //Colouring Year High Data
      if(changeHigh.innerText[0] == "-"){
        changeHigh.style.color = "red"
      }else{
        changeHigh.style.color = "green"
      } 
      //Coloring Year Low Data
      if(changeLow.innerText[0] == "-"){
        changeLow.style.color = "red"
      }else{
        changeLow.style.color = "green"
      }
      

      
      //Start of Share Info Chart
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

  var recommend = document.querySelector("#recommendation")
  if(shareObject.Ask < (shareObject.YearHigh*0.75) && shareObject.Ask > shareObject.PreviousClose && shareObject.Ask < (shareObject.PreviousClose*1.025)){
      recommend.innerHTML = "<h3 id='recom' >Black Monday Recommend a Strong Buy on this Share </h3>"
      recommend.style.color = "Green";
  } else if(shareObject.Ask > (shareObject.YearHigh*0.8) && shareObject.Ask < (shareObject.PreviousClose*1.005) && shareObject.Ask > (shareObject.PreviousClose*0.99)){
      recommend.innerHTML = "<h3 id='recom' >Black Monday Recommend a Strong Sell on this Share </h3>"
      recommend.style.color = "Red";
  }else {
    recommend.innerHTML = "<h3 id='recom' >Black Monday Recommend is Neutral on this Stock </h3>"
    recommend.style.color = "Black";
  }

  },

  this.createView = function(portfolio){
    //Get the total Values of the Portfolio
    var holderName = document.querySelector("#holderName");
    holderName.innerHTML = "<h2 class='title'>" + portfolio.holder + " Share Portfolio</h2>";

    var portfolioContainer = document.querySelector("#mainPortfolioContainer")
  //Portfolio Column Chart
    var portfolioChart = document.createElement("div");
    portfolioContainer.appendChild(portfolioChart);
    portfolioChart.id = "portfolioChart";
    portfolioChart.style.width = "50%";
    portfolioChart.style.display = "inline-block";
    


    //Portfolio Value Chart
    var portfolioChart = new Highcharts.Chart({
      chart: {
        type: 'column',
        renderTo: portfolioChart,
      },
      title: {
        text:"Graph displaying info for " + portfolio.holder + " Portfolio",
        align: 'center',
      },
      yAxis: {
        title: {
          text: 'Value in USD ($)'
        },   
      },
      xAxis: {
        categories: ['Total Assets', 'Shares holdings', 'Cash Holdings' ]
      },
      tooltip: {
        valuePrefix: '£'
      },
      plotOptions: {
              column: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
              }
      },
      series: [{
        data:[
          ["Total Assets Held", (portfolio.getCurrentValue().totalAssets)/100],
          ["Total Share Holdings", (portfolio.getCurrentValue().shareValue/100)],
          ["Total Cash Holdings", (portfolio.getCurrentValue().cashTotal/100)],
        ]
      }]

    })//End of bar chart Construct

    //Creating Data for Pie Chart
    var portfolioPie = document.createElement("div");
    portfolioContainer.appendChild(portfolioPie);
    portfolioPie.id = "portfolioPie";
    portfolioPie.style.width = "50%";
    portfolioPie.style.display = "inline-block";


    portfolioHoldings = []
    for(shareObject of portfolio.sharePortfolio){
      pieDataObject = [shareObject.name, (shareObject.share.price*shareObject.quantity/100)];
      portfolioHoldings.push(pieDataObject);
    }
    console.log(portfolioHoldings)

    var portfolioPieChart = new Highcharts.Chart({
          chart: {
                type: 'Pie',
                renderTo: portfolioPie,
              },
          title: {
            text:"Share makeup of " + portfolio.holder + " Portfolio.",
            align: 'center',
          },
         series: [{
            type: "pie",
            data: portfolioHoldings
         }],
         tooltip: {
           valuePrefix: '$'
         }
    }) //End of Pie Chart Construct         

    //Create Text Table with Portfolio Information
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
      var epicHolder = document.createElement("a");
      epicHolder.innerText = "Share identifer: " + shareObject.share.epic;
      epicHolder.href = "https://www.google.co.uk/finance?q=" + shareObject.share.epic + "&ei=cmXEVqG2IoPEU7nxi9gL";
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
      //Create Analysis Button
      var analysisButton = document.createElement("button");
      analysisButton.id = "analysisButton";
      analysisButton.innerText = "Portfolio Analysis"
      portfolioContainer.appendChild(analysisButton);
      //Make analyis button do new function
      var self = this;
      analysisButton.addEventListener('click', function(){
         self.analysisView(portfolio)
      })
    
  }//End of Create View Method

  this.analysisView = function(portfolio){
    //getting data for Share Info Chart
    var shareNames = [];
    var sharePerformanceData = [];
    var shareEarningData = [];
    var holdingData = []
    for(shareObject of portfolio.sharePortfolio){
      var newSharePerformanceData = [shareObject.name, (((shareObject.share.price - shareObject.avgPurchasePrice)/(shareObject.avgPurchasePrice)) * 100)]
      var newShareEarningData = [shareObject.name, (shareObject.share.price - shareObject.avgPurchasePrice)]
      var newHoldingData = [shareObject.name, (((shareObject.share.price - shareObject.avgPurchasePrice)*shareObject.quantity)/100)]

      var newShareName = shareObject.name;
      
      
      sharePerformanceData.push(newSharePerformanceData);
      shareEarningData.push(newShareEarningData);
      shareNames.push(newShareName);
      holdingData.push(newHoldingData)
    }
    //Getting Data for total Profit or loss from the Portfolio
    totalPerformance = 0;
    for(holding of holdingData){
      totalPerformance += holding[1]
    }//

    //Start of Share Percentage Change Since bought Chart
    var sharePerformanceContainer = document.querySelector("#sharePerformance");
    sharePerformanceContainer.style.width ="50%"
    var chart = new Highcharts.Chart({
      chart: {
          type: 'column',
          renderTo: sharePerformanceContainer,
      },
      title: {
           text: portfolio.holder + " Stocks Portfolio",
           align: 'center',
      },
      subtitle: {
           text: "Shares Held Performance Per Share in %",
           align: 'center',
           style: {"color":"blue", "font-size":"1.2em"}
      },
      yAxis: {
          title: {
              text: 'Percentage Perforance (%)'
          },   
      },
      xAxis: {
          categories: shareNames,
      },

      tooltip: {
          valueSuffix: '%'
      },
      series: [{

        data: sharePerformanceData,
        threshold: 0,
        negativeColor: 'red',
        color: 'green',
      }]
    
    })//end of HighChart

    //Start of Earning Per Share Chart
    var earningPerShareContainer = document.querySelector("#earningsPerShare");
    earningPerShareContainer.style.width ="50%"
    var chart = new Highcharts.Chart({
      chart: {
          type: 'column',
          renderTo: earningPerShareContainer,
      },
      title: {
           text: portfolio.holder + " Stocks Portfolio",
           align: 'center',
      },
      subtitle: {
           text: "Earnings per Share in the Portfolio in cents",
           align: 'center',
           style: {"color":"blue", "font-size":"1.2em"}
      },
      yAxis: {
          title: {
              text: 'Earnings in Cents (c)'
          },   
      },
      xAxis: {
          categories: shareNames,
      },

      tooltip: {
          valueSuffix: 'cents'
      },
      series: [{

        data: shareEarningData,
        threshold: 0,
        negativeColor: 'red',
        color: 'green',
      }]
    
    })//end of Earning Per Share HighChart


    //New Chart with performance by holding of each Share
    var earningPerHolding = document.querySelector("#earningsPerHolding");
    earningPerShareContainer.style.width ="50%"
    var chart = new Highcharts.Chart({
      chart: {
          type: 'column',
          renderTo: earningPerHolding,
      },
      title: {
           text: portfolio.holder + " Earnings per Holding",
           align: 'center',
      },
      subtitle: {
           text: "Overall Portfolio Performance in USD: $" + Number(totalPerformance).toLocaleString() + " Percentage Loss: "  + (totalPerformance/portfolio.getCurrentValue().shareValue*10000) +"%",
           align: 'left',
           style: {"color":"blue", "font-size":"1.2em"}
      },
      yAxis: {
          title: {
              text: 'Earnings in USD ($)'
          },   
      },
      xAxis: {
          categories: shareNames,
      },

      tooltip: {
          valuePrefix: '$'
      },
      series: [{

        data: holdingData,
        threshold: 0,
        negativeColor: 'red',
        color: 'green',
      }]
    
    })//end of Earning Per Share HighChart

    //Start of Share Line Chart

seriesData = [];
for(shareObject of portfolio.sharePortfolio){
    var closingPrices = shareObject.share.closingPrice;
    var dataObject = {name:shareObject.name, data:[]}
    for(date of closingPrices){
      var prices = date.price
      dataObject.data.push(prices)
    }
    seriesData.push(dataObject)
   } 
   console.log(seriesData)// seriesdata is the Name of the data required for a line chart


   var comparisonLine = document.querySelector("#comparisonLine");
   comparisonLine.style.width ="80%";
   var chart = new Highcharts.Chart({
      chart: {
         type: 'line',
         renderTo: comparisonLine,
      },
      title: {
          text: portfolio.holder + " Past Performance By Share",
          align: 'center',
      },
   yAxis: {
      title: {
         text: 'Earnings in USD (cents)'
      },   
    },
   xAxis: {
        categories: ["01/01/16", "02/01/16", "03/01/16", "04/01/16", "05/01/16", "08/01/16", "09/01/16"],
   },
   tooltip: {
       valueSuffix: 'cents'
   },
   series: seriesData,
  
   
   })//end of Comparison


      
  }//End of analysisView

}//end of model

module.exports = PortfolioView;