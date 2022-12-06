const { lines, total } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const duplicateIn = (one, two) => { return one.find(value => two.includes(value)) };
const errorIn = (line) => duplicateIn(line.substring(0, line.length / 2).split(''), line.substring(line.length / 2).split(''));
const errors = (file) => lines(file).map(line => errorIn(line));
const sackPriorities = (file) => errors(file).map(error => priorityOf(error));

const solve1 = (file) => {
    return total(sackPriorities(file));
};

const solve2 = (file) => {
    return total([priorityOf('r'), priorityOf('Z')]);
};

module.exports = { solve1, solve2 };