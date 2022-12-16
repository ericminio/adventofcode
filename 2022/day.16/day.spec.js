const { expect } = require('chai');
const { add, descending } = require('../support');
const { solve1, solve2, digest } = require('./solve');

describe.only('2022.16', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(1651);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('exploration', () => {

        it('works with 1 level', () => {
            const valves = digest([
                'Valve AA has flow rate=0; tunnels lead to valves BB',
                'Valve BB has flow rate=2; tunnels lead to valves AA',
            ]);
            const total = solve(valves);

            expect(total).to.equal(2 * 28);
        });

        it('works with 1 level 2 children', () => {
            const valves = digest([
                'Valve AA has flow rate=0; tunnels lead to valves BB, CC',
                'Valve BB has flow rate=2; tunnels lead to valves AA',
                'Valve CC has flow rate=3; tunnels lead to valves AA',
            ]);
            const total = solve(valves);

            expect(total).to.equal(3 * 28);
        });

        const solve = (valves) => {
            let opened = [];
            let minutes = 0;
            let start = valves.find(v => v.id === 'AA');

            visit(start, valves, minutes, opened);

            return opened.map(e => e.valve.rate * (30 - e.minutes)).sort(descending)[0];
        };
        const visit = (valve, valves, minutes, opened) => {
            console.log('visiting', valve.id)
            valve.visited = true;
            if (valve.rate > 0) {
                opened.push({
                    valve,
                    minutes: minutes + 1,
                });
            }
            valve.neighbours.forEach(child => {
                if (!child.visited) { visit(child, valves, minutes + 1, opened) };
            });
        };
    });
});


