const { groups, extractor } = require('../support');

const pattern = /^move\s(.*)\sfrom\s(.*)\sto\s(.*)$/;
const builder = (data) => ({
    count: parseInt(data[0]),
    from: parseInt(data[1]) - 1,
    to: parseInt(data[2]) - 1,
});
const parseMoves = (file) => groups(file)[1].map(extractor(pattern)).map(builder);
const parseStacks = (file) => {
    const initial = groups(file)[0]
        .map(line => line.match(/.{1,4}/g))
        .map(line => line.map(item => item.trim()));
    const size = initial[0].length;
    let stacks = [];
    for (var i = 0; i < size; i++) {
        let stack = [];
        for (var j = initial.length - 2; j >= 0; j--) {
            let crate = initial[j][i];
            if (crate.length > 0) {
                stack.push(crate.charAt(1));
            }
        }
        stacks.push(stack);
    }
    return stacks;
};

const top = (stack) => stack[stack.length - 1];
const moveOneByOne = (stacks, move) => {
    for (var i = 0; i < move.count; i++) {
        stacks[move.to].push(stacks[move.from].pop());
    }
    return stacks;
};
const moveInGroup = (stacks, move) => {
    let tmp = [];
    for (let i = 0; i < move.count; i++) {
        tmp.push(stacks[move.from].pop());
    }
    for (let i = 0; i < move.count; i++) {
        stacks[move.to].push(tmp.pop());
    }
    return stacks;
};

const solve1 = (file) => {
    let stacks = parseStacks(file);
    let moves = parseMoves(file);
    moves.forEach(move => {
        stacks = moveOneByOne(stacks, move);
    });

    return stacks.map(top).join('');
};
const solve2 = (file) => {
    let stacks = parseStacks(file);
    let moves = parseMoves(file);
    moves.forEach(move => {
        stacks = moveInGroup(stacks, move);
    });

    return stacks.map(top).join('');
};

module.exports = { solve1, solve2 };