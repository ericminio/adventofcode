import { expect } from 'chai';

import { around } from '../../solution/around.js';

describe('around', () => {
    it('returns the four positions', () => {
        const position = { x: 15, y: 42 };

        expect(around(position)).to.deep.equal([
            { x: 16, y: 42 },
            { x: 15, y: 43 },
            { x: 14, y: 42 },
            { x: 15, y: 41 },
        ]);
    });
});
