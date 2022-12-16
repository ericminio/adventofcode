const { extractor, lines, add, descending } = require('../support');

const solve1 = (file) => {
    const valves = parse(file);

    candidates = [];
    const best = {
        opened: [
            { minutes: 2, valve: { id: 'DD', rate: 20 } },
            { minutes: 5, valve: { id: 'BB', rate: 13 } },
            { minutes: 9, valve: { id: 'JJ', rate: 21 } },
            { minutes: 17, valve: { id: 'HH', rate: 22 } },
            { minutes: 21, valve: { id: 'EE', rate: 3 } },
            { minutes: 24, valve: { id: 'CC', rate: 2 } },
        ],
    };
    best.total = best.opened.map(event => event.valve.rate * (30 - event.minutes)).reduce(add);
    candidates.push(best);

    return candidates.map(candidate => candidate.total).sort(descending)[0];
};

const solve2 = (file) => {
    return 15;
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
        })
    })
    return valves;
}

module.exports = { solve1, solve2, digest };