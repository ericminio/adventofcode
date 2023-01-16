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

const around = (cube) => {
    return [
        { x: cube.x + 1, y: cube.y, z: cube.z },
        { x: cube.x - 1, y: cube.y, z: cube.z },
        { x: cube.x, y: cube.y + 1, z: cube.z },
        { x: cube.x, y: cube.y - 1, z: cube.z },
        { x: cube.x, y: cube.y, z: cube.z + 1 },
        { x: cube.x, y: cube.y, z: cube.z - 1 },
    ];
};
const id = (cube) => {
    return `${cube.x},${cube.y},${cube.z}`;
};

module.exports = { exposed, around };