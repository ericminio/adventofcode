import { id, sumall } from '../../../support/index.js';
import { isPartNumber } from './isPartNumber.js';
import { parse } from './parse.js';
import { starsAround } from './starsAround.js';

export const solvepartone = (lines) =>
    sumall(
        lines
            .map((line, index) =>
                parse(line).map((number) => ({
                    ...number,
                    lineIndex: index,
                })),
            )
            .reduce((candidates, numbers) => candidates.concat(numbers))
            .filter((candidate) => isPartNumber(candidate, lines)),
        (part) => part.number,
    );

export const solveparttwo = (lines) =>
    sumall(
        Object.values(
            lines
                .map((line, index) =>
                    parse(line).map((number) => ({
                        ...number,
                        lineIndex: index,
                    })),
                )
                .reduce((candidates, numbers) => candidates.concat(numbers))
                .map((candidate) => starsAround(candidate, lines))
                .filter((candidate) => candidate.length > 0)
                .reduce((candidates, candidate) => candidates.concat(candidate))
                .reduce((candidates, candidate) => {
                    if (!candidates[id(candidate)]) {
                        candidates[id(candidate)] = [];
                    }
                    candidates[id(candidate)].push(candidate.number);
                    return candidates;
                }, {}),
        )
            .filter((g) => g.length === 2)
            .map((g) => g.reduce((ratio, gear) => ratio * gear)),
    );
