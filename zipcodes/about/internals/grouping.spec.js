import { expect } from 'chai';

import { group } from '../../solution/group.js';

describe('grouping', () => {
    it('works with two nodes close enough', () => {
        const nodes = {
            1: { 2: 3, 20: 20 },
            2: { 1: 3 },
        };
        const groups = group(nodes, { maxDistanceToBeInCluster: 5 });

        expect(groups).to.deep.equal([['1', '2']]);
    });
});
