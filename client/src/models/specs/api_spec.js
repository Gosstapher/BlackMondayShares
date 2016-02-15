var apiModel = require('../api.js');
var Portfolio = require('../portfolio.js');
var Share = require('../share.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
chai.use(require('chai-fuzzy'));

describe('Share Model', function(){
  
  // beforeEach(function(){
  //   console.log("Create new share....");
  //   share1 = new Share("Shell", "SHL", 400);
  // });
  it('should retreve input from input field', function(){
    expect(epic).to.be.a('string');
    expect(epic).to.have.length.of.at.most(4);
    expect(epic).to.be.uppercase();
  });
  it('should return data in JSON format', function(){
    expect(shareData).to.exist;
    shareDataJSON.should.be.jsonOf(shareData);
    expect(shareData.query.results.quote.Ask).to.exist;
    shareData.query.results.quote.to.containOneLike('symbol');
  });
  it('should format the json date into an object usable by share and portfolio models', function(){
      newShare.should.containOneLike('name');
      newShare.should.containOneLike('epic');
      newShare.should.containOneLike('price');
      expect(newShare.name).to.containOneLike("American Airlines Group, Inc.");
      expect(newShare.epic).to.containOneLike('AAL');
      expect(newShare.price).to.containOneLike('37.82');
  });
  it('should create a share() by using share model', function(){
    expect(apiModel.createNewShare()).to.respondTo(apiModel.epic());
  });
  it('should NOT create another share() if one already exists for the company');
});