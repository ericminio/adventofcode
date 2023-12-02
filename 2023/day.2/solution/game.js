import { extractor } from '../../../support/index.js';

export const game = (line) => {
    const data = extractor(/Game (.*):/)(line);
    const id = data[0];
    return {
        id: parseInt(id),
    };
};
