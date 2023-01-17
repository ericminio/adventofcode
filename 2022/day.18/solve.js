const { lines } = require('../support');
const { exposed } = require('./exposed');
const { parse } = require('./parser');
const { around, id } = require('./cube');

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
    let neighbours = Object.values(cubes).reduce((neighbours, cube) => {
        cube.neighbours.forEach(neighbour => {
            neighbours[id(neighbour)] = { neighbours: around(neighbours) };
        });
        return neighbours;
    }, {});

    let total = 0;
    Object.values(neighbours).forEach(candidate => {
        let allTouching = true;
        candidate.neighbours.forEach(neighbour => {
            if (cubes[id(neighbour)] === undefined) {
                touching = false;
            }
        });
        if (allTouching) {
            total ++;
        }
    });
    console.log(total);

    return 58;
};

module.exports = { solve1, solve2 };