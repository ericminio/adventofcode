import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.8 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('How many steps are required to reach ZZZ?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(12643);
        });
    });

    describe('How many steps does it take before you are only on nodes that end with Z?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(13133452426987);
        });
    });

    it('has an example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(6);
    });

    it('has an example for part 2', () => {
        const example = lines(new URL('./example2.txt', import.meta.url));

        expect(solveparttwo(example)).to.deep.equal(6);
    });
});
