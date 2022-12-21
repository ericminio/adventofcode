const { add, lines } = require('../support');

const solve1 = (file) => {
    let incoming = lines(file).map(line => parseInt(line));

    let input = [1, 2, -3, 0, 3, 4, -2];

    let value = 4;
    let oldIndex = input.indexOf(value);
    let newIndex = (oldIndex + value + 1) % input.length;
    input.splice(oldIndex, 1);
    input.splice(newIndex, 0, value);

    let output = input;

    let zero = output.indexOf(0);
    return [1000, 2000, 3000].map(n => nthAfter(n, output, zero)).reduce(add);
};

const nthAfter = (n, values, start) => values[(n + start) % values.length];

module.exports = { solve1 };