import { isMatchingRange } from './isMatchingRange.js';

export const transform = (source, mapping) => {
    const range = mapping.ranges.find((r) => isMatchingRange(source, r));
    if (!!range) {
        return range.destination + source - range.source;
    }

    return source;
};
