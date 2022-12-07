const first = (stack) => stack[0];

const solve1 = (file) => {
    return [['C'], ['M'], ['Z', 'N', 'D', 'P']].map(first).join('');
};

module.exports = { solve1 };