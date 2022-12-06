const { total } = require('../support');

const priorityOf = (letter) => letter.charCodeAt(0) - 96;
const priorities = (file) => [priorityOf('p'), 38, 42, 22, 20, 19];

const solve1 = (file) => {
    return total(priorities(file));
};

module.exports = { solve1 };