const { expect } = require('chai');
const { add, input, numberOrZero, lines } = require('../support');
const { render } = require('./rendering');
const { solve1, tic, init, play } = require('./solve');
const { Winds } = require('./winds');
const example = `${__dirname}/data/example.txt`;
const challenge = `${__dirname}/data/input.txt`;

describe.only('2022.17', () => {

    describe('figuring out how many units tall will the tower of rocks be after 2022 rocks have stopped falling', () => {

        it('leverages an example', () => {
            expect(solve1(example, 2022)).to.equal(3068);
        });

        it('is done', () => {
            expect(solve1(challenge, 2022)).to.equal(3130);
        });

    });

    describe('figuring out how many units tall will the tower of rocks be after 1000000000000 rocks have stopped falling', () => {

        it('leverages an example', () => {
            const base = { rocks: 15, height: 25 };
            const deltas = lines(`${__dirname}/data/example-deltas`).map(numberOrZero);
            const total = totalHeight(1000000000000, base, deltas);

            expect(total).to.equal(1514285714288);
        });

        it.only('is done', () => {
            const baseInfo = lines(`${__dirname}/data/challenge.base`).map(numberOrZero);
            const base = { rocks: baseInfo.length, height: baseInfo.reduce(add) };
            expect(base).to.deep.equal({ rocks: 390, height: 604 });

            const deltas = lines(`${__dirname}/data/challenge.loop`).map(numberOrZero);
            const total = totalHeight(1000000000000, base, deltas);
            expect(total).to.equal(1556521739139);
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

        it('helps uncovering the loop of deltas for the example', () => {
            const game = init({ goal: 2022, winds: new Winds(input(example)) });
            play(game);

            require('fs').writeFileSync(`${__dirname}/data/example-2022.heights`,
                game.tower.heights.map(h => `${h.fallenRocks} ${h.height} ${h.delta}`).join('\n'));
            require('fs').writeFileSync(`${__dirname}/data/example-2022.deltas`,
                game.tower.heights.map(h => `${h.delta}`).join('\n'));
        });

        it('helps uncovering the loop of deltas for the challenge', () => {
            const game = init({ goal: 5000, winds: new Winds(input(challenge)) });
            play(game);

            require('fs').writeFileSync(`${__dirname}/data/challenge.heights`,
                game.tower.heights.map(h => `${h.fallenRocks} ${h.height} ${h.delta}`).join('\n'));
            require('fs').writeFileSync(`${__dirname}/data/challenge.deltas`,
                game.tower.heights.map(h => `${h.delta}`).join('\n'));
        });
    });

    it.skip('loops', () => {
        const deltas = [ 1, 2, 3 ];
        const base = { rocks: 2, height: 2 };

        expect(totalHeight(3, base, deltas)).to.equal(2 + 1);
        expect(totalHeight(4, base, deltas)).to.equal(2 + 1 + 2);
        expect(totalHeight(5, base, deltas)).to.equal(2 + 1 + 2 + 3);
        expect(totalHeight(7, base, deltas)).to.equal(2 + 6 * 1 + 1 + 2);
        expect(totalHeight(15, base, deltas)).to.equal(2 + 6 * 4 + 1);
    });

    const sumDeltasUpToGivenIndex = (deltas, index) => {
        let total = 0;
        for (var i = 0; i <= index; i++) {
            total += deltas[i];
        }
        return total;
    };
    const totalHeight = (goal, base, deltas) => {
        const deltasSum = deltas.reduce(add);
        let total = base.height;
        const target = goal - base.rocks - 1;
        const loopCount = Math.floor(target / deltas.length);
        if (loopCount > 0) {
            total += loopCount * deltasSum;
        }
        const index = target % deltas.length;
        total += sumDeltasUpToGivenIndex(deltas, index);

        return total;
    };
});
