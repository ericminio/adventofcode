const { expect } = require('chai');
const { gps } = require('../../lib/2d/gps.js');
const { init, winner1, solve1, winner2, solve2, parse, timeSpent, weight, distances, entry } = require('./solve');

describe.only('2022.16', () => {

    describe('part 1', () => {

        describe('example', () => {

            it('has a winning path', () => {
                expect(winner1(`${__dirname}/data/example.txt`, 30)).to.deep.equal([
                    { id: 'DD', rate: 20, minutes: 2 },
                    { id: 'BB', rate: 13, minutes: 5 },
                    { id: 'JJ', rate: 21, minutes: 9 },
                    { id: 'HH', rate: 22, minutes: 17 },
                    { id: 'EE', rate: 3, minutes: 21 },
                    { id: 'CC', rate: 2, minutes: 24 },
                ]);
            });

            it('is solved', () => {
                expect(solve1(`${__dirname}/data/example.txt`)).to.equal(1651);
            });
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(2119);
        });

    });

    describe('part 2', () => {

        describe('example', () => {

            let path = [
                { id: 'DD', rate: 20, minutes: 2 },
                { id: 'JJ', rate: 21, minutes: 3 },
                { id: 'BB', rate: 13, minutes: 7 },
                { id: 'HH', rate: 22, minutes: 7 },
                { id: 'CC', rate: 2, minutes: 9 },
                { id: 'EE', rate: 3, minutes: 11 },
            ];
            it('has a winning path', () => {
                expect(winner2(`${__dirname}/data/example.txt`, 26)).to.deep.equal(path);
            });

            it('is solved', () => {
                expect(solve2(`${__dirname}/data/example.txt`)).to.equal(1707);
            });

            it('is useful', () => {
                const file = `${__dirname}/data/example.txt`;
                const map = parse(file);
                const table = distances(map);
                const credit = 26;
                let candidates = init(map);
                console.log(candidates);

                let paths = { 0: [{ id: 'AA' }], 1: [{ id: 'AA' }] };
                let visited = [];
                let starts = [
                    paths[0][paths[0].length - 1],
                    paths[1][paths[1].length - 1],
                ];

                [{ id: 'AA' }, { id: 'AA' }].forEach((start, index) => {
                    let exploration = candidates
                        .filter(node => !visited.includes(node.id))
                        .map(node => ({
                            ...node,
                            hint: (credit - table[entry(start, node)] - 1) * node.rate,
                        }))
                        .sort((n1, n2) => n2.hint - n1.hint);
                    let best = exploration[0];
                    paths[index].push(best.id);
                    visited.push(best.id);
                });
                console.log({ paths });
                console.log({ visited });

                let bests = starts.map((start, index) => {
                    return {
                        index,
                        best: candidates
                            .filter(node => !visited.includes(node.id))
                            .map(node => ({
                                ...node,
                                hint: (credit - table[entry(start, node)] - 1) * node.rate,
                            }))
                            .sort((n1, n2) => n2.hint - n1.hint)
                            .slice(0, 2)
                    };
                });
                console.log(JSON.stringify(bests, null, 2));

                candidates = [
                    { id: 'BB', rate: 13 },
                    { id: 'CC', rate: 2 },
                    { id: 'EE', rate: 3 },
                    { id: 'HH', rate: 22 },
                ];
                exploration = candidates.map(node => ({
                    ...node,
                    hint1: (credit - table[entry({ id: 'DD' }, node)] - 1) * node.rate,
                    hint2: (credit - table[entry({ id: 'JJ' }, node)] - 1) * node.rate,
                }));
                console.log(exploration);

                candidates = [
                    { id: 'CC', rate: 2 },
                    { id: 'EE', rate: 3 },
                ];
                exploration = candidates.map(node => ({
                    ...node,
                    hint1: (credit - table[entry({ id: 'HH' }, node)] - 1) * node.rate,
                    hint2: (credit - table[entry({ id: 'EE' }, node)] - 1) * node.rate,
                }));
                console.log(exploration);
            });
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

    describe('weight', () => {
        const file = `${__dirname}/data/example.txt`;
        const map = parse(file);
        const table = distances(map);

        it('computes AJB as expected', () => {
            let value = weight(map['AA'], map['JJ'], map['BB'], table, 26);
            expect(value).to.equal(730);
        });
        it('computes ABJ as expected', () => {
            let value = weight(map['AA'], map['BB'], map['JJ'], table, 26);
            expect(value).to.equal(732);
        })
    });
});


