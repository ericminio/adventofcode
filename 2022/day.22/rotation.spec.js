const { expect } = require('chai');
const { turnLeft, turnRight } = require('./rotation.js');

describe.only('rotation', () => {

    it('can be clockwise', () => {
        expect(turnLeft({ row: 0, column: 1 })).to.deep.equal({ row: -1, column: 0 });
        expect(turnLeft({ row: -1, column: 0 })).to.deep.equal({ row: -0, column: -1 });
        expect(turnLeft({ row: 0, column: -1 })).to.deep.equal({ row: 1, column: 0 });
        expect(turnLeft({ row: 1, column: 0 })).to.deep.equal({ row: 0, column: 1 });
    });

    it('can be anticlockwise', () => {
        expect(turnRight({ row: 0, column: 1 })).to.deep.equal({ row: 1, column: 0 });
        expect(turnRight({ row: 1, column: 0 })).to.deep.equal({ row: 0, column: -1 });
        expect(turnRight({ row: 0, column: -1 })).to.deep.equal({ row: -1, column: -0 });
    });
});
