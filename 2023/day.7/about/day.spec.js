import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.7 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('What are the total winnings?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(250370104);
        });
    });

    describe.skip('What are the total winnings with J considered a joker?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(251296863);
        });
    });

    it('has an example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(6440);
    });

    it('has an example for part 2', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solveparttwo(example)).to.deep.equal(5905);
    });
});
