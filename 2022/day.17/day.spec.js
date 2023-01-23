const { expect } = require('chai');
const { solve1, play } = require('./solve');
const example = `${__dirname}/data/example.txt`;

describe.only('2022.17', () => {

    describe('figuring out how many units tall will the tower of rocks be after 2022 rocks have stopped falling', () => {

        it('leverages an example', () => {
            expect(solve1(example)).to.equal(3068);
        });

    });

    describe('play', () => {

        it('moves rock', () => {
            const tower = { height: 0, size: 0 };
            const game = {};
            play({ tower, game });
        });
    });

});
