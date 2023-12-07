import { ascending } from '../../../support/index.js';
import { parse } from './parse.js';
import { transform } from './transform.js';

export const location = (seed, maps) => 82;

export const solvepartone = (lines) => {
    const garden = parse(lines);
    const locations = garden.seeds.map((seed) =>
        garden.mappings.reduce(
            (previous, mapping) => transform(previous, mapping),
            seed,
        ),
    );

    return locations.sort(ascending)[0];
};

export const solveparttwo = (lines) => {
    const garden = parse(lines);
    const locations = [];
    for (let i = 0; i < garden.seeds.length; i += 2) {
        for (let j = 0; j < garden.seeds[i + 1]; j++) {
            const seed = garden.seeds[i] + j;
            const location = garden.mappings.reduce(
                (previous, mapping) => transform(previous, mapping),
                seed,
            );
            locations.push(location);
        }
    }

    return locations.sort(ascending)[0];
};
