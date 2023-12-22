import { expect } from 'chai';

import { input } from '../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';
import { parse } from '../solution/parser.js';
import { clusters } from '../solution/clusters.js';

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

    it('assign a zipcode to a single cluster', () => {
        const example = input(
            new URL('./example-in-between.txt', import.meta.url),
        );
        const incoming = parse(example);
        const actual = clusters(incoming, {
            diameter: 5,
            minSignaturePercentageToBeACluster: 0.2,
        });

        expect(actual).to.deep.equal([
            {
                count: 2,
                contributors: ['AAAAA', 'BBBBB'],
                center: { x: 1, y: 3.5 },
            },
            { count: 1, contributors: ['CCCCC'], center: { x: 1, y: 11 } },
        ]);
    });
});
