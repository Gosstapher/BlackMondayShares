var Portfolio = require('../portfolio.js');
var Share = require('../share.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

describe('portfolio', function(){
  it('should be possible to generate an empty portfolio ', function(){
    var portfolio = new Portfolio('Dan', 1000);
    assert.equal(0, portfolio.sharePortfolio.length);
    assert.equal(1000, portfolio.cash);
  });
  it('should be possible to add cash to the portfolio ', function(){
  var portfolio = new Portfolio('Dan', 1000);
  portfolio.addCash(1000);
  assert.equal(2000, portfolio.cash);
  }); 
  it('should be possible to buy a share for the portfolio ', function(){
    var portfolio = new Portfolio('Dan', 1000);
    portfolio.addCash(1000);
    var share1 = new Share("Fusionex", "FXI", 120.00)
    portfolio.buyShares(share1, 1);
    assert.equal(1880, portfolio.cash);
    assert.equal(1, portfolio.sharePortfolio.length);

    console.log(portfolio.sharePortfolio[0]);
  });
  it('should be possible to sell a share from the portfolio ', function(){
    var portfolio = new Portfolio('Dan', 1000);
    portfolio.addCash(1000);
    var share1 = new Share("Fusionex", "FXI", 120.00);
    portfolio.buyShares(share1, 2);
    portfolio.sellShares('Fusionex', 2);
    assert.equal(2000, portfolio.cash);
    assert.equal(0, portfolio.sharePortfolio.length);
    console.log(portfolio.sharePortfolio[0]);
  });
  it('should be possible to get the current value of the portfolio ', function(){
    var portfolio = new Portfolio('Dan', 1000);
     portfolio.addCash(1000);
    var share1 = new Share("Fusionex", "FXI", 120.00)
    portfolio.buyShares(share1, 1);
  var expectedValue = portfolio.getCurrentValue();
  assert.equal(2000, expectedValue.totalAssets);
  console.log(expectedValue);
  });
  it('should be possible to record the end of day value of the portfolio for future reference ', function(){
    var portfolio = new Portfolio('Dan', 1000);
    portfolio.addCash(1000);
    var share1 = new Share("Fusionex", "FXI", 120.00)
    portfolio.buyShares(share1, 2);
    portfolio.endOfDayValue();
    assert.equal(2000, portfolio.historicalValues[0].totalEndValue)
    assert.equal(240, portfolio.historicalValues[0].shareEndValue);
    assert.equal(1760, portfolio.historicalValues[0].cashEndValue);
    console.log(portfolio.historicalValues);
  });
  it('should be possible to compare curent value to previous end of day values', function(){
    var portfolio = new Portfolio('Dan', 500);

    var share1 = new Share("Fusionex", "FXI", 120.00)
    portfolio.buyShares(share1, 2);
    portfolio.historicalValues.push({date: new Date("Jan 1 2016"), totalEndValue:1000, shareEndValue:800, cashEndValue:200} );
    console.log(portfolio)
    var expectedValue = portfolio.compareValues("Jan 1 2016");
    assert.equal(-50, expectedValue);
  });
})