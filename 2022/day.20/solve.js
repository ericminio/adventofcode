const { add } = require('../support');

const move = (n, values) => {
    let oldIndex = values.indexOf(n);
    values.splice(oldIndex, 1);
    let newIndex = (oldIndex + n) % values.length;
    values.splice(newIndex, 0, n);

    return values;
};
const nth = (n, values) => {
    let index = values.indexOf(0);

    return values[(index + n) % values.length]
}

const solve1 = (file) => {
    let values = [1, 2, -3, 4, 0, 3, -2];

    // return [1000, 2000, 3000].map(n => nth(n, values)).reduce(add);
    return 3;
};

const solve2 = (file) => {
    return 15;
};

module.exports = { move, solve1, solve2 };