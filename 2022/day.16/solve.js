const { gps } = require('../../lib/2d/gps');
const { extractor, lines, add, descending, id } = require('../support');

const solve1 = (file) => {
    const map = parse(file);
    const table = distances(map);

    const candidates = [];

    let path = [
        { valve: { id: 'AA', rate: 0 }, minutes: 0 },
        { valve: { id: 'DD', rate: 20 } },
        { valve: { id: 'BB', rate: 13 } },
        { valve: { id: 'JJ', rate: 21 } },
        { valve: { id: 'HH', rate: 22 } },
        { valve: { id: 'EE', rate: 3 } },
        { valve: { id: 'CC', rate: 2 } },
    ];
    let minutes = 0;
    for (var i = 0; i < path.length - 1; i++) {
        let options = {
            from: path[i].valve.id,
            to: path[i + 1].valve.id,
            map,
        };
        minutes += table[`${path[i].valve.id}-${path[i + 1].valve.id}`]
        if (path[i + 1].valve.rate > 0) { minutes++; }
        path[i + 1].minutes = minutes;
    }
    console.log(path);

    const candidate = { opened: path };
    candidate.total = candidate.opened.map(event => event.valve.rate * (30 - event.minutes)).reduce(add);
    candidates.push(candidate);

    return candidates.map(candidate => candidate.total).sort(descending)[0];
};

const solve2 = (file) => {
    return 15;
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
    console.log(values);
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

module.exports = { solve1, solve2, parse, timeSpent };