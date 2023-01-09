const { expect } = require('chai');
const { circularIndex } = require('./circular-index');

describe.only('array circular index', () => {

    it('works for zero', () => {
        let list = [1, 2, 3];

        expect(list[circularIndex(0, list)]).to.equal(1);
    });

    it('stays in range', () => {
        let list = [1, 2, 3];

        expect(list[circularIndex(3, list)]).to.equal(1);
    });

    it('works for -1', () => {
        let list = [1, 2, 3];

        expect(list[circularIndex(-1, list)]).to.equal(3);
    });

    it('works for -4', () => {
        let list = [1, 2, 3];

        expect(list[circularIndex(-4, list)]).to.equal(3);
    });
});
