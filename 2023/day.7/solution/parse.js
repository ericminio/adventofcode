import { extractor } from '../../../support/index.js';

export const parse = (lines) => {
    return lines.map((line) => {
        const data = extractor(/(.*)\s(\d*)/)(line);
        return {
            cards: data[0],
            bid: parseInt(data[1]),
        };
    });
};
