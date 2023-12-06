import { expect } from 'chai';

import { lines } from '../../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe.only('2023.4 puzzles', () => {
    const incoming = lines(new URL('./incoming.txt', import.meta.url));

    it('hs an example for part 1', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.equal(13);
    });
});
