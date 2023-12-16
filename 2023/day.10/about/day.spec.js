import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.10 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('How many steps along the loop does it take to get from the starting position to the point farthest from the starting position?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(7102);
        });
    });

    describe('How many tiles are enclosed by the loop?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(1);
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

    it('has one more complex example for part 1', () => {
        expect(
            solvepartone(lines(new URL('./example2-0.txt', import.meta.url))),
        ).to.deep.equal(8);
        expect(
            solvepartone(lines(new URL('./example2-1.txt', import.meta.url))),
        ).to.deep.equal(8);
    });

    it('has one example for part 2', () => {
        expect(
            solveparttwo(lines(new URL('./example1-0.txt', import.meta.url))),
        ).to.deep.equal(1);
    });
});
