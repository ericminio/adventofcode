const { ascending, add } = require('../support/index.js');

const start = (map) => {
    const first = Object.values(map)
        .filter(cell => cell.location.row == 1)
        .map(cell => cell.location.column)
        .sort(ascending)
        .slice(0, 1)
        .reduce(add);

    return { row: 1, column: first };
};

module.exports = { start };