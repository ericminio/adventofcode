import { expect } from 'chai';

import { parse } from '../../solution/parse.js';

describe.only('parser', () => {
    it('can parse one number starting the line', () => {
        expect(parse('467')).to.deep.equal([
            {
                number: 467,
                startIndex: 0,
                endIndex: 2,
            },
        ]);
    });

    it('can parse one number ending the line', () => {
        expect(parse('...467')).to.deep.equal([
            {
                number: 467,
                startIndex: 3,
                endIndex: 5,
            },
        ]);
    });
});
