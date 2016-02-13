var Portfolio = require('../portfolio.js');
var Share = require('../share.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

describe('portfolio', function(){
  it('should be possible to generate an empty portfolio ', function(){
    var portfolio = new Portfolio;
    assert.equal(0, portfolio.shares.length);
    assert.equal(0, portfolio.totalCash);
  });
  it('should be possible to add cash to the portfolio ', function(){
    var portfolio = new Portfolio;
    portfolio.addCash(1000);
    assert.equal(1000, portfolio.totalCash);
  }); 
  it('should be possible to buy a share for the portfolio ', function(){
    var portfolio = new Portfolio;
    portfolio.addCash(1000);
    portfolio.buyShare('FXI');
    assert.equal(900, portfolio.totalCash);
    assert.equal(1, portfolio.shares.length);
    assert.equal('Fusionex', portfolio.shares[0].name);
  });
  it('should be possible to sell a share from the portfolio ', function(){
    var portfolio = new Portfolio;
    portfolio.addCash(1000);
    portfolio.buyShare('FXI');
    portfolio.sellShare('Fusionex');
    assert.equal(1000, portfolio.totalCash);
    assert.equal(0, portfolio.shares.length);
  });
  it('should be possible to get the current value of the portfolio ,' function(){
    var portfolio = new Portfolio;
    portfolio.addCash(1000);
    portfolio.buyShare('FXI');
    var expectedValue = portfolio.calculateTotalValue();
    assert.equal(1000, expectedValue);
  });
  it('should be possible to record the end of day value of the portfolio for future reference ', function(){
    var portfolio = new Portfolio;
    portfolio.addCash(1000);
    portfolio.buyShare('FXI');
    portfolio.recordEndOfDayValue();
    assert.equal(1000, portfolio.endOfDayPrices[0].holdings.total);
  });
  it('should be possible to compare curent value to previous end of day values ', function(){
    var portfolio = new Portfolio;
    portfolio.addCash(1000);
    portfolio.buyShare('FXI');
    portfolio.endOfDayPrices.push({date:"Jan 1 2016", holdings:{cash:500, asset:300, total:800}});
    // compareValue() takes an argument which corresponds to an index value in the endOfDayPrices array. This can be changed if needs be. It should return a string which is the % difference in the 2 values.
    var expectedValue = portfolio.compareValue(0);
    assert.equal("-20%", expectedValue);
  })












})