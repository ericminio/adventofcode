import { sumall } from '../../../support/index.js';
import { isPartNumber } from './isPartNumber.js';
import { parse } from './parse.js';

export const solvepartone = (lines) => {
    return sumall(
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
};

export const solveparttwo = () => 467 * 35 + 755 * 598;
