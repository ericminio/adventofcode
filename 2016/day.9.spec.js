var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe('2016 day 9 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/9/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, file) {
            var line = decompress(file);
            var length = size(line);

            expect(length).to.equal(110346);
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, file) {
            var line = decompress(file);
            var length = sizev2(line);

            expect(length).to.equal(10774309173);
            done();
        });
    });

    describe('internals', function() {

        describe('size', function() {

            it('returns the size of the string', function() {
                expect(size('abc')).to.equal(3);
            });

            it('ignores whitespaces', function() {
                expect(size('abc  de fg')).to.equal(7);
            });
        });

        describe('decompress function', function() {

            it('keeps as it is a string without markers', function() {
                var line = 'ADVENT';
                expect(decompress(line)).to.equal(line);
                expect(size(decompress(line))).to.equal(6);
            });
            it('can repeat one character', function() {
                var line = 'A(1x5)BC';
                expect(decompress(line)).to.equal('ABBBBBC');
                expect(size(decompress(line))).to.equal(7);
            });
            it('can repeat 3 characters', function() {
                var line = '(3x3)XYZ';
                expect(decompress(line)).to.equal('XYZXYZXYZ');
                expect(size(decompress(line))).to.equal(9);
            });
            it('can deal with several markers', function() {
                var line = 'A(2x2)BCD(2x2)EFG';
                expect(decompress(line)).to.equal('ABCBCDEFEFG');
                expect(size(decompress(line))).to.equal(11);
            });
            it('ignores marker in data section', function() {
                var line = '(6x1)(1x3)A';
                expect(decompress(line)).to.equal('(1x3)A');
                expect(size(decompress(line))).to.equal(6);
            });
            it('ignores markers that appear in string after decompression', function() {
                var line = 'X(8x2)(3x3)ABCY';
                expect(decompress(line)).to.equal('X(3x3)ABC(3x3)ABCY');
                expect(size(decompress(line))).to.equal(18);
            });
        });

        describe('decompressed size computation', function() {

            it('is trivial with no markers', function() {
                expect(sizev2('ADVENT')).to.equal(6);
            });
            it('ignores whitespaces', function() {
                expect(sizev2('ADV ENT')).to.equal(6);
            });
            it('works with one repetition of one character', function() {
                expect(sizev2('A(1x5)BC')).to.equal(7);
            });
            it('works with 3 repetitions of 3 characters', function() {
                expect(sizev2('(3x3)XYZ')).to.equal(9);
            });
            it('works with 2 markers far away from each other', function() {
                expect(sizev2('(1x5)B(1x5)C')).to.equal(10);
            });
            it('works with one adjacent marker', function() {
                expect(sizev2('X(8x2)(3x3)ABCY')).to.equal(20);
            });
            it('works with several adjacent markers', function() {
                expect(sizev2('(27x12)(20x12)(13x14)(7x10)(1x12)A')).to.equal(241920);
            });
            it('works with nested markers', function() {
                expect(sizev2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN')).to.equal(445);
            });
        });
    });
});

var sizev2 = function(line) {
    var marker = firstMarkerOf(line);
    if (!marker) { return size(line); }

    return marker.startIndex
            + marker.count * sizev2(marker.sequenceToRepeat)
            + sizev2(line.substring(marker.tailIndex));

};

var decompress = function(line) {
    var marker = firstMarkerOf(line);
    if (!marker) { return line; }

    return line.substring(0, marker.startIndex)
            + Array(marker.count+1).join(marker.sequenceToRepeat)
            + decompress(line.substring(marker.tailIndex));
};

var firstMarkerOf = function(line) {
    var startIndex = line.indexOf('(');
    if ( startIndex != -1) {
        var after = line.substring(startIndex);
        var sequenceLength = +after.substring(1, after.indexOf('x'));
        var endOfMarker = after.indexOf(')');
        var count = +after.substring(after.indexOf('x')+1, endOfMarker);
        return {
            startIndex: startIndex,
            count: count,
            sequenceToRepeat: after.substring(endOfMarker+1, endOfMarker+1+sequenceLength),
            tailIndex: startIndex + endOfMarker + sequenceLength + 1
        };
    }
};

var size = function(line) {
    return line.replace(/\s/g, '').length;
};
