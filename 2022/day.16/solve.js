const { gps } = require('../../lib/2d/gps');
const { extractor, lines, add } = require('../support');

const init = (map) => {
    const candidates = Object.values(map)
        .filter(valve => valve.rate > 0)
        .map(valve => ({ id: valve.id, rate: valve.rate }));
    return candidates;
};
const solve1 = (file) => {
    return score(winner1(file, 30), 30);
};
const winner1 = (file, credit) => {
    const map = parse(file);
    const table = distances(map);
    const candidates = init(map);
    return sort(candidates, { id: 'AA', rate: 0 }, table, credit);
};

const solve2 = (file) => {
    return score(winner2(file, 26), 26);
};
const winner2 = (file, credit) => {
    return [
        { id: 'DD', rate: 20, minutes: 2 },
        { id: 'JJ', rate: 21, minutes: 3 },
        { id: 'BB', rate: 13, minutes: 7 },
        { id: 'HH', rate: 22, minutes: 7 },
        { id: 'CC', rate: 2, minutes: 9 },
        { id: 'EE', rate: 3, minutes: 11 },
    ]
};

const score = (set, credit) => {
    return set
        .map(valve =>
            (valve.minutes > credit) ? 0 : valve.rate * (credit - valve.minutes))
        .reduce(add);
};
const sort = (candidates, start, table, credit) => {
    const sorted = [];
    let minutes = 0;
    let end;

    while (candidates.length > 1) {
        candidates.sort((a, b) => {
            let aTHENb = weight(start, a, b, table, credit - minutes);
            let bTHENa = weight(start, b, a, table, credit - minutes);
            return bTHENa - aTHENb;
        });
        end = candidates[0];
        minutes += (table[entry(start, end)] + 1);
        sorted.push({ ...end, minutes });
        start = candidates.shift();
    }
    end = candidates[0];
    minutes += (table[entry(start, end)] + 1);
    sorted.push({ ...end, minutes });

    return sorted;
};

const weight = (start, a, b, table, remaining) => {
    const startToA = table[entry(start, a)] + 1;
    const aToB = table[entry(a, b)] + 1;
    return (remaining - startToA) * a.rate + (remaining - startToA - aToB) * b.rate;
};
const entry = (a, b) => `${a.id}-${b.id}`;

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

module.exports = { score, init, winner1, solve1, winner2, solve2, parse, timeSpent, weight, distances, entry };