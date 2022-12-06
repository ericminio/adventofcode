const { lines, total } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const duplicateInTwoSets = (one, two) => { return one.find(value => two.includes(value)) };
const errorIn = (line) => duplicateInTwoSets(line.substring(0, line.length / 2).split(''), line.substring(line.length / 2).split(''));
const errors = (file) => lines(file).map(line => errorIn(line));
const sackPriorities = (file) => errors(file).map(error => priorityOf(error));
const groupsOf = (file) => [1, 2];
const priorityOfGroup = (group) => { if (group === 1) { return priorityOf('r'); } return priorityOf('Z'); }
const groupPriorities = (file) => groupsOf(file).map((group) => priorityOfGroup(group));

const solve1 = (file) => {
    return total(sackPriorities(file));
};

const solve2 = (file) => {
    return total(groupPriorities(file));
};

module.exports = { solve1, solve2 };