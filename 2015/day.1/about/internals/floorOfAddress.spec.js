const { expect } = require('chai');
const { floorOfAddress } = require('../../solution/floorOfAddress');

describe('Santa', function () {
    it('can read address of floor 1', function () {
        expect(floorOfAddress('(')).to.equal(1);
    });

    it('can read second-order address of floor 1', function () {
        expect(floorOfAddress('()(')).to.equal(1);
    });

    it('passes the typical postman exam', function () {
        expect(floorOfAddress('(())')).to.equal(0);
        expect(floorOfAddress('()()')).to.equal(0);

        expect(floorOfAddress('(((')).to.equal(3);
        expect(floorOfAddress('(()(()(')).to.equal(3);
        expect(floorOfAddress('))(((((')).to.equal(3);

        expect(floorOfAddress('())')).to.equal(-1);
        expect(floorOfAddress('))(')).to.equal(-1);

        expect(floorOfAddress(')))')).to.equal(-3);
        expect(floorOfAddress(')())())')).to.equal(-3);
    });
});
