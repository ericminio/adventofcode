const { expect } = require('chai');
const { add } = require('../support');
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

        it.skip('leverages an example', () => {
            expect(solve1(example, 1000000000000)).to.equal(1514285714288);
        });

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

    it.only('loops', () => {
        const deltas = [ 1, 2, 3 ];
        const base = { rocks: 2, height: 2 };

        const deltasSum = deltas.reduce(add);
        const sum = (deltas, index) => {
            let total = 0;
            for (var i = 0; i <= index; i++) {
                total += deltas[i];
            }
            return total;
        };
        const total = (goal, base, deltas, deltasSum) => {
            let total = base.height;
            const target = goal - base.rocks - 1;
            const loopCount = Math.floor(target / deltas.length);
            if (loopCount > 0) {
                total += loopCount * deltasSum;
            }
            const index = target % deltas.length;
            total += sum(deltas, index);

            return total;
        };

        expect(total(3, base, deltas, deltasSum)).to.equal(2 + 1);
        expect(total(4, base, deltas, deltasSum)).to.equal(2 + 1 + 2);
        expect(total(5, base, deltas, deltasSum)).to.equal(2 + 1 + 2 + 3);
        expect(total(7, base, deltas, deltasSum)).to.equal(2 + 6 * 1 + 1 + 2);
        expect(total(15, base, deltas, deltasSum)).to.equal(2 + 6 * 4 + 1);
    });

});
