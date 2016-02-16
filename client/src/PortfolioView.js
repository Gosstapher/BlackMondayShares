


var PortfolioView = function(){

  this.createView = function(portfolio){
    //Get the total Values of the Portfolio
    var holderName = document.querySelector("#holderName");
    holderName.innerHTML = "<h2 class='title'>" + portfolio.holder + " Share Portfolio</h2>";

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
    var portfolioInfo = document.querySelector("#portfolioInfo")
    var portfolioCurrentValue = document.createElement("h3")
    portfolioCurrentValue.innerText ="Total Assets in Portfolio: £" + ((portfolio.getCurrentValue().totalAssets)/100) + "          Invested in Shares: £" + ((portfolio.getCurrentValue().shareValue)/100) + "          Cash Holdings: £" + ((portfolio.getCurrentValue().cashTotal)/100);
    portfolioInfo.appendChild(portfolioCurrentValue);
  }//End of Create View Method
}//end of model

module.exports = PortfolioView;