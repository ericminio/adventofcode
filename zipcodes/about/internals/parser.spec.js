import { expect } from 'chai';

import { parse } from '../../solution/parser.js';

describe('parser', () => {
    it('parses the zipcodes geo location', () => {
        const input = '12345,1, 2\n\nanything';
        const incoming = parse(input);

        expect(incoming.zipcodes).to.deep.equal({ 12345: { x: 1, y: 2 } });
    });
    it('resists negative coordinates', () => {
        const input = '12345,-1, -2\n\nanything';
        const incoming = parse(input);

        expect(incoming.zipcodes).to.deep.equal({ 12345: { x: -1, y: -2 } });
    });
    it('resists floating coordinates', () => {
        const input = '12345,-1.2, -2.3\n\nanything';
        const incoming = parse(input);

        expect(incoming.zipcodes).to.deep.equal({
            12345: { x: -1.2, y: -2.3 },
        });
    });

    it('parses the signatures', () => {
        const input = '12345,1, -2\n\none\ntwo';
        const incoming = parse(input);

        expect(incoming.signatures).to.deep.equal({
            count: 2,
            distribution: { one: 1, two: 1 },
        });
    });

    it('can digest a 2d representation', () => {
        const input = `
            ...
            .23
            ...
        `;
        const incoming = parse(input);
        expect(incoming.zipcodes).to.deep.equal({
            z1: { x: 1, y: 1 },
            z2: { x: 2, y: 1 },
        });
        expect(incoming.signatures).to.deep.equal({
            count: 5,
            distribution: { z1: 2, z2: 3 },
        });
    });
});
