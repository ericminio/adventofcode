const { gps } = require('../../lib/2d/gps');
const { extractor, lines, add, descending, id, ascending } = require('../support');

const solve1 = (file) => {
    const map = parse(file);
    const table = distances(map);

    const valves = Object.values(map).filter(valve => valve.rate > 0);
    const candidates = valves.map(valve => ({ id: valve.id, rate: valve.rate }));
    candidates.unshift({ id: 'AA', rate: 0 });

    let sorted = [];
    let minutes = 0;
    let start;
    let end;

    while (candidates.length > 1) {
        start = candidates.shift();
        sorted.push({ ...start, minutes });
        candidates.sort((a, b) => {
            let aTHENb = (30 - minutes - table[entry(start.id, a.id)] - 1) * a.rate + (30 - minutes - table[entry(a.id, b.id)] - 1) * b.rate;
            let bTHENa = (30 - minutes - table[entry(start.id, b.id)] - 1) * b.rate + (30 - minutes - table[entry(b.id, a.id)] - 1) * a.rate;
            return bTHENa - aTHENb;
        });
        end = candidates[0];
        minutes += (table[entry(start.id, end.id)] + 1);
    }
    start = candidates.shift();
    sorted.push(start);

    console.log(sorted);

    return 1;
};
const solveExample = (file) => {
    let max = 0;
    const map = parse(file);
    const table = distances(map);

    const valves = Object.values(map).filter(valve => valve.rate > 0);
    const ids = valves.map(valve => valve.id);
    permutations(ids, path => {
        path = prepare(path, map);
        let total = score(path, table);
        if (total > max) {
            max = total;
            console.log({ path, max });
        }
    });

    return max;
};

const solve2 = (file) => {
    return 15;
};

const entry = (a, b) => `${a}-${b}`;

const prepare = (path, map) => {
    path = path.map(id => ({ id, rate: map[id].rate }));
    path.unshift({ id: 'AA', rate: 0, minutes: 0 });
    return path;
};

const score = (path, table) => {
    let minutes = 0;
    for (var i = 0; i < path.length - 1; i++) {
        minutes += table[`${path[i].id}-${path[i + 1].id}`]
        if (path[i + 1].rate > 0) { minutes++; }
        path[i + 1].minutes = minutes <= 30 ? minutes : 0;
    }
    return path.map(valve => valve.rate * (30 - valve.minutes)).reduce(add);
};
const permutations = (set, yield) => {
    let values = [];
    if (set.length === 1) {
        return [set];
    }

    for (let i = 0; i < set.length; i++) {
        let one = set[i];
        let rest = set.slice(0, i).concat(set.slice(i + 1));
        let inner = permutations(rest);
        inner.forEach(p => {
            const permuted = [one].concat(p);
            values.push(permuted);
            if (!!yield) { yield(permuted); }
        });
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

module.exports = { solveExample, solve1, solve2, parse, timeSpent, permutations };