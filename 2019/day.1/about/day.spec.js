import { expect } from 'chai';

import { numbers } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2019.1 puzzles', () => {
    const incoming = numbers(new URL('./incoming.txt', import.meta.url));

    describe('What is the sum of the fuel requirements for all of the modules on your spacecraft?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(
                3232358
            );
        });
    });

    describe('What is the sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(
                4845669
            );
        });
    });
});
