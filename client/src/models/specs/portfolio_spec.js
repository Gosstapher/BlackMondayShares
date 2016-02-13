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
  })













})