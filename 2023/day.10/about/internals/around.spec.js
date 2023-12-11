import { expect } from 'chai';

import { around, east, north, south, west } from '../../solution/around.js';
import { parse } from '../../solution/parser.js';

describe('around', () => {
    it('returns the four positions', () => {
        const maze = parse(['ABC', 'CDE', 'FGH']);
        const position = { x: 1, y: 1 };

        expect(around(position, maze)).to.deep.equal([
            { id: '2x1', x: 2, y: 1, direction: east },
            { id: '1x2', x: 1, y: 2, direction: south },
            { id: '0x1', x: 0, y: 1, direction: west },
            { id: '1x0', x: 1, y: 0, direction: north },
        ]);
    });

    it('returns the two positions when in a corner', () => {
        const maze = parse(['ABC', 'CDE']);
        const position = { x: 2, y: 1 };

        expect(around(position, maze)).to.deep.equal([
            { id: '1x1', x: 1, y: 1, direction: west },
            { id: '2x0', x: 2, y: 0, direction: north },
        ]);
    });
});
