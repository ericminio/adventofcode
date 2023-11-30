const { expect } = require('chai');
const nooverlapping = require('../../solution/nooverlapping.js');

describe('no overlapping matchers', () => {
    it('is happy with xyxy', () => {
        expect(nooverlapping('xyxy')).to.equal(true);
    });

    it('is not happy with aaa', () => {
        expect(nooverlapping('aaa')).to.equal(false);
    });

    it('is happy with qjhvhtzxzqqjkmpb', () => {
        expect(nooverlapping('qjhvhtzxzqqjkmpb')).to.equal(true);
    });

    it('is happy with qjhvhtzxzqqjkmpb', () => {
        expect(nooverlapping('qjhvhtzxzqqjkmpb')).to.equal(true);
    });

    it('is not happy with ieodomkazucvgmuy', () => {
        expect(nooverlapping('ieodomkazucvgmuy')).to.equal(false);
    });
});
