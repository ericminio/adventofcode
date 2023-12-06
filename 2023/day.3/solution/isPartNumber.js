import { around } from './around.js';
import { aroundNumber } from './aroundNumber.js';

export const isPartNumber = (candidate, lines) => {
    return around(candidate)
        .filter((p) => aroundNumber(p, lines))
        .map((p) => lines[p.y][p.x])
        .some((c) => c !== '.');
};
