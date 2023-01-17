const mapAsHash = ({ height, width }) => {
    let map = {};

    for (var row = 0; row < height; row++) {
        for (var column = 0; column < width; column++) {
            let cell = id(row, column);
            map[cell] = { id: cell, neighbours: [] };
            if (column < width - 1) {
                map[cell].neighbours.push(id(row, column + 1));
            }
            if (row < height - 1) {
                map[cell].neighbours.push(id(row + 1, column));
            }
            if (column > 0) {
                map[cell].neighbours.push(id(row, column - 1));
            }
            if (row > 0) {
                map[cell].neighbours.push(id(row - 1, column));
            }
        }
    }
    map.size = {
        width: width,
        height: height
    };

    return map;
};

const id = (row, column) => {
    return `${row}x${column}`;
};

module.exports = { mapAsHash, id };