const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { move } = require('./solve');

describe.only('2022.??', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(3);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('moving', () => {

        it('works for 1', () => {
            expect(move(1, [0, 0, 1, 0])).to.deep.equal(
                [1, 0, 0, 0]
            );
        });

        it('works for 2', () => {
            expect(move(2, [0, 0, 2, 0])).to.deep.equal(
                [0, 2, 0, 0]
            );
        });

        it('works for 3', () => {
            expect(move(3, [0, 0, 3, 0])).to.deep.equal(
                [0, 0, 3, 0]
            );
        });

        it('works for 4', () => {
            expect(move(4, [0, 0, 4, 0])).to.deep.equal(
                [4, 0, 0, 0]
            );
        });

        it('works for -1', () => {
            expect(move(-1, [0, 0, -1, 0])).to.deep.equal(
                [0, -1, 0, 0]
            );
        });

        it('works for -2', () => {
            expect(move(-2, [0, 0, -2, 0])).to.deep.equal(
                [-2, 0, 0, 0]
            );
        });

        it('works for -3', () => {
            expect(move(-3, [0, 0, -3, 0])).to.deep.equal(
                [0, 0, -3, 0]
            );
        });

        it('works for 0', () => {
            expect(move(0, [1, 1, 0, 1])).to.deep.equal(
                [1, 1, 0, 1]
            );
        });

        it('works for last example', () => {
            expect(move(4, [1, 2, -3, 0, 3, 4, -2])).to.deep.equal(
                [1, 2, -3, 4, 0, 3, -2]
            );
        });

        it('wraps long shot as expected', () => {
            expect(move(11, [0, 0, 0, 11, 0, 0])).to.deep.equal(
                [0, 0, 0, 0, 11, 0]
            );
        });

        it('wraps negative long shot as expected', () => {
            expect(move(-11, [0, 0, 0, -11, 0, 0])).to.deep.equal(
                [0, 0, -11, 0, 0, 0]
            );
        });
    });

    describe('linked list', () => {

        describe('build from array', () => {

            it('works with a single element', () => {
                let list = buildFrom([1]);

                expect(Object.keys(list).length).to.equal(1);
                let key = Object.keys(list)[0];
                expect(key).to.equal('1');
                expect(list[key]).to.deep.equal({
                    key: '1',
                    value: 1,
                    next: '1',
                    previous: '1',
                });
            });
        });

        const buildFrom = (incoming) => {
            let list = {
                '1': { key: '1', value: incoming[0], next: '1', previous: '1' },
            };
            return list;
        }
    });
});


