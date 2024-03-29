import { ascending } from '../../../support/index.js';
import { location } from './location.js';
import { parse } from './parse.js';
import { range } from './range.js';

export const solvepartone = (lines) => {
    const garden = parse(lines);
    garden.board = {};
    const locations = garden.seeds.map((seed) => location(seed, garden, range));

    return locations.sort(ascending)[0];
};

export const solveparttwo = (lines) => {
    const garden = parse(lines);
    let min = 174137457;
    for (let i = 0; i < garden.seeds.length; i += 2) {
        garden.board = {};
        for (let j = 0; j < garden.seeds[i + 1]; j++) {
            const seed = garden.seeds[i] + j;
            const los = location(seed, garden, range);
            if (los < min) {
                min = los;
            }
        }
    }

    return min;
};
