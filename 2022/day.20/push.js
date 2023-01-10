const { endIndex } = require('./end-index');
const { pushCount } = require('./push-count');

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

module.exports = { push };