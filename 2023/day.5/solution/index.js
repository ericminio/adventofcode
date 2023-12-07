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

export const solveparttwo = () => 46;
