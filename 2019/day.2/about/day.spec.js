import { expect } from 'chai';

import { input } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2019.2 puzzles', () => {
    const incoming = input(new URL('./incoming.txt', import.meta.url));

    describe('What value is left at position 0 after the program halts?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(
                2842648
            );
        });
    });

    describe('What value is left at position 0 after the program halts?', () => {
        it('Find the input noun and verb that cause the program to produce the output 19690720. What is 100 * noun + verb?', () => {
            expect(solveparttwo(incoming)).to.equal(
                9074
            );
        });
    });
});
