const { expect } = require('chai');
const { powerDecomposition } = require('./power-decomposition.js');

describe.only('power decomposition', () => {

    it('works as expected', () => {
        expect(powerDecomposition(5, 33)).to.deep.equal([ 1, 1, 3 ]);
    });

    it('remove leading zero if any', () => {
        expect(powerDecomposition(5, 33)).to.deep.equal([ 1, 1, 3 ]);
    });
});