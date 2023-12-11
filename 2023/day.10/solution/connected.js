import { east } from './around.js';

export const connected = (around, origin, maze) =>
    around.filter((candidate) => {
        if (candidate.direction === east) {
            return ['-'].includes(maze[candidate.id].value);
        }
        return false;
    });
