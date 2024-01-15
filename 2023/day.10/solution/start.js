import { directions } from './around.js';

export const start = (maze) => Object.values(maze).find((p) => p.value === 'S');

export const decodeStart = (loop, startId) => {
    const start = loop[startId];
    const before = loop[loop[startId].previous];
    const after = loop[loop[startId].next];
    const moves = move(start, before, after).sort().toString();
    if (moves === 'east,south') {
        return 'F';
    }
    if (moves === 'east,west') {
        return '-';
    }
    if (moves === 'east,north') {
        return 'L';
    }
    if (moves === 'nort,west') {
        return 'J';
    }
    if (moves === 'nort,south') {
        return '|';
    }
    if (moves === 'south,west') {
        return '7';
    }
};

const move = (start, before, after) => {
    return [
        directions.find(
            (direction) =>
                direction.dx === before.x - start.x &&
                direction.dy === before.y - start.y,
        ).name,
        directions.find(
            (direction) =>
                direction.dx === after.x - start.x &&
                direction.dy === after.y - start.y,
        ).name,
    ];
};
