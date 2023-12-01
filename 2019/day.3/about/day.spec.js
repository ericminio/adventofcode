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

    describe('What is the fewest combined steps the wires must take to reach an intersection?', () => {
        it('has an example', () => {
            const lines = [
                'R75,D30,R83,U83,L12,D49,R71,U7,L72',
                'U62,R66,U55,R34,D71,R55,D58,R83'
            ]
            expect(solveparttwo(lines)).to.equal(610);
        });

        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(3454);
        });
    });
});
