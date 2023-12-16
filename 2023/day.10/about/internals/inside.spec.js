import { expect } from 'chai';

import { candidates } from '../../solution/candidates.js';

describe('inside loop', () => {
    const loop = {
        '1x1': { x: 1, y: 1, id: '1x1', value: 'S' },
        '2x1': { x: 2, y: 1, id: '2x1', direction: { dx: 1, dy: 0 } },
        '3x1': { x: 3, y: 1, id: '3x1', direction: { dx: 1, dy: 0 } },
        '3x2': { x: 3, y: 2, id: '3x2', direction: { dx: 0, dy: 1 } },
        '3x3': { x: 3, y: 3, id: '3x3', direction: { dx: 0, dy: 1 } },
        '2x3': { x: 2, y: 3, id: '2x3', direction: { dx: -1, dy: 0 } },
        '1x3': { x: 1, y: 3, id: '1x3', direction: { dx: -1, dy: 0 } },
        '1x2': { x: 1, y: 2, id: '1x2', direction: { dx: 0, dy: -1 } },
    };
    describe('candidates', () => {
        it('can be found', () => {
            const points = candidates(loop);

            expect(points).to.deep.equal([{ x: 2, y: 2 }]);
        });
    });
});
