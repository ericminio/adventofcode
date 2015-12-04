var expect = require('chai').expect;
var request = require('request');
var authentifyMeFor = require('./me');

var floorOf = function(address) {
    return address.split('(').length - address.split(')').length;
};

var firstPositionOfBasementIn = function(address) {
    for (var size=1; size<=address.length; size++) {
        var stop = address.substring(0, size);
        if (floorOf(stop) == -1) {
            return size;
        }
    }
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
        
        it('passes the typical postman exam', function() {
            expect(floorOf('(())')).to.equal(0);
            expect(floorOf('()()')).to.equal(0);
            
            expect(floorOf('(((')).to.equal(3);
            expect(floorOf('(()(()(')).to.equal(3);
            expect(floorOf('))(((((')).to.equal(3);
            
            expect(floorOf('())')).to.equal(-1);
            expect(floorOf('))(')).to.equal(-1);
            
            expect(floorOf(')))')).to.equal(-3);
            expect(floorOf(')())())')).to.equal(-3);
        });
        
        it('can read the criptic address of day 1 challenge', function(done) {
            request({url: url, jar: authentifyMeFor(url)}, function(error, response, input) {
                console.log("address:" + input);
                expect(floorOf(input)).to.equal(138);
                done();
            });
        });
        
        it('can detect entering basement with a single move', function() {
            expect(firstPositionOfBasementIn(')')).to.equal(1);    
        });
        
        it('can detect entering basement with a more sneaky move', function() {
            expect(firstPositionOfBasementIn('()())')).to.equal(5);    
        });
        
        it('can detect entering basement with the criptic address of day 1 challenge', function(done) {
            request({url: url, jar: authentifyMeFor(url)}, function(error, response, input) {
                expect(firstPositionOfBasementIn(input)).to.equal(1771);
                done();
            });
        });
    });
});
