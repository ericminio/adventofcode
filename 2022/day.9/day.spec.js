const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { parse, right, up, moving } = require('./solve');
const { lines } = require('../support');

describe.only('2022.9', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
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

        describe('moving', () => {
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
            });

            it('moves tail as expected', () => {
                moving(rope, right);
                expect(rope.tail).to.deep.equal({ x: 0, y: 0 });
                moving(rope, right);
                expect(rope.tail).to.deep.equal({ x: 0, y: 1 });
            });
        });
    });
});
