import { expect } from 'chai';

import { parse } from '../../solution/parse.js';

describe.only('parser', () => {
    it('leverages Number.isNaN', () => {
        expect(Number.isNaN(parseInt('1'))).to.equal(false);
        expect(Number.isNaN(parseInt('.'))).to.equal(true);
        expect(Number.isNaN(parseInt('%'))).to.equal(true);
    });

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

    it('can parse two numbers in a line', () => {
        expect(parse('...42...150..')).to.deep.equal([
            {
                number: 42,
                startIndex: 3,
                endIndex: 4,
            },
            {
                number: 150,
                startIndex: 8,
                endIndex: 10,
            },
        ]);
    });

    it('resists line without number', () => {
        expect(parse('...$..*')).to.deep.equal([]);
    });

    it('can parse the same number twice', () => {
        expect(parse('...15...15..')).to.deep.equal([
            {
                number: 15,
                startIndex: 3,
                endIndex: 4,
            },
            {
                number: 15,
                startIndex: 8,
                endIndex: 9,
            },
        ]);
    });

    it('can parse the same number twice when met at the end', () => {
        expect(parse('...15...15')).to.deep.equal([
            {
                number: 15,
                startIndex: 3,
                endIndex: 4,
            },
            {
                number: 15,
                startIndex: 8,
                endIndex: 9,
            },
        ]);
    });
});
