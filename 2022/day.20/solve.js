const { add, lines } = require('../support');
const { circularIndex } = require('../support/circular-index');
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
const endIndex = (start, offset, list) => {
    let end = (start + offset) % (list.length - 1);
    if (end < 0) {
        end = circularIndex(end - 1, list.length);
    }
    return end;
};

const solve1 = (file) => {
    let message = decrypt(file);

    return fingerPrints(message).reduce(add);
};

const solve2 = (file) => {
    return 15;
};


module.exports = { endIndex, solve1, solve2 };