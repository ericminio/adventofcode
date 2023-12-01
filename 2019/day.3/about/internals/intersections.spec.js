import { expect } from 'chai';

import {intersections} from '../../solution/intersections.js';

describe('intersections finder', () => {
    it('can find one intersection', () => {
        const lines = ['R1,U1', 'U1,R1'];

        expect(intersections(lines)).to.deep.equal([{ x: 1, y: 1, steps:4 }]);
    });

    it('can find two intersections', () => {
        const lines = ['R1,U1,D1,L1', 'U1,R1,L1,D1'];

        expect(intersections(lines)).to.deep.equal([
            { x: 1, y: 1, steps:4 },
            { x: 0, y: 0, steps:8 },
        ]);
    });

    it('keeps first time intersecting step count', () => {
        const lines = ['R1,U1,D1,L1', 'U1,R1,U1,R1,L1,D1'];

        expect(intersections(lines)).to.deep.equal([
            { x: 1, y: 1, steps:4 },
        ]);
    });
});
