import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('2023.10 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    describe.skip('How many steps along the loop does it take to get from the starting position to the point farthest from the starting position?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });

    it('has one example for part 1', () => {
        expect(
            solvepartone(lines(new URL('./example1-0.txt', import.meta.url))),
        ).to.deep.equal(4);
    });

    it('explore', () => {
        const previous = { x: 3, y: 3, id: '3x3', direction: { dx: 1, dy: 0 } };
        const current = { x: 2, y: 3, id: '2x3', direction: { dx: -1, dy: 0 } };
        const candidates = [
            { x: 3, y: 3, id: '3x3', direction: { dx: 1, dy: 0 } },
            { x: 1, y: 3, id: '1x3', direction: { dx: -1, dy: 0 } },
        ];
        const next = candidates.find((c) => c.id !== previous.id);

        expect(next.id).to.equal('1x3');
    });
});
