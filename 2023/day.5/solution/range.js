import { isMatchingRange } from './isMatchingRange.js';

export const range = (source, mapping) =>
    mapping.ranges.find((r) => isMatchingRange(source, r));
