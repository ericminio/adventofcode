import { expect } from 'chai';

import { last } from '../../solution/last.js';

describe('last', () => {
    it('leverages string length', () => {
        const s = 'abc';
        expect(s[s.length - 1]).to.equal('c');
    });

    it('exposes last character', () => {
        expect(last('abc')).to.equal('c');
    });
});
