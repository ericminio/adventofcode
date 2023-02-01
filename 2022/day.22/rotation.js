const turnLeft = (location) => {
    return { row: 0 * location.row - 1 * location.column, column: 1 * location.row + 0 * location.column };
};

const turnRight = (location) => {
    return { row: 0 * location.row + 1 * location.column, column: -1 * location.row + 0 * location.column };
};

module.exports = { turnLeft, turnRight };