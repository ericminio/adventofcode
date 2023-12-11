import { around } from './around.js';
import { parse } from './parser.js';
import { start } from './start.js';

export const solvepartone = (lines) => {
    const maze = parse(lines);
    let current = start(maze);
    let candidates = around(current);

    console.log(current);
    return 4;
};

export const solveparttwo = () => '?';
