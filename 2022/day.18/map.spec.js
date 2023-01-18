const { expect } = require('chai');
const { solve1 } = require('./solve');

describe.only('map', () => {

    describe('boundaries', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(64);
        });

    });
});
