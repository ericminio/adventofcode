const { total } = require('../support');

const adjust = (code) => code - 96;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const priorities = (file) => [priorityOf('p'), 38, 42, priorityOf('v'), priorityOf('t'), priorityOf('s')];

const solve1 = (file) => {
    return total(priorities(file));
};

module.exports = { solve1 };