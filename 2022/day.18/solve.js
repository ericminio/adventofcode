const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');
const { around, id } = require('./cube');
const { boundaries } = require('./boundaries.js');
const { spaceAsHash } = require('../../lib/3d/space');

const solve1 = (file) => {
    let cubes = lines(file).reduce((cubes, line) => {
        cubes[line] = parse(line);
        return cubes;
    }, {});

    return exposed(cubes);
};

const solve2 = (file) => {
    let cubes = lines(file).reduce((cubes, line) => {
        cubes[line] = parse(line);
        return cubes;
    }, {});
    let neighbours = Object.values(cubes)
        .reduce((neighbours, cube) => {
            cube.neighbours.forEach(neighbour => {
                neighbours[id(neighbour)] = {
                    id: id(neighbour),
                    position: neighbour,
                    neighbours: around(neighbour)
                };
            });
            return neighbours;
        }, {});
    let candidates = Object.values(neighbours).filter(candidate => cubes[candidate.id] === undefined);

    let bounds = boundaries(Object.values(cubes).map(cube => cube.position));
    let space = spaceAsHash(bounds);

    return exposed(cubes) - 6 * countTrappedAssumingIsolatedAirBubbles(candidates, cubes);
};

const countTrappedAssumingIsolatedAirBubbles = (candidates, cubes) => {
    let count = 0;
    candidates.forEach(candidate => {
        let trapped = true;
        candidate.neighbours.forEach(neighbour => {
            if (cubes[id(neighbour)] === undefined) {
                trapped = false;
            }
        });
        if (trapped) {
            count ++;
        }
    });
    return count;
};

module.exports = { solve1, solve2 };