var expect = require('chai').expect;

describe('flipping the dragon', function() {

    describe('target', function() {

        it('is to pass the given example', function() {
            var solution = solve({ seed:'10000', size:20 });

            expect(solution.dragon).to.equal('10000011110010000111');
            expect(solution.checksum).to.equal('01100');
        });
        it('is to pass part 1 of the challenge', function() {
            var solution = solve({ seed:'11101000110010100', size:272 });

            expect(solution.checksum).to.equal('10100101010101101');
        });
        it('is to pass part 2 of the challenge', function() {
            this.timeout(0);
            var solution = solve({ seed:'11101000110010100', size:35651584 });

            expect(solution.checksum).to.equal('01100001101101001');
        });

        var solve = function(options) {
            var dragon = options.seed;
            while (dragon.length < options.size) {
                dragon = flip(dragon);
            }
            dragon = dragon.substring(0, options.size);
            var value = dragon;
            do {
                value = checksum(value);
            } while (value.length % 2 == 0);

            return { dragon:dragon, checksum:value };
        };
    });

    describe('steps', function() {

        it('can flip 1', function() {
            expect(flip('1')).to.equal('100');
        });
        it('can flip 0', function() {
            expect(flip('0')).to.equal('001');
        });
        it('can flip 10', function() {
            expect(flip('10')).to.equal('10010');
        });
        it('can flip 11111', function() {
            expect(flip('11111')).to.equal('11111000000');
        });
        it('checkums 11', function() {
            expect(checksum('11')).to.equal('1');
        });
        it('checkums 00', function() {
            expect(checksum('00')).to.equal('1');
        });
        it('checkums 01', function() {
            expect(checksum('01')).to.equal('0');
        });
        it('checkums 10', function() {
            expect(checksum('10')).to.equal('0');
        });
        it('checkums 1011', function() {
            expect(checksum('1011')).to.equal('01');
        });
    });
});

var flip = function(dragon) {
    var flipped = dragon.split('').reverse().map(
        function(e) { return 1-e; }).join('');
    return dragon + '0' + flipped;
};
var checksum = function(dragon) {
    var sum = '';
    for (var index = 0; index<dragon.length; index+=2) {
        dragon[index] == dragon[index+1] ? sum+='1' : sum+='0';
    }
    return sum;
};
