import { isMatchingRange } from './isMatchingRange.js';

export const transform = (source, mapping) => {
    const range = mapping.ranges.find((r) => isMatchingRange(source, r));
    if (!!range) {
        return {
            destination: range.destination + source - range.source,
            range,
        };
    }

    return { destination: source, range: undefined };
};
