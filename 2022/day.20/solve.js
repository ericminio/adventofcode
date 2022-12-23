const move = (n, values) => {
    let oldIndex = values.indexOf(n);
    values.splice(oldIndex, 1);
    let newIndex = (oldIndex + n) % values.length;
    values.splice(newIndex, 0, n);

    return values;
};

const solve1 = (file) => {
    return 42;
};

const solve2 = (file) => {
    return 15;
};

module.exports = { move, solve1, solve2 };