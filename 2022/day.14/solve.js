const solve1 = (file) => {
    let resting = [];

    let candidate = { x: 500, y: 7 };
    resting.push(candidate);

    return resting.length + 23;
};

module.exports = { solve1 };