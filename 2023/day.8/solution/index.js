import { last } from './last.js';
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

    let step = 0;
    let currents = Object.keys(tree).filter((key) => last(key) === 'A');
    while (currents.some((current) => last(current) !== 'Z')) {
        step += 1;
        const lr = lrs[(step - 1) % lrs.length];
        currents = currents.map((current) => tree[current][lr]);
    }

    return step;
};
