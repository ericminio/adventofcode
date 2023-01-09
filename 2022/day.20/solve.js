const { add, lines } = require('../support');

const move = (n, values) => {
    let oldIndex = values.indexOf(n);
    values.splice(oldIndex, 1);
    let newIndex = (oldIndex + n) % values.length;
    values.splice(newIndex, 0, n);

    return values;
};
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
    let offset = pushCount(value, message);
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

    return [1000, 2000, 3000].map(n => nth(n, message)).reduce(add);
};

const solve2 = (file) => {
    return 15;
};

const circularIndex = (index, list) => ((index % list.length) + list.length) % list.length;
const nth = (n, list) => list[circularIndex(list.indexOf(0) + n, list)];
const pushCount = (n, list) => n % (list.length - 1);
const endIndex = (start, offset, list) => {
    let end = (start + offset) % (list.length - 1);

    return end;
}

module.exports = { move, nth, circularIndex, pushCount, endIndex, solve1, solve2 };