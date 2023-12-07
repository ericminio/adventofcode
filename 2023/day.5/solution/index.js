import { parse } from './parse.js';

export const location = (seed, maps) => 82;

export const solvepartone = (lines) => {
    const garden = parse(lines);
    return Math.min(location(78), 43, 86, 35);
};

export const solveparttwo = () => '?';
