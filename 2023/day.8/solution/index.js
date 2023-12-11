import { extractor } from '../../../support/index.js';

export const solvepartone = (lines) => {
    const lr = lines[0];
    const tree = {};
    lines.slice(1).forEach((line) => {
        const data = extractor(/(.*) = \((.*), (.*)\)/)(line);
        tree[data[0]] = { L: data[1], R: data[2] };
    });

    console.log(lr, tree);

    return 6;
};

export const solveparttwo = () => '?';
