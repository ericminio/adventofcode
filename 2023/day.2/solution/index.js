import { sumall } from '../../../support/index.js';
import { bag } from './bag.js';
import { game } from './game.js';
import { isPossible } from './isPossible.js';

export const solvepartone = (lines) =>
    sumall(
        lines.map((line) => game(line)).filter((g) => isPossible(g, bag)),
        (g) => g.id,
    );

export const solveparttwo = (lines) =>
    sumall(
        lines
            .map((line) => game(line))
            .map((g) =>
                g.draws.reduce((min, draw) => {
                    min.red = Math.max(draw.red, min.red);
                    min.green = Math.max(draw.green, min.green);
                    min.blue = Math.max(draw.blue, min.blue);
                    return min;
                }),
            )
            .map((min) => min.red * min.green * min.blue),
    );
