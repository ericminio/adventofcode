import { expect } from 'chai';

import { parser } from '../../solution/parser.js';

describe('parser', () => {
    it('can parse one position', () => {
        expect(parser(['S'])).to.deep.equal({
            '0x0': { x: 0, y: 0, value: 'S' },
        });
    });

    it('can parse several positions', () => {
        expect(parser(['AB', 'CD'])).to.deep.equal({
            '0x0': { x: 0, y: 0, value: 'A' },
            '1x0': { x: 1, y: 0, value: 'B' },
            '0x1': { x: 0, y: 1, value: 'C' },
            '1x1': { x: 1, y: 1, value: 'D' },
        });
    });
});
