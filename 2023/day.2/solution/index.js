import { reduce } from '../../../support/index.js';
import { game } from './game.js';
import { isPossible } from './isPossible.js';

export const solvepartone = (lines) =>
    reduce(
        lines.map((line) => game(line)).filter((g) => isPossible(g)),
        (g) => g.id,
    );

export const solveparttwo = () => '?';
