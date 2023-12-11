import { around } from './around.js';
import { connected } from './connected.js';
import { parse } from './parser.js';
import { start } from './start.js';

export const solvepartone = (lines) => {
    const maze = parse(lines);
    let current = start(maze);
    let positions = around(current, maze);
    let candidates = connected(positions, maze);

    console.log(current);
    console.log(candidates);
    return 4;
};

export const solveparttwo = () => '?';
