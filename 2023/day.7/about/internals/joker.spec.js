import { expect } from 'chai';

import { joker } from '../../solution/joker.js';

describe('joker', () => {
    it('does not touch a type 1 when not present', () => {
        expect(joker({ A: 1, B: 1, C: 1, D: 1, E: 1 })).to.equal(1);
    });

    it('upgrades a type 1 when present', () => {
        expect(joker({ A: 1, B: 1, C: 1, D: 1, J: 1 })).to.equal(2);
    });
});
