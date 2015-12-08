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
});
