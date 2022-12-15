const { expect } = require('chai');
const { solve1, load } = require('./solve');

describe.only('2022.12', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(31);
        });

    });

    describe('loading the map', () => {

        it('exposes the size of the map', () => {
            let map = load(`
                Sbc
                deE
            `);
            expect(map.size).to.deep.equal({ height: 2, width: 3 });
        });
    });
});


