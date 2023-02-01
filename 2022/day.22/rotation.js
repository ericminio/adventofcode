const turnLeft = (location) => {
    return { row: 0 * location.row - 1 * location.column, column: location.row };
};

module.exports = { turnLeft };