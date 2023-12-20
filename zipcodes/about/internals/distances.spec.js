import { expect } from 'chai';

import { distances } from '../../solution/distances.js';

describe('distances', () => {
    it('works for two nodes', () => {
        const distribution = { 111: 15, 222: 42 };
        const zipcodes = { 111: { x: 1, y: 1 }, 222: { x: 10, y: 10 } };

        expect(distances(distribution, zipcodes)).to.deep.equal({
            111: { distances: { 222: 18 } },
            222: { distances: { 111: 18 } },
        });
    });
});
