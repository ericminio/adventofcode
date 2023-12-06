import { around } from './around.js';

export const isPartNumber = (candidate, lines) => {
    return around(candidate)
        .filter(
            (p) =>
                p.x >= 0 &&
                p.y >= 0 &&
                p.x < lines[0].length &&
                p.y < lines.length,
        )
        .map((p) => lines[p.y][p.x])
        .some((c) => c !== '.');
};
