import { east, north, south, west } from './around.js';

export const connected = (around, origin, maze) =>
    around.filter((candidate) => {
        if (candidate.direction === east) {
            return (
                ['-', '7', 'J'].includes(maze[candidate.id].value) &&
                ['S', '-', 'L', 'F'].includes(maze[origin.id].value)
            );
        }
        if (candidate.direction === west) {
            return (
                ['-', 'F', 'L'].includes(maze[candidate.id].value) &&
                ['S', '-', '7', 'J'].includes(maze[origin.id].value)
            );
        }
        if (candidate.direction === south) {
            return (
                ['|', 'L', 'J'].includes(maze[candidate.id].value) &&
                ['S', '|', '7', 'F'].includes(maze[origin.id].value)
            );
        }
        if (candidate.direction === north) {
            return (
                ['|', 'F', '7'].includes(maze[candidate.id].value) &&
                ['S', '|', 'L', 'J'].includes(maze[origin.id].value)
            );
        }
        return false;
    });
