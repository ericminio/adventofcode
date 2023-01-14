const { expect } = require('chai');
const { powerDecomposition } = require('./power-decomposition.js');

describe('power decomposition', () => {

    it('works as expected', () => {
        expect(powerDecomposition(5, 33)).to.deep.equal([ 1, 1, 3 ]);
    });
});