const { expect } = require('chai');
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

    describe('worksheet', () => {

        it('supports values', () => {
            let incoming = 'dvpt: 42';
            let pattern = /(.*):\s(.*)/;
            let data = pattern.exec(incoming).splice(1);

            expect(data).to.deep.equal([ 'dvpt', '42' ]);
        });
    });
});
