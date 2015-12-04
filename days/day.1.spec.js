var expect = require('chai').expect;

var floorOf = function(address) {
    return 0;
};

describe('day 1 challenge', function() {

    describe('Santa', function() {
    
        it('can read address of floor 1', function() {
            expect(floorOf('(')).to.equal(1);
        });
    });
});
