var Portfolio = require('../portfolio.js');
var Share = require('../share.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var superagent = require('superagent');

describe('MongoPortfolio', function(){

  it('should make a GET request and retrieve object', function(done){
    superagent.get('http://localhost:3000/portfolio').end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.length).to.be.above(0);
      expect(res.body).to.be.an('array');
      console.log(res.body);
      done();
    });
  });
});