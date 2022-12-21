const { add, lines } = require('../support');

const solve1 = (file) => {
    let incoming = lines(file).map(line => parseInt(line));

    let input = [1, 2, -3, 0, 3, 4, -2];
    input = [
        { index: 0, value: 1 },
        { index: 1, value: 2 },
        { index: 2, value: -3 },
        { index: 3, value: 0 },
        { index: 4, value: 3 },
        { index: 5, value: 4 },
        { index: 6, value: -2 },
    ]
    let oldIndex = input.find(item => item.value === 4).index;
    let newIndex = (oldIndex + 4) % input.length;
    console.log(oldIndex, newIndex);

    let output = [1, 2, -3, 4, 0, 3, -2];

    let zero = output.indexOf(0);
    return [1000, 2000, 3000].map(n => nthAfter(n, output, zero)).reduce(add);
};

const nthAfter = (n, values, start) => values[(n + start) % values.length];

module.exports = { solve1 };