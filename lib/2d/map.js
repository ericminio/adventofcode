const mapAsHash = (options) => {
    let map = {};

    for (var row = 0; row < options.row; row++) {
        for (var column = 0; column < options.column; column++) {
            let cell = id(row, column);
            map[cell]= { neighbours: [] };
            if (column < options.column - 1) {
                map[cell].neighbours.push(id(row, column+1))
            }
            if (row < options.row - 1) {
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

    return map;   
}

const id = (row, column) => {
    return `${row}x${column}`;
}

module.exports = { mapAsHash };