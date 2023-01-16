const { id } = require('./cube');

const exposed = (cubes) => {
    let cubeCount = Object.keys(cubes).length;

    return cubeCount * 6 - touching(cubes) ;
};

const touching = (cubes) => {
    let total = 0;

    Object.values(cubes).forEach(cube => {
        cube.neighbours.forEach(neighbour => {
            if (cubes[id(neighbour)] !== undefined) {
                total ++;
            }
        });
    });

    return total;
};

module.exports = { exposed };