var Share = require('../share.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var superagent = require('superagent');

describe('mongoShare', function(){

  it('should make a GET request and retrieve object', function(done){
    superagent.get('http://localhost:3000/shares').end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.length).to.be.above(0);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.an('object');
      expect(res.body[0]).to.contain.all.keys(['_id', 'name', 'epic', 'closePrices']);
      console.log(res.body);
      done();
    });
  });

  it('should make a POST request to create a share', function(done){
    superagent.post('http://localhost:3000/shares').send({
      name: "Apple Inc.",
      epic: "APPL",
      currentPrice: 97.25
    }).end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body).to.be.an('object');
      expect(res.body).to.contain.all.keys(['_id', 'name', 'epic', 'currentPrice']);
      console.log(res.body)
      done();
    });
  });

  it('should throw an ERROR if name or epic not present', function(done){
    superagent.post('http://localhost:3000/shares').send({
      currentPrice: 19.99
    }).end(function(err, res){
      console.log(res.body.message);
      // expect(res.body.message).to.equal('MongoShare validation failed');
      assert.equal('MongoShare validation failed', res.body.message);
      done();
    });
  });

});





