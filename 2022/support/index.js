const fs = require('fs');
const input = (file) => fs.readFileSync(file).toString();
const lines = (file) => input(file).split(/\n/);
const groups = (file) => input(file).split(/\n\n/).map(items => items.split('\n'));
const groupsOf = (size, file) => {
    const rows = lines(file);
    const groups = [];
    let group = [];
    for (var i = 0; i < rows.length; i++) {
        group.push(rows[i]);
        if (group.length == size) {
            groups.push(group);
            group = [];
        }
    }
    return groups;
};
const numberOrZero = (item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item));
const groupsOfNumbers = (file) => groups(file).map(items => items.map(item => numberOrZero(item)));
const total = (array) => array.reduce((acc, current) => acc += current, 0);
const orderDescending = (array) => { array.sort((a, b) => b - a); }

const parseForNumbers = (line, pattern) => pattern.exec(line).splice(1).map(item => parseInt(item));

module.exports = {
    lines,
    groupsOf,
    groupsOfNumbers,
    total,
    orderDescending,
    parseForNumbers,
};