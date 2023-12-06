import { sumall } from '../../../support/index.js';
import { isPartNumber } from './isPartNumber.js';
import { parse } from './parse.js';

export const solvepartone = (lines) => {
    return sumall(
        lines
            .map((line, index) => {
                const candidate = parse(line);
                candidate.lineIndex = index;
                return candidate;
            })
            .reduce((candidates, numbers) => candidates.concat(numbers))
            .filter((candidate) => isPartNumber(candidate, lines)),
        (part) => part.number,
    );
};

export const solveparttwo = () => '?';
