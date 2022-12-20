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
const run = (paths, visited, candidates, table, credit) => {
    starts = [
        paths[0][paths[0].length - 1],
        paths[1][paths[1].length - 1],
    ];

    let bests = starts.map((start, index) => {
        return candidates
            .filter(node => !visited.includes(node.id))
            .map(node => ({
                ...node,
                hint: (credit - table[entry(start, node)] - 1) * node.rate,
            }))
            .sort((n1, n2) => n2.hint - n1.hint)
            .slice(0, 2);
    });
    let choice = [];
    if (bests[0][0].id == bests[1][0].id) {
        if (bests[0][0].hint > bests[1][0].hint) {
            choice.push(bests[0][0]);
            choice.push(bests[1][1]);
        }
        else if (bests[0][0].hint < bests[1][0].hint) {
            choice.push(bests[0][1]);
            choice.push(bests[1][0]);
        }
        else {
            if (bests[0][1].hint < bests[1][1].hint) {
                choice.push(bests[0][0]);
                choice.push(bests[1][1]);
            }
            else {
                choice.push(bests[0][1]);
                choice.push(bests[1][0]);
            }
        }
    }
    else {
        choice.push(bests[0][0]);
        choice.push(bests[1][0]);
    }
    paths[0].push({ id: choice[0].id, rate: choice[0].rate });
    paths[1].push({ id: choice[1].id, rate: choice[1].rate });
    visited.push(choice[0].id);
    visited.push(choice[1].id);
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

module.exports = { score, run, init, winner1, solve1, winner2, solve2, parse, timeSpent, weight, distances, entry };