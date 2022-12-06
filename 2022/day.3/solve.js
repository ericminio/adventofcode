const { lines, total } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const duplicateInTwoSets = (one, two) => { return one.find(value => two.includes(value)) };
const errorIn = (line) => duplicateInTwoSets(line.substring(0, line.length / 2).split(''), line.substring(line.length / 2).split(''));
const errors = (file) => lines(file).map(line => errorIn(line));
const sackPriorities = (file) => errors(file).map(priorityOf);
const groupsOf = (file) => {
    const rows = lines(file);
    const groups = [];
    let group = [];
    for (var i = 0; i < rows.length; i++) {
        group.push(rows[i]);
        if (group.length == 3) {
            groups.push(group);
            group = [];
        }
    }
    return groups;
};
const duplicateInThreeSets = (one, two, three) => one.filter(value => two.includes(value)).find(value => three.includes(value));
const duplicateInGroup = (group) => duplicateInThreeSets(group[0].split(''), group[1].split(''), group[2].split(''));
const priorityOfGroup = (group) => priorityOf(duplicateInGroup(group));
const groupPriorities = (file) => groupsOf(file).map(priorityOfGroup);

const solve1 = (file) => {
    return total(sackPriorities(file));
};

const solve2 = (file) => {
    return total(groupPriorities(file));
};

module.exports = { solve1, solve2 };