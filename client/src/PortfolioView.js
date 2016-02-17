
function PortfolioView(){

  this.apiShareView = function(shareObject){
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

  }

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
          text: 'Value in Currency (£)'
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
          ["Total Assets Held", (portfolio.getCurrentValue().totalAssets/100)],
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
      pieDataObject = [shareObject.name, (shareObject.share.price*shareObject.quantity)];
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
           valuePrefix: '£'
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

    for(shareObject of portfolio.sharePortfolio){
      var newSharePerformanceData = [shareObject.name, (((shareObject.share.price - shareObject.avgPurchasePrice)/(shareObject.avgPurchasePrice)) * 100)]
      var newShareEarningData = [shareObject.name, (shareObject.share.price - shareObject.avgPurchasePrice)]
      var newShareName = shareObject.name;
      
      
      sharePerformanceData.push(newSharePerformanceData);
      shareEarningData.push(newShareEarningData);
      shareNames.push(newShareName);
    }

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

      
  }//End of analysisView

}//end of model

module.exports = PortfolioView;