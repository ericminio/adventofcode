import { expect } from 'chai';

import { primes } from '../../solution/primes.js';

describe('primes', () => {
    it('works for 42', () => {
        expect(primes(42)).to.deep.equal([2, 3, 7]);
    });
});
