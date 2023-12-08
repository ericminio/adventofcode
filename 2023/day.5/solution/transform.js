import { destination } from './destination.js';
import { isMatchingRange } from './isMatchingRange.js';

export const transform = (source, mapping) => {
    const range = mapping.ranges.find((r) => isMatchingRange(source, r));

    return !!range
        ? {
              destination: destination(source, range),
              range,
          }
        : { destination: source, range: undefined };
};
