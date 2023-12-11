import { last } from './last.js';
import { parse } from './parser.js';

export const solvepartone = (lines) => {
    const { lrs, tree } = parse(lines);

    let current = 'AAA';
    let step = 0;
    while (current !== 'ZZZ') {
        step += 1;
        const lr = lrs[(step - 1) % lrs.length];
        current = tree[current][lr];
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
            step += 1;
            const lr = lrs[(step - 1) % lrs.length];
            current = tree[current][lr];
        }
        steps.push(step);
    }
    console.log(steps);
    return steps.reduce((total, step) => total * BigInt(step), BigInt(1));
};
