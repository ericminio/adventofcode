import { reduce } from '../../../support/index.js';
import { bag } from './bag.js';
import { game } from './game.js';
import { isPossible } from './isPossible.js';

export const solvepartone = (lines) =>
    reduce(
        lines.map((line) => game(line)).filter((g) => isPossible(g, bag)),
        (g) => g.id,
    );

export const solveparttwo = () => '?';
