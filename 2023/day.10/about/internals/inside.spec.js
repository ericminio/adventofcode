import { expect } from 'chai';

import { boundaries } from '../../solution/boundaries.js';

export const candidates = (loop) => {
    const points = [];
    const rectangle = boundaries(loop);
    for (let x = rectangle.x1; x <= rectangle.x2; x++) {
        for (let y = rectangle.y1; y <= rectangle.y2; y++) {
            if (!loop.find((p) => p.x === x && p.y === y)) {
                points.push({ x, y });
            }
        }
    }
    return points;
};

describe('inside loop', () => {
    const loop = [
        { x: 1, y: 1, id: '1x1', value: 'S' },
        { x: 2, y: 1, id: '2x1', direction: { dx: 1, dy: 0 } },
        { x: 3, y: 1, id: '3x1', direction: { dx: 1, dy: 0 } },
        { x: 3, y: 2, id: '3x2', direction: { dx: 0, dy: 1 } },
        { x: 3, y: 3, id: '3x3', direction: { dx: 0, dy: 1 } },
        { x: 2, y: 3, id: '2x3', direction: { dx: -1, dy: 0 } },
        { x: 1, y: 3, id: '1x3', direction: { dx: -1, dy: 0 } },
        { x: 1, y: 2, id: '1x2', direction: { dx: 0, dy: -1 } },
    ];
    describe('candidates', () => {
        it('can be found', () => {
            const points = candidates(loop);

            expect(points).to.deep.equal([{ x: 2, y: 2 }]);
        });
    });
});
