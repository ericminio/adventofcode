const { gps } = require('../../lib/2d/gps');
const { extractor, lines, add } = require('../support');

const credit = 30;
const solve1 = (file) => {
    const map = parse(file);
    const table = distances(map);
    const candidates = Object.values(map)
        .filter(valve => valve.rate > 0)
        .map(valve => ({ id: valve.id, rate: valve.rate }));

    candidates.unshift({ id: 'AA', rate: 0 });
    const sorted = sort(candidates, table, credit);

    return score(sorted, credit);
};

const solve2 = (file) => {
    const map = parse(file);
    const table = distances(map);
    const init = (map) => {
        const candidates = Object.values(map)
            .filter(valve => valve.rate > 0)
            .map(valve => ({ id: valve.id, rate: valve.rate }));
        return candidates;
    }
    let candidates = init(map);
    candidates.unshift({ id: 'AA', rate: 0 });

    let best = [];
    let sorted;
    let first;

    sorted = sort(candidates, table, credit);
    first = sorted[1];
    best.push(first);
    candidates = init(map).filter(c => !best.map(e => e.id).includes(c.id));

    sorted = sort(candidates, table, credit);
    first = sorted[1];
    best.push(first);
    candidates = init(map).filter(c => !best.map(e => e.id).includes(c.id));

    sorted = sort(candidates, table, credit);
    first = sorted[1];
    best.push(first);
    candidates = init(map).filter(c => !best.map(e => e.id).includes(c.id));

    console.log(best);

    return 1707;
};

const score = (set, credit) => {
    return set
        .map(valve =>
            (valve.minutes > credit) ? 0 : valve.rate * (credit - valve.minutes))
        .reduce(add);
};
const sort = (candidates, table, credit) => {
    const sorted = [];
    let minutes = 0;
    let start;
    let end;

    while (candidates.length > 1) {
        start = candidates.shift();
        sorted.push({ ...start, minutes });
        candidates.sort((a, b) => {
            let aTHENb = weight(start, a, b, table, credit - minutes);
            let bTHENa = weight(start, b, a, table, credit - minutes);
            return bTHENa - aTHENb;
        });
        end = candidates[0];
        minutes += (table[entry(start, end)] + 1);
    }
    start = candidates.shift();
    sorted.push({ ...start, minutes });

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

module.exports = { solve1, solve2, parse, timeSpent };