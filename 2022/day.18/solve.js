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
    let neighbours = Object.values(cubes)
        .reduce((neighbours, cube) => {
            cube.neighbours.forEach(neighbour => {
                neighbours[id(neighbour)] = { id: id(neighbour), neighbours: around(neighbour) };
            });
            return neighbours;
        }, {});

    let candidates = Object.values(neighbours).filter(candidate => cubes[candidate.id] === undefined);

    let total = 0;
    Object.values(neighbours).forEach(candidate => {
        let trapped = true;
        candidate.neighbours.forEach(neighbour => {
            // if (candidate.id === '2,2,2') {
            //     console.log(neighbour, cubes[id(neighbour)]);
            // }
            if (cubes[id(neighbour)] === undefined) {
                trapped = false;
            }
        });
        if (trapped) {
            // console.log(candidate.id);
            total ++;
        }
    });
    console.log(total);

    return 58;
};

module.exports = { solve1, solve2 };