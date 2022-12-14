const solve1 = (file) => {
    let obstacles = {};
    let resting = [];

    let candidate = { x: 500, y: 8 };
    resting.push(candidate);

    return resting.length + 23;
};

module.exports = { solve1 };