var expect = require('chai').expect;

var next = function(i, chain) {
    return chain[(i+1) % chain.length];
};
var sum = function(chain) {
    var total = 0;
    for (var i=0; i<chain.length; i++) {
        if (chain[i] == next(i, chain)) {
            total += parseInt(chain[i]);
        }
    }
    return total;
};
var halfwayAround = function(i, chain) {
    return chain[(i+chain.length/2) % chain.length];
};
var sum2 = function(chain) {
    var total = 0;
    for (var i=0; i<chain.length; i++) {
        if (chain[i] == halfwayAround(i, chain)) {
            total += parseInt(chain[i]);
        }
    }
    return total;
};

describe('day 1 challenge', function() {
    it('exploration of part 1', function() {
        expect(sum('1122')).to.equal(3);
        expect(sum('1111')).to.equal(4);
        expect(sum('1234')).to.equal(0);
        expect(sum('91212129')).to.equal(9);
    });
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.1/input.txt').toString().trim();

        expect(sum(content)).to.equal(1029);
    });
    it('exploration of part 2', function() {
        expect(sum2('1212')).to.equal(6);
        expect(sum2('1221')).to.equal(0);
        expect(sum2('123425')).to.equal(4);
        expect(sum2('123123')).to.equal(12);
        expect(sum2('12131415')).to.equal(4);
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.1/input.txt').toString().trim();

        expect(sum2(content)).to.equal(1220);
    });
});
