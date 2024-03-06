import { expect } from 'chai';

import { parse } from '../../solution/parser.js';
import { circles } from '../../solution/circles.js';

describe('circles', () => {
    it('can find one circle', () => {
        const {
            signatures: { count, distribution },
        } = parse(`
            ...
            .23
            ...
        `);

        expect(circles(1, distribution)).to.deep.equal([
            [
                { postalCode: 'z2', count: 3, position: { x: 2, y: 1 } },
                { postalCode: 'z1', count: 2, position: { x: 1, y: 1 } },
            ],
        ]);
    });
});
