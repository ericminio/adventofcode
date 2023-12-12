import { around } from './around.js';
import { connected } from './connected.js';
import { parse } from './parser.js';
import { start } from './start.js';

export const solvepartone = (lines) => {
    const maze = parse(lines);
    let current = start(maze);
    let positions = around(current, maze);
    let candidates = connected(positions, current, maze);
    let previous = current;
    let next = candidates.find((c) => c.id !== previous.id);
    let count = 0;
    while (!!next) {
        count += 1;
        positions = around(current, maze);
        candidates = connected(positions, current, maze);
        next = candidates.find((c) => c.id !== previous.id);
        previous = current;
        current = next;
        // console.log(current);
    }
    // console.log(count);

    return count / 2;
};

export const solveparttwo = () => '?';
