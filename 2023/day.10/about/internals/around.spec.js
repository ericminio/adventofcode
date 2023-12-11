import { expect } from 'chai';

import { around } from '../../solution/around.js';
import { parse } from '../../solution/parser.js';

describe('around', () => {
    it('returns the four positions', () => {
        const maze = parse(['ABC', 'CDE', 'FGH']);
        const position = { x: 1, y: 1 };

        expect(around(position, maze)).to.deep.equal([
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
        ]);
    });

    it('returns the two positions when in a corner', () => {
        const maze = parse(['ABC', 'CDE']);
        const position = { x: 2, y: 1 };

        expect(around(position, maze)).to.deep.equal([
            { x: 1, y: 1 },
            { x: 2, y: 0 },
        ]);
    });
});
