const spaceAsHash = ({ minimum, maximum, isWall }) => {
    const isWallDefaultingToNo = isWall || (() => false);
    const map = {};

    map['0x0x0'] = { neighbours: [ '1x0x0', '0x1x0', '0x0x1' ] };

    for (let x = minimum.x; x <= maximum.x; x++) {
        for (let y = minimum.y; y <= maximum.y; y++) {
            for (let z = minimum.z; z <= maximum.z; z++) {
                const cell = id(x, y, z);
                if (! isWallDefaultingToNo(cell)) {
                    map[cell] = { id: cell, position: { x, y, z }, neighbours: [] };
                    const neighbours = [];
                    if (x < maximum.x - 1) {
                        neighbours.push(id(x + 1, y, z));
                    }
                    if (x > 0) {
                        neighbours.push(id(x - 1, y, z));
                    }
                    if (y < maximum.y - 1) {
                        neighbours.push(id(x, y + 1, z));
                    }
                    if (y > 0) {
                        neighbours.push(id(x, y - 1, z));
                    }
                    if (z < maximum.z - 1) {
                        neighbours.push(id(x, y, z + 1));
                    }
                    if (z > 0) {
                        neighbours.push(id(x, y, z - 1));
                    }
                    map[cell].neighbours = neighbours.filter(id => !isWallDefaultingToNo(id));
                }
            }
        }
    }

    return map;
};
const id = (x, y, z) => {
    return `${x}x${y}x${z}`;
};

module.exports = { spaceAsHash };