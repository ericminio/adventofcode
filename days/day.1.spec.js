var expect = require('chai').expect;
var request = require('request');

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
        
        it('can read address of floor -3', function() {
            expect(floorOf(')))')).to.equal(-3);
        });
        
        it('can read the criptic address of day 1 challenge', function(done) {
            request('http://adventofcode.com/day/1/input', function(error, response, body) {
                expect(floorOf(body)).to.equal(0);
                done();
            });
        });
    });
});
