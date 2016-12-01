var expect = require('chai').expect;

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

describe('Santa', function() {

    it('can read address of floor 1', function() {
        expect(floorOf('(')).to.equal(1);
    });

    it('can read second-order address of floor 1', function() {
        expect(floorOf('()(')).to.equal(1);
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

    it('can detect entering basement with a single move', function() {
        expect(firstPositionOfBasementIn(')')).to.equal(1);
    });

    it('can detect entering basement with a more sneaky move', function() {
        expect(firstPositionOfBasementIn('()())')).to.equal(5);
    });

});

var request = require('request');
var credentialsFor = require('./me');

describe('day 1 challenge', function() {

    var url = 'http://adventofcode.com/2015/day/1/input';

    describe('part 1/2', function() {

        it('is easy for Santa', function(done) {
            request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
                expect(floorOf(input)).to.equal(138);
                done();
            });
        });
    });

    describe('part 2/2', function() {

        it('is easy for Santa', function(done) {
            request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
                expect(firstPositionOfBasementIn(input)).to.equal(1771);
                done();
            });
        });
    });
});
