import { around } from './around.js';
import { aroundNumber } from './aroundNumber.js';

export const starsAround = (candidate, lines) => {
    return around(candidate)
        .filter((p) => aroundNumber(p, lines))
        .map((p) => ({ ...p, value: lines[p.y][p.x] }))
        .filter((p) => p.value === '*')
        .map((p) => ({ x: p.x, y: p.y, candidate }));
};
