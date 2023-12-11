import { east, west } from './around.js';

export const connected = (around, maze) =>
    around.filter((candidate) => {
        if (candidate.direction === east) {
            return ['-', '7', 'J'].includes(maze[candidate.id].value);
        }
        if (candidate.direction === west) {
            return ['-'].includes(maze[candidate.id].value);
        }
        return false;
    });
