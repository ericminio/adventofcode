import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.9 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('What is the sum of these extrapolated values?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(1725987467);
        });
    });

    it('has an example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(114);
    });
});
