var expect = require('chai').expect;

var floorOf = function(address) {
    return address.split('(').length - address.split(')').length;
};

describe('day 1 challenge', function() {

    describe('Santa', function() {
    
        it('can read address of floor 1', function() {
            expect(floorOf('(')).to.equal(1);
        });
        
        it('can read second-order address of floor 1', function() {
            expect(floorOf('()(')).to.equal(1);
        });
    });
});
