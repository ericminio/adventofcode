import { extractor } from '../../../support/index.js';

const pattern = /(.*) = \((.*), (.*)\)/;

export const solvepartone = (lines) => {
    const lrs = lines[0];
    const tree = {};
    lines.slice(1).forEach((line) => {
        const data = extractor(pattern)(line);
        tree[data[0]] = { L: data[1], R: data[2] };
    });

    let current = 'AAA';
    let step = 0;
    while (current !== 'ZZZ') {
        step += 1;
        const lr = lrs[(step - 1) % lrs.length];
        current = tree[current][lr];
        // console.log(`${step} ${lr} ${current}`);
    }

    return step;
};

export const solveparttwo = () => '?';
