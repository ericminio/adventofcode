import { extractor } from '../../../support/index.js';
const pattern = /(.*) = \((.*), (.*)\)/;

export const parse = (lines) => {
    const lrs = lines[0];
    const tree = {};
    lines.slice(1).forEach((line) => {
        const data = extractor(pattern)(line);
        tree[data[0]] = { L: data[1], R: data[2] };
    });

    return { lrs, tree };
};
