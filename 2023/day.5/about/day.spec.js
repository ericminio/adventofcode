import { expect } from 'chai';

import { input } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.5 puzzles', () => {
    const incoming = input(new URL('./incoming.txt', import.meta.url));

    describe('What is the lowest location number that corresponds to any of the initial seed numbers?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(174137457);
        });
    });

    describe.skip('What is the lowest location number that corresponds to any of the initial seed numbers defined by ranges?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(1493866);
        });
    });

    it('has an example for part 1', () => {
        const example = input(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(35);
    });

    it('has an example for part 2', () => {
        const example = input(new URL('./example.txt', import.meta.url));

        expect(solveparttwo(example)).to.deep.equal(46);
    });
});
