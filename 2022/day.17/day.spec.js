const { expect } = require('chai');
const { solve1, play, right, init } = require('./solve');
const { Winds } = require('./winds');
const example = `${__dirname}/data/example.txt`;

describe.only('2022.17', () => {

    describe('figuring out how many units tall will the tower of rocks be after 2022 rocks have stopped falling', () => {

        it('leverages an example', () => {
            expect(solve1(example)).to.equal(3068);
        });

    });

    describe('rock movement', () => {

        it('first moves then falls', () => {
            const game = init(new Winds('>'), 1);
            const rock = { position: { x: 3, y: 4 }};
            game.rock = rock;
            play(game);

            expect(game.rock.position).to.deep.equal({ x: 4, y: 3 });
        });
    });

});
