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
      console.log(res.body);
      done();
    });
  });
});