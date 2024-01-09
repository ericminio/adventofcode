import { expect } from 'chai';

import { input } from '../../support/index.js';
import { solvepartone } from '../solution/index.js';
import { parse } from '../solution/parser.js';
import { clusters } from '../solution/clusters.js';
import { distances } from '../solution/distances.js';

describe('clusters', () => {
    it('can be identified', () => {
        const example = input(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal([
            {
                count: 5,
                contributors: ['AAAAA', 'BBBBB'],
                center: { x: 1, y: 1.5 },
            },
            { count: 5, contributors: ['EEEEE'], center: { x: 20, y: 2 } },
        ]);
    });

    it('can digest 2d representation', () => {
        const incoming = parse(`
            ...
            .23
            ...
        `);
        const spec = {
            size: 1,
            minSignaturePercentageToBeACluster: 0.1,
        };
        expect(
            clusters(
                {
                    ...incoming,
                    distances: distances(
                        incoming.signatures.distribution,
                        incoming.zipcodes,
                    ),
                },
                spec,
            ),
        ).to.deep.equal([
            { count: 5, contributors: ['z1', 'z2'], center: { x: 1.5, y: 1 } },
        ]);
    });

    it('assign a zipcode to a single cluster', () => {
        const incoming = parse(`
            ............
            .1....1....1
            ............
        `);
        const signatureDistances = distances(
            incoming.signatures.distribution,
            incoming.zipcodes,
        );
        const actual = clusters(
            { ...incoming, distances: signatureDistances },
            {
                size: 5,
                minSignaturePercentageToBeACluster: 0.2,
            },
        );

        expect(actual).to.deep.equal([
            { count: 2, contributors: ['z1', 'z2'], center: { x: 3.5, y: 1 } },
            { count: 1, contributors: ['z3'], center: { x: 11, y: 1 } },
        ]);
    });

    it('choose best cluster', () => {
        const incoming = parse(`
            .....
            .111.
            .....
        `);
        const spec = {
            size: 2,
            minSignaturePercentageToBeACluster: 0.1,
        };
        const actual = clusters(
            {
                ...incoming,
                distances: distances(
                    incoming.signatures.distribution,
                    incoming.zipcodes,
                ),
            },
            spec,
        );

        expect(actual).to.deep.equal([
            {
                count: 3,
                contributors: ['z1', 'z2', 'z3'],
                center: { x: 2, y: 1 },
            },
        ]);
    });
});
