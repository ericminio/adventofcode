import { expect } from 'chai';

import { distances } from '../../solution/distances.js';

describe('distances', () => {
    it('works for two nodes', () => {
        const distribution = [
            { postalCode: 'z1', count: 2, position: { x: 1, y: 1 } },
            { postalCode: 'z2', count: 3, position: { x: 2, y: 1 } },
        ];

        expect(distances(distribution)).to.deep.equal([
            {
                postalCode: 'z1',
                count: 2,
                position: { x: 1, y: 1 },
                distances: [{ postalCode: 'z2', distance: 1 }],
            },
            {
                postalCode: 'z2',
                count: 3,
                position: { x: 2, y: 1 },
                distances: [{ postalCode: 'z1', distance: 1 }],
            },
        ]);
    });
});
