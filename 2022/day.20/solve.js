const { add, lines } = require('../support');

const solve1 = (file) => {
    let incoming = lines(file).map(line => parseInt(line));

    let input = [1, 2, -3, 0, 3, 4, -2];
    let index = input.indexOf(4);


    let output = [1, 2, -3, 4, 0, 3, -2];

    let zero = output.indexOf(0);
    return [1000, 2000, 3000].map(n => nthAfter(n, output, zero)).reduce(add);
};

const nthAfter = (n, values, start) => values[(n + start) % values.length];

module.exports = { solve1 };