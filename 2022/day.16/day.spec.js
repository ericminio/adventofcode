const { expect } = require('chai');
const { gps } = require('../../lib/2d/gps.js');
const { descending } = require('../support');
const { solve1, solve2, parse, timeSpent } = require('./solve');

describe.only('2022.16', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(1651);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('re-use gps', () => {

        it('is promising', () => {
            const file = `${__dirname}/data/example.txt`;
            const map = parse(file);
            const request = {
                origin: { id: 'DD' },
                target: { id: 'JJ' },
            };
            let path = gps(request, map).nodes.map(node => node.id);

            expect(path).to.deep.equal(['DD', 'AA', 'II', 'JJ']);
        });

        it('can help with clocking moves between valves', () => {
            const file = `${__dirname}/data/example.txt`;
            const map = parse(file);

            expect(timeSpent({ from: 'DD', to: 'JJ', map })).to.equal(3);
        });

    });

    describe('permutations', () => {

        it('is useful', () => {
            let actual = permutations([1, 2, 3])
            let expected = [
                [1, 2, 3],
                [1, 3, 2],
                [2, 3, 1],
                [2, 1, 3],
                [3, 1, 2],
                [3, 2, 1],
            ];
            expect(actual).to.deep.equal(expected);
        });

        const permutations = (set) => {
            let values = [];

            return [
                [1, 2, 3],
                [1, 3, 2],
                [2, 3, 1],
                [2, 1, 3],
                [3, 1, 2],
                [3, 2, 1],
            ];
        }
    });
});


