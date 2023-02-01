const { expect } = require('chai');
const { turnLeft } = require('./rotation.js');

describe.only('rotation', () => {

    it('can be clockwise', () => {
        expect(turnLeft({ row: 0, column: 1 })).to.deep.equal({ row: -1, column: 0 });
    });
});
