import { id } from '../../../support/index.js';

export const parse = (lines) => {
    const maze = { width: lines[0].length, height: lines.length };

    lines.forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            const value = line[x];
            const position = { x, y };
            const positionId = id(position);
            maze[positionId] = { ...position, id: positionId, value };
        }
    });

    return maze;
};
