const { add } = require('../support');

const nth = (n, values) => {
    let zero = values.indexOf(0);
    return values[(zero + n) % values.length];
};
const move = (n, mixed) => {
    if (n === 0) { return mixed; }

    const size = mixed.length;
    const index = (i, size) => {
        let inRange = i % size;
        return inRange < 0 ? size + inRange : inRange;
    };
    const chain = {
        0: { value: mixed[0] }
    };
    for (var i = 1; i < mixed.length; i++) {
        chain[i] = {
            value: mixed[i],
            previous: chain[i - 1],
        };
        chain[i - 1].next = chain[i];
    }
    chain[mixed.length - 1].next = chain[0];
    chain[0].previous = chain[mixed.length - 1];

    let start = mixed.indexOf(n);
    if (n > 0) {
        for (var i = 0; i < n; i++) {
            let before = index(start + i - 1, size);
            let after = index(start + i + 1, size);
            let current = start + i;
            chain[before].next = chain[after];
            chain[after].previous = chain[before];
            chain[current].before = chain[after];
            chain[current].next = chain[after].next;
            chain[after].next = chain[current];
        }
    }

    let result = Object.values(chain).map(c => c.value);
    console.log(result);

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