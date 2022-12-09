const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { parse, right, up, moving, updateVisited } = require('./solve');
const { lines } = require('../support');

describe.only('2022.9', () => {

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

        describe('moving straight', () => {
            let rope;
            beforeEach(() => {
                rope = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } };
            });

            it('moves head as expected', () => {
                moving(rope, right);
                expect(rope.head).to.deep.equal({ x: 0, y: 1 });
                moving(rope, right);
                expect(rope.head).to.deep.equal({ x: 0, y: 2 });
                moving(rope, right);
                expect(rope.head).to.deep.equal({ x: 0, y: 3 });
                moving(rope, right);
                expect(rope.head).to.deep.equal({ x: 0, y: 4 });
            });

            it('moves tail as expected', () => {
                moving(rope, right);
                expect(rope.tail).to.deep.equal({ x: 0, y: 0 });
                moving(rope, right);
                expect(rope.tail).to.deep.equal({ x: 0, y: 1 });
                moving(rope, right);
                expect(rope.tail).to.deep.equal({ x: 0, y: 2 });
                moving(rope, right);
                expect(rope.tail).to.deep.equal({ x: 0, y: 3 });
            });
        });

        describe('making the tail move diagonal', () => {
            let rope;
            beforeEach(() => {
                rope = { head: { x: -1, y: 4 }, tail: { x: 0, y: 3 } };
            });

            it('moves tail as expected', () => {
                moving(rope, up);
                expect(rope.tail).to.deep.equal({ x: -1, y: 4 });
            })
        });

        describe('moving diagonal', () => {
            let rope;
            beforeEach(() => {
                rope = { head: { x: 0, y: 3 }, tail: { x: 0, y: 2 } };
            });

            it('moves tail as expected on right-left', () => {
                moving(rope, { dx: -1, dy: 1 });
                expect(rope.tail).to.deep.equal({ x: -1, y: 3 });
            })
        });

        describe('visited', () => {
            let visited;
            beforeEach(() => {
                visited = {};
            });

            it('captures position of tail', () => {
                updateVisited({ head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } }, visited);

                expect(visited).to.deep.equal({ '0x0': 1 });
            });

            it('captures several positions of tail', () => {
                updateVisited({ head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } }, visited);
                updateVisited({ head: { x: 0, y: 0 }, tail: { x: 12, y: -15 } }, visited);

                expect(visited).to.deep.equal({ '0x0': 1, '12x-15': 1 });
            });

            it('captures one position of tail once', () => {
                updateVisited({ head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } }, visited);
                updateVisited({ head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } }, visited);

                expect(visited).to.deep.equal({ '0x0': 1 });
            });
        });
    });
});
