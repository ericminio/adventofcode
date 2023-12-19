import { expect } from 'chai';

import { lines } from '../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('zipcode puzzles', () => {
    it('has an example', () => {
        const example = lines(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal(15);
    });
});
