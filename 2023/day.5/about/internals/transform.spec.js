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

    it('returns expected destination with one range', () => {
        const mapping = {
            ranges: [
                {
                    size: 1,
                    source: 100,
                    destination: 200,
                },
            ],
        };

        expect(transform(100, mapping)).to.equal(200);
    });

    it('returns expected destination with two ranges', () => {
        const mapping = {
            ranges: [
                {
                    size: 1,
                    source: 50,
                    destination: 60,
                },
                {
                    size: 1,
                    source: 100,
                    destination: 200,
                },
            ],
        };

        expect(transform(100, mapping)).to.equal(200);
    });

    it('can be used to chain mappings', () => {
        const mappings = [
            {
                ranges: [
                    {
                        size: 5,
                        source: 0,
                        destination: 20,
                    },
                ],
            },
            {
                ranges: [
                    {
                        size: 3,
                        source: 20,
                        destination: 40,
                    },
                ],
            },
        ];
        const value = mappings.reduce((previous, mapping) => {
            return transform(previous, mapping);
        }, 2);

        expect(value).to.equal(42);
    });
});
