const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { move } = require('./solve');
const { add, lines } = require('../support');

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

                expect(list['1']).to.deep.equal({
                    key: '1',
                    value: 1,
                    next: '1',
                    previous: '1',
                });
            });

            it('works with two elements', () => {
                let list = buildFrom([1, 2]);

                expect(list['1']).to.deep.equal({
                    key: '1',
                    value: 1,
                    next: '2',
                    previous: '2',
                });
                expect(list['2']).to.deep.equal({
                    key: '2',
                    value: 2,
                    next: '1',
                    previous: '1',
                });
            });

            it('keeps track of first and last elements right tfrom the start', () => {
                let list = buildFrom([1]);

                expect(list.first).to.equal('1');
                expect(list.last).to.equal('1');
            });

            it('keeps track of first and last elements after push', () => {
                let list = buildFrom([1, 2]);

                expect(list.first).to.equal('1');
                expect(list.last).to.equal('2');
            });
        });

        describe('recreate array', () => {

            it('works', () => {
                let list = buildFrom([1, 2, 3]);
                let array = asArray(list);

                expect(array).to.deep.equal([1, 2, 3]);
            });
        });

        describe('inversion', () => {

            it('works as expected', () => {
                let incoming = [1, 2, 3, 4, 5];
                let list = buildFrom(incoming);
                let inverted = asArray(invert(list, 2, 3))

                expect(inverted).to.deep.equal([1, 3, 2, 4, 5]);
            });
        });

        it('can solve part 1 example', () => {
            let input = lines(`${__dirname}/data/example.txt`).map(line => parseInt(line));
            let list = buildFrom(input);

            expect(Object.keys(list).length).to.equal(7 + 2);
            for (let i = 0; i < input.length; i++) {
                let value = input[i];
                console.log('moving', value);
                for (let count = 0; count < value; count++) {
                    let a = list[nodeKey(value)];
                    let b = list[a.next];
                    invert(list, a.value, b.value);
                }
            }
            console.log('message', asArray(list));
        });

        const invert = (list, valueA, valueB) => {
            // console.log('decrypting', asArray(list));
            // console.log(valueA, valueB);
            let a = list[nodeKey(valueA)];
            let b = list[nodeKey(valueB)];
            let around = {
                previous: list[a.key].previous,
                next: list[b.key].next,
            };
            b.next = a.key;
            a.previous = b.key;
            b.previous = around.previous;
            a.next = around.next;
            list[around.previous].next = b.key;
            list[around.next].previous = a.key;

            return list;
        }

        const asArray = (list) => {
            let size = Object.values(list).length - 2;
            let current = list[list.first];
            let array = [];
            for (let i = 0; i < size; i++) {
                array.push(current.value);
                current = list[current.next];
            }
            return array;
        };

        const buildFrom = (incoming) => {
            let key = nodeKey(incoming[0]);
            let list = {};
            list[key] = { key, value: incoming[0], next: key, previous: key };
            list.first = key;
            list.last = key;

            for (let i = 1; i < incoming.length; i++) {
                let value = incoming[i];
                list = pushNode(value, list);
            }

            return list;
        };
        const nodeKey = (value) => {
            return `${value}`;
        };
        const pushNode = (value, list) => {
            let key = nodeKey(value);
            let node = { key, value, next: list.first, previous: list.last };
            list[list.last].next = key;
            list[list.first].previous = key;
            list[key] = node;
            list.last = key;

            return list;
        }
    });
});


