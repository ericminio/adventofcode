const { expect } = require('chai');
const { powerDecomposition } = require('./power-decomposition.js');

describe.only('power decomposition', () => {

    it('works as expected', () => {
        expect(powerDecomposition(5, 33)).to.deep.equal([ 1, 1, 3 ]);
    });

    it('remove leading zero if any', () => {
        expect(powerDecomposition(5, 66)).to.deep.equal([ 2, 3, 1 ]);
    });

    it('remove all leading zeros', () => {
        expect(powerDecomposition(5, 314159265)).to.deep.equal(
            [ 1, 1, 2, 0, 4, 1, 1, 0, 4, 4, 0, 3, 0 ]);
    });

    it.only('works for 34978907874317', () => {
        expect(powerDecomposition(5, 34978907874317)).to.deep.equal(
            [ 1, 4, 0, 4, 1, 0, 4, 3, 3, 0, 0, 4, 0, 3, 4, 3, 4, 2, 3, 2 ]);
    });
});

//34978907874317