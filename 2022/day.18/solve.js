const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');
const { around, id } = require('./cube');
const { boundaries } = require('./boundaries.js');
const { spaceAsHash } = require('../../lib/3d/space');
const { setWall } = require('../../lib/walls');
const { gps } = require('../../lib/gps');

const solve1 = (file) => {
    let cubes = lines(file).reduce((cubes, line) => {
        let cube = parse(line);
        cubes[cube.id] = parse(line);
        return cubes;
    }, {});

    return exposed(cubes);
};

const solve2 = (file) => {
    let cubes = lines(file).reduce((cubes, line) => {
        let cube = parse(line);
        cubes[cube.id] = parse(line);
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
    Object.values(cubes).forEach(cube => {
        setWall(cube.id, space);
    });
    let request = { origin: { id: '0x0x0' }};
    let count = 0;
    candidates.forEach(candidate => {
        request.target = { id: candidate.id };
        try {
            console.log(request);
            gps(request, space);
        }
        catch (error) {
            count ++;
        }
    });
    console.log('via gps', count);

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