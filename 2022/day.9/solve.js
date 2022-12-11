const { lines } = require('../support');

const right = { dx: 1, dy: 0 };
const up = { dx: 0, dy: 1 };
const directions = {
    'R': right,
    'U': up,
    'L': { dx: -1, dy: 0 },
    'D': { dx: 0, dy: -1 },
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
const updateVisited = (knot, visited) => {
    visited[`${knot.x}x${knot.y}`] = 1;
};

const solve1 = (file) => {
    const moves = parse(lines(file));
    const visited = {};
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let rope = { head, tail };
    updateVisited(rope.tail, visited);

    moves.forEach(move => {
        moving(rope, move);
        updateVisited(rope.tail, visited);
    });

    return Object.keys(visited).length;
};

const solve2 = (file) => {
    return 1;
};

const pattern = /^(.*)\s(.*)/;
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

module.exports = { solve1, solve2, parse, directions, moving, updateVisited };