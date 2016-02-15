var Share = require('../share.js');
var assert = require('assert');

describe('Share Model', function(){
  
  beforeEach(function(){
    console.log("Create new share....");
    share1 = new Share("Shell", "SHL", 400);
  });
  // 1. Testing the Share Constructor
  it('Constructor working correctly', function(){
    assert.equal(400, share1.price);
    assert.equal("SHL", share1.epic);
    assert.equal("Shell", share1.name);
    assert.equal(0, share1.closingPrice.length)
  });
  // 2. Change the share price
  it('share price should now equal inputted price', function(){
    share1.newPrice(200);
    assert.equal(200, share1.price);
  });
  // 3. Add to the last close of day price
  it('Should add the current share price to the end of day array', function(){
    share1.closingDayRecord('01 Jan, 16');
    assert.deepEquals([{"date": 'JAN 01st 16' , "price":400}], share1.closingPrices());
    share1.newPrice(200);
    share1.closingDayRecord('02 Jan, 16');
    assert.deepEquals([{"date": date, "price": 400}, {"date": '02 Jan, 16', "price":200}], share1.closingPrices());
  })
  //4. Can compare current price to a final day price in the past
  it('Should by -50%', function(){
    share1.closingDayRecord('01 Jan, 16');
    share1.newPrice(200);
    assert.equal(-50, share.compareCurrentTo('01 Jan, 16'));
  });
});