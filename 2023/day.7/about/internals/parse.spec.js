import { expect } from 'chai';
import { parse } from '../../solution/parse.js';

describe('parser', () => {
    it('can parse one hand', () => {
        expect(parse(['ABCDE 42'])).to.deep.equal([
            { cards: 'ABCDE', bid: 42 },
        ]);
    });

    it('can parse several hands', () => {
        expect(parse(['ABCDE 42', '12345 15'])).to.deep.equal([
            { cards: 'ABCDE', bid: 42 },
            { cards: '12345', bid: 15 },
        ]);
    });
});
