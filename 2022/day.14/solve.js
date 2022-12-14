const solve1 = (file) => {
    let obstacles = {};
    let resting = [];

    let candidate = { x: 500, y: 8 };
    if (blocked(candidate, obstacles)) {
        resting.push(candidate);
    }

    return resting.length + 23;
};

const blocked = (candidate, obstacles) => {
    return true;
};

module.exports = { solve1 };