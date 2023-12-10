import { expect } from 'chai';

import { count } from '../../solution/counter.js';

describe('counter', () => {
    it('can count one card', () => {
        expect(count('A')).to.deep.equal({ A: 1 });
    });

    it('can count several cards', () => {
        expect(count('ABABBCDDDD')).to.deep.equal({ A: 2, B: 3, C: 1, D: 4 });
    });
});
