import { expect } from 'chai';

import { location } from '../../solution/location.js';
import { range } from '../../solution/range.js';

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
        garden.board = {};

        expect(location(100, garden, range)).to.equal(300);
    });

    it('keeps track of matching range', () => {
        const garden = {
            mappings: [
                {
                    id: 'this-map',
                    ranges: [
                        {
                            size: 5,
                            source: 10,
                            destination: 20,
                        },
                        {
                            size: 5,
                            source: 40,
                            destination: 50,
                        },
                    ],
                },
            ],
        };
        garden.board = {};
        expect(location(42, garden, range)).to.equal(52);

        expect(garden.board).to.deep.equal({
            'this-map': {
                size: 5,
                source: 40,
                destination: 50,
            },
        });
    });
});
