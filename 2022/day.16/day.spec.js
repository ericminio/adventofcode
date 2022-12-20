const { expect } = require('chai');
const { gps } = require('../../lib/2d/gps.js');
const { score, time, run, init, winner1, solve1, winner2, solve2, parse, timeSpent, weight, distances, entry } = require('./solve');

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

            it('can help to understand the sort strategy', () => {
                const file = `${__dirname}/data/example.txt`;
                const map = parse(file);
                const table = distances(map);
                const credit = 26;
                let candidates = init(map);
                // console.log(candidates);

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
                // console.log(exploration);

                candidates = [
                    { id: 'CC', rate: 2 },
                    { id: 'EE', rate: 3 },
                ];
                exploration = candidates.map(node => ({
                    ...node,
                    hint1: (credit - table[entry({ id: 'HH' }, node)] - 1) * node.rate,
                    hint2: (credit - table[entry({ id: 'BB' }, node)] - 1) * node.rate,
                }));
                // console.log(exploration);
            });

            it.only('can help to crack the code', () => {
                const file = `${__dirname}/data/example.txt`;
                const map = parse(file);
                const table = distances(map);
                const credit = 26;

                const visited = (paths) => {
                    const union = []
                    paths[0].forEach(node => { if (!union.includes(node.id)) { union.push(node.id) } });
                    paths[1].forEach(node => { if (!union.includes(node.id)) { union.push(node.id) } });
                    return union;
                };
                const last = (path) => {
                    return path[path.length - 1];
                };
                const nodeScore = (start, node, table, credit, minutes) => {
                    return (credit - minutes - table[entry(start, node)] - 1) * node.rate;
                };
                const pickNext = (minutes, start, candidates, table, credit) => {
                    let next = candidates
                        .map(node => ({
                            ...node,
                            score: nodeScore(start, node, table, credit, minutes),
                        }))
                        .sort((n1, n2) => n2.score - n1.score)
                    [0];
                    next.minutes = minutes + table[entry(start, next)] + 1;
                    return next;
                };
                const pushNext = (minutes, path, table, credit) => {
                    let candidates = init(map).filter(c => !visited(paths).includes(c.id));
                    if (candidates.length == 0) { return }

                    start = last(path);
                    let next = pickNext(minutes, start, candidates, table, credit);
                    path.push(next);
                };
                const pushNexts = (minutes, paths, table, credit) => {
                    let candidates = init(map).filter(c => !visited(paths).includes(c.id));
                    if (candidates.length == 0) { return }

                    console.log({ lasts: [last(paths[0]), last(paths[1])] })
                    let nexts = [];
                    nexts.push(pickNext(minutes, last(paths[0]), candidates, table, credit));
                    nexts.push(pickNext(minutes, last(paths[1]), candidates, table, credit));
                    console.log({ nexts });
                    if (nexts[0].score > nexts[1].score) {
                        paths[0].push(nexts[0]);
                        pushNext(minutes, paths[1], table, credit);
                    }
                    else {
                        paths[1].push(nexts[1]);
                        pushNext(minutes, paths[0], table, credit);
                    }

                };
                const run = (minutes, paths, table, credit) => {
                    if (last(paths[0]).minutes == minutes && last(paths[1]).minutes == minutes) {
                        pushNexts(minutes, paths, table, credit);
                    }
                    else {
                        paths.forEach(path => {
                            if (last(path).minutes == minutes) {
                                pushNext(minutes, path, table, credit);
                            }
                        });
                    }
                };
                let minutes = 0;
                let start = { id: 'AA', rate: 0, minutes };
                let paths = [
                    [start],
                    [start],
                ];

                while (minutes < 30) {
                    run(minutes, paths, table, credit);
                    minutes++;
                }

                console.log(JSON.stringify(paths, null, 2));
                let total = score(paths[0], credit) + score(paths[1], credit);
                console.log(total);

                expect(1707).to.equal(1707);
            });

            it('is solved', () => {
                expect(solve2(`${__dirname}/data/example.txt`)).to.equal(1707);
            });

        });

        it.skip('is solved', () => {
            expect(solve2(`${__dirname}/data/input.txt`)).to.equal(2144);
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


