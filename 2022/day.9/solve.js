const { lines } = require('../support');

const dontMove = { dx: 0, dy: 0 };
const nextMove = {
    '2x0': { dx: 1, dy: 0 },
    '0x2': { dx: 0, dy: 1 },
    '-2x0': { dx: -1, dy: 0 },
    '0x-2': { dx: 0, dy: -1 },

    '1x2': { dx: 1, dy: 1 },
    '2x1': { dx: 1, dy: 1 },

    '2x-1': { dx: 1, dy: -1 },
    '1x-2': { dx: 1, dy: -1 },

    '-2x-1': { dx: -1, dy: -1 },
    '-1x-2': { dx: -1, dy: -1 },

    '-2x1': { dx: -1, dy: 1 },
    '-1x2': { dx: -1, dy: 1 },

    '2x2': { dx: 1, dy: 1 },
    '2x-2': { dx: 1, dy: -1 },
    '-2x-2': { dx: -1, dy: -1 },
    '-2x2': { dx: -1, dy: 1 },
};
const relative = (head, tail) => `${head.x - tail.x}x${head.y - tail.y}`;
const tailMove = (head, tail) => {
    if (shouldMove(tail, head)) {
        const call = relative(head, tail);
        return nextMove[call];
    }
    return dontMove;
};
const shouldMove = (tail, head) => {
    return Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;
}
const moving = (knot, direction) => {
    knot.x += direction.dx;
    knot.y += direction.dy;
}
const updateVisited = (knot, visited) => {
    visited[`${knot.x}x${knot.y}`] = 1;
};
const swing = (knots, moves) => {
    const visited = {};
    let tail = knots[knots.length - 1];
    updateVisited(tail, visited);
    moves.forEach(initial => {
        let move = initial;
        for (var i = 0; i < knots.length - 1; i++) {
            let knot = knots[i];
            moving(knot, move);
            move = tailMove(knot, knots[i + 1]);
        }
        moving(tail, move);
        updateVisited(tail, visited);
    });
    return visited;
};
const rope = ({ size }) => {
    const knots = [];
    for (var i = 0; i < size; i++) {
        knots.push({ x: 0, y: 0 })
    }
    return knots
}

const solve1 = (file) => {
    const moves = parse(lines(file));
    const knots = rope({ size: 2 });
    const visited = swing(knots, moves);

    return Object.keys(visited).length;
};

const solve2 = (file) => {
    const moves = parse(lines(file));
    const knots = rope({ size: 10 });
    const visited = swing(knots, moves);

    return Object.keys(visited).length;
};

const pattern = /^(.*)\s(.*)/;
const directions = {
    'R': { dx: 1, dy: 0 },
    'U': { dx: 0, dy: 1 },
    'L': { dx: -1, dy: 0 },
    'D': { dx: 0, dy: -1 },
};
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

module.exports = { solve1, solve2, parse, directions, updateVisited };