import { destination } from './destination.js';
import { range } from './range.js';
export const transform = (source, mapping) => {
    const r = range(source, mapping);

    return !!r
        ? {
              destination: destination(source, r),
              range: r,
          }
        : { destination: source, range: undefined };
};
