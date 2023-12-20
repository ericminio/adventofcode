import { expect } from 'chai';

import { input } from '../../support/index.js';
import { solvepartone, solveparttwo } from '../solution/index.js';

describe('zipcode puzzles', () => {
    it('has an example', () => {
        const example = input(new URL('./example.txt', import.meta.url));

        expect(solvepartone(example)).to.deep.equal([
            { count: 5, contributors: ['AAAAA', 'BBBBB'] },
            { count: 5, contributors: ['EEEEE'] },
        ]);
    });
});
