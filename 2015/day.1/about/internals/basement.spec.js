const { expect } = require('chai');
const {
    firstPositionOfBasementInAddress,
} = require('../../solution/firstPositionOfBasementInAddress');

describe('Santa', function () {
    it('can detect entering basement with a single move', function () {
        expect(firstPositionOfBasementInAddress(')')).to.equal(1);
    });

    it('can detect entering basement with a more sneaky move', function () {
        expect(firstPositionOfBasementInAddress('()())')).to.equal(5);
    });
});
