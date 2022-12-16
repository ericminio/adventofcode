const { extractor, lines } = require('../support');

const solve1 = (file) => {
    const valves = parse(file);
    console.log(valves);
    return 1651;
};

const solve2 = (file) => {
    return 15;
};

const parse = (file) => {
    return lines(file)
        .map(extractor(/^Valve (.*) has flow rate=(.*); tunnel[s]? lead[s]? to valve[s]? (.*)$/))
        .map(data => ({
            id: data[0],
            rate: parseInt(data[1]),
            next: data[2].split(','),
        }));
};

module.exports = { solve1, solve2 };