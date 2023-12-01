import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2019.3 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('What is the Manhattan distance from the central port to the closest intersection?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(217);
        });
    });

    describe.skip('What is the fewest combined steps the wires must take to reach an intersection?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal('???');
        });
    });
});
