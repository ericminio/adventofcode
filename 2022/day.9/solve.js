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
        rope.tail.x = rope.head.x;
    }
    if (Math.abs(rope.head.x - rope.tail.x) > 1) {
        rope.tail.x += direction.dx;
        rope.tail.y = rope.head.y;
    }
};
const updateVisited = (rope, visited) => {
    visited[`${rope.tail.x}x${rope.tail.y}`] = 1;
};

const solve1 = (file) => {
    const moves = parse(lines(file));
    const visited = {};
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let rope = { head, tail };
    updateVisited(rope, visited);

    moves.forEach(move => {
        moving(rope, move);
        updateVisited(rope, visited);
    });

    return Object.keys(visited).length;
};

const solve2 = (file) => {
    return 1;
};

module.exports = { solve1, solve2, parse, right, up, moving, updateVisited };