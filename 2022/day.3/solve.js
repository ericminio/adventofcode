const { total } = require('../support');

const adjust = (code) => code > 94 ? code - 96 : code - 64 + 26;
const priorityOf = (letter) => adjust(letter.charCodeAt(0));
const duplicateIn = (one, two) => { return one.filter(value => two.includes(value))[0] };
const errorIn = (line) => duplicateIn(line.substring(0, line.length / 2).split(''), line.substring(line.length / 2).split(''));
const errors = (file) => [errorIn('vJrwpWtwJgWrhcsFMMfFFhFp'), errorIn('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'), 'P', 'v', 't', 's'];
const priorities = (file) => errors(file).map(error => priorityOf(error));

const solve1 = (file) => {
    return total(priorities(file));
};

module.exports = { solve1 };