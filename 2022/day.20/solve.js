const { add, lines } = require('../support');
const { fingerPrints } = require('./finger-prints');
const { buildFrom, asArray, pushRight, pushLeft } = require('./linked-list');
const { pushCount } = require('./push-count');

const solve1 = (file) => {
    let input = lines(file).map(line => parseInt(line));
    let list = buildFrom(input);

    for (let i = 0; i < input.length; i++) {
        let value = input[i];
        let increment = value > 0 ? +1 : -1;
        let max = pushCount(value, input.length);
        for (let count = 0; count !== max; count += increment) {
            if (value > 0) { pushRight(list, i); } else { pushLeft(list, i); }
        }
    }
    let message = asArray(list);
    let total = fingerPrints(message).reduce(add);

    return total;
};

const solve2 = (file) => {
    return 15;
};


module.exports = { solve1, solve2 };