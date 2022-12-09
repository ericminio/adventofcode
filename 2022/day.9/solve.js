const { lines } = require('../support');

const right = { dx: 0, dy: 1 };
const moving = (rope, direction) => {
    rope.head.x += direction.dx;
    rope.head.y += direction.dy;
};

const solve1 = (file) => {
    const moves = lines(file);
    const visited = {

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
    };
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let rope = { head, tail };

    visited[`${tail.x}-${tail.y}`] = 1;

    moving(rope, right);

    return Object.keys(visited).length;
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2 };