var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe('2016 day 7 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/7/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var addresses = input.split('\n');
            var count = countTLSaddreses(addresses);

            expect(count).to.equal(105);
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var addresses = input.split('\n');
            var count = countSSLaddreses(addresses);

            expect(count).to.equal(258);
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

                expect(isTLS('abdba[basabbamnop]asdft')).to.equal(false);
                expect(isTLS('abba[abba]qrst')).to.equal(false);
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
            it('returns true when inside nesting brackets', function() {
                expect(isInsideBrackets(11, 'a[de[fghi]jkl]')).to.equal(true);
            });
        });

        describe('isSSL function', function() {

            it('passes part 2 examples', function() {
                expect(isSSL('aba[bab]xyz')).to.equal(true);
                expect(isSSL('xyx[xyx]xyx')).to.equal(false);
                expect(isSSL('aaa[kek]eke')).to.equal(true);
                expect(isSSL('zazbz[bzb]cdb')).to.equal(true);
            });
        });

        describe('ABA detection', function() {

            it('returns both indexes', function() {
                expect(hasSSLAt(0, 'ete[tet]')).to.deep.equal({ aba:0, bab:4 });
            });

            it('works with aba after bab', function() {
                expect(hasSSLAt(5, '[tet]ete')).to.deep.equal({ aba:5, bab:1 });
            });

            it('resists aaa', function() {
                expect(hasSSLAt(5, '[eee]eee')).to.equal(undefined);
            });

            it('rejects bab outside brackets', function() {
                expect(hasSSLAt(0, 'ete[abc]tet')).to.equal(undefined);
            });

            it('rejects aba inside brackets', function() {
                expect(hasSSLAt(4, 'aaa[ete]bbb[tet]')).to.equal(undefined);
            });
        });
    });
});

var countTLSaddreses = function(addresses) {
    var count = 0;
    for (var i=0; i<addresses.length; i++) {
        if (addresses[i].length > 0) {
            if (isTLS(addresses[i])) { count++; }
        }
    }

    return count;
};

var countSSLaddreses = function(addresses) {
    var count = 0;
    for (var i=0; i<addresses.length; i++) {
        if (addresses[i].length > 0) {
            if (isSSL(addresses[i])) { count++; }
        }
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

var isSSL = function(address) {
    for (var index = 0; index<address.length; index++) {
        if (hasSSLAt(index, address)) { return true; }
    }

    return false;
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
    var openingCount = 0;
    var closingCount = 0;
    for (var i=0; i<before.length; i++) {
        if (before[i] == '[') { openingCount++; }
        if (before[i] == ']') { closingCount++; }
    }
    return openingCount > closingCount;
};

var hasSSLAt = function(index, address) {
    var a = address[index];
    var b = address[index+1];
    if (a!=b && address[index+2] == a && !isInsideBrackets(index, address)) {
        var bab = -1;
        for (var i=0; i<address.length; i++) {
            if (address[i] == b && address[i+1] == a && address[i+2] == b
                && isInsideBrackets(i, address)) {
                bab = i;
            }
        }
        if (bab != -1) {
            return { aba:index, bab:bab };
        }
    }
};
