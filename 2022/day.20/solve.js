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
            let after2 = index(start + i + 2, size);
            let current = index(start + i, size);
            chain[before].next = chain[after];
            chain[after].previous = chain[before];
            chain[current].previous = chain[after];
            chain[current].next = chain[after].next;
            chain[after].next = chain[current];
            chain[after2].previous = chain[current];
        }
    }

    console.log(chain);

    let first = chain[0];
    let result = [first.value];
    let current = first.next;
    while (current.value !== first.value) {
        result.push(current.value);
        current = current.next;
    }
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