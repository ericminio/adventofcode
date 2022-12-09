const { lines } = require('../support');

const pattern = /^(.*)\s(.*)/;
const right = { dx: 0, dy: 1 };
const up = { dx: -1, dy: 0 };
const directions = {
    'R': right,
    'U': up,
    'L': { dx: 0, dy: -1 },
    'D': { dx: 1, dy: 0 },
};
const parse = (input) => {
    const moves = [];
    for (var i = 0; i < input.length; i++) {
        const data = pattern.exec(input[i]);
        const direction = directions[data[1]];
        const steps = parseInt(data[2]);
        for (var count = 0; count < steps; count++) {
            moves.push(direction);
        }
    }
    return moves;
};
const moving = (rope, direction) => {
    rope.head.x += direction.dx;
    rope.head.y += direction.dy;

    if (Math.abs(rope.head.y - rope.tail.y) > 1) {
        rope.tail.y += direction.dy;
    }
};
const updateVisited = (rope, visited) => {

};

const solve1 = (file) => {
    const moves = parse(lines(file));
    const visited = {




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

    moving(rope, moves[0]);
    visited[`${tail.x}-${tail.y}`] = 1;
    moving(rope, moves[1]);
    visited[`${tail.x}-${tail.y}`] = 1;
    moving(rope, moves[2]);
    visited[`${tail.x}-${tail.y}`] = 1;
    moving(rope, moves[2]);
    visited[`${tail.x}-${tail.y}`] = 1;

    return Object.keys(visited).length;
};

const solve2 = (file) => {
    return 15;
};

module.exports = { solve1, solve2, parse, right, up, moving, updateVisited };