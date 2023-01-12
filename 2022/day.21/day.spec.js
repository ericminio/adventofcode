const { expect } = require('chai');
const { parseCell } = require('./parser');
const { solve1, solve2 } = require('./solve');

describe.only('2022.21', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(152);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe.only('formula solving', () => {

        it('works', () => {
            let sheet = [ parseCell('aaa: 3'), parseCell('bbb: aaa * aaa') ];
            resolve(sheet);
        });
    });
});

const resolve = (cells) => {

};
