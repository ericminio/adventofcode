const { add, lines, groupsOf } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));

const duplicateInTwoSets = (one, two) => {
    return one.find(value => two.includes(value));
};
const errorIn = (line) => duplicateInTwoSets(line.substring(0, line.length / 2).split(''), line.substring(line.length / 2).split(''));
const errors = (file) => lines(file).map(line => errorIn(line));
const sackPriorities = (file) => errors(file).map(priorityOf);

const duplicateInThreeSets = (one, two, three) => one.filter(value => two.includes(value)).find(value => three.includes(value));
const duplicateInGroup = (group) => duplicateInThreeSets(group[0].split(''), group[1].split(''), group[2].split(''));
const priorityOfGroup = (group) => priorityOf(duplicateInGroup(group));
const groupPriorities = (file) => groupsOf(3, file).map(priorityOfGroup);

const solve1 = (file) => {
    return sackPriorities(file).reduce(add);
};

const solve2 = (file) => {
    return groupPriorities(file).reduce(add);
};

module.exports = { solve1, solve2 };