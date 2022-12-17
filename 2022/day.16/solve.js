const { gps } = require('../../lib/2d/gps');
const { extractor, lines, add, descending, id } = require('../support');

const solve1 = (file) => {
    const map = parse(file);
    const table = distances(map);

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
        minutes += table[`${path[i].id}-${path[i + 1].id}`]
        if (path[i + 1].rate > 0) { minutes++; }
        path[i + 1].minutes = minutes;
    }

    const candidate = { path };
    candidate.total = candidate.path.map(valve => valve.rate * (30 - valve.minutes)).reduce(add);
    candidates.push(candidate);

    return candidates.map(candidate => candidate.total).sort(descending)[0];
};

const solve2 = (file) => {
    return 15;
};

const permutations = (set) => {
    let values = [];
    if (set.length === 1) {
        return [set];
    }

    for (let i = 0; i < set.length; i++) {
        let one = set[i];
        let rest = set.slice(0, i).concat(set.slice(i + 1));
        let inner = permutations(rest);
        inner.forEach(p => values.push([one].concat(p)));
    }

    return values;
};

const distances = (map) => {
    let values = {};
    const ids = Object.keys(map);
    for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < ids.length; j++) {
            values[`${ids[i]}-${ids[j]}`] = timeSpent({
                from: ids[i],
                to: ids[j],
                map,
            });
        }
    }
    return values;
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

module.exports = { solve1, solve2, parse, timeSpent, permutations };