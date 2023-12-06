import { expect } from 'chai';

import { starsAround } from '../../solution/starsAround.js';

describe('starsAround', () => {
    it('can find one star', () => {
        const candidate = {
            number: 7,
            lineIndex: 1,
            startIndex: 1,
            endIndex: 2,
        };
        const lines = ['...', '.7.', '..*'];

        expect(starsAround(candidate, lines)).to.deep.equal([
            {
                x: 2,
                y: 2,
                candidate,
            },
        ]);
    });

    it('can find two stars', () => {
        const candidate = {
            number: 15,
            lineIndex: 0,
            startIndex: 0,
            endIndex: 1,
        };
        const lines = ['15*', '*..', '...'];

        expect(starsAround(candidate, lines)).to.deep.equal([
            {
                x: 0,
                y: 1,
                candidate,
            },
            {
                x: 2,
                y: 0,
                candidate,
            },
        ]);
    });
});
