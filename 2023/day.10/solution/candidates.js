import { boundaries } from './boundaries.js';

export const candidates = (loop) => {
    const points = [];
    const rectangle = boundaries(loop);
    for (let x = rectangle.x1; x <= rectangle.x2; x++) {
        for (let y = rectangle.y1; y <= rectangle.y2; y++) {
            if (!loop.find((p) => p.x === x && p.y === y)) {
                points.push({ x, y });
            }
        }
    }
    return points;
};
