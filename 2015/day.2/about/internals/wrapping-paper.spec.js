const Elf = require('../../solution/elf');
var expect = require('chai').expect;

describe('An elf', function () {
    var stufur = new Elf();

    it('knows how much wrapping paper is needed for a given present', function () {
        expect(
            stufur.paperSurfaceFor({ length: 2, width: 3, height: 4 })
        ).to.equal(52 + 6);
        expect(
            stufur.paperSurfaceFor({ length: 1, width: 1, height: 10 })
        ).to.equal(42 + 1);
    });

    it('can deal with more criptic data', function () {
        expect(stufur.paperSurfaceForDimensions('2x3x4')).to.equal(52 + 6);
    });

    it('can deal with a set of data', function () {
        expect(stufur.totalSurfaceForDimensions('2x3x4\n1x1x10')).to.equal(
            52 + 6 + 42 + 1
        );
    });

    it('can deal with a corrupted set of data', function () {
        expect(stufur.totalSurfaceForDimensions('2x3x4\n\n1x1x10')).to.equal(
            52 + 6 + 42 + 1
        );
    });
});
