import { destination } from './destination.js';

export const location = (seed, garden, range) =>
    garden.mappings.reduce((previous, mapping) => {
        const matchingRange = range(previous, mapping);
        garden.board[mapping.id] = matchingRange;

        return !!matchingRange
            ? destination(previous, matchingRange)
            : previous;
    }, seed);
