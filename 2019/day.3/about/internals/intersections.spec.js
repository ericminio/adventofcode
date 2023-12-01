const { expect } = require('chai');

const intersections = require('../../solution/intersections.js');

describe('intersections finder', () => {
    it('can find one intersection', () => {
        const lines = ['R1,U1', 'U1,R1'];

        expect(intersections(lines)).to.deep.equal([{ x: 1, y: 1 }]);
    });

    it('can find two intersections', () => {
        const lines = ['R1,U1,D1,L1', 'U1,R1,L1,D1'];

        expect(intersections(lines)).to.deep.equal([
            { x: 1, y: 1 },
            { x: 0, y: 0 },
        ]);
    });
});
