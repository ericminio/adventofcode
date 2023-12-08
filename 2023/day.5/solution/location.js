import { destination } from './destination.js';
import { isMatchingRange } from './isMatchingRange.js';

export const location = (seed, garden, range) =>
    garden.mappings.reduce((previous, mapping) => {
        const rangeCandidate = garden.board[mapping.id];
        const matchingRange =
            !!rangeCandidate && isMatchingRange(previous, rangeCandidate)
                ? rangeCandidate
                : range(previous, mapping);
        garden.board[mapping.id] = matchingRange;

        return !!matchingRange
            ? destination(previous, matchingRange)
            : previous;
    }, seed);
