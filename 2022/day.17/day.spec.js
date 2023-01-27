const { expect } = require('chai');
const { render } = require('./rendering');
const { solve1, tic, init, play } = require('./solve');
const { Winds } = require('./winds');
const example = `${__dirname}/data/example.txt`;
const input = `${__dirname}/data/input.txt`;

describe.only('2022.17', () => {

    describe('figuring out how many units tall will the tower of rocks be after 2022 rocks have stopped falling', () => {

        it('leverages an example', () => {
            expect(solve1(example, 2022)).to.equal(3068);
        });

        it('is done', () => {
            expect(solve1(input, 2022)).to.equal(3130);
        });

    });

    describe('figuring out how many units tall will the tower of rocks be after 1000000000000 rocks have stopped falling', () => {



    });

    describe.skip('rock movement', () => {

        it('moves and falls', () => {
            const game = init({ goal: 1, winds: new Winds('>') });
            tic(game);

            expect(game.rock.position).to.deep.equal({ x: 4, y: 3 });
        });

        it('is stopped by the wall on the right', () => {
            const game = init({ goal: 1, winds: new Winds('>') });
            tic(game);
            tic(game);

            expect(game.rock.position).to.deep.equal({ x: 4, y: 2 });
        });

        it('eventually settles on the bottom', () => {
            const game = init({ goal: 1, winds: new Winds('>') });
            tic(game);
            tic(game);
            tic(game);
            tic(game);

            expect(game.rock).to.equal(undefined);
            expect(game.tower.fallenRocks).to.equal(1);
            expect(game.tower.height).to.equal(1);
        });
    });

    describe.skip('rendering', () => {

        it('is fun', () => {
            const game = init({ goal: 1, winds: new Winds('>') });
            play(game);

            render(game.tower);
        });
    });

});
