var expect = require('chai').expect;
var Elf = require('./elf');

describe('An elf', function() {

    var stufur = new Elf();

    it('knows how much wrapping paper is needed for a given present', function() {
        var present = { length: 2, width: 3, height: 4 };
        
        expect(stufur.paperSurfaceFor(present)).to.equal(52+6);
    });
});
