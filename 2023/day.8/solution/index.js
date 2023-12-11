import { extractor } from '../../../support/index.js';

const pattern = /(.*) = \((.*), (.*)\)/;

export const solvepartone = (lines) => {
    const lrs = lines[0];
    const tree = {};
    lines.slice(1).forEach((line) => {
        const data = extractor(pattern)(line);
        tree[data[0]] = { L: data[1], R: data[2] };
    });

    const start = extractor(pattern)(lines[1])[0];
    let current = start;
    let step = 0;
    while (current !== 'ZZZ') {
        step += 1;
        const lr = lrs[(step - 1) % lrs.length];
        current = tree[current][lr];
    }

    return step;
};

export const solveparttwo = () => '?';
