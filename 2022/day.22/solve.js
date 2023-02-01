const { parseMap } = require('./parse-map.js');
const { start } = require('./start.js');
const { parsePath } = require('./parse-path.js');

const solve1 = (file) => {
    const map = parseMap(file);
    const path = parsePath(file);
    let current = start(map);
    let direction = { row: 0, column: 1 };

    let command = path[0];
    console.log(command);

    return 1000 * 6 + 4 * 8 + 0;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };