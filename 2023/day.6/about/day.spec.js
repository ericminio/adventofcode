import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.6 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe.skip('What do you get if you multiply number of ways you can beat the record?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });

    it('has an example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(8);
    });
});
