const { add, lines } = require('../support');
const { endIndex } = require('./end-index');
const { fingerPrints } = require('./finger-prints');
const { pushCount } = require('./push-count');

const decrypt = (file) => {
    let input = lines(file).map(line => parseInt(line));
    let message = input.slice();

    for (let i = 0; i < input.length; i++) {
        push(i, input, message);
    }
    return message;
};
const push = (start, initial, message) => {
    let value = initial[start];
    let offset = pushCount(value, message.length);
    let end = endIndex(start, offset, message)
    let direction = Math.sign(end - start);
    for (let position = start; position !== end; position += direction) {
        [message[position], message[position + direction]] = [
            message[position + direction], message[position]
        ];
    }
};

const solve1 = (file) => {
    let message = decrypt(file);

    return fingerPrints(message).reduce(add);
};

const solve2 = (file) => {
    return 15;
};


module.exports = { solve1, solve2 };