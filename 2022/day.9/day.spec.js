const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { parse, directions, updateVisited } = require('./solve');
const { lines } = require('../support');

const right = directions['R'];
const up = directions['U'];

describe('2022.9', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(6087);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(1);
        });

        it('is solved again', () => {
            expect(solve2(`${__dirname}/data/input.txt`)).to.equal(2493);
        });

    });

    describe('internals', () => {

        describe('parsing', () => {

            it('identifies moves as expected', () => {
                const input = lines(`${__dirname}/data/example.txt`);
                const moves = parse(input);

                expect(moves[0]).to.deep.equal(right);
                expect(moves[1]).to.deep.equal(right);
                expect(moves[2]).to.deep.equal(right);
                expect(moves[3]).to.deep.equal(right);
                expect(moves[4]).to.deep.equal(up);
            });
        });

        describe('visited', () => {
            let visited;
            beforeEach(() => {
                visited = {};
            });

            it('captures positions of tail', () => {
                updateVisited({ x: 0, y: 0 }, visited);
                updateVisited({ x: 12, y: -15 }, visited);

                expect(visited).to.deep.equal({ '0x0': 1, '12x-15': 1 });
            });

            it('captures one position of tail once', () => {
                updateVisited({ x: 0, y: 0 }, visited);
                updateVisited({ x: 0, y: 0 }, visited);

                expect(visited).to.deep.equal({ '0x0': 1 });
            });
        });
    });
});
