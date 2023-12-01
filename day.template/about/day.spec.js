import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('20??.? puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe('part 1', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });

    describe('part 2', () => {
        it('is done', () => {
            expect(solveparttwo(incoming)).to.equal('???');
        });
    });
});
