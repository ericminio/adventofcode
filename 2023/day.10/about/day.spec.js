import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.10 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe.skip('How many steps along the loop does it take to get from the starting position to the point farthest from the starting position?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });

    it('has one example for part 1', () => {
        expect(
            solvepartone(lines(new URL('./example1-0.txt', import.meta.url))),
        ).to.deep.equal(4);
        expect(
            solvepartone(lines(new URL('./example1-1.txt', import.meta.url))),
        ).to.deep.equal(4);
    });

    it('has one mor ecomplex example for part 1', () => {
        expect(
            solvepartone(lines(new URL('./example2-0.txt', import.meta.url))),
        ).to.deep.equal(8);
        expect(
            solvepartone(lines(new URL('./example2-1.txt', import.meta.url))),
        ).to.deep.equal(8);
    });
});
