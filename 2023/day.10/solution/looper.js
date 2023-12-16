import { around } from './around.js';
import { connected } from './connected.js';
import { parse } from './parser.js';
import { start } from './start.js';

export const looper = (lines) => {
    const maze = parse(lines);
    let current = start(maze);
    let loop = {};
    loop[current.id] = current;
    let positions = around(current, maze);
    let candidates = connected(positions, current, maze);
    let previous = current;
    let next = candidates.find((c) => c.id !== previous.id);
    current = next;
    let count = 0;
    while (!!next) {
        loop[next.id] = next;
        count += 1;
        positions = around(current, maze);
        candidates = connected(positions, current, maze);
        next = candidates.find((c) => c.id !== previous.id);
        previous = current;
        current = next;
    }
    return loop;
};
