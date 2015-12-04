var expect = require('chai').expect;
var request = require('request');

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
            var jar = request.jar();
            var cookie = request.cookie('session=53616c7465645f5fed8873028110d5b95d725301541bd2e6b5c2a777f8915aebd739168369f0e5af148009b825c54013; _gat=1; _ga=GA1.2.1608089354.1449241085');
            var url = 'http://adventofcode.com/day/1/input';
            jar.setCookie(cookie, url);            
            request({url: url, jar: jar}, function(error, response, input) {
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
            var jar = request.jar();
            var cookie = request.cookie('session=53616c7465645f5fed8873028110d5b95d725301541bd2e6b5c2a777f8915aebd739168369f0e5af148009b825c54013; _gat=1; _ga=GA1.2.1608089354.1449241085');
            var url = 'http://adventofcode.com/day/1/input';
            jar.setCookie(cookie, url);            
            request({url: url, jar: jar}, function(error, response, input) {
                expect(firstPositionOfBasementIn(input).to.equal(0);
                done();
            });
        });
    });
});
