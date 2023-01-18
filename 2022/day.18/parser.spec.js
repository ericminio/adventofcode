const { expect } = require('chai');
const { parse } = require('./parser');

describe('parser', () => {

    it('works', () => {
        expect(parse('1,2,3')).to.deep.equal({
            id: '1,2,3',
            position: { x: 1, y: 2, z: 3 },
            neighbours: [
                { x: 2, y: 2, z: 3 },
                { x: 0, y: 2, z: 3 },
                { x: 1, y: 3, z: 3 },
                { x: 1, y: 1, z: 3 },
                { x: 1, y: 2, z: 4 },
                { x: 1, y: 2, z: 2 },
            ]
        });
    });
});
