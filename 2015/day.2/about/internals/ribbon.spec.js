var expect = require('chai').expect;

const Elf = require('../../solution/elf');

describe('An elf', function () {
    var stufur = new Elf();

    it('knows how much ribbon is needed for a given present', function () {
        expect(stufur.ribonLength('2x3x4')).to.equal(10 + 24);
        expect(stufur.ribonLength('4x3x2')).to.equal(10 + 24);
        expect(stufur.ribonLength('1x1x10')).to.equal(4 + 10);
        expect(stufur.ribonLength('10x1x1')).to.equal(4 + 10);
    });

    it('can deal with a set of data', function () {
        expect(stufur.totalRibonLength('2x3x4\n1x1x10')).to.equal(34 + 14);
    });

    it('can deal with a corrupted set of data', function () {
        expect(stufur.totalRibonLength('2x3x4\n\n1x1x10\n')).to.equal(34 + 14);
    });
});
