import { clusters } from './clusters.js';
import { parse } from './parser.js';

export const solvepartone = (input) => {
    const incoming = parse(input);
    return clusters(incoming);
};

export const solveparttwo = () => '?';
