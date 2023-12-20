import { expect } from 'chai';

import { input } from '../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';
import { parse } from '../solution/parser.js';
import { clusters } from '../solution/clusters.js';

describe('clusters', () => {
    it('can be identified', () => {
        const example = input(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal([
            { count: 5, contributors: ['AAAAA', 'BBBBB'] },
            { count: 5, contributors: ['EEEEE'] },
        ]);
    });

    it('assign a zipcode to a single cluster', () => {
        const example = input(
            new URL('./example-in-between.txt', import.meta.url),
        );
        const incoming = parse(example);
        const actual = clusters(incoming, {
            maxDistanceToBeInCluster: 5,
            minSignaturePercentageToBeACluster: 0.2,
        });

        expect(actual).to.deep.equal([
            { count: 2, contributors: ['AAAAA', 'BBBBB'] },
            { count: 1, contributors: ['CCCCC'] },
        ]);
    });
});
