import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.4 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('How many points are they worth in total?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(24542);
        });
    });

    it('hs an example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(13);
    });
});
