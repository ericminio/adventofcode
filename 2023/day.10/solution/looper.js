import { around, directions, east, north } from './around.js';
import { connected } from './connected.js';
import { parse } from './parser.js';
import { decodeStart, start } from './start.js';

export const looper = (lines) => {
    const maze = parse(lines);
    let current = start(maze);
    let startId = current.id;
    let loop = {};
    loop[current.id] = {
        id: startId,
        x: current.x,
        y: current.y,
        value: maze[current.id].value,
    };
    let previousId = current.id;
    let more = true;
    while (more) {
        let positions = around(current, maze);
        let candidates = connected(positions, current, maze);
        let next = candidates.find((c) => c.id !== previousId);
        more = !!next;
        if (more) {
            loop[next.id] = {
                id: next.id,
                x: next.x,
                y: next.y,
                value: maze[next.id].value,
                previous: current.id,
            };
            loop[current.id].next = next.id;
            previousId = current.id;
            current = next;
        }
    }
    loop[startId].previous = current.id;
    loop[current.id].next = startId;

    loop[startId].value = decodeStart(loop, startId);

    return loop;
};
