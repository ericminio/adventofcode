const { expect } = require('chai');
const { solve1, solve2, parse, area } = require('./solve');

describe.only('2022.15', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`, 10)).to.equal(26);
        });
        it.skip('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`, 2000000)).to.equal(4748135);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(56000011);
        });
        it.skip('is solved', () => {
            expect(solve2(`${__dirname}/data/input.txt`)).to.equal(1);
        });

    });

    describe('exploration', () => {

        let file = `${__dirname}/data/input.txt`;
        it('is usefull', () => {
            const sensors = parse(file);

            const sizes = sensors.map(sensor => sensor.distanceToBeacon);
            console.log(sizes);

            const range = area(sensors);
            console.log(range);
        });
    });
});


