import { expect } from 'chai';

import { parse } from '../solution/parser.js';
import { clusters } from '../solution/clusters.js';
import { distances } from '../solution/distances.js';

describe('clusters', () => {
    it('can digest 2d representation', () => {
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

        expect(
            clusters({ distributionWithDistances, count }, spec),
        ).to.deep.equal([
            { count: 5, contributors: ['z2', 'z1'], center: { x: 2, y: 1 } },
        ]);
    });

    it('assign a zipcode to a single cluster', () => {
        const {
            signatures: { count, distribution },
        } = parse(`
            ............
            .1....1....1
            ............
        `);
        const distributionWithDistances = distances(distribution);
        const actual = clusters(
            { distributionWithDistances, count },
            {
                size: 5,
                minSignaturePercentageToBeACluster: 0.2,
            },
        );

        expect(actual).to.deep.equal([
            { count: 2, contributors: ['z1', 'z2'], center: { x: 1, y: 1 } },
            { count: 1, contributors: ['z3'], center: { x: 11, y: 1 } },
        ]);
    });
});
