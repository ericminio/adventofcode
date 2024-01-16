import { id } from '../../../support/index.js';
import { boundaries } from './boundaries.js';

export const candidates = (loop) => {
    const points = {};
    const rectangle = boundaries(loop);
    for (let x = rectangle.x1; x <= rectangle.x2; x++) {
        for (let y = rectangle.y1; y <= rectangle.y2; y++) {
            if (!loop[id({ x, y })]) {
                points[id({ x, y })] = { x, y };
            }
        }
    }
    Object.keys(points).forEach((id) => {
        points[id].borders = borders(points[id], loop, rectangle);
    });

    const surroundedPoints = {};
    Object.keys(points).forEach((id) => {
        if (points[id].borders.length === 4) {
            surroundedPoints[id] = points[id];
        }
    });
    return surroundedPoints;
};

const borders = (point, loop, boundaries) => {
    const all = [];
    for (let x = point.x - 1; x >= boundaries.x1; x--) {
        const maybe = id({ x, y: point.y });
        if (loop[maybe]) {
            all.push(maybe);
            break;
        }
    }
    for (let x = point.x + 1; x <= boundaries.x2; x++) {
        const maybe = id({ x, y: point.y });
        if (loop[maybe]) {
            all.push(maybe);
            break;
        }
    }
    for (let y = point.y - 1; y >= boundaries.y1; y--) {
        const maybe = id({ x: point.x, y });
        if (loop[maybe]) {
            all.push(maybe);
            break;
        }
    }
    for (let y = point.y + 1; y <= boundaries.y2; y++) {
        const maybe = id({ x: point.x, y });
        if (loop[maybe]) {
            all.push(maybe);
            break;
        }
    }

    return all;
};
