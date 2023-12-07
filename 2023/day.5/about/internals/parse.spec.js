import { expect } from 'chai';

import { parse, parseRangeOfSeeds } from '../../solution/parse.js';

describe('parser', () => {
    it('can extract seeds', () => {
        const input = `
            seeds: 79 14 55 13

            seed-to-soil map:
            50 98 2
            52 50 48
        `;
        const garden = parse(input);

        expect(garden.seeds).to.deep.equal([79, 14, 55, 13]);
    });

    it('can parse one mapping with one range', () => {
        const input = `
            seeds: 79 14 55 13

            seed-to-soil map:
            50 98 2
        `;
        const garden = parse(input);

        expect(garden.mappings).to.deep.equal([
            {
                id: 'seed-to-soil',
                ranges: [
                    {
                        size: 2,
                        source: 98,
                        destination: 50,
                    },
                ],
            },
        ]);
    });

    it('can parse one mapping with two ranges', () => {
        const input = `
            seeds: 79 14 55 13

            seed-to-soil map:
            50 98 2
            52 50 48
        `;
        const garden = parse(input);

        expect(garden.mappings).to.deep.equal([
            {
                id: 'seed-to-soil',
                ranges: [
                    {
                        size: 2,
                        source: 98,
                        destination: 50,
                    },
                    {
                        size: 48,
                        source: 50,
                        destination: 52,
                    },
                ],
            },
        ]);
    });

    it('can parse two mappings', () => {
        const input = `
            seeds: 79 14 55 13

            seed-to-soil map:
            50 98 2
            52 50 48

            soil-to-fertilizer map:
            0 15 37
            37 52 2
            39 0 15
        `;
        const garden = parse(input);

        expect(garden.mappings).to.deep.equal([
            {
                id: 'seed-to-soil',
                ranges: [
                    {
                        size: 2,
                        source: 98,
                        destination: 50,
                    },
                    {
                        size: 48,
                        source: 50,
                        destination: 52,
                    },
                ],
            },
            {
                id: 'soil-to-fertilizer',
                ranges: [
                    {
                        size: 37,
                        source: 15,
                        destination: 0,
                    },
                    {
                        size: 2,
                        source: 52,
                        destination: 37,
                    },
                    {
                        size: 15,
                        source: 0,
                        destination: 39,
                    },
                ],
            },
        ]);
    });
});
