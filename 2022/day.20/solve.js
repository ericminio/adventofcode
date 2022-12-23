const { add } = require('../support');

const nth = (n, values) => {
    let zero = values.indexOf(0);
    return values[(zero + n) % values.length];
};
const move = (n, mixed) => {
    if (n === 0) { return mixed; }

    const chain = {};
    for (var i = 0; i < mixed.length; i++) {
        let node = { value: mixed[i] }
    }

    let size = mixed.length;
    let oldIndex = mixed.indexOf(n);
    let newIndex = (oldIndex + n) % size;
    mixed.splice(oldIndex, 1);
    mixed.splice(newIndex, 0, n);

    return mixed;
};
const solve1 = (file) => {
    let mixed = [1, 2, -3, 0, 3, 4, -2];
    mixed = move(4, mixed);

    return [1000, 2000, 3000].map(n => nth(n, mixed)).reduce(add);
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2, nth, move };