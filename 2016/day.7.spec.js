var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe.only('2016 day 7 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/7/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var addresses = input.split('\n');
            var count = countTLSaddreses(addresses);

            expect(count).to.equal(2000);
            done();
        });
    });

    describe('internals', function() {

        describe('isTLS function', function() {

            it('accepts ABBA starting the address', function() {
                expect(isTLS('assa[mnop]qrst')).to.equal(true);
            });
            it('rejects identic characters', function() {
                expect(isTLS('aaaa[mnop]qrst')).to.equal(false);
            });
            it('accepts ABBA far from start', function() {
                expect(isTLS('aaaaateet[mnop]qrst')).to.equal(true);
            });
            it('rejects ABBA inside brackets', function() {
                expect(isTLS('aaaa[teet]qrst')).to.equal(false);
            });
            it('rejects ABBA at start when also ABBA inside brackets', function() {
                expect(isTLS('abba[teet]qrst')).to.equal(false);
            });
            it('passes part 1 examples', function() {
                expect(isTLS('abba[mnop]qrst')).to.equal(true);
                expect(isTLS('abcd[bddb]xyyx')).to.equal(false);
                expect(isTLS('aaaa[qwer]tyui')).to.equal(false);
                expect(isTLS('ioxxoj[asdfgh]zxcvbn')).to.equal(true);
            });
        });

        describe('hasAbbaAt function', function() {

            it('detects matching group', function() {
                expect(hasAbbaAt(0, 'abba')).to.equal(true);
            });
            it('ignores identic characters', function() {
                expect(hasAbbaAt(0, 'aaaa')).to.equal(false);
            });
            it('rejects end of string', function() {
                expect(hasAbbaAt(3, 'abba')).to.equal(false);
            });
            it('rejects nested brackets', function() {
                expect(hasAbbaAt(0, '[bb[cc]]')).to.equal(false);
            });
        });

        describe('isInsideBrackets', function() {

            it('returns false when outside brackets', function() {
                expect(isInsideBrackets(0, 'a[b]c')).to.equal(false);
            });
            it('returns true when inside brackets', function() {
                expect(isInsideBrackets(2, 'a[b]c')).to.equal(true);
            });
            it('returns false when between brackeded portions', function() {
                expect(isInsideBrackets(5, 'a[bc]de[fg]')).to.equal(false);
            });
            it('returns true when inside second brackeded group', function() {
                expect(isInsideBrackets(10, 'a[bc]de[fghi]')).to.equal(true);
            });
        });
    });
});

var countTLSaddreses = function(addresses) {
    var count = 0;
    for (var i=0; i<addresses.length; i++) {
        count += isTLS(addresses[i]) ? 1 : 0;
    }

    return count;
};

var isTLS = function(address) {
    var abbaFound = false;
    for (var index = 0; index<address.length; index++) {
        if (hasAbbaAt(index, address) && isInsideBrackets(index, address)) { return false; }
        abbaFound = abbaFound || hasAbbaAt(index, address);
    }

    return abbaFound;
};

var hasAbbaAt = function(index, address) {
    return address[index] == address[index+3]
        && address[index+1] == address[index+2]
        && address[index] != address[index+1]
        && address[index] != '['
        ;
};

var isInsideBrackets = function(index, address) {
    var before = address.substring(0, index);
    var after = address.substring(index+1);
    if (before.lastIndexOf('[') > before.lastIndexOf(']') &&
        after.indexOf('[') < after.indexOf(']')) {
        return true;
    }
    return false;
};
