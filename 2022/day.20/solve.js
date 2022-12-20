const { add, lines } = require('../support');

const solve1 = (file) => {
    let incoming = lines(file).map(line => parseInt(line));
    console.log(incoming)

    let values = [1, 2, -3, 4, 0, 3, -2];

    let zero = values.indexOf(0);
    return [1000, 2000, 3000].map(n => nthAfter(n, values, zero)).reduce(add);
};

const nthAfter = (n, values, start) => values[(n + start) % values.length];

module.exports = { solve1 };