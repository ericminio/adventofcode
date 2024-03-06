import { expect } from 'chai';

import { parse } from '../../solution/parser.js';

describe('parser', () => {
    it('can digest a 2d representation', () => {
        const input = `
            ...
            .23
            ...
        `;
        const incoming = parse(input);

        expect(incoming).to.deep.equal({
            signatures: {
                count: 5,
                distribution: [
                    { postalCode: 'z2', count: 3, position: { x: 2, y: 1 } },
                    { postalCode: 'z1', count: 2, position: { x: 1, y: 1 } },
                ],
            },
        });
    });
});
