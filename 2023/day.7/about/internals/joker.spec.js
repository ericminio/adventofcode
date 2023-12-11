import { expect } from 'chai';

import { joker } from '../../solution/joker.js';
import { count } from '../../solution/counter.js';

describe('joker', () => {
    it('does not touch a type 1 when not present', () => {
        expect(joker({ A: 1, B: 1, C: 1, D: 1, E: 1 })).to.equal(1);
    });

    it('upgrades a type 1 when present', () => {
        expect(joker({ A: 1, B: 1, C: 1, D: 1, J: 1 })).to.equal(2);
    });

    it('does not touch a type 2 when not present', () => {
        expect(joker({ A: 1, B: 1, C: 1, D: 2 })).to.equal(2);
    });

    it('upgrades a type 2 when present once', () => {
        expect(joker({ A: 1, B: 1, C: 2, J: 1 })).to.equal(4);
    });

    it('upgrades examples as expected when relevant', () => {
        expect(joker(count('32T3K'))).to.equal(2);
        expect(joker(count('T55J5'))).to.equal(6);
        expect(joker(count('KK677'))).to.equal(3);
        expect(joker(count('KTJJT'))).to.equal(6);
        expect(joker(count('QQQJA'))).to.equal(6);
    });

    it('resists JJJJJ', () => {
        expect(joker({ J: 5 })).to.equal(7);
    });
});
