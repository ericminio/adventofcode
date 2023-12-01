import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.1 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('What is the sum of all of the calibration values?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(54877);
        });
    });

    describe('What is the sum of all of the real calibration values?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(54100);
        });
    });
});
