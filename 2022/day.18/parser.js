const pattern = /(.*),(.*),(.*)/;

const parse = (line) => {
    let [ x, y, z ] = pattern.exec(line).splice(1);
    return { neighbours: around({ x: parseInt(x), y: parseInt(y), z: parseInt(z) }) };
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

module.exports = { parse };