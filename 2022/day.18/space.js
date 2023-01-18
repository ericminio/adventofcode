const spaceAsHash = ({ minimum, maximum }) => {
    let map = {};

    map['0x0x0'] = { neighbours: [ '1x0x0', '0x1x0', '0x0x1' ] };

    for (var x = minimum.x; x <= maximum.x; x++) {
        for (var y = minimum.y; y <= maximum.y; y++) {
            for (var z = minimum.z; z <= maximum.z; z++) {
                let cell = id(x, y, z);
                map[cell] = { id: cell, position: { x, y, z }, neighbours: [] };
                if (x < maximum.x - 1) {
                    map[cell].neighbours.push(id(x + 1, y, z));
                }
                if (x > 0) {
                    map[cell].neighbours.push(id(x - 1, y, z));
                }
                if (y < maximum.y - 1) {
                    map[cell].neighbours.push(id(x, y + 1, z));
                }
                if (y > 0) {
                    map[cell].neighbours.push(id(x, y - 1, z));
                }
                if (z < maximum.z - 1) {
                    map[cell].neighbours.push(id(x, y, z + 1));
                }
                if (z > 0) {
                    map[cell].neighbours.push(id(x, y, z - 1));
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