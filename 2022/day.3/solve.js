const { total } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const priorities = (file) => [priorityOf('p'), priorityOf('L'), 42, priorityOf('v'), priorityOf('t'), priorityOf('s')];

const solve1 = (file) => {
    return total(priorities(file));
};

module.exports = { solve1 };