var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe('2016 day 3 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/3/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var triangles = parse(input);
            var count = 0;
            for (var i=0; i<triangles.length; i++) {
                if (possible(triangles[i])) { count++; }
            }
            expect(count).to.equal(1032);
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var triangles = parse(input);
            var triangles = flipVerticaly(triangles);
            var count = 0;
            for (var i=0; i<triangles.length; i++) {
                if (possible(triangles[i])) { count++; }
            }
            expect(count).to.equal(1838);
            done();
        });
    });

    describe('internals', function() {

        describe('triangle', function() {

            it('is possible when first side is not too big', function() {
                expect(possible([1, 2, 2])).to.equal(true);
            });
            it('is not possible when first side is too big', function() {
                expect(possible([10, 2, 3])).to.equal(false);
            });
            it('is not possible when second side is too big', function() {
                expect(possible([10, 40, 10])).to.equal(false);
            });
            it('is not possible when third side is too big', function() {
                expect(possible([10, 10, 40])).to.equal(false);
            });
        });
        describe('needed parsing', function() {

            it('is available', function() {
                expect(parse('  816  566  848\n    8  234  831')).to.deep.equal([[816, 566, 848], [8, 234, 831]])
            });
            it('suppress trailing noise', function() {
                expect(parse('  816  566  848\n    8  234  831\n')).to.deep.equal([[816, 566, 848], [8, 234, 831]])
            });
        });

        describe('vertical transformation', function() {

            it('is available', function() {
                var input = [
                    [101, 301, 501],
                    [102, 302, 502],
                    [103, 303, 503],
                    [201, 401, 601],
                    [202, 402, 602],
                    [203, 403, 603]
                ];
                var triangles = flipVerticaly(input);

                expect(triangles[0]).to.deep.equal([101, 102, 103]);
                expect(triangles[4]).to.deep.equal([401, 402, 403]);
            });
        });
    });
});

var possible = function(sides) {
    var diagnostic = true;
    var sum = 0;
    for (var i=0; i<sides.length; i++) {
        sum += sides[i];
    }
    for (var i=0; i<sides.length; i++) {
        if ((sum-sides[i]) <= sides[i]) { diagnostic = false; }
    }

    return diagnostic;
};

var parse = function(input) {
    var triangles = [];
    var lines = input.split('\n');
    for (var i=0; i<lines.length; i++) {
        if (lines[i].trim().length >0) {
            var triangle = lines[i].trim().split(/\s+/).map(Number);
            triangles.push(triangle);
        }
    }

    return triangles;
};

var flipVerticaly = function(input) {
    var triangles = [];
    for (var i=0; i<input.length; i+=3 ) {
        for (var j=0; j<3; j++) {
            var triangle = [];
            for (var k=0; k<3; k++) {
                triangle.push(input[i+k][j]);
            }
            triangles.push(triangle);
        }
    }

    return triangles;
};
