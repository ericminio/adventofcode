const { expect } = require('chai');
const { circularIndex } = require('./circular-index');

describe.only('array circular index', () => {

    it('works for zero', () => {
        let array = [1, 2, 3];

        expect(array[circularIndex(0, array)]).to.equal(1);
    });

    it('stays in range', () => {
        let array = [1, 2, 3];

        expect(array[circularIndex(3, array)]).to.equal(1);
    });

    it('works for -1', () => {
        let array = [1, 2, 3];

        expect(array[circularIndex(-1, array)]).to.equal(3);
    });

    it('works for -4', () => {
        let array = [1, 2, 3];

        expect(array[circularIndex(-4, array)]).to.equal(3);
    });
});
