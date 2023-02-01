const { parseMap } = require('./parse-map.js');
const { start } = require('./start.js');
const { parsePath } = require('./parse-path.js');

const id = (cell) => `${cell.row}x${cell.column}`;

const solve1 = (file) => {
    const map = parseMap(file);
    const path = parsePath(file);
    let current = start(map);
    let direction = { row: 0, column: 1 };

    path.forEach(command => {
        if (command.move) {
            let steps = command.move;
            for (let step = 0; step < steps; step ++) {
                let nextId = map[id(current)].neighbours[id(direction)];
                if (nextId !== undefined) {
                    current = map[nextId].location;
                }
                else {
                    break;
                }

            }
        }
        if (command.rotate) {
            direction = command.rotate(direction);
        }
    });

    return 1000 * current.row + 4 * current.column + score(direction);
};

const solve2 = () => {
    return 15;
};

const score = (direction) => {
    return 0;
};

module.exports = { solve1, solve2 };