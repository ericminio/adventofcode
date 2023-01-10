const { add, lines } = require('../support');
const { fingerPrints } = require('./finger-prints');
const { push } = require('./push');

const decrypt = (file) => {
    let input = lines(file).map(line => parseInt(line));
    let message = input.slice();

    for (let i = 0; i < input.length; i++) {
        push(i, input, message);
    }
    return message;
};

const solve1 = (file) => {
    let message = decrypt(file);

    return fingerPrints(message).reduce(add);
};

const solve2 = (file) => {
    return 15;
};


module.exports = { solve1, solve2 };