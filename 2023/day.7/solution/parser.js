import { extractor } from '../../../support/index.js';

export const parse = (lines) =>
    lines.map(extractor(/(.*)\s(\d*)/)).map((data) => ({
        cards: data[0],
        bid: parseInt(data[1]),
    }));
