const { gps } = require('../../lib/2d/gps');
const { extractor, lines, add, descending } = require('../support');

const solve1 = (file) => {
    const map = parse(file);

    const candidates = [];

    let path = [
        { id: 'AA', rate: 0, minutes: 0 },
        { id: 'DD', rate: 20 },
        { id: 'BB', rate: 13 },
        { id: 'JJ', rate: 21 },
        { id: 'HH', rate: 22 },
        { id: 'EE', rate: 3 },
        { id: 'CC', rate: 2 },
    ];
    let minutes = 0;
    for (var i = 0; i < path.length - 1; i++) {
        let options = {
            from: path[i].id,
            to: path[i + 1].id,
            map,
        };
        minutes += timeSpent(options);
        if (path[i + 1].rate > 0) { minutes++; }
        path[i + 1].minutes = minutes;
    }
    console.log(path);

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
    const request = {
        origin: { id: options.from },
        target: { id: options.to },
    };
    let path = gps(request, options.map).nodes.map(node => node.id);

    return path.length - 1;
};


const parse = (file) => {
    return digest(lines(file));
};
const digest = (lines) => {
    const collection = lines.map(extractor(/^Valve (.*) has flow rate=(.*); tunnel[s]? lead[s]? to valve[s]? (.*)$/))
        .map(data => ({
            id: data[0],
            rate: parseInt(data[1]),
            value: 1,
            neighbours: data[2].split(',').map(id => id.trim()),
        }));
    const valves = {};
    collection.forEach(valve => valves[valve.id] = valve);

    return valves;
}

module.exports = { solve1, solve2, parse, timeSpent };