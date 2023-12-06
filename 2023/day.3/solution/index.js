import { sumall } from '../../../support/index.js';
import { isPartNumber } from './isPartNumber.js';
import { parse } from './parse.js';

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

export const solveparttwo = () =>
    sumall(
        [
            {
                x: 3,
                y: 1,
                numbers: [467, 35],
            },
            {
                x: 3,
                y: 4,
                numbers: [617],
            },
            {
                x: 5,
                y: 8,
                numbers: [755, 598],
            },
        ]
            .filter((g) => g.numbers.length === 2)
            .map((g) => g.numbers.reduce((ratio, gear) => ratio * gear)),
    );
