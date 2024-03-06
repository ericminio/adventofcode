import { expect } from 'chai';

import { parse } from '../../solution/parser.js';
import { distances } from '../../solution/distances.js';
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
        const spec = {
            size: 1,
            minSignaturePercentageToBeACluster: 0.1,
        };
        const distributionWithDistances = distances(distribution);

        expect(circles(1, distributionWithDistances)).to.deep.equal([
            ['z2', 'z1'],
        ]);
    });
});
