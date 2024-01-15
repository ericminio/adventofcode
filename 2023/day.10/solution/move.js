import { directions } from './around.js';

export const move = (start, before, after) => {
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
