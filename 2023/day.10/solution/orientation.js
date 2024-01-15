import { move } from './move.js';

export const orientation = (loop) => {
    let turns = 0;
    let start = Object.keys(loop)[0];
    let current = loop[start];
    let next = loop[current.next];
    let previous = loop[current.previous];

    while (next.id != start) {
        const turning = move(current, previous, next);
        turns += turn(turning);

        previous = current;
        current = next;
        next = loop[current.next];
    }
    const turning = move(current, previous, next);

    turns += turn(turning);

    return turns > 0 ? 'right' : 'left';
};

const turn = (turning) => {
    const code = turning.toString();

    if (
        ['south,east', 'west,south', 'north,west', 'east,north'].includes(code)
    ) {
        return 1;
    }
    if (
        ['nort,east', 'east,north', 'south,west', 'east,south'].includes(code)
    ) {
        return -1;
    }
    return 0;
};
