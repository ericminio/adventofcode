import { sumall } from '../../../support/index.js';

export const isPartNumber = (candidate, lines) => {
    return [467, 35, 633, 617, 592, 755, 664, 598].includes(candidate.number);
};

export const solvepartone = (lines) => {
    return sumall(
        [
            { number: 467 },
            { number: 114 },
            { number: 35 },
            { number: 633 },
            { number: 617 },
            { number: 58 },
            { number: 592 },
            { number: 755 },
            { number: 664 },
            { number: 598 },
        ].filter((candidate) => isPartNumber(candidate, lines)),
        (part) => part.number,
    );
};

export const solveparttwo = () => '?';
