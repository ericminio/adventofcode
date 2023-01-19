const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');
const { around, id } = require('./cube');
const { boundaries } = require('./boundaries.js');
const { spaceAsHash } = require('../../lib/3d/space');
const { setWall } = require('../../lib/walls');
const { gps } = require('../../lib/gps');

const solve1 = (file) => {
    let cubes = lavaDropplets(file);

    return exposed(cubes);
};

const solve2 = (file) => {
    let cubes = lavaDropplets(file);
    let trappedDropplets = airTrappedDropplets(cubes);

    return exposed(cubes) - touchingCount(trappedDropplets, cubes);
};

const touchingCount = (trappedDropplets, cubes) => {
    let count = 0;
    trappedDropplets.forEach(airDropplet => {
        let neighbours = around(airDropplet);
        neighbours.forEach(neighbour => {
            if (cubes[id(neighbour)] !== undefined) {
                count ++;
            }
        });
    });
    return count;
};

const lavaDropplets = (file) => {
    return lines(file).reduce((cubes, line) => {
        let cube = parse(line);
        cubes[cube.id] = parse(line);
        return cubes;
    }, {});
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
const airTrappedDropplets = (cubes) => {
    let airTrappedCandidates = neighbours(cubes);
    let bounds = boundaries(airTrappedCandidates.map(candidate => candidate.position));
    let minimum = { x: bounds.minimum.x - 1, y: bounds.minimum.y - 1, z: bounds.minimum.z - 1  };
    let maximum = { x: bounds.maximum.x + 1, y: bounds.maximum.y + 1, z: bounds.maximum.z + 1  };
    let space = spaceAsHash({ minimum, maximum });
    Object.values(cubes).forEach(cube => {
        setWall(cube.id, space);
    });
    Object.keys(space).forEach(key => {
        space[key].value = 1;
    });
    let trappedDropplets = [];
    let request = { origin: { id: id(minimum) }};
    airTrappedCandidates.forEach(candidate => {
        request.target = { id: candidate.id };
        try {
            gps(request, space);
        }
        catch (error) {
            trappedDropplets.push(candidate.position);
        }
    });
    return trappedDropplets;
};

module.exports = {
    solve1, solve2,
    lavaDropplets, neighbours, airTrappedDropplets, touchingCount
};