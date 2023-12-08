import { destination } from './destination.js';
import { isMatchingRange } from './isMatchingRange.js';

export const range = (source, mapping) =>
    mapping.ranges.find((r) => isMatchingRange(source, r));

export const transform = (source, mapping) => {
    const r = range(source, mapping);

    return !!r
        ? {
              destination: destination(source, r),
              range: r,
          }
        : { destination: source, range: undefined };
};
