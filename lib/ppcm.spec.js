import { expect } from 'chai';

import { ppcm } from './ppcm.js';

describe('ppcm', () => {
    it('works as expected', () => {
        expect(ppcm([60, 168])).to.equal(840);
    });

    it('works as expected', () => {
        expect(ppcm([3, 10, 15])).to.equal(30);
    });

    it('leverages Math.pow from string', () => {
        expect(Math.pow('2', 3)).to.equal(8);
    });
});
