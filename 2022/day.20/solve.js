const { add, lines } = require('../support');

const move = (n, values) => {
    let oldIndex = values.indexOf(n);
    values.splice(oldIndex, 1);
    let newIndex = (oldIndex + n) % values.length;
    values.splice(newIndex, 0, n);

    return values;
};
const nth = (n, values) => {
    let index = values.indexOf(0);

    return values[(index + n) % values.length]
};
const decrypt = (file) => {
    let input = lines(file).map(line => parseInt(line));
    let message = input.slice();

    for (let i = 0; i < input.length; i++) {
        message = move(input[i], message);
    }
    return message;
};

const solve1 = (file) => {
    let message = decrypt(file);

    return [1000, 2000, 3000].map(n => nth(n, message)).reduce(add);
};

const solve2 = (file) => {
    return 15;
};

const circularIndex = (index, list) => 0

module.exports = { move, nth, circularIndex, solve1, solve2 };