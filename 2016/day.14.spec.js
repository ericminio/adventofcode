var expect = require('chai').expect;
var crypto = require('crypto');

var hashes;
describe('2016 day 14 challenge', function() {

    describe('exploration', function() {
        var candidate = '0034e0923cc38887a57bd7b1d4f953df';

        it('can detect repetition of 3 characters', function() {
            expect(repeatedCharacterIn(candidate)).to.equal('8');
        });
        it('can find 64th key of abc', function() {
            this.timeout(0);

            expect(findKey('abc', hashOneTime)).to.equal(22728);
        });
        it('can find 64th key of ahsbgdzn', function() {
            this.timeout(0);

            expect(findKey('ahsbgdzn', hashOneTime)).to.equal(23890);
        });
        it('can find 64th key of ahsbgdzn hashing 2017 times', function() {
            this.timeout(0);
            hashes = [];
            expect(findKey('ahsbgdzn', hash2017Times)).to.equal(22696);
        });
    });
});

var hashOneTime = function(input) {
    var md5 = crypto.createHash('md5');
    var hash = md5.update(input).digest('hex');

    return hash;
};

var hash2017Times = function(input) {
    if (hashes[input] == undefined) {
        var current = input;
        for (var i=0; i<2017; i++) {
            var md5 = crypto.createHash('md5');
            current = md5.update(current).digest('hex');
        }
        hashes[input] = current;
    }
    return hashes[input];
};

var findKey = function(salt, hashing) {
    var index = 0;
    var keys = [];
    while(keys.length < 64) {
        var found = false;
        while (!found) {
            index ++;
            if (index % 100 == 0) { console.log(index); }
            var input = salt + index;
            var code = hashing(input);
            var char = repeatedCharacterIn(code);
            if (char != undefined) {
                var isKey = false;
                var criteria = char+char+char+char+char;
                for (var i=index+1; i<=index+1000; i++) {
                    var hash = hashing(salt+i);
                    if (hash.indexOf(criteria) != -1) {
                        found = true;
                        break;
                    }
                }
            }
        }
        keys.push(index);
    }
    return keys[keys.length-1];
};

var repeatedCharacterIn = function(input) {
    var pattern = /(.)\1{2}/;
    var groups = pattern.exec(input);

    return groups == null ? undefined : groups[1];
};
