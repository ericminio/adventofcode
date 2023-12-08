import { expect } from 'chai';

import { location } from '../../solution/location.js';
import { transform } from '../../solution/transform.js';

describe('location', () => {
    it('returns the last value after going through all the mappings', () => {
        const garden = {
            mappings: [
                {
                    id: 'one',
                    ranges: [
                        {
                            size: 1,
                            source: 100,
                            destination: 200,
                        },
                    ],
                },
                {
                    id: 'two',
                    ranges: [
                        {
                            size: 1,
                            source: 200,
                            destination: 300,
                        },
                    ],
                },
            ],
        };

        expect(location(100, garden, transform)).to.equal(300);
    });
});
