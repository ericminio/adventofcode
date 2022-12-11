const { lines } = require('../support');

/*.....
  .....
  ..T.H
  .....
  .....
*/
const dontMove = { dx: 0, dy: 0 };
const directions = {
    'R': { dx: 1, dy: 0 },
    'U': { dx: 0, dy: 1 },
    'L': { dx: -1, dy: 0 },
    'D': { dx: 0, dy: -1 },
};
const tailMove = (head, tail) => {
    return dontMove;
};
const moving = (rope, direction) => {
    movingKnot(rope.head, direction);
    const move = tailMove(rope.head, rope.tail);
    movingKnot(rope.tail, move);

    if (Math.abs(rope.head.y - rope.tail.y) > 1) {
        rope.tail.y += direction.dy;
        rope.tail.x = rope.head.x;
    }
    if (Math.abs(rope.head.x - rope.tail.x) > 1) {
        rope.tail.x += direction.dx;
        rope.tail.y = rope.head.y;
    }
};
const movingKnot = (knot, direction) => {
    knot.x += direction.dx;
    knot.y += direction.dy;
}
const updateVisited = (knot, visited) => {
    visited[`${knot.x}x${knot.y}`] = 1;
};

const solve1 = (file) => {
    const moves = parse(lines(file));
    const visited = {};
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let rope = { head, tail };
    updateVisited(tail, visited);

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
        const move = directions[data[1]];
        const steps = parseInt(data[2]);
        for (var count = 0; count < steps; count++) {
            moves.push(move);
        }
    }
    return moves;
};

module.exports = { solve1, solve2, parse, directions, moving, updateVisited };