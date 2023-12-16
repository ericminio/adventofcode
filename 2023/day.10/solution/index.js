import { looper } from './looper.js';
import { candidates } from './candidates.js';

export const solvepartone = (lines) => {
    return looper(lines).length / 2;
};

export const solveparttwo = (lines) => {
    const loop = looper(lines);
    const points = candidates(loop);

    console.log(points.length);
    return 1;
};
