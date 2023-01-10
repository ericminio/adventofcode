const { expect } = require('chai');
const { endIndex } = require('./end-index');

describe('index after pushing', () => {

    it('works for 1', () => {
        let list = [1, 2, 3];

        expect(endIndex(0, 1, list)).to.equal(1);
    });

    it('works for 2', () => {
        let list = [1, 2, 3];

        expect(endIndex(0, 2, list)).to.equal(0);
    });

    it('can end before start', () => {
        let list = [1, 2, 3, 4, 5];

        expect(endIndex(2, 3, list)).to.equal(1);
    });

    it('can end first', () => {
        let list = [1, 2, 3, 4, 5];

        expect(endIndex(1, 3, list)).to.equal(0);
    });

    it('can end first going backwards', () => {
        let list = [1, 2, 3, 4, 5];

        expect(endIndex(3, -3, list)).to.equal(0);
    });

    it('can end after start going backwards', () => {
        let list = [1, 2, 3, 4, 5];

        expect(endIndex(1, -2, list)).to.equal(3);
    });

});