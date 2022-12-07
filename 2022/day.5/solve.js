const first = (stack) => stack[0];
const rearrange = (stacks, move) => [['C'], ['M'], ['Z', 'N', 'D', 'P']];

const solve1 = (file) => {
    let current = [['M', 'C'], [], ['Z', 'N', 'D', 'P']];
    let next = rearrange(current, { count: 1, from: 0, to: 1 });
    return next.map(first).join('');
};

module.exports = { solve1 };