const mapAsHash = (options) => {
    let map = {};

    for (var row = 0; row < options.height; row++) {
        for (var column = 0; column < options.width; column++) {
            let cell = id(row, column);
            map[cell]= { neighbours: [] };
            if (column < options.width - 1) {
                map[cell].neighbours.push(id(row, column+1))
            }
            if (row < options.height - 1) {
                map[cell].neighbours.push(id(row+1, column))
            }
            if (column > 0) {
                map[cell].neighbours.push(id(row, column-1))
            }
            if (row > 0) {
                map[cell].neighbours.push(id(row-1, column))
            }
        }
    }
    map.size = {
        width: options.width,
        height: options.height
    };

    return map;   
}

const id = (row, column) => {
    return `${row}x${column}`;
}

module.exports = { mapAsHash, id };