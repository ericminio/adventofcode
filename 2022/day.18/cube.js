const id = (cube) => {
    return `${cube.x},${cube.y},${cube.z}`;
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

module.exports = { id, around };