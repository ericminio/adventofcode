import { expect } from 'chai';

import { parse } from '../../solution/parse.js';

describe.only('parser', () => {
    it('can parse one number', () => {
        expect(parse('467')).to.deep.equal({
            number: 467,
            startIndex: 0,
            endIndex: 2,
        });
    });
});
