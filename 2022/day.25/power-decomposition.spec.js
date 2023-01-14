const { expect } = require('chai');
const { powerDecomposition } = require('./power-decomposition.js');

describe('power decomposition', () => {

    it('works as expected', () => {
        expect(powerDecomposition(5, 33)).to.deep.equal([ 1, 1, 3 ]);
    });

    it.only('works for 34978907874317', () => {
        expect(powerDecomposition(5, 34978907874317)).to.deep.equal(
            [ 1, 4, 0, 4, 1, 0, 4, 3, 3, 0, 0, 4, 0, 3, 4, 3, 4, 2, 3, 2 ]);
    });
});

//34978907874317