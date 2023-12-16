import { looper } from './looper.js';
import { candidates } from './candidates.js';

export const solvepartone = (lines) => {
    const loop = looper(lines);

    return Object.keys(loop).length / 2;
};

export const solveparttwo = (lines) => {
    const loop = looper(lines);
    const points = candidates(loop);

    return 1;
};
