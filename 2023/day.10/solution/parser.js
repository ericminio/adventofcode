import { id } from '../../../support/index.js';

export const parse = (lines) => {
    const maze = {};

    lines.forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            const value = line[x];
            const position = { x, y };
            maze[id(position)] = { ...position, value };
        }
    });

    return maze;
};
