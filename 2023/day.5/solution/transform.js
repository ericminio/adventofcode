import { destination } from './destination.js';
import { range } from './range.js';

export const transform = (source, mapping) => {
    const matchingRange = range(source, mapping);

    return !!matchingRange
        ? {
              destination: destination(source, matchingRange),
              range: matchingRange,
          }
        : { destination: source, range: undefined };
};
