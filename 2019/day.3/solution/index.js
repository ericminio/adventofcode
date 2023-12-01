import { manhattan } from '../../../support/index.js';
import { intersections } from './intersections.js';

export const solvepartone = (lines) => {
    const candidates = intersections(lines);
    const origin = { x: 0, y: 0 };
    candidates.sort((a, b) => manhattan(a, origin) - manhattan(b, origin));
    return manhattan(candidates[0], origin);
}

export const solveparttwo = () => '?';

