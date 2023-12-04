import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.3 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('What is the sum of all of the part numbers in the engine schematic?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });

    it.only('has a helpful example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));
        expect(solvepartone(example)).to.equal(4361);
    });
});
