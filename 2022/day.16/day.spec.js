const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

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
            const lines = [
                'Valve AA has flow rate=0; tunnels lead to valves DD, II, BB',
                'Valve BB has flow rate=13; tunnels lead to valves CC, AA'
            ];

        });
    });
});


