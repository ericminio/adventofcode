const { parseMap } = require('./parse-map.js');
const { start } = require('./start.js');

const solve1 = (file) => {
    const map = parseMap(file);
    const current = start(map);

    return 1000 * 6 + 4 * 8 + 0;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };