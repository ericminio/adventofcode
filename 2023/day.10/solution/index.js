import { looper } from './looper.js';

export const solvepartone = (lines) => {
    return looper(lines).length / 2;
};

export const solveparttwo = (lines) => {
    const loop = looper(lines);

    console.log(loop);
    return 1;
};
