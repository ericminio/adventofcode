import { sumall } from '../../../support/index.js';

export const solvepartone = (lines) => {
    const values = [];

    for (const line of lines) {
        const numbers = line.split(' ').map((e) => parseInt(e));

        let pyramid = [numbers.slice()];
        let current = pyramid[pyramid.length - 1];
        while (current.some((e) => e !== 0)) {
            let next = [];
            for (let i = 1; i < current.length; i++) {
                next.push(current[i] - current[i - 1]);
            }
            pyramid.push(next);
            current = pyramid[pyramid.length - 1];
        }

        const last = pyramid[pyramid.length - 1];
        last.push(0);

        for (let i = pyramid.length - 2; i >= 0; i--) {
            current = pyramid[i];
            let next = pyramid[i + 1];
            current.push(current[current.length - 1] + next[next.length - 1]);
        }

        const first = pyramid[0];
        values.push(first[first.length - 1]);
    }

    return sumall(values);
};

export const solveparttwo = () => '?';
