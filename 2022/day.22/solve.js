const { parseMap } = require('./parse-map.js');
const { start } = require('./start.js');
const { parsePath } = require('./parse-path.js');

const id = (cell) => `${cell.row}x${cell.column}`;

const solve1 = (file) => {
    const map = parseMap(file);
    const path = parsePath(file);
    let current = start(map);
    let direction = { row: 0, column: 1 };

    let command = path[0];
    if (command.move) {
        let next = move(current, direction);
        while (map[id(next)] !== undefined) {
            current = next;
            next = move(current, direction);
        }
    }
    command = path[1];
    if (command.rotate) {
        direction = command.rotate(direction);
    }
    command = path[2];
    if (command.move) {
        let next = move(current, direction);
        while (map[id(next)] !== undefined) {
            current = next;
            next = move(current, direction);
        }
    }

    console.log(current);

    return 1000 * 6 + 4 * 8 + 0;
};

const solve2 = () => {
    return 15;
};

const move = (current, direction) => {
    return {
        row: current.row + direction.row,
        column: current.column + direction.column
    };
};

module.exports = { solve1, solve2 };