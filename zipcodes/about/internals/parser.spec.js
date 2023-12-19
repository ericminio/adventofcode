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

    it('parses the signatures', () => {
        const input = '12345,1, -2\n\none\ntwo';
        const incoming = parse(input);

        expect(incoming.signatures).to.deep.equal(['one', 'two']);
    });
});
