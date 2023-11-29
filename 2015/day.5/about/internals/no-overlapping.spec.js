const { expect } = require('chai');
const nooverlapping = require('../../solution/nooverlapping.js');

describe('no overlapping matchers', () => {
    it('is happy with xyxy', () => {
        expect(nooverlapping('xyxy')).to.equal(true);
    });
});
