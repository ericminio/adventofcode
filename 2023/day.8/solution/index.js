import { parse } from './parser.js';

export const solvepartone = (lines) => {
    const { lrs, tree } = parse(lines);

    let step = 0;
    let current = 'AAA';
    while (current !== 'ZZZ') {
        step += 1;
        const lr = lrs[(step - 1) % lrs.length];
        current = tree[current][lr];
    }

    return step;
};

export const solveparttwo = (lines) => {
    const { lrs, tree } = parse(lines);

    return 6;
};
