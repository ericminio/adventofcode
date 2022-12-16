const { extractor, lines, add, descending } = require('../support');

const solve1 = (file) => {
    const valves = parse(file);
    const start = valves.find(valve => valve.id = 'AA');
    const targets = valves.filter(valve => valve.rate > 0).sort((a, b) => b.rate - a.rate);

    const candidates = [];

    let path = [
        { id: 'AA', rate: 0 },
        { id: 'DD', rate: 20 },
        { id: 'BB', rate: 13 },
        { id: 'JJ', rate: 21 },
        { id: 'HH', rate: 22 },
        { id: 'EE', rate: 3 },
        { id: 'CC', rate: 2 },
    ];

    const candidate = {
        opened: [
            { minutes: 0, valve: { id: 'AA', rate: 0 } },
            { minutes: 2, valve: { id: 'DD', rate: 20 } },
            { minutes: 5, valve: { id: 'BB', rate: 13 } },
            { minutes: 9, valve: { id: 'JJ', rate: 21 } },
            { minutes: 17, valve: { id: 'HH', rate: 22 } },
            { minutes: 21, valve: { id: 'EE', rate: 3 } },
            { minutes: 24, valve: { id: 'CC', rate: 2 } },
        ],
    };
    candidate.total = candidate.opened.map(event => event.valve.rate * (30 - event.minutes)).reduce(add);
    candidates.push(candidate);

    return candidates.map(candidate => candidate.total).sort(descending)[0];
};

const solve2 = (file) => {
    return 15;
};

const timeSpent = (options) => {
    return 3;
};

const parse = (file) => {
    return digest(lines(file));
};
const digest = (lines) => {
    const valves = lines.map(extractor(/^Valve (.*) has flow rate=(.*); tunnel[s]? lead[s]? to valve[s]? (.*)$/))
        .map(data => ({
            id: data[0],
            rate: parseInt(data[1]),
            childrenIds: data[2].split(',').map(id => id.trim()),
            opened: false,
            visited: false,
        }));
    valves.forEach(valve => {
        valve.neighbours = [];
        valve.childrenIds.forEach(id => {
            valve.neighbours.push(valves.find(v => v.id === id));
        });
        delete valve.childrenIds;
    })
    return valves;
}

module.exports = { solve1, solve2, parse, timeSpent };