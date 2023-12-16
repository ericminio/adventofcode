import { expect } from 'chai';

import { boundaries } from '../../solution/boundaries.js';

describe('loop boundaries', () => {
    const loop = {
        '1x3': { x: 1, y: 3 },
        '2x10': { x: 2, y: 10 },
        '-10x15': { x: -10, y: 15 },
    };
    it('include left-top corner', () => {
        const rectangle = boundaries(loop);

        expect(rectangle.x1).to.equal(-10);
        expect(rectangle.y1).to.equal(3);
    });
    it('include right-bottom corner', () => {
        const rectangle = boundaries(loop);

        expect(rectangle.x2).to.equal(2);
        expect(rectangle.y2).to.equal(15);
    });
});
