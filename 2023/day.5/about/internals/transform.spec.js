import { expect } from 'chai';

import { transform } from '../../solution/transform.js';

describe('transform', () => {
    it('returns source when no range matches the source', () => {
        const mapping = {
            ranges: [
                {
                    size: 1,
                    source: 100,
                    destination: 200,
                },
            ],
        };

        expect(transform(42, mapping)).to.equal(42);
    });
});
