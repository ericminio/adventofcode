const { extractor, lines } = require('../support');

const solve1 = (file) => {
    const valves = parse(file);

    return 1651;
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