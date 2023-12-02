import { reduce } from '../../../support/index.js';
import { bag } from './bag.js';
import { game } from './game.js';
import { isPossible } from './isPossible.js';

export const solvepartone = (lines) =>
    reduce(
        lines.map((line) => game(line)).filter((g) => isPossible(g, bag)),
        (g) => g.id,
    );

export const solveparttwo = (lines) =>
    reduce(
        lines
            .map((line) => game(line))
            .map((g) => {
                const min = { red: 0, green: 0, blue: 0 };
                g.draws.forEach((draw) => {
                    min.red = Math.max(draw.red, min.red);
                    min.green = Math.max(draw.green, min.green);
                    min.blue = Math.max(draw.blue, min.blue);
                });
                return min;
            })
            .map((min) => min.red * min.green * min.blue),
        (v) => v,
    );
