import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.3 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('What is the sum of all of the part numbers in the engine schematic?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(533784);
        });
    });

    describe('What is the sum of all of the gear ratios in your engine schematic?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(78826761);
        });
    });

    it('has a helpful example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));
        expect(solvepartone(example)).to.equal(4361);
    });

    it('has a helpful example for part 2', () => {
        const example = lines(new URL('./example.txt', import.meta.url));
        expect(solveparttwo(example)).to.equal(467835);
    });
});
