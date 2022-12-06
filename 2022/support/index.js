const fs = require('fs');
const input = (file) => fs.readFileSync(file).toString();

const groups = (file) => input(file).split(/\n\n/).map(items => items.split('\n'));
const numberOrZero = (item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item));
const groupsOfNumbers = (file) => groups(file).map(items => items.map(item => numberOrZero(item)));
const total = (array) => array.reduce((acc, current) => acc += current, 0);
const orderDescending = (array) => { array.sort((a, b) => b - a); }

const lines = (file) => input(file).split(/\n/);
const rounds = (file) => lines(file).map(line => ({ opponent:line.charAt(0), me:line.charAt(1) }));

module.exports = {
    groupsOfNumbers,
    total,
    orderDescending,

    rounds,
};