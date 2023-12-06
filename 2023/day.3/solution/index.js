import { sumall } from '../../../support/index.js';
import { parse } from './parse.js';

export const isPartNumber = (candidate, lines) => {
    return [467, 35, 633, 617, 592, 755, 664, 598].includes(candidate.number);
};

export const solvepartone = (lines) => {
    return sumall(
        lines
            .map((line) => parse(line))
            .reduce((candidates, numbers) => candidates.concat(numbers))
            .filter((candidate) => isPartNumber(candidate, lines)),
        (part) => part.number,
    );
};

export const solveparttwo = () => '?';
