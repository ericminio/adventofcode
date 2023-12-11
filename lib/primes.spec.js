import { expect } from 'chai';

import { primes } from './primes.js';

describe('primes', () => {
    it('works for 42', () => {
        expect(primes(42)).to.deep.equal([2, 3, 7]);
    });

    it('works for 11567', () => {
        expect(primes(11567)).to.deep.equal([43, 269]);
    });
    it('works for 19637', () => {
        expect(primes(19637)).to.deep.equal([73, 269]);
    });
    it('works for 15871', () => {
        expect(primes(15871)).to.deep.equal([59, 269]);
    });
    it('works for 21251', () => {
        expect(primes(21251)).to.deep.equal([79, 269]);
    });
    it('works for 12643', () => {
        expect(primes(12643)).to.deep.equal([47, 269]);
    });
    it('works for 19099', () => {
        expect(primes(19099)).to.deep.equal([71, 269]);
    });
});
