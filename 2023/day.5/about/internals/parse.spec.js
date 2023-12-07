import { expect } from 'chai';

import { parse } from '../../solution/parse.js';

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
});
