const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');
const { around, id } = require('./cube');
const { boundaries } = require('./boundaries.js');
const { spaceAsHash } = require('../../lib/3d/space');
const { setWall } = require('../../lib/walls');
const { gps } = require('../../lib/gps');

const lavaDropplets = (file) => {
    return lines(file).reduce((cubes, line) => {
        let cube = parse(line);
        cubes[cube.id] = parse(line);
        return cubes;
    }, {});
};
const solve1 = (file) => {
    let cubes = lavaDropplets(file);

    return exposed(cubes);
};

const solve2 = (file) => {
    let cubes = lavaDropplets(file);
    let candidates = neighbours(cubes);
    // console.log(candidates.length);

    let bounds = boundaries(candidates.map(candidate => candidate.position));
    // console.log(bounds);
    let minimumPosition = { x: bounds.minimum.x - 1, y: bounds.minimum.y - 1, z: bounds.minimum.z - 1  };
    let maximumPosition = { x: bounds.maximum.x + 1, y: bounds.maximum.y + 1, z: bounds.maximum.z + 1  };

    let space = spaceAsHash({
        minimum: minimumPosition,
        maximum: maximumPosition,
    });
    Object.values(cubes).forEach(cube => {
        setWall(cube.id, space);
    });
    // console.log(space);

    let request = { origin: { id: id(minimumPosition) }};
    let count = 0;
    candidates.forEach(candidate => {
        request.target = { id: candidate.id };
        try {
            gps(request, space);
        }
        catch (error) {
            console.log(request);
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

const neighbours = (cubes) => {
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
    return Object.values(neighbours).filter(candidate => cubes[candidate.id] === undefined);
};

module.exports = { solve1, solve2, lavaDropplets, neighbours };