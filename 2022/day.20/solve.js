const { add, lines } = require('../support');
const { circularIndex } = require('../../lib/circular-index');
const { buildFromArray, asArray, pushRight, pushLeft } = require('../../lib/linked-list');

const solve1 = (file) => {
    let initial = lines(file).map(line => parseInt(line));
    let list = buildFromArray(initial);
    mix(initial, list);
    return checksum(list);
};

const solve2 = (file) => {
    let initial = lines(file).map(line => 811589153 * parseInt(line));
    let list = buildFromArray(initial);
    for (let i = 0; i < 10; i++) {
        mix(initial, list);
    }
    return checksum(list);
};

const checksum = (list) => {
    let message = asArray(list);
    let zero = message.indexOf(0);
    return [1000, 2000, 3000]
        .map(n => message[circularIndex(zero + n, message.length)])
        .reduce(add);
};
const mix = (initial, list) => {
    for (let i = 0; i < initial.length; i++) {
        let value = initial[i];
        let direction = Math.sign(value);
        let pushCount = value % (initial.length - 1);
        for (let count = 0; count !== pushCount; count += direction) {
            if (value > 0) { pushRight(list, i); } else { pushLeft(list, i); }
        }
    }
};

module.exports = { solve1, solve2 };