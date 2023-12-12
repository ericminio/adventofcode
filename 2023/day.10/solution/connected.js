import { east, north, south, west } from './around.js';

export const connected = (around, maze) =>
    around.filter((candidate) => {
        if (candidate.direction === east) {
            return ['-', '7', 'J'].includes(maze[candidate.id].value);
        }
        if (candidate.direction === west) {
            return ['-', 'F', 'L'].includes(maze[candidate.id].value);
        }
        if (candidate.direction === south) {
            return ['|', 'L', 'J'].includes(maze[candidate.id].value);
        }
        if (candidate.direction === north) {
            return ['|', 'F', '7'].includes(maze[candidate.id].value);
        }
        return false;
    });
