const { expect } = require('chai');
const { add } = require('../support');
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

        it('works with 1 level', () => {
            const valves = digest([
                'Valve AA has flow rate=0; tunnels lead to valves BB',
                'Valve BB has flow rate=2; tunnels lead to valves AA',
            ]);
            const total = solve(valves);

            expect(total).to.equal(2 * 28);
        });

        const solve = (valves) => {
            let opened = [];
            let minutes = 0;
            let current = valves.find(v => v.id === 'AA');

            current.children.forEach(id => {
                minutes++;
                let child = valves.find(v => v.id === id);
                if (child.rate !== 0) {
                    minutes++;
                    opened.push({ id: child.id, rate: child.rate, minutes });
                }
            });

            return opened.map(v => v.rate * (30 - v.minutes)).reduce(add);
        };
    });
});


