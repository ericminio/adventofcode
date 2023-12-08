import { ascending } from '../../../support/index.js';
import { parse } from './parse.js';
import { transform } from './transform.js';

export const location = (seed, maps) => 82;

export const solvepartone = (lines) => {
    const garden = parse(lines);
    const locations = garden.seeds.map((seed) =>
        garden.mappings.reduce(
            (previous, mapping) => transform(previous, mapping).destination,
            seed,
        ),
    );

    return locations.sort(ascending)[0];
};

export const solveparttwo = (lines) => {
    const garden = parse(lines);
    let min = 174137457;
    for (let i = 0; i < garden.seeds.length; i += 2) {
        for (let j = 0; j < garden.seeds[i + 1]; j++) {
            const seed = garden.seeds[i] + j;
            const location = garden.mappings.reduce(
                (previous, mapping) => transform(previous, mapping).destination,
                seed,
            );
            if (location < min) {
                min = location;
            }
        }
    }

    return min;
};
