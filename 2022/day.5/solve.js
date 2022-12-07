const { groups, extractor } = require('../support');

const top = (stack) => stack[stack.length - 1];
const rearrange = (stacks, move) => {
    for (var i = 0; i < move.count; i++) {
        stacks[move.to].push(stacks[move.from].pop());
    }
    return stacks;
}

const solve1 = (file) => {
    let stacks = parseStacks(file);
    let moves = parseMoves(file);
    moves.forEach(move => { stacks = rearrange(stacks, move) });

    return stacks.map(top).join('');
};

const parseMoves = (file) => {
    const pattern = /^move\s(.*)\sfrom\s(.*)\sto\s(.*)$/;
    const moves = groups(file)[1].map(extractor(pattern)).map(builder)
    console.log(moves)
    return [
        { count: 1, from: 1, to: 0 },
        { count: 3, from: 0, to: 2 },
        { count: 2, from: 1, to: 0 },
        { count: 1, from: 0, to: 1 },
    ];
};
const parseStacks = (file) => {
    return [['Z', 'N'], ['M', 'C', 'D'], ['P']];
};


const builder = (data) => ({
    count: parseInt(data[0]),
    from: parseInt(data[1]) - 1,
    to: parseInt(data[2]) - 1,
});

module.exports = { solve1 };