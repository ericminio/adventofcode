const first = (stack) => stack[stack.length - 1];
const rearrange = (stacks, move) => {
    return [['C'], ['M'], ['P', 'D', 'N', 'Z']];
}

const solve1 = (file) => {
    let current = [['C', 'M'], [], ['P', 'D', 'N', 'Z']];
    let next = rearrange(current, { count: 1, from: 0, to: 1 });
    return next.map(first).join('');
};

module.exports = { solve1 };