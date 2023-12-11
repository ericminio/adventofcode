import { expect } from 'chai';

import { parser } from '../../solution/parser.js';

describe('parser', () => {
    it('can parse one position', () => {
        expect(parser(['S'])).to.deep.equal({
            '0x0': { x: 0, y: 0, value: 'S' },
        });
    });
});
