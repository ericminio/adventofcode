var expect = require('chai').expect;
var Elf = require('./elf');

describe('An elf', function() {

    var stufur = new Elf();

    it('knows how much wrapping paper is needed for a given present', function() {
        expect(stufur.paperSurfaceFor({ length: 2, width: 3, height: 4 })).to.equal(52+6);
        expect(stufur.paperSurfaceFor({ length: 1, width: 1, height: 10 })).to.equal(42+1);
    });
    
    it('can deal with more criptic data', function() {
        expect(stufur.paperSurfaceForDimensions('2x3x4')).to.equal(52+6);
    });
    
    it('can deal with a set of data', function() {
        expect(stufur.totalSurfaceForDimensions('2x3x4\n1x1x10')).to.equal(52+6 + 42+1);
    });
});

var request = require('request');
var credentialsFor = require('./me');
    
describe('day 2 challenge', function() {
    
    var url = 'http://adventofcode.com/day/2/input';

    it('is easy for Stufur', function(done) {
        var stufur = new Elf();
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            console.log(error);
            console.log(input);
            expect(stufur.totalSurfaceForDimensions(input)).to.equal(0);
            done();
        });
    });
});
