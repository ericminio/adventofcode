const turnLeft = (location) => {
    return { row: -location.column, column: location.row };
};

module.exports = { turnLeft };