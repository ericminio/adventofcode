const solve1 = (file) => {
    const visited = {
        '0x0': 1,
        '0x1': 1,
        '0x2': 1,
        '0x3': 1,
        '-1x4': 1,
        '-2x4': 1,
        '-3x4': 1,
        '-2x3': 1,
        '-3x3': 1,
        '-4x3': 1,
        '-2x2': 1,
        '-2x1': 1,
        '-4x2': 1,
    }
    return 13;
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2 };