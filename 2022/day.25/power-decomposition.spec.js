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
});

//34978907874317