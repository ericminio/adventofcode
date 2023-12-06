import { expect } from 'chai';

import { around } from '../../solution/around.js';

describe.only('around', () => {
    it('returns the 8 positions around one digit number', () => {
        const candidate = {
            number: 7,
            lineIndex: 1,
            startIndex: 1,
            endIndex: 1,
        };

        expect(around(candidate)).to.deep.equal([
            { x: 0, y: 0 },
            { x: 0, y: 2 },

            { x: 1, y: 0 },
            { x: 1, y: 2 },

            { x: 2, y: 0 },
            { x: 2, y: 2 },

            { x: 0, y: 1 },
            { x: 2, y: 1 },
        ]);
    });

    it('returns the 10 positions around two digits number', () => {
        const candidate = {
            number: 15,
            lineIndex: 1,
            startIndex: 1,
            endIndex: 2,
        };

        expect(around(candidate)).to.deep.equal([
            { x: 0, y: 0 },
            { x: 0, y: 2 },

            { x: 1, y: 0 },
            { x: 1, y: 2 },

            { x: 2, y: 0 },
            { x: 2, y: 2 },

            { x: 3, y: 0 },
            { x: 3, y: 2 },

            { x: 0, y: 1 },
            { x: 3, y: 1 },
        ]);
    });
});
