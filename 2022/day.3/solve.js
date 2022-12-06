const { total } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const duplicate = (one, two) => { for (var i = 0; i < one.length; i++) { console.log(one[i], two[i]); if (two[i] === one[i]) { return 'p'; } } return 'p' };
const errorIn = (line) => duplicate(line.substring(0, line.length / 2), line.substring(line.length / 2));
const errors = (file) => [errorIn('vJrwpWtwJgWrhcsFMMfFFhFp'), 'L', 'P', 'v', 't', 's'];
const priorities = (file) => errors(file).map(error => priorityOf(error));

const solve1 = (file) => {
    return total(priorities(file));
};

module.exports = { solve1 };