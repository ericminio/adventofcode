const { expect } = require('chai');
const { solve1, solve2, digest } = require('./solve');

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

    describe('exploration', () => {

        it('is usefull', () => {
            const valves = digest([
                'Valve A has flow rate=0; tunnels lead to valves B',
                'Valve B has flow rate=1; tunnels lead to valves A'
            ]);

        });
    });
});


