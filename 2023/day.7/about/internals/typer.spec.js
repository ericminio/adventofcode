import { expect } from 'chai';

import { type } from '../../solution/typer.js';

describe('typer', () => {
    it('can identify five of a kind', () => {
        expect(type({ A: 5 })).to.equal(7);
        expect(type({ A: 4, B: 1 })).not.to.equal(7);
    });

    it('can identify four of a kind', () => {
        expect(type({ A: 5 })).not.to.equal(6);
        expect(type({ A: 1, B: 4 })).to.equal(6);
        expect(type({ A: 3, B: 2 })).not.to.equal(6);
    });

    it('can identify full house', () => {
        expect(type({ A: 3, B: 2 })).to.equal(5);
    });

    it('can identify three of a kind', () => {
        expect(type({ A: 3, B: 1, C: 1 })).to.equal(4);
    });

    it('can identify two pairs', () => {
        expect(type({ A: 2, B: 2, C: 1 })).to.equal(3);
    });

    it('can identify one pair', () => {
        expect(type({ A: 2, B: 1, C: 1, D: 1 })).to.equal(2);
    });

    it('can identify high cards hand', () => {
        expect(type({ A: 1, B: 1, C: 1, D: 1, E: 1 })).to.equal(1);
    });
});
