const { expect } = require('chai');
const { solve1 } = require('./solve');
const example = `${__dirname}/data/example.txt`;

describe.only('map', () => {

    describe('boundaries', () => {


        it('leverages an example', () => {
            expect(solve1(example)).to.equal(64);
        });

    });
});
