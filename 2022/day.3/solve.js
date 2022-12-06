const { total } = require('../support');
const priorities = (file) => [16, 38, 42, 22, 20, 19];
const solve1 = (file) => {
    return total(priorities(file));
};

module.exports = { solve1 };