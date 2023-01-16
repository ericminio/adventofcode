const { expect } = require('chai');

describe.only('parser', () => {

    it('works', () => {
        expect(parse('1,2,3')).to.deep.equal({
            neighbours: [
                { x: 2, y: 2, z: 3 },
                { x: 0, y: 2, z: 3 },
                { x: 1, y: 3, z: 3 },
                { x: 1, y: 1, z: 3 },
                { x: 1, y: 2, z: 4 },
                { x: 1, y: 2, z: 2 },
            ]
        });
    });
});

let pattern = /(.*),(.*),(.*)/;
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