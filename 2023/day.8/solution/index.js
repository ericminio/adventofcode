import { last } from './last.js';
import { parse } from './parser.js';
import { ppcm } from './ppcm.js';

const move = (lrs, tree, step, current) => {
    const next = step + 1;
    const lr = lrs[(next - 1) % lrs.length];
    return {
        step: next,
        current: tree[current][lr],
    };
};

export const solvepartone = (lines) => {
    const { lrs, tree } = parse(lines);

    let current = 'AAA';
    let step = 0;
    while (current !== 'ZZZ') {
        ({ step, current } = move(lrs, tree, step, current));
    }

    return step;
};

export const solveparttwo = (lines) => {
    const { lrs, tree } = parse(lines);

    const steps = [];
    let currents = Object.keys(tree).filter((key) => last(key) === 'A');
    for (let current of currents) {
        let step = 0;
        while (last(current) !== 'Z') {
            ({ step, current } = move(lrs, tree, step, current));
        }
        steps.push(step);
    }

    return ppcm(steps);
};
