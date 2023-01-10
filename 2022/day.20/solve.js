const { add, lines } = require('../support');
const { circularIndex } = require('../support/circular-index');
const { buildFromArray, asArray, pushRight, pushLeft } = require('../../lib/linked-list');

const solve1 = (file) => {
    let input = lines(file).map(line => parseInt(line));

    let list = buildFromArray(input);
    mix(input, list);

    let message = asArray(list);
    let total = fingerPrints(message).reduce(add);

    return total;
};

const solve2 = (file) => {
    let input = lines(file).map(line => 811589153 * parseInt(line));

    let list = buildFromArray(input);
    for (let i = 0; i < 10; i++) {
        mix(input, list);
    }

    let message = asArray(list);
    let total = fingerPrints(message).reduce(add);

    return total;
};

const fingerPrints = (message) => {
    let zero = message.indexOf(0);
    return [1000, 2000, 3000].map(n => message[circularIndex(zero + n, message.length)]);
};
const mix = (input, list) => {
    for (let i = 0; i < input.length; i++) {
        let value = input[i];
        let increment = value > 0 ? +1 : -1;
        let max = value % (input.length - 1);
        for (let count = 0; count !== max; count += increment) {
            if (value > 0) { pushRight(list, i); } else { pushLeft(list, i); }
        }
    }
};


module.exports = { solve1, solve2 };